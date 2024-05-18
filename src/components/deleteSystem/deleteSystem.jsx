import React from 'react';
import trashCan from '../../imgs/trash.png';
import './deleteSystem.css';
import { useNavigate } from 'react-router-dom';

const DeleteSystem = ({ index }) => {
    const navigator = useNavigate();

    const deleteHandler = async () => {
        try {
          const response = await fetch("http://localhost:3001/systems");
          const data = await response.json();
          const elementToDelete = data[+index["index"]]["id"];
    
          const deleteResponse = await fetch(`http://localhost:3001/systems/${elementToDelete}`, {
            method: "DELETE",
          });

          navigator('/');
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
      };

    return (
        <div onClick={deleteHandler}>
            <img className='del-sys-img' src={trashCan} alt="Delete system" />
        </div>
    );
}

export default DeleteSystem;
