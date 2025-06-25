import React, { useEffect, useState, useRef } from 'react';
import { Terminal, Zap, Shield, Code, Eye, Cpu, Brain, Target, Rocket, Star, TrendingUp, Users, Lock, Database, Network, Activity, CheckCircle, ArrowRight, Play, Bot, User } from 'lucide-react';

// Enhanced Terminal code animation component
const TerminalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to cover the full hero section
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      // Calculate the actual hero section height dynamically
      const heroSection = document.querySelector('[data-hero-section]');
      if (heroSection) {
        canvas.height = heroSection.scrollHeight;
      } else {
        // Fallback to cover full hero including video
        canvas.height = window.innerHeight * 1.8; // Extended to cover full hero section with video
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced terminal characters with more variety
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Animation boundary - end at the full hero section height
    const heroHeightLimit = canvas.height; // Use full canvas height which now covers hero section

    // Drops array with enhanced properties
    const drops: { y: number; speed: number; brightness: number }[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = {
        y: Math.random() * (heroHeightLimit / fontSize),
        speed: Math.random() * 1.5 + 0.5, // Much slower speed between 0.5-2
        brightness: Math.random() * 0.8 + 0.2 // Brightness between 0.2-1.0
      };
    }

    // Animation function
    const draw = () => {
      // Darker background with less transparency for more contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, heroHeightLimit);

      ctx.font = `${fontSize}px 'Courier New', monospace`;

      // Draw characters with enhanced visibility
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        // Only draw if within hero section bounds
        if (drop.y * fontSize <= heroHeightLimit) {
          // Enhanced blue color with variable brightness
          const alpha = drop.brightness;
          ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
          
          // Add glow effect for better visibility
          ctx.shadowColor = '#60a5fa';
          ctx.shadowBlur = 8;
          
          ctx.fillText(text, i * fontSize, drop.y * fontSize);
          
          // Reset shadow
          ctx.shadowBlur = 0;
        }

        // Move drop down with variable speed
        drop.y += drop.speed;

        // Reset drop to top when it goes beyond hero section or off screen
        if (drop.y * fontSize > heroHeightLimit) {
          drop.y = 0;
          drop.speed = Math.random() * 1.5 + 0.5; // Slower reset speed
          drop.brightness = Math.random() * 0.8 + 0.2;
        }

        // Randomly reset some drops for more dynamic effect (less frequent)
        if (Math.random() > 0.9995) {
          drop.y = 0;
          drop.brightness = Math.random() * 0.8 + 0.2;
        }
      }
    };

    const interval = setInterval(draw, 80); // Much slower animation at 80ms intervals

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60"
      style={{ pointerEvents: 'none' }}
    />
  );
};

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 bg-black/90 backdrop-blur-md border-b border-blue-500/30">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg border border-blue-400/50 shadow-blue-400/25">
              <Terminal className="w-6 h-6 text-black" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 rounded-lg blur-md opacity-30 group-hover:opacity-50 transition-opacity"></div>
          </div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">AdScriptly</div>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group">
            Features
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#pricing" className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group">
            Pricing
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
          </a>
          <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group">
            About
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
          </a>
          <button className="text-gray-300 hover:text-blue-400 transition-colors font-medium">Log in</button>
          <button className="relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 rounded-lg blur-sm opacity-0 hover:opacity-30 transition-opacity"></div>
          </button>
        </div>
      </nav>

      {/* Hero Section - Now includes video */}
      <section data-hero-section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-8">
        {/* Enhanced Terminal Rain Background - Covers full hero section */}
        <TerminalRain />
        
        {/* Cosmic Grid Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(96,165,250,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(96,165,250,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 2)}s`
              }}
            >
              <div className={`w-${4 + (i % 3) * 2} h-${4 + (i % 3) * 2} border border-blue-400/30 ${i % 2 === 0 ? 'rotate-45' : 'rotate-12'} bg-gradient-to-br from-blue-500/5 to-indigo-500/5`}></div>
            </div>
          ))}
        </div>

        {/* Cosmic Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-40 px-6 py-8 max-w-6xl mx-auto text-center flex-1 flex flex-col justify-center">
          {/* Cosmic Status Badge - Shortened and Centered */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-400/50 rounded-full font-medium text-sm backdrop-blur-md shadow-lg shadow-blue-500/20">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mr-2 animate-pulse shadow-lg shadow-blue-400/50"></div>
              <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent font-bold">$200k+ Ad Spend Saved</span>
              <ArrowRight className="w-3 h-3 ml-2 text-blue-400 animate-pulse" />
            </div>
          </div>
          
          {/* Main Headline - No Flash Animation */}
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 tracking-tight">
            <div className="relative mb-4">
              <span className="block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
                STOP WASTING
              </span>
            </div>
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl mb-4">
              AD SPEND
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              ON LOW-QUALITY LEADS
            </span>
          </h1>
          
          {/* Cosmic Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
            <span className="text-blue-400 font-bold">AI-driven automation</span> that squeezes every dollar<br />
            for stronger <span className="text-indigo-400 font-bold">ROAS</span> on Google & Meta.
          </p>

          {/* Cosmic CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-12">
            <button className="group relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white px-10 py-4 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-110 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center overflow-hidden">
              <span className="relative z-10 flex items-center">
                GET STARTED FOR FREE
                <Network className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
            </button>
            
            <div className="flex items-center text-gray-300 group cursor-pointer">
              <ArrowRight className="w-6 h-6 text-blue-400 mr-3 group-hover:translate-x-1 transition-transform" />
              <div className="text-sm text-blue-400 font-medium">No Credit Card Required</div>
            </div>
          </div>
        </div>

        {/* Video Section - Clean cutoff at hero end */}
        <div className="relative z-40 w-full max-w-6xl mx-auto px-6 pb-0">
          <div className="relative max-w-5xl mx-auto">
            {/* Video Container with clean cutoff */}
            <div className="relative bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 rounded-t-3xl shadow-2xl border-2 border-blue-500/30 border-b-0 overflow-hidden backdrop-blur-md group cursor-pointer hover:border-blue-400/50 transition-all duration-300">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                <img 
                  src="/Screenshot 2025-06-23 at 5.28.17 PM.png" 
                  alt="AdScriptly Dashboard Preview"
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-300"></div>
                
                {/* Cosmic Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative group-hover:scale-110 transition-transform duration-300">
                    {/* Outer cosmic glow rings */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-indigo-400/30 to-purple-400/30 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    
                    {/* Play button container with cosmic gradient */}
                    <div className="relative bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-blue-400/50 group-hover:border-blue-300/70 transition-all duration-300 overflow-hidden">
                      {/* Inner glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                      
                      {/* Play icon with cosmic styling */}
                      <Play className="relative z-10 w-10 h-10 text-white ml-1 drop-shadow-lg" fill="currentColor" />
                      
                      {/* Animated border glow */}
                      <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 opacity-0 group-hover:opacity-50 transition-opacity animate-pulse" style={{ 
                        background: 'linear-gradient(45deg, rgba(96,165,250,0.5), rgba(129,140,248,0.5), rgba(168,85,247,0.5))',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'exclude'
                      }}></div>
                    </div>
                  </div>
                </div>

                {/* Video duration badge with cosmic styling */}
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-black/90 via-gray-900/90 to-black/90 text-blue-300 px-3 py-1 rounded-lg text-sm font-mono backdrop-blur-sm border border-blue-500/30 shadow-lg">
                  2:34
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Cutoff Effect - Positioned at the very end of hero */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/90 to-transparent z-50 pointer-events-none"></div>
        
        {/* Hero Section Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent z-50"></div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 bg-gradient-to-r from-gray-900/50 via-black/50 to-gray-900/50 border-y border-blue-500/20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-8 font-medium uppercase tracking-wider">TRUSTED BY QUANTUM ENTERPRISES</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-60">
            {['NEXUS', 'QUANTUM', 'NEURAL', 'CYBER', 'MATRIX', 'SYNTH'].map((brand) => (
              <div key={brand} className="text-2xl font-black text-gray-500 font-mono tracking-wider">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900/50 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">THE OLD WAY</span>
              <span className="text-white"> VS </span>
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">THE NEW WAY</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* The Old Way */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-red-500/5 border border-red-400/30 group-hover:border-red-400/60 transition-all rounded-xl backdrop-blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-xl backdrop-blur-md h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl flex items-center justify-center border border-red-400/30 mr-4">
                    <Target className="w-6 h-6 text-red-400" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">The Broken System</h3>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    You're doing what Google tells you—optimizing for calls and form fills while your clients bottom line CAC spirals out of control.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    You may be doing offline conversion uploads with messy CSV uploads, but you don't have enough volume.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    Google's algorithm is learning from the wrong signals. The system is broken.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    Your client asks why their $50K ad spend brought in 200 leads but only generated three real customers.
                  </p>
                  
                  {/* Wasted Ad Spend Stat */}
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg p-6 border border-red-400/20 mt-8">
                    <div className="text-center">
                      <div className="text-5xl font-black text-red-400 mb-2">85%</div>
                      <div className="text-red-300 font-bold text-lg">Wasted Ad Spend</div>
                      <div className="text-gray-400 text-sm mt-2">Industry average for unqualified leads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The New Way */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-400/30 group-hover:border-blue-400/60 transition-all rounded-xl backdrop-blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-xl backdrop-blur-md h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center border border-blue-400/30 mr-4">
                    <Brain className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Neural Solution</h3>
                </div>
                
                <div className="space-y-6">
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    Adscriptly creates a closed-loop attribution system that captures post-click intent signals—contextual AI lead scoring, CRM stage progression, AI LTV predictors and more.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    We push enhanced conversions back to Google in real-time, training Smart Bidding on SQLs and closed-won deals, not just top-of-funnel noise.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    Now you make real-time optimization decisions backed by actual revenue data.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-light text-lg">
                    Your campaigns finally learn what a valuable customer looks like—and find more of them.
                  </p>
                  
                  {/* Better ROAS Stat */}
                  <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg p-6 border border-blue-400/20 mt-8">
                    <div className="text-center">
                      <div className="text-5xl font-black text-blue-400 mb-2">5x</div>
                      <div className="text-blue-300 font-bold text-lg">Better ROAS</div>
                      <div className="text-gray-400 text-sm mt-2">Average improvement with neural optimization</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neural Command Center Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900/50 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              NEURAL COMMAND<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                CENTER
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Advanced AI systems engineered for maximum campaign optimization and ROI amplification
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Multi-Platform Integration - Top Left */}
            <div className="lg:col-span-2 group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-400/30 group-hover:border-blue-400/60 transition-all rounded-xl backdrop-blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-xl backdrop-blur-md h-full">
                {/* Platform Icons */}
                <div className="flex items-center justify-center space-x-8 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center border border-blue-400/30">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-indigo-400/30">
                    <div className="w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">M</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center border border-purple-400/30">
                    <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">T</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-bold text-sm mb-6 hover:scale-105 transition-transform">
                    Connect Platforms
                  </button>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Multi-Platform Neural Sync</h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  Seamlessly integrate Google Ads, Meta, and TikTok campaigns through our unified neural interface. 
                  All platforms synchronized in one quantum command center.
                </p>
              </div>
            </div>

            {/* Real-Time Analytics - Top Right */}
            <div className="lg:col-span-2 group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-400/30 group-hover:border-blue-400/60 transition-all rounded-xl backdrop-blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-xl backdrop-blur-md h-full">
                {/* Analytics Chart Mockup */}
                <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-lg p-4 mb-6 border border-blue-400/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-blue-300 text-sm font-mono">Campaign Visitors</div>
                    <div className="text-blue-400 text-sm font-bold">23 May 2025 - 23 June 2025</div>
                  </div>
                  <div className="text-3xl font-black text-white mb-2">2,383 <span className="text-blue-400 text-lg">+40%</span></div>
                  <div className="text-gray-400 text-sm mb-4">vs 7,547 last month</div>
                  {/* Simple chart visualization */}
                  <div className="flex items-end space-x-1 h-16">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className={`bg-gradient-to-t from-blue-500 to-indigo-400 rounded-sm flex-1 opacity-${30 + (i % 4) * 20}`} style={{ height: `${20 + Math.random() * 40}px` }}></div>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Quantum Analytics Engine</h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  Monitor campaign performance with real-time neural insights. 
                  Track conversions, ROAS, and optimization opportunities across all channels.
                </p>
              </div>
            </div>

            {/* Performance Tracking - Bottom Left */}
            <div className="lg:col-span-2 group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-400/30 group-hover:border-blue-400/60 transition-all rounded-xl backdrop-blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-xl backdrop-blur-md h-full">
                {/* Performance Chart */}
                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-4 mb-6 border border-indigo-400/20">
                  <div className="text-indigo-300 text-sm font-mono mb-4">Neural Performance Matrix</div>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-black text-white mb-1">You</div>
                    {/* Bar chart visualization */}
                    <div className="flex items-end justify-center space-x-2 h-20">
                      {[30, 45, 60, 35, 25, 40].map((height, i) => (
                        <div key={i} className={`w-6 bg-gradient-to-t ${i === 2 ? 'from-blue-500 to-indigo-400' : 'from-gray-600 to-gray-500'} rounded-sm`} style={{ height: `${height}px` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Neural Performance Tracking</h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  Advanced AI monitoring without complex setup. 
                  Your campaign data automatically analyzed and optimized through our neural network.
                </p>
              </div>
            </div>

            {/* No-Code Platform - Bottom Right */}
            <div className="lg:col-span-2 group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-400/30 group-hover:border-blue-400/60 transition-all rounded-xl backdrop-blur-sm"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-xl backdrop-blur-md h-full">
                {/* No-Code Interface Mockup */}
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg p-4 mb-6 border border-purple-400/20">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-6 bg-blue-400 rounded text-white text-xs flex items-center justify-center font-bold">container</div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-8 h-6 bg-indigo-400 rounded text-white text-xs flex items-center justify-center font-bold">header</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-6 bg-purple-400 rounded text-white text-xs flex items-center justify-center font-bold">nav</div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Neural No-Code Interface</h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  Build and optimize campaigns without technical expertise. 
                  Our AI handles the complexity while you focus on strategy and results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Powered by Neural AI Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900/30 via-black/30 to-gray-900/30">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-400/50 rounded-full mb-6 font-medium text-sm backdrop-blur-md shadow-lg shadow-blue-500/20">
              <Bot className="w-4 h-4 mr-2 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent font-bold">AI-powered campaign optimization</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
              <span className="text-white">Powered by Neural AI.</span><br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Designed for marketers.
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Our quantum AI analyzes your campaigns and automatically optimizes for maximum ROAS. 
              No technical expertise required - just better results.
            </p>
          </div>

          {/* Two-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-12">
              {/* Feature 1 */}
              <div className="group">
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  Start by connecting your ad accounts
                </h3>
                <p className="text-gray-300 leading-relaxed font-light text-lg">
                  Our neural interface seamlessly integrates with Google Ads, Meta, and TikTok. 
                  Connect once and let our AI optimize across all platforms simultaneously.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="group">
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                  Neural dashboard with AI-generated insights
                </h3>
                <p className="text-gray-300 leading-relaxed font-light text-lg">
                  Watch as our quantum AI analyzes your campaign data in real-time, 
                  automatically identifying optimization opportunities and implementing improvements.
                </p>
              </div>
            </div>

            {/* Right Column - Visual */}
            <div className="relative">
              {/* Main Interface Mockup */}
              <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-3xl p-8 border-2 border-blue-400/30 backdrop-blur-md shadow-2xl shadow-blue-500/20 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-blue-400 font-bold">Campaign Optimizer</div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Campaign Goal</label>
                    <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-400/30 rounded-lg p-3 text-white">
                      Maximize ROAS
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Target Audience</label>
                    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-400/30 rounded-lg p-3 text-white">
                      High-intent buyers
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm block mb-2">Budget Range</label>
                    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-400/30 rounded-lg p-3 text-white">
                      $5,000 - $15,000/month
                    </div>
                  </div>
                </div>

                {/* AI Processing */}
                <div className="bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-400/20 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Brain className="w-5 h-5 text-blue-400 mr-2 animate-pulse" />
                    <span className="text-blue-300 text-sm font-bold">Neural AI Processing...</span>
                  </div>
                  <div className="text-gray-400 text-xs">Analyzing 847 data points across platforms</div>
                </div>

                {/* Optimize Button */}
                <button className="w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Optimize Campaigns
                </button>

                {/* Floating Robot */}
                <div className="absolute -top-4 -right-4 w-24 h-24 opacity-20">
                  <img 
                    src="/robot.png" 
                    alt="AI Robot"
                    className="w-full h-full object-contain filter brightness-0 invert opacity-60"
                  />
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900/50 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              QUANTUM FEATURES<br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                NEURAL RESULTS
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
              Advanced AI systems engineered for maximum campaign optimization and ROI amplification
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Quantum AI Prediction Engine",
                description: "Neural networks analyze infinite data patterns to predict optimal content performance with 99.7% accuracy.",
                icon: Brain,
                gradient: "from-blue-500 to-indigo-600",
                glow: "rgba(59,130,246,0.3)"
              },
              {
                title: "Autonomous Bid Optimization",
                description: "Self-learning algorithms automatically adjust bidding strategies in real-time across all platforms.",
                icon: Zap,
                gradient: "from-indigo-500 to-purple-600",
                glow: "rgba(99,102,241,0.3)"
              },
              {
                title: "Neural Brand Intelligence",
                description: "AI consciousness that understands your brand DNA and optimizes campaigns with human-like creativity.",
                icon: Network,
                gradient: "from-purple-500 to-blue-500",
                glow: "rgba(168,85,247,0.3)"
              },
              {
                title: "Quantum Collaboration Matrix",
                description: "Multi-dimensional workspace where teams collaborate in real-time across parallel campaign universes.",
                icon: Users,
                gradient: "from-blue-600 to-indigo-500",
                glow: "rgba(37,99,235,0.3)"
              },
              {
                title: "Neural Health Diagnostics",
                description: "Advanced AI monitoring system provides predictive analytics and quantum-level campaign insights.",
                icon: Activity,
                gradient: "from-indigo-600 to-purple-600",
                glow: "rgba(79,70,229,0.3)"
              },
              {
                title: "Instant Neural Deployment",
                description: "Zero-latency campaign activation with pre-trained neural networks and quantum-speed optimization.",
                icon: Rocket,
                gradient: "from-purple-600 to-blue-600",
                glow: "rgba(147,51,234,0.3)"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-400/30 group-hover:border-blue-400/60 transition-all rounded-xl backdrop-blur-sm"></div>
                <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-xl backdrop-blur-md">
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-2xl border border-blue-400/30`}>
                    <feature.icon className="w-10 h-10 text-white" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity`}></div>
                  </div>
                  <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-light">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900/30 via-black/30 to-gray-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
              QUANTUM PRICING <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">MATRIX</span>
            </h2>
            <p className="text-xl text-gray-300 font-light">Choose your neural enhancement level</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-3xl p-8 border-2 border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/20 transition-all backdrop-blur-md">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black text-white mb-2">NEURAL STARTER</h3>
                <div className="text-6xl font-black text-blue-400 mb-2">$14<span className="text-lg text-gray-400 font-normal">/cycle</span></div>
                <p className="text-gray-400 font-light">Basic neural network access</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Up to 5 neural campaigns',
                  'Basic AI optimization',
                  'Quantum support channel',
                  'Standard analytics matrix',
                  '1 neural operator'
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-400 mr-3" />
                    <span className="text-gray-300 font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-xl font-black hover:scale-105 transition-all shadow-lg shadow-blue-500/25">
                INITIATE NEURAL LINK
              </button>
            </div>

            <div className="relative bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl p-8 border-2 border-blue-400/50 overflow-hidden backdrop-blur-md shadow-2xl shadow-blue-500/20">
              <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 text-blue-300 px-4 py-2 rounded-full text-sm font-bold border border-blue-400/50 backdrop-blur-sm">
                QUANTUM ENHANCED
              </div>
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black text-white mb-2">NEURAL MATRIX</h3>
                <div className="text-6xl font-black text-indigo-400 mb-2">Custom<span className="text-lg text-gray-400 font-normal"> neural pricing</span></div>
                <p className="text-gray-300 font-light">Advanced quantum neural networks</p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited neural campaigns',
                  'Quantum AI optimization',
                  'Priority neural support',
                  'Advanced quantum analytics',
                  'Unlimited neural operators',
                  'Neural API access'
                ].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-indigo-400 mr-3" />
                    <span className="text-white font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-gradient-to-r from-white to-gray-100 text-black py-4 rounded-xl font-black hover:scale-105 transition-all shadow-lg">
                CONTACT NEURAL COMMAND
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900/50 to-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 border-2 border-blue-400/30 rounded-3xl backdrop-blur-md"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 p-16 rounded-3xl">
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                LET YOUR NEURAL<br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  NETWORK EVOLVE
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
                Join the quantum revolution. Thousands of neural networks already optimizing campaigns in the digital multiverse.
              </p>
              <button className="group relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white px-16 py-6 rounded-2xl font-black text-xl hover:scale-110 transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center mx-auto overflow-hidden">
                <span className="relative z-10 flex items-center">
                  ACTIVATE NEURAL PROTOCOL
                  <Rocket className="w-8 h-8 ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
              </button>
              <div className="mt-8 text-gray-400 font-mono text-sm">
                NO NEURAL IMPLANTS REQUIRED • 7-DAY QUANTUM TRIAL • CANCEL ANYTIME
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black border-t border-blue-500/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg border border-blue-400/50">
                  <Terminal className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 rounded-xl blur-md opacity-30"></div>
                </div>
                <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">AdScriptly</div>
              </div>
              <p className="text-gray-400 leading-relaxed font-light">
                Quantum AI-powered neural network system optimizing advertising campaigns across the digital multiverse.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Neural Products</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Quantum Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Neural Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Quantum API</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Neural Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Neural Command</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Neural Corp</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Quantum Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Neural Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Matrix</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Neural Legal</h4>
              <ul className="space-y-3 text-gray-400 font-light">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Protocol</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Neural Terms</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Quantum Security</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Data Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0 font-mono text-sm">
              © 2100 AdScriptly Neural Corp. All quantum rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-blue-400 transition-colors font-mono">NEURAL_X</a>
              <a href="#" className="hover:text-blue-400 transition-colors font-mono">QUANTUM_IN</a>
              <a href="#" className="hover:text-blue-400 transition-colors font-mono">NEURAL_HUB</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;