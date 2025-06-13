import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
  width?: string;
  color?: string;
  animated?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
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
    
    // Set colors based on theme
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const textColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)';
    
    // Chart dimensions
    const chartWidth = rect.width;
    const chartHeight = height;
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const graphWidth = chartWidth - padding.left - padding.right;
    const graphHeight = chartHeight - padding.top - padding.bottom;
    
    // Find max value
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1; // Add 10% padding
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
      const value = maxValue - (maxValue * i) / numGridLines;
      ctx.fillStyle = textColor;
      ctx.font = '10px Arial';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(value.toFixed(1), padding.left - 5, y);
    }
    
    // Draw bars
    const barWidth = graphWidth / data.length * 0.6;
    const barSpacing = graphWidth / data.length;
    
    // Animation variables
    let animationProgress = 0;
    const animationDuration = 1000; // milliseconds
    const startTime = performance.now();
    
    function drawBars(progress = 1) {
      data.forEach((point, i) => {
        const normalizedValue = point.value / maxValue;
        const barHeight = normalizedValue * graphHeight * progress;
        
        const x = padding.left + i * barSpacing + (barSpacing - barWidth) / 2;
        const y = chartHeight - padding.bottom - barHeight;
        
        // Bar gradient
        const gradient = ctx.createLinearGradient(x, y, x, chartHeight - padding.bottom);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, theme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.rect(x, y, barWidth, barHeight);
        ctx.fill();
        
        // Bar border
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        // X-axis labels
        ctx.fillStyle = textColor;
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(point.label, x + barWidth / 2, chartHeight - padding.bottom + 5);
        
        // Value labels
        if (progress === 1) {
          ctx.fillStyle = textColor;
          ctx.font = 'bold 10px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          ctx.fillText(
            point.value.toString(),
            x + barWidth / 2,
            y - 5
          );
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
        
        drawBars(animationProgress);
        
        if (animationProgress < 1) {
          requestAnimationFrame(animate);
        }
      }
      
      requestAnimationFrame(animate);
    } else {
      drawBars();
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

export default BarChart;