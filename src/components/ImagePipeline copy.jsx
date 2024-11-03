import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Play, RefreshCcw, ZoomIn, MessageSquare, Grid } from 'lucide-react';

const translations = {
  en: {
    title: "Visualization of Analysis Pipeline",
    steps: {
      split: "Image Splitting",
      classify: "Model Classification",
      map: "Detection Map",
      llm: "LLM Analysis"
    },
    models: {
      supervised: "Supervised Models",
      unsupervised: "Unsupervised Models",
      resnet: "ResNet50",
      alexnet: "AlexNet",
      vit: "ViT",
      autoencoder: "Autoencoder",
      vae: "VAE",
      anomaly: "ViT Anomaly"
    },
    analysis: {
      title: "LLM Analysis Results",
      detected: "Detected Areas:",
      area: "Area",
      confidence: "Confidence",
      suggestion: "Suggestion"
    },
    controls: {
      next: "Next Step",
      reset: "Reset",
      start: "Start Analysis"
    }
  },
  zh: {
    title: "分析流程可视化",
    steps: {
      split: "图像切分",
      classify: "模型分类",
      map: "检测地图",
      llm: "LLM分析"
    },
    models: {
      supervised: "监督学习模型",
      unsupervised: "无监督学习模型",
      resnet: "ResNet50",
      alexnet: "AlexNet",
      vit: "ViT",
      autoencoder: "自编码器",
      vae: "变分自编码器",
      anomaly: "ViT异常检测"
    },
    analysis: {
      title: "LLM分析结果",
      detected: "检测区域：",
      area: "区域",
      confidence: "置信度",
      suggestion: "建议"
    },
    controls: {
      next: "下一步",
      reset: "重置",
      start: "开始分析"
    }
  }
};

const ImagePipeline = ({ lang = 'en' }) => {
  const [step, setStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState('supervised');
  const t = translations[lang];
  
  // 图像切分大小设置为224x224
  const gridSize = 224;
  const initialImage = '/api/placeholder/672/672';  // 3x3的总大小

  const modelResults = {
    supervised: Array(9).fill(null).map(() => ({
      resnet: Math.random() > 0.5,
      alexnet: Math.random() > 0.5,
      vit: Math.random() > 0.5
    })),
    unsupervised: Array(9).fill(null).map(() => ({
      autoencoder: Math.random() > 0.5,
      vae: Math.random() > 0.5,
      anomaly: Math.random() > 0.5
    }))
  };

  const renderGrid = () => (
    <div className="grid grid-cols-3 gap-1" style={{ width: gridSize * 3, height: gridSize * 3 }}>
      {Array.from({ length: 9 }).map((_, index) => (
        <motion.div
          key={index}
          className="relative overflow-hidden"
          style={{ width: gridSize, height: gridSize }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { delay: index * 0.1 }
          }}
        >
          <img
            src={`/api/placeholder/${gridSize}/${gridSize}`}
            alt={`Section ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {step >= 2 && (
            <motion.div
              className={`absolute inset-0 ${
                modelResults[selectedModel][index].resnet ? 'bg-red-500/20' : 'bg-green-500/20'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 p-6">
        <h2 className="text-2xl font-bold">{t.title}</h2>
        <div className="flex mt-4 space-x-2">
          {Object.values(t.steps).map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`px-3 py-1 rounded ${
                index <= step ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'
              }`}>
                {step}
              </div>
              {index < Object.values(t.steps).length - 1 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image Processing */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t.steps[Object.keys(t.steps)[step]]}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedModel(selectedModel === 'supervised' ? 'unsupervised' : 'supervised')}
                  className="px-3 py-1 text-sm rounded border border-gray-200 hover:bg-gray-50"
                >
                  {t.models[selectedModel]}
                </button>
                <button
                  onClick={() => step < 4 && setStep(step + 1)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {t.controls.next}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              {renderGrid()}
            </div>
          </div>

          {/* Right Column - Analysis Results */}
          <div>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">{t.analysis.title}</h4>
                  <div className="space-y-2">
                    {modelResults[selectedModel].map((result, index) => (
                      result.resnet && (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{t.analysis.area} {index + 1}</span>
                          <span className="text-green-600">98%</span>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {step >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-blue-50 p-4 rounded-lg"
                  >
                    <MessageSquare className="w-5 h-5 text-blue-500 mb-2" />
                    <p className="text-sm text-gray-600">
                      Analysis shows potential structural issues in the highlighted areas...
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePipeline;