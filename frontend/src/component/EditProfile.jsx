import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile({ currentSession }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/profile/edit-profile-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userSession: currentSession })
        });
        const { userProfile, userDetails } = await response.json();
        setUsername(userDetails.username);
        setPassword(userDetails.password);
        setGender(userProfile.gender);
        setDOB(userProfile.dob);
        setEmail(userDetails.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/profile/edit-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          userSession: currentSession,
          username,
          password,
          gender,
          dob,
          email,
          profilePicture
        })
      });
      if (response.ok) {
        setUpdateStatus("Profile details updated");
        console.log("profile updated");
        
      } else {
        setUpdateStatus("Failed to update profile details");
      }
    } catch (error) {
      console.error(error);
      setUpdateStatus("Failed to update profile details");
    }
    navigate('/');
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/');
  };
  
  

  return (
    <div className="w-[800px] h-[690px] rounded-[20px] mx-auto relative" style={{ background: "linear-gradient(to bottom, #FFFFFF 0%, #A24857 250%)", overflow: "hidden" }}>
      <div className="absolute top-4 left-4">
        <button
          className="text-gray-700 hover:text-gray-900"
          onClick={handleBackButtonClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center mt-8 mb-6">
        {profilePicture ? (
          <img
            src={profilePicture}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 1a9 9 0 0 0-9 9c0 4.963 4.037 9 9 9s9-4.037 9-9a9 9 0 0 0-9-9zm0 2a7 7 0 0 1 7 7c0 3.859-3.141 7-7 7s-7-3.141-7-7a7 7 0 0 1 7-7zM8 9a1 1 0 0 1 2 0v2h2a1 1 0 0 1 0 2h-2v2a1 1 0 1 1-2 0v-2H8a1 1 0 0 1 0-2h2V9z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        <label htmlFor="profile-picture" className="text-grey-200 cursor-pointer">
          Change Profile Picture
        </label>
        <input
          type="file"
          id="profile-picture"
          className="hidden"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4 mx-auto max-w-md">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full sm:w-100 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={username}
            readOnly
          />
        </div>
        <div className="mb-4 mx-auto max-w-md">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full sm:w-100 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 mx-auto max-w-md">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full sm:w-100 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={password}
            readOnly
          />
        </div>
        <div className="mb-4 mx-auto max-w-md">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            className="mt-1 block w-full sm:w-100 pl-3 pr-10 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={gender}
            onChange={handleGenderChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4 mx-auto max-w-md">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            className="mt-1 block w-full sm:w-100 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={dob}
            onChange={(e) => setDOB(e.target.value)}
          />
        </div>
        <div className="text-center">
        <button
          type="submit"
          className="w-36 bg-brown text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleSubmit}
        >
          Save
        </button>
        </div>
      </form>
      <div className="text-center mt-4">
        {updateStatus && <p className="text-gray-200">{updateStatus}</p>}
      </div>
    </div>
  );
}

export default EditProfile;
