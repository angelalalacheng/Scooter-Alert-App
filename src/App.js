import { useState } from "react";
import Theft from "./components/Theft";
import GPS from "./components/GPS";
import "./App.css";

function App() {
  const [park, setPark] = useState(true);

  const handlePark = () => {
    setPark(!park);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Scooter Alert System</h1>
      </header>
      <body className="App-body">
        <Theft park={park} />
        <GPS park={park} />
        <button className="button-17" onClick={handlePark}>
          {park ? "Park" : "Gogo"}
        </button>
      </body>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
