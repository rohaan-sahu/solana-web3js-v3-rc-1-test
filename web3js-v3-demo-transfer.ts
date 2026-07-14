import { 
	clusterApiUrl,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	sendAndConfirmTransaction,
	SystemProgram,
	Transaction
} from "@solana/web3.js";
import { readFileSync } from "node:fs";

(async () => { 
	const connection = new Connection(clusterApiUrl("devnet"));
	const signerFileKeyBuffer = JSON.parse(readFileSync(
		"./keys/w3rpvueukHhmAmzcwYkU1tir1ufJEEUoKRUoX497odD.json",
		'utf-8'
	));
	// This 'Keypair' can take the JSON parsed key. It doesn't need to be type casted into a 'Uint8Array'
	const signer = await Keypair.fromSecretKey(signerFileKeyBuffer);
	console.log(`\nsigner address: ${signer.address}\n`);
	const receiverFileKeyBuffer = JSON.parse(readFileSync(
		"./keys/r3d5VmSy3JKoWjdcym1KP9MPxKe7eMWCYVHHBRA4Nws.json",
		'utf-8'
	));
	const receiver = await Keypair.fromSecretKey(receiverFileKeyBuffer);
	console.log(`\nreceiver address: ${receiver.address}\n`);
	const ix = SystemProgram.transfer({
		fromPubkey: receiver.publicKey,
		toPubkey: signer.publicKey,
		lamports: 0.1*LAMPORTS_PER_SOL,
	});

	const tx = new Transaction();
	tx.add(ix);

	const sx = await sendAndConfirmTransaction(
		connection,
		tx,
		[receiver],
		{commitment: 'confirmed'}
	);

	console.log(`signature: ${sx}`);

}
)()
