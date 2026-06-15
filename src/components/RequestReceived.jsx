import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestReceivedSlice";

const RequestReceived = () => {
  const dispatch = useDispatch();
  const reqReceived = useSelector((store) => store.request);
  const getRequestReceved = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res.data)
      dispatch(addRequest(res?.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getRequestReceved();
  }, []);

  const handleRequest = async (id, status) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review" + "/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!Array.isArray(reqReceived) || reqReceived.length === 0) {
    return <p className="text-2xl items-center my-8 flex justify-center">don't have a connection request</p>;
  }

  return (
    <div className=" w-1/2 flex justify-center flex-col m-6 text-center">
      <h1 className="text-2xl">Connections</h1>
      {reqReceived.map((user, index) => (
        <div
          className="rounded w-full flex m-2 max-h-40 justify-between bg-gray-700"
          key={index}
        >
          <div>
            <img
              className="w-18 h-18 rounded m-1 text-center object-cover"
              src={user?.fromUserId?.photoUrl}
            />
          </div>
          <div className="px-2 m-auto">
            <h1 className="text-xl ">
              {user?.fromUserId?.firstName} {user?.fromUserId?.lastName}
            </h1>
            <p className="">{user?.fromUserId?.about.slice(0,50)}</p>
          </div>
          <div className="card-actions flex text-center justify-center justify-items-center p-4">
            <button
              onClick={() => handleRequest(user?._id, "rejected")}
              className="btn btn-primary"
            >
              reject
            </button>
            <button
              onClick={() => handleRequest(user?._id, "accepted")}
              className="btn btn-secondary"
            >
              accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestReceived;
