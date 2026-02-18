import React from 'react';
import { Block, BlockchainState } from '../types/blockchain';
import { ArrowRight, Shield, ShieldAlert, Hash, Calendar, User, BookOpen, Award } from 'lucide-react';

interface BlockchainVisualizationProps {
  blockchainState: BlockchainState;
  onTamperBlock: (blockIndex: number) => void;
}

export default function BlockchainVisualization({ blockchainState, onTamperBlock }: BlockchainVisualizationProps) {
  const { chain, isValid, tamperedBlockIndex } = blockchainState;

  const formatHash = (hash: string) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isValid ? 'bg-emerald-100' : 'bg-red-100'}`}>
            {isValid ? (
              <Shield className="w-6 h-6 text-emerald-600" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-red-600" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Blockchain Visualization</h2>
            <p className={`text-sm font-medium ${isValid ? 'text-emerald-600' : 'text-red-600'}`}>
              {isValid ? 'Chain is Valid' : `Tampered Block Detected at Index ${tamperedBlockIndex}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Blocks</p>
          <p className="text-2xl font-bold text-gray-800">{chain.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {chain.map((block, index) => (
          <div key={index} className="relative">
            <div
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                tamperedBlockIndex === index
                  ? 'border-red-300 bg-red-50'
                  : isValid
                  ? 'border-emerald-300 bg-emerald-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      tamperedBlockIndex === index
                        ? 'bg-red-500'
                        : isValid
                        ? 'bg-emerald-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {index}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Block #{block.index}</h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatTimestamp(block.timestamp)}
                    </p>
                  </div>
                </div>
                {index > 0 && (
                  <button
                    onClick={() => onTamperBlock(index)}
                    className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-full transition-colors"
                  >
                    Tamper Block
                  </button>
                )}
              </div>

              {block.certificate.id !== 'GENESIS' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Hash className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">ID:</span>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                        {block.certificate.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Holder:</span>
                      <span>{block.certificate.holder}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Course:</span>
                      <span>{block.certificate.course}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Grade:</span>
                      <span className="font-bold text-blue-600">{block.certificate.grade}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">Genesis Block - Blockchain Origin</p>
                </div>
              )}

              <div className="space-y-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Current Hash:</p>
                    <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                      {block.hash}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-600 mb-1">Previous Hash:</p>
                    <p className="font-mono text-xs bg-gray-100 p-2 rounded break-all">
                      {block.previousHash}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Nonce: {block.nonce}</span>
                  <span>Hash: {formatHash(block.hash)}</span>
                </div>
              </div>
            </div>

            {index < chain.length - 1 && (
              <div className="flex justify-center my-2">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      {chain.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Hash className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No blocks in the chain yet. Issue your first certificate to get started!</p>
        </div>
      )}
    </div>
  );
}