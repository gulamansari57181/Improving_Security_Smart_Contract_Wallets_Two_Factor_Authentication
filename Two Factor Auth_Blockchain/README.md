# Enhancing Security in Smart Contract Wallets: An OTP Based 2-Factor Authentication Approach

## Prerequisites

1. **MetaMask**: Install the MetaMask wallet extension in your browser. [MetaMask](https://metamask.io/download.html)
2. **Remix IDE**: Use Remix IDE for deploying the smart contract. [Remix IDE](https://remix.ethereum.org/)
3. **Sepolia Testnet**: Ensure your MetaMask is connected to the Sepolia testnet for testing purposes.

## Project Structure

- **pics/**: Contains all the images used in the project.
- **authenticator.js**: Handles authentication and interaction with the blockchain.
- **client.js**: Contains the logic for interacting with the deployed smart contract.
- **index.html**: The main HTML file to run the project.
- **style.css**: Styles for the HTML elements.
- **todeploy.sol** (Optional): The Solidity smart contract that can be deployed using Remix IDE.

## Setup Instructions

### Step 1: Deploy the Smart Contract

1. Open Remix IDE and load the `todeploy.sol` file.
2. Connect MetaMask to the Sepolia testnet.
3. Deploy the smart contract using the "Injected Web3" environment in Remix IDE.
4. After deployment, obtain the smart contract address and the ABI code from Remix IDE.

### Step 2: Update Client.js

1. Replace the placeholder values in `client.js` with the smart contract address and ABI code obtained from Remix IDE.
2. Alternatively, you can use the provided contract address in `client.js` to run the project directly without deploying the smart contract yourself.

### Step 3: Run the Project

1. Open `index.html` in your browser.
2. Interact with the smart contract through the web interface.

## Testing

This project is to be tested on the Sepolia testnet. Ensure your MetaMask wallet is connected to the Sepolia testnet before running the project.

## Notes

- The `todeploy.sol` file is optional and provided for users who wish to deploy their own smart contract.
- Ensure all dependencies are correctly set up in your environment to avoid issues during deployment or execution.
