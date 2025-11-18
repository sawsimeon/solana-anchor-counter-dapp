# Solana Anchor Counter dApp

A simple Solana smart contract using Rust and Anchor to manage a counter on the blockchain.

This project is a hands-on example of a Solana-based project: a simple Counter Program (smart contract) built with Rust and the Anchor framework. The program allows initializing a counter and incrementing or decrementing its value on-chain.

It serves as a basic template for shipping a Solana project: you can build, test locally, and deploy the smart contract to various networks (devnet/mainnet).

## Setup

Before you begin, ensure you have the necessary tools installed for Solana and Anchor development.

1.  **Install the Solana CLI:**
    ```bash
    sh -c "$(curl -sSfL https://release.solana.com/v1.18.0/install)"
    ```

2.  **Install Anchor CLI:**
    ```bash
    cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
    ```

3.  **Install Node.js Dependencies** (for running the TypeScript tests):
    Navigate to the project root and install dependencies specified in `package.json`:
    ```bash
    yarn install
    # or
    npm install
    ```

4.  **Build the Smart Contract:**
    Compile the Rust program using the Anchor CLI:
    ```bash
    anchor build
    ```


## Test

You can validate the smart contract's logic locally using the provided TypeScript tests in the `tests/` directory. This runs the contract in a local validator environment.
```bash
anchor test
```

## Deployment

The smart contract must be deployed to a Solana cluster (like Devnet for testing) to be used.

1. Set your Solana cluster to Devnet: 

```bash
solana config set --url devnet
```


2. Ensure your wallet has SOL (for gas fees). Airdrop test SOL on Devnet: 

```bash
`solana airdrop 2`
```

3. Deploy the program. This command compiles the code again and deploys the optimized program binary to the configured network:

```bash
`anchor deploy`
```

