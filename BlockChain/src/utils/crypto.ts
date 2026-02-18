import { Block, Certificate } from '../types/blockchain';

export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function calculateHash(block: Omit<Block, 'hash'>): Promise<string> {
  const blockString = JSON.stringify({
    index: block.index,
    timestamp: block.timestamp,
    certificate: block.certificate,
    previousHash: block.previousHash,
    nonce: block.nonce
  });
  return await sha256(blockString);
}

export async function mineBlock(block: Omit<Block, 'hash' | 'nonce'>, difficulty: number = 2): Promise<Block> {
  const target = "0".repeat(difficulty);
  let nonce = 0;
  let hash = "";

  do {
    nonce++;
    const blockWithNonce = { ...block, nonce };
    hash = await calculateHash(blockWithNonce);
  } while (!hash.substring(0, difficulty).startsWith(target));

  return { ...block, nonce, hash };
}