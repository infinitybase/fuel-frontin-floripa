# Front in Floripa

This repository contains the project presented at the Firechat of Front in Floripa 2024, where we demonstrated how to 
create a Smart Contract in **Sway** using the entire **Fuel Ecosystem**.

### Project structure

- **packages/sway**: Contains the smart contracts written in Sway
- **packages/app**: Contains the React project that interacts with the smart contract
- **packages/chain**: Contains the configurations to run the local chain

### Sway Program Types
- [Smart Contracts](.github/doc/SWAY-PROGRAM-TYPES.md)
- [Predicates](.github/doc/SWAY-PROGRAM-TYPES.md)

## How to run

1. Install [Fuel Wallet](https://chromewebstore.google.com/detail/fuel-wallet/dldjpboieedgcmpkchcjcbijingjcgok)

2. Clone the repository
    ```bash
     git clone https://github.com/infinitybase/fuel-frontin-floripa.git
    ```

3. Install the **Fuel Toolchain**
    ```bash
    curl https://install.fuel.network | sh
    fuelup self update
    ```
   
4. Run the local node
    ```bash
    fuel-core run \
        --db-path ./packages/chain/mnt/db \
        --utxo-validation \
        --vm-backtrace \
        --poa-interval-period 1sec \
        --debug \
        --snapshot ./packages/chain
    ```
   
5. [Setup the wallet](.github/doc/WALLET-SETUP.md) to connect to the local node

6. [Build and deploy](packages/sway/README.md) the smart contract.

7. [Run](packages/app/README.md) the Application

### Docs Links

- **[Fuel Doc](https://docs.fuel.network/docs/intro/what-is-fuel/)**
- **[Sway Doc](https://docs.fuel.network/docs/sway/)**
- **[Quickstart Smart Contract](https://docs.fuel.network/guides/contract-quickstart/#smart-contract-quickstart)** 
- **[Quickstart Front End](https://docs.fuel.network/guides/frontend-quickstart/)** 
- **[Apps examples](https://github.com/FuelLabs/sway-applications)** 