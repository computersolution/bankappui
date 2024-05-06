import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const InquireCustomer = () => {
  const [customerId, setCustomerId] = useState('');
  const [customerInfo, setCustomerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inquireCustomer = async () => {
    try {
      if (!customerId) {
        alert('Please enter a customer ID');
        return;
      }
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/bank-api/customers/${customerId}`);
      setCustomerInfo(response.data);
      setCustomerId('');
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error('Error inquiring customer:', error);
      alert('Failed to inquire customer');
      setLoading(false);
      if(error.response){
        setError(error.response.data.errorMessage);
      }else{
        setError("Failed to retrieve the customer details");
      }
    }
  };

  return (
    <div className="inquire-customer-container">
      <h2>Inquire Customer</h2>
      <input type="text" placeholder="Customer ID" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
      <button onClick={inquireCustomer} disabled={loading}>{loading ? 'Inquiring...' : 'Inquire Customer'}</button>
      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}
      {customerInfo && !error && (
        <div className="customer-info">
          <h3>Customer Information</h3>
          <table className="table-info">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{JSON.parse(customerInfo.name)}</td>
                <td>{customerInfo?.id}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InquireCustomer;