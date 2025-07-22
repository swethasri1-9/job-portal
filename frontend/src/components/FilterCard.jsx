import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const locationOptions = [
  "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai",
  "Chennai", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow"
];

const industryOptions = [
  "Frontend Developer", "Backend Developer", "FullStack Developer",
  "Data Scientist", "DevOps Engineer", "Product Manager"
];

const salaryOptions = [
  "0 - 3 LPA",
  "3 - 7 LPA",
  "7 - 15 LPA",
  "15 - 25 LPA",
  "25+ LPA"
];

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedSalary, setSelectedSalary] = useState('');

  const handleLocationChange = (value) => {
    dispatch(setSearchedQuery(value));
  };

  const handleIndustryChange = (value) => {
    dispatch(setSearchedQuery(value));
  };

  const handleSalaryChange = (value) => {
    setSelectedSalary(value);
    dispatch(setSearchedQuery(value));
  };

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg mb-3'>Filter Jobs</h1>
      <hr className='mb-4' />

      {/* Location Dropdown */}
      <div className='mb-5'>
        <Label className='font-semibold text-sm mb-1 block'>Location</Label>
        <Select onValueChange={handleLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            {locationOptions.map((location, idx) => (
              <SelectItem key={idx} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Industry Dropdown */}
      <div className='mb-5'>
        <Label className='font-semibold text-sm mb-1 block'>Industry</Label>
        <Select onValueChange={handleIndustryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Industry" />
          </SelectTrigger>
          <SelectContent>
            {industryOptions.map((industry, idx) => (
              <SelectItem key={idx} value={industry}>
                {industry}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Salary RadioGroup */}
      <div className='mb-2'>
        <Label className='font-semibold text-sm mb-1 block'>Salary</Label>
        <RadioGroup value={selectedSalary} onValueChange={handleSalaryChange}>
          {salaryOptions.map((range, idx) => (
            <div key={idx} className='flex items-center space-x-2 my-2'>
              <RadioGroupItem value={range} id={`salary-${idx}`} />
              <Label htmlFor={`salary-${idx}`}>{range}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterCard;
