let seed;
let tinit;
let id;
let tmax;
let originalSeed;
let k;
let t;
let OTP_send;
let OTP_temp;
let commitment;

import { timeValue } from "./client.js";

document.getElementById("AcceptValues").addEventListener("click", () => {
  const _tinit = parseInt(document.getElementById("tinit").value);
  const _id = parseInt(document.getElementById("id").value);
  const _k = parseInt(document.getElementById("k").value);
  const _seed = document.getElementById("seed").value;
  tinit = BigInt(_tinit);
  k = BigInt(_k);

  id = _id;
  tmax = tinit + k;
  seed = _seed;
});

document.getElementById("ReinitialiseValues").addEventListener("click", () => {
  const _seed = document.getElementById("seedR").value;
  const _id = parseInt(document.getElementById("idR").value);
  seed = _seed;
  tinit = tmax;
  id = _id;

  tmax = tinit + k;
});

document.getElementById("generateSeed").addEventListener("click", () => {
  originalSeed = generateSeed(seed);
  console.log("0x" + originalSeed);
  toastr.success("Seed successfully generated");
});

document.getElementById("generateSeedR").addEventListener("click", () => {
  originalSeed = generateSeed(seed);
  console.log("0x" + originalSeed);
  toastr.success("Seed successfully generated");
});

document.getElementById("generateOTP").addEventListener("click", () => {
  t = timeValue();
  OTP_temp = generateOTPHash(tinit, k, id, originalSeed, t);
  OTP_send = "0x" + OTP_temp;
  console.log(OTP_send);
  toastr.success("OTP successfully generated");
});

document.getElementById("generateCommit").addEventListener("click", () => {
  commitment = "0x" + generateSeed(OTP_temp);
  console.log(commitment);
  toastr.success("Commitment successfully generated");
});

function originalSeedValue() {
  return originalSeed;
}

function OTPvalue() {
  return OTP_send;
}
function commitmentValue() {
  return commitment;
}

function generateSeed(_seed) {
  const ogSeed = CryptoJS.SHA256(_seed);
  return ogSeed;
}
//6a0e245804a4adc964562afd0492916e3f81786c03dc792da35626d29b0107d1

function generateOTPHash(_tinit, _k, _id, _sk, _t) {
  let pt = _sk;
  let i = BigInt(1);
  console.log(_t);
  console.log(tmax);
  for (; i <= tmax - _t; i++) {
    pt = generateHashFunction(_tinit, _k, _id, i, pt);
  }
  return pt;
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
export { originalSeedValue, OTPvalue, commitmentValue };
