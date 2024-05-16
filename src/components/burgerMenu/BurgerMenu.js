import React, { useState, useEffect } from "react";
import "./BurgerMenu.css";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [systemNames, setSystemNames] = useState([]); // State to store system keys

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch("http://localhost:3001/systems");
        const systems = await response.json();
        if (systems.length > 0) {
          let names = [];
          for (let i = 0; i < systems.length; i++) {
            names = [...names, systems[i]["name"]];
          }
          setSystemNames(names);
        }
      } catch (error) {
        console.error("Error fetching systems:", error);
      }
    };

    fetchSystems();
  }, []);

  function openNav() {
    setIsMenuOpen(true);
  }

  function closeNav() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <div id="mySidenav" className={`sidenav ${isMenuOpen ? "open" : ""}`}>
        <a
          className="closebtn"
          style={{ cursor: "pointer" }}
          id="closeButton"
          onClick={closeNav}
        >
          &times;
        </a>
        <Link className="nav-main" to="/">
          Solar System
        </Link>
        <Link className="nav-main" to="/addsystem">
          -- Add system --
        </Link>

        {systemNames.map((name, index) => (
          <Link className="nav-main" key={index} to={`/${index}`}>
            {name} System
          </Link>
        ))}
      </div>

      <div id={`main ${isMenuOpen ? "open" : ""}`}>
        <a
          id="burgerSpan"
          onClick={isMenuOpen ? closeNav : openNav}
          style={{ cursor: "pointer" }}
        >
          <div className={`toggle ${isMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </a>
      </div>
    </>
  );
};

export default BurgerMenu;
