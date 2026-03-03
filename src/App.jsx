import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <h1>
      Welcome to AXA CMS
    </h1>
      <h1 className="read-the-docs">
        This is the Demo app for testing Cross domain and cross device consent. 
      </h1>
    </>
  );
}

export default App;
