## Koinx backend assignment

### Deployed site link :  [https://celebrated-platypus-c0a648.netlify.app/]

### How to use locally?

- Clone the repository

  ```
  https://github.com/ItzDev29/Koinx.git
  ```

- Install the packages using the package manager of your choice (eg: npm, pnpm, yarn)>

  ```
  <package_manager> install
  ```

- To run the application use the command
  ```
  node index.js
  ```
  or replace npm/node with the package manager you are using. The server will start at `localhost:3000` by default if no PORT is specified in the env file.


### Folder Structure:
```
└── 📁src
    └── index.js 
    └── config.js 
    └── 📁controllers
        └── EthereumFetch.js
        └── transaction.js
    └── 📁database
        └── dbConnect.js
    └── 📁middleware
        └── errorHandler.ts
```

### Tasks: 


**Task 1:**

1. Develop an API using Node.js to fetch the crypto transactions of a user.
2. You can use the Etherscan API(https://docs.etherscan.io/api-endpoints/accounts#get-a-list-of-normal-transactions-by-address) to fetch the list of “Normal” transactions for a user. You can use this address for testing:- 0xce94e5621a5f7068253c42558c147480f38b5e0d. You will have to create your own free API Key for testing purposes.
3. The input for the API will be the address of a user. The output would be the list of transactions for this address. You would also have to store these transactions against this address in a database, preferably MongoDB.

![Screenshot 2024-09-01 155158](https://github.com/user-attachments/assets/c66bcea6-fcf6-448b-8303-081c679928a3)


**Task 2:**

1. Build a system within the same server to fetch the price of Ethereum every 10 minutes and store it in the database.
2. You can use this API for the same:- https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr
   
![Screenshot 2024-09-01 155249](https://github.com/user-attachments/assets/5b50dac8-95de-4c72-a5a5-8e0ae808db30)


**Task 3:**

1. Develop a `GET` API for a user where they give their address as an input and get their total expenses and current price of ether as output.
2. The expense for each transaction can be calculated as `gasUsed*gasPrice` divided by 1e18.

![Screenshot 2024-09-01 155100](https://github.com/user-attachments/assets/e5ab4bbd-5f14-4819-bc6d-02e10e28ca27)
