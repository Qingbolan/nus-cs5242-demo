import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const translations = {
  en: {
    title: "Visual Analysis Pipeline",
    upload: {
      title: "Start Analysis",
      dragText: "Drop your image here or click to select",
      question: "What would you like to analyze?",
      placeholder: "e.g., 'Analyze the crack patterns and assess their severity'",
      start: "Begin Analysis"
    },
    pipeline: {
      steps: ["Image Splitting", "Model Classification", "Detection Map", "LLM Analysis"],
      coarseAnalysis: "Initial Analysis",
      fineAnalysis: "Detailed Analysis",
      results: "Detection Results",
      modelSwitch: "Switch Model",
      supervised: "Supervised Models",
      unsupervised: "Unsupervised Models",
      interact: "Analysis Query",
      questionPlaceholder: "Ask about the analysis results...",
      area: "Area"
    },
    controls: {
      next: "Next Step",
      previous: "Previous",
      start: "Start"
    }
  },
  zh: {
    title: "视觉分析流程",
    upload: {
      title: "开始分析",
      dragText: "拖拽图片至此或点击选择",
      question: "您想分析什么？",
      placeholder: "例如：'分析裂缝模式并评估其严重程度'",
      start: "开始分析"
    },
    pipeline: {
      steps: ["图像切分", "模型分类", "检测地图", "LLM分析"],
      coarseAnalysis: "初始分析",
      fineAnalysis: "详细分析",
      results: "检测结果",
      modelSwitch: "切换模型",
      supervised: "监督学习模型",
      unsupervised: "无监督学习模型",
      interact: "分析询问",
      questionPlaceholder: "询问分析结果...",
      area: "区域"
    },
    controls: {
      next: "下一步",
      previous: "上一步",
      start: "开始"
    }
  }
};

const GridCell = ({ 
  index, 
  hasDefect, 
  isDetailed, 
  onClick, 
  showOverlay = true,
  t 
}) => (
  <div 
    className="relative cursor-pointer group"
    style={{ aspectRatio: '1/1' }}
    onClick={onClick}
  >
    <img
      src={`/api/placeholder/224/224`}
      alt={`${t.pipeline.area} ${index + 1}`}
      className="w-full h-full object-cover"
    />
    {showOverlay && (
      <div className={`absolute inset-0 ${
        hasDefect ? 'bg-red-400/20' : 'bg-green-400/20'
      }`} />
    )}
    {/* Area Number Label */}
    <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 text-sm">
      {isDetailed ? `${Math.floor(index / 9)}-${index % 9}` : index + 1}
    </div>
    {hasDefect && !isDetailed && (
      <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 text-white px-2 py-1 text-xs">
        Click for details
      </div>
    )}
  </div>
);

const DetailedGrid = ({ parentIndex, t }) => {
  const [heatmap, setHeatmap] = useState(
    Array(81).fill(null).map(() => Math.random() > 0.7)
  );

  return (
    <div className="grid grid-cols-9 gap-[1px] bg-gray-200">
      {heatmap.map((hasDefect, i) => (
        <GridCell
          key={i}
          index={i}
          hasDefect={hasDefect}
          isDetailed={true}
          t={t}
        />
      ))}
    </div>
  );
};

const AnalysisPipeline = ({ lang = 'en' }) => {
  const [stage, setStage] = useState('upload');
  const [analysisStep, setAnalysisStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState('supervised');
  const [selectedArea, setSelectedArea] = useState(null);
  const [question, setQuestion] = useState('');
  const [interactionHistory, setInteractionHistory] = useState([]);
  
  const t = translations[lang];

  // Generate initial grid with predefined defect areas
  const initialGrid = Array(9).fill(null).map((_, i) => ({
    id: i,
    hasDefect: [0, 2, 6, 8].includes(i)
  }));

  const UploadStage = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{t.upload.title}</h2>
        <p className="text-gray-600">{t.upload.dragText}</p>
      </div>

      <div
        className="border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer h-64 flex items-center justify-center"
        onClick={() => setStage('analysis')}
      >
        <Upload className="w-12 h-12 text-gray-400" />
      </div>

      <div className="mt-8">
        <label className="block text-lg font-medium mb-2">{t.upload.question}</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-200 outline-none focus:border-gray-400"
          placeholder={t.upload.placeholder}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <button
        className="mt-6 w-full px-6 py-3 bg-black text-white hover:bg-gray-800 transition"
        onClick={() => setStage('analysis')}
      >
        {t.upload.start}
      </button>
    </motion.div>
  );

  const AnalysisStage = () => (
    <div className="max-w-7xl mx-auto p-8">
      {/* Steps Indicator */}
      <div className="border-b border-gray-200 pb-4 mb-8">
        <div className="flex items-center justify-between">
          {t.pipeline.steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`flex items-center ${
                index <= analysisStep ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {index + 1}. {step}
              </div>
              {index < t.pipeline.steps.length - 1 && (
                <ChevronRight className="mx-4 w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Analysis Area */}
        <div>
          {/* Model Selection */}
          <div className="flex justify-between mb-4">
            <button
              className={`px-4 py-2 border ${
                selectedModel === 'supervised' 
                  ? 'border-black bg-black text-white' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedModel('supervised')}
            >
              {t.pipeline.supervised}
            </button>
            <button
              className={`px-4 py-2 border ${
                selectedModel === 'unsupervised' 
                  ? 'border-black bg-black text-white' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedModel('unsupervised')}
            >
              {t.pipeline.unsupervised}
            </button>
          </div>

          {/* Initial 3x3 Grid */}
          <div className="border border-gray-200 p-4">
            <div className="grid grid-cols-3 gap-[1px] bg-gray-200">
              {initialGrid.map((cell) => (
                <GridCell
                  key={cell.id}
                  index={cell.id}
                  hasDefect={cell.hasDefect}
                  isDetailed={false}
                  onClick={() => cell.hasDefect && setSelectedArea(cell.id)}
                  showOverlay={analysisStep >= 1}
                  t={t}
                />
              ))}
            </div>
          </div>

          {/* Detailed Analysis for Selected Defect Area */}
          {selectedArea !== null && initialGrid[selectedArea].hasDefect && analysisStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 border border-gray-200 p-4"
            >
              <h3 className="font-medium mb-4">
                {t.pipeline.fineAnalysis} - {t.pipeline.area} {selectedArea + 1}
              </h3>
              <DetailedGrid parentIndex={selectedArea} t={t} />
            </motion.div>
          )}
        </div>

        {/* Right Column: Results */}
        <div>
          {analysisStep >= 2 && (
            <div className="border border-gray-200 p-4 mb-4">
              <h3 className="font-medium mb-4">{t.pipeline.results}</h3>
              <div className="space-y-2">
                {initialGrid.filter(cell => cell.hasDefect).map((cell) => (
                  <div key={cell.id} className="flex justify-between items-center">
                    <span>{t.pipeline.area} {cell.id + 1}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">98%</span>
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysisStep >= 3 && (
            <div className="border border-gray-200 p-4">
              <h3 className="font-medium mb-4">{t.pipeline.interact}</h3>
              <div className="space-y-4">
                <div className="h-48 overflow-y-auto space-y-2">
                  {interactionHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-3 ${
                        msg.type === 'user' ? 'bg-gray-50 ml-8' : 'bg-blue-50'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-200 outline-none"
                    placeholder={t.pipeline.questionPlaceholder}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                  <button
                    className="px-4 py-2 bg-black text-white"
                    onClick={() => {
                      if (question.trim()) {
                        setInteractionHistory([
                          ...interactionHistory,
                          { type: 'user', text: question },
                          { type: 'system', text: 'Processing your query...' }
                        ]);
                        setQuestion('');
                      }
                    }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step Controls */}
          <div className="mt-4 flex justify-end">
            {analysisStep < t.pipeline.steps.length - 1 && (
              <button
                className="px-6 py-2 bg-black text-white hover:bg-gray-800 transition flex items-center"
                onClick={() => setAnalysisStep(prev => prev + 1)}
              >
                {t.controls.next}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {stage === 'upload' ? <UploadStage /> : <AnalysisStage />}
    </div>
  );
};

export default AnalysisPipeline;