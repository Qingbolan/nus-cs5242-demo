import axios from 'axios';

const baseURL = 'http://localhost:5100';
// const baseURL = 'https://cs5242-demo.silan.tech/api';

const axiosInstance = axios.create({
  baseURL,
  timeout: 500000,
});

const api = {
  chatCompletion: async (params) => {
    try {
      // 创建 FormData 对象
      const formData = new FormData();
      formData.append('input_text', params.input_text);
      formData.append('history', JSON.stringify(params.history || []));
      formData.append('attachment', JSON.stringify(params.attachment || []));
  
      const response = await axiosInstance.post('/chat/completion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'text',
        onDownloadProgress: (progressEvent) => {
          // console.log(progressEvent.event.currentTarget.responseText);
          const data = progressEvent.event.currentTarget.responseText;
  
          // 将响应按 '\n\n' 分割成单个 SSE 消息
          const messages = data.split('\n\n').filter(Boolean);

          console.log('messages', messages);
  
          messages.forEach((message) => {
            if (message.startsWith('data: ')) {
              const jsonStr = message.slice(6).trim();
              try {
                const parsed = JSON.parse(jsonStr);
  
                // 如果存在 onProgress 回调并且解析的结果包含 chunk，则更新聊天历史记录
                if (params.onProgress && typeof params.onProgress === 'function' && parsed.chunk) {
                  console.log('Parsed:', parsed);
                  params.onProgress(parsed);
                }
              } catch (e) {
                console.error('Error parsing SSE message:', e, 'Raw message:', message);
              }
            }
          });
        },
      });
  
      console.log('Chat completion response:', response);
  
      return response;
    } catch (error) {
      console.error('Chat completion error:', error);
      return Promise.reject(error);
    }
  },
  

  uploadAnalysisImages: async (chatNumber, files) => {
    try {
      const formData = new FormData();
      
      // Append chat number to formData
      formData.append('chat_num', chatNumber || 'temp');
      
      // Append files to formData
      files.forEach(file => {
        if (file instanceof File) {
          formData.append('files', file);
        } else if (file.originFileObj) {
          // Handle Ant Design Upload component file objects
          formData.append('files', file.originFileObj);
        } else {
          console.error('Invalid file object:', file);
        }
      });

      // Debug logging
      console.log('Uploading files:');
      files.forEach(file => {
        console.log('-------------------------');
        console.log('File name:', file.name);
        console.log('File type:', file.type);
        console.log('File size:', file.size, 'bytes');
        console.log('-------------------------');
      });

      const response = await axiosInstance.post('/chat/api/upload/ChatFiles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading files:', error);
      return Promise.reject(error);
    }
  },
};

export default api;