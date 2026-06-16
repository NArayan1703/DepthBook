# DepthBook: Real-Time Order Book Visualizer

DepthBook is a professional-grade trading analytics platform that visualizes cryptocurrency market liquidity, order books, and market microstructure. It provides a data-dense, institutional-style interface for real-time order flow analysis.

## 🚀 Features

- **Real-Time Order Book:** 20 levels of bid/ask depth with integrated liquidity bars and cumulative volume.
- **Dynamic Depth Chart:** Visualize market depth curves and mid-price spread using Recharts.
- **Liquidity Heatmap:** A simplified Bookmap-style canvas visualization tracking historical liquidity intensity.
- **Trade Tape (Time & Sales):** Real-time trade feed with aggressor detection and large trade highlighting.
- **Analytical Engines:**
  - **Imbalance Engine:** Monitors order book pressure.
  - **Liquidity Wall Detector:** Identifies large resting orders acting as support/resistance.
  - **Large Trade Detector:** Alerts for "whale" activity (> $100k).
- **Market Structure Panel:** Real-time trend analysis, support/resistance detection, and automated market commentary.
- **Risk Dashboard:** Live volatility and liquidity risk monitoring.
- **Educational Section:** Integrated terminology guide for market microstructure concepts.
- **Multi-Symbol Support:** Switch between BTC, ETH, SOL, and BNB instantly.

## 🛠 Technology Stack

- **Frontend:** React 19, Vite
- **Styling:** Tailwind CSS (Custom Professional Dark Theme)
- **Data Visualization:** Recharts, HTML5 Canvas
- **Icons:** React Icons
- **Real-Time Data:** Direct Binance WebSocket API

## 📁 Architecture

The project follows a feature-based folder structure for scalability and maintainability:

```
src/
├── features/
│   ├── orderbook/     # Order book rendering & logic
│   ├── depthchart/    # Recharts depth curve
│   ├── trades/        # Trade tape & whale detection
│   ├── heatmap/       # Canvas-based liquidity history
│   ├── analytics/     # Market structure & risk engines
│   ├── alerts/        # Centralized alert system
│   └── education/     # Glossary & terminology
├── services/          # Binance WebSocket singleton
├── hooks/             # Market data & analytics hooks
└── components/        # Shared UI components
```

## 📈 Market Microstructure Concepts

- **Market Liquidity:** DepthBook helps identify where large orders are "resting" in the book, providing insights into potential price reversals.
- **Order Flow Imbalance:** By comparing total bid volume vs ask volume, the Imbalance Engine provides a lead indicator of buying/selling pressure.
- **Aggressor vs Passive:** The Trade Tape distinguishes between buyers "lifting the offer" and sellers "hitting the bid," revealing which side is currently aggressive.
- **Liquidity Walls:** Detecting orders that are significantly larger than the average helps identify institutional boundaries.

## 🏁 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the application:**
   Navigate to `http://localhost:5173` in your browser.

## 🚀 Future Roadmap (V2)


