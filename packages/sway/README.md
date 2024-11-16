# (Sway) Smart Contracts

This package contains the smart contracts written in Sway.

- **src/counter**: Contains a simple smart contract that increments a counter.

## Pre requisites

1. Setup the `.env` file with the following variables:
    - `PRIVATE_KEY`: The private key of the account that will deploy the smart contract.
    - `PROVIDER_URL`: The URL of the provider that will be used to deploy the smart contract.
   ```
   # Default local values
   PRIVATE_KEY=0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298
   PROVIDER_URL=http://127.0.0.1:4000/v1/graphql
   ```

2. Build the contracts
    ```bash
    pnpm fuels build
    ```
   
3. Deploy the contracts
    ```bash
    pnpm fuels deploy
    ```
   
4. Done! The contracts are deployed and ready to be used in **packages/app**:
   - Compiled contracts are in [artifacts](../app/src/artifacts) folder.
   - The IDs of the deployed contracts are in [contract-ids.json](../app/src/artifacts/contract-ids.json).