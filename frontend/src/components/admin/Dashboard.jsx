import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto my-10 px-4">
          {/* Post Your Jobs Banner */}
          <section className="bg-[#F9FAFF] p-6 md:p-12 rounded-lg mb-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Post Your <span className="text-red-600">Jobs & Internships</span>
              </h2>
              <p className="text-gray-600">
                Find the right candidate from a diverse talent pool for your role.
              </p>
              <button
                onClick={() => navigate('/admin/jobs/create')}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm"
              >
                Post Jobs Now →
              </button>
            </div>
            <div className="w-full md:w-auto">
              <img
                src="https://d8it4huxumps7.cloudfront.net/uploads/images/676e63dfe135a_host_banner.png?d=812x694"
                alt="Post Jobs"
                className="w-[300px] md:w-[450px]"
              />
            </div>
          </section>

          {/* Top Companies Marquee Section */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-2">
              Top Companies Listing on{' '}
              <span className="font-bold text-red-600">
                <span className="text-black">Job</span>Portal
              </span>
            </h2>
            <p className="text-gray-600 mb-4">Find jobs that fit your career aspirations.</p>

            <div className="relative w-full overflow-hidden">
              <div className="flex gap-6 animate-marquee">
                {topCompanyLogos.concat(topCompanyLogos).map((logo, idx) => (
                  <img
                    key={idx}
                    src={logo}
                    alt={`company-${idx}`}
                    className="w-24 h-24 object-contain border rounded-md p-2"
                  />
                ))}
              </div>
            </div>
          </section>

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

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = React.useState(false);
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

const topCompanyLogos = [
  'https://d8it4huxumps7.cloudfront.net/images/partners/partners125/pepsico-59c8d5cc2e0ee1506334156.jpg?d=100x100',
  'https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-649bf4ad99fde_whatsapp_image_2023-06-28_at_14.18.13.jpg?d=110x110',
  'https://d8it4huxumps7.cloudfront.net/images/partners/partners125/64ca0cc6bcf28_c00f74ba-d5fd-47aa-8085-28bdef9aa007.jpeg?d=120x120',
  'http://d8it4huxumps7.cloudfront.net/images/partners/partners125/5c77acc691750_samsung-logo-4__1_.png?d=120x120',
  'https://d8it4huxumps7.cloudfront.net/uploads/images/682eba182b6f3_flipkart.png?d=195x70',
  'https://d8it4huxumps7.cloudfront.net/uploads/images/682eba2ac696f_amazon.png?d=300x300',
  'https://d8it4huxumps7.cloudfront.net/uploads/images/62e4bdf0c2312_snapdeal.png?d=195x70',
  'https://d8it4huxumps7.cloudfront.net/uploads/images/62e4b91214c09_myntra.png?d=150x100',
  'https://d8it4huxumps7.cloudfront.net/uploads/images/employer-branding/ola.png?d=80x80',
  'https://d8it4huxumps7.cloudfront.net/images/partners/partners75/619b7ece003ca_juspay.png?d=150x100',
  'https://d8it4huxumps7.cloudfront.net/images/partners/partners125/63ff2689153cd_boat_logo.png?d=120x120',
];

const faqData = [
  {
    q: 'How do I create a job listing?',
    a: 'Click on the "Post Jobs Now" button and fill out the form to create your job listing.',
  },
  {
    q: 'What’s the difference between Resume Access and a Job Posting?',
    a: 'Job posting lets you advertise your role, Resume Access lets you search for candidates directly.',
  },
  {
    q: 'What is Assisted Hiring?',
    a: 'A premium service where our hiring experts help you shortlist and manage candidates.',
  },
  {
    q: 'What kind of support is available?',
    a: 'You’ll have access to email, chat, and phone support for any hiring-related issues.',
  },
];

export default Dashboard;
