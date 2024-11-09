import React, { useState } from 'react';
import { 
  Send,
  Sparkles,
  AlertCircle
} from 'lucide-react';

const translations = {
  en: {
    title: "Analysis Interaction",
    modelControl: {
      title: "Model Control",
      supervised: "Supervised",
      unsupervised: "Unsupervised",
      models: {
        resnet: "ResNet50",
        alexnet: "AlexNet",
        vit: "ViT",
        autoencoder: "Autoencoder",
        vae: "VAE",
        anomaly: "Anomaly Detection"
      }
    },
    interaction: {
      inputPlaceholder: "Ask about the analysis or request a specific task...",
      suggestedTasks: "Suggested Tasks",
      taskHistory: "Task History"
    },
    analysis: {
      stage: "Current Stage",
      confidence: "Confidence",
      defects: "Defects Detected",
      severity: "Severity Level"
    },
    tasks: {
      detection: "Detect defects in region",
      count: "Count total defects",
      measure: "Measure defect size",
      compare: "Compare regions",
      analyze: "Analyze pattern"
    }
  },
  zh: {
    title: "分析交互",
    modelControl: {
      title: "模型控制",
      supervised: "监督学习",
      unsupervised: "无监督学习",
      models: {
        resnet: "ResNet50",
        alexnet: "AlexNet",
        vit: "ViT",
        autoencoder: "自编码器",
        vae: "变分自编码器",
        anomaly: "异常检测"
      }
    },
    interaction: {
      inputPlaceholder: "询问分析结果或请求特定任务...",
      suggestedTasks: "推荐任务",
      taskHistory: "任务历史"
    },
    analysis: {
      stage: "当前阶段",
      confidence: "置信度",
      defects: "检测到的缺陷",
      severity: "严重程度"
    },
    tasks: {
      detection: "检测区域缺陷",
      count: "统计总缺陷数",
      measure: "测量缺陷大小",
      compare: "比较区域",
      analyze: "分析模式"
    }
  }
};

const AnalysisInteraction = ({ lang = 'en' }) => {
  const [activeModel, setActiveModel] = useState('resnet');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const t = translations[lang];

  // 模拟交互历史
  const interactionHistory = [
    {
      task: "Region Analysis",
      result: "Detected 3 defects in region 2",
      timestamp: "2 min ago",
      confidence: 0.95
    },
    {
      task: "Pattern Recognition",
      result: "Identified linear crack pattern",
      timestamp: "5 min ago",
      confidence: 0.88
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col space-y-6">
          {/* Main Interaction Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Model Control and Region Selection */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Model Selection */}
                <div className="border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold">{t.modelControl.title}</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="font-medium text-sm text-gray-600">
                        {t.modelControl.supervised}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {['resnet', 'alexnet', 'vit'].map(model => (
                          <button
                            key={model}
                            className={`p-2 border text-left ${
                              activeModel === model 
                                ? 'border-black bg-black text-white' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveModel(model)}
                          >
                            {t.modelControl.models[model]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-sm text-gray-600">
                        {t.modelControl.unsupervised}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {['autoencoder', 'vae', 'anomaly'].map(model => (
                          <button
                            key={model}
                            className={`p-2 border text-left ${
                              activeModel === model 
                                ? 'border-black bg-black text-white' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveModel(model)}
                          >
                            {t.modelControl.models[model]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Statistics */}
                <div className="border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold">{t.analysis.stage}</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span>{t.analysis.confidence}</span>
                      <span className="text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t.analysis.defects}</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t.analysis.severity}</span>
                      <span className="text-yellow-600">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Main Interaction */}
            <div className="lg:col-span-2 border border-gray-200">
              <div className="h-[700px] flex flex-col">
                {/* Interaction Header */}
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-bold">{t.title}</h2>
                </div>

                {/* Chat/Results Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <div className={`max-w-[80%] p-3 ${
                        message.type === 'user' 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100'
                      }`}>
                        {message.text}
                        {message.result && (
                          <div className="mt-2">
                            <div className="grid grid-cols-3 gap-1 bg-white p-2">
                              {Array(9).fill(null).map((_, i) => (
                                <div 
                                  key={i}
                                  className={`aspect-square ${
                                    Math.random() > 0.5 ? 'bg-red-100' : 'bg-green-100'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suggested Tasks */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {Object.values(t.tasks).map((task, index) => (
                      <button
                        key={index}
                        className="px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 whitespace-nowrap flex items-center"
                        onClick={() => setInputValue(task)}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {task}
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
                      placeholder={t.interaction.inputPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition"
                      onClick={() => {
                        if (inputValue.trim()) {
                          setChatHistory([
                            ...chatHistory,
                            { type: 'user', text: inputValue },
                            { type: 'assistant', text: 'Processing...', result: true }
                          ]);
                          setInputValue('');
                        }
                      }}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task History */}
          <div className="border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold">{t.interaction.taskHistory}</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {interactionHistory.map((item, index) => (
                  <div key={index} className="border border-gray-200 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.task}</span>
                      <span className="text-sm text-gray-500">{item.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.result}</p>
                    <div className="flex items-center text-sm">
                      <AlertCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span>{(item.confidence * 100).toFixed(1)}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisInteraction;