import './App.css';
import { useState } from 'react';
import MapChart from './Components/MapChart';
import ReactTooltip from "react-tooltip";
import AppBar from './Components/AppBar';

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <AppBar/>
      <div className='map'><MapChart setTooltipContent={setContent} /> </div>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
