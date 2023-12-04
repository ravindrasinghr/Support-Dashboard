// Dashboard.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [cid, setCID] = useState('');
  const [sku, setSKU] = useState('');
  const [storeCode, setStoreCode] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/sendData', {
        params: {
          Company_id: cid,
          SKU: sku,
          store_id: storeCode,
          startDate: startDate,
          endDate: endDate
        }
      });
  
      if (!response.data || !response.data.length) {
        alert('No logs found for the provided parameters.');
        return;
      }
  
      setLogs(response.data);
      setShowResult(true);
    } catch (error) {
      console.error('There was a problem fetching the data:', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();

    const fetchedLogs = [
      { sku: 1234567890, store_id: 12342, quantity: 3, success: true, time: "21-11-2023 12:40 PM", reason: " The reason will print here " },
      { sku: 1234567891, store_id: 12341, quantity: 5, success: true, time: "21-11-2023 12:44 PM", reason: " The reason will print here " },
      { sku: 1234567889, store_id: 12345, quantity: 2, success: true, time: "21-11-2023 12:42 PM", reason: " The reason will print here " },
      { sku: 1234567888, store_id: 12344, quantity: 4, success: true, time: "21-11-2023 12:41 PM", reason: " The reason will print here " },
      { sku: 1234567892, store_id: 12343, quantity: 1, success: true, time: "21-11-2023 12:43 PM", reason: " The reason will print here " },

    ];

    // if (!cid || !sku || !storeCode) {
    //   alert('Please fill in all the fields.');
    //   return;
    // }

    setLogs(fetchedLogs);
    setShowResult(true);
  };

  const extensions = [
    'Flipkart',
    'Amazon',
    'Myntra',
    'Nykaa',
    'Nykaa Fashion',
    'Ajio'
  ];

  const handleSort = (columnName) => {
    const sortedLogs = [...logs].sort((a, b) => {
      const first = a[columnName];
      const second = b[columnName];
  
      if (typeof first === 'string' && typeof second === 'string') {
        if (sortOrder === 'asc') {
          return first.localeCompare(second);
        } else {
          return second.localeCompare(first);
        }
      } else {
        if (sortOrder === 'asc') {
          return first > second ? 1 : -1;
        } else {
          return second > first ? 1 : -1;
        }
      }
    });
  
    setLogs(sortedLogs);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  




  return (
    <div className="dashboard-container">
      <h1>Inventory Flow Dashboard</h1>
      <div className='formClass'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Company ID:
              <input type="text" value={cid} onChange={(e) => setCID(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              SKU:
              <input type="text" value={sku} onChange={(e) => setSKU(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Store Code:
              <input type="text" value={storeCode} onChange={(e) => setStoreCode(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Start Date:
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              End Date:
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
          </div>
          <div>
            <button type="submit">Show Logs</button>
          </div>
        </form>

      </div>
      {showResult && (
        <div className="result-table">
          <h2>Inventory Flow Logs</h2>
          <div class="flex-container">
            <div class="flex-container-extension">
              <h3>Select Extension:</h3>
              <select
                value={selectedExtension}
                onChange={(e) => setSelectedExtension(e.target.value)}
              >
                <option value="">Select Extension</option>
                {extensions.map((extension, index) => (
                  <option key={index} value={extension}>
                    {extension}
                  </option>
                ))}
              </select>
            </div>
          </div>


          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('sku')}>SKU {sortOrder === 'asc' ? ' ▲' : ' ▼'}</th>
                <th onClick={() => handleSort('store_id')}>
                  Store ID
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th onClick={() => handleSort('quantity')}>
                  Quantity
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th onClick={() => handleSort('stage')}>
                  Stage
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th onClick={() => handleSort('result')}>
                  Result
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th onClick={() => handleSort('time')}>
                  Time
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th onClick={() => handleSort('logs')}>
                  Logs
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td rowSpan={4}>{log.sku}</td>
                    <td rowSpan={4}>{log.store_id}</td>
                    {/* <td rowSpan={4}>{log.quantity}</td> */}
                  </tr>
                  <tr>
                  <td>{log.quantity}</td>
                    <td>{"Orbis"}</td>
                    <td>{log.success ? 'Success' : 'Failed'}</td>
                    <td>{log.time}</td>
                    <td>{log.reason}</td>
                  </tr>
                  <tr>
                  <td>{log.quantity}</td>
                    <td>{"Extensions DB"}</td>
                    <td>{log.success ? 'Success' : 'Failed'}</td>
                    <td>{log.time}</td>
                    <td>{log.reason}</td>
                    
                  </tr>
                  <tr>
                  <td>{log.quantity}</td>
                    <td>{"Marketplaces"}</td>
                    <td>{log.success ? 'Success' : 'Failed'}</td>
                    <td>{log.time}</td>
                    <td>{log.reason}</td>
                  </tr>

                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('sku')}>
                  SKU
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th onClick={() => handleSort('store_id')}>
                  Store ID
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
                <th onClick={() => handleSort('quantity')}>
                  Quantity
                  {sortOrder === 'asc' ? ' ▲' : ' ▼'}
                </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{log.sku}</td>
                    <td>{log.store_id}</td>
                    <td>{log.quantity}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table> */}
        </div>
      )}

    </div>

  );
};

export default Dashboard;