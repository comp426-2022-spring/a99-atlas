import React from 'react'
import { Container, FormControl, Typography, MenuItem, Select } from '@mui/material';

export const Dropdowns = ({ time, setTime, metric, setMetric }) => {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: "center", alignItems: "center" }}>
      <Typography variant="subtitle1" component="div" >Metric: </Typography>
      <FormControl variant="standard" size="small" sx={{ ml: 1.5, mr: 4, minWidth: 150 }}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
        >
          <MenuItem value={"cases"}>Cases</MenuItem>
          <MenuItem value={"deaths"}>Deaths</MenuItem>
          <MenuItem value={"vaccinations"}>Vaccinations</MenuItem>
        </Select>
      </FormControl>
      <Typography variant="subtitle1" component="div" >Interval: </Typography>
      <FormControl variant="standard" size="small" sx={{ ml: 1.5, mr: 2, minWidth: 160 }}>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <MenuItem value={"allTime"}>All Time</MenuItem>
          <MenuItem value={"lastYear"}>Last 1 Year</MenuItem>
          <MenuItem value={"last6Months"}>Last 6 Months</MenuItem>
          <MenuItem value={"last30Days"}>Last 30 Days</MenuItem>
        </Select>
      </FormControl>
    </Container>
  )
}
