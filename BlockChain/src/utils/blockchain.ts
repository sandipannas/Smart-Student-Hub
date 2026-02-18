import { Block, Certificate, BlockchainState } from '../types/blockchain';
import { calculateHash, mineBlock } from './crypto';

export async function createGenesisBlock(): Promise<Block> {
  const genesisBlock = {
    index: 0,
    timestamp: Date.now(),
    certificate: {
      id: 'GENESIS',
      holder: 'System',
      course: 'Genesis Block',
      issueDate: new Date().toISOString().split('T')[0],
      grade: 'N/A'
    },
    previousHash: '0'
  };

  return await mineBlock(genesisBlock);
}

export async function addBlock(chain: Block[], certificate: Certificate): Promise<Block[]> {
  const previousBlock = chain[chain.length - 1];
  const newBlock = {
    index: chain.length,
    timestamp: Date.now(),
    certificate,
    previousHash: previousBlock.hash
  };

  const minedBlock = await mineBlock(newBlock);
  return [...chain, minedBlock];
}

export async function validateChain(chain: Block[]): Promise<BlockchainState> {
  if (chain.length === 0) {
    return { chain, isValid: true };
  }

  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const previousBlock = chain[i - 1];

    // Check if current block's hash is valid
    const calculatedHash = await calculateHash({
      index: currentBlock.index,
      timestamp: currentBlock.timestamp,
      certificate: currentBlock.certificate,
      previousHash: currentBlock.previousHash,
      nonce: currentBlock.nonce
    });

    if (currentBlock.hash !== calculatedHash) {
      return { chain, isValid: false, tamperedBlockIndex: i };
    }

    // Check if current block's previousHash matches previous block's hash
    if (currentBlock.previousHash !== previousBlock.hash) {
      return { chain, isValid: false, tamperedBlockIndex: i };
    }
  }

  return { chain, isValid: true };
}

export function simulateTamper(chain: Block[], blockIndex: number, newData: Partial<Certificate>): Block[] {
  if (blockIndex < 0 || blockIndex >= chain.length) {
    return chain;
  }

  const newChain = [...chain];
  newChain[blockIndex] = {
    ...newChain[blockIndex],
    certificate: {
      ...newChain[blockIndex].certificate,
      ...newData
    }
  };

  return newChain;
}