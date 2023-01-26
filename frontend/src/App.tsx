import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FormClient from './components/formClient';
import SortableTable from './pages/table';
import {useState, useEffect} from 'react';

import {getAllClients} from './api/api';

function App() {
  const [data, setData] = useState([]);

  const getClients = async () => {
    const response = await getAllClients();
    setData(response);
  };
  useEffect(() => {
    getClients();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SortableTable data={data} />} />
        <Route path="/nuevo-cliente" element={<FormClient />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
