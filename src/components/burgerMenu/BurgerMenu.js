import React, { useState } from "react";
import "./BurgerMenu.css";

const BurgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const a = document.querySelector(".sidenav");
    const b = document.getElementById("main");

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
                <a className="nav-main" href="/">Main</a>
                <a className="nav-list" href="/planetinfo/mars">Second</a>
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