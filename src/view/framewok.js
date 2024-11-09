import React, { useState } from 'react';
import { 
  Brain, 
  Eye, 
  Cpu,
  GanttChart,
  ChevronRight,
  ChevronDown,
  Layers
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ModelArchitecture = () => {
  const [activeTab, setActiveTab] = useState('supervised');
  // 设置默认展开的模型
  const [expandedModel, setExpandedModel] = useState('resnet50');
  
  // 当切换标签页时自动设置该标签页下的第一个模型为展开状态
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'supervised') {
      setExpandedModel('resnet50');
    } else {
      setExpandedModel('autoencoder');
    }
  };
  
  // 基于研究报告更新的指标数据
  const metrics = {
    supervised: {
      resnet50: { 
        accuracy: "99.95%", 
        precision: "99.93%", 
        recall: "99.98%", 
        f1: "99.95%",
        runtime: "39.76 mins"
      },
      alexnet: { 
        accuracy: "99.80%", 
        precision: "99.72%", 
        recall: "99.87%", 
        f1: "99.80%",
        runtime: "13.14 mins"
      },
      vit: { 
        accuracy: "99.41%", 
        precision: "98.92%", 
        recall: "99.90%", 
        f1: "99.41%",
        runtime: "120.48 mins"
      }
    },
    unsupervised: {
      autoencoder: { 
        accuracy: "95.57%", 
        precision: "96.96%", 
        recall: "53.59%", 
        f1: "68.68%",
        runtime: "13.91 mins" 
      },
      vae: { 
        accuracy: "94.18%", 
        precision: "95.57%", 
        recall: "37.75%", 
        f1: "54.13%",
        runtime: "15.94 mins"
      },
      vitAnomaly: { 
        accuracy: "99.68%", 
        precision: "99.47%", 
        recall: "99.87%", 
        f1: "99.67%",
        runtime: "22.48 mins"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Model Architecture & Results</h1>
          <div className="mt-4 flex space-x-4">
            <TabButton 
              active={activeTab === 'supervised'} 
              onClick={() => handleTabChange('supervised')}
              icon={<Eye className="w-5 h-5" />}
              text="Supervised Learning"
            />
            <TabButton 
              active={activeTab === 'unsupervised'} 
              onClick={() => handleTabChange('unsupervised')}
              icon={<Brain className="w-5 h-5" />}
              text="Unsupervised Learning"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'supervised' ? (
          <SupervisedSection 
            expandedModel={expandedModel}
            setExpandedModel={setExpandedModel}
            metrics={metrics.supervised}
          />
        ) : (
          <UnsupervisedSection 
            expandedModel={expandedModel}
            setExpandedModel={setExpandedModel}
            metrics={metrics.unsupervised}
          />
        )}
      </div>
    </div>
  );
};

const SupervisedSection = ({ expandedModel, setExpandedModel, metrics }) => (
  <div className="space-y-6">
    {/* ResNet50 */}
    <ModelCard
      title="ResNet50"
      expanded={expandedModel === 'resnet50'}
      onClick={() => setExpandedModel(expandedModel === 'resnet50' ? null : 'resnet50')}
      metrics={metrics.resnet50}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <div className="mt-4 space-y-2">
            <Parameter name="Residual Blocks" value="16" />
            <Parameter name="Feature Channels" value="64, 128, 256, 512" />
            <Parameter name="Bottleneck Structure" value="1x1, 3x3, 1x1 convolutions" />
            <Parameter name="Training Runtime" value={metrics.resnet50.runtime} />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Key Features</h4>
            <ul className="space-y-2">
              <Feature 
                icon={<Layers className="w-5 h-5" />}
                title="Skip Connections"
                description="Enables deeper network training by addressing vanishing gradients"
              />
              <Feature 
                icon={<Cpu className="w-5 h-5" />}
                title="Bottleneck Design"
                description="Reduces computational complexity while maintaining performance"
              />
              <Feature 
                icon={<GanttChart className="w-5 h-5" />}
                title="Batch Normalization"
                description="Stabilizes training and accelerates convergence"
              />
            </ul>
          </div>
        </div>
      </div>
    </ModelCard>

    {/* AlexNet */}
    <ModelCard
      title="AlexNet"
      expanded={expandedModel === 'alexnet'}
      onClick={() => setExpandedModel(expandedModel === 'alexnet' ? null : 'alexnet')}
      metrics={metrics.alexnet}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <div className="mt-4 space-y-2">
            <Parameter name="Convolutional Layers" value="5" />
            <Parameter name="Fully Connected Layers" value="3" />
            <Parameter name="Max Pooling Layers" value="3" />
            <Parameter name="Training Runtime" value={metrics.alexnet.runtime} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Performance Analysis</h4>
          <div className="space-y-4">
            <p className="text-gray-600">Fast training time but slightly lower accuracy compared to ResNet50. Good baseline model for quick prototyping.</p>
            <ResultsChart data={metrics.alexnet} />
          </div>
        </div>
      </div>
    </ModelCard>

    {/* ViT */}
    <ModelCard
      title="Vision Transformer (ViT)"
      expanded={expandedModel === 'vit'}
      onClick={() => setExpandedModel(expandedModel === 'vit' ? null : 'vit')}
      metrics={metrics.vit}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <div className="mt-4 space-y-2">
            <Parameter name="Transformer Layers" value="12" />
            <Parameter name="Patch Size" value="16x16" />
            <Parameter name="Hidden Size" value="768" />
            <Parameter name="Training Runtime" value={metrics.vit.runtime} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Performance Analysis</h4>
          <div className="space-y-4">
            <p className="text-gray-600">Longest training time but demonstrates good capability in capturing global features. Attention mechanism helps in contextual understanding.</p>
            <ResultsChart data={metrics.vit} />
          </div>
        </div>
      </div>
    </ModelCard>
  </div>
);

const UnsupervisedSection = ({ expandedModel, setExpandedModel, metrics }) => (
  <div className="space-y-6">
    {/* Standard Autoencoder */}
    <ModelCard
      title="Standard Autoencoder"
      expanded={expandedModel === 'autoencoder'}
      onClick={() => setExpandedModel(expandedModel === 'autoencoder' ? null : 'autoencoder')}
      metrics={metrics.autoencoder}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <div className="mt-4 space-y-2">
            <Parameter name="Encoder Layers" value="4" />
            <Parameter name="Decoder Layers" value="4" />
            <Parameter name="Training Runtime" value={metrics.autoencoder.runtime} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Performance Analysis</h4>
          <div className="space-y-4">
            <p className="text-gray-600">Shows good precision but lower recall, indicating conservative anomaly detection. Fast training time makes it suitable for initial experiments.</p>
            <ResultsChart data={metrics.autoencoder} />
          </div>
        </div>
      </div>
    </ModelCard>

    {/* VAE */}
    <ModelCard
      title="Variational Autoencoder (VAE)"
      expanded={expandedModel === 'vae'}
      onClick={() => setExpandedModel(expandedModel === 'vae' ? null : 'vae')}
      metrics={metrics.vae}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <div className="mt-4 space-y-2">
            <Parameter name="Encoder Structure" value="μ and σ networks" />
            <Parameter name="Latent Space" value="Normal Distribution" />
            <Parameter name="Training Runtime" value={metrics.vae.runtime} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Performance Analysis</h4>
          <div className="space-y-4">
            <p className="text-gray-600">Lower performance compared to standard autoencoder, particularly in recall. The probabilistic approach may need further optimization.</p>
            <ResultsChart data={metrics.vae} />
          </div>
        </div>
      </div>
    </ModelCard>

    {/* ViT Anomaly */}
    <ModelCard
      title="ViT Anomaly Detection"
      expanded={expandedModel === 'vitAnomaly'}
      onClick={() => setExpandedModel(expandedModel === 'vitAnomaly' ? null : 'vitAnomaly')}
      metrics={metrics.vitAnomaly}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <div className="mt-4 space-y-2">
            <Parameter name="Attention Heads" value="12" />
            <Parameter name="Token Dimension" value="768" />
            <Parameter name="Training Runtime" value={metrics.vitAnomaly.runtime} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Performance Analysis</h4>
          <div className="space-y-4">
            <p className="text-gray-600">Best performing unsupervised model with balanced precision and recall. Global attention mechanism proves effective for anomaly detection.</p>
            <ResultsChart data={metrics.vitAnomaly} />
          </div>
        </div>
      </div>
    </ModelCard>
  </div>
);

const TabButton = ({ active, onClick, icon, text }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-lg transition
      ${active 
        ? 'bg-blue-50 text-blue-600 font-medium' 
        : 'text-gray-600 hover:bg-gray-50'
      }`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

const ModelCard = ({ title, expanded, onClick, metrics, children }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100">
    <div 
      className="flex items-center justify-between p-6 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="ml-6 flex space-x-4">
          {Object.entries(metrics).map(([key, value]) => (
            <div key={key} className="text-sm">
              <span className="text-gray-500">{key}:</span>
              <span className="ml-1 font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
      {expanded ? (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400" />
      )}
    </div>
    {expanded && (
      <div className="p-6 border-t border-gray-100">
        {children}
      </div>
    )}
  </div>
);

const Parameter = ({ name, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-gray-500">{name}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const Feature = ({ icon, title, description }) => (
  <li className="flex items-start space-x-3">
    <div className="flex-shrink-0 mt-1 text-blue-500">{icon}</div>
    <div>
      <h5 className="font-medium">{title}</h5>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </li>
);

// Architecture diagrams using SVG
const ArchitectureDiagram = ({ type }) => {
    switch(type) {
      case 'resnet':
        return (
          <svg viewBox="0 0 800 200" className="w-full h-32">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
              </marker>
            </defs>
            <g className="resnet-block">
              <rect x="50" y="60" width="120" height="80" fill="#dbeafe" stroke="#3b82f6" />
              <text x="110" y="100" textAnchor="middle" className="text-sm">Conv1</text>
              <rect x="200" y="60" width="120" height="80" fill="#dbeafe" stroke="#3b82f6" />
              <text x="260" y="100" textAnchor="middle" className="text-sm">ResBlock</text>
              <rect x="350" y="60" width="120" height="80" fill="#dbeafe" stroke="#3b82f6" />
              <text x="410" y="100" textAnchor="middle" className="text-sm">ResBlock</text>
              <rect x="500" y="60" width="120" height="80" fill="#dbeafe" stroke="#3b82f6" />
              <text x="560" y="100" textAnchor="middle" className="text-sm">FC</text>
              
              <path d="M 170 100 H 200" stroke="#666" markerEnd="url(#arrowhead)" />
              <path d="M 320 100 H 350" stroke="#666" markerEnd="url(#arrowhead)" />
              <path d="M 470 100 H 500" stroke="#666" markerEnd="url(#arrowhead)" />
              
              <path d="M 200 40 H 470 M 335 40 V 60" stroke="#666" strokeDasharray="4" />
            </g>
          </svg>
        );
      
      case 'vit':
        return (
          <svg viewBox="0 0 800 200" className="w-full h-32">
            <rect x="50" y="60" width="100" height="80" fill="#dbeafe" stroke="#3b82f6" />
            <text x="100" y="100" textAnchor="middle" className="text-sm">Patch</text>
            <text x="100" y="120" textAnchor="middle" className="text-sm">Embedding</text>
            
            <rect x="180" y="60" width="400" height="80" fill="#dbeafe" stroke="#3b82f6" />
            <text x="380" y="100" textAnchor="middle" className="text-sm">Transformer Encoder</text>
            <text x="380" y="120" textAnchor="middle" className="text-sm">(Multi-Head Attention + MLP)</text>
            
            <rect x="610" y="60" width="100" height="80" fill="#dbeafe" stroke="#3b82f6" />
            <text x="660" y="100" textAnchor="middle" className="text-sm">MLP</text>
            <text x="660" y="120" textAnchor="middle" className="text-sm">Head</text>
            
            <path d="M 150 100 H 180" stroke="#666" markerEnd="url(#arrowhead)" />
            <path d="M 580 100 H 610" stroke="#666" markerEnd="url(#arrowhead)" />
          </svg>
        );
        
      case 'autoencoder':
        return (
          <svg viewBox="0 0 800 200" className="w-full h-32">
            <rect x="50" y="60" width="200" height="80" fill="#dbeafe" stroke="#3b82f6" />
            <text x="150" y="100" textAnchor="middle" className="text-sm">Encoder</text>
            
            <rect x="300" y="80" width="100" height="40" fill="#bfdbfe" stroke="#3b82f6" />
            <text x="350" y="105" textAnchor="middle" className="text-sm">Latent</text>
            
            <rect x="450" y="60" width="200" height="80" fill="#dbeafe" stroke="#3b82f6" />
            <text x="550" y="100" textAnchor="middle" className="text-sm">Decoder</text>
            
            <path d="M 250 100 H 300" stroke="#666" markerEnd="url(#arrowhead)" />
            <path d="M 400 100 H 450" stroke="#666" markerEnd="url(#arrowhead)" />
          </svg>
        );
        
      case 'vae':
        return (
          <svg viewBox="0 0 800 200" className="w-full h-32">
            <rect x="50" y="40" width="200" height="60" fill="#dbeafe" stroke="#3b82f6" />
            <text x="150" y="75" textAnchor="middle" className="text-sm">μ Encoder</text>
            
            <rect x="50" y="120" width="200" height="60" fill="#dbeafe" stroke="#3b82f6" />
            <text x="150" y="155" textAnchor="middle" className="text-sm">σ Encoder</text>
            
            <rect x="300" y="80" width="100" height="40" fill="#bfdbfe" stroke="#3b82f6" />
            <text x="350" y="105" textAnchor="middle" className="text-sm">Sample</text>
            
            <rect x="450" y="60" width="200" height="80" fill="#dbeafe" stroke="#3b82f6" />
            <text x="550" y="100" textAnchor="middle" className="text-sm">Decoder</text>
            
            <path d="M 250 70 L 300 100" stroke="#666" markerEnd="url(#arrowhead)" />
            <path d="M 250 150 L 300 100" stroke="#666" markerEnd="url(#arrowhead)" />
            <path d="M 400 100 H 450" stroke="#666" markerEnd="url(#arrowhead)" />
          </svg>
        );
      
      default:
        return null;
    }
  };
  
  const ResultsChart = ({ data }) => {
    const chartData = Object.entries(data).map(([key, value]) => ({
      metric: key,
      value: parseFloat(value)
    }));
  
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metric" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  const AutoencoderResults = ({ data }) => {
    const reconstructionData = [
      { name: 'Original', value: 100 },
      { name: 'Reconstructed', value: parseFloat(data.reconstruction) }
    ];
  
    return (
      <div className="space-y-4">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={reconstructionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium">Latent Dimension</div>
            <div className="text-2xl font-bold text-blue-600">{data.latentDim}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium">Anomaly Score</div>
            <div className="text-2xl font-bold text-blue-600">{data.anomalyScore}</div>
          </div>
        </div>
      </div>
    );
  };
  
  const VAEResults = ({ data }) => {
    const chartData = [
      { name: 'ELBO', value: parseFloat(data.elbo) },
      { name: 'KL Divergence', value: parseFloat(data.kl) * 100 },
      { name: 'Reconstruction', value: parseFloat(data.reconstruction) }
    ];
  
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  const AnomalyResults = ({ data }) => {
    const chartData = [
      { name: 'AUC', value: parseFloat(data.anomalyAUC) * 100 },
      { name: 'Cluster Purity', value: parseFloat(data.clusterPurity) * 100 },
      { name: 'Silhouette', value: parseFloat(data.silhouette) * 100 }
    ];
  
    return (
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    );
  };
  
  export { ArchitectureDiagram, ResultsChart, AutoencoderResults, VAEResults, AnomalyResults };