import Image from 'next/image';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { languages } from '@/data/languages';
import { useLanguage } from '@/context/LanguageContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LanguageDropdown = ({ textColor, hoverColor, isDark }: any) => {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 text-lg font-medium ${textColor} ${hoverColor} transition`}
      >
        {currentLang && (
          <Image
            src={currentLang.flag}
            alt={currentLang.label}
            width={20}
            height={14}
            className="rounded-sm"
          />
        )}
        {currentLang?.label}
        <FaChevronDown className={`text-sm transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          className={`
            absolute right-0 mt-2 w-56 rounded-md overflow-hidden shadow-lg z-50
            ${isDark ? 'bg-[#0F1C2E] text-[#D4A75D]' : 'bg-white text-black'}
          `}
        >
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Image
                src={l.flag}
                alt={l.label}
                width={20}
                height={14}
                className="rounded-sm"
              />
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
