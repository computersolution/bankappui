import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const CreateCustomer = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const createCustomer = async () => {
    try {
      if (!name) {
        alert('Please fill in all fields');
        return;
      }
      setLoading(true);
      const response = await axios.post('http://localhost:8080/bank-api/customers/createCustomer',JSON.stringify(name), {
        headers: {
          'Content-Type': 'text/plain',
        },
    });
    alert('Customer created successfully');
      setLoading(false);
      setName('');
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Failed to create customer');
      setLoading(false);
    }
  };

  return (
    <div className="create-customer-container">
      <h2>Create Customer</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={createCustomer} disabled={loading}>{loading ? 'Creating...' : 'Create Customer'}</button>
    </div>
  );
};

export default CreateCustomer;