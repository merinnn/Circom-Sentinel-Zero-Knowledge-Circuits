# Circom-Sentinel: Zero-Knowledge Privacy Protocol 🛡️⚡

## 🔬 Project Abstract
**Circom-Sentinel** is a specialized Zero-Knowledge (ZK) framework built to enable **Trustless Authentication**. By leveraging the **Groth16 zk-SNARK** protocol, this project allows a Prover to demonstrate knowledge of a secret (the "Witness") to a Verifier without revealing any sensitive data. This implementation is integrated with the **Polkadot/Substrate** ecosystem for on-chain validation.

---

## 🏗️ Technical Architecture
The "Sentinel" flow consists of four distinct cryptographic stages:

1. **Circuit Compilation:** Designing arithmetic constraints using `circom`.
2. **Trusted Setup:** Generating the `zkey` and the Verification Key.
3. **Witness Calculation:** Mapping private inputs to the circuit's constraints.
4. **On-Chain Verification:** Utilizing **SubWallet** and **Testnet Faucets** to submit the proof to a decentralized verifier.



---

## 🛠️ The Web3 Power Stack
* **Circuit Language:** Circom 2.1
* **Proving Engine:** SnarkJS (Groth16)
* **Wallet Provider:** **SubWallet** (Identity Management)
* **Gas Infrastructure:** Polkadot/Substrate Testnet Faucet
* **Verification Environment:** [INSERT YOUR TESTNET NAME, e.g., Westend or Rococo]

---

## 📸 Proof of Execution

### 1. Wallet Integration & Identity
*Description: Managing the cryptographic identity and signing the verification request via SubWallet.*
> ![SubWallet Transaction](Screenshot%202026-04-01%20215253.png)

### 2. Final Verification Output
*Description: The "Success" terminal output showing the proof has been cryptographically validated on-chain.*
> ![Final Verification](Screenshot%202026-04-01%20222331.png)

---

## 🔐 Security Significance
In modern web architecture, "Data is a Liability." **Circom-Sentinel** moves toward a **Zero-Trust** model where:
* **Privacy:** Users never share raw data with the Verifier.
* **Integrity:** The mathematical constraints of the circuit cannot be bypassed.
* **Efficiency:** Verification is performed in **Constant Time**, regardless of the complexity of the original data.
