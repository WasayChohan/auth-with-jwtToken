"use client";

import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.set("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("File uploaded successfully!");
        console.log("Uploaded Image:", result.image);
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
