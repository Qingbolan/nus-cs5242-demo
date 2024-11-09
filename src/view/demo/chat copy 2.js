import React, { useState } from 'react';
import { 
  Upload,
  MessageSquare,
  Send,
  Loader,
  Check,
  Sparkles,
  Star,
  FolderOpen,
  ChevronRight,
  Settings,
  ArrowRight,
  History,
  Grid,
  Image as ImageIcon
} from 'lucide-react';

// import React, { useState } from 'react';
// import { 
//   FolderOpen, 
//   Upload, 
//   Loader,
//   Check,
// } from 'lucide-react';

let translations = {
  en: {
    datasets: {
      title: "Datasets",
      upload: "Upload New Dataset",
      training: "Training Progress",
      recent: "Recent Datasets"
    },
    models: {
      title: "Models",
      supervised: "Supervised Learning",
      unsupervised: "Unsupervised Learning",
      settings: "Model Settings"
    },
    analysis: {
      stage: "Analysis Stage",
      progress: "Progress",
      results: "Results"
    },
    prompts: {
      title: "Prompt Templates",
      suggestions: "Suggested Questions"
    }
  },
  zh: {
    datasets: {
      title: "数据集",
      upload: "上传新数据集",
      training: "训练进度",
      recent: "最近数据集"
    },
    models: {
      title: "模型",
      supervised: "监督学习",
      unsupervised: "无监督学习",
      settings: "模型设置"
    },
    analysis: {
      stage: "分析阶段",
      progress: "进度",
      results: "结果"
    },
    prompts: {
      title: "提示词模板",
      suggestions: "推荐问题"
    }
  }
};

const DatasetItem = ({ name, size, date, progress }) => (
  <div className="border border-gray-200 p-4 hover:bg-gray-50 cursor-pointer group">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center">
        <FolderOpen className="w-5 h-5 text-gray-400 mr-2" />
        <span className="font-medium">{name}</span>
      </div>
      {progress !== undefined ? (
        <div className="flex items-center text-sm">
          {progress === 100 ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Loader className="w-4 h-4 text-blue-500 animate-spin" />
          )}
          <span className="ml-2">{progress}%</span>
        </div>
      ) : null}
    </div>
    <div className="flex items-center text-sm text-gray-500 space-x-4">
      <span>{size}</span>
      <span>{date}</span>
    </div>
    {progress !== undefined && progress < 100 && (
      <div className="mt-2 bg-gray-200 h-1">
        <div 
          className="bg-blue-500 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    )}
  </div>
);

const ModelOption = ({ name, accuracy, selected, onClick }) => (
  <div 
    className={`border p-4 cursor-pointer transition-all ${
      selected ? 'border-black bg-black text-white' : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-2">
      <span className="font-medium">{name}</span>
      <span className={`text-sm ${selected ? 'text-gray-300' : 'text-gray-500'}`}>
        {accuracy}% accuracy
      </span>
    </div>
    <div className={`text-sm ${selected ? 'text-gray-300' : 'text-gray-500'}`}>
      Last trained: 2 hours ago
    </div>
  </div>
);

const DatasetModelInterface = ({ lang = 'en' }) => {
  const [selectedModel, setSelectedModel] = useState('resnet');
  const t = translations[lang];
  
  const supervisedModels = [
    { name: 'ResNet50', accuracy: 94.5, id: 'resnet' },
    { name: 'AlexNet', accuracy: 92.8, id: 'alexnet' },
    { name: 'ViT', accuracy: 95.2, id: 'vit' }
  ];

  const unsupervisedModels = [
    { name: 'Autoencoder', accuracy: 88.9, id: 'autoencoder' },
    { name: 'VAE', accuracy: 87.6, id: 'vae' },
    { name: 'ViT Anomaly', accuracy: 89.4, id: 'vit_anomaly' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Dataset Management */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">{t.datasets.title}</h2>
            </div>
            
            {/* Upload Area */}
            <div className="p-4 border-b border-gray-200">
              <div className="border-2 border-dashed border-gray-200 p-6 text-center hover:border-gray-300 cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{t.datasets.upload}</p>
              </div>
            </div>

            {/* Dataset List */}
            <div className="divide-y divide-gray-200">
              <DatasetItem 
                name="Wall Cracks Dataset 1"
                size="2.3 GB"
                date="2024-03-15"
                progress={100}
              />
              <DatasetItem 
                name="Wall Cracks Dataset 2"
                size="1.8 GB"
                date="2024-03-14"
                progress={68}
              />
              <DatasetItem 
                name="Structural Damage Images"
                size="3.1 GB"
                date="2024-03-10"
              />
            </div>
          </div>
        </div>

        {/* Middle Column: Model Selection and Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">{t.models.title}</h2>
            </div>

            {/* Supervised Models */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium mb-4">{t.models.supervised}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supervisedModels.map(model => (
                  <ModelOption
                    key={model.id}
                    name={model.name}
                    accuracy={model.accuracy}
                    selected={selectedModel === model.id}
                    onClick={() => setSelectedModel(model.id)}
                  />
                ))}
              </div>
            </div>

            {/* Unsupervised Models */}
            <div className="p-4">
              <h3 className="font-medium mb-4">{t.models.unsupervised}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {unsupervisedModels.map(model => (
                  <ModelOption
                    key={model.id}
                    name={model.name}
                    accuracy={model.accuracy}
                    selected={selectedModel === model.id}
                    onClick={() => setSelectedModel(model.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Model Settings */}
          <div className="border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{t.models.settings}</h3>
              <button className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition">
                Apply Settings
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Batch Size</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200"
                  defaultValue={32}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Learning Rate</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-200"
                  defaultValue={0.001}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


translations = translations + {
  en: {
    tabs: {
      analysis: "Analysis Interaction",
      dataset: "Dataset Management"
    },
    chat: {
      title: "Interactive Analysis",
      placeholder: "Ask about the analysis...",
      send: "Send",
      templates: "Templates",
      suggestions: "Suggested Questions"
    },
    analysis: {
      upload: "Upload Image",
      results: "Analysis Results",
      detection: "Detection Map",
      detail: "Detailed Analysis",
      progress: "Analysis Progress",
      question: "What would you like to analyze?",
      region: "Region"
    }
  },
  zh: {
    tabs: {
      analysis: "分析交互",
      dataset: "数据集管理"
    },
    chat: {
      title: "交互式分析",
      placeholder: "询问分析结果...",
      send: "发送",
      templates: "模板",
      suggestions: "推荐问题"
    },
    analysis: {
      upload: "上传图片",
      results: "分析结果",
      detection: "检测地图",
      detail: "详细分析",
      progress: "分析进度",
      question: "您想分析什么？",
      region: "区域"
    }
  }
};

const DemoInterface = ({ lang = 'en' }) => {
  const [activeTab, setActiveTab] = useState('analysis');
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex space-x-8">
            <TabButton 
              active={activeTab === 'analysis'} 
              onClick={() => setActiveTab('analysis')}
              label={t.tabs.analysis}
            />
            <TabButton 
              active={activeTab === 'dataset'} 
              onClick={() => setActiveTab('dataset')}
              label={t.tabs.dataset}
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="py-8">
        {activeTab === 'analysis' ? (
          <AnalysisInteraction lang={lang} />
        ) : (
          <DatasetModelInterface lang={lang} />
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label }) => (
  <button
    className={`py-4 px-2 relative ${
      active ? 'text-black' : 'text-gray-500 hover:text-gray-700'
    }`}
    onClick={onClick}
  >
    {label}
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
    )}
  </button>
);

const ChatMessage = ({ message, type }) => (
  <div className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[80%] p-3 ${
      type === 'user' 
        ? 'bg-black text-white' 
        : 'bg-gray-100'
    }`}>
      {message}
    </div>
  </div>
);

const AnalysisInteraction = ({ lang = 'en' }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [analysisStep, setAnalysisStep] = useState(0);
  const t = translations[lang];

  const templates = [
    "Count total defects",
    "Analyze severity",
    "Compare regions",
    "Generate report"
  ];

  const suggestions = [
    "What's the total number of defects?",
    "Which region has the most severe damage?",
    "Can you compare region 1 and 2?",
    "What's the confidence level of detection?"
  ];

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setMessages([
        ...messages,
        { type: 'user', content: chatInput },
        { type: 'assistant', content: 'Analyzing your request...' }
      ]);
      setChatInput('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chat Interface (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 h-[800px] flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">{t.chat.title}</h2>
            </div>
            
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <ChatMessage 
                  key={index}
                  message={msg.content}
                  type={msg.type}
                />
              ))}
            </div>

            {/* Templates */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm"
                    onClick={() => setChatInput(template)}
                  >
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {template}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div className="p-4 border-t border-gray-200">
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-2 hover:bg-gray-50 text-sm"
                    onClick={() => setChatInput(suggestion)}
                  >
                    <Star className="w-3 h-3 inline mr-2" />
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2 border border-gray-200 outline-none"
                  placeholder={t.chat.placeholder}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
                  onClick={handleSendMessage}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Analysis Area (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Analysis Area */}
          <div className="border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">{t.analysis.results}</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Original Image */}
                <div className="space-y-2">
                  <h3 className="font-medium">Original Image</h3>
                  <div className="aspect-square bg-gray-100">
                    <img
                      src="/api/placeholder/400/400"
                      alt="Analysis Target"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {/* Detection Map */}
                <div className="space-y-2">
                  <h3 className="font-medium">{t.analysis.detection}</h3>
                  <div className="grid grid-cols-3 gap-1 bg-gray-100">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div 
                        key={index}
                        className={`aspect-square ${
                          index % 3 === 1 ? 'bg-green-100' : 'bg-red-100'
                        } relative`}
                      >
                        <div className="absolute top-2 left-2 text-xs bg-black/70 text-white px-1">
                          {t.analysis.region} {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">{t.analysis.detail}</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-9 gap-px bg-gray-100">
                {Array.from({ length: 81 }).map((_, index) => (
                  <div 
                    key={index}
                    className={`aspect-square ${
                      Math.random() > 0.7 ? 'bg-red-100' : 'bg-green-100'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoInterface;