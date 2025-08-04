"use client";

import Image from "next/image";

export function Team() {
  const institutions = [
    {
      name: "University of Central Florida",
      logo: "/UCF-logo.png",
      website: "https://www.ucf.edu",
    },
    {
      name: "Indian Institute of Technology Jodhpur",
      logo: "/IITJ-logo.png",
      website: "https://iitj.ac.in",
    },
    {
      name: "Indian Institute of Technology Varanasi",
      logo: "/IITV-logo.png",
      website: "https://www.iitbhu.ac.in",
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {institutions.map((institution, index) => (
            <div
              key={index}
              className="group p-6 text-center hover:scale-105 transition-transform duration-300"
              style={{ 
                border: '3px solid var(--manga-black)',
                borderRadius: '8px',
                backgroundColor: 'var(--manga-cream)',
              }}
            >
              <a 
                href={institution.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 mb-4" style={{ backgroundColor: 'var(--manga-cream)' }}>
                  <Image
                    src={institution.logo}
                    alt={`${institution.name} Logo`}
                    width={400}
                    height={400}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--manga-black)' }}>
                  {institution.name}
                </h3>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
