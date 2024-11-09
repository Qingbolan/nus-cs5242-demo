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
        <svg viewBox="0 0 800 200" className="w-full h-32">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
          </defs>
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
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
          </defs>
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
    
    case 'vitAnomaly':
      return (
        <svg viewBox="0 0 800 200" className="w-full h-32">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
              refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
            </marker>
          </defs>
          <rect x="50" y="60" width="150" height="80" fill="#dbeafe" stroke="#3b82f6" />
          <text x="125" y="100" textAnchor="middle" className="text-sm">ViT Backbone</text>
          
          <rect x="220" y="60" width="150" height="80" fill="#dbeafe" stroke="#3b82f6" />
          <text x="295" y="100" textAnchor="middle" className="text-sm">Anomaly Detector</text>
          
          <rect x="390" y="60" width="150" height="80" fill="#dbeafe" stroke="#3b82f6" />
          <text x="465" y="100" textAnchor="middle" className="text-sm">Output Layer</text>
          
          <path d="M 200 100 H 220" stroke="#666" markerEnd="url(#arrowhead)" />
          <path d="M 370 100 H 390" stroke="#666" markerEnd="url(#arrowhead)" />
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