import React from 'react';
import { BlockchainState } from '../types/blockchain';
import { Shield, ShieldAlert, Activity, Hash } from 'lucide-react';

interface ChainStatusProps {
  blockchainState: BlockchainState;
  onValidateChain: () => void;
  isValidating: boolean;
}

export default function ChainStatus({ blockchainState, onValidateChain, isValidating }: ChainStatusProps) {
  const { chain, isValid, tamperedBlockIndex } = blockchainState;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${isValid ? 'bg-emerald-100' : 'bg-red-100'}`}>
          {isValid ? (
            <Shield className="w-6 h-6 text-emerald-600" />
          ) : (
            <ShieldAlert className="w-6 h-6 text-red-600" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Chain Integrity Status</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Hash className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Total Blocks</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{chain.length}</p>
        </div>

        <div className={`p-4 rounded-lg ${isValid ? 'bg-emerald-50' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Chain Status</span>
          </div>
          <p className={`text-2xl font-bold ${isValid ? 'text-emerald-600' : 'text-red-600'}`}>
            {isValid ? 'Valid' : 'Invalid'}
          </p>
        </div>

        <div className={`p-4 rounded-lg ${tamperedBlockIndex !== undefined ? 'bg-red-50' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">Tampered Blocks</span>
          </div>
          <p className={`text-2xl font-bold ${tamperedBlockIndex !== undefined ? 'text-red-600' : 'text-gray-800'}`}>
            {tamperedBlockIndex !== undefined ? `Block #${tamperedBlockIndex}` : 'None'}
          </p>
        </div>
      </div>

      <button
        onClick={onValidateChain}
        disabled={isValidating || chain.length === 0}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isValidating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Validating Chain...
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            Validate Entire Chain
          </>
        )}
      </button>

      {!isValid && tamperedBlockIndex !== undefined && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg">
          <h4 className="font-semibold text-red-800 mb-2">Security Alert!</h4>
          <p className="text-red-700 text-sm">
            Tampering detected at Block #{tamperedBlockIndex}. The blockchain integrity has been compromised. 
            All subsequent blocks are now invalid due to the broken hash chain.
          </p>
        </div>
      )}

      {chain.length === 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600 text-sm text-center">
            Issue your first certificate to initialize the blockchain.
          </p>
        </div>
      )}
    </div>
  );
}