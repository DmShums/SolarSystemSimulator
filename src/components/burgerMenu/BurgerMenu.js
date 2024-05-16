import React, { useState, useEffect } from "react";
import "./BurgerMenu.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Select from "react-select";

const BurgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [systemNames, setSystemNames] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchSystems = async () => {
      try {
        const response = await fetch("http://localhost:3001/systems");
        const systems = await response.json();
        if (systems.length > 0) {
          let names = [];
          for (let i = 0; i < systems.length; i++) {
            names = [...names, { value: i, label: systems[i]["name"] }];
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

  // Handle option change
  const handleOptionChange = (selectedOption) => {
    const selectedIndex = selectedOption.value; // Get the index of the selected option
    navigate(`/${selectedIndex}`); // Redirect to the selected option's index
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      position: 'relative',
      width: '85%',
      margin: '0 auto'
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 'none',
      borderBottom: state.isFocused ? '2px solid #f1f1f1' : '2px solid #818181',
      borderRadius: 0,
      color: '#818181',
      cursor: 'pointer',
    }),
    menu: (provided) => ({
      ...provided,
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#111',
      border: 'none',
      borderRadius: 0,
      marginTop: '2px',
      boxShadow: 'none',
    }),
    option: (provided, state) => ({
      ...provided,
      color: '#818181',
      backgroundColor: state.isFocused ? '#333' : 'transparent',
      ':hover': {
        backgroundColor: '#333'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#818181'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none'
    })
  };
  
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
          Add System
        </Link>
        <Select
          options={systemNames} 
          onChange={handleOptionChange} 
          styles={customStyles} 
          placeholder="Select system..."/>
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
