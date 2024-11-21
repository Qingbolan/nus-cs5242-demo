import React, { useState } from 'react';
import { 
  Home, 
  Code,
  FileText,
  Box,
  Terminal,
  Github,
  Menu,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const translations = {
  en: {
    title: "VisionaryLLM",
    nav: {
      home: "Home",
      demo: "Demo",
      docs: "Documentation",
      models: "Models",
      examples: "Examples"
    },
    buttons: {
      github: "GitHub",
      paper: "Paper"
    }
  },
  zh: {
    title: "视觉-LLM集成系统",
    nav: {
      home: "首页",
      demo: "演示",
      docs: "文档",
      models: "模型",
      examples: "示例"
    },
    buttons: {
      github: "GitHub",
      paper: "论文"
    }
  }
};

const NavBar = ({ lang = 'en', onChangeLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { label: t.nav.home, icon: <Home className="w-4 h-4" />, href: "/" },
    { label: t.nav.docs, icon: <FileText className="w-4 h-4" />, href: "/docs" },
    { label: t.nav.models, icon: <Box className="w-4 h-4" />, href: "/models" },
    { label: t.nav.examples, icon: <Code className="w-4 h-4" />, href: "/examples" },
    { label: t.nav.demo, icon: <Terminal className="w-4 h-4" />, href: "/demo" },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Navigation */}
          <div className="h-16 px-4 flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">{t.title}</h1>
            </div>

            {/* Desktop Menu Items */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center text-gray-600 hover:text-gray-900 transition"
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center space-x-4">

              {/* GitHub */}
              <a
                href="https://github.com/Qingbolan/Vision-LLM-Integration"
                className="flex items-center px-3 py-1.5 text-gray-600 hover:text-gray-900 transition"
              >
                <Github className="w-4 h-4 mr-2" />
                {t.buttons.github}
              </a>

              {/* Paper */}
              <a
                href="/docs"
                className="px-4 py-1.5 bg-black text-white hover:bg-gray-800 transition"
              >
                {t.buttons.paper}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </a>
                ))}
                <div className="border-t border-gray-200 pt-2 space-y-2">

                  {/* Mobile GitHub */}
                  <a
                    href="https://github.com/Qingbolan/Vision-LLM-Integration"
                    className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    {t.buttons.github}
                  </a>

                  {/* Mobile Paper */}
                  <a
                    href="/docs"
                    className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 transition"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    {t.buttons.paper}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default NavBar;