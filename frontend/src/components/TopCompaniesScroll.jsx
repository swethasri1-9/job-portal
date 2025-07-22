import React from 'react';

const companies = [
  {
    name: 'PepsiCo',
    logo: 'https://d8it4huxumps7.cloudfront.net/images/partners/partners125/pepsico-59c8d5cc2e0ee1506334156.jpg?d=100x100',
  },
  {
    name: 'Coca Cola',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-649bf4ad99fde_whatsapp_image_2023-06-28_at_14.18.13.jpg?d=110x110',
  },
  {
    name: 'Amazon',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/682eba2ac696f_amazon.png?d=300x300',
  },
  {
    name: 'Samsung',
    logo: 'http://d8it4huxumps7.cloudfront.net/images/partners/partners125/5c77acc691750_samsung-logo-4__1_.png?d=120x120',
  },
  {
    name: 'Flipkart',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/682eba182b6f3_flipkart.png?d=195x70',
  },
  {
    name: 'Snapdeal',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/62e4bdf0c2312_snapdeal.png?d=195x70',
  },
  {
    name: 'Myntra',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/62e4b91214c09_myntra.png?d=150x100',
  },
  {
    name: 'OLA',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/employer-branding/ola.png?d=80x80',
  },
  {
    name: 'Tata',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/607e6aff65ccc_tata.png?d=63x58',
  },
  {
    name: 'Reliance',
    logo: 'https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/reliance-industries-logo.png?d=110x100',
  },
  // Add more as needed
];

const TopCompaniesScroll = () => {
  return (
    <section className="w-full py-10 bg-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Top Companies Listing on <span className="text-red-600">JobPortal</span>
        </h2>
        <p className="text-sm text-gray-500">Find jobs that fit your career aspirations.</p>
      </div>

      <div className="overflow-hidden relative">
        <div className="animate-scroll flex space-x-10 w-max">
          {[...companies, ...companies].map((company, index) => (
            <div key={index} className="flex-shrink-0 w-28 h-28 p-2 bg-white shadow rounded-full flex items-center justify-center">
              <img
                src={company.logo}
                alt={company.name}
                className="w-20 h-20 object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompaniesScroll;
