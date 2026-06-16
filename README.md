# DepthBook: Institutional Market Microstructure Terminal

**Live Terminal:** [https://depth-book.vercel.app/](https://depth-book.vercel.app/)

**DepthBook** is a high-performance trading analytics terminal designed for the analysis of **Market Microstructure**, **Liquidity Dynamics**, and **Order Flow Toxicity**. It provides a granular, real-time visualization of the Limit Order Book (LOB) and trade execution flow, enabling traders to identify institutional positioning and market pressure.

---

##  Quantitative Trading & Market Analysis Features

### 1. Limit Order Book (LOB) Analysis
- **Liquidity Depth Mapping:** Real-time visualization of resting orders (Bids/Asks) at multiple price levels to identify support and resistance zones.
- **Cumulative Depth Curve:** Visual representation of market thickness, allowing for the assessment of potential **Slippage** and **Market Impact** for large block trades.
- **Spread Efficiency Monitoring:** Constant tracking of the Bid-Ask spread and Mid-price to monitor market regime shifts and liquidity fragmentation.

### 2. Order Flow & Aggressor Tracking
- **Aggressor Analysis (Time & Sales):** Distinguished tracking of "Lifting the Offer" vs. "Hitting the Bid" to identify aggressive buying/selling vs. passive liquidity provisioning.
- **Whale Detection & Block Trade Filtering:** Real-time detection of institutional-sized executions (> $100k) to monitor **Smart Money** movement and stop-run potential.

### 3. Predictive Microstructure Engines
- **Order Flow Imbalance (OFI):** A quantitative indicator calculating the volume ratio between Bids and Asks. High positive imbalance often precedes short-term price appreciation (Bullish Pressure).
- **Liquidity Wall Detection:** Algorithmic scanning for **Iceberg Orders** and significant resting liquidity that acts as a barrier to price discovery.
- **Market Pressure Score:** A proprietary composite score (0-100) factoring in OFI, trade velocity, and spread volatility to determine current market sentiment.

### 4. Risk & Volatility Intelligence
- **Real-Time Volatility Assessment:** Monitoring price change velocity to assess market stability.
- **Liquidity Risk Meter:** Evaluates the risk of "Flash Crashes" or rapid liquidity evaporation based on LOB thinning.

---

##  Market Microstructure Concepts Applied

This terminal is built upon core principles of **Financial Engineering** and **Market Making**:

*   **Inventory Risk:** By monitoring the imbalance, a trader can gauge the risk exposure of market makers and predict potential mean-reversion or momentum breakouts.
*   **Adverse Selection:** The terminal identifies "Informed Flow" by tracking aggressive trade streaks, helping traders avoid "getting picked off" by toxic order flow.
*   **Price Discovery:** By visualizing the full depth instead of just the top-of-book (L1), the terminal reveals where the true supply and demand equilibrium resides.
*   **Arbitrage Opportunities:** Cross-exchange price comparison (V2 architecture) highlights fragmented liquidity and potential triangular or spatial arbitrage windows.

---

##  Strategic Utility for Traders

*   **Scalping & Intraday Trading:** Use OFI and Liquidity Walls to find high-probability entries at the "edges" of the book.
*   **Execution Strategy:** Determine the optimal time to execute large orders by waiting for deep liquidity clusters to minimize market impact.
*   **Market Regime Detection:** Identify whether the market is in a **Mean-Reverting (Range-bound)** state or a **Trend (Order Flow driven)** state.

---

## Vision & Quantitative Roadmap

- **Historical Replay & Backtesting:** Analyze how past liquidity walls influenced price action during major volatility events.
- **Cross-Exchange Aggregation:** A consolidated view of the global order book (Binance, Coinbase, Kraken) to identify global liquidity imbalances.
- **Sentiment & Social Correlation:** Correlating order flow shifts with macro news and social sentiment triggers.

---

**DepthBook** is more than a visualizer; it is a quantitative research environment for understanding the mechanical forces that drive price movement in electronic markets.
