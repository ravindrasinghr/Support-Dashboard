// Dashboard.js
import React, { useState } from 'react';
import '../css/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [cid, setCID] = useState('');
  const [sku, setSKU] = useState('');

  const [storeCode, setStoreCode] = useState('');
  const [showResult, setShowResult] = useState(false);

  const [selectedExtension, setSelectedExtension] = useState('');


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const fetchedLogs = [
      { stage: 'Integrations/Extensions', success: true, time: "21-11-2023 12:45 PM", reason: " The reason will print here " },
      { stage: 'Orbis DB', success: false, time: "21-11-2023 12:45 PM", reason: "The reason will print here" },
      { stage: 'Sureshot', success: true, time: "21-11-2023 12:45 PM", reason: " The reason will print here" },
      { stage: 'Extensions', success: false, time: "21-11-2023 12:45 PM", reason: " The reason will print here" },
      { stage: 'Marketplaces', success: true, time: "21-11-2023 12:45 PM", reason: " The reason will print here" },
    ];

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
            <button type="submit">Show Logs</button>
          </div>
        </form>

      </div>
      {showResult && (
        <div className="result-table">
          <h2>Inventory Flow Logs</h2>
          <div>
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
          <table>
            {/* Table data */}
          </table>
          <table>
            <thead>
              <tr>
                <th>Stage</th>
                <th>Result</th>
                <th>Time</th>
                <th>Logs</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index}>
                  <td>{log.stage}</td>
                  <td>{log.success ? 'Success' : 'Failed'}</td>
                  <td>{log.time}</td>
                  <td>{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setShowResult(false)}>Close</button>
        </div>
      )}

    </div>

  );
};

export default Dashboard;
