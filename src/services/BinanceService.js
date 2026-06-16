/**
 * BinanceWebSocketService
 * Handles real-time data streams from Binance.
 */
class BinanceWebSocketService {
  constructor() {
    this.baseUrl = "wss://stream.binance.com:9443/ws";
    this.ws = null;
    this.callbacks = {
      depth: null,
      trades: null,
      ticker: null,
      status: null,
    };
    this.symbol = "btcusdt";
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect(symbol = "btcusdt", callbacks = {}) {
    this.symbol = symbol.toLowerCase();
    this.callbacks = { ...this.callbacks, ...callbacks };

    if (this.ws) {
      this.ws.close();
    }

    const streams = [
      `${this.symbol}@depth20@100ms`,
      `${this.symbol}@trade`,
      `${this.symbol}@ticker`,
    ].join("/");

    this.ws = new WebSocket(`${this.baseUrl}/${streams}`);

    this.ws.onopen = () => {
      console.log(`Connected to Binance WebSocket for ${this.symbol}`);
      this.reconnectAttempts = 0;
      if (this.callbacks.status) this.callbacks.status("connected");
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this._handleMessage(data);
    };

    this.ws.onclose = () => {
      console.log("Binance WebSocket closed");
      if (this.callbacks.status) this.callbacks.status("disconnected");
      this._attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error("Binance WebSocket error:", error);
      if (this.callbacks.status) this.callbacks.status("error");
    };
  }

  _handleMessage(data) {
    if (!data.e) {
      // Ticker and depth snapshots might have different formats depending on the stream type
      // But for the combined stream, 'e' is usually present for events.
      // However, @depth20 is a snapshot event.
    }

    const eventType = data.e;

    switch (eventType) {
      case "trade":
        if (this.callbacks.trades) {
          this.callbacks.trades({
            time: data.T,
            price: data.p,
            quantity: data.q,
            isBuyerMaker: data.m, // true = sell aggressor, false = buy aggressor
            tradeId: data.t,
          });
        }
        break;

      case "24hrTicker":
        if (this.callbacks.ticker) {
          this.callbacks.ticker({
            lastPrice: data.c,
            priceChange: data.p,
            priceChangePercent: data.P,
            weightedAvgPrice: data.w,
            highPrice: data.h,
            lowPrice: data.l,
            volume: data.v,
            quoteVolume: data.q,
          });
        }
        break;

      default:
        // @depth20@100ms doesn't have an 'e' field in some cases, it returns bids/asks directly
        if (data.bids && data.asks) {
          if (this.callbacks.depth) {
            this.callbacks.depth({
              bids: data.bids,
              asks: data.asks,
              lastUpdateId: data.lastUpdateId,
            });
          }
        }
        break;
    }
  }

  _attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => this.connect(this.symbol, this.callbacks), 5000);
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.onclose = null; // Prevent reconnection
      this.ws.close();
      this.ws = null;
    }
  }
}

export const binanceService = new BinanceWebSocketService();
