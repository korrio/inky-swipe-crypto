'use client';

import React, { useState, useMemo, useRef } from 'react';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Volume2, SkipForward, ShoppingCart } from 'lucide-react';
import AddToHomeButton from './AddToHomeButton';
import MobileDebugger from './MobileDebugger';
import DonutChart from './DonutChart';

// Mock data for stocks and crypto
const mockAssets = [
  { id: 1, name: 'Bitcoin', symbol: 'BTC', price: 42500, change: 2.5, type: 'crypto', marketCap: '831.2B', volume: '15.2B' },
  { id: 2, name: 'Apple Inc.', symbol: 'AAPL', price: 185.2, change: -1.2, type: 'stock', marketCap: '2.8T', volume: '58.2M' },
  { id: 3, name: 'Ethereum', symbol: 'ETH', price: 2650, change: 3.8, type: 'crypto', marketCap: '318.9B', volume: '8.7B' },
  { id: 4, name: 'Tesla Inc.', symbol: 'TSLA', price: 245.6, change: 5.2, type: 'stock', marketCap: '782.1B', volume: '102.8M' },
  { id: 5, name: 'Dogecoin', symbol: 'DOGE', price: 0.08, change: 12.5, type: 'meme', marketCap: '11.2B', volume: '1.1B' },
  { id: 6, name: 'NVIDIA Corp.', symbol: 'NVDA', price: 512.3, change: 2.1, type: 'stock', marketCap: '1.3T', volume: '45.7M' },
  { id: 7, name: 'Shiba Inu', symbol: 'SHIB', price: 0.00001, change: -8.3, type: 'meme', marketCap: '5.9B', volume: '456M' },
  { id: 8, name: 'Amazon.com', symbol: 'AMZN', price: 138.7, change: 1.8, type: 'stock', marketCap: '1.4T', volume: '42.3M' },
  { id: 9, name: 'Solana', symbol: 'SOL', price: 68.4, change: 7.2, type: 'crypto', marketCap: '30.1B', volume: '2.1B' },
  { id: 10, name: 'Microsoft Corp.', symbol: 'MSFT', price: 384.2, change: 0.8, type: 'stock', marketCap: '2.9T', volume: '28.5M' },
  { id: 11, name: 'Pepe', symbol: 'PEPE', price: 0.0000008, change: 25.7, type: 'meme', marketCap: '340M', volume: '89M' },
  { id: 12, name: 'Google', symbol: 'GOOGL', price: 139.8, change: -0.5, type: 'stock', marketCap: '1.8T', volume: '22.7M' },
  { id: 13, name: 'Cardano', symbol: 'ADA', price: 0.48, change: 4.3, type: 'crypto', marketCap: '17.1B', volume: '892M' },
  { id: 14, name: 'Meta Platforms', symbol: 'META', price: 310.5, change: 2.9, type: 'stock', marketCap: '787.2B', volume: '18.4M' },
  { id: 15, name: 'Chainlink', symbol: 'LINK', price: 14.2, change: 6.1, type: 'crypto', marketCap: '8.4B', volume: '456M' },
  { id: 16, name: 'Netflix', symbol: 'NFLX', price: 449.3, change: 1.4, type: 'stock', marketCap: '199.8B', volume: '3.2M' },
  { id: 17, name: 'Floki', symbol: 'FLOKI', price: 0.00014, change: 18.9, type: 'meme', marketCap: '1.3B', volume: '145M' },
  { id: 18, name: 'Polygon', symbol: 'MATIC', price: 0.73, change: 2.8, type: 'crypto', marketCap: '6.8B', volume: '398M' },
  { id: 19, name: 'AMD', symbol: 'AMD', price: 128.4, change: 3.7, type: 'stock', marketCap: '207.8B', volume: '48.9M' },
  { id: 20, name: 'Bonk', symbol: 'BONK', price: 0.0000139, change: 8.6, type: 'meme', marketCap: '962M', volume: '78M' }
];

// Simple chart component
const MiniChart = ({ data, positive }: { data: number[], positive: boolean }) => {
  const points = data.map((point, index) => `${index * 4.67},${60 - point * 3}`).join(' ');
  const lastPoint = data[data.length - 1];
  const lastX = (data.length - 1) * 4.67;
  const lastY = 60 - lastPoint * 3;
  
  return (
    <div className="h-32 w-full bg-gray-800 rounded-lg p-2">
      <svg width="100%" height="100%" viewBox="0 0 140 60" className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={positive ? '#8B5CF6' : '#EF4444'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Blinking point at the end */}
        <circle
          cx={lastX}
          cy={lastY}
          r="3"
          fill={positive ? '#8B5CF6' : '#EF4444'}
          className="animate-pulse"
        />
{/*        <circle
          cx={lastX}
          cy={lastY}
          r="6"
          fill="none"
          stroke={positive ? '#8B5CF6' : '#EF4444'}
          strokeWidth="1"
          opacity="0.5"
          className="animate-ping"
        />*/}
      </svg>
    </div>
  );
};

// Stack card component (for background cards)
const StackCard = ({ asset }: { asset: any }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crypto': return 'bg-yellow-500';
      case 'stock': return 'bg-blue-500';
      case 'meme': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(8)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="absolute inset-4">
      <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 pointer-events-none" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${getTypeColor(asset.type)}`} />
            <div>
              <h3 className="text-white font-bold text-xl">{asset.name}</h3>
              <p className="text-gray-400 text-sm">{asset.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{formatPrice(asset.price)}</p>
            <p className={`text-sm font-semibold ${
              asset.change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-6">
          <MiniChart 
            data={Array.from({ length: 30 }, (_, i) => {
              // Create deterministic data based on asset ID
              const seed = asset.id;
              const seededRandom = (index: number) => {
                const x = Math.sin(seed * 9999 + index * 1234) * 10000;
                return x - Math.floor(x);
              };
              
              const isPositive = asset.change > 0;
              const trend = isPositive ? 1 : -1;
              return 10 + (seededRandom(i) * 8 * trend) + (i * 0.2 * trend);
            })} 
            positive={asset.change > 0} 
          />
        </div>

        {/* Timespan selector (disabled) */}
        <div className="flex justify-center space-x-2 mb-6">
          {['1m', '15m', '1h'].map((time) => (
            <div
              key={time}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-gray-700 text-gray-400"
            >
              {time}
            </div>
          ))}
        </div>

        {/* Market metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-lg">
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
              {/*<BarChart3 size={16} />*/}
              <span>Market Cap</span>
            </div>
            <p className="text-white font-semibold">{asset.marketCap}</p>
          </div>
          <div className="rounded-lg">
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
              {/*<Volume2 size={16} />*/}
              <span>Volume</span>
            </div>
            <p className="text-white font-semibold">{asset.volume}</p>
          </div>
        </div>

        {/* Action buttons (disabled) */}
        <div className="flex space-x-4">
          <div className="flex-1 bg-gray-700 text-gray-400 font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-2">
            {/*<SkipForward size={20} />*/}
            <span>Skip</span>
          </div>
          <div className="flex-1 bg-gray-700 text-gray-400 font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-2">
            {/*<ShoppingCart size={20} />*/}
            <span>Buy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Swipe card component
const SwipeCard = ({ asset, onSwipe, currentIndex, totalCards }: { asset: any, onSwipe: (direction: string) => void, currentIndex: number, totalCards: number }) => {
  const [timespan, setTimespan] = useState('1h');
  const [isVisible, setIsVisible] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  // Generate mock chart data deterministically based on asset ID
  const chartData = useMemo(() => {
    // Create a simple seeded random function based on asset ID
    const seed = asset.id;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed * 9999 + index * 1234) * 10000;
      return x - Math.floor(x);
    };
    
    const isPositive = asset.change > 0;
    return Array.from({ length: 30 }, (_, i) => {
      const trend = isPositive ? 1 : -1;
      return 10 + (seededRandom(i) * 8 * trend) + (i * 0.2 * trend);
    });
  }, [asset.id, asset.change, timespan]);

  const handleSwipe = (direction: string) => {
    setSwipeDirection(direction);
    // Start the next card movement immediately
    onSwipe(direction);
    setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  const handleDragStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    const { x } = dragOffset;
    
    if (Math.abs(x) > threshold) {
      handleSwipe(x > 0 ? 'right' : 'left');
    }
    
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Add/remove global event listeners
  React.useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: any) => handleMouseMove(e);
      const handleGlobalMouseUp = (e: any) => handleMouseUp(e);
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, startPos, dragOffset]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'crypto': return 'bg-yellow-500';
      case 'stock': return 'bg-blue-500';
      case 'meme': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatPrice = (price: number) => {
    if (price < 0.01) return `$${price.toFixed(8)}`;
    if (price < 1) return `$${price.toFixed(4)}`;
    return `$${price.toLocaleString()}`;
  };

  const rotation = isDragging ? dragOffset.x * 0.1 : 0;
  const opacity = isDragging ? Math.max(0.7, 1 - Math.abs(dragOffset.x) / 300) : 1;
  const showBuyIndicator = isDragging && dragOffset.x > 50;
  const showSkipIndicator = isDragging && dragOffset.x < -50;

  return (
    <div className={`absolute inset-4 transition-all duration-300 ${
      isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform scale-95'
    } ${swipeDirection === 'right' ? 'translate-x-full' : ''} ${
      swipeDirection === 'left' ? '-translate-x-full' : ''
    }`}>
      <div 
        ref={cardRef}
        className="bg-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-700 cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.1}px) rotate(${rotation}deg)`,
          opacity: opacity,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Swipe Indicators */}
        {showBuyIndicator && (
          <div className="absolute top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
            BUY
          </div>
        )}
        {showSkipIndicator && (
          <div className="absolute top-4 left-4 bg-gray-600 text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
            SKIP
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${getTypeColor(asset.type)}`} />
            <div>
              <h3 className="text-white font-bold text-xl">{asset.name}</h3>
              <p className="text-gray-400 text-sm">{asset.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">{formatPrice(asset.price)}</p>
            <p className={`text-sm font-semibold ${
              asset.change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mb-4">
          <MiniChart data={chartData} positive={asset.change > 0} />
        </div>

        {/* Timespan selector */}
        <div className="flex justify-center space-x-2 mb-4">
          {['1m', '15m', '1h'].map((time) => (
            <button
              key={time}
              onClick={() => setTimespan(time)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timespan === time
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Market metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="rounded-lg p-3">
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
              {/*<BarChart3 size={16} />*/}
              <span>Market Cap</span>
            </div>
            <p className="text-white font-semibold">{asset.marketCap}</p>
          </div>
          <div className="rounded-lg p-3">
            <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
              {/*<Volume2 size={16} />*/}
              <span>Volume</span>
            </div>
            <p className="text-white font-semibold">{asset.volume}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleSwipe('left')}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            {/*<SkipForward size={20} />*/}
            <span>Skip</span>
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2"
          >
            {/*<ShoppingCart size={20} />*/}
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main app component
const CryptoSwipeApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<any[]>([]);
  const [shuffledAssets, setShuffledAssets] = useState<any[]>([]);
  
  // Shuffle assets only on client side to avoid hydration mismatch
  React.useEffect(() => {
    setShuffledAssets([...mockAssets].sort(() => Math.random() - 0.5));
  }, []);

  const handleSwipe = (direction: string) => {
    if (direction === 'right') {
      setLiked(prev => [...prev, shuffledAssets[currentIndex]]);
    }
    
    // Always increment to show the next card or trigger the summary
    setCurrentIndex(prev => prev + 1);
  };

  const reset = () => {
    setCurrentIndex(0);
    setLiked([]);
  };

  // Show loading state until assets are shuffled
  if (shuffledAssets.length === 0) {
    return (
      <div className="h-screen bg-gray-900 flex items-center justify-center relative">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #7133F5 20.19%, #A5A9D9 86.06%)',
            filter: 'blur(200px)'
          }}
        />
        <div className="text-center relative z-10">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <TrendingUp size={20} className="text-white" />
          </div>
          <p className="text-white text-lg">Loading assets...</p>
        </div>
      </div>
    );
  }

  if (currentIndex >= shuffledAssets.length) {
    const totalValue = liked.reduce((sum, asset) => sum + asset.price, 0);
    const avgChange = liked.length > 0 ? liked.reduce((sum, asset) => sum + asset.change, 0) / liked.length : 0;
    const assetTypes = liked.reduce((acc, asset) => {
      acc[asset.type] = (acc[asset.type] || 0) + 1;
      return acc;
    }, {});
    
    return (
      <div className="h-screen bg-gray-900 flex flex-col p-4 relative overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, #7133F5 20.19%, #A5A9D9 86.06%)',
            filter: 'blur(200px)'
          }}
        />
        
        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full py-8">
            <div className="text-center relative z-10 max-w-md w-full">
          <h2 className="text-3xl font-bold text-white mb-4">Portfolio Summary 📊</h2>
          <p className="text-gray-400 mb-6">You've completed your asset selection</p>
          
          {/* Stats */}
          <div className="bg-gray-800 rounded-2xl p-6 mb-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">{liked.length}</p>
                <p className="text-sm text-gray-400">Assets Selected</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
                <p className="text-sm text-gray-400">Total Value</p>
              </div>
            </div>
            
            {liked.length > 0 && (
              <>
                <div className="text-center">
                  <p className={`text-xl font-semibold ${avgChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {avgChange > 0 ? '+' : ''}{avgChange.toFixed(2)}%
                  </p>
                  <p className="text-sm text-gray-400">Average Performance</p>
                </div>
                
                {/* Asset type breakdown with donut chart */}
                <div className="space-y-4">
                  <p className="text-sm text-gray-400 text-center">Portfolio Breakdown</p>
                  
                  {/* Donut Chart */}
                  <div className="flex justify-center">
                    <DonutChart
                      data={Object.entries(assetTypes).map(([type, count]) => ({
                        label: type,
                        value: count as number,
                        color: type === 'crypto' ? '#EAB308' :
                               type === 'stock' ? '#3B82F6' :
                               '#10B981'
                      }))}
                      size={140}
                      strokeWidth={16}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Selected assets */}
          {liked.length > 0 && (
            <div className="bg-gray-800 rounded-2xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Your Picks</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {liked.map(asset => (
                  <div key={asset.id} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">{asset.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white">${asset.price.toLocaleString()}</span>
                      <span className={`${asset.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {liked.length === 0 && (
            <div className="bg-gray-800 rounded-2xl p-6 mb-6">
              <p className="text-gray-400">No assets selected. Maybe try a different approach next time!</p>
            </div>
          )}
          
          <button
            onClick={reset}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Start Over
          </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #7133F5 20.19%, #A5A9D9 86.06%)',
          filter: 'blur(200px)'
        }}
      />
      
      {/* Add to Home Button */}
      <AddToHomeButton />
      
      {/* Mobile Debugger */}
      <MobileDebugger />
      
      {/* Header */}
      <div className="flex items-center justify-between p-3 relative z-10 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Inky</h1>
        </div>
        <div className="text-purple-400 font-semibold text-sm">
          {currentIndex + 1} of {shuffledAssets.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="px-4 py-2 relative z-10 flex-shrink-0">
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / shuffledAssets.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card stack */}
      <div className="flex-1 relative overflow-hidden z-10" style={{ perspective: '1000px' }}>
        {shuffledAssets.slice(currentIndex, currentIndex + 3).map((asset, index) => (
          <div
            key={asset.id}
            className={`absolute inset-0 transition-all duration-300 ${
              index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
            }`}
            style={{
              transform: `scale(${1 - index * 0.04}) translateY(${index * 12}px) translateZ(${-index * 20}px)`,
              opacity: 1 - index * 0.15,
              filter: `blur(${index * 0.5}px)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {index === 0 ? (
              <SwipeCard
                asset={asset}
                onSwipe={handleSwipe}
                currentIndex={currentIndex}
                totalCards={shuffledAssets.length}
              />
            ) : (
              <StackCard asset={asset} />
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-800 flex-shrink-0">
        <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>Crypto</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Stock</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Meme</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoSwipeApp;