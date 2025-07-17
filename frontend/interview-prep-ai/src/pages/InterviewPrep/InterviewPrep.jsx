import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "./../../components/layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import AIResponsePreview from "./components/AIResponsePreview";
import Drawer from "../../components/Drawer";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";


const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10); // show 10 initially

  

  const fetchSessionDetailsById = async () => {
    try {
    
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.data) {
        setSessionData(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } 
  };

  const generateConceptExplanation = async (question) => {
    // Implementation
    try{
      setErrorMsg("")
      setExplanation(null)

      setIsLoading(true);
      setOpenLearnMoreDrawer(true);
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );
      if(response.data){
        setExplanation(response.data)
      }
    }catch(error){
      setExplanation(null)
      setErrorMsg("failed to generate explanaion,try again later");
      console.error("Error:",error);

    }
finally{
  setIsLoading(false);
}

  };

  const toggleQuestionPinStatus = async (questionId) => {
  try {
   

    const response = await axiosInstance.post(
      API_PATHS.QUESTION.PIN(questionId)
    );

    if (response.data && response.data.data) {
      const isNowPinned = response.data.data.isPinned;

      // Toast message
      toast.success(isNowPinned ? "Pinned successfully!" : "Unpinned successfully!");

      // Refetch updated session
      await fetchSessionDetailsById();
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Something went wrong while pinning/unpinning.");
  } 
};


 const uploadMoreQuestions = async () => {
  try {
    setIsUpdateLoader(true);

    // 🔍 1. Check what you're about to send
    console.log("Sending AI request with:", {
      role: sessionData?.role,
      experience: sessionData?.experience,
      topicsToFocus: sessionData?.topicsToFocus,
    });

    // ✅ 2. Optional: validate fields before sending
    if (
      !sessionData?.role ||
      !sessionData?.experience ||
      !sessionData?.topicsToFocus
    ) {
      toast.error("Missing session data: Please provide role, experience, and topics.");
      setIsUpdateLoader(false);
      return;
    }

    // 🚀 3. Proceed with request
    const aiResponse = await axiosInstance.post(
      API_PATHS.AI.GENERATE_QUESTIONS,
      {
       role: sessionData?.role,
  experience: sessionData?.experience,
  topicsToFocus: sessionData?.topicsToFocus,
  numberOfQuestions: 10, // 🔥 REQUIRED FIELD
      }
    );

    const generatedQuestions = aiResponse.data;

    // Add to session
    const response = await axiosInstance.post(
      API_PATHS.QUESTION.ADD_TO_SESSION,
      {
        sessionId,
        questions: generatedQuestions,
      }
    );

    if (response.data) {
      toast.success("Added more Q&A!");
      fetchSessionDetailsById();
    }
  } catch (error) {
    if (error.response && error.response.data.message) {
      setErrorMsg(error.response.data.message);
    } else {
      setErrorMsg("Something went wrong. Please try again later.");
    }
  } finally {
    setIsUpdateLoader(false);
  }
};

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return ()=>{};
  }, []);

  return (
    
    <DashboardLayout>
     
        
          <RoleInfoHeader
            role={sessionData?.role || ""}
            topicsToFocus={sessionData?.topicsToFocus || ""}
            experience={sessionData?.experience || "-"}
            questions={sessionData?.questions?.length || "-"}
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                : ""
            }
          />

          <div className="container mx-auto pt-4 pb-4 px-4 md:px-0">
            <h2 className="text-lg font-semibold text-black">Interview Q & A</h2>
            <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
              <div
                className={`col-span-12 ${
                  openLearnMoreDrawer ? "md:col-span-7" : "md:col-span-8"
                }`}
              >
                <AnimatePresence>
                  {sessionData?.questions?.map((data, index) => {
                    return(
                    <motion.div
                      key={data._id || index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 100,
                        delay: index * 0.1,
                        damping: 15,
                      }}
                      layout
                      layoutId={`question-${data._id || index}`}
                    >
                      
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                       
                        onLearnMore={() =>
                          generateConceptExplanation(data.question)
                        }
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data._id)}
                      />

                      {!isLoading && sessionData?.questions?.length == index +1 && (
                        <div className=" flex items-center justify-center mt-5">
                          <button className="flex items-center gap-3 text0sm text-white font-medium animated-gradient px-5 py-2 mr-2 rounded text-nowrap cursor-pointer" disabled={isLoading || isUpdateLoader}
                          onClick={uploadMoreQuestions}>
                            {isUpdateLoader ? (<SpinnerLoader/>):(
                              <LuListCollapse className="text-lg"/>
                            )}{""}
                            Load More

                          </button>
                        </div>
                      )}
                      
                    </motion.div>
                  );
                })}
                </AnimatePresence>
              </div>
            </div>
<div>
  <Drawer
    isOpen={openLearnMoreDrawer}
    onClose={() => setOpenLearnMoreDrawer(false)}
    title={!isLoading && explanation?.title}
  >
    {errorMsg && (
      <p className="text-sm text-amber-600 flex gap-2 font-medium">
        <LuCircleAlert className="mt-10" />
        {errorMsg}
      </p>
    )}
    {isLoading && <SkeletonLoader/>}

    {!isLoading && explanation && (
      <AIResponsePreview content={explanation?.explanation} />
    )}
  </Drawer>
</div>

        
      </div>
    </DashboardLayout>
  
    
  )
}

export default InterviewPrep;
