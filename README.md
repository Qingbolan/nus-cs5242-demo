# VisionaryLLM Demo Frontend

> Interactive web interface for the VisionaryLLM framework, demonstrating domain-specific visual analysis with LLM integration.

🌐 Live Demo: [https://cs5242-demo.silan.tech](https://cs5242-demo.silan.tech)  
🔗 Backend Repository: [Vision-LLM-Integration](https://github.com/Qingbolan/Vision-LLM-Integration)

## Project Overview

This repository contains the frontend implementation for VisionaryLLM, providing an intuitive interface for:
- Interactive visual analysis of images
- Real-time LLM-powered analysis and explanations
- Model performance visualization
- Cross-domain application demonstrations

## Project Structure

```
src/
├── api/                    # API integration
│   └── index.js           # API endpoint configurations
├── components/            # Reusable UI components
│   ├── ImagePipeline.jsx  # Image processing visualization
│   ├── ImagePipeline.css  # Pipeline styling
│   └── NavBar.js         # Navigation component
├── view/                  # Page views
│   ├── Applications.js    # Use cases showcase
│   ├── Documentation.js   # Framework documentation
│   ├── framework.js       # Architecture explanation
│   ├── homepage.js        # Landing page
│   ├── model.js          # Model descriptions
│   └── demo/             # Interactive demonstrations
│       ├── AnalysisInteraction.js    # Analysis interface
│       ├── chat.js                   # LLM interaction
│       └── DatasetModelInterface.js   # Dataset visualization
└── App.js                # Root component
```

## Features

### 1. Interactive Analysis Interface
- Drag-and-drop image upload
- Real-time visual analysis
- Interactive result visualization
- Grad-CAM heatmap display

### 2. LLM Integration
- Natural language interaction with models
- Contextual analysis explanations
- Domain-specific insights
- Query-based exploration

### 3. Model Visualization
- Performance metrics display
- Training process animation
- Architecture visualization
- Result interpretation

## Getting Started

### Prerequisites
- Node.js (v14.0 or higher)
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/YourUsername/visionaryllm-frontend.git
cd visionaryllm-frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### Configuration

Create `.env` file with the following variables:
```plaintext
REACT_APP_API_URL=http://localhost:5100
REACT_APP_BACKEND_URL=your_backend_url
```

### Development

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Usage

### Image Analysis
```javascript
// Example: Using the ImagePipeline component
import { ImagePipeline } from './components/ImagePipeline';

const MyComponent = () => {
  const handleAnalysis = async (imageData) => {
    const results = await analyzeImage(imageData);
    // Handle results
  };

  return (
    <ImagePipeline
      onAnalysis={handleAnalysis}
      modelType="crack-detection"
    />
  );
};
```

### LLM Integration
```javascript
// Example: Using the AnalysisInteraction component
import { AnalysisInteraction } from './view/demo/AnalysisInteraction';

const Demo = () => {
  return (
    <AnalysisInteraction
      onQuery={handleQuery}
      onResultUpdate={handleUpdate}
    />
  );
};
```

## API Integration

The frontend communicates with the backend through RESTful APIs:

```javascript
// api/index.js
export const analyzeImage = async (image) => {
  const response = await fetch(`${API_URL}/analyze`, {
    method: 'POST',
    body: formData
  });
  return response.json();
};
```

## Deployment

```bash
# Build production version
npm run build

# Deploy to server
npm run deploy
```

For detailed deployment instructions, see [Deployment Guide](docs/deployment.md).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Team

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Qingbolan">
        <img src="https://github.com/Qingbolan.png" width="100px;" alt=""/>
        <br /><sub><b>HU SILAN</b></sub>
      </a>
      <br />
      <a href="mailto:e1373455@u.nus.edu">📧</a>
    </td>
  </tr>
</table>


## Related Projects

- [VisionaryLLM Backend](https://github.com/Qingbolan/Vision-LLM-Integration)
- [Project Documentation](https://cs5242-demo.silan.tech/documentation)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
