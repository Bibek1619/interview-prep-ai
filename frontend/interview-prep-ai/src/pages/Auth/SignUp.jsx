import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
const SignUp = ({ setCurrentPage }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    // handle sign-up logic here
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-[14px] text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>

<ProfilePhotoSelector image={profilePic} setImage={setProfilePic}



/>




        <div className="grid grid-cols-1 nd;grid-cols-1 gap-2">
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
        </div>

        {error && (
          <p className="text-red-500 text-xs pb-3">{error}</p>
        )}

        <button className="btn-primary" type="submit">
          SIGN UP
        </button>

        <p className="text-[16px] text-slate-800 mt-3">
          Already have an account?{' '}
          <button
            type="button"
            className="font-bold text-amber-600 underline cursor-pointer"
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
