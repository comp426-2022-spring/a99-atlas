import './App.css';
import { useState } from 'react';
import MapChart from './components/MapChart';
import ReactTooltip from "react-tooltip";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Auth } from './components/Authentication/Auth';
import { Dropdowns } from './components/Dropdowns';
import { Account } from './components/Account';

function App() {
  const [content, setContent] = useState("");
  const [uid, setUID] = useState("");
  const [metric, setMetric] = useState("cases");
  const [time, setTime] = useState("allTime");
  const [openAccount, setOpenAccount] = useState(false);

  return (
    <div>
      <Auth uid={uid} setUID={setUID}/>
      <Account openAccount={openAccount} setOpenAccount={setOpenAccount} uid={uid} setUID={setUID}/>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" >
            Project Atlas
          </Typography>
          <Dropdowns time={time} setTime={setTime} metric={metric} setMetric={setMetric}/>
          <Button color="inherit" onClick={() => setOpenAccount(true)}>Account</Button>
        </Toolbar>
      </AppBar>
      <div className='map'><MapChart setTooltipContent={setContent} time={time} metric={metric} /> </div>
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
