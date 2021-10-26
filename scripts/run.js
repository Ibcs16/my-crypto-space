const main = async () => {
  // get contract factory (compiles under artifacts folder)
  const [_, randomPerson] = await hre.ethers.getSigners();
  const myCryptoSpaceContractFactory = await hre.ethers.getContractFactory(
    "MyCryptoMusicSpace"
  );
  // deploy (creates local Eth Network)
  const myCryptoSpaceContract = await myCryptoSpaceContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  // wait to be deployed
  await myCryptoSpaceContract.deployed();
  console.log("Contract addy: ", myCryptoSpaceContract.address);

  let contractBalance = await hre.ethers.provider.getBalance(
    myCryptoSpaceContract.address
  );
  console.log(
    "Contract balance",
    hre.ethers.utils.formatEther(contractBalance)
  );

  let recommendSongTxn = await myCryptoSpaceContract
    .connect(randomPerson)
    .recommendSong("Heal me - Lady Gaga");
  await recommendSongTxn.wait();

  recommendSongTxn = await myCryptoSpaceContract
    .connect(randomPerson)
    .recommendSong("Dreams - Fleetwoodmac # 2");
  await recommendSongTxn.wait();

  contractBalance = await hre.ethers.provider.getBalance(
    myCryptoSpaceContract.address
  );
  console.log(
    "Contract balance",
    hre.ethers.utils.formatEther(contractBalance)
  );

  const allRecommendations =
    await myCryptoSpaceContract.getAllRecommendations();
  console.log(allRecommendations);
};

// runMain to use await inside try catch
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Call main function
runMain();
