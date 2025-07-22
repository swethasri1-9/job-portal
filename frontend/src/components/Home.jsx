import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Home = () => {
  useGetAllJobs();
  useGetAllCompanies();

  const { user } = useSelector((store) => store.auth);
  const { allCompanies = [] } = useSelector((store) => store.company || {});
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/admin/companies');
    }
  }, [user, navigate]);

  const filteredCompanies = allCompanies.filter((company) =>
    company.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const isAdminOrRecruiter = user?.role === 'admin' || user?.role === 'recruiter';

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />

      {/* Show this block only for admin or recruiter */}
      {isAdminOrRecruiter && (
        <>
          {/* Filter Section */}
          <div className="max-w-6xl mx-auto mt-10 mb-6 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <Input
                placeholder="Search Company by Name"
                className="w-full md:w-1/3"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button onClick={() => navigate('/admin/companies/create')}>
                New Company
              </Button>
            </div>
          </div>

          {/* Company Logos Grid */}
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {filteredCompanies.map((company) => (
              <div key={company._id} className="flex flex-col items-center">
                <img
                  src={company.logo || 'https://via.placeholder.com/100'}
                  alt={company.name}
                  className="w-20 h-20 object-cover rounded-full border"
                />
                <p className="text-sm text-center mt-2 font-medium">
                  {company.name}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <LatestJobs />
      <Footer />
    </div>
  );
};

export default Home;
