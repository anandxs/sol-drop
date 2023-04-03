const { Connection, PublicKey, LAMPORTS_PER_SOL } = solanaWeb3;
const SOLANA_CONNECTION = new Connection("https://api.devnet.solana.com");
const form = document.getElementById("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputField = document.getElementById("public-key");
    const WALLET_ADDRESS = inputField.value;
    console.log("Wallet address :", WALLET_ADDRESS);
    const quantity = document.getElementById('airdrop-quantity');
    const AIRDROP_AMOUNT = quantity.value * LAMPORTS_PER_SOL;
    console.log('AIRDROP-AMOUNT: ', AIRDROP_AMOUNT);
    inputField.value = "";
    quantity.value = 1;

    (async () => {
        console.log(`Requesting airdrop for ${WALLET_ADDRESS}`)
        const signature = await SOLANA_CONNECTION.requestAirdrop(
            new PublicKey(WALLET_ADDRESS),
            AIRDROP_AMOUNT
        );
        const { blockhash, lastValidBlockHeight } = await SOLANA_CONNECTION.getLatestBlockhash();
        await SOLANA_CONNECTION.confirmTransaction({
            blockhash,
            lastValidBlockHeight,
            signature
        },'finalized');
        console.log(`Tx Complete: https://explorer.solana.com/tx/${signature}?cluster=devnet`)
    })();
});