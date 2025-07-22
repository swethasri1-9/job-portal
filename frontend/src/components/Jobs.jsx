import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const parseSalary = (salaryStr) => {
  const match = salaryStr.match(/(\d+)(?:LPA)?\s*-\s*(\d+)(?:LPA)?/i);
  if (!match) return [0, 0];
  return [parseInt(match[1]), parseInt(match[2])];
};

const salaryFilterMap = {
  "0-5 LPA": [0, 5],
  "6-10 LPA": [6, 10],
  "11-20 LPA": [11, 20],
  "21+ LPA": [21, Infinity]
};

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery && salaryFilterMap[searchedQuery]) {
      const [min, max] = salaryFilterMap[searchedQuery];
      const filtered = allJobs.filter((job) => {
        const [jobMin, jobMax] = parseSalary(job.salary);
        return jobMin >= min && jobMax <= max;
      });
      setFilterJobs(filtered);
    } else if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs)
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
            <FilterCard />
          </div>
          {
            filterJobs.length <= 0 ? <span>Job not found</span> : (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterJobs.map((job) => (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        key={job?._id}>
                        <Job job={job} />
                      </motion.div>
                    ))
                  }
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Jobs
