// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

// Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  // Address of the deployed contract
  const contractAddress = "0xd64860dD19D4402B40E0C778386658e381d7A042";

  // Get the signer (my account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const contractFactory = await hre.ethers.getContractFactory("SwissCats");
  const contract = contractFactory.attach(contractAddress);

  // Send a shielded transaction to mint 2000 tokens in the contract
  const functionName = "tokenMinter";
  const tokenMinterTx = await sendShieldedTransaction(signer, contractAddress, contract.interface.encodeFunctionData(functionName), 0);

  await tokenMinterTx.wait();

 
  console.log("Transaction Receipt: ", tokenMinterTx);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});