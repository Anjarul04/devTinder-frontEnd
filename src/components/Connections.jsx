import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constent";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  const [loading, setLoading] = useState(true);

  const getUserConnection = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",
        {
          withCredentials: true,
        }
      );

      dispatch(addConnection(res?.data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserConnection();
  }, []);

  if (loading) {
    return <ConnectionShimmer />;
  }

  if (!Array.isArray(connection) || connection.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] px-4">
        <p className="text-center text-lg sm:text-2xl font-semibold text-gray-500">
          No connections found
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        My Connections
      </h1>

      {connection.map((user) => (
        <div
          key={user?._id}
          className="bg-base-300 rounded-xl shadow-lg p-4 mb-4 flex flex-col sm:flex-row items-center gap-4"
        >
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={user?.photoUrl}
            alt="profile"
          />

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold">
              {user?.firstName} {user?.lastName}
            </h2>

            <p className="text-sm text-gray-400 mt-1 break-words">
              {user?.about?.slice(0, 80)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ConnectionShimmer = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="skeleton h-8 w-48 mx-auto mb-8"></div>

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
        </div>
      ))}
    </div>
  );
};

export default Connections;