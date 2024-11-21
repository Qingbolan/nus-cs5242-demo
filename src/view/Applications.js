import React, { useState } from 'react';
import { 
  Building2, Microscope, ChevronRight, 
  Factory, Leaf, Camera, Video,
  Plus
} from 'lucide-react';

const ExamplesPage = () => {
  const [activeTab, setActiveTab] = useState("medical");

  const applications = [
    {
      id: "medical",
      title: "Medical Imaging Analysis",
      icon: <Microscope className="w-6 h-6" />,
      accuracy: "88.94%",
      model: "AlexNet on ChestMNIST",
      description: "Deep learning-based medical image analysis and diagnosis assistance",
      features: [
        "Chest X-ray abnormality detection",
        "Lesion area localization",
        "Multi-modal medical imaging",
        "AI-assisted diagnostic reporting"
      ],
      metrics: [
        { label: "Detection Accuracy", value: "88.94%" },
        { label: "Dataset Size", value: "245 MB" },
        { label: "Architecture", value: "AlexNet" },
        { label: "Inference Time", value: "0.5s" }
      ]
    },
    {
      id: "construction",
      title: "Structural Analysis",
      icon: <Building2 className="w-6 h-6" />,
      accuracy: "100%",
      model: "ResNet50",
      description: "Automated structural inspection and maintenance analysis",
      features: [
        "Crack detection & measurement",
        "Structural damage assessment",
        "3D structure reconstruction",
        "Predictive maintenance"
      ],
      metrics: [
        { label: "Detection Accuracy", value: "100%" },
        { label: "Dataset Size", value: "315 MB" },
        { label: "Feature Extractor", value: "ResNet50" },
        { label: "Real-time Performance", value: "30fps" }
      ]
    },
    {
      id: "extensibility",
      title: "Framework Extensibility",
      icon: <Plus className="w-6 h-6" />,
      description: "Extensible architecture supporting diverse domain applications",
      categories: [
        {
          icon: <Factory className="w-8 h-8" />,
          title: "Industrial Inspection",
          examples: ["Defect Detection", "Assembly Line Monitoring", "Component Analysis"]
        },
        {
          icon: <Leaf className="w-8 h-8" />,
          title: "Agricultural Monitoring",
          examples: ["Crop Growth Analysis", "Disease Detection", "Field Monitoring"]
        },
        {
          icon: <Video className="w-8 h-8" />,
          title: "Video Analytics",
          examples: ["Behavior Recognition", "Object Tracking", "Scene Understanding"]
        },
        {
          icon: <Camera className="w-8 h-8" />,
          title: "Visual Inspection",
          examples: ["Quality Control", "Dimensional Analysis", "Surface Inspection"]
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-3xl font-light tracking-tight">VisionaryLLM Applications</h1>
          <span className="px-2 py-1 text-sm border border-black">
            v1.0.0
          </span>
        </div>
        <p className="text-gray-600 font-light tracking-wide">
          Exploring practical applications and extensibility of the VisionaryLLM framework
        </p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-3 border border-black">
          {applications.map(app => (
            <button
              key={app.id}
              onClick={() => setActiveTab(app.id)}
              className={`flex items-center justify-center gap-2 py-3 px-4 font-light border-r last:border-r-0 ${
                activeTab === app.id ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              {app.icon}
              <span>{app.title}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {applications.slice(0, 2).map((app) => (
          <div
            key={app.id}
            className={`border border-black ${activeTab === app.id ? 'block' : 'hidden'}`}
          >
            <div className="border-b border-black p-6">
              <div className="flex items-center gap-3 mb-2">
                {app.icon}
                <div>
                  <h2 className="text-2xl font-light">{app.title}</h2>
                  <p className="text-gray-600 font-light">{app.description}</p>
                </div>
                <span className="ml-auto bg-black text-white px-2 py-1 font-mono text-sm">
                  Accuracy: {app.accuracy}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-black">
                  <div className="border-b border-black p-4">
                    <h3 className="text-lg font-light">Core Features</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2">
                      {app.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 font-light">
                          <ChevronRight className="w-4 h-4" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border border-black">
                  <div className="border-b border-black p-4">
                    <h3 className="text-lg font-light">Performance Metrics</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid gap-4">
                      {app.metrics.map((metric, index) => (
                        <div key={index} className="flex justify-between items-center font-light">
                          <span className="text-gray-600">{metric.label}</span>
                          <span className="font-mono">{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-black">
                  <div className="border-b border-black p-4">
                    <h3 className="text-lg font-light">Analysis Results</h3>
                  </div>
                  <div className="p-6">
                    <div className="aspect-video bg-gray-50 border border-black">
                      <img 
                        src="/examples/tumbor=Analysis visualization.jpg" 
                        alt="Analysis visualization"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="border border-black">
                  <div className="border-b border-black p-4">
                    <h3 className="text-lg font-light">Heatmap Visualization</h3>
                  </div>
                  <div className="p-6">
                    <div className="aspect-video bg-gray-50 border border-black">
                      <img 
                        src="/examples/tumbor.png" 
                        alt="Heatmap visualization"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className={`${activeTab === 'extensibility' ? 'block' : 'hidden'}`}>
          <div className="grid gap-6 md:grid-cols-2">
            {applications[2].categories.map((category, index) => (
              <div key={index} className="border border-black">
                <div className="border-b border-black p-4">
                  <div className="flex items-center gap-4">
                    {category.icon}
                    <h3 className="text-lg font-light">{category.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {category.examples.map((example, idx) => (
                      <li key={idx} className="flex items-center gap-2 font-light">
                        <ChevronRight className="w-4 h-4" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;