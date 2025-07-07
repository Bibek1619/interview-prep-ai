import React from 'react'
import { useNavigate } from 'react-router-dom';

import Input from './../../components/Inputs/Input';

const CreateSessionForm = ({}) => {
    const [formData, setformData] = useState({
        role:"",
        experience:"",
        topicToFocus:"",
        description:""
    });
    const [isLoading,setLoading]=useState(false);
    const [error, seterror] = useState(null);
    const navigate=useNavigate();
    const handlechange=(key,value)=>{
        setformData((prevData)=>({
            ...prevData,
            [key]:value
        }))

    };
    const handleCreateSession =async(e)=>{
        e.preventDefault();
        const {role,experience,topicToFocus}=formData;

        if(!role || experience||topicToFocus){
            seterror("Please fill all the fields");
            return;
        }
        seterror("");


    };


  return (
    <div>CreateSessionForm</div>
  )
}

export default CreateSessionForm