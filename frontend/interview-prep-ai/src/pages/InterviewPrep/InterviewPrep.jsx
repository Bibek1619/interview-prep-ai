import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { toast } from "react-hot-toast";
import DashboardLayout from './../../components/layouts/DashboardLayout';
import RoleInfoHeader from '../../components/RoleInfoHeader';

const InterviewPrep = () => {
  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);
      // Simulate API fetch
      const mockData = {
        role: "Frontend Developer",
        experience: "Intermediate",
        description: "Focus on React and JavaScript fundamentals.",
        updatedAt: new Date(),
        questions: [{}, {}, {}] // 3 questions
      };
      setSessionData(mockData);
    } catch (error) {
      setErrorMsg("Failed to fetch session data.");
      toast.error("Failed to fetch session data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, [sessionId]); // ✅ include sessionId in dependency array

  return (
    <DashboardLayout>
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.experience || ""}
          experience={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt
              ? moment(sessionData.updatedAt).format("Do MMM YYYY")
              : ""
          }
        />
      )}
    </DashboardLayout>
  );
};

export default InterviewPrep;
