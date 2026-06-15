import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);
  const getUserConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res?.data));
      // console.log(JSON.stringify(res.data, null, 2));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUserConnection();
  }, []);

  if (!connection) {
    return <p>no connections found</p>;
  }

  return (
    <div className=" w-1/2 flex justify-center flex-col m-6 text-center">
      <h1 className="text-2xl">Connections</h1>
      {connection.map((user, index) => (
        <div
          className="rounded w-2/3 flex m-2 max-h-40 justify-between bg-gray-700"
          key={index}
        >
          <div>
            <img
              className="w-18 h-18 rounded m-1 object-cover"
              src={user.photoUrl}
              alt="profile"
            />
          </div>
          <div className="px-2 m-auto">
            <h1 className="text-xl text-gray-200 font-bold ">
              {user.firstName} {user.lastName}
            </h1>
            <p className="">{user.about.slice(0, 50)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
