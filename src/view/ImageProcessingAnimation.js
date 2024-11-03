// src/components/ImageProcessingAnimation.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ImageProcessingAnimation.css'; // 导入相关样式

const ImageProcessingAnimation = () => {
  const [step, setStep] = useState(1); // 当前动画步骤
  const [classificationResults, setClassificationResults] = useState(Array(9).fill(null));

  // 模拟分类过程
  useEffect(() => {
    if (step === 2) {
      // 模拟每个部分的分类延迟
      classificationResults.forEach((_, index) => {
        setTimeout(() => {
          setClassificationResults(prev => {
            const newResults = [...prev];
            newResults[index] = Math.random() > 0.5 ? 1 : 0; // 随机生成分类结果（1或0）
            return newResults;
          });
        }, index * 500); // 每个部分的分类间隔0.5秒
      });
      // 设置下一步的延迟
      setTimeout(() => {
        setStep(3);
      }, 500 * 9 + 1000); // 分类完成后1秒进入下一步
    }

    if (step === 3) {
      // 模拟LLM分析延迟
      setTimeout(() => {
        setStep(4);
      }, 2000); // 2秒后进入最终标注
    }
  }, [step]);

  return (
    <div className="animation-container">
      {/* 步骤指示 */}
      <div className="step-indicator">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. 切分图像</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. 模型分类</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. 生成地图</div>
        <div className={`step ${step >= 4 ? 'active' : ''}`}>4. LLM分析与标注</div>
      </div>

      {/* 图像切分和分类 */}
      <div className="image-grid">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.div
            key={index}
            className="grid-item"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: step >= 1 ? 1 : 0,
              scale: step >= 1 ? 1 : 0.8,
              transition: { delay: 0.3 + index * 0.1 }
            }}
          >
            <img src={`https://picsum.photos/200/200?random=${index + 1}`} alt={`Part ${index + 1}`} />
            {/* 分类结果覆盖 */}
            {step >= 2 && classificationResults[index] !== null && (
              <motion.div
                className={`classification-overlay ${classificationResults[index] === 1 ? 'positive' : 'negative'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {classificationResults[index] === 1 ? '✔️' : '❌'}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* 二元二维地图 */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            className="binary-map"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h3>分类二元地图</h3>
            <div className="map-grid">
              {classificationResults.map((result, index) => (
                <div
                  key={index}
                  className={`map-cell ${result === 1 ? 'map-positive' : 'map-negative'}`}
                ></div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LLM分析与标注 */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.div
            className="llm-analysis"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <h3>LLM分析与标注</h3>
            <p>
              根据分类结果，系统检测到以下区域存在潜在问题：
              <ul>
                {classificationResults.map((result, index) => result === 1 && <li key={index}>区域 {index + 1}</li>)}
              </ul>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 控制步骤的按钮（用于测试） */}
      <div className="controls">
        {step < 4 && (
          <button onClick={() => setStep(prev => prev + 1)}>下一步</button>
        )}
      </div>
    </div>
  );
};

export default ImageProcessingAnimation;
