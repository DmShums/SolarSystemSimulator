import React, { useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import BurgerMenu from "../burgerMenu/BurgerMenu";
import "./AddSystem.css";

const cloudName = "dbhq2lekx";
const unsignedUploadPreset = "ml_default";
const apiKey = "171148788834972";

const AddSystem = () => {
  const containerRef = useRef(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [name, setName] = useState("");

  const onDrop = async (acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", unsignedUploadPreset);
      formData.append("api_key", apiKey);

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Failed to upload image");

        const data = await response.json();

        // setImageUrls((prevUrls) => [...prevUrls, data.secure_url]);

        let urls = [...imageUrls];
        urls.push(data.secure_url);
        setImageUrls(urls);
    
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    maxFiles: 10,
  });

  const handleNameChange = (e) => setName(e.target.value);

  const handleSubmit = async () => {
    try {
      const newData = { name, urls: [imageUrls] };

      const addResponse = await fetch(`http://localhost:3001/systems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      if (!addResponse.ok) throw new Error("Failed to add new data");

      const responseData = await addResponse.json();
      console.log("Data added successfully:", responseData);

      setImageUrls([]);
      setName("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  useEffect(() => {
    if (imageUrls.length) {
      const img = new Image();
      img.src = imageUrls[imageUrls.length - 1];
      img.onload = () => {
        img.width = 200;
        img.height = 100;
        containerRef.current.appendChild(img);
      };
    }
  }, [imageUrls]);

  return (
    <div className="addSystem-card">
      <BurgerMenu />
      <h1 className="addSystem-card-header">Create your star system</h1>
      <input
        className="addSystem-card-input"
        type="text"
        placeholder="Name your star system"
        onChange={handleNameChange}
      />
      <div {...getRootProps({ className: "add__dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag & drop an image for your 3D model here, or click to select an image</p>
      </div>
      <div className="add__preview" ref={containerRef}></div>
      <button className="system-submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddSystem;