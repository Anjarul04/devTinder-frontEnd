import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;
  const handleFeed = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + id,
        {},
        { withCredentials: true },
      );

      dispatch(removeUserFromFeed(id));
    } catch (err) {
      console.error(err);
    }
  };
  if (user.length === 0 || !user) {
    return (
      <p className="text-2xl my-10 justify-center">
        there are no user on your feed
      </p>
    );
  }

  return (
    <div className="flex justify-center justify-items-center m-5">
      <div className=" card bg-base-300 w-80 shadow-sm">
        <figure className="px-5 pt-7">
          <img
            src={photoUrl}
            alt="Shoes"
            className="rounded-xl w-72 h-96 object-cover"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p>
              {" "}
              Age: {age} <span>,  </span> Gender: {gender}{" "}
            </p>
          )}
          <p>{about}</p>
          <p></p>
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleFeed("ignored", _id)}
            >
              Ignored
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleFeed("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
