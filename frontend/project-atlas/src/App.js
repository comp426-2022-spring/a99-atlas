import './App.css';
import { useState } from 'react';
import MapChart from './components/MapChart';
import ReactTooltip from "react-tooltip";
import AppBar from './components/AppBar';

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
