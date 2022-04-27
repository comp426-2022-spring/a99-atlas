import './App.css';
import { useState } from 'react';
import MapChart from './components/MapChart';
import ReactTooltip from "react-tooltip";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <AppBar position="static" className='appbar'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Project Atlas
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div className='map'><MapChart setTooltipContent={setContent} /> </div>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
