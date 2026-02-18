import React, { useState } from 'react';
import { Certificate } from '../types/blockchain';
import { Plus, Hash, Award } from 'lucide-react';

interface AdminPanelProps {
  onAddCertificate: (certificate: Certificate) => void;
  isLoading: boolean;
  existingCertificateIds: string[];
}

export default function AdminPanel({ onAddCertificate, isLoading, existingCertificateIds }: AdminPanelProps) {
  const [formData, setFormData] = useState({
    id: '',
    holder: '',
    course: '',
    grade: ''
  });
  const [idError, setIdError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.holder || !formData.course || !formData.grade) {
      alert('Please fill in all fields');
      return;
    }

    // Check for duplicate certificate ID
    if (existingCertificateIds.includes(formData.id)) {
      setIdError('Certificate ID already exists. Please use a unique ID.');
      return;
    }

    const certificate: Certificate = {
      ...formData,
      issueDate: new Date().toISOString().split('T')[0]
    };

    onAddCertificate(certificate);
    setFormData({ id: '', holder: '', course: '', grade: '' });
    setIdError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear ID error when user starts typing a new ID
    if (name === 'id' && idError) {
      setIdError('');
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Award className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Issue New Certificate</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
            Certificate ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              idError ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Enter unique certificate ID"
            required
          />
          {idError && (
            <p className="mt-1 text-sm text-red-600">{idError}</p>
          )}
        </div>

        <div>
          <label htmlFor="holder" className="block text-sm font-medium text-gray-700 mb-2">
            Certificate Holder
          </label>
          <input
            type="text"
            id="holder"
            name="holder"
            value={formData.holder}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter student name"
            required
          />
        </div>

        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-2">
            Course Name
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Enter course name"
            required
          />
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
            Grade
          </label>
          <select
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          >
            <option value="">Select Grade</option>
            <option value="A+">A+</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="Pass">Pass</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Mining Block...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              Issue Certificate
            </>
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Hash className="w-4 h-4" />
          <span>Certificates are secured with SHA-256 hashing and proof-of-work mining.</span>
        </div>
      </div>
    </div>
  );
}