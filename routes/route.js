// const express = require('express');
// const axios = require('axios');
// const Transaction = require('../models/Transaction');

// const router = express.Router();

// const API_KEY = 'YOUR_ETHERSCAN_API_KEY'; // Replace with your Etherscan API key

// router.get('/transactions/:address', async (req, res) => {
//     const address = req.params.address.toLowerCase();

//     try {
//         const response = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=<span class="math-inline">\{address\}&startblock\=1&endblock\=999999999&sort\=asc&apikey\=</span>{API_KEY}`);

//         if (response.data.status === '1') {
//             const transactions = response.data.result;

//             // Check if transactions already exist
//             const existingTransactions = await Transaction.find({ address });

//             // Store new transactions
//             const newTransactions = transactions.filter(
//                 (tx) => !existingTransactions.some((etx) => etx.hash === tx.hash)
//             );

//             if (newTransactions.length) {
//                 await Transaction.insertMany(newTransactions);
//                 console.log(`Stored ${newTransactions.length} new transactions for address ${address}`);
//             } else {
//                 console.log('No new transactions found for this address.');
//             }

//             res.json(transactions);
//         } else {
//             console.error('Error fetching transactions:', response.data.message);
//             res.status(500).json({ error: 'Failed to fetch transactions' });
//         }
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;