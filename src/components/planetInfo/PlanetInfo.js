import React from "react";
import "./styles.css";
import Welcome from "../welcome/Welcome";

const PlanetInfo = (props) => {
  const info = props.info;
  return (
    <>
      <Welcome />
      <div className="info">
        <h2>{info.name}</h2>
        <div className="main-info">
          <p>Mass: {info.mass}</p>
          <p>Radius: {info.radius}</p>
          <p>Period: {info.period}</p>
          <p>Semi Major Axis: {info.semi_major_axis}</p>
          <p>Temperature: {info.temperature}</p>
          <p>Distance from Earth (light years): {info.distance_light_year}</p>
          <p>Host Star Mass: {info.host_star_mass}</p>
          <p>Host Star Temperature: {info.host_star_temperature}</p>
        </div>
      </div>
    </>
  );
};

export default PlanetInfo;
