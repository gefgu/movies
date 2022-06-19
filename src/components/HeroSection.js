export default function HeroSection({ heroImage }) {
  return (
    <div
      className={`w-full h-screen bg-cover bg-center bg-no-repeat 
        text-white flex flex-col justify-end 
        items-center`}
      style={{
        backgroundImage: `
          linear-gradient(to bottom, #1C191700 0%, #1C191710 50%, #1C1917FF 100%),
          url(${heroImage})`,
      }}
    >
      <div className="flex flex-col my-14 text-justify">
        <h2 className="drop-shadow-md text-3xl my-2 font-bold">
          Track films you've watched
        </h2>
        <h2 className="drop-shadow-md text-3xl my-2 font-bold">
          Save those you want to see
        </h2>
        <h2 className="drop-shadow-md text-3xl my-2 font-bold">
          Tell your friends what's good
        </h2>
        <button className="rounded px-4 py-4 my-16 bg-yellow-800 font-bold text-xl hover:bg-yellow-700 active:bg-yellow-600 drop-shadow-md">
          Create An Account
        </button>
      </div>
    </div>
  );
}
