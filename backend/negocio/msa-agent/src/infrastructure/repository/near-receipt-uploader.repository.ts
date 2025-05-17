import { Injectable } from '@nestjs/common';
import { connect, keyStores, KeyPair } from 'near-api-js';
import { Receipt } from '../../domain/root/receipt';

@Injectable()
export class NearReceiptUploader {
  async upload(receipt: Receipt): Promise<void> {
    const credentialsPath = process.env.NEAR_CREDENTIALS_PATH;
    const networkId = process.env.NEAR_NETWORK_ID || 'testnet';

    const keyStore = new keyStores.UnencryptedFileSystemKeyStore(credentialsPath);
    const near = await connect({
      networkId,
      keyStore,
      nodeUrl: `https://rpc.${networkId}.near.org`,
    });

    const account = await near.account(process.env.NEAR_ACCOUNT_ID);
    const result = await account.functionCall({
      contractId: process.env.NEAR_CONTRACT_ID,
      methodName: 'store_receipt',
      args: { receipt },
      gas: BigInt('100000000000000'),
    });

    console.log('Receipt uploaded:', result.transaction.hash);
  }
}
