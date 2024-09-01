const axios = require('axios');
const Database = require('../database/dbConnect');

class TransactionFetcher {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.database = new Database();
  }

  async fetchTransactions(address) {
    try {
      const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=1&endblock=999999999&sort=asc&apikey=${this.apiKey}`;
      const response = await axios.get(url);

      if (!Array.isArray(response.data.result)) {
        throw new Error('Invalid transactions data received from Etherscan API');
      }

      const transactions = response.data.result;

      transactions.forEach(transaction => {
        transaction.expense = (transaction.gasUsed * transaction.gasPrice) / 1e18;
       });
      
      await this.database.storeTransactions(address, transactions);
      return transactions;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      return [];
    }
  }
}

module.exports = TransactionFetcher;