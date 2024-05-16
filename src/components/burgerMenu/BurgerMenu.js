import React, { useState } from "react";
import "./BurgerMenu.css";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

    function openNav() {
        setIsMenuOpen(true);
    }

    function closeNav() {
        setIsMenuOpen(false);
    }

    return (
        <>
            <div id="mySidenav" className={`sidenav ${isMenuOpen ? 'open' : ''}`}>
                <a className="closebtn" style={{ cursor: 'pointer' }} id="closeButton" onClick={closeNav}>&times;</a>
                <Link className="nav-main" to="/">Solar System</Link>
                <Link className="nav-main" to="/addsystem">-- Add system --</Link>
            </div>

            <div id={`main ${isMenuOpen ? 'open' : ''}`}>
                <a id="burgerSpan" onClick={isMenuOpen ? closeNav : openNav} style={{ cursor: 'pointer' }}>
                    <div className={`toggle ${isMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </a>
            </div>
        </>
    );
}

export default BurgerMenu;