import React, { useState } from 'react';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';

const VisionaryLLMDocs = ({ lang = 'en' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');

  const translations = {
    en: {
      search: "Search documentation...",
      sections: {
        introduction: "Introduction",
        objective: "Research Objective",
        framework: "Framework Overview",
        challenges: "Background & Challenges",
        demo: "Demo & Results"
      },
      prev: "Previous",
      next: "Next",
      slideOf: "Slide {current} of {total}"
    }
  };

  const t = translations[lang];

  // Define slide content that maps to your actual presentation images
  const slides = [
    {
      id: 'title',
      image: '/slides/Presentation_1.jpg',  // Title slide
      section: 'introduction'
    },
    {
      id: 'introduction',
      image: '/slides/Presentation_2.jpg',  // Introduction/Background slide
      section: 'challenges'
    },
    {
      id: 'objective',
      image: '/slides/Presentation_3.jpg',  // Research Objective slide
      section: 'objective'
    },
    {
      id: 'framework',
      image: '/slides/Presentation_4.jpg',  // Framework Overview slide
      section: 'framework'
    },
    {
      id: 'demo',
      image: '/slides/Presentation_5.jpg',  // Demo slide
      section: 'demo'
    }
  ];

  // Navigation structure
  const navigation = [
    {
      title: t.sections.introduction,
      items: [
        { title: "Title", href: "#title", slideIndex: 0 },
        { title: "Project Overview", href: "#overview", slideIndex: 0 }
      ]
    },
    {
      title: t.sections.challenges,
      items: [
        { title: "Background", href: "#background", slideIndex: 1 },
        { title: "Current Challenges", href: "#challenges", slideIndex: 1 }
      ]
    },
    {
      title: t.sections.objective,
      items: [
        { title: "Research Goals", href: "#goals", slideIndex: 2 },
        { title: "Expected Outcomes", href: "#outcomes", slideIndex: 2 }
      ]
    },
    {
      title: t.sections.framework,
      items: [
        { title: "Architecture", href: "#architecture", slideIndex: 3 },
        { title: "Components", href: "#components", slideIndex: 3 }
      ]
    },
    {
      title: t.sections.demo,
      items: [
        { title: "Implementation", href: "#implementation", slideIndex: 4 },
        { title: "Results", href: "#results", slideIndex: 4 }
      ]
    }
  ];

  const handleNavClick = (slideIndex) => {
    setCurrentSlide(slideIndex);
    setActiveSection(slides[slideIndex].section);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => Math.max(0, prev - 1));
    setActiveSection(slides[Math.max(0, currentSlide - 1)].section);
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1));
    setActiveSection(slides[Math.min(slides.length - 1, currentSlide + 1)].section);
  };

  return (
    <div className="fixed left-0 right-0 bottom-0 top-16 bg-white">
      <div className="lg:flex h-full">
        {/* Left Sidebar - Documentation Navigation */}
        <aside className={`fixed inset-y-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-full overflow-y-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={t.search}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 focus:border-gray-300 outline-none"
              />
            </div>
          </div>
          <nav className="p-4">
            {navigation.map((section, i) => (
              <div key={i} className="mb-6">
                <h3 className="font-medium mb-2">{section.title}</h3>
                <ul className="space-y-1">
                  {section.items.map((item, j) => (
                    <li key={j}>
                      <button
                        onClick={() => handleNavClick(item.slideIndex)}
                        className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${
                          currentSlide === item.slideIndex
                            ? 'bg-gray-50 text-gray-900 border-l-2 border-gray-900'
                            : 'text-gray-600 hover:text-gray-900 border-l-2 border-transparent'
                        }`}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content - Slide Display */}
        <main className="flex-1 min-w-0 flex flex-col h-full">
          {/* Slide Display Area */}
          <div className="flex-1 overflow-hidden p-4 flex items-center justify-center bg-gray-50">
            <div className="relative w-full max-w-4xl aspect-[16/9] bg-white shadow-lg">
              <img
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                style={{
                  width: 'calc(100vw - 1rem)', // Adjust based on sidebar width
                  height: 'auto'
                }}
              />
            </div>
          </div>
          
          {/* Slide Controls */}
          <div className="border-t border-gray-200 p-4 flex items-center justify-between bg-white">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.prev}
            </button>
            
            <span className="text-sm text-gray-500">
              {t.slideOf.replace('{current}', currentSlide + 1).replace('{total}', slides.length)}
            </span>
            
            <button
              onClick={handleNextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.next}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VisionaryLLMDocs;