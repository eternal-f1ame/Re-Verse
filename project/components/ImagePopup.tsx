"use client";

import { useState } from "react";
import Image from "next/image";

interface ImagePopupProps {
  trigger: React.ReactNode;
  imageSrc: string;
  title: string;
  description: string;
}

export function ImagePopup({ trigger, imageSrc, title, description }: ImagePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <div onClick={() => setIsOpen(true)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-90"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-8 right-8 z-10 text-white text-3xl font-bold hover:scale-110 transition-transform duration-200"
          >
            ✕
          </button>
          
          {/* Image Only - 75% of screen */}
          <div className="relative w-[75vw] h-[75vh]">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
