import './App.css';
import { useState } from 'react';
import MapChart from './MapChart';
import ReactTooltip from "react-tooltip";

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <div>Hello World</div>
      <div className='map'><MapChart setTooltipContent={setContent} /> </div>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
