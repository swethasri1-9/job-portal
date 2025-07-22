import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import CompaniesTable from './CompaniesTable';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchCompanyByText } from '@/redux/companySlice';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useReduxSelector((store) => store.auth);
  const { allCompanies } = useReduxSelector((store) => store.company);
  const isRecruiter = user?.role === 'recruiter';
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        {isRecruiter && (
          <section className="relative bg-gradient-to-br from-[#e60023] to-[#ff4b4b] text-white py-10 px-6 md:px-16 overflow-hidden rounded-b-3xl">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Text + Total Responses */}
              <div className="z-10 max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Hire India’s Top Talent on <br />
                  <span className="text-white">
                    Job<span className="text-black">Portal</span>
                  </span>
                </h2>
                <p className="text-white text-lg mb-4">
                  Find the right candidate from a diverse talent pool for your role.
                </p>

                {/* Total Responses Animated Card */}
                <div className="bg-white text-black rounded-2xl p-4 shadow-lg w-[300px] mb-4">
                  <div className="flex justify-between items-center font-semibold mb-2">
                    <span>Total Responses</span>
                    <span className="font-bold">345</span>
                  </div>

                  <div className="overflow-hidden h-[160px]">
                    <div className="animate-scroll-up space-y-3">
                      {[
                        { name: 'Karan Sharma', img: 'https://randomuser.me/api/portraits/men/75.jpg' },
                        { name: 'Rajat Bansal', img: 'https://randomuser.me/api/portraits/men/76.jpg' },
                        { name: 'Divya Patel', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
                        { name: 'Rohit Kumar', img: 'https://randomuser.me/api/portraits/men/77.jpg' },
                        { name: 'Ananya Rao', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
                        { name: 'Ishita Sharma', img: 'https://randomuser.me/api/portraits/women/69.jpg' },
                      ].map((user, idx) => (
                        <div key={idx} className="flex items-center justify-between gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <img
                              src={user.img}
                              alt={user.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <div className="h-2 w-24 bg-gray-200 rounded mt-1"></div>
                            </div>
                          </div>
                          <button className="text-xs border border-gray-300 px-2 py-1 rounded hover:bg-gray-100">
                            Shortlist
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Girl Image */}
              <div className="relative flex-shrink-0 w-full md:w-auto mt-8 md:mt-0">
                <img
                  src="https://media.naukri.com/photo/ccstemplate/l244%253AI%252BAcGU3Hvn5pfs3SGUUCYZ97w3skbc49hVp6ltk4uHQC7h2e8XJi2v7ev4yQHuNhIQ%253D%253D"
                  alt="Girl with Laptop"
                  className="relative z-10 w-[220px] md:w-[280px] object-contain"
                />
              </div>
            </div>

            {/* Info Cards */}
            <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 z-10 relative">
              {infoCards.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white text-black rounded-xl px-6 py-5 text-center shadow-md max-w-xs"
                >
                  <img src={item.img} alt="icon" className="w-10 h-10 mx-auto mb-3" />
                  <p
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              ))}
            </div>

            {/* Fade effect */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-white z-0" />
          </section>
        )}

        {/* Search + New Company */}
        <div className="max-w-6xl mx-auto mt-10 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <Input
              placeholder="Filter by name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="md:w-1/2"
            />
            <div className="flex items-center gap-2">
              {(isAdmin || isRecruiter) && (
                <Button onClick={() => navigate('/admin/companies/create')}>
                  New Company
                </Button>
              )}
            </div>
          </div>

          {/* Companies Table */}
          <CompaniesTable />

          {/* FAQ Section */}
          <section className="mt-16 bg-[#F9FAFF] p-6 rounded-md">
            <h2 className="text-2xl font-bold text-center mb-2">ANY DOUBTS?</h2>
            <p className="text-center text-gray-600 mb-6 text-lg">Frequently asked questions</p>
            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const infoCards = [
  {
    img: 'https://media.naukri.com/photo/ccstemplate/l244%253AI%252BAcGU3Hvn5pfs3SGUUDb5l7w3skbsQ9hlJ%252Fk9kxuHQChaDxoK24PD1ZDQxi4%252B%252FI6w%253D%253D',
    text: 'Create & quickly publish<br>job listings in <strong>2 minutes</strong>',
  },
  {
    img: 'https://media.naukri.com/photo/ccstemplate/l244%253AI%252BAcGU3Hvn5pfs3SGUUDbJF7w3skbsQ9hlJ%252Fkt8ztnQCQvdlBn761tTj5%252BWSQF%252BjoA%253D%253D',
    text: 'Reach <strong>10 Cr+</strong> candidates<br>across <strong>industries, roles, & geographies</strong>',
  },
  {
    img: 'https://media.naukri.com/photo/ccstemplate/l244%253AI%252BAcGU3Hvn5pfs3SGUUDbJ97w3skbsQ9hlJ%252FktsxuXQC88comi9229kYt8fllyDZ8Q%253D%253D',
    text: 'Manage job listings - <strong>post, edit,<br>& track</strong> in one place',
  },
];

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="bg-white border border-gray-200 rounded-md px-4 py-3 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <p className="font-medium">{question}</p>
        <span className="text-xl font-bold">{open ? '-' : '+'}</span>
      </div>
      {open && <p className="mt-2 text-gray-600">{answer}</p>}
    </div>
  );
};

const faqData = [
  {
    q: 'I have purchased a job posting plan. How do I create a job listing?',
    a: 'Click on the "Post Jobs Now" button and fill out the form to create your job listing.',
  },
  {
    q: 'What is the difference between Resume Database Access and a Job Posting?',
    a: 'Job posting allows you to advertise your role, while Resume Access lets you search candidate profiles.',
  },
  {
    q: 'How is Resume Access Lite different from the full version?',
    a: 'Resume Access Lite provides limited filters and views compared to full Resume Access.',
  },
  {
    q: 'What details are required for a job requirement?',
    a: 'You need to provide the job title, description, required skills, experience, and salary range.',
  },
  {
    q: 'What is Assisted Hiring?',
    a: 'Assisted Hiring is a premium service where our team helps you shortlist and manage candidates.',
  },
];

export default Companies;
