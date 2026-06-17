import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestReceivedSlice";

const RequestReceived = () => {
  const dispatch = useDispatch();
  const reqReceived = useSelector((store) => store.request);

  const [loading, setLoading] = useState(true);

  const getRequestReceved = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );

      dispatch(addRequest(res?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequestReceved();
  }, []);

  const handleRequest = async (id, status) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <RequestShimmer />;
  }

  if (!Array.isArray(reqReceived) || reqReceived.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <p className="text-center text-lg sm:text-2xl font-semibold text-gray-500">
          You don't have any connection requests
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Connection Requests
      </h1>

      {reqReceived.map((user) => (
        <div
          key={user?._id}
          className="bg-base-300 rounded-xl shadow-lg p-4 mb-4 flex flex-col sm:flex-row items-center gap-4"
        >
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={user?.fromUserId?.photoUrl}
            alt="profile"
          />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">
              {user?.fromUserId?.firstName} {user?.fromUserId?.lastName}
            </h2>

            <p className="text-sm text-gray-400 mt-1 break-words">
              {user?.fromUserId?.about?.slice(0, 80)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => handleRequest(user?._id, "rejected")}
              className="btn btn-primary"
            >
              Reject
            </button>

            <button
              onClick={() => handleRequest(user?._id, "accepted")}
              className="btn btn-secondary"
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const RequestShimmer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="skeleton h-8 w-56 mx-auto mb-8"></div>

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-base-300 rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="skeleton w-20 h-20 rounded-full"></div>

          <div className="flex-1 w-full">
            <div className="skeleton h-5 w-40 mb-2"></div>
            <div className="skeleton h-4 w-full mb-2"></div>
            <div className="skeleton h-4 w-3/4"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="skeleton h-10 w-full sm:w-24"></div>
            <div className="skeleton h-10 w-full sm:w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestReceived;