import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/authSlice'; // ✅ THIS FIXES THE ERROR
import axios from 'axios';
import { toast } from 'sonner';
import { JOB_API_END_POINT } from '@/utils/constant';


const Job = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedJobIds = user?.savedJobs?.map(id => id.toString());
    setIsSaved(savedJobIds?.includes(job._id));
  }, [user?.savedJobs, job._id]);

  const saveJobHandler = async () => {
  try {
    const res = await axios.post(`${JOB_API_END_POINT}/save/${job._id}`, {}, { withCredentials: true });
    console.log("Save Job Response:", res.data); // ✅ TEMP LOG

    if (res.data.success) {
      toast.success(res.data.message);
      setIsSaved(true);

      if (res.data.user) {
        dispatch(setUser(res.data.user));
      } else {
        console.error("User data missing from response");
      }
    }
  } catch (err) {
    console.error("Save error:", err);
    toast.error(err?.response?.data?.message || 'Error saving job');
  }
};

  const unsaveJobHandler = async () => {
    try {
      const res = await axios.post(`${JOB_API_END_POINT}/unsave/${job._id}`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
        setIsSaved(false);
        dispatch(setUser(res.data.user));

      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Error unsaving job');
    }
  };

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full"
          size="icon"
          onClick={isSaved ? unsaveJobHandler : saveJobHandler}
        >
          {isSaved ? <BookmarkCheck className="text-green-600" /> : <Bookmark />}
        </Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-sm text-gray-500'>India</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
      </div>

      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button
          className="bg-[#7209b7]"
          onClick={isSaved ? unsaveJobHandler : saveJobHandler}
        >
          {isSaved ? 'Unsave Job' : 'Save for Later'}
        </Button>
      </div>
    </div>
  );
};

export default Job;

