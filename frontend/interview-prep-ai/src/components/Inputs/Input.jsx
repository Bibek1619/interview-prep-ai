import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Input = ({ type, value, label, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword); // ✅ use ()

  return (
    <div>
      <label className="text-[15px] text-slate-800 font-bold">{label}</label>

      <div className="input-box">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange} // no need to wrap in (e) => onChange(e)
          className="w-full bg-transparent outline-none" // space for the icon
        />
{type === "password" && (
  <>
    {showPassword ? (
      <FaRegEye
        size={22}
        className="text-primary cursor-pointer"
        onClick={togglePassword}
      />
    ) : (
      <FaRegEyeSlash
        size={22}
        className="text-primary cursor-pointer"
        onClick={togglePassword}
      />
    )}
  </>
)}

      
      </div>
    </div>
  );
};

export default Input;
