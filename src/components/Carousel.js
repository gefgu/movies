import { useEffect, useRef, useState } from "react";

export default function Carousel({ listing, imagesInDisplay }) {
  const [imageInViewByButton, setImageInViewByButton] = useState(0);
  const [imageInViewByScroll, setImageInViewByScroll] = useState(0);
  const carouselSection = useRef(null);
  const isInitialMount = useRef(true);

  const handleScroll = () => {
    const scroll = carouselSection.current.scrollLeft;
    const containerWidth = carouselSection.current.clientWidth;

    const currentImage = [...carouselSection.current.childNodes].find(
      (element, index) => {
        return (
          element.clientWidth * (index + 1) > scroll + (containerWidth * 4) / 10
        );
      }
    );

    const index = [...carouselSection?.current?.childNodes].indexOf(
      currentImage
    );

    if (index !== imageInViewByScroll) {
      setImageInViewByScroll(index);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    carouselSection?.current?.childNodes[imageInViewByButton].scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [imageInViewByButton]);

  useEffect(() => {
    handleScroll();
  });

  return (
    <>
      <button
        onClick={() =>
          setImageInViewByButton(Math.max(imageInViewByScroll - 1, 0))
        }
        className="absolute top-2/4 left-2 px-4 py-2 bg-stone-900/80 font-bold text-white text-5xl"
      >
        {"<"}
      </button>
      <button
        onClick={() =>
          setImageInViewByButton(
            Math.min(imageInViewByScroll + 1, imagesInDisplay - 1)
          )
        }
        className="absolute top-2/4 right-2 px-4 py-2 bg-stone-900/80 font-bold text-white text-5xl"
      >
        {">"}
      </button>
      <div
        className="flex overflow-scroll gap-4 my-8"
        onScroll={handleScroll}
        ref={carouselSection}
      >
        {listing}
      </div>
    </>
  );
}
