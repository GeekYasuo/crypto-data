import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useDispatch } from 'react-redux';
import { setData } from '../store';
import axios from 'axios';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [symbol, setSymbol] = useState('bitcoin');
  const dispatch = useDispatch();

  const handleSymbolChange = async (newSymbol: string) => {
    setSymbol(newSymbol);
    const response = await axios.get(`/api/data?symbol=${newSymbol}`);
    dispatch(setData(response.data));
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Change Stock/Crypto</button>
      <DataTable />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={handleSymbolChange} />
    </div>
  );
};

export default Home;

