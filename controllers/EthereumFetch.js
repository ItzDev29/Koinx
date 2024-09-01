const axios = require('axios');
const Database = require('../database/dbConnect');

class PriceFetcher {
  constructor() {
    this.database = new Database();
  }

  async fetchAndStorePrice() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
      const priceData = response.data.ethereum.inr;

      const price = {
        timestamp: new Date(),
        price: priceData,
      };

      await this.database.storePrice(price);
      console.log('Ethereum price fetched and stored successfully!');
    } catch (error) {
      console.error('Error fetching Ethereum price:', error);
    }
  }
  async fetchCurrentPrice() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
      return response.data.ethereum.inr;
    } catch (error) {
      console.error('Error fetching current Ethereum price:', error);
      return null;
    }
  }
}

module.exports = PriceFetcher;