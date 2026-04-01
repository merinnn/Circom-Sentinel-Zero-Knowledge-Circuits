import { zkVerifySession, Library, CurveType, ZkVerifyEvents } from 'zkverifyjs';
import fs from 'fs';
import dotenv from 'dotenv';

// 1. Load your environment variables (Seed Phrase)
dotenv.config();

async function run() {
    try {
        // 2. Load your ZK files from the current folder
        const vkey = JSON.parse(fs.readFileSync('./verification_key.json', 'utf-8'));
        const proof = JSON.parse(fs.readFileSync('./proof.json', 'utf-8'));
        const signals = JSON.parse(fs.readFileSync('./public.json', 'utf-8'));

        console.log("Connecting to zkVerify Volta Testnet...");

        // 3. Start a session on the Volta Testnet using your seed phrase
        const session = await zkVerifySession.start()
            .Volta()
            .withAccount(process.env.SEED_PHRASE);

        console.log("Submitting ZK Proof to zkVerify...");

        // 4. Execute the verification
        // Note: We use { events } to listen for the block confirmation
        const { events } = await session.verify()
            .groth16({ 
                library: Library.snarkjs, 
                curve: CurveType.bn128 
            })
            .execute({ 
                proofData: { 
                    vk: vkey, 
                    proof: proof, 
                    publicSignals: signals 
                } 
            });

        // 5. Listen for the "IncludedInBlock" event to get the real Transaction Hash
        events.on(ZkVerifyEvents.IncludedInBlock, (eventData) => {
            console.log("");
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            console.log("✅ SUCCESS: Proof Verified on zkVerify!");
            console.log("🔗 Transaction Hash:", eventData.txHash);
            console.log("📊 Block Hash:", eventData.blockHash);
            console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
            
            // Close the session and exit once finished
            session.close().then(() => process.exit(0));
        });

        // Handle potential errors during submission
        events.on(ZkVerifyEvents.Error, (error) => {
            console.error("❌ Blockchain Error:", error);
            process.exit(1);
        });

    } catch (error) {
        console.error("❌ Script Error:", error.message);
        process.exit(1);
    }
}

run();
