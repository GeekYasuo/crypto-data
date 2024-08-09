
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setData } from '../store';

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:5000/api/data?symbol=bitcoin');
      dispatch(setData(response.data));
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: any) => (
          <tr key={item._id}>
            <td>{item.symbol}</td>
            <td>{item.price}</td>
            <td>{new Date(item.timestamp).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
