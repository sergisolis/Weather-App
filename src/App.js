import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [background, setBackground] = useState(0);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&lang=es&appid=498e6514942790f9f98579a216fdc3fa`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      if (search != "") {
        setBackground((background + 1) % 4);
      }
      setSearch("");
    }
  };

  const bgPriority =
    background === 0
      ? "app bg1"
      : background === 1
      ? "app bg2"
      : background === 2
      ? "app bg3"
      : "app bg4";

  return (
    <div className={bgPriority}>
      <div className="search">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Busca una ciudad"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} ºC</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} ºC</p>
              ) : null}
              <p>Sensación térmica</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity} %</p>
              ) : null}
              <p>Humedad</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} m/s</p>
              ) : null}
              <p>Viento</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
