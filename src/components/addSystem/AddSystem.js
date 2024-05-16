import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./AddSystem.css";
import { useDropzone } from "react-dropzone";

import BurgerMenu from "../burgerMenu/BurgerMenu";
import Loading from "../loading/Loading";

const cloudName = "dbhq2lekx";
const unsignedUploadPreset = "ml_default";
const apiKey = "171148788834972";

const AddSystem = () => {
  const containerRef = useRef(null);
  const scene = useRef(new THREE.Scene()).current;
  const [model, setModel] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", unsignedUploadPreset);
    formData.append("api_key", apiKey);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      let urls = [...imageUrls];
      urls.push(data.secure_url);
      setImageUrls(urls);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    maxFiles: 1,
  });

  // Render the model if imageUrl is available
  useEffect(() => {
    if (imageUrls) {
      // Render image preview
      const img = new Image();

      img.src = imageUrls[imageUrls.length - 1];
      img.onload = () => {
        const width = 200; // Set width of the preview image
        const height = (img.height / img.width) * width;
        img.width = width;
        img.height = height;
        console.log(img);
        containerRef.current.appendChild(img);
      };
    }
  }, [imageUrls]);

  return (
    <div className="addSystem-card" ref={containerRef}>
      <BurgerMenu />
      <div {...getRootProps({ className: "add-meal__dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select an image</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      {/* {model && <button onClick={saveModelToDatabase}>Save Model to Database</button>} */}
      {/* {model && <button onClick={alert('saved')}>Save Model to Database</button>} */}
    </div>
  );
};

export default AddSystem;
