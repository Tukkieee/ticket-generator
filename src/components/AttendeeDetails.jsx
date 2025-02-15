"use client";
import Image from "next/image";
import React, { useState, useRef, forwardRef, useEffect } from "react";

export const AttendeeDetails = forwardRef(({ onSubmit }, ref) => {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({
    photo: "",
    name: "",
    email: "",
    specialRequest: "",
  });


  // Load saved values from localStorage on mount
  useEffect(() => {
    const detail = JSON.parse(
      localStorage.getItem("Details") || "{}",
    );
    if (detail) {
      if (detail.photo) setImageUrl(detail.photo);
      if (detail.name)
        fileInputRef.current.form.name.value = detail.name;
      if (detail.email)
        fileInputRef.current.form.email.value = detail.email;
      if (detail.specialRequest)
        fileInputRef.current.form.specialRequest.value =
          detail.specialRequest;
    }
  }, []);

  
  const uploadImage = async (file) => {
    // console.log(process.env.NEXT_PUBLIC_CLOUD_NAME)
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my-uploads");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dcoalw1ak/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      console.log(data); //
      setImageUrl(data.secure_url);
      setErrors((prev) => ({ ...prev, photo: "" }));

      // Save photo URL to localStorage
      const existingDetails = JSON.parse(
        localStorage.getItem("Details") || "{}",
      );
      localStorage.setItem(
        "Details",
        JSON.stringify({
          ...existingDetails,
          photo: data.secure_url,
        }),
      );
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrors((prev) => ({ ...prev, photo: "Failed to upload image" }));
    } finally {
      setUploading(false);
    }
  };

  const handleImageDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop image
  const handleImageDrop = async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      await uploadImage(file);
    }
  };

  // Handle click image
  const handleClick= () => {
    fileInputRef.current?.click();
  };

  // Handle file change (replaces the image and triggers the upload)
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadImage(file);
    }
  };


  const handleNameChange = (e) => {
    const value = e.target.value;
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, name: "Please enter your name" }));
    } else {
      setErrors((prev) => ({ ...prev, name: "" }));
      // Save name to localStorage
      const existingDetails = JSON.parse(
        localStorage.getItem("Details") || "{}",
      );
      localStorage.setItem(
        "Details",
        JSON.stringify({
          ...existingDetails,
          name: value,
        }),
      );
    }
  };

  
  const handleEmailChange = (e) => {
    const value = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, email: "Please enter your email" }));
    } else if (!emailRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
      // Save email to localStorage
      const existingDetails = JSON.parse(
        localStorage.getItem("Details") || "{}",
      );
      localStorage.setItem(
        "Details",
        JSON.stringify({
          ...existingDetails,
          email: value,
        }),
      );
    }
  };

  // Handle special request change
  const handleSpecialRequestChange = (e) => {
    const value = e.target.value;
    if (value.length > 500) {
      setErrors((prev) => ({
        ...prev,
        specialRequest: "Special request must be less than 500 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, specialRequest: "" }));
      const existingDetails = JSON.parse(
        localStorage.getItem("Details") || "{}",
      );
      localStorage.setItem(
        "Details",
        JSON.stringify({
          ...existingDetails,
          specialRequest: value.trim() || "No request",
        }),
      );
    }
  };

  // Handle submit (checks if the image, name, and email are valid and saves the data to local storage)
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasErrors = false;

    if (!imageUrl) {
      setErrors((prev) => ({
        ...prev,
        photo: "Please upload a profile photo",
      }));
      hasErrors = true;
    }
    if (!e.target.name.value.trim()) {
      setErrors((prev) => ({ ...prev, name: "Please enter your name" }));
      hasErrors = true;
    }
    if (!e.target.email.value.trim()) {
      setErrors((prev) => ({ ...prev, email: "Please enter your email" }));
      hasErrors = true;
    }
    if (e.target.specialRequest.value.length > 500) {
      setErrors((prev) => ({
        ...prev,
        specialRequest: "Special request must be less than 500 characters",
      }));
      hasErrors = true;
    }

    if (!hasErrors) {
      const attendeeData = {
        name: e.target.name.value,
        email: e.target.email.value,
        photo: imageUrl,
        specialRequest: e.target.specialRequest.value.trim() || "No request",
      };

      // Get existing ticket details and merge with attendee data
      const existingDetails = JSON.parse(
        localStorage.getItem("Details") || "{}",
      );
      const updatedDetails = {
        ...existingDetails,
        ...attendeeData,
      };

      // Save updated details back to localStorage
      localStorage.setItem("Details", JSON.stringify(updatedDetails));

      onSubmit({
        success: true,
      });
    } else {
      onSubmit({ success: false });
    }
  };

  // Handle key press (opens the file input when the user presses enter or space) - accessibility
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <div className="space-y-8 w-full font-roboto" role="main">
      <form className="space-y-8" onSubmit={handleSubmit} ref={ref} noValidate>
        {/* Upload Profile Photo */}
        <div className="border border-borderthree bg-greenfive rounded-3xl p-6 pb-14 w-full relative">
          <h3 className="mb-10" id="upload-section">
            Upload Profile Photo
          </h3>
          <div className="sm:bg-black/20 flex justify-center items-center w-full">
            <div
              className="w-full max-w-[240px] -my-5 h-[240px] bg-bordertwo rounded-[32px] p-6 flex flex-col gap-2 justify-center items-center relative cursor-pointer group focus-within:ring-2 focus-within:ring-borderone border-4 border-greenone"
              onDragOver={handleImageDragOver}
              onDrop={handleImageDrop}
              onClick={handleClick}
              onKeyPress={handleKeyPress}
              role="button"
              tabIndex="0"
              aria-label="Upload profile photo. Drag and drop an image or click to select a file"
              aria-describedby={errors.photo ? "photo-error" : undefined}
            >
              {imageUrl ? (
                <>
                  <Image
                    src={imageUrl || "https://placehold.co/240x240"}
                    alt="Uploaded profile"
                    fill
                    className="object-cover rounded-[32px]"
                  />
                  <div className="absolute inset-0 bg-black/30 rounded-[32px] opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity flex flex-col gap-2 justify-center items-center">
                    {uploading ? (
                      <p className="text-center" role="status">
                        Uploading...
                      </p>
                    ) : (
                      <>
                        <Image
                          src="/upload.svg"
                          alt=""
                          role="presentation"
                          width={32}
                          height={32}
                        />
                        <p className="text-center w-[80%]">
                          Drag & Drop or Click to Upload
                        </p>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {uploading ? (
                    <p className="text-center" role="status">
                      Uploading...
                    </p>
                  ) : (
                    <>
                      <Image
                        src="/upload.svg"
                        alt=""
                        role="presentation"
                        width={32}
                        height={32}
                      />
                      <p className="text-center w-[80%]">
                        Drag & Drop or Click to Upload
                      </p>
                    </>
                  )}
                </>
              )}
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                required
                aria-required="true"
              />
            </div>
          </div>
          {errors.photo && (
            <span
              id="photo-error"
              className="text-red-500 text-sm absolute bottom-2 left-6"
              role="alert"
            >
              {errors.photo}
            </span>
          )}
        </div>

        {/* Separator */}
        <div className="bg-borderthree h-1" role="separator" />

        {/* Attendee Details */}
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-lightgrey">
            Enter your name <span aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="w-full bg-transparent border border-borderthree rounded-xl p-2 h-12 focus:outline-none focus:ring-2 focus:ring-borderone hover:border-borderone transition-colors"
            onChange={handleNameChange}
            onBlur={handleNameChange}
          />
          {errors.name && (
            <span id="name-error" className="text-red-500 text-sm" role="alert">
              {errors.name}
            </span>
          )}
        </div>
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-lightgrey">
            Enter your email <span aria-label="required">*</span>
          </label>
          <div className="flex items-center w-full border border-borderthree rounded-xl h-12 overflow-hidden group hover:border-borderone focus-within:ring-2 focus-within:ring-borderone transition-colors">
            <div className="pl-3 pr-1">
              <Image
                src="/email.svg"
                alt=""
                role="presentation"
                width={24}
                height={24}
              />
            </div>
            <input
              type="email"
              id="email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="flex-1 bg-transparent p-2 outline-none"
              onChange={handleEmailChange}
              onBlur={handleEmailChange}
            />
          </div>
          {errors.email && (
            <span
              id="email-error"
              className="text-red-500 text-sm"
              role="alert"
            >
              {errors.email}
            </span>
          )}
        </div>
        {/* Special request */}
        <div className="flex flex-col gap-2">
          <label htmlFor="specialRequest" className="text-lightgrey">
            Special request
          </label>
          <textarea
            id="specialRequest"
            className="w-full bg-transparent border border-borderthree rounded-xl p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-borderone hover:border-borderone transition-colors resize-y"
            onChange={handleSpecialRequestChange}
            onBlur={handleSpecialRequestChange}
            aria-invalid={!!errors.specialRequest}
            aria-describedby={
              errors.specialRequest ? "specialRequest-error" : undefined
            }
          />
          {errors.specialRequest && (
            <span
              id="specialRequest-error"
              className="text-red-500 text-sm"
              role="alert"
            >
              {errors.specialRequest}
            </span>
          )}
        </div>
      </form>
    </div>
  );
});

AttendeeDetails.displayName = "AttendeeDetails";

// export default AttendeeDetails;
