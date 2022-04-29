import React, { memo, useState, useEffect } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent, time, metric }) => {
  const [data, setData] = useState([]);
  const [min, setMin] = useState(0.29);
  const [max, setMax] = useState(0.68);

  const colorScale = scaleLinear()
  .domain([min, max])
  .range(["#ffedea", "#ff5233"]);

  useEffect(() => {
    async function fetchData(metric, time) {
      csv(`/vulnerability.csv`).then((data) => {
        setData(data);
      });
      try {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await fetch(`http://localhost:5555/${metric}/${time}`, requestOptions);
        let resp = await response.json();
        if (response.status === 200) {
          
        } else {
          throw Error("Unknown error occurred when getting map data from server");
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData(metric, time);
  }, [time, metric]);
  
  return (
    <>
      <ComposableMap data-tip="" height="390" projectionConfig={{ rotate: [-10, 0, 0], scale: 140 }}>
        <ZoomableGroup center={[0,-2]}>
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          {data.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = data.find((s) => s.ISO3 === geo.properties.ISO_A3);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      stroke="#ff5233"
                      strokeWidth={0.03}
                      onMouseEnter={() => {
                        const { NAME, POP_EST } = geo.properties;
                        let content = `${NAME} — ${rounded(POP_EST)}`;
                        setTooltipContent(content);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: d ? colorScale(d["2017"]) : "#F5F4F6",
                          outline: "none"
                        },
                        hover: {
                          fill: "#FF4",
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
                      }}
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
