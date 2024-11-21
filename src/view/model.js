// src/components/ModelArchitecture.jsx
import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Eye, 
  ChevronRight,
  ChevronDown,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ModelArchitecture = () => {
  const [activeTab, setActiveTab] = useState('supervised');
  const [expandedModel, setExpandedModel] = useState('resnet50');

  useEffect(() => {
    if (activeTab === 'supervised') {
      setExpandedModel('resnet50');
    } else if (activeTab === 'unsupervised') {
      setExpandedModel('autoencoder');
    }
  }, [activeTab]);

  const metrics = {
    supervised: {
      resnet50: { accuracy: "99.95%", precision: "99.93%", recall: "99.98%", f1: "99.95%", runtime: "39.76 mins" },
      alexnet: { accuracy: "99.80%", precision: "99.72%", recall: "99.87%", f1: "99.80%", runtime: "13.14 mins" },
      vit: { accuracy: "99.41%", precision: "98.92%", recall: "99.90%", f1: "99.41%", runtime: "120.48 mins" }
    },
    unsupervised: {
      autoencoder: { accuracy: "95.57%", precision: "96.96%", recall: "53.59%", f1: "68.68%", runtime: "13.91 mins" },
      vae: { accuracy: "94.18%", precision: "95.57%", recall: "37.75%", f1: "54.13%", runtime: "15.94 mins" },
      vitAnomaly: { accuracy: "99.68%", precision: "99.47%", recall: "99.87%", f1: "99.67%", runtime: "22.48 mins" }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Model Architecture & Results</h1>
          <div className="mt-4 flex space-x-4">
            <TabButton 
              active={activeTab === 'supervised'} 
              onClick={() => setActiveTab('supervised')}
              icon={<Eye className="w-5 h-5" />}
              text="Supervised Learning"
            />
            <TabButton 
              active={activeTab === 'unsupervised'} 
              onClick={() => setActiveTab('unsupervised')}
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
        {/* Architecture Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <p className="text-gray-700 text-sm">
            In this study, we have used ResNet50, developed by Microsoft, which is a pre-trained convolutional neural network to simplify the application of CNNs in the classification task of cracks in images. ResNet50 introduces residual blocks to address the vanishing gradient problem in deep networks, allowing for the training of much deeper and more effective networks.
          </p>
          {/* Include Architecture Diagram */}
          <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
            <ArchitectureDiagram type="resnet" />
          </div>
          <div className="mt-4 space-y-2">
            <Parameter name="Number of Residual Blocks" value="16" />
            <Parameter name="Feature Channels" value="64, 128, 256, 512" />
            <Parameter name="Bottleneck Structure" value="1x1, 3x3, 1x1 convolutions" />
          </div>
        </div>
        {/* Results Visualization */}
        <div className="space-y-6">
          {/* Model Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Model Performance</h4>
            <ul className="space-y-2">
              <Parameter name="Accuracy" value={metrics.resnet50.accuracy} />
              <Parameter name="Recall" value={metrics.resnet50.recall} />
              <Parameter name="Precision" value={metrics.resnet50.precision} />
              <Parameter name="F1 Score" value={metrics.resnet50.f1} />
              <Parameter name="Runtime" value={metrics.resnet50.runtime} />
            </ul>
          </div>
          {/* Results Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Results Visualization</h4>
            <ResultsChart data={metrics.resnet50} />
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
        {/* Architecture Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <p className="text-gray-700 text-sm">
            AlexNet is a deep convolutional neural network introduced by Krizhevsky et al., used here for the classification task of cracks in images. It consists of 5 convolutional layers and 3 fully connected layers, effectively extracting features from images.
          </p>
          {/* Include Architecture Diagram */}
          <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
            <ArchitectureDiagram type="alexnet" />
          </div>
          <div className="mt-4 space-y-2">
            <Parameter name="Number of Convolutional Layers" value="5" />
            <Parameter name="Number of Fully Connected Layers" value="3" />
            <Parameter name="Number of Max Pooling Layers" value="3" />
          </div>
        </div>
        {/* Results Visualization */}
        <div className="space-y-6">
          {/* Model Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Model Performance</h4>
            <ul className="space-y-2">
              <Parameter name="Accuracy" value={metrics.alexnet.accuracy} />
              <Parameter name="Recall" value={metrics.alexnet.recall} />
              <Parameter name="Precision" value={metrics.alexnet.precision} />
              <Parameter name="F1 Score" value={metrics.alexnet.f1} />
              <Parameter name="Runtime" value={metrics.alexnet.runtime} />
            </ul>
          </div>
          {/* Results Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Results Visualization</h4>
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
        {/* Architecture Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <p className="text-gray-700 text-sm">
            In model design, we follow the base version of the Vision Transformer (ViT) presented by Dosovitskiy et al., which contains 12 layers with a 16x16 input patch size. ViT extends the standard Transformer to perform image classification tasks, consisting of an embedding layer, an encoder, and a classifier as the final output layer.
          </p>
          {/* Include Architecture Diagram */}
          <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
            <ArchitectureDiagram type="vit" />
          </div>
          <div className="mt-4 space-y-2">
            <Parameter name="Patch Size" value="16x16" />
            <Parameter name="Number of Layers" value="12" />
            <Parameter name="Hidden Size" value="768" />
          </div>
        </div>
        {/* Results Visualization */}
        <div className="space-y-6">
          {/* Model Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Model Performance</h4>
            <ul className="space-y-2">
              <Parameter name="Accuracy" value={metrics.vit.accuracy} />
              <Parameter name="Recall" value={metrics.vit.recall} />
              <Parameter name="Precision" value={metrics.vit.precision} />
              <Parameter name="F1 Score" value={metrics.vit.f1} />
              <Parameter name="Runtime" value={metrics.vit.runtime} />
            </ul>
          </div>
          {/* Results Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Results Visualization</h4>
            <ResultsChart data={metrics.vit} />
          </div>
        </div>
      </div>
    </ModelCard>
  </div>
);

const UnsupervisedSection = ({ expandedModel, setExpandedModel, metrics }) => (
  <div className="space-y-6">
    {/* Convolutional Autoencoder (CAE) */}
    <ModelCard
      title="Convolutional Autoencoder (CAE)"
      expanded={expandedModel === 'autoencoder'}
      onClick={() => setExpandedModel(expandedModel === 'autoencoder' ? null : 'autoencoder')}
      metrics={metrics.autoencoder}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Architecture Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <p className="text-gray-700 text-sm">
            For the architecture to perform crack anomaly detection in image data, we employed convolutional autoencoders (CAE) to learn feature representations of the input images in an unsupervised manner. The CAE consists of an encoder and a decoder; the encoder extracts meaningful features from the input, and the decoder reconstructs the input based on these learned features.
          </p>
          {/* Include Architecture Diagram */}
          <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
            <ArchitectureDiagram type="autoencoder" />
          </div>
          <div className="mt-4 space-y-2">
            <Parameter name="Number of Encoder Layers" value="4" />
            <Parameter name="Number of Decoder Layers" value="4" />
            <Parameter name="Latent Dimension" value="128" />
          </div>
        </div>
        {/* Results Visualization */}
        <div className="space-y-6">
          {/* Model Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Model Performance</h4>
            <ul className="space-y-2">
              <Parameter name="Accuracy" value={metrics.autoencoder.accuracy} />
              <Parameter name="Recall" value={metrics.autoencoder.recall} />
              <Parameter name="Precision" value={metrics.autoencoder.precision} />
              <Parameter name="F1 Score" value={metrics.autoencoder.f1} />
              <Parameter name="Runtime" value={metrics.autoencoder.runtime} />
            </ul>
          </div>
          {/* Results Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Results Visualization</h4>
            <AutoencoderResults data={metrics.autoencoder} />
          </div>
        </div>
      </div>
    </ModelCard>

    {/* Variational Autoencoder (VAE) */}
    <ModelCard
      title="Convolutional Variational Autoencoder (CVAE)"
      expanded={expandedModel === 'vae'}
      onClick={() => setExpandedModel(expandedModel === 'vae' ? null : 'vae')}
      metrics={metrics.vae}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Architecture Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <p className="text-gray-700 text-sm">
            In addition to the CAE, we utilized a convolutional variational autoencoder (CVAE) that includes a probabilistic latent space instead of a fixed set of feature representations in the CAE. The CVAE consists of an encoder and a decoder; the encoder learns the data distribution, and the decoder samples from it to reconstruct the input.
          </p>
          {/* Include Architecture Diagram */}
          <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
            <ArchitectureDiagram type="vae" />
          </div>
          <div className="mt-4 space-y-2">
            <Parameter name="Encoder Structure" value="μ and σ networks" />
            <Parameter name="Latent Space" value="Normal Distribution" />
            <Parameter name="Loss Function" value="ELBO = Reconstruction + KL Divergence" />
          </div>
        </div>
        {/* Results Visualization */}
        <div className="space-y-6">
          {/* Model Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Model Performance</h4>
            <ul className="space-y-2">
              <Parameter name="Accuracy" value={metrics.vae.accuracy} />
              <Parameter name="Recall" value={metrics.vae.recall} />
              <Parameter name="Precision" value={metrics.vae.precision} />
              <Parameter name="F1 Score" value={metrics.vae.f1} />
              <Parameter name="Runtime" value={metrics.vae.runtime} />
            </ul>
          </div>
          {/* Results Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Results Visualization</h4>
            <VAEResults data={metrics.vae} />
          </div>
        </div>
      </div>
    </ModelCard>

    {/* ViT Anomaly Detection */}
    <ModelCard
      title="Vision Transformer Anomaly Detection"
      expanded={expandedModel === 'vitAnomaly'}
      onClick={() => setExpandedModel(expandedModel === 'vitAnomaly' ? null : 'vitAnomaly')}
      metrics={metrics.vitAnomaly}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Architecture Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-4">Architecture Overview</h4>
          <p className="text-gray-700 text-sm">
            To address the common challenge of obtaining labeled datasets, we formulated the task to train the model to detect structural cracks in an unsupervised approach using the Vision Transformer (ViT). ViT's attention mechanism allows it to focus on multiple regions of the image simultaneously and integrate information from across the entire image.
          </p>
          {/* Include Architecture Diagram */}
          <div className="bg-gray-50 p-4 rounded-lg overflow-hidden">
            <ArchitectureDiagram type="vitAnomaly" />
          </div>
          <div className="mt-4 space-y-2">
            <Parameter name="Number of Attention Heads" value="12" />
            <Parameter name="Token Dimension" value="768" />
            <Parameter name="Anomaly Threshold" value="Dynamic" />
          </div>
        </div>
        {/* Results Visualization */}
        <div className="space-y-6">
          {/* Model Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Model Performance</h4>
            <ul className="space-y-2">
              <Parameter name="Accuracy" value={metrics.vitAnomaly.accuracy} />
              <Parameter name="Recall" value={metrics.vitAnomaly.recall} />
              <Parameter name="Precision" value={metrics.vitAnomaly.precision} />
              <Parameter name="F1 Score" value={metrics.vitAnomaly.f1} />
              <Parameter name="Runtime" value={metrics.vitAnomaly.runtime} />
            </ul>
          </div>
          {/* Results Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-lg font-semibold mb-4">Results Visualization</h4>
            <AnomalyResults data={metrics.vitAnomaly} />
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
          <div className="text-sm">
            <span className="text-gray-500">Accuracy:</span>
            <span className="ml-1 font-medium">{metrics.accuracy}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">F1 Score:</span>
            <span className="ml-1 font-medium">{metrics.f1}</span>
          </div>
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


// Architecture diagrams using SVG
const ArchitectureDiagram = ({ type }) => {
  switch(type) {
    case 'resnet':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
        {/* Styles */}
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
            </marker>
        </defs>
        
        {/* Input Layer */}
        <rect x="100" y="200" width="100" height="60" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
        <text x="150" y="235" text-anchor="middle" font-size="14">Input
            <tspan x="150" y="255">3×224×224</tspan>
        </text>
        
        {/* Conv1 Layer */}
        <rect x="250" y="200" width="100" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
        <text x="300" y="225" text-anchor="middle" font-size="14">Conv1
            <tspan x="300" y="245">7×7, 64</tspan>
            <tspan x="300" y="255">stride 2</tspan>
        </text>
        
        {/* MaxPool Layer */}
        <rect x="400" y="200" width="100" height="60" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="4"/>
        <text x="450" y="225" text-anchor="middle" font-size="14">MaxPool
            <tspan x="450" y="245">3×3</tspan>
            <tspan x="450" y="255">stride 2</tspan>
        </text>
        
        {/* Layer1 */}
        <rect x="550" y="180" width="120" height="100" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="4"/>
        <text x="610" y="210" text-anchor="middle" font-size="14">Layer1</text>
        <text x="610" y="230" text-anchor="middle" font-size="12">1×1, 64</text>
        <text x="610" y="245" text-anchor="middle" font-size="12">3×3, 64</text>
        <text x="610" y="260" text-anchor="middle" font-size="12">1×1, 256</text>
        <text x="610" y="275" text-anchor="middle" font-size="12">×3 blocks</text>
        
        {/* Layer2 */}
        <rect x="720" y="180" width="120" height="100" fill="#e8eaf6" stroke="#283593" stroke-width="2" rx="4"/>
        <text x="780" y="210" text-anchor="middle" font-size="14">Layer2</text>
        <text x="780" y="230" text-anchor="middle" font-size="12">1×1, 128</text>
        <text x="780" y="245" text-anchor="middle" font-size="12">3×3, 128</text>
        <text x="780" y="260" text-anchor="middle" font-size="12">1×1, 512</text>
        <text x="780" y="275" text-anchor="middle" font-size="12">×4 blocks</text>
        
        {/* Layer3 */}
        <rect x="890" y="180" width="120" height="100" fill="#fce4ec" stroke="#c2185b" stroke-width="2" rx="4"/>
        <text x="950" y="210" text-anchor="middle" font-size="14">Layer3</text>
        <text x="950" y="230" text-anchor="middle" font-size="12">1×1, 256</text>
        <text x="950" y="245" text-anchor="middle" font-size="12">3×3, 256</text>
        <text x="950" y="260" text-anchor="middle" font-size="12">1×1, 1024</text>
        <text x="950" y="275" text-anchor="middle" font-size="12">×6 blocks</text>
        
        {/* Layer4 */}
        <rect x="1060" y="180" width="120" height="100" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="4"/>
        <text x="1120" y="210" text-anchor="middle" font-size="14">Layer4</text>
        <text x="1120" y="230" text-anchor="middle" font-size="12">1×1, 512</text>
        <text x="1120" y="245" text-anchor="middle" font-size="12">3×3, 512</text>
        <text x="1120" y="260" text-anchor="middle" font-size="12">1×1, 2048</text>
        <text x="1120" y="275" text-anchor="middle" font-size="12">×3 blocks</text>
        
        {/* AvgPool and FC */}
        <rect x="1060" y="330" width="120" height="40" fill="#e0f7fa" stroke="#006064" stroke-width="2" rx="4"/>
        <text x="1120" y="355" text-anchor="middle" font-size="14">AvgPool + FC (2)</text>
        
        {/* Connections */}
        <path d="M 200 230 L 250 230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 350 230 L 400 230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 500 230 L 550 230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 670 230 L 720 230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 840 230 L 890 230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 1010 230 L 1060 230" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 1120 280 L 1120 330" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        
        {/* Skip Connections */}
        <path d="M 610 160 L 780 160" stroke="#ff4081" stroke-width="2" stroke-dasharray="5,5"/>
        <path d="M 780 160 L 950 160" stroke="#ff4081" stroke-width="2" stroke-dasharray="5,5"/>
        <path d="M 950 160 L 1120 160" stroke="#ff4081" stroke-width="2" stroke-dasharray="5,5"/>
        
        {/* Legend */}
        <rect x="100" y="400" width="180" height="100" fill="white" stroke="#666" stroke-width="1" rx="4"/>
        <text x="110" y="420" font-size="14">Legend:</text>
        <rect x="110" y="430" width="15" height="15" fill="none" stroke="#ff4081" stroke-width="2" stroke-dasharray="5,5"/>
        <text x="135" y="442" font-size="12">Skip Connection</text>
        <rect x="110" y="455" width="15" height="15" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
        <text x="135" y="467" font-size="12">Conv Layer</text>
        <rect x="110" y="480" width="15" height="15" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="1"/>
        <text x="135" y="492" font-size="12">Bottleneck Block</text>
    </svg>
      );
    
    case 'alexnet':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500">
          {/* Styles */}
          <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
          </defs>
          
          {/* Input Layer */}
          <rect x="50" y="150" width="80" height="60" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
          <text x="90" y="175" text-anchor="middle" font-size="14">Input
              <tspan x="90" y="195">3×224×224</tspan>
          </text>
          
          {/* Features Section */}
          {/* Conv1 + ReLU + MaxPool */}
          <rect x="180" y="150" width="100" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
          <text x="230" y="170" text-anchor="middle" font-size="14">Conv1
              <tspan x="230" y="185">11×11, 64</tspan>
              <tspan x="230" y="200">stride 4</tspan>
          </text>
          
          <rect x="320" y="150" width="80" height="60" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="4"/>
          <text x="360" y="175" text-anchor="middle" font-size="14">MaxPool
              <tspan x="360" y="195">3×3, s2</tspan>
          </text>
          
          {/* Conv2 + ReLU + MaxPool */}
          <rect x="440" y="150" width="100" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
          <text x="490" y="170" text-anchor="middle" font-size="14">Conv2
              <tspan x="490" y="185">5×5, 192</tspan>
              <tspan x="490" y="200">stride 1</tspan>
          </text>
          
          <rect x="580" y="150" width="80" height="60" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="4"/>
          <text x="620" y="175" text-anchor="middle" font-size="14">MaxPool
              <tspan x="620" y="195">3×3, s2</tspan>
          </text>
          
          {/* Conv3 + ReLU */}
          <rect x="700" y="150" width="100" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
          <text x="750" y="170" text-anchor="middle" font-size="14">Conv3
              <tspan x="750" y="185">3×3, 384</tspan>
              <tspan x="750" y="200">stride 1</tspan>
          </text>
          
          {/* Conv4 + ReLU */}
          <rect x="840" y="150" width="100" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
          <text x="890" y="170" text-anchor="middle" font-size="14">Conv4
              <tspan x="890" y="185">3×3, 256</tspan>
              <tspan x="890" y="200">stride 1</tspan>
          </text>
          
          {/* Conv5 + ReLU + MaxPool */}
          <rect x="980" y="150" width="100" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
          <text x="1030" y="170" text-anchor="middle" font-size="14">Conv5
              <tspan x="1030" y="185">3×3, 256</tspan>
              <tspan x="1030" y="200">stride 1</tspan>
          </text>
          
          {/* Classifier Section */}
          <rect x="700" y="270" width="380" height="100" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="4"/>
          <text x="890" y="295" text-anchor="middle" font-size="14">Classifier</text>
          <text x="890" y="320" text-anchor="middle" font-size="12">Dropout(0.5) → FC(9216→4096) → ReLU →</text>
          <text x="890" y="340" text-anchor="middle" font-size="12">Dropout(0.5) → FC(4096→4096) → ReLU →</text>
          <text x="890" y="360" text-anchor="middle" font-size="12">FC(4096→2)</text>
          
          {/* Connections */}
          <path d="M 130 180 L 180 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <path d="M 280 180 L 320 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <path d="M 400 180 L 440 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <path d="M 540 180 L 580 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <path d="M 660 180 L 700 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <path d="M 800 180 L 840 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <path d="M 940 180 L 980 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          <path d="M 1080 180 L 1080 270" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
          
          {/* Legend */}
          <rect x="50" y="400" width="200" height="80" fill="white" stroke="#666" stroke-width="1" rx="4"/>
          <text x="60" y="420" font-size="14">Legend:</text>
          <rect x="60" y="430" width="15" height="15" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
          <text x="85" y="442" font-size="12">Conv + ReLU Layer</text>
          <rect x="60" y="455" width="15" height="15" fill="#fff3e0" stroke="#ef6c00" stroke-width="1"/>
          <text x="85" y="467" font-size="12">MaxPool Layer</text>
      </svg>);
    case 'vgg16':
      return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500">
        {/* Styles */}
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
            </marker>
        </defs>
        
        {/* Input Layer */}
        <rect x="50" y="150" width="80" height="60" fill="#e3f2fd" stroke="#1565c0" stroke-width="2" rx="4"/>
        <text x="90" y="175" text-anchor="middle" font-size="14">Input
            <tspan x="90" y="195">3×224×224</tspan>
        </text>
        
        {/* Block 1: 2×Conv64 */}
        <rect x="170" y="150" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
        <text x="230" y="170" text-anchor="middle" font-size="14">Conv Block 1
            <tspan x="230" y="185">2× [3×3, 64]</tspan>
            <tspan x="230" y="200">stride 1</tspan>
        </text>
        
        <rect x="310" y="150" width="60" height="60" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="4"/>
        <text x="340" y="175" text-anchor="middle" font-size="14">Pool
            <tspan x="340" y="195">2×2</tspan>
        </text>
        
        {/* Block 2: 2×Conv128 */}
        <rect x="390" y="150" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
        <text x="450" y="170" text-anchor="middle" font-size="14">Conv Block 2
            <tspan x="450" y="185">2× [3×3, 128]</tspan>
            <tspan x="450" y="200">stride 1</tspan>
        </text>
        
        <rect x="530" y="150" width="60" height="60" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="4"/>
        <text x="560" y="175" text-anchor="middle" font-size="14">Pool
            <tspan x="560" y="195">2×2</tspan>
        </text>
        
        {/* Block 3: 3×Conv256 */}
        <rect x="610" y="150" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
        <text x="670" y="170" text-anchor="middle" font-size="14">Conv Block 3
            <tspan x="670" y="185">3× [3×3, 256]</tspan>
            <tspan x="670" y="200">stride 1</tspan>
        </text>
        
        <rect x="750" y="150" width="60" height="60" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="4"/>
        <text x="780" y="175" text-anchor="middle" font-size="14">Pool
            <tspan x="780" y="195">2×2</tspan>
        </text>
        
        {/* Block 4: 3×Conv512 */}
        <rect x="830" y="150" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
        <text x="890" y="170" text-anchor="middle" font-size="14">Conv Block 4
            <tspan x="890" y="185">3× [3×3, 512]</tspan>
            <tspan x="890" y="200">stride 1</tspan>
        </text>
        
        <rect x="970" y="150" width="60" height="60" fill="#fff3e0" stroke="#ef6c00" stroke-width="2" rx="4"/>
        <text x="1000" y="175" text-anchor="middle" font-size="14">Pool
            <tspan x="1000" y="195">2×2</tspan>
        </text>
        
        {/* Block 5: 3×Conv512 */}
        <rect x="1050" y="150" width="120" height="60" fill="#e8f5e9" stroke="#2e7d32" stroke-width="2" rx="4"/>
        <text x="1110" y="170" text-anchor="middle" font-size="14">Conv Block 5
            <tspan x="1110" y="185">3× [3×3, 512]</tspan>
            <tspan x="1110" y="200">stride 1</tspan>
        </text>
        
        {/* AvgPool */}
        <rect x="970" y="250" width="200" height="40" fill="#e1bee7" stroke="#6a1b9a" stroke-width="2" rx="4"/>
        <text x="1070" y="275" text-anchor="middle" font-size="14">AvgPool (7×7)</text>
        
        {/* Classifier */}
        <rect x="920" y="320" width="300" height="100" fill="#f3e5f5" stroke="#6a1b9a" stroke-width="2" rx="4"/>
        <text x="1070" y="345" text-anchor="middle" font-size="14">Classifier</text>
        <text x="1070" y="365" text-anchor="middle" font-size="12">FC(25088→4096) → ReLU → Dropout(0.5)</text>
        <text x="1070" y="385" text-anchor="middle" font-size="12">FC(4096→4096) → ReLU → Dropout(0.5)</text>
        <text x="1070" y="405" text-anchor="middle" font-size="12">FC(4096→2)</text>
        
        {/* Connections */}
        <path d="M 130 180 L 170 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 290 180 L 310 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 370 180 L 390 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 510 180 L 530 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 590 180 L 610 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 730 180 L 750 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 810 180 L 830 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 950 180 L 970 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 1030 180 L 1050 180" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 1170 180 L 1170 250" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        <path d="M 1070 290 L 1070 320" stroke="#666" stroke-width="2" marker-end="url(#arrowhead)"/>
        
        {/* Legend */}
        <rect x="50" y="400" width="220" height="80" fill="white" stroke="#666" stroke-width="1" rx="4"/>
        <text x="60" y="420" font-size="14">Legend:</text>
        <rect x="60" y="430" width="15" height="15" fill="#e8f5e9" stroke="#2e7d32" stroke-width="1"/>
        <text x="85" y="442" font-size="12">Conv Block (Conv + ReLU)</text>
        <rect x="60" y="455" width="15" height="15" fill="#fff3e0" stroke="#ef6c00" stroke-width="1"/>
        <text x="85" y="467" font-size="12">MaxPool Layer</text>
    </svg>
      );


    case 'vit':
      return (
        <div className="w-full">
          <svg viewBox="0 0 800 400" className="w-full h-full">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
              </marker>
              <linearGradient id="inputGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" stopOpacity="1" />
                <stop offset="100%" stopColor="#3730A3" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="encoderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366F1" stopOpacity="1" />
                <stop offset="100%" stopColor="#4F46E5" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="mlpGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="1" />
              </linearGradient>
            </defs>
    
            {/* Input Image Section */}
            <g transform="translate(20, 50)">
              <rect width="120" height="80" rx="5" fill="url(#inputGrad)" />
              <text x="60" y="45" textAnchor="middle" fill="white" fontSize="12">Input Image</text>
              <text x="60" y="65" textAnchor="middle" fill="white" fontSize="10">(3 channels)</text>
            </g>
    
            {/* Patch Embedding */}
            <g transform="translate(180, 30)">
              <rect width="140" height="120" rx="5" fill="url(#inputGrad)" />
              <text x="70" y="30" textAnchor="middle" fill="white" fontSize="12">Conv Projection</text>
              <text x="70" y="50" textAnchor="middle" fill="white" fontSize="10">16×16 patches</text>
              <text x="70" y="70" textAnchor="middle" fill="white" fontSize="10">in: 3</text>
              <text x="70" y="90" textAnchor="middle" fill="white" fontSize="10">out: 768</text>
            </g>
    
            {/* Encoder Stack */}
            <g transform="translate(360, 20)">
              <rect width="280" height="360" rx="5" fill="url(#encoderGrad)" />
              <text x="140" y="30" textAnchor="middle" fill="white" fontSize="14">Transformer Encoder × 12</text>
              
              {/* Single Encoder Block Detail */}
              <g transform="translate(20, 50)">
                {/* Layer Norm 1 */}
                <rect width="240" height="30" rx="3" fill="white" fillOpacity="0.15" />
                <text x="120" y="20" textAnchor="middle" fill="white" fontSize="12">Layer Norm (768)</text>
    
                {/* Self Attention */}
                <g transform="translate(0, 40)">
                  <rect width="240" height="80" rx="3" fill="white" fillOpacity="0.2" />
                  <text x="120" y="20" textAnchor="middle" fill="white" fontSize="12">Multi-Head Attention</text>
                  <text x="120" y="40" textAnchor="middle" fill="white" fontSize="10">in: 768, out: 768</text>
                  <text x="120" y="60" textAnchor="middle" fill="white" fontSize="10">NonDynamicallyQuantizable</text>
                </g>
    
                {/* Layer Norm 2 */}
                <g transform="translate(0, 130)">
                  <rect width="240" height="30" rx="3" fill="white" fillOpacity="0.15" />
                  <text x="120" y="20" textAnchor="middle" fill="white" fontSize="12">Layer Norm (768)</text>
                </g>
    
                {/* MLP Block */}
                <g transform="translate(0, 170)">
                  <rect width="240" height="120" rx="3" fill="url(#mlpGrad)" />
                  <text x="120" y="25" textAnchor="middle" fill="white" fontSize="12">MLP Block</text>
                  <text x="120" y="45" textAnchor="middle" fill="white" fontSize="10">Linear (768 → 3072)</text>
                  <text x="120" y="65" textAnchor="middle" fill="white" fontSize="10">GELU</text>
                  <text x="120" y="85" textAnchor="middle" fill="white" fontSize="10">Dropout(0.0)</text>
                  <text x="120" y="105" textAnchor="middle" fill="white" fontSize="10">Linear (3072 → 768)</text>
                </g>
              </g>
            </g>
    
            {/* Output Head */}
            <g transform="translate(680, 50)">
              <rect width="100" height="80" rx="5" fill="url(#inputGrad)" />
              <text x="50" y="35" textAnchor="middle" fill="white" fontSize="12">Heads</text>
              <text x="50" y="55" textAnchor="middle" fill="white" fontSize="10">Linear</text>
              <text x="50" y="70" textAnchor="middle" fill="white" fontSize="10">(768 → 2)</text>
            </g>
    
            {/* Connecting Arrows */}
            <g fill="none" stroke="#666" strokeWidth="2" markerEnd="url(#arrowhead)">
              <line x1="140" y1="90" x2="180" y2="90" />
              <line x1="320" y1="90" x2="360" y2="90" />
              <line x1="640" y1="90" x2="680" y2="90" />
            </g>
    
            {/* Additional Details */}
            <g transform="translate(360, 330)">
              <text x="140" y="30" textAnchor="middle" fill="white" fontSize="10">Dropout(0.0) throughout</text>
              <text x="140" y="45" textAnchor="middle" fill="white" fontSize="10">LayerNorm eps=1e-6</text>
            </g>
          </svg>
        </div>
      );
      
    case 'autoencoder':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 500">
    {/* Styles */}
    <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#2E7D32"/>
        </marker>
    </defs>
    
    {/* Input Layer */}
    <rect x="50" y="200" width="100" height="100" fill="#B2DFDB" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="100" y="235" textAnchor="middle" fontSize="14">Input
        <tspan x="100" y="255">28×28×1</tspan>
    </text>
    
    {/* Encoder Section */}
    {/* Conv1 + MaxPool */}
    <rect x="200" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="250" y="235" textAnchor="middle" fontSize="14">Conv1
        <tspan x="250" y="255">3×3, 32</tspan>
        <tspan x="250" y="275">14×14×32</tspan>
    </text>
    
    {/* Conv2 + MaxPool */}
    <rect x="350" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="400" y="235" textAnchor="middle" fontSize="14">Conv2
        <tspan x="400" y="255">3×3, 64</tspan>
        <tspan x="400" y="275">7×7×64</tspan>
    </text>
    
    {/* Latent Space */}
    <rect x="500" y="200" width="100" height="100" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="550" y="235" textAnchor="middle" fontSize="14">Latent
        <tspan x="550" y="255">Space</tspan>
        <tspan x="550" y="275">7×7×64</tspan>
    </text>
    
    {/* Decoder Section */}
    {/* Deconv1 + Upsample */}
    <rect x="650" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="700" y="235" textAnchor="middle" fontSize="14">Deconv1
        <tspan x="700" y="255">3×3, 64</tspan>
        <tspan x="700" y="275">14×14×64</tspan>
    </text>
    
    {/* Deconv2 + Upsample */}
    <rect x="800" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="850" y="235" textAnchor="middle" fontSize="14">Deconv2
        <tspan x="850" y="255">3×3, 32</tspan>
        <tspan x="850" y="275">28×28×32</tspan>
    </text>
    
    {/* Output Layer */}
    <rect x="950" y="200" width="100" height="100" fill="#B2DFDB" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="1000" y="235" textAnchor="middle" fontSize="14">Output
        <tspan x="1000" y="255">28×28×1</tspan>
    </text>
    
    {/* Connections */}
    <path d="M 150 250 L 200 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 300 250 L 350 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 450 250 L 500 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 600 250 L 650 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 750 250 L 800 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 900 250 L 950 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    
    {/* Labels */}
    <text x="300" y="150" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2E7D32">Encoder</text>
    <text x="800" y="150" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2E7D32">Decoder</text>
    
    {/* Legend */}
    <rect x="50" y="380" width="250" height="100" fill="white" stroke="#2E7D32" strokeWidth="1" rx="4"/>
    <text x="60" y="400" fontSize="14" fontWeight="bold">Legend:</text>
    <rect x="60" y="410" width="15" height="15" fill="#81C784" stroke="#2E7D32" strokeWidth="1"/>
    <text x="85" y="422" fontSize="12">Encoder Conv + MaxPool</text>
    <rect x="60" y="435" width="15" height="15" fill="#81C784" stroke="#2E7D32" strokeWidth="1"/>
    <text x="85" y="447" fontSize="12">Decoder Deconv + Upsample</text>
    <rect x="60" y="460" width="15" height="15" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1"/>
    <text x="85" y="472" fontSize="12">Latent Space</text>
</svg>
      );
      
    case 'vae':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
    {/* Styles */}
    <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#2E7D32"/>
        </marker>
    </defs>
    
    {/* Input Layer */}
    <rect x="50" y="200" width="100" height="100" fill="#B2DFDB" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="100" y="235" textAnchor="middle" fontSize="14">Input
        <tspan x="100" y="255">28×28×1</tspan>
    </text>
    
    {/* Encoder Section */}
    {/* Conv1 + MaxPool */}
    <rect x="200" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="250" y="235" textAnchor="middle" fontSize="14">Conv1
        <tspan x="250" y="255">3×3, 32</tspan>
        <tspan x="250" y="275">14×14×32</tspan>
    </text>
    
    {/* Conv2 + MaxPool */}
    <rect x="350" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="400" y="235" textAnchor="middle" fontSize="14">Conv2
        <tspan x="400" y="255">3×3, 64</tspan>
        <tspan x="400" y="275">7×7×64</tspan>
    </text>
    
    {/* Mean Branch */}
    <rect x="500" y="150" width="100" height="80" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="550" y="185" textAnchor="middle" fontSize="14">μ
        <tspan x="550" y="205">FC 128</tspan>
    </text>
    
    {/* Variance Branch */}
    <rect x="500" y="270" width="100" height="80" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="550" y="305" textAnchor="middle" fontSize="14">σ
        <tspan x="550" y="325">FC 128</tspan>
    </text>
    
    {/* Reparameterization */}
    <rect x="650" y="200" width="100" height="100" fill="#4CAF50" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="700" y="235" textAnchor="middle" fontSize="14">z = μ + σ·ε
        <tspan x="700" y="255">ε ~ N(0,1)</tspan>
        <tspan x="700" y="275">128</tspan>
    </text>
    
    {/* Decoder Section */}
    {/* Dense Layer */}
    <rect x="800" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="850" y="235" textAnchor="middle" fontSize="14">Dense
        <tspan x="850" y="255">7×7×64</tspan>
    </text>
    
    {/* Deconv1 + Upsample */}
    <rect x="950" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="1000" y="235" textAnchor="middle" fontSize="14">Deconv1
        <tspan x="1000" y="255">3×3, 64</tspan>
        <tspan x="1000" y="275">14×14×64</tspan>
    </text>
    
    {/* Deconv2 + Upsample */}
    <rect x="1100" y="200" width="100" height="100" fill="#81C784" stroke="#2E7D32" strokeWidth="2" rx="4"/>
    <text x="1150" y="235" textAnchor="middle" fontSize="14">Deconv2
        <tspan x="1150" y="255">3×3, 32</tspan>
        <tspan x="1150" y="275">28×28×1</tspan>
    </text>
    
    {/* Connections */}
    <path d="M 150 250 L 200 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 300 250 L 350 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 450 250 L 500 190" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 450 250 L 500 310" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 600 190 L 650 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 600 310 L 650 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 750 250 L 800 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 900 250 L 950 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    <path d="M 1050 250 L 1100 250" stroke="#2E7D32" strokeWidth="2" markerEnd="url(#arrowhead)"/>
    
    {/* Labels */}
    <text x="400" y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2E7D32">Encoder</text>
    <text x="1000" y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#2E7D32">Decoder</text>
    
    {/* Legend */}
    <rect x="50" y="450" width="300" height="120" fill="white" stroke="#2E7D32" strokeWidth="1" rx="4"/>
    <text x="60" y="470" fontSize="14" fontWeight="bold">Legend:</text>
    <rect x="60" y="480" width="15" height="15" fill="#81C784" stroke="#2E7D32" strokeWidth="1"/>
    <text x="85" y="492" fontSize="12">Conv/Deconv Layer</text>
    <rect x="60" y="505" width="15" height="15" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1"/>
    <text x="85" y="517" fontSize="12">Latent Variables (μ, σ) & Sampling</text>
    <rect x="60" y="530" width="15" height="15" fill="#B2DFDB" stroke="#2E7D32" strokeWidth="1"/>
    <text x="85" y="542" fontSize="12">Input/Output Layer</text>
</svg>
      );
    
    default:
      return null;
  }
};

const ResultsChart = ({ data }) => {
  const chartData = [
    { metric: 'Accuracy', value: parseFloat(data.accuracy.replace('%', '')) },
    { metric: 'Precision', value: parseFloat(data.precision.replace('%', '')) },
    { metric: 'Recall', value: parseFloat(data.recall.replace('%', '')) },
    { metric: 'F1 Score', value: parseFloat(data.f1.replace('%', '')) },
  ];

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
  const chartData = [
    { metric: 'Accuracy', value: parseFloat(data.accuracy.replace('%', '')) },
    { metric: 'Precision', value: parseFloat(data.precision.replace('%', '')) },
    { metric: 'Recall', value: parseFloat(data.recall.replace('%', '')) },
    { metric: 'F1 Score', value: parseFloat(data.f1.replace('%', '')) },
  ];

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

const VAEResults = ({ data }) => {
  const chartData = [
    { metric: 'Accuracy', value: parseFloat(data.accuracy.replace('%', '')) },
    { metric: 'Precision', value: parseFloat(data.precision.replace('%', '')) },
    { metric: 'Recall', value: parseFloat(data.recall.replace('%', '')) },
    { metric: 'F1 Score', value: parseFloat(data.f1.replace('%', '')) },
  ];

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

const AnomalyResults = ({ data }) => {
  const chartData = [
    { metric: 'Accuracy', value: parseFloat(data.accuracy.replace('%', '')) },
    { metric: 'Precision', value: parseFloat(data.precision.replace('%', '')) },
    { metric: 'Recall', value: parseFloat(data.recall.replace('%', '')) },
    { metric: 'F1 Score', value: parseFloat(data.f1.replace('%', '')) },
  ];

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

export default ModelArchitecture;