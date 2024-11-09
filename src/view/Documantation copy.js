import React, { useState, useEffect } from 'react';
import { 
  ChevronRight,
  Search,
  Copy,
  ExternalLink,
  Menu,
  X,
  Github,
  ArrowLeft
} from 'lucide-react';

const translations = {
  en: {
    search: "Search documentation...",
    sections: {
      introduction: "Introduction",
      gettingStarted: "Getting Started",
      models: "Models",
      datasets: "Datasets",
      pipeline: "Pipeline",
      api: "API Reference",
      examples: "Examples"
    },
    toc: "On this page",
    edit: "Edit this page",
    lastUpdated: "Last updated:",
    onThisPage: "On this page",
    back: "Back to main"
  },
  zh: {
    search: "搜索文档...",
    sections: {
      introduction: "介绍",
      gettingStarted: "快速开始",
      models: "模型",
      datasets: "数据集",
      pipeline: "处理流程",
      api: "API参考",
      examples: "示例"
    },
    toc: "本页目录",
    edit: "编辑此页",
    lastUpdated: "最后更新：",
    onThisPage: "本页导航",
    back: "返回主页"
  }
};

const DocPage = ({ lang = 'en' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const t = translations[lang];

  // Navigation data structure
  const navigation = [
    {
      title: t.sections.introduction,
      items: [
        { title: "Overview", href: "#overview" },
        { title: "Features", href: "#features" },
        { title: "Architecture", href: "#architecture" }
      ]
    },
    {
      title: t.sections.gettingStarted,
      items: [
        { title: "Installation", href: "#installation" },
        { title: "Quick Start", href: "#quick-start" },
        { title: "Configuration", href: "#configuration" }
      ]
    },
    {
      title: t.sections.models,
      items: [
        { title: "Supervised Learning", href: "#supervised" },
        { title: "Unsupervised Learning", href: "#unsupervised" },
        { title: "Model Configuration", href: "#model-config" }
      ]
    }
  ];

  // Table of contents
  const tableOfContents = [
    { title: "Overview", href: "#overview", level: 1 },
    { title: "Key Features", href: "#features", level: 2 },
    { title: "System Architecture", href: "#architecture", level: 2 },
    { title: "Technical Details", href: "#details", level: 2 }
  ];

  // Track scroll position for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('h2[id]');
      let currentSection = null;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 bottom-0 top-16 bg-white">
      <div className="lg:flex">
        {/* Left Sidebar - Navigation */}
        <aside className={`fixed inset-y-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:h-[calc(100vh-4rem)] overflow-y-auto ${
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
                      <a
                        href={item.href}
                        className={`block px-4 py-1.5 text-sm transition-colors ${
                          activeSection === item.href.slice(1)
                            ? 'bg-gray-50 text-gray-900 border-l-2 border-gray-900'
                            : 'text-gray-600 hover:text-gray-900 border-l-2 border-transparent'
                        }`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <article className="prose max-w-none">
              <div className="flex items-center text-sm text-gray-500 mb-8">
                <a href="#" className="hover:text-gray-900">Docs</a>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-gray-900">Getting Started</span>
              </div>

              <h1>Getting Started</h1>
              
              <div className="my-8 p-6 bg-gray-50 border border-gray-200">
                <h2 className="mt-0 text-xl font-bold">Prerequisites</h2>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    Python 3.8 or higher
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    PyTorch 1.8+
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 mr-2" />
                    CUDA-capable GPU (recommended)
                  </li>
                </ul>
              </div>

              <div className="space-y-8">
                {/* Code blocks with consistent styling */}
                <div className="relative">
                  <div className="absolute top-0 left-0 px-4 py-2 bg-gray-100 text-sm font-medium border-b border-r border-gray-200">
                    Installation
                  </div>
                  <pre className="mt-8 bg-gray-50 border border-gray-200 p-4 rounded-none overflow-x-auto">
                    <code>pip install vision-llm-integration</code>
                  </pre>
                  <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute top-0 left-0 px-4 py-2 bg-gray-100 text-sm font-medium border-b border-r border-gray-200">
                    Quick Start
                  </div>
                  <pre className="mt-8 bg-gray-50 border border-gray-200 p-4 rounded-none overflow-x-auto">
                    <code>{`import vision_llm

# Initialize the analyzer
analyzer = vision_llm.Analyzer()

# Load and analyze an image
image_path = "path/to/your/image.jpg"
results = analyzer.analyze(image_path)

# Get LLM interpretation
interpretation = analyzer.interpret(results)
print(interpretation)`}</code>
                  </pre>
                  <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>

            <footer className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {t.lastUpdated} 2024-03-15
                </span>
                <a 
                  href="#" 
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t.edit}
                </a>
              </div>
            </footer>
          </div>
        </main>

        {/* Right Sidebar - Table of Contents */}
        <aside className="hidden xl:block w-64 border-l border-gray-200 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="sticky top-0 p-4">
            <h3 className="font-medium mb-4">{t.toc}</h3>
            <nav className="space-y-1">
              {tableOfContents.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className={`block py-1 text-sm ${
                    item.level === 2 ? 'pl-4' : ''
                  } ${
                    activeSection === item.href.slice(1)
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DocPage;
