const web3 = new Web3(window.ethereum);
const CryptoJS = window.CryptoJS;

// ABI Code updated
const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "Authenticated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "CommitStored",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"name": "ValuesStored",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "t",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "hashedOTP",
				"type": "bytes32"
			}
		],
		"name": "authenticate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_commitment",
				"type": "bytes32"
			}
		],
		"name": "storeCommitment",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tinit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_k",
				"type": "uint256"
			},
			{
				"internalType": "uint32",
				"name": "_id",
				"type": "uint32"
			},
			{
				"internalType": "bytes32",
				"name": "rootHash",
				"type": "bytes32"
			}
		],
		"name": "storeValues",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
// Smart Contract Address updated
const contractAddress = "0xA1165b067A932481eef7d0456FfDcA79Cb33C97d";

const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

import {
  originalSeedValue,
  OTPvalue,
  commitmentValue,
} from "./authenticator.js";

let tinit;
let id;
let k;
let t;
let tmax;
let OTPauth;
let rootHash;

document.getElementById("AcceptValues").addEventListener("click", () => {
  const _tinit = parseInt(document.getElementById("tinit").value);
  const _id = parseInt(document.getElementById("id").value);
  const _k = parseInt(document.getElementById("k").value);

  tinit = BigInt(_tinit);
  k = BigInt(_k);
  console.log(k);
  id = _id;

  tmax = tinit + k;
  toastr.success("Values stored");
});

document.getElementById("ReinitialiseValues").addEventListener("click", () => {
  const _id = parseInt(document.getElementById("idR").value);

  tinit = tmax;
  id = _id;

  tmax = tinit + k;
  toastr.success("Values stored");
});

document.getElementById("generateRoot").addEventListener("click", () => {
  let originalSeed = originalSeedValue();
  rootHash = "0x" + createHashChainRoot(tinit, k, id, originalSeed);
  console.log(rootHash);
  toastr.success("Root successfully generated");
});
document.getElementById("generateRootR").addEventListener("click", () => {
  let originalSeed = originalSeedValue();
  rootHash = "0x" + createHashChainRoot(tinit, k, id, originalSeed);
  console.log(rootHash);
  toastr.success("Root successfully generated");
});

document.getElementById("showHash").addEventListener("click", () => {
  alert(`Root hash : ${rootHash}`);
});
document.getElementById("showHashR").addEventListener("click", () => {
  alert(`Root hash : ${rootHash}`);
});

document.getElementById("getT").addEventListener("click", () => {
  const _t = parseInt(document.getElementById("t").value);
  t = BigInt(_t);

  toastr.success("t saved");
});

document.getElementById("getOTPauth").addEventListener("click", () => {
  const _OTPauth = document.getElementById("OTPauth").value;
  OTPauth = _OTPauth;
  toastr.success("OTP saved");
});

document.getElementById("showOTP").addEventListener("click", () => {
  let OTP_send = OTPvalue();
  alert(`Generated OTP : ${OTP_send}`);
});

document.getElementById("storeValues").addEventListener("click", () => {
  storeValues(tinit, k, id, rootHash);
});

document.getElementById("storeValuesR").addEventListener("click", () => {
  storeValues(tinit, k, id, rootHash);
});
document.getElementById("sendCommit").addEventListener("click", () => {
  let commitment = commitmentValue();
  storeCommitment(commitment);
});

document.getElementById("auth").addEventListener("click", () => {
  authenticate(t, OTPauth);
});

function timeValue() {
  return t;
}

function generateHashFunction(_tinit, _k, id, _i, x) {
  const sum = _tinit + _k - _i;
  const hexString = sum.toString(16);
  const paddedHexString = hexString.padStart(64, "0");

  const wordArray_sum = CryptoJS.enc.Hex.parse(paddedHexString);
  const wordArray_id = CryptoJS.lib.WordArray.create([id]);
  const finalConcatenation = wordArray_sum.concat(wordArray_id).concat(x);
  let hash = CryptoJS.SHA256(finalConcatenation);
  return hash;
}

function createHashChainRoot(tinit, k, id, input) {
  let currentHash = input;
  let i = BigInt(1);
  for (; i <= k; i++) {
    currentHash = generateHashFunction(tinit, k, id, i, currentHash);
  }
  return currentHash;
}

async function storeValues(_tinit, _k, _id, rootHash) {
  try {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    const storeResult = await contractInstance.methods
      .storeValues(_tinit, _k, _id, rootHash)
      .send({ from: account });
    if (storeResult.events.ValuesStored.returnValues.success) {
      console.log("StoreValues success:", true);
      alert("Values stored on blockhain");
    } else {
      console.error("StoreValues success:", false);
      alert("Values not stored on blockhain");
    }
  } catch (error) {
    console.error("Error storing values:", error);
    alert("Values not stored on blockhain");
  }
}
async function storeCommitment(_commitment) {
  try {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    const storeCommRes = await contractInstance.methods
      .storeCommitment(_commitment)
      .send({ from: account });
    if (storeCommRes.events.CommitStored.returnValues.success) {
      console.log("Commitment stored success:", true);
      alert("Commitment stored on blockchain");
    } else {
      console.error("Commitment stored success:", false);
      alert("Commitment not stored on blockchain");
    }
  } catch (error) {
    console.error("Error storing commitment:", error);
    alert("Commitment not stored on blockchain");
  }
}

async function authenticate(t, hashedOTP) {
  try {
    const accounts = await web3.eth.requestAccounts();
    const account = accounts[0];

    const authResult = await contractInstance.methods
      .authenticate(t, hashedOTP)
      .send({ from: account });

    if (authResult.events.Authenticated.returnValues.success) {
      console.log("Authentication success:", true);
      alert("Authentication successful");
    } else {
      console.error("Authentication failed");
      alert("Authentication failed");
    }
  } catch (error) {
    console.error("Error authenticating:", error);
    alert("Authentication failed");
  }
}

export { timeValue };
