import React from "react";
import { useNavigate } from "react-router-dom";

import Input from "./../../components/Inputs/Input";
import { useState } from "react";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
const CreateSessionForm = ({}) => {
  const [formData, setformData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });
  const [isLoading, setLoading] = useState(false);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const handlechange = (key, value) => {
    setformData((prevData) => ({
      ...prevData,
       [key]: value,
      
     
    }));
  };
  const handleCreateSession = async (e) => {
    e.preventDefault();
    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      seterror("Please fill all the fields");
      return;
    }
    seterror("");
    setLoading(true)

try{
  //generate qsn
  const aiResponse =await axiosInstance.post(
    API_PATHS.AI.GENERATE_QUESTIONS,
    {
      role,
      experience,
      topicsToFocus,
      numberOfQuestions:10,
    }
  

  );
   //should be array like [{question,answer},...]
  const generatedQuestions=aiResponse.data;
  console.log("Generated question from AI:", generatedQuestions);

  const response = await axiosInstance.post(API_PATHS.SESSION.CREATE,{
    ...formData,
   questions: aiResponse.data.questions,

  });
  if(response.data?.session?._id){
   navigate(`/interview-prep/${response.data?.session?._id}`);


  }
  


}
catch(error){
  if(error.response && error.response.message){
    seterror("something went wrong.plese try again.")
  }
  
}
finally{
  setLoading(false)

}


  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center ">
      <h3 className="text-lg font-semibold text-black">Start a New Interview Journey</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few quick details and unlock your personalized set of
        interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="flex flex-col gap-3">
        <Input
          value={formData.role}
          onChange={({ target }) => handlechange("role", target.value)}
          label="Target Role"
          placeholder="(e.g..Frontend developer,ui/ux designer,etc,)"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handlechange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g.,1 year,3 years,5+years"
          type="number"
        />
        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handlechange("topicsToFocus", target.value)}
          label="Topics to Focus On"
          placeholder="(Comma-seperated ,e.g.,React ,Node.js MongoDB)"
          type="text"
        />
        <Input
          value={formData.description}
          onChange={({ target }) => handlechange("description", target.value)}
          label=" Description"
          placeholder="(Anyspecific goals or notes for this session)"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
       <button
  type="submit"
  className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
  disabled={isLoading}
>
  {isLoading && <SpinnerLoader />}
  {isLoading ? "Creating..." : "Create Session"}
</button>

      </form>
    </div>
  );
};

export default CreateSessionForm;
