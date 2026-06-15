import React, { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store?.feed);
  const getUserFeed = async () => {
    if (users) return;
    try {
      const users = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      
      dispatch(addFeed(users?.data?.data));
      
     
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserFeed();
  }, []);

  if (!users) return;
  if (users.length <= 0) {
    return <p className="text-2xl flex justify-center py-10" >No user  found</p>;
  }

  return (
    users && (
      <div>
        <UserCard user={users[0]} />
      </div>
    )
  );
};

export default Feed;
