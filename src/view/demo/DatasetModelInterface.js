import React, { useState } from 'react';
import { 
  FolderOpen, 
  Upload, 
  Loader,
  Check,
} from 'lucide-react';

const translations = {
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
    { name: 'ResNet50', accuracy: 99.95, id: 'resnet' },
    { name: 'AlexNet', accuracy: 99.80, id: 'alexnet' },
    { name: 'Vgg16', accuracy: 99.82, id: 'mobilenet' },
    { name: 'ViT', accuracy: 99.41, id: 'vit' },
  ];

  const unsupervisedModels = [
    { name: 'Autoencoder', accuracy: 95.57, id: 'autoencoder' },
    { name: 'VAE', accuracy: 94.18, id: 'vae' },
    { name: 'ViT Anomaly', accuracy: 99.68, id: 'vit_anomaly' }
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
                size="315 MB"
                date="2024-10-15"
                progress={100}
              />
              <DatasetItem 
                name="BreastMNIST"
                size="245 MB"
                date="2024-11-4"
                progress={100}
              />
              <DatasetItem 
                name="Wall Cracks Dataset 2"
                size="450 MB"
                date="2024-11-12"
                progress={68}
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

export default DatasetModelInterface;