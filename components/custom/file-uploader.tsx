"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  initialImage?: string; // Optional initial image URL
  onFileChange?: (file: File) => void; // Callback to handle image changes
  width?: number; // Width of the image container
  height?: number; // Height of the image container
  className?: string; // Optional additional class names
  accept?: string; // Optional additional class names
}

const FileUploader: React.FC<FileUploaderProps> = ({
  initialImage = "",
  onFileChange,
  width = 90,
  height = 90,
  className = "",
}) => {
  const [imageSrc, setImageSrc] = useState<string>(initialImage); // State to manage the image URL
  const [showFileUpload, setShowFileUpload] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file) {
        const newImageUrl = URL.createObjectURL(file); // Generate preview URL
        setImageSrc(newImageUrl); // Update image
        onFileChange?.(file); // Call callback with file and preview URL
        setShowFileUpload(false);
      }
    }
  };

  return (
    <div
      className={`relative rounded overflow-hidden border ${
        imageSrc ? "group" : "border-dashed border-gray-400"
      } ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setShowFileUpload(true)}
      onMouseLeave={() => setShowFileUpload(false)}
    >
      {imageSrc ? (
        <>
          {/* Show Image */}
          <Image
            src={imageSrc}
            alt="Uploaded preview"
            width={width}
            height={height}
            className={`transition-opacity duration-200 object-cover ${
              showFileUpload ? "opacity-50" : "opacity-100"
            }`}
          />
          {showFileUpload && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-center"
              >
                <Upload width={30} height={30} className="text-white" />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}
        </>
      ) : (
        // Show Upload Placeholder
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex items-center justify-center"
          >
            <Upload width={30} height={30} className="text-gray-600" />
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
