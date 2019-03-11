const erc20Abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
];

function getBlockBatches(start, end, batchSize) {
  const blockBatches = Array.from(
    { length: Math.ceil((end - start) / batchSize) },
    (v, i) => {
      const fromBlock = start + (i * batchSize);
      const toBlock = start + ((i + 1) * batchSize) - 1;
      return { fromBlock, toBlock }; 
    }
  );

  return blockBatches;
}

async function getFirstBlock(web3, instance, blockBatches, batchSize) {
  const blockBatchBatches = Math.ceil(blockBatches.length / batchSize);

  for (let i = 0; i < blockBatchBatches; i++) {
    const start = i * batchSize;
    let end = (i + 1) * batchSize;
    if (end > blockBatches.length) {
      end = blockBatches.length;
    }

    const blockBatchBatch = blockBatches.slice(start, end);

    try {
      const transferBatch = await Promise.all(
        blockBatchBatch.map(({ fromBlock, toBlock }) => {
          return instance.getPastEvents('Transfer', { fromBlock, toBlock });
        })
      );

      const transfers = transferBatch.find(transfers => {
        return transfers && transfers.length > 0;
      });

      if (transfers && transfers.length > 0) {
        return transfers[0].blockNumber;
      }
    } catch(error) {
      continue;
    }
  }

  return 0;
}

function dedupeTransferAddresses(transfers, addressBalanceMap) {
  // Dedupe addresses
  const addresses = [
    ...new Set(
      transfers.map(transfer => transfer.returnValues['to'])
    )
  ].filter(address => !addressBalanceMap.has(address));

  return addresses;
}

async function getBalances(addresses, batchSize, instance) {
  // Retrieve address balances
  let balances = [];
  const addressBatches = Math.ceil(addresses.length / batchSize);
  for (let i = 0; i < addressBatches; i++) {
    const start = i * batchSize;
    let end = (i + 1) * batchSize;
    if (end > addresses.length) {
      end = addresses.length;
    }

    const addressBatch = addresses.slice(start, end);

    try {
      const batchBalances = await Promise.all(addressBatch.map(address => {
        return instance.methods.balanceOf(address).call();
      }));

      balances = balances.concat(batchBalances);
    } catch(error) {
      continue;
    }
  }

  return balances;
}

function mapNewBalances(web3, addresses, balances, addressBalanceMap) {
  const BN = web3.utils.BN;
  // Add new addresses to map
  for (let i = 0; i < addresses.length; i++) {
    // Only add accounts with positive balances
    if (balances[i]) {
      const balance = new BN(balances[i]);
      if (balance.gt(new BN('0'))) {
        addressBalanceMap.set(addresses[i], balance);
      }
    }
  }

  return addressBalanceMap;
}

export default async function findWhales(web3, token) {
  const instance = new web3.eth.Contract(erc20Abi, token);

  const blockBatchSize = 50000;
  const firstBlockBatchSize = 100;
  const addressBatchSize = 100;

  // Create batches of blocks for getting past events
  const latest = await web3.eth.getBlockNumber();
  const blockBatchesFull = getBlockBatches(0, latest, blockBatchSize);
  const start = await getFirstBlock(
    web3,
    instance,
    blockBatchesFull,
    firstBlockBatchSize
  );
  const blockBatches = getBlockBatches(start, latest, blockBatchSize);

  const addressBalanceMap = await blockBatches.reduce(
    async (addressBalanceMapPromise, { fromBlock, toBlock }) => {
      // Resolve the previous promise so the reduce is performed sequentially
      let addressBalanceMap = await addressBalanceMapPromise;

      let transfers;

      try {
        transfers = await instance.getPastEvents(
          'Transfer',
          { fromBlock, toBlock }
        );
      } catch(error) {
        return addressBalanceMap;
      }

      const addresses = dedupeTransferAddresses(
        transfers,
        addressBalanceMap
      );

      const balances = await getBalances(
        addresses,
        addressBatchSize,
        instance
      );

      return mapNewBalances(web3, addresses, balances, addressBalanceMap);
    },
    Promise.resolve(new Map())
  );

  const sorted = [...addressBalanceMap].sort(([, a], [, b]) => b.cmp(a));

  return sorted;
};
