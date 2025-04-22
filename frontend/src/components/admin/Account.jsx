import React, { useState, useEffect } from 'react';

const AccountSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountSummary, setAccountSummary] = useState({
    income: 0,
    expenses: 0,
    vat: 0,
    profit: 0,
    loss: 0,
    operationalCosts: 0,
    salaryExpenses: 0,
    bonuses: 0,
    deductions: 0
  });
  const [formData, setFormData] = useState({ category: '', metric: '', value: '' });

  // Static data for dropdowns in the modal form
  const data = [
    { category: "Basic Accounting", metric: "Income" },
    { category: "Basic Accounting", metric: "Expenses" },
    { category: "Payroll Management", metric: "Salary Expenses" },
    { category: "Payroll Management", metric: "Bonuses" },
    { category: "Payroll Management", metric: "Deductions" },
    { category: "Tax & Compliance", metric: "VAT" },
    { category: "Real-Time Financial Reports", metric: "Profit" },
    { category: "Real-Time Financial Reports", metric: "Loss" },
    { category: "Real-Time Financial Reports", metric: "Cash Flow" },
    { category: "Vendor & Supplier Payments", metric: "Operational Costs" },
  ];

  const categories = [...new Set(data.map(item => item.category))];

  // Fetch account summary data from backend when component mounts
  useEffect(() => {
    const fetchAccountSummary = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/account-data', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch account summary');
        }
        const summary = await response.json();
        setAccountSummary(summary);
      } catch (error) {
        console.error('Error fetching account summary:', error.message);
      }
    };

    fetchAccountSummary();
  }, []);

  // Handle form submission to create or update account entry
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/admin/account-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.message || 'Failed to update account');
      }
      console.log("Submitted Data:", formData);
      setIsModalOpen(false);

      // Re-fetch the updated account summary
      const summaryResponse = await fetch('http://localhost:5000/api/getAccount', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const updatedSummary = await summaryResponse.json();
      setAccountSummary(updatedSummary);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      alert("Something went wrong. Can't update account");
    }
  };

  return (
    <div className="w-4/5">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Account Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Income</h3>
            <p>{accountSummary.income}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Expenses</h3>
            <p>{accountSummary.expenses}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">VAT</h3>
            <p>{accountSummary.vat}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Profit</h3>
            <p>{accountSummary.profit}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Loss</h3>
            <p>{accountSummary.loss}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Operational Costs</h3>
            <p>{accountSummary.operationalCosts}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Salary Expenses</h3>
            <p>{accountSummary.salaryExpenses}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Bonuses</h3>
            <p>{accountSummary.bonuses}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">Deductions</h3>
            <p>{accountSummary.deductions}</p>
          </div>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Amount
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Amount</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium">Category</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value, metric: '' })}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cate, index) => (
                    <option key={index} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium">Metric</label>
                <select
                  className="w-full p-2 border rounded"
                  value={formData.metric}
                  onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                  required
                  disabled={!formData.category}
                >
                  <option value="">Select Metric</option>
                  {data
                    .filter(item => item.category === formData.category)
                    .map((item, index) => (
                      <option key={index} value={item.metric}>
                        {item.metric}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-medium">Value</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSection;
