import 'dotenv/config';
import { ethers } from 'ethers';

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!RPC_URL || !PRIVATE_KEY) {
  console.error('RPC_URL and PRIVATE_KEY must be set in .env');
  process.exit(1);
}

async function main() {
  // provider 연결 (Base testnet/mainnet의 JSON-RPC)
  const provider = new ethers.JsonRpcProvider(RPC_URL);

  // 지갑 생성 (signer)
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log('내 계정:', await wallet.getAddress());
  console.log('잔액 (wei):', (await wallet.getBalance()).toString());

  // 트랜잭션 생성: 0.001 ETH 전송 예시
  const tx = await wallet.sendTransaction({
    to: '0x받는주소를_여기에', 
    value: ethers.parseEther('0.001'),
    // (옵션) gasLimit: 21000, maxFeePerGas, maxPriorityFeePerGas 등
  });

  console.log('txHash:', tx.hash);
  const receipt = await tx.wait();
  console.log('트랜잭션 영수증:', receipt);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
