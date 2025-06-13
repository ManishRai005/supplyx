import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
  width?: string;
  color?: string;
  animated?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  height = 200,
  width = '100%',
  color = 'var(--color-primary)',
  animated = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    if (!canvasRef.current || !data.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    
    // Reset canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set colors based on theme
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
    
    // Chart dimensions
    const chartWidth = rect.width;
    const chartHeight = height;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const graphWidth = chartWidth - padding.left - padding.right;
    const graphHeight = chartHeight - padding.top - padding.bottom;
    
    // Find min and max values
    const values = data.map(d => d.value);
    const maxValue = Math.max(...values) * 1.1; // Add 10% padding
    const minValue = Math.min(0, ...values);
    
    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 0.5;
    
    // Horizontal grid lines
    const numGridLines = 5;
    for (let i = 0; i <= numGridLines; i++) {
      const y = padding.top + (graphHeight * i) / numGridLines;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(chartWidth - padding.right, y);
      ctx.stroke();
      
      // Y-axis labels
      const value = maxValue - ((maxValue - minValue) * i) / numGridLines;
      ctx.fillStyle = textColor;
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toFixed(1), padding.left - 5, y);
    }
    
    // Draw x-axis labels
    ctx.fillStyle = textColor;
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    data.forEach((point, i) => {
      const x = padding.left + (graphWidth * i) / (data.length - 1);
      ctx.fillText(point.label, x, chartHeight - padding.bottom + 5);
    });
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    // Animation variables for progressive drawing
    let animationProgress = 0;
    const animationDuration = 1000; // milliseconds
    const startTime = performance.now();
    
    function drawLine(progress = 1) {
      ctx.beginPath();
      
      data.forEach((point, i) => {
        const x = padding.left + (graphWidth * i) / (data.length - 1);
        const normalizedValue = (point.value - minValue) / (maxValue - minValue);
        const y = chartHeight - padding.bottom - normalizedValue * graphHeight;
        
        // Only draw up to the current animation progress
        if (i / (data.length - 1) <= progress) {
          if (i === 0 || (i > 0 && i / (data.length - 1) > progress - (1 / (data.length - 1)))) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      
      ctx.stroke();
      
      // Draw points
      data.forEach((point, i) => {
        if (i / (data.length - 1) <= progress) {
          const x = padding.left + (graphWidth * i) / (data.length - 1);
          const normalizedValue = (point.value - minValue) / (maxValue - minValue);
          const y = chartHeight - padding.bottom - normalizedValue * graphHeight;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
          
          // Highlight effect
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'white';
          ctx.fill();
        }
      });
    }
    
    if (animated) {
      function animate(timestamp: number) {
        const elapsed = timestamp - startTime;
        animationProgress = Math.min(elapsed / animationDuration, 1);
        
        // Clear only the graph area, not the axes
        ctx.clearRect(
          padding.left,
          padding.top,
          graphWidth,
          graphHeight
        );
        
        drawLine(animationProgress);
        
        if (animationProgress < 1) {
          requestAnimationFrame(animate);
        }
      }
      
      requestAnimationFrame(animate);
    } else {
      drawLine();
    }
    
    // Add title if provided
    if (title) {
      ctx.fillStyle = textColor;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(title, chartWidth / 2, 5);
    }
  }, [data, height, color, theme, animated]);
  
  return (
    <div style={{ width, height: height + 'px' }}>
      <canvas 
        ref={canvasRef} 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LineChart;