import React, { useState } from 'react';
import { 
  Brain, 
  Camera, 
  MessageSquare, 
  ChevronRight, 
  Github,
  FileText,
  Download,
  ExternalLink,
  Globe
} from 'lucide-react';

const translations = {
  en: {
    title: "Deep Learning Visual Analysis with LLM Integration",
    subtitle: "An intelligent visual analysis framework combining supervised learning, unsupervised learning, and LLM for efficient professional domain understanding",
    paper: "Paper",
    code: "Code",
    features: "Key Features",
    multiModel: {
      title: "Multi-Model Fusion",
      desc: "Combining 6 deep learning models including ResNet50, AlexNet, and ViT for high-precision visual analysis"
    },
    smartSegmentation: {
      title: "Intelligent Segmentation",
      desc: "Innovative image segmentation strategy transforming complex visual tasks into efficient classification problems"
    },
    llmInteraction: {
      title: "LLM Integration",
      desc: "Achieving intelligent analysis and interaction through natural language for professional visual understanding"
    },
    results: "Experimental Results",
    supervised: "Supervised Learning",
    unsupervised: "Unsupervised Learning",
    demo: "Demonstrations",
    crackDemo: {
      title: "Crack Detection Demo",
      desc: "Upload wall images for automatic segmentation analysis and detection report generation"
    },
    llmDemo: {
      title: "LLM Interaction Demo",
      desc: "Engage in natural language dialogue for professional visual analysis results"
    },
    tryDemo: "Try Demo",
    resources: "Resources",
    dataset: {
      title: "Dataset",
      desc: "Annotated wall crack image dataset"
    },
    documentation: {
      title: "Documentation",
      desc: "Detailed system architecture and implementation documentation"
    },
    examples: {
      title: "Example Code",
      desc: "Sample code for model training and inference"
    },
    viewDetails: "View Details",
    citation: "Citation",
    footer: {
      rights: "© 2024 Project Team",
      github: "GitHub",
      docs: "Documentation",
      contact: "Contact"
    }
  },
  zh: {
    title: "深度学习视觉分析与大语言模型集成系统",
    subtitle: "融合监督学习、无监督学习与LLM的智能视觉分析框架，实现专业领域的高效视觉理解与交互",
    paper: "论文",
    code: "代码",
    features: "核心特性",
    multiModel: {
      title: "多模型融合",
      desc: "结合ResNet50、AlexNet、ViT等6种深度学习模型，实现高精度视觉分析"
    },
    smartSegmentation: {
      title: "智能分割",
      desc: "创新的图像分割策略，将复杂视觉任务转化为高效的分类问题"
    },
    llmInteraction: {
      title: "LLM交互",
      desc: "通过自然语言实现智能分析与交互，提供专业的视觉理解能力"
    },
    results: "实验结果",
    supervised: "监督学习",
    unsupervised: "无监督学习",
    demo: "演示",
    crackDemo: {
      title: "裂缝检测演示",
      desc: "上传墙体图片，系统自动进行分割分析并生成检测报告"
    },
    llmDemo: {
      title: "LLM交互演示",
      desc: "与系统进行自然语言对话，获取专业的视觉分析结果"
    },
    tryDemo: "试用演示",
    resources: "资源",
    dataset: {
      title: "数据集",
      desc: "包含标注的墙体裂缝图像数据集"
    },
    documentation: {
      title: "技术文档",
      desc: "详细的系统架构与实现文档"
    },
    examples: {
      title: "示例代码",
      desc: "模型训练与推理的示例代码"
    },
    viewDetails: "查看详情",
    citation: "引用",
    footer: {
      rights: "© 2024 项目组",
      github: "GitHub",
      docs: "文档",
      contact: "联系我们"
    }
  }
};

const ProjectHomepage = () => {
  const [activeDemo, setActiveDemo] = useState(null);
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Language Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={toggleLanguage}
          className="flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-gray-50 transition"
        >
          <Globe className="w-4 h-4 mr-2" />
          {lang === 'en' ? '中文' : 'English'}
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[size:32px_32px] bg-gray-900/[0.04]" />
        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            {t.subtitle}
          </p>
          <div className="flex space-x-4">
            <button className="flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              <FileText className="w-5 h-5 mr-2" />
              {t.paper}
            </button>
            <button className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Github className="w-5 h-5 mr-2" />
              {t.code}
            </button>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">{t.features}</h2>
        <div className="grid grid-cols-3 gap-6">
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title={t.multiModel.title}
            description={t.multiModel.desc}
          />
          <FeatureCard
            icon={<Camera className="w-6 h-6" />}
            title={t.smartSegmentation.title}
            description={t.smartSegmentation.desc}
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6" />}
            title={t.llmInteraction.title}
            description={t.llmInteraction.desc}
          />
        </div>
      </div>

      {/* Results Preview */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{t.results}</h2>
          <div className="grid grid-cols-2 gap-6">
            <ResultCard
              title={t.supervised}
              metrics={[
                { label: "ResNet50", value: "94.5%" },
                { label: "AlexNet", value: "92.8%" },
                { label: "ViT", value: "95.2%" }
              ]}
            />
            <ResultCard
              title={t.unsupervised}
              metrics={[
                { label: "Autoencoder", value: "88.9%" },
                { label: "VAE", value: "87.6%" },
                { label: "ViT Anomaly", value: "89.4%" }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">{t.demo}</h2>
        <div className="grid grid-cols-2 gap-6">
          <DemoCard
            title={t.crackDemo.title}
            description={t.crackDemo.desc}
            active={activeDemo === 'crack'}
            onClick={() => setActiveDemo('crack')}
            tryDemo={t.tryDemo}
          />
          <DemoCard
            title={t.llmDemo.title}
            description={t.llmDemo.desc}
            active={activeDemo === 'llm'}
            onClick={() => setActiveDemo('llm')}
            tryDemo={t.tryDemo}
          />
        </div>
      </div>

      {/* Resources */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{t.resources}</h2>
          <div className="grid grid-cols-3 gap-6">
            <ResourceCard
              icon={<Download className="w-6 h-6" />}
              title={t.dataset.title}
              description={t.dataset.desc}
              viewDetails={t.viewDetails}
            />
            <ResourceCard
              icon={<FileText className="w-6 h-6" />}
              title={t.documentation.title}
              description={t.documentation.desc}
              viewDetails={t.viewDetails}
            />
            <ResourceCard
              icon={<Github className="w-6 h-6" />}
              title={t.examples.title}
              description={t.examples.desc}
              viewDetails={t.viewDetails}
            />
          </div>
        </div>
      </div>

      {/* Citation */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">{t.citation}</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <pre className="text-sm text-gray-600 whitespace-pre-wrap">
            {`@article{vision_llm_2024,
  title={Deep Learning Visual Analysis with LLM Integration},
  author={Author1 and Author2},
  journal={Conference Name},
  year={2024}
}`}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div>{t.footer.rights}</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">{t.footer.github}</a>
            <a href="#" className="hover:text-gray-300">{t.footer.docs}</a>
            <a href="#" className="hover:text-gray-300">{t.footer.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="text-blue-500 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ResultCard = ({ title, metrics }) => (
  <div className="p-6 bg-gray-800 rounded-lg">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <div className="space-y-3">
      {metrics.map(metric => (
        <div key={metric.label} className="flex justify-between items-center">
          <span className="text-gray-300">{metric.label}</span>
          <span className="text-green-400 font-mono">{metric.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const DemoCard = ({ title, description, active, onClick, tryDemo }) => (
  <div 
    className={`p-6 rounded-lg cursor-pointer transition ${
      active ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'
    } border hover:shadow-md`}
    onClick={onClick}
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex items-center text-blue-500">
      <span className="mr-2">{tryDemo}</span>
      <ChevronRight className="w-4 h-4" />
    </div>
  </div>
);

const ResourceCard = ({ icon, title, description, viewDetails }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="text-gray-700 mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex items-center text-blue-500">
      <span className="mr-2">{viewDetails}</span>
      <ExternalLink className="w-4 h-4" />
    </div>
  </div>
);

export default ProjectHomepage;