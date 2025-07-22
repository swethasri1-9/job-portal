import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p className="text-gray-600">{job.company?.name}</p>
      <p className="text-sm">{job.salary} LPA • {job.location}</p>
      <div className="mt-2">
        <Link to={`/job/${job._id}`}>
          <Button>View Job</Button>
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
