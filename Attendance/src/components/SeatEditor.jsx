import React, { useState, useRef, useEffect } from "react";

export default function SeatEditor({ imageUrl, onSave, existingSeats = [] }) {
  const [seats, setSeats] = useState(existingSeats);
  const [drawing, setDrawing] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [editingSeat, setEditingSeat] = useState(null);
  const canvasRef = useRef(null);

  // Sample data for dropdowns
  const studentNames = [
    'John Smith', 'Emma Johnson', 'Michael Brown', 'Sarah Davis', 'James Wilson',
    'Emily Miller', 'David Moore', 'Jessica Taylor', 'Christopher Anderson', 'Ashley Thomas',
    'Matthew Jackson', 'Amanda White', 'Daniel Harris', 'Stephanie Martin', 'Ryan Thompson',
    'Jennifer Garcia', 'Kevin Martinez', 'Michelle Robinson', 'Brandon Clark', 'Nicole Rodriguez'
  ];

  const studentIds = [
    'STU001', 'STU002', 'STU003', 'STU004', 'STU005',
    'STU006', 'STU007', 'STU008', 'STU009', 'STU010',
    'STU011', 'STU012', 'STU013', 'STU014', 'STU015',
    'STU016', 'STU017', 'STU018', 'STU019', 'STU020'
  ];

  useEffect(() => {
    setSeats(existingSeats);
  }, [existingSeats]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw seats
    seats.forEach((seat, index) => {
      const [x1, y1, x2, y2] = seat.coords;
      const isSelected = selectedSeat === index;
      
      ctx.strokeStyle = isSelected ? '#ef4444' : '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
      
      // Fill with semi-transparent color
      ctx.fillStyle = isSelected ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)';
      ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
      
      // Draw seat label
      ctx.fillStyle = isSelected ? '#dc2626' : '#1d4ed8';
      ctx.font = '14px Arial';
      ctx.fillText(seat.id, x1 + 5, y1 + 20);
    });
    
    // Draw current drawing
    if (drawing) {
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(drawing.x1, drawing.y1, drawing.currentX - drawing.x1, drawing.currentY - drawing.y1);
      ctx.setLineDash([]);
    }
  }, [seats, drawing, selectedSeat]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    // Check if clicking on existing seat
    const clickedSeatIndex = seats.findIndex(seat => {
      const [x1, y1, x2, y2] = seat.coords;
      return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    });
    
    if (clickedSeatIndex !== -1) {
      setSelectedSeat(clickedSeatIndex);
      return;
    }
    
    setSelectedSeat(null);
    setDrawing({ x1: x, y1: y, currentX: x, currentY: y });
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    setDrawing({
      ...drawing,
      currentX: (e.clientX - rect.left) * scaleX,
      currentY: (e.clientY - rect.top) * scaleY
    });
  };

  const handleMouseUp = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x2 = (e.clientX - rect.left) * scaleX;
    const y2 = (e.clientY - rect.top) * scaleY;

    // Only create seat if rectangle is large enough
    if (Math.abs(x2 - drawing.x1) > 20 && Math.abs(y2 - drawing.y1) > 20) {
      const newSeat = {
        id: `Seat-${seats.length + 1}`,
        coords: [
          Math.min(drawing.x1, x2),
          Math.min(drawing.y1, y2),
          Math.max(drawing.x1, x2),
          Math.max(drawing.y1, y2)
        ],
        studentName: '',
        studentId: ''
      };

      setSeats([...seats, newSeat]);
    }
    
    setDrawing(null);
  };

  const deleteSeat = () => {
    if (selectedSeat !== null) {
      const newSeats = seats.filter((_, index) => index !== selectedSeat);
      setSeats(newSeats);
      setSelectedSeat(null);
    }
  };

  const updateSeatInfo = (field, value) => {
    if (selectedSeat !== null) {
      const newSeats = [...seats];
      newSeats[selectedSeat][field] = value;
      setSeats(newSeats);
    }
  };

  const updateSeatInSummary = (index, field, value) => {
    const newSeats = [...seats];
    newSeats[index][field] = value;
    setSeats(newSeats);
  };

  const deleteSeatFromSummary = (index) => {
    if (confirm('Are you sure you want to delete this seat?')) {
      const newSeats = seats.filter((_, i) => i !== index);
      setSeats(newSeats);
      if (selectedSeat === index) {
        setSelectedSeat(null);
      } else if (selectedSeat > index) {
        setSelectedSeat(selectedSeat - 1);
      }
      setEditingSeat(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Seat Layout Editor</h3>
        <div className="flex space-x-2">
          {selectedSeat !== null && (
            <button
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
              onClick={deleteSeat}
            >
              Delete Seat
            </button>
          )}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            onClick={() => onSave(seats)}
          >
            Save Layout
          </button>
        </div>
      </div>
      
      <div className="flex gap-6">
        <div className="flex-1">
          <div className="relative inline-block">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              className="border border-gray-300 rounded cursor-crosshair"
              style={{ 
                background: imageUrl ? `url(${imageUrl}) no-repeat center/contain` : '#f9fafb',
                maxWidth: '100%',
                height: 'auto'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Click and drag to create seats. Click on existing seats to select them.
          </p>
        </div>
        
        {selectedSeat !== null && (
          <div className="w-72 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-3">Seat Information</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seat ID</label>
                <input
                  type="text"
                  value={seats[selectedSeat]?.id || ''}
                  onChange={(e) => updateSeatInfo('id', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
                <select
                  value={seats[selectedSeat]?.studentName || ''}
                  onChange={(e) => updateSeatInfo('studentName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select student</option>
                  {studentNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                <select
                  value={seats[selectedSeat]?.studentId || ''}
                  onChange={(e) => updateSeatInfo('studentId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select student ID</option>
                  {studentIds.map(id => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {seats.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium text-gray-800 mb-2">Seat Summary ({seats.length} seats)</h4>
          <div className="max-h-64 overflow-y-auto bg-gray-50 rounded border">
            {seats.map((seat, index) => (
              <div key={index} className="p-3 border-b last:border-b-0 hover:bg-gray-100 transition-colors">
                {editingSeat === index ? (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={seat.id}
                        onChange={(e) => updateSeatInSummary(index, 'id', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Seat ID"
                      />
                      <select
                        value={seat.studentName || ''}
                        onChange={(e) => updateSeatInSummary(index, 'studentName', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select student</option>
                        {studentNames.map(name => (
                          <option key={name} value={name}>{name}</option>
                        ))}
                      </select>
                      <select
                        value={seat.studentId || ''}
                        onChange={(e) => updateSeatInSummary(index, 'studentId', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select ID</option>
                        {studentIds.map(id => (
                          <option key={id} value={id}>{id}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingSeat(null)}
                        className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingSeat(null)}
                        className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-blue-600">{seat.id}</span>
                        <span className="text-gray-700">
                          {seat.studentName || 'Unassigned'}
                        </span>
                        {seat.studentId && (
                          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">
                            {seat.studentId}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setEditingSeat(index)}
                        className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded text-xs transition-colors"
                        title="Edit seat"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSeatFromSummary(index)}
                        className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs transition-colors"
                        title="Delete seat"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}