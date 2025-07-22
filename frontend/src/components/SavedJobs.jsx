import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import JobCard from "./Job"; // ✅ Update path if needed
import Navbar from "./shared/Navbar";

const SavedJobs = () => {
  const { user } = useSelector((state) => state.auth);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);

        // ✅ Normalize savedJobs to extract only job IDs
        const jobIds = (user?.savedJobs || []).map(job =>
          typeof job === "string" ? job : job._id
        );

        const jobDetails = await Promise.all(
          jobIds.map((id) =>
            axios
              .get(`http://localhost:8000/api/v1/job/get/${id}`, {
                withCredentials: true,
              })
              .then((res) => res.data.job)
              .catch((err) => null) // skip failed
          )
        );

        // ✅ Filter out any null (failed) responses
        setSavedJobs(jobDetails.filter(job => job));
        setLoading(false);
      } catch (error) {
        console.error("Failed to load saved jobs:", error);
        setLoading(false);
      }
    };

    if (user?.savedJobs?.length) {
      fetchSavedJobs();
    } else {
      setSavedJobs([]); // reset if no saved jobs
    }
  }, [user]);

  return (
    <div>
            <Navbar />
    <div className="max-w-7xl mx-auto mt-8">
      
      <h1 className="text-xl font-bold mb-4">Saved Jobs</h1>

      {loading ? (
        <p className="text-gray-500">Loading saved jobs...</p>
      ) : savedJobs.length > 0 ? (
        savedJobs.map((job) => <JobCard key={job._id} job={job} />)
      ) : (
        <p className="text-gray-500">No saved jobs.</p>
      )}
    </div>
    </div>
  );
};

export default SavedJobs;
