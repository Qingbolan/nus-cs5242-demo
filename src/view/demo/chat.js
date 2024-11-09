import React, { useState } from 'react';
import { Database, MessageSquare } from 'lucide-react';
import AnalysisInteraction from "./AnalysisInteraction";
import DatasetModelInterface from "./DatasetModelInterface";

const translations = {
  en: {
    tabs: {
      analysis: "Analysis Interaction",
      dataset: "Dataset & Model Settings",
    }
  },
  zh: {
    tabs: {
      analysis: "分析交互",
      dataset: "数据集与模型设置",
    }
  }
};

const DemoInterface = ({ lang = 'en' }) => {
  const [activeTab, setActiveTab] = useState("analysis");
  const t = translations[lang];

  const tabs = [
    {
      id: "analysis",
      label: t.tabs.analysis,
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: "dataset",
      label: t.tabs.dataset,
      icon: <Database className="w-4 h-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-6 py-4 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto">
        {activeTab === "dataset" ? (
          <DatasetModelInterface lang={lang} />
        ) : (
          <AnalysisInteraction lang={lang} />
        )}
      </div>
    </div>
  );
};

export default DemoInterface;