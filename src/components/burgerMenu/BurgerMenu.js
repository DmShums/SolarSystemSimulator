import React, { useState } from "react";
import "./BurgerMenu.css";
import { Link } from "react-router-dom";
import AddSystem from '../addSystem/AddSystem'; // Import the AddSystem component
import { Modal } from 'react-bootstrap'; // Import the Modal component from react-bootstrap

const BurgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

    function openNav() {
        setIsMenuOpen(true);
    }

    function closeNav() {
        setIsMenuOpen(false);
    }

    function openModal() {
        setIsModalOpen(true); // Open the modal
    }

    function closeModal() {
        setIsModalOpen(false); // Close the modal
    }

    return (
        <>
            <div id="mySidenav" className={`sidenav ${isMenuOpen ? 'open' : ''}`}>
                <a className="closebtn" style={{ cursor: 'pointer' }} id="closeButton" onClick={closeNav}>&times;</a>
                <Link className="nav-main" to="/">Solar System</Link>
                <a className="nav-list-end" onClick={openModal} style={{ cursor: 'pointer' }}>-- Add system --</a> {/* Open the modal when clicking on "Add system" */}
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

            <Modal show={isModalOpen} onHide={closeModal}> {/* The modal */}
                <Modal.Header closeButton>
                    <Modal.Title>Add System</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddSystem /> {/* The AddSystem component */}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default BurgerMenu;