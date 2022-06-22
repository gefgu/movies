import { getTMDBImage } from "../helpers";

export default function ReviewPopup({ movieDetails }) {
  return (
    <div className="bg-stone-100/50 fixed z-10 top-0 left-0 flex justify-center items-center w-full h-full overflow-scroll">
      <section className="bg-stone-900 max-w-5xl py-4 px-8 text-white flex-1">
        <div className="flex border-b-2 my-6 items-center">
          <img
            src={getTMDBImage(movieDetails.poster_path)}
            alt="Movie Poster"
            className="h-36"
          />
          <div className="px-4 flex flex-col">
            <h3 className="text-xl font-bold  mb-2">
              {movieDetails.original_title}
            </h3>
            <hr className="mb-8" />
            <h4 className="text-3xl mt-auto">Add a Review</h4>
          </div>
        </div>
        <form>
          <section className="my-6 flex flex-col gap-6">
            <h5 className="text-xl">Your Rating</h5>
            <input
              className="text-black p-1"
              type="number"
              min="0"
              max="10"
              placeholder="stars"
            />
          </section>
          <section className="my-6 flex flex-col gap-6">
            <h5 className="text-xl">Your Review</h5>
            <input
              className="text-black p-2 w-full"
              type="text"
              placeholder="Write a headline for your review here"
            />
            <textarea
              className="text-black p-2 w-full"
              type="textarea"
              placeholder="Write your review here"
              rows="12"
            ></textarea>
          </section>
          <div className="flex gap-6 justify-end my-6">
            <button className="bg-red-600 hover:bg-red-700 active:bg-red-800 py-2 px-4 rounded font-bold">
              Cancel
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 py-2 px-4 rounded font-bold">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
