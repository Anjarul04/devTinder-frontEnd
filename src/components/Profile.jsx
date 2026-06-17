import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constent";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [emailId, setEmailId] = useState(user?.emailId || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(user?.skills || "");
  const [about, setAbout] = useState(user?.about || "");
  const [toast, setToast] = useState(false);

  const editProfile = async () => {
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, skills, about },
        { withCredentials: true },
      );
      console.log(response);
      dispatch(addUser(response.data.user));
    } catch (err) {
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.error(err);
    }
  };

  useEffect(() => {
    var timeOut = setTimeout(() => {
      setToast(false);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, [toast]);

  const handleUpdate = () => {
    setToast(true);
    editProfile();
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmailId(user.emailId || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setSkills(user.skills || "");
      setAbout(user.about || "");
    }
  }, [user]);

  if (!user) {
    return <p>please login</p>;
  }

  return (
  <>
    {toast && (
      <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated SuccessFully...</span>
        </div>
      </div>
    )}

    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8">
        
        {/* Form */}
        <div className="w-full max-w-md border border-[#ccc] p-4 rounded-xl">
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-semibold">
              First Name
            </label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id="firstName"
              type="text"
              placeholder="firstName"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block font-semibold">
              Last Name
            </label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id="lastName"
              type="text"
              placeholder="lastName"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">
              Email-Id
            </label>
            <input
              disabled
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              id="email"
              type="email"
              placeholder="email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="photoUrl" className="block font-semibold">
              Photo URL
            </label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              id="photoUrl"
              type="text"
              placeholder="photoUrl"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block font-semibold">
              Age
            </label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              id="age"
              type="text"
              placeholder="age"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block font-semibold">
              Gender
            </label>

            <select
              id="gender"
              className="w-full p-2 mt-1 border border-gray-300 bg-gray-900 rounded"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="skills" className="block font-semibold">
              Skills
            </label>
            <input
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              id="skills"
              type="text"
              placeholder="skills"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="about" className="block font-semibold">
              About
            </label>
            <textarea
              className="w-full p-2 mt-1 border border-gray-300 rounded resize-none"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              id="about"
              placeholder="about"
              rows={4}
            />
          </div>

          <button
            className="w-full text-white cursor-pointer p-3 mt-1 rounded bg-blue-600"
            onClick={handleUpdate}
          >
            Save Profile
          </button>
        </div>

        {/* Preview Card */}
        <div className="w-full max-w-sm flex justify-center">
          <UserCard
            user={{
              firstName,
              lastName,
              age,
              gender,
              about,
              photoUrl,
              skills,
            }}
          />
        </div>
      </div>
    </div>
  </>
);
}

export default Profile;
