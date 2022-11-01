import React, { useState } from "react";
import "./App.css";
import CarsList from "./components/CarsList";

function App() {
  const [isChanged, setIsChanged] = useState(false);
  const isChangedHandler = (isChanged: boolean) => {
    setIsChanged(isChanged);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>{!isChanged ? `Initial State` : `state changed`}</h1>
      </header>
      <CarsList onChanged={isChangedHandler} />
    </div>
  );
}

export default App;
