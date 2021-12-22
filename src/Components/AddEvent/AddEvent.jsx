import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddEvent.css";

const AddEvent = () => {
  const [imageURL, setImageURL] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const eventData = {
      name: data.name,
      date: data.date,
      location: data.location,
      category: data.category,
      volunteers: data.volunteers,
      email: data.email,
      phone: data.phone,
      imageURL: imageURL,
    };
    console.log(eventData);
    const url = `http://localhost:3000/addEvent`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  console.error(errors);

  const handleImageUpload = (e) => {
    console.log(e.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "c52aaab726332e238f3d9d23a75a804e");
    imageData.append("image", e.target.files[0]);
    fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      body: imageData,
    })
      .then((res) => res.json())
      .then((result) => {
        setImageURL(result.data.display_url);
      });
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="allInput">
            <input name="title" {...register("name")} placeholder="Your Name" />
            <br />

            <input name="date" {...register("date")} placeholder="Date" />
            <br />

            <input
              name="location"
              {...register("location")}
              placeholder="Location"
            />
            <br />

            <input
              name="category"
              {...register("category")}
              placeholder="Category"
            />
            <br />

            <input
              name="volunteers"
              {...register("volunteers")}
              placeholder="Volunteers Name"
            />
            <br />

            <input name="email" {...register("email")} placeholder="Email" />
            <br />

            <input name="phone" {...register("phone")} placeholder="Phone" />
            <br />

            <input
              name="image"
              {...register("image")}
              type="file"
              placeholder="Image"
              onChange={handleImageUpload}
            />
            <br />
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
};

export default AddEvent;
