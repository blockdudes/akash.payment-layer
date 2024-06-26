import { DirectSecp256k1Wallet } from "@cosmjs/proto-signing";
import { coin, SigningStargateClient, assertIsDeliverTxSuccess, DeliverTxResponse } from "@cosmjs/stargate";
import { MsgSend } from "cosmjs-types/cosmos/bank/v1beta1/tx";

// Akash network details
const rpcUrl = "https://rpc.sandbox-01.aksh.pw:443";
const chainId = "sandbox-01";

// Your private key in base64 encoding
// const privateKey = "c3d4c00caea2bf3842e6b5638425c1f177c1b22407b0e7e0a1783666cca7fa60";
const privateKey = process.env.PRIVATE_KEY;

// Function to send AKT tokens
export async function sendAKT( recipientAddress: string, amount: string) {

  // Create a wallet with the private key
  const wallet = await DirectSecp256k1Wallet.fromKey(Buffer.from(privateKey, 'hex'), "akash");

  // Connect to the Akash network
  const client = await SigningStargateClient.connectWithSigner(rpcUrl, wallet);

  

  // get first account
  const [account] = await wallet.getAccounts();

  
  // Create the message for sending AKT tokens
  const msgSend = {
    typeUrl: "/cosmos.bank.v1beta1.MsgSend",
    value: MsgSend.fromPartial({
      fromAddress: account.address,
      toAddress: recipientAddress,
      amount: [coin(Number(amount).toFixed(0), "uakt")], // uakt is the smallest unit of AKT
    }),
  };

  // Define fee and gas limits
    const fee = {
      amount: [
          {
              denom: "uakt",
              amount: "200000",
          },
      ],
      gas: "800000",
  };
  // Broadcast the transaction``
  let result: DeliverTxResponse;
  try {
    result = await client.signAndBroadcast(account.address, [msgSend], fee, "Send AKT via CosmJS", BigInt(Date.now()) + BigInt(10000)).then(response => {
      assertIsDeliverTxSuccess(response);
      return response;
    });
  } catch (error) {
    throw new Error(`Failed to send AKT: ${error}`);
  }


  return result;
}

