require("dotenv").config();
const verify = require("../src/verify");

const BErc20BATDelegate = artifacts.require("BErc20BATDelegate");
const BErc20BATDelegator = artifacts.require("BErc20BATDelegator");
const BirdCore = artifacts.require("BirdCore");
const JumpRateModel = artifacts.require("JumpRateModel");

// Admin address for deploying pBAT
const ADMIN_ADDRESS = "0x6f20FEeECcd51783779Ca10431b60B15f83d06F1"

module.exports = async (deployer, network) => {
    let BAT_TOKEN_ADDRESS;

    if (network === "kovan" || "development") {
        BAT_TOKEN_ADDRESS = "0x4Ee3f6d2eb7Eb5BBCd6A45c3398802cb42931abd"
    }

    /* Deploy Bird BAT */
    await deployer.deploy(
        BErc20BATDelegator,
        BAT_TOKEN_ADDRESS,
        BirdCore.address,
        JumpRateModel.address,
        "200000000000000000000000000",
        "Bird BAT",
        "pBAT",
        8,
        ADMIN_ADDRESS,
        BErc20BATDelegate.address,
        '0x0'
    );

    if (network !== "development")
    await verify.etherscanVerify(
        BErc20BATDelegator,
        network,
        process.env.ETHERSCAN_KEY,
        1
    );
};