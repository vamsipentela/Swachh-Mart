import React from 'react';

const Loader = () => {
  return (
    <div className="luxury-loader-container">
      <div className="loader-orbital-wrap">
        {/* Orbital Ring */}
        <div className="orbital-ring"></div>
        <div className="orbital-dot"></div>
        
        {/* Central Logo */}
        <div className="loader-central-brand">
          Swachh<span>Mart</span>
        </div>
      </div>

      <style>{`
        .luxury-loader-container {
          position: fixed;
          inset: 0;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeOutExit 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1.8s forwards;
        }

        .loader-orbital-wrap {
          position: relative;
          width: 240px;
          height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbital-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid #F3F4F6;
          border-radius: 50%;
        }

        .orbital-dot {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #10B981;
          animation: spinOrbital 1.5s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
        }

        .loader-central-brand {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 2.2rem;
          font-weight: 900;
          color: #111827;
          letter-spacing: -0.04em;
          animation: logoPulse 2s ease-in-out infinite;
        }

        .loader-central-brand span {
          color: #10B981;
        }

        @keyframes spinOrbital {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes logoPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes fadeOutExit {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.05); visibility: hidden; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
