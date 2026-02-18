import React, { useState } from 'react';
import { Block } from '../types/blockchain';
import { Search, CheckCircle, XCircle, Hash, Calendar, User, BookOpen, Award } from 'lucide-react';

interface CertificateValidationProps {
  chain: Block[];
  isValid: boolean;
  tamperedBlockIndex?: number;
}

export default function CertificateValidation({ chain, isValid, tamperedBlockIndex }: CertificateValidationProps) {
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState<Block | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    if (!searchId.trim()) return;

    const foundBlock = chain.find(block => block.certificate.id === searchId.trim());
    if (foundBlock) {
      setSearchResult(foundBlock);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const isCertificateTampered = (blockIndex: number) => {
    return tamperedBlockIndex === blockIndex;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Search className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Certificate Validation</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Certificate ID to validate..."
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          Validate
        </button>
      </div>

      {searchResult && (
        <div
          className={`p-6 rounded-xl border-2 transition-all duration-300 ${
            isCertificateTampered(searchResult.index)
              ? 'border-red-300 bg-red-50'
              : isValid
              ? 'border-emerald-300 bg-emerald-50'
              : 'border-gray-300 bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {isCertificateTampered(searchResult.index) ? (
                <XCircle className="w-8 h-8 text-red-500" />
              ) : isValid ? (
                <CheckCircle className="w-8 h-8 text-emerald-500" />
              ) : (
                <XCircle className="w-8 h-8 text-gray-500" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Certificate {isCertificateTampered(searchResult.index) ? 'Invalid (Tampered)' : isValid ? 'Valid' : 'Invalid'}
                </h3>
                <p className="text-sm text-gray-600">Block #{searchResult.index}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatTimestamp(searchResult.timestamp)}
              </p>
            </div>
          </div>

          {searchResult.certificate.id !== 'GENESIS' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Certificate ID:</span>
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">
                    {searchResult.certificate.id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Holder:</span>
                  <span>{searchResult.certificate.holder}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Course:</span>
                  <span>{searchResult.certificate.course}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gray-400" />
                  <span className="font-medium text-gray-700">Grade:</span>
                  <span className="font-bold text-blue-600">{searchResult.certificate.grade}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700 font-medium">Genesis Block - Blockchain Origin</p>
            </div>
          )}

          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Block Hash:</p>
              <p className="font-mono text-xs bg-gray-100 p-3 rounded border break-all">
                {searchResult.hash}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Previous Block Hash:</p>
              <p className="font-mono text-xs bg-gray-100 p-3 rounded border break-all">
                {searchResult.previousHash}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Mining Nonce: {searchResult.nonce}</span>
              <span>Issue Date: {searchResult.certificate.issueDate}</span>
            </div>
          </div>

          {isCertificateTampered(searchResult.index) && (
            <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-sm text-red-700 font-medium">
                ⚠️ This certificate has been tampered with! The blockchain integrity has been compromised at block #{searchResult.index}.
              </p>
            </div>
          )}
        </div>
      )}

      {notFound && (
        <div className="p-6 border-2 border-gray-300 rounded-xl bg-gray-50">
          <div className="text-center">
            <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Certificate Not Found</h3>
            <p className="text-gray-600">
              No certificate with ID "{searchId}" exists in the blockchain.
            </p>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">How Validation Works:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Each certificate is secured with SHA-256 cryptographic hashing</li>
          <li>• Tampering with any data invalidates the entire chain</li>
          <li>• Hash verification ensures certificate authenticity</li>
          <li>• Blockchain structure prevents fraudulent modifications</li>
        </ul>
      </div>
    </div>
  );
}