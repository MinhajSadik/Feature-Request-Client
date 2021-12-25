import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./AddEvent.css";

const AddEvent = () => {
  const [imageURL, setImageURL] = useState();
  const [events, setEvents] = useState([]);
  const {
    register,
    handleSubmit,
    // eslint-disable-next-line no-unused-vars
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const eventData = {
      name: data.name,
      date: data.date,
      email: data.email,
      imageURL: imageURL,
    };
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

  const handleImageUpload = (e) => {
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

  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
      });
  }, []);

  const deleteEvent = (id) => {
    fetch(`http://localhost:3000/deleteEvent/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result", result);
        console.log("deleted", id);
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

            <input name="email" {...register("email")} placeholder="Email" />
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
        <div>
          {events.map((event) => {
            return (
              <div key={event._id}>
                <br />
                <h3 className="text-center text-white-900 text-3xl font-bold underline">
                  {event.name}
                </h3>
                <p>{event.date}</p>
                <p>{event.email}</p>
                <button onClick={() => deleteEvent(event._id)}>Delete</button>
                <img className="w-10" src={event.imageURL} alt={event.name} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddEvent;
