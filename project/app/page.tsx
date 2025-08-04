import { Hero } from "../components/Hero";
import { Abstract } from "../components/Abstract";
import { Highlights } from "../components/Highlights";
import { Results } from "../components/Results";
import { Method } from "../components/Method";
import { Team } from "../components/Team";
import { Citation } from "../components/Citation";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden" style={{ background: 'var(--manga-cream)' }}>
      {/* Global Fixed Background Elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Manga brown overlay */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundColor: 'var(--manga-brown)' }}></div>
        
        {/* Manga-style background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
        
        {/* Manga action lines */}
        <div className="absolute inset-0 manga-action-lines opacity-5"></div>
        
        {/* Vignette overlay */}
        <div className="absolute inset-0 manga-vignette"></div>
        
        {/* Floating manga elements */}
        <div className="absolute inset-0">
          {[
            { left: 15, top: 20, icon: 'icon1.png', delay: 0, duration: 3 },
            { left: 85, top: 15, icon: 'icon2.png', delay: 1, duration: 4 },
            { left: 10, top: 70, icon: 'icon3.png', delay: 2, duration: 3.5 },
            { left: 90, top: 80, icon: 'icon4.png', delay: 0.5, duration: 4.5 },
            { left: 25, top: 85, icon: 'icon5.png', delay: 1.5, duration: 3 },
            { left: 75, top: 5, icon: 'icon6.png', delay: 2.5, duration: 4 },
            { left: 5, top: 45, icon: 'icon7.png', delay: 0.8, duration: 3.5 },
            { left: 95, top: 40, icon: 'icon1.png', delay: 1.8, duration: 3 },
            { left: 45, top: 10, icon: 'icon2.png', delay: 2.2, duration: 4.5 },
            { left: 65, top: 95, icon: 'icon3.png', delay: 0.3, duration: 3.5 },
            { left: 35, top: 25, icon: 'icon4.png', delay: 1.2, duration: 4 },
            { left: 80, top: 60, icon: 'icon5.png', delay: 2.8, duration: 3 },
            { left: 20, top: 50, icon: 'icon6.png', delay: 0.7, duration: 4.5 },
            { left: 55, top: 75, icon: 'icon7.png', delay: 1.7, duration: 3.5 },
            { left: 70, top: 30, icon: 'icon1.png', delay: 2.3, duration: 4 }
          ].map((item, i) => (
            <div
              key={i}
              className="absolute opacity-30 animate-float"
              style={{
                left: `${item.left}%`,
                top: `${item.top}%`,
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
              }}
            >
              <Image
                src={`/comic-icons/${item.icon}`}
                alt="Comic Icon"
                width={48}
                height={48}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                style={{ filter: 'sepia(50%) saturate(80%) brightness(0.8) contrast(1.2)' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
        <Hero />
        <Abstract />
        <Highlights />
        <Method />
        <Results />
        <Citation />
        <Team />
      </div>
    </div>
  );
}
