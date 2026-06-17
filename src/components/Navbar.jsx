import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constent";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    user && (
      <div className="navbar bg-base-200 shadow-sm px-3 sm:px-5">
        <div className="flex-1">
          <Link
            to="/feed"
            className="btn btn-ghost text-lg sm:text-xl"
          >
            💻 devTinder
          </Link>
        </div>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost flex items-center gap-2 px-2 sm:px-3"
          >
            <span className="hidden sm:block text-sm">
              Welcome, {user.firstName}
            </span>

            <div className="w-10 sm:w-12 rounded-full overflow-hidden">
              <img
                alt="profile"
                src={
                  user?.photoUrl ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>

            <li>
              <Link to="/user/connections">
                Connections
              </Link>
            </li>

            <li>
              <Link to="/user/requests/received">
                Request Received
              </Link>
            </li>

            <li>
              <button onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default Navbar;