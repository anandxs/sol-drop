const { Connection, PublicKey, LAMPORTS_PER_SOL } = solanaWeb3;
const SOLANA_CONNECTION = new Connection("https://api.devnet.solana.com");
const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById('input-form').style.height = '40vh';
    const statusContainer = document.getElementById('status-container');
    statusContainer.style.height = '60vh';
    statusContainer.style.display = 'block';

    const inputField = document.getElementById("public-key");
    const WALLET_ADDRESS = inputField.value;
    console.log("Wallet address :", WALLET_ADDRESS);
    const quantity = document.getElementById('airdrop-quantity');
    const AIRDROP_AMOUNT = quantity.value * LAMPORTS_PER_SOL;
    console.log('AIRDROP-AMOUNT: ', AIRDROP_AMOUNT);
    inputField.value = "";
    document.getElementById('submit-btn').disabled = true;
    quantity.value = 1;

    (async () => {
        const statusContent = document.getElementById('status-content');
        statusContent.style.overflowY = "scroll";
        
        console.log(`Requesting airdrop for ${WALLET_ADDRESS}`)
        const pReq = document.createElement('p');
        pReq.innerHTML = `Requesting airdrop for <a href="">${WALLET_ADDRESS}</a>`;
        pReq.className = "bg-light info-tag";
        statusContent.appendChild(pReq);

        try {
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
    
            const pSig = document.createElement('p');
            pSig.innerHTML = `<bold>Transaction Complete</bold>: <a href="https://explorer.solana.com/tx/${signature}?cluster=devnet">https://explorer.solana.com/tx/${signature}?cluster=devnet</a>`;
            pSig.className = "bg-success info-tag";
            statusContent.appendChild(pSig);
        } catch (error) {
            console.error(error);
            const pError = document.createElement('p');
            pError.textContent = `Error: ${error.message}`;
            pError.className = "bg-danger info-tag"
            statusContent.appendChild(pError);
        }
    })();
});