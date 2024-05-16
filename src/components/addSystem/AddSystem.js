import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import './AddSystem.css';
import { useDropzone } from 'react-dropzone';

import BurgerMenu from "../burgerMenu/BurgerMenu";
import Loading from "../loading/Loading";

const cloudName = 'YOUR_CLOUD_NAME'; // Replace with your Cloudinary cloud name
const unsignedUploadPreset = 'YOUR_UNSIGNED_UPLOAD_PRESET'; // Replace with your Cloudinary unsigned upload preset

const AddSystem = () => {
  const containerRef = useRef(null);
  const scene = useRef(new THREE.Scene()).current;
  const [model, setModel] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', unsignedUploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
    maxFiles: 1,
  });

  // Render the model if imageUrl is available
  useEffect(() => {
    if (imageUrl) {
      // Render image preview
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        const width = 200; // Set width of the preview image
        const height = (img.height / img.width) * width; // Calculate height to maintain aspect ratio
        img.width = width;
        img.height = height;
        containerRef.current.appendChild(img);
      };
    }
  }, [imageUrl]);

  return (
    <div className="addSystem-card" ref={containerRef}>
      <BurgerMenu />
      <div {...getRootProps({ className: 'add-meal__dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select an image</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      {/* {model && <button onClick={saveModelToDatabase}>Save Model to Database</button>} */}
      {model && <button onClick={alert('saved')}>Save Model to Database</button>}
    </div>
  );
};

export default AddSystem;
