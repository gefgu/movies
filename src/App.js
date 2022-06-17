import NavBar from "./components/NavBar";

function App() {
  console.log(process.env.REACT_APP_MOVIE_API_KEY)
  return (
    <div>
      <NavBar />
    </div>
  );
}

export default App;
