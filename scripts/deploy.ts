// scripts/deploy.js
const hre = require("hardhat");
const main = async () => {
  // Get 'OnChainNFT' contract
  const nftContractFactory = await hre.ethers.getContractFactory("OnChainNFT");

  // Deploy contract
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("✅ Contract deployed to:", nftContract.address);

  // SVG image that you want to mint
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 124 124" fill="none">
  <rect width="124" height="124" rx="24" fill="#F97316"/>
  <path d="M19.375 36.7818V100.625C19.375 102.834 21.1659 104.625 23.375 104.625H87.2181C90.7818 104.625 92.5664 100.316 90.0466 97.7966L26.2034 33.9534C23.6836 31.4336 19.375 33.2182 19.375 36.7818Z" fill="white"/>
  <circle cx="63.2109" cy="37.5391" r="18.1641" fill="black"/>
  <rect opacity="0.4" x="81.1328" y="80.7198" width="17.5687" height="17.3876" rx="4" transform="rotate(-45 81.1328 80.7198)" fill="#FDBA74"/>
  </svg>`;

  // Call the mint function from our contract
  const txn = await nftContract.mint(svg);
  const txnReceipt = await txn.wait();

  // Get the token id of the minted NFT (using our event)
  const event = txnReceipt.events?.find((event) => event.event === "Minted");
  const tokenId = event?.args["tokenId"];

  console.log(
    "🎨 Your minted NFT:",
    `https://testnets.opensea.io/assets/${nftContract.address}/${tokenId}`
  );
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
