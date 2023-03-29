const SOLANA_CONNECTION = new Connection("https://api.devnet.solana.com");
const AIRDROP_AMOUNT = 1 * LAMPORTS_PER_SOL; // 1 SOL 
const form = document.getElementById("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputField = document.getElementById("public-key");
    const WALLET_ADDRESS = inputField.value;
    console.log("The input value is:", WALLET_ADDRESS);
    inputField.value = "";
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