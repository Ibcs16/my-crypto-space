const main = async () => {
  const contractFactory = await hre.ethers.getContractFactory(
    "MyCryptoMusicSpace"
  );
  const myCryptoMusicSpace = await contractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.001"),
  });
  await myCryptoMusicSpace.deployed();

  console.log("MyCryptoMusicSpace addr: ", myCryptoMusicSpace.address);
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
