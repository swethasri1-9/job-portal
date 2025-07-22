import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { setUser } from "../redux/authSlice";

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const saveJobHandler = async () => {
  try {
    const res = await axios.post(`${JOB_API_END_POINT}/save/${jobId}`, {}, { withCredentials: true });
    if (res.data.success) {
      toast.success(res.data.message);
      setIsSaved(true);

      // Update Redux user
      dispatch(setUser({
        ...user,
        savedJobs: [...(user?.savedJobs || []), jobId],
      }));
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || "Error");
  }
};



  const unsaveJobHandler = async () => {
  try {
    const res = await axios.post(`${JOB_API_END_POINT}/unsave/${jobId}`, {}, { withCredentials: true });
    if (res.data.success) {
      toast.success(res.data.message);
      setIsSaved(false);

      // Remove job from savedJobs in Redux
      dispatch(setUser({
        ...user,
        savedJobs: (user?.savedJobs || []).filter(id => id !== jobId),
      }));
    }
  } catch (err) {
    toast.error(err?.response?.data?.message || "Error");
  }
};


  useEffect(() => {
  const fetchSingleJob = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setSingleJob(res.data.job));

        const isAlreadyApplied = res.data.job.applications?.some(app => app.applicant === user?._id);
        setIsApplied(isAlreadyApplied);

        const savedJobIds = user?.savedJobs?.map(id => id.toString());
        setIsSaved(savedJobIds?.includes(jobId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user?._id && jobId) fetchSingleJob();
}, [jobId, user?._id, user?.savedJobs]);


  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          <div className='flex items-center gap-2 mt-4'>
            <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob?.position} Positions</Badge>
            <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob?.jobType}</Badge>
            <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob?.salary}LPA</Badge>
          </div>
        </div>
        <div className='flex gap-2'>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
          
        </div>
      </div>

      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs</span></h1>
        <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
      </div>
    </div>
  );
};

export default JobDescription;
