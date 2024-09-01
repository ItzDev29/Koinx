// function calculateTotalExpenses(transactions) {
//     return transactions.reduce((acc, transaction) => acc + transaction.expense, 0);
//   }
  
//   async function fetchCurrentPrice() {
//     try {
//       const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
//       return response.data.ethereum.inr;
//     } catch (error) {
//       console.error('Error fetching current Ethereum price:', error);
//       return null;
//     }
//   }
  
//   module.exports = { calculateTotalExpenses, fetchCurrentPrice };