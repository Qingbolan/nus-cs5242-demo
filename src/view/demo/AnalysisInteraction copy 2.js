import React, { useState, useRef, useEffect } from 'react';
import { 
  Send,
  Sparkles,
  AlertCircle,
  Upload as UploadIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import api from '../../api';  // 导入之前定义的 API
import { Upload, message } from 'antd';  // 使用 Antd 的上传组件和消息组件

const translations = {
  en: {
    title: "Analysis Interaction",
    modelControl: {
      title: "Model Control",
      supervised: "Supervised",
      unsupervised: "Unsupervised",
      models: {
        resnet: "ResNet50",
        alexnet: "AlexNet",
        vit: "ViT",
        autoencoder: "Autoencoder",
        vae: "VAE",
        anomaly: "Anomaly Detection"
      }
    },
    interaction: {
      inputPlaceholder: "Ask about the analysis or request a specific task...",
      suggestedTasks: "Suggested Tasks",
      taskHistory: "Task History"
    },
    analysis: {
      stage: "Current Stage",
      confidence: "Confidence",
      defects: "Defects Detected",
      severity: "Severity Level"
    },
    tasks: {
      detection: "Detect defects in region",
      count: "Count total defects",
      measure: "Measure defect size",
      compare: "Compare regions",
      analyze: "Analyze pattern"
    }
  },
  zh: {
    title: "分析交互",
    modelControl: {
      title: "模型控制",
      supervised: "监督学习",
      unsupervised: "无监督学习",
      models: {
        resnet: "ResNet50",
        alexnet: "AlexNet",
        vit: "ViT",
        autoencoder: "自编码器",
        vae: "变分自编码器",
        anomaly: "异常检测"
      }
    },
    interaction: {
      inputPlaceholder: "询问分析结果或请求特定任务...",
      suggestedTasks: "推荐任务",
      taskHistory: "任务历史"
    },
    analysis: {
      stage: "当前阶段",
      confidence: "置信度",
      defects: "检测到的缺陷",
      severity: "严重程度"
    },
    tasks: {
      detection: "检测区域缺陷",
      count: "统计总缺陷数",
      measure: "测量缺陷大小",
      compare: "比较区域",
      analyze: "分析模式"
    }
  }
};

// 模拟交互历史数据
const interactionHistory = [
  {
    task: "Region Analysis",
    result: "Detected 3 defects in region 2",
    timestamp: "2 min ago",
    confidence: 0.95
  },
  {
    task: "Pattern Recognition",
    result: "Identified linear crack pattern",
    timestamp: "5 min ago",
    confidence: 0.88
  }
];

const AnalysisInteraction = ({ lang = 'en' }) => {
  const [activeModel, setActiveModel] = useState('resnet');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  const chatEndRef = useRef(null);
  let responseIndex = 0;
  
  const t = translations[lang];

  // 文件上传配置
  const uploadProps = {
    name: 'files',
    multiple: true,
    accept: '.jpg,.jpeg,.png',
    showUploadList: true,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
      }
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('Image must be smaller than 10MB!');
      }
      return isImage && isLt10M;
    },
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        const response = await api.uploadAnalysisImages(
          chatHistory.length.toString(), // 使用当前消息数作为chat number
          [file]
        );
        onSuccess(response);
        // 将上传成功的文件URL添加到聊天记录
        setChatHistory(prev => [...prev, {
          type: 'user',
          text: 'uploaded_image:' + file.name,
          imageUrl: response.data.files[0].file_url
        }]);
      } catch (error) {
        console.error('Upload error:', error);
        onError(error);
        message.error(`${file.name} upload failed: ${error.message}`);
      }
    }
  };

  // 自动滚动到底部
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleAddingOfLastMessageAgentResponse = (newtoken) => {
  setChatHistory(prevHistory => {
    // 获取最后一条消息
    const lastMessage = prevHistory[prevHistory.length - 1];
    
    // 如果最后一条消息是assistant的消息
    if (lastMessage && lastMessage.type === 'assistant') {
      // 创建一个新的消息对象，而不是直接修改原对象
      const updatedMessage = {
        ...lastMessage,
        text: lastMessage.text + newtoken
      };
      
      // 返回新的历史记录，替换最后一条消息
      return [...prevHistory.slice(0, -1), updatedMessage];
    } else {
      // 如果最后一条不是assistant的消息，创建新的assistant消息
      const newAssistantMessage = {
        type: 'assistant',
        text: newtoken,
        timestamp: new Date().toISOString()
      };

      console.log(chatHistory)
      
      // 返回添加了新消息的历史记录
      return [...prevHistory, newAssistantMessage];
    }
  });
};

  // 处理消息发送
  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    setIsProcessing(true);
    const userMessage = {
      type: 'user',
      text: inputValue,
      timestamp: new Date().toISOString()
    };

    // 添加用户消息到历史记录
    setChatHistory(prev => [...prev, userMessage]);
    setInputValue('');

    // 准备系统响应占位
    const assistantMessage = {
      type: 'assistant',
      text: '',
      timestamp: new Date().toISOString()
    };
    setChatHistory(prev => [...prev, assistantMessage]);

    const history = chatHistory.map(msg => ({
      role: msg.type,
      content: msg.text
    }));

    // 发送请求
    await api.chatCompletion({
      input_text: userMessage.text,
      history: history,
      chat_number: chatHistory.length.toString(),
      attachment: chatHistory
        .filter(msg => msg.imageUrl)
        .map(msg => ({
          file_url: msg.imageUrl,
          type: 'image'
        })),
      onProgress: (data) => {
        if (data.status === 'processing' && data.chunk) {
          // 更新最后一条消息的内容
          console.log(data.text_index , responseIndex)
          if (data.text_index > responseIndex) {
            handleAddingOfLastMessageAgentResponse(data.chunk);
            responseIndex = data.text_index;
          }
        }
        if (data.status === 'completed') {
          responseIndex = 0;
        }
      }
    });
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="flex flex-col space-y-6">
          {/* Main Interaction Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Model Control and Region Selection */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Model Selection */}
                <div className="border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold">{t.modelControl.title}</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <div className="font-medium text-sm text-gray-600">
                        {t.modelControl.supervised}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {['resnet', 'alexnet', 'vit'].map(model => (
                          <button
                            key={model}
                            className={`p-2 border text-left ${
                              activeModel === model 
                                ? 'border-black bg-black text-white' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveModel(model)}
                          >
                            {t.modelControl.models[model]}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-sm text-gray-600">
                        {t.modelControl.unsupervised}
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {['autoencoder', 'vae', 'anomaly'].map(model => (
                          <button
                            key={model}
                            className={`p-2 border text-left ${
                              activeModel === model 
                                ? 'border-black bg-black text-white' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setActiveModel(model)}
                          >
                            {t.modelControl.models[model]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Component */}
                <div className="border border-gray-200 p-4">
                  <Upload {...uploadProps}>
                    <button className="w-full p-2 border border-gray-200 hover:border-gray-300 flex items-center justify-center">
                      <UploadIcon className="w-5 h-5 mr-2" />
                      Upload Images
                    </button>
                  </Upload>
                </div>

                {/* Analysis Statistics */}
                <div className="border border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="font-bold">{t.analysis.stage}</h2>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span>{t.analysis.confidence}</span>
                      <span className="text-green-600">95%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t.analysis.defects}</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t.analysis.severity}</span>
                      <span className="text-yellow-600">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: Main Interaction */}
            <div className="lg:col-span-2 border border-gray-200">
              <div className="h-[700px] flex flex-col">
                {/* Interaction Header */}
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-bold">{t.title}</h2>
                </div>

                {/* Chat/Results Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <div className={`max-w-[80%] p-3 rounded ${
                        message.type === 'user' 
                          ? 'bg-black text-white' 
                          : message.isError 
                            ? 'bg-red-100'
                            : 'bg-gray-100'
                      }`}>
                        {message.imageUrl ? (
                          <div>
                            <p>{message.text}</p>
                            <img 
                              src={message.imageUrl} 
                              alt="Uploaded" 
                              className="mt-2 max-w-full rounded"
                            />
                          </div>
                        ) : (
                          <ReactMarkdown>{message.text}</ReactMarkdown>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Suggested Tasks */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex space-x-2 overflow-x-auto">
                    {Object.values(t.tasks).map((task, index) => (
                      <button
                        key={index}
                        className="px-3 py-1.5 border border-gray-200 bg-white hover:bg-gray-50 whitespace-nowrap flex items-center"
                        onClick={() => setInputValue(task)}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        {task}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-200 outline-none"
                      placeholder={t.interaction.inputPlaceholder}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      disabled={isProcessing}
                    />
                    <button
                      className={`px-4 py-2 bg-black text-white transition ${
                        isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                      }`}
                      onClick={handleSendMessage}
                      disabled={isProcessing}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task History */}
          <div className="border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold">{t.interaction.taskHistory}</h2>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {interactionHistory.map((item, index) => (
                  <div key={index} className="border border-gray-200 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{item.task}</span>
                      <span className="text-sm text-gray-500">{item.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.result}</p>
                    <div className="flex items-center text-sm">
                      <AlertCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span>{(item.confidence * 100).toFixed(1)}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisInteraction;