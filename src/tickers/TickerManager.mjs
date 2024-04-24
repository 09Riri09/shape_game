export class TickerManager {
  constructor() {
    this.tickers = [];
  }

  addTickers(...tickers) {
    tickers.forEach((ticker) => this.addTicker(ticker));
  }

  addTicker(ticker) {
    this.tickers.push(ticker);
  }

  notify(currentTime) {
    this.tickers.forEach((ticker) => ticker.tick(currentTime));
  }
}