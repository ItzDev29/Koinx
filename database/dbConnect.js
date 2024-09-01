const mongoose = require('mongoose');
const config = require('../config');
class Database {
  constructor() {
    this.mongoURI = config.mongoURI;
    this.connect();
  }

  async connect() {
    try {
      await mongoose.connect(this.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  async storePrice(price) {
    const PriceSchema = new mongoose.Schema({
      timestamp: { type: Date, required: true },
      price: { type: Number, required: true },
    });

    const Price = mongoose.model('Price', PriceSchema);

    const newPrice = new Price(price);
    await newPrice.save();
  }
  
  async storeTransactions(address, transactions) {
    const TransactionSchema = new mongoose.Schema({
      address: { type: String, required: true },
      transactions: { type: Array, required: true },
    });

    transactions.forEach(transaction => {
      transaction.expense = (transaction.gasUsed * transaction.gasPrice) / 1e18;
     });

    const Transaction = mongoose.model('Transaction', TransactionSchema);

    const existingTransactions = await Transaction.findOne({ address });

    if (existingTransactions) {

    } else {
      const newTransaction = new Transaction({ address, transactions });
      await newTransaction.save();
    }
  }
  
}

module.exports = Database;