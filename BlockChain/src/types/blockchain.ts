export interface Certificate {
  id: string;
  holder: string;
  course: string;
  issueDate: string;
  grade: string;
}

export interface Block {
  index: number;
  timestamp: number;
  certificate: Certificate;
  previousHash: string;
  hash: string;
  nonce: number;
}

export interface BlockchainState {
  chain: Block[];
  isValid: boolean;
  tamperedBlockIndex?: number;
}