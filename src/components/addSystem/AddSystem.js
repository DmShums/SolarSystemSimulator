import React, { useState, useRef, useEffect } from "react";
import "./AddSystem.css";
import { useDropzone } from "react-dropzone";

import BurgerMenu from "../burgerMenu/BurgerMenu";
import Loading from "../loading/Loading";

const cloudName = "dbhq2lekx";
const unsignedUploadPreset = "ml_default";
const apiKey = "171148788834972";

const AddSystem = () => {
  const containerRef = useRef(null);
  const [imageUrls, setImageUrls] = useState([]);

  const [name, setName] = useState("");

  const onDrop = async (acceptedFiles) => {
    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i];

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
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    maxFiles: 10,
  });

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const handleSubmit = async () => {
    try {
      const newData = {
        name: name,
        urls: [imageUrls],
      };

      const addResponse = await fetch(`http://localhost:3001/systems`, {
        method: "POST", // Use POST method to add new data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      // Check if the addition was successful
      if (!addResponse.ok) {
        throw new Error("Failed to add new data");
      }

      // If successful, log the response
      const responseData = await addResponse.json();
      console.log("Data added successfully:", responseData);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

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
      <input
        className="addSystem-card-input"
        type="text"
        placeholder="Name"
        onChange={handleNameChange}
      />
      <div {...getRootProps({ className: "add-meal__dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag & drop an image here, or click to select an image</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddSystem;
