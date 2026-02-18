import React, { useState, useEffect } from 'react';
import { Block, Certificate, BlockchainState } from './types/blockchain';
import { createGenesisBlock, addBlock, validateChain, simulateTamper } from './utils/blockchain';
import AdminPanel from './components/AdminPanel';
import BlockchainVisualization from './components/BlockchainVisualization';
import CertificateValidation from './components/CertificateValidation';
import ChainStatus from './components/ChainStatus';
import { Activity } from 'lucide-react';

function App() {
  const [blockchainState, setBlockchainState] = useState<BlockchainState>({
    chain: [],
    isValid: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Initialize blockchain with genesis block
  useEffect(() => {
    const initializeBlockchain = async () => {
      const genesis = await createGenesisBlock();
      const validatedState = await validateChain([genesis]);
      setBlockchainState(validatedState);
    };

    initializeBlockchain();
  }, []);

  // Get existing certificate IDs
  const existingCertificateIds = blockchainState.chain
    .map(block => block.certificate.id)
    .filter(id => id !== 'GENESIS');

  const handleAddCertificate = async (certificate: Certificate) => {
    setIsLoading(true);
    try {
      const newChain = await addBlock(blockchainState.chain, certificate);
      const validatedState = await validateChain(newChain);
      setBlockchainState(validatedState);
    } catch (error) {
      console.error('Failed to add certificate:', error);
      alert('Failed to add certificate. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTamperBlock = async (blockIndex: number) => {
    const tamperedChain = simulateTamper(blockchainState.chain, blockIndex, {
      holder: 'TAMPERED DATA',
      grade: 'F'
    });
    const validatedState = await validateChain(tamperedChain);
    setBlockchainState(validatedState);
  };

  const handleValidateChain = async () => {
    setIsValidating(true);
    try {
      // Add a small delay to show the validation process
      await new Promise(resolve => setTimeout(resolve, 1000));
      const validatedState = await validateChain(blockchainState.chain);
      setBlockchainState(validatedState);
    } catch (error) {
      console.error('Failed to validate chain:', error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Blockchain Certificate Management System
              </h1>
              <p className="text-gray-600">
                Secure, transparent, and tamper-proof digital certificate issuance and verification
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Admin Panel and Chain Status */}
          <div className="space-y-8">
            <AdminPanel
              onAddCertificate={handleAddCertificate}
              isLoading={isLoading}
              existingCertificateIds={existingCertificateIds}
            />
            <ChainStatus
              blockchainState={blockchainState}
              onValidateChain={handleValidateChain}
              isValidating={isValidating}
            />
          </div>

          {/* Right Column - Blockchain Visualization */}
          <div className="lg:col-span-2">
            <BlockchainVisualization
              blockchainState={blockchainState}
              onTamperBlock={handleTamperBlock}
            />
          </div>
        </div>

        {/* Certificate Validation Section */}
        <div className="mt-8">
          <CertificateValidation
            chain={blockchainState.chain}
            isValid={blockchainState.isValid}
            tamperedBlockIndex={blockchainState.tamperedBlockIndex}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Built with React, TypeScript, and Tailwind CSS
            </p>
            <p className="text-sm text-gray-500">
              Demonstrating blockchain security features including SHA-256 hashing, proof-of-work mining, and tamper detection
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;