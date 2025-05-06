# Improving Security of Smart Contract Wallets using Two-Factor Authentication (2FA)

This project demonstrates the implementation of a **Two-Factor Authentication (2FA)** framework for Ethereum-based smart contract wallets using **Time-based One-Time Passwords (TOTP)** and **hash chains**. It leverages smart contracts deployed on the Ethereum blockchain using **Remix IDE** to enhance security without external dependencies.

📽️ **Demo Video**: [!demo of the project](https://drive.google.com/file/d/10bor2B2yFm-F2XYghPzDDfPOKmpK14Dj/view?usp=sharing)

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Installation and Setup](#installation-and-setup)
- [How It Works](#how-it-works)
- [Code Files Overview](#code-files-overview)
- [Execution Demo](#execution-demo)
- [Security Analysis](#security-analysis)
- [Limitations](#limitations)
- [Future Improvements](#future-improvements)
- [Developer](#developer)

---

## Features

- Implements TOTP-based second-factor authentication without requiring any server-side component.
- On-chain hash chain verification ensures:
  - Protection against **front-running attacks**.
  - Validity of operations through **time-step-based OTPs**.
- Supports:
  - Operation initialization (`initOp`)
  - Operation confirmation (`confirmOp`)
- Gas-efficient design using one-way hash chains.
- Written and deployed using **Remix IDE** for direct Ethereum testing.

---

## 📁 Project Structure

| Folder / File                        | Description |
|--------------------------------------|-------------|
| `.deps/`                             | Remix dependency folder (auto-generated). |
| `.states/`                           | Virtual machine state folder used in Remix IDE. |
| `Implementation_Pic and Video/`      | Screenshots and video demonstrations of the implementation. |
| `Two Factor Auth_Blockchain/`        | Contains frontend files and OTP-based authenticator module. |
| `contracts/`                         | Solidity smart contract code (e.g., `deploy.sol`). |
| `scripts/`                           | Additional scripts for testing or deployment. |
| `tests/`                             | Testing scripts. |
| `.prettierrc.json`                   | Code formatting configuration. |

---

## Dependencies

| Dependency         | Version / Info |
|--------------------|----------------|
| Solidity           | ^0.8.0         |
| Remix IDE          | https://remix.ethereum.org |
| (Optional) MetaMask| Ethereum wallet integration |

---

## 🛠️ Setup Instructions

### 🔨 Step 1: Deploy the Smart Contract

1. Open [Remix IDE](https://remix.ethereum.org/).
2. Upload or paste the `todeploy.sol` file from the `contracts/` folder.
3. Connect MetaMask to the **Sepolia testnet**.
4. In Remix, switch the environment to **Injected Web3**.
5. Deploy the contract.
6. After deployment, **copy**:
   - The **contract address**
   - The **ABI (Application Binary Interface)**

### 🔧 Step 2: Update `client.js`

1. Open `client.js` from the `Two Factor Auth_Blockchain/` folder.
2. Replace the placeholders:
   - `contractAddress` with your deployed address.
   - `abi` with the generated ABI from Remix.

> ✅ Alternatively, the default values in `client.js` might work if a contract is already deployed.

### 🌐 Step 3: Run the Web Interface

1. Open `index.html` (from `Two Factor Auth_Blockchain/`) in your browser.
2. The UI allows you to:
   - Interact with the deployed smart contract.
   - Perform wallet actions with OTP-based two-factor verification.

---

## 🧪 Testing the Project

- Make sure MetaMask is:
  - Connected to the **Sepolia testnet**.
  - Funded with test ETH (use [Sepolia Faucet](https://sepoliafaucet.com/)) if required.

- Transactions need:
  - MetaMask signature approval.
  - OTP-based confirmation on the webpage.

---

## 📸 Screenshots & Demonstration

- Navigate to the `Implementation_Pic and Video/` folder to view:
  - 📷 **Screenshots** of the UI and MetaMask interactions.
  - 📹 **Videos** showing successful 2FA-based contract executions.

---

## 📌 Notes

- The `deploy.sol` file is optional for those who don’t wish to deploy manually.
- This is a testnet prototype. Security measures such as OTP generation are basic and may require improvement for production environments (e.g., backend validation).
- You can modify or expand the authentication logic in `authenticator.js`.

---

## 🔐 Security Enhancement

The key feature of this project is the integration of a **client-side OTP** to validate actions before allowing blockchain interaction. This prevents accidental or malicious transactions by adding a human-verification layer.

---

## 💡 Future Improvements

- Integrate with email or SMS-based OTP services.
- Add server-side validation for OTPs.
- Support for biometric authentication.

---

## 👨‍💻 Author

- GitHub: [gulamansari57181](https://github.com/gulamansari57181)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE) 
