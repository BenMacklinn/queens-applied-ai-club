import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './AnimatedChart.css';

function AnimatedChart() {
  const chartRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !pathRef.current) return;

    let points = [];
    let baseValue = 0; // Starting value that continuously increases
    let minVisibleValue = 0; // Minimum visible value for auto-scaling
    let maxVisibleValue = 100; // Maximum visible value
    
    // Initialize with upward trending line with occasional spikes and dips - battling upward
    for (let x = 0; x <= 100; x += 0.5) {
      // Base growth
      baseValue += 0.8 + Math.random() * 0.4;
      
      // Fewer but bigger spikes and dips - battling upward
      let variation = 0;
      const rand = Math.random();
      const spikeChance = 0.04; // 4% chance of spike (fewer)
      const dipChance = 0.05; // 5% chance of dip (fewer)
      
      if (rand < spikeChance) {
        // Bigger spike (sharp up) - fighting back up
        variation = 8 + Math.random() * 10; // Bigger upward spike
      } else if (rand < spikeChance + dipChance) {
        // Bigger dip (sharp down) - getting pushed down
        variation = -(8 + Math.random() * 12); // Bigger downward dip
      } else {
        // Smooth normal variation (less small movements)
        variation = (Math.random() * 2 - 1) * 1.0; // Smaller normal movement
      }
      
      const value = baseValue + variation;
      points.push({ x, y: 0, value }); // y will be calculated in autoScale
    }

    // Auto-scale function with very smooth transitions to prevent visible resets
    let targetMinVisible = 0;
    let targetMaxVisible = 100;
    let baseValueAnchor = 0; // Track the base value to maintain continuity
    
    const autoScale = () => {
      if (points.length === 0) return;
      
      // Use only visible points for scaling (in viewport)
      const visiblePoints = points.filter(p => p.x >= 0 && p.x <= 100);
      if (visiblePoints.length === 0) return;
      
      const values = visiblePoints.map(p => p.value);
      const currentMin = Math.min(...values);
      const currentMax = Math.max(...values);
      
      // Calculate target range - keep larger range for stability
      const range = Math.max(90, currentMax - currentMin); // Larger minimum range for stability
      const newTargetMin = currentMax - range; // Focus on top of range
      const newTargetMax = currentMax + (range * 0.1); // Smaller padding at top
      
      // Very smooth interpolation (much slower) to prevent visible resets
      const interpolationSpeed = 0.01; // Very slow adjustment
      targetMinVisible += (newTargetMin - targetMinVisible) * interpolationSpeed;
      targetMaxVisible += (newTargetMax - targetMaxVisible) * interpolationSpeed;
      
      minVisibleValue = targetMinVisible;
      maxVisibleValue = targetMaxVisible;
      
      // Convert actual values to screen Y coordinates (inverted: high values = low Y = top)
      points.forEach(p => {
        const visibleRange = maxVisibleValue - minVisibleValue || 1;
        p.y = 100 - ((p.value - minVisibleValue) / visibleRange) * 90; // Map to 5-95 range
        p.y = Math.max(5, Math.min(95, p.y)); // Clamp
      });
    };

    // Smooth path generation - simple lines for better performance
    const createSmoothPath = (points) => {
      if (points.length < 2) return '';
      
      // Filter to only visible points (in viewBox range)
      const visiblePoints = points.filter(p => p.x >= -5 && p.x <= 105);
      if (visiblePoints.length < 2) return '';
      
      // Build path with lines (SVG stroke-linejoin will smooth corners)
      let pathData = `M ${visiblePoints[0].x} ${visiblePoints[0].y}`;
      for (let i = 1; i < visiblePoints.length; i++) {
        pathData += ` L ${visiblePoints[i].x} ${visiblePoints[i].y}`;
      }
      
      return pathData;
    };

    // Create initial path
    const updatePath = () => {
      autoScale(); // Auto-scale before updating path
      
      // Filter to visible points
      const visiblePoints = points.filter(p => p.x >= -5 && p.x <= 105);
      if (visiblePoints.length < 2) return;
      
      // Use smooth bezier curves instead of straight lines
      const pathData = createSmoothPath(points);
      if (pathData) {
        pathRef.current.setAttribute('d', pathData);

        // Create area path (fill under the line)
        const lastPoint = visiblePoints[visiblePoints.length - 1];
        const firstPoint = visiblePoints[0];
        const areaPath = `${pathData} L ${lastPoint.x} 100 L ${Math.max(0, firstPoint.x)} 100 Z`;
        const areaElement = chartRef.current.querySelector('.chart-area');
        if (areaElement) {
          areaElement.setAttribute('d', areaPath);
        }
      }
    };

    updatePath();

    // Continuous upward scrolling animation with smooth frame rate
    let animationFrame;
    let lastTime = performance.now();
    const scrollSpeed = 15; // pixels per second - smooth speed
    let accumulatedX = 0; // Track sub-pixel movement for smoothness

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // Use fixed timestep for smoother animation
      const fixedDelta = Math.min(deltaTime, 0.033); // Cap at 30fps minimum
      
      // Shift all points left with smooth sub-pixel precision
      const shiftAmount = scrollSpeed * fixedDelta * (100 / 1000); // Scale to viewBox
      accumulatedX += shiftAmount;
      
      // Always shift smoothly, even for small amounts
      const shift = scrollSpeed * fixedDelta * (100 / 1000);
      accumulatedX += shift;
      
      // Shift points continuously for smooth scrolling
      if (accumulatedX >= 0.02) {
        const shiftAmount = accumulatedX;
        accumulatedX = 0;
        
        points.forEach(p => {
          p.x -= shiftAmount;
        });

        // Remove points that have scrolled off the left (with buffer)
        // Keep points slightly off-screen to prevent visible gaps
        points = points.filter(p => p.x >= -20);

        // Add new points on the right continuously - prevent gaps and resets
        while (points.length === 0 || points[points.length - 1].x < 110) {
          const lastValue = points.length > 0 ? points[points.length - 1].value : baseValue;
          const lastX = points.length > 0 ? points[points.length - 1].x : 0;
          
          // Ensure continuous base value growth (no sudden jumps)
          if (points.length === 0) {
            baseValue = lastValue || 0;
          } else {
            // Continuous growth - always increase from last value
            baseValue = Math.max(baseValue, lastValue) + (0.8 + Math.random() * 0.4);
          }
          
          // Fewer but bigger spikes and dips - battling upward
          let variation = 0;
          const rand = Math.random();
          const spikeChance = 0.04; // 4% chance of spike (fewer)
          const dipChance = 0.05; // 5% chance of dip (fewer)
          
          if (rand < spikeChance) {
            // Bigger spike (sharp up) - fighting back up
            variation = 8 + Math.random() * 10; // Bigger upward spike
          } else if (rand < spikeChance + dipChance) {
            // Bigger dip (sharp down) - getting pushed down
            variation = -(8 + Math.random() * 12); // Bigger downward dip
          } else {
            // Smooth normal variation (less small movements)
            variation = (Math.random() * 2 - 1) * 1.0; // Smaller normal movement
          }
          
          // Ensure continuous x coordinates
          const nextX = points.length > 0 ? points[points.length - 1].x + 0.5 : 100;
          const value = baseValue + variation;
          
          points.push({ 
            x: nextX, 
            y: 0, // Temporary, will be calculated in autoScale
            value: value 
          });
        }
        
        // Keep buffer of points before visible range to prevent resets
        const minX = points.length > 0 ? Math.min(...points.map(p => p.x)) : 0;
        if (minX > -15 && points.length > 0) {
          // Add a couple points before visible range to maintain smooth transition
          const firstPoint = points[0];
          const secondPoint = points[1] || firstPoint;
          const xDiff = secondPoint.x - firstPoint.x;
          const valueDiff = secondPoint.value - firstPoint.value;
          
          // Add point before the first point
          const x = firstPoint.x - 0.5;
          const value = firstPoint.value - (valueDiff * 0.5);
          points.unshift({ x, y: 0, value });
        }
      }

      // Always update path for smooth rendering
      updatePath();
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="animated-chart-container" ref={chartRef}>
      <div className="chart-box">
        <svg className="chart-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(196, 139, 212, 0.9)" />
              <stop offset="50%" stopColor="rgba(118, 167, 228, 0.9)" />
              <stop offset="100%" stopColor="rgba(99, 180, 235, 0.9)" />
            </linearGradient>
            <linearGradient id="chartAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(196, 139, 212, 0.2)" />
              <stop offset="100%" stopColor="rgba(99, 180, 235, 0.05)" />
            </linearGradient>
          </defs>
          <path 
            ref={pathRef}
            className="chart-line"
            fill="none"
            stroke="url(#chartLineGradient)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            className="chart-area"
            fill="url(#chartAreaGradient)"
            opacity="0.3"
          />
        </svg>
        <div className="chart-grid-lines">
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
        </div>
        <div className="chart-axis-labels">
          <div className="y-axis-label">Growth</div>
          <div className="x-axis-label">Time</div>
        </div>
        <div className="chart-title">QVibe</div>
      </div>
    </div>
  );
}

export default AnimatedChart;

