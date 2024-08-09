import React, { useState } from 'react';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void; onSelect: (symbol: string) => void; }> = ({ isOpen, onClose, onSelect }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('bitcoin');

  if (!isOpen) return null;

  return (
    <div className="modal">
      <select value={selectedSymbol} onChange={(e) => setSelectedSymbol(e.target.value)}>
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
      </select>
      <button onClick={() => { onSelect(selectedSymbol); onClose(); }}>Select</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Modal;
