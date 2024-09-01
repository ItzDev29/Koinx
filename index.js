const express = require('express');
const bodyParser = require('body-parser');
const PriceFetcher = require('./controllers/EthereumFetch');
const TransactionFetcher = require('./controllers/transaction');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

const apiKey = config.API_KEY;

const transactionFetcher = new TransactionFetcher(apiKey);


const price = async () => {
  const priceFetcher = new PriceFetcher();

  // Fetch price initially and then every 10 minutes
  await priceFetcher.fetchAndStorePrice();
  setInterval(() => priceFetcher.fetchAndStorePrice(), 10 * 60 * 1000); 
};

price();

app.post('/transactions', async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Missing address parameter' });
  }

  try {
    const transactions = await transactionFetcher.fetchTransactions(address);
    res.json({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

app.get('/expenses/:address', async (req, res) => {
  const { address } = req.params;

  if (!address) {
    return res.status(400).json({ error: 'Missing address parameter' });
  }

  try {
    // Fetch transactions
    const transactions = await transactionFetcher.fetchTransactions(address);

    // Calculate total expenses
    const totalExpenses = transactions.reduce((acc, transaction) => acc + transaction.expense, 0);

    const priceFetcher = new PriceFetcher();
    const currentPrice = await priceFetcher.fetchCurrentPrice();    

    res.json({
      totalExpenses,
      currentEthereumPrice: currentPrice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch expenses or current price' });
  }
});

app.listen(4000, () => console.log('Server listening on port 4000'));