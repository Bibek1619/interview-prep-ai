import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from './../../utils/uploadImage';

const SignUp = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password || password.length < 8) {
      setError("Please enter a password with at least 8 characters");
      return;
    }

    setError("");

    try {
      // sign-up logic here (e.g., API call)

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,

        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-md">
      <h3 className="text-xl sm:text-2xl font-semibold text-black text-center">
        Create an Account
      </h3>
      <p className="text-sm sm:text-base text-slate-700 mt-2 mb-6 text-center">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="space-y-4">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <Input
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          label="Full Name"
          placeholder="Bibek Wagle"
          type="text"
        />

        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email Address"
          placeholder="bibek@gmail.com"
          type="email"
        />

        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          label="Password"
          placeholder="Enter at least 8 characters"
          type="password"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-amber-500 text-white font-bold rounded-md hover:bg-amber-600 transition cursor-pointer"
        >
          SIGN UP
        </button>

        <p className="text-sm text-center mt-4 text-slate-800">
          Already have an account?{" "}
          <button
            type="button"
            className="font-semibold text-amber-600 underline"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
