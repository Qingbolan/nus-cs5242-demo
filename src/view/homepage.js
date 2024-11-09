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
  Globe,
} from 'lucide-react';

const translations = {
  en: {
    title: "VisionaryLLM: An Extensible Framework for Enhancing Large Language Models with Complex Vision Tasks Using Deep Learning",
    subtitle: "An intelligent framework combining multiple deep learning models and LLM for professional visual analysis, featuring automated training pipeline and domain-specific adaptation",
    paper: "Paper",
    code: "Code",
    features: "Key Features",
    multiModel: {
      title: "Multi-Model Intelligence",
      desc: "Innovative integration of 7 deep learning models including supervised and unsupervised approaches, achieving optimal performance through model complementarity"
    },
    smartSegmentation: {
      title: "Automated Training Pipeline",
      desc: "End-to-end automated training process with intelligent model selection and optimization, supporting diverse professional domains"
    },
    llmInteraction: {
      title: "Intelligent Interactive Analysis",
      desc: "Deep integration with LLM for natural language interaction and professional insights generation"
    },
    architecture: {
      title: "Framework Architecture",
      training: "Training Stage",
      inference: "Inference Stage",
      dataInput: "Domain-specific Data Input",
      modelTraining: "Automated Training Pipeline",
      visionTasks: "Complex Vision Tasks",
      enhancedOutput: "Enhanced Output Generation"
    },
    results: "Experimental Results(on Crack Detection dataset)",
    supervised: "Supervised Learning",
    unsupervised: "Unsupervised Learning",
    demo: "Demonstrations",
    crackDemo: {
      title: "Professional Crack Detection Demo",
      desc: "Automated crack detection and analysis with professional report generation and LLM-powered insights"
    },
    llmDemo: {
      title: "Intelligent Interaction Demo",
      desc: "Natural language interaction for professional visual analysis, supporting complex queries and detailed explanations"
    },
    tryDemo: "Try Demo",
    resources: "Resources",
    dataset: {
      title: "Professional Dataset",
      desc: "Comprehensive annotated dataset with professional labeling and domain expertise"
    },
    documentation: {
      title: "Technical Documentation",
      desc: "Detailed framework architecture, deployment guides, and extensibility documentation"
    },
    examples: {
      title: "Example Code",
      desc: "Complete examples covering model training, inference, and various application scenarios"
    },
    viewDetails: "View Details",
    citation: "Citation",
    footer: {
      rights: "© 2024 nus-cs5242 Silan Hu&&Tan Kah Xuan Project Team",
      github: "GitHub",
      docs: "Documentation",
      contact: "Contact"
    }
  },
  zh: {
    title: "VisionaryLLM: 基于深度学习的视觉增强型大语言模型可扩展框架",
    subtitle: "融合多模型深度学习与大语言模型的智能视觉分析框架，实现自动化训练与专业领域适配",
    paper: "论文",
    code: "代码",
    features: "核心特性",
    multiModel: {
      title: "多模型智能融合",
      desc: "创新性融合7种深度学习模型，结合监督与无监督学习优势，实现模型优势互补与性能优化"
    },
    smartSegmentation: {
      title: "自动化训练流程",
      desc: "端到端的自动化训练流程，智能模型选择与优化，支持多样化专业领域需求"
    },
    llmInteraction: {
      title: "智能交互分析",
      desc: "与大语言模型深度融合，实现自然语言交互与专业见解生成"
    },
    architecture: {
      title: "框架架构",
      training: "训练阶段",
      inference: "推理阶段",
      dataInput: "领域数据输入",
      modelTraining: "自动化训练流程",
      visionTasks: "复杂视觉任务",
      enhancedOutput: "增强输出生成"
    },
    results: "实验结果",
    supervised: "监督学习",
    unsupervised: "无监督学习",
    demo: "演示",
    crackDemo: {
      title: "专业裂缝检测演示",
      desc: "自动化裂缝检测与分析，生成专业检测报告并提供LLM增强的专业见解"
    },
    llmDemo: {
      title: "智能交互演示",
      desc: "基于自然语言的专业视觉分析交互，支持复杂查询与详细解释"
    },
    tryDemo: "试用演示",
    resources: "资源",
    dataset: {
      title: "专业数据集",
      desc: "包含专业标注的综合数据集，融合领域专家知识"
    },
    documentation: {
      title: "技术文档",
      desc: "详细的框架架构说明、部署指南与扩展性文档"
    },
    examples: {
      title: "示例代码",
      desc: "涵盖模型训练、推理及多场景应用的完整示例"
    },
    viewDetails: "查看详情",
    citation: "引用",
    footer: {
      rights: "© 2024 nus-cs5242 Silan Hu&&Tan Kah Xuan 项目组",
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
          className="flex items-center px-3 py-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-gray-50 transition text-sm md:text-base"
        >
          <Globe className="w-4 h-4 mr-2" />
          {lang === 'en' ? '中文' : 'English'}
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[size:32px_32px] bg-gray-900/[0.04]" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 md:pt-20 pb-12 md:pb-16">
          <h1 className="text-5xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              <FileText className="w-5 h-5 mr-2" />
              {t.paper}
            </button>
            <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <Github className="w-5 h-5 mr-2" />
              {t.code}
            </button>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t.features}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

      
      {/* Architecture Section */}
      <div className="max-w-4xl mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600">
          {/* <!-- Background --> */}
          <rect/>
          
          {/* <!-- Title --> */}
          <text x="500" y="40" text-anchor="middle" font-family="Arial" font-size="20" font-weight="bold">VisionaryLLM Framework</text>
          
          {/* <!-- Training Stage --> */}
          <g transform="translate(50,80)">
            {/* <!-- Stage Header --> */}
            <rect x="0" y="0" width="400" height="40" fill="#e3f2fd" stroke="#1565c0" stroke-width="2"/>
            <text x="200" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Training Stage</text>
            
            {/* <!-- Domain-specific Data Input --> */}
            <g transform="translate(20,60)">
              <rect x="0" y="0" width="360" height="80" fill="#ffffff" stroke="#1565c0" stroke-width="1"/>
              <text x="180" y="20" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Domain-specific Data Input</text>
              <text x="20" y="45" font-family="Arial" font-size="12">• Medical Images</text>
              <text x="180" y="45" font-family="Arial" font-size="12">• Industrial Data</text>
              <text x="320" y="45" font-family="Arial" font-size="12">• Scientific Data</text>
              <text x="180" y="65" font-family="Arial" font-size="12" font-style="italic">Extensible Data Interface</text>
            </g>
            
            {/* <!-- Model Training Pipeline --> */}
            <g transform="translate(20,160)">
              <rect x="0" y="0" width="360" height="120" fill="#ffffff" stroke="#1565c0" stroke-width="1"/>
              <text x="180" y="20" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Automated Training Pipeline</text>
              
              <rect x="20" y="35" width="100" height="40" fill="#bbdefb" stroke="#1565c0" stroke-width="1"/>
              <text x="70" y="60" text-anchor="middle" font-family="Arial" font-size="12">Model Selection</text>
              
              <rect x="140" y="35" width="100" height="40" fill="#bbdefb" stroke="#1565c0" stroke-width="1"/>
              <text x="190" y="60" text-anchor="middle" font-family="Arial" font-size="12">Training Process</text>
              
              <rect x="260" y="35" width="80" height="40" fill="#bbdefb" stroke="#1565c0" stroke-width="1"/>
              <text x="300" y="60" text-anchor="middle" font-family="Arial" font-size="12">Validation</text>
              
              <text x="180" y="100" font-family="Arial" font-size="12" font-style="italic">Deep Learning Models + LLM Integration</text>
            </g>
          </g>

          {/* <!-- Inference Stage --> */}
          <g transform="translate(550,80)">
            {/* <!-- Stage Header --> */}
            <rect x="0" y="0" width="400" height="40" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2"/>
            <text x="200" y="25" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Inference Stage</text>
            
            {/* <!-- Vision Tasks --> */}
            <g transform="translate(20,60)">
              <rect x="0" y="0" width="360" height="80" fill="#ffffff" stroke="#2e7d32" stroke-width="1"/>
              <text x="180" y="20" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Complex Vision Tasks</text>
              <text x="20" y="45" font-family="Arial" font-size="12">• Classification</text>
              <text x="120" y="45" font-family="Arial" font-size="12">• Detection</text>
              <text x="220" y="45" font-family="Arial" font-size="12">• Segmentation</text>
              <text x="320" y="45" font-family="Arial" font-size="12">• Analysis</text>
              <text x="180" y="65" font-family="Arial" font-size="12" font-style="italic">Task-specific Processing</text>
            </g>
            
            {/* <!-- Enhanced Output --> */}
            <g transform="translate(20,160)">
              <rect x="0" y="0" width="360" height="120" fill="#ffffff" stroke="#2e7d32" stroke-width="1"/>
              <text x="180" y="20" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Enhanced Output Generation</text>
              
              <rect x="20" y="35" width="100" height="40" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
              <text x="70" y="60" text-anchor="middle" font-family="Arial" font-size="12">Visual Results</text>
              
              <rect x="140" y="35" width="100" height="40" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
              <text x="190" y="60" text-anchor="middle" font-family="Arial" font-size="12">LLM Analysis</text>
              
              <rect x="260" y="35" width="80" height="40" fill="#c8e6c9" stroke="#2e7d32" stroke-width="1"/>
              <text x="300" y="60" text-anchor="middle" font-family="Arial" font-size="12">Explanation</text>
              
              <text x="180" y="100" font-family="Arial" font-size="12" font-style="italic">Domain-specific Insights</text>
            </g>
          </g>
          
          {/* <!-- Connecting Arrows --> */}
          <g stroke="#424242" stroke-width="1.5" fill="none" marker-end="url(#arrowhead)">
            {/* <!-- Training Flow --> */}
            <path d="M 250,180 L 250,220"/>
            <path d="M 250,320 L 250,360"/>
            {/* <!-- Inference Flow --> */}
            <path d="M 750,180 L 750,220"/>
            <path d="M 750,320 L 750,360"/>
            {/* <!-- Stage Connection --> */}
            <path d="M 470,200 L 530,200"/>
          </g>
          
          {/* <!-- Arrow Marker --> */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#424242"/>
            </marker>
          </defs>
          
          {/* <!-- Framework Features --> */}
          <g transform="translate(50,400)">
            <rect x="0" y="0" width="900" height="80" fill="#f5f5f5" stroke="#424242" stroke-width="1"/>
            <text x="450" y="25" text-anchor="middle" font-family="Arial" font-size="14" font-weight="bold">Key Framework Features</text>
            <text x="150" y="50" text-anchor="middle" font-family="Arial" font-size="12">• Extensible Architecture</text>
            <text x="450" y="50" text-anchor="middle" font-family="Arial" font-size="12">• Automated Model Selection</text>
            <text x="750" y="50" text-anchor="middle" font-family="Arial" font-size="12">• Enhanced Explainability</text>
          </g>
        </svg>
      </div>

      {/* Results Preview */}
      <div className="bg-gray-900 text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t.results}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <ResultCard
              title={t.supervised}
              metrics={[
                { label: "ResNet50", value: "99.95%" },
                { label: "AlexNet", value: "99.80%" },
                { label: "vgg16", value: "99.82%" },
                { label: "ViT", value: "95.41%" }
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
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t.demo}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t.resources}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">{t.citation}</h2>
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg overflow-x-auto">
          <pre className="text-xs md:text-sm text-gray-600 whitespace-pre-wrap">
            {`@article{vision_llm_2024,
    title={VisionaryLLM: An Extensible Framework for Enhancing Large Language Models with Complex Vision Tasks Using Deep Learning},
    author={Silan Hu and Tan Kah Xuan},
    journal={NUS CS5242 Project},
    year={2024}
}`}
          </pre>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm md:text-base">{t.footer.rights}</div>
            <div className="flex space-x-4 text-sm md:text-base">
              <a href="https://github.com/Qingbolan/Vision-LLM-Integration" className="hover:text-gray-300">{t.footer.github}</a>
              <a href="/docs" className="hover:text-gray-300">{t.footer.docs}</a>
              <a href="https://silan.tech/contact" className="hover:text-gray-300">{t.footer.contact}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
const FeatureCard = ({ icon, title, description }) => (
  <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="text-blue-500 mb-3 md:mb-4">{icon}</div>
    <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm md:text-base text-gray-600">{description}</p>
  </div>
);

const ResultCard = ({ title, metrics }) => (
  <div className="p-4 md:p-6 bg-gray-800 rounded-lg">
    <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{title}</h3>
    <div className="space-y-2 md:space-y-3">
      {metrics.map(metric => (
        <div key={metric.label} className="flex justify-between items-center">
          <span className="text-sm md:text-base text-gray-300">{metric.label}</span>
          <span className="text-sm md:text-base text-green-400 font-mono">{metric.value}</span>
        </div>
      ))}
    </div>
  </div>
);

const DemoCard = ({ title, description, active, onClick, tryDemo }) => (
  <div 
    className={`p-4 md:p-6 rounded-lg cursor-pointer transition ${
      active ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-100'
    } border hover:shadow-md`}
    onClick={onClick}
  >
    <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm md:text-base text-gray-600 mb-4">{description}</p>
    <div className="flex items-center text-blue-500">
      <span className="text-sm md:text-base mr-2">{tryDemo}</span>
      <ChevronRight className="w-4 h-4" />
    </div>
  </div>
);

const ResourceCard = ({ icon, title, description, viewDetails }) => (
  <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="text-gray-700 mb-3 md:mb-4">{icon}</div>
    <h3 className="text-lg md:text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm md:text-base text-gray-600 mb-4">{description}</p>
    <div className="flex items-center text-blue-500">
      <span className="text-sm md:text-base mr-2">{viewDetails}</span>
      <ExternalLink className="w-4 h-4" />
    </div>
  </div>
);

export default ProjectHomepage;