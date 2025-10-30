import 'dotenv/config';
import { ethers } from 'ethers';

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const ERC20_ABI = [
  "function transfer(address to, uint256 amount) external returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)"
];

async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const tokenAddress = '0x테스트토큰주소'; // 테스트넷에 배포된 ERC-20 주소
  const to = '0x받는주소';
  const amountHuman = '1.5'; // 사람 단위 (예: 1.5 토큰)

  const token = new ethers.Contract(tokenAddress, ERC20_ABI, wallet);

  const decimals = await token.decimals();
  const amount = ethers.parseUnits(amountHuman, decimals);

  console.log('토큰 심볼:', await token.symbol());
  console.log('전송량(원단위):', amountHuman, '→(wei단위):', amount.toString());

  const tx = await token.transfer(to, amount);
  console.log('txHash:', tx.hash);
  const receipt = await tx.wait();
  console.log('영수증:', receipt);
}

main().catch(console.error);
