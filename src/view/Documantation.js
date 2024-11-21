import React, { useState, useCallback, useEffect } from 'react';
import { Search, ArrowLeft, ArrowRight, Maximize2, Minimize2 } from 'lucide-react';

const VisionaryLLMDocs = ({ lang = 'en' }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introduction');
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      slideOf: "Slide {current} of {total}",
      toggleFullscreen: "Toggle fullscreen"
    }
  };

  const t = translations[lang];

  const slides = [
    {
      id: 'title',
      image: '/slides/Presentation_1.jpg',
      section: 'introduction'
    },
    {
      id: 'introduction',
      image: '/slides/Presentation_2.jpg',
      section: 'challenges'
    },
    {
      id: 'framework',
      image: '/slides/Presentation_4.jpg',
      section: 'framework'
    },
    {
      id: 'demo',
      image: '/slides/Presentation_5.jpg',
      section: 'demo'
    }
  ];

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
      title: t.sections.framework,
      items: [
        { title: "Architecture", href: "#architecture", slideIndex: 2 },
        { title: "Components", href: "#components", slideIndex: 2 }
      ]
    },
    {
      title: t.sections.demo,
      items: [
        { title: "Implementation", href: "#implementation", slideIndex: 3 },
        { title: "Results", href: "#results", slideIndex: 3 }
      ]
    }
  ];

  const handleNavClick = useCallback((slideIndex) => {
    setCurrentSlide(slideIndex);
    setActiveSection(slides[slideIndex].section);
    setSidebarOpen(false); // Close sidebar on mobile after navigation
  }, [slides]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(prev => {
      const newSlide = Math.max(0, prev - 1);
      setActiveSection(slides[newSlide].section);
      return newSlide;
    });
  }, [slides]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(prev => {
      const newSlide = Math.min(slides.length - 1, prev + 1);
      setActiveSection(slides[newSlide].section);
      return newSlide;
    });
  }, [slides]);

  const handleFullscreen = async () => {
    try {
      const presentationElement = document.getElementById('presentation-container');
      if (!document.fullscreenElement) {
        await presentationElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Error attempting to toggle fullscreen:', err);
    }
  };

  // 处理滚轮事件
  const handleWheel = useCallback((event) => {
    if (event.deltaY !== 0) {
      requestAnimationFrame(() => {
        if (event.deltaY > 0) {
          handleNextSlide();
        } else {
          handlePrevSlide();
        }
      });
    }
  }, [handleNextSlide, handlePrevSlide]);

  // 键盘事件处理
  const handleKeyPress = useCallback((event) => {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        handlePrevSlide();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        handleNextSlide();
        break;
      case 'f':
        event.preventDefault();
        handleFullscreen();
        break;
      case 'Escape':
        if (isFullscreen) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
        break;
      case 'Home':
        event.preventDefault();
        setCurrentSlide(0);
        setActiveSection(slides[0].section);
        break;
      case 'End':
        event.preventDefault();
        setCurrentSlide(slides.length - 1);
        setActiveSection(slides[slides.length - 1].section);
        break;
      default:
        break;
    }
  }, [handlePrevSlide, handleNextSlide, handleFullscreen, isFullscreen, slides]);

  // 键盘和滚轮事件监听
  useEffect(() => {
    const presentationElement = document.getElementById('presentation-container');
    
    const wheelHandler = (e) => {
      e.preventDefault();
      handleWheel(e);
    };

    document.addEventListener('keydown', handleKeyPress);
    
    if (isFullscreen && presentationElement) {
      presentationElement.addEventListener('wheel', wheelHandler, { passive: false });
    }

    const fullscreenChangeHandler = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      if (presentationElement) {
        presentationElement.removeEventListener('wheel', wheelHandler);
      }
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    };
  }, [handleKeyPress, handleWheel, isFullscreen]);

  // 触摸事件处理
  useEffect(() => {
    const presentationElement = document.getElementById('presentation-container');
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) {
            handlePrevSlide();
          } else {
            handleNextSlide();
          }
        }
      } else {
        if (Math.abs(deltaY) > 50) {
          if (deltaY > 0) {
            handlePrevSlide();
          } else {
            handleNextSlide();
          }
        }
      }
    };

    if (presentationElement) {
      presentationElement.addEventListener('touchstart', handleTouchStart);
      presentationElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (presentationElement) {
        presentationElement.removeEventListener('touchstart', handleTouchStart);
        presentationElement.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [handlePrevSlide, handleNextSlide]);

  return (
    <div className="fixed left-0 right-0 bottom-0 top-16 bg-white">
      <div className="lg:flex h-full">
        {/* Left Sidebar - Documentation Navigation */}
        {!isFullscreen && (
          <aside className={`fixed inset-y-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-full overflow-y-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={t.search}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-gray-300 focus:ring-1 focus:ring-gray-300 outline-none"
                />
              </div>
            </div>
            <nav className="p-4">
              {navigation.map((section, i) => (
                <div key={i} className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item, j) => (
                      <li key={j}>
                        <button
                          onClick={() => handleNavClick(item.slideIndex)}
                          className={`w-full text-left px-4 py-1.5 text-sm rounded-md transition-colors ${
                            currentSlide === item.slideIndex
                              ? 'bg-gray-100 text-gray-900 font-medium'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
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
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0 flex flex-col h-full">
          <div 
            id="presentation-container"
            className={`flex-1 overflow-hidden flex flex-col ${
              isFullscreen ? 'bg-black' : 'bg-gray-50 p-4'
            }`}
          >
            {/* Slide Display Area */}
            <div className={`flex-1 flex items-center justify-center ${
              isFullscreen ? 'p-0' : ''
            }`}>
              <div className={`relative ${
                isFullscreen ? 'w-full h-full' : 'w-full max-w-4xl aspect-[16/9]'
              } bg-white ${isFullscreen ? '' : 'shadow-lg'}`}>
                <img
                  src={slides[currentSlide].image}
                  alt={`Slide ${currentSlide + 1}`}
                  className={`w-full h-full ${
                    isFullscreen ? 'object-contain' : 'object-cover'
                  }`}
                />
              </div>
            </div>
            
            {/* Slide Controls */}
            <div className={`p-4 flex items-center justify-between ${
              isFullscreen ? 'bg-black/50 absolute bottom-0 left-0 right-0' : 'bg-white border-t border-gray-200'
            }`}>
              <button
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isFullscreen 
                    ? 'text-white bg-black/30 hover:bg-black/40' 
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                } rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.prev}
              </button>
              
              <div className="flex items-center gap-4">
                <span className={`text-sm ${
                  isFullscreen ? 'text-white' : 'text-gray-500'
                }`}>
                  {t.slideOf.replace('{current}', currentSlide + 1).replace('{total}', slides.length)}
                </span>
                
                <button
                  onClick={handleFullscreen}
                  className={`p-2 rounded-md ${
                    isFullscreen 
                      ? 'text-white bg-black/30 hover:bg-black/40' 
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                  title={t.toggleFullscreen}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
              
              <button
                onClick={handleNextSlide}
                disabled={currentSlide === slides.length - 1}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  isFullscreen 
                    ? 'text-white bg-black/30 hover:bg-black/40' 
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                } rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {t.next}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VisionaryLLMDocs;