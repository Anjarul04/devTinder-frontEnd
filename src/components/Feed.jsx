import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.feed);

  const [loading, setLoading] = useState(true);

  const getUserFeed = async () => {
    if (users) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserFeed();
  }, []);

  if (loading) {
    return <FeedShimmer />;
  }

  if (!users || users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-xl sm:text-2xl font-semibold text-gray-500">
          No users found
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-6 px-4">
      <UserCard user={users[0]} />
    </div>
  );
};

const FeedShimmer = () => {
  return (
    <div className="flex justify-center py-8 px-4">
      <div className="card bg-base-300 w-full max-w-sm shadow-xl">
        <div className="skeleton h-[420px] w-full rounded-t-xl"></div>

        <div className="card-body">
          <div className="skeleton h-6 w-40 mx-auto"></div>
          <div className="skeleton h-4 w-28 mx-auto"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-3/4"></div>

          <div className="flex gap-4 justify-center mt-4">
            <div className="skeleton h-10 w-24"></div>
            <div className="skeleton h-10 w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;