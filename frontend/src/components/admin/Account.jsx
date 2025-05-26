import React, { useState, useEffect } from 'react';

const AccountSection = () => {
  const initialFormState = { category: '', metric: '', userId: '', value: '' };

  // Predefined metrics for the form select
  const metricsOptions = {
    Income: ['Sales Revenue', 'Service Revenue', 'Other Income', 'Salary Deductions'],
    Expenses: [
      'Cost of Goods Sold',
      'Operating Expenses',
      'Interest Expense',
      'Tax Expense',
      'Salary Expense',
      'Salary Bonuses',
    ],
  };
  const salaryMetrics = ['Salary Expense', 'Salary Bonuses', 'Salary Deductions'];

  // Fetched data
  const [balanceSheet, setBalanceSheet] = useState([]);   // aggregated accounts
  const [userOptions, setUserOptions] = useState([]);     // users list
  const [bookingIncome, setBookingIncome] = useState([]); // bus bookings

  // UI & form state
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBusModalOpen, setIsBusModalOpen] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('');
  const [formData, setFormData] = useState(initialFormState);

  // Fetch groups, users, bookings
  const loadAccountData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/account-data', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) throw new Error('Fetch failed');
      const [groups, users, buses] = await res.json();
      setBalanceSheet(groups);
      setUserOptions(users);
      setBookingIncome(buses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAccountData();
  }, []);

  const busIncomeTotal = bookingIncome.reduce(
    (sum, rec) => sum + Number(rec.totalPrice || 0),
    0
  );

  const incomeGroup = balanceSheet.filter(g => g._id.category === 'Income');
  const expensesGroup = balanceSheet.filter(g => g._id.category === 'Expenses');

  const sumRecords = records =>
    records.reduce((sum, r) => sum + Number(r.value), 0);

  const totalIncome = sumRecords(incomeGroup.flatMap(g => g.records)) + busIncomeTotal;
  const totalExpenses = sumRecords(expensesGroup.flatMap(g => g.records));
  const netProfit = totalIncome - totalExpenses;

  const openAccountModal = () => setIsAccountModalOpen(true);
  const closeAccountModal = () => {
    setIsAccountModalOpen(false);
    setFormData(initialFormState);
  };

  const openDetailModal = (category, metric) => {
    setSelectedMetric(metric);
    const group = balanceSheet.find(
      g => g._id.category === category && g._id.metric === metric
    );
    setDetailData(group ? group.records : []);
    setIsDetailModalOpen(true);
  };
  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setDetailData([]);
  };

  const openBusModal = () => setIsBusModalOpen(true);
  const closeBusModal = () => setIsBusModalOpen(false);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/admin/account-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submit failed');

      alert('Account entry added successfully');
      setFormData(initialFormState);
      setIsAccountModalOpen(false);

      // ✅ Re-fetch updated data
      await loadAccountData();
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Can't update account");
    }
  };

  return (
    <div className="w-4/5 mx-auto mt-10">
      {/* Balance Sheet */}
      <div className="bg-white p-6 rounded shadow-md">
        <button
          onClick={openAccountModal}
          className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
        >
          Add Account Entry
        </button>

        <h2 className="text-xl font-bold mb-4">Balance Sheet</h2>
        <table className="w-full table-auto text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">Category</th>
              <th className="px-4 py-2 border-b border-gray-300">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-4 py-2 font-medium">Income</td>
              <td className="px-4 py-2">–</td>
            </tr>
            <tr>
              <td className="px-4 py-2 pl-8">
                <ul className="list-disc list-inside space-y-1">
                  {incomeGroup.map(g => (
                    <li
                      key={g._id.metric}
                      className="cursor-pointer text-blue-500 hover:underline"
                      onClick={() => openDetailModal('Income', g._id.metric)}
                    >
                      {g._id.metric}
                    </li>
                  ))}
                  <li
                    className="cursor-pointer text-blue-500 hover:underline"
                    onClick={openBusModal}
                  >
                    Bus Booking Income
                  </li>
                </ul>
              </td>
              <td className="px-4 py-2">
                <ul className="list-none space-y-1">
                  {incomeGroup.map(g => (
                    <li key={g._id.metric}>{sumRecords(g.records)}</li>
                  ))}
                  <li>{busIncomeTotal}</li>
                </ul>
              </td>
            </tr>

            <tr>
              <td className="px-4 py-2 font-medium">Expenses</td>
              <td className="px-4 py-2">–</td>
            </tr>
            <tr>
              <td className="px-4 py-2 pl-8">
                <ul className="list-disc list-inside space-y-1">
                  {expensesGroup.map(g => (
                    <li
                      key={g._id.metric}
                      className="cursor-pointer text-blue-500 hover:underline"
                      onClick={() => openDetailModal('Expenses', g._id.metric)}
                    >
                      {g._id.metric}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">
                <ul className="list-none space-y-1">
                  {expensesGroup.map(g => (
                    <li key={g._id.metric}>{sumRecords(g.records)}</li>
                  ))}
                </ul>
              </td>
            </tr>

            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-2">Total Income</td>
              <td className="px-4 py-2">{totalIncome}</td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-2">Total Expenses</td>
              <td className="px-4 py-2">{totalExpenses}</td>
            </tr>
            <tr className="bg-gray-100 font-semibold">
              <td className="px-4 py-2">Net Profit (Income – Expenses)</td>
              <td className="px-4 py-2">{netProfit}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add Account Entry Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Account Entry</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="category" className="block font-medium">Category</label>
                <select
                  id="category"
                  name="category"
                  className="w-full p-2 border rounded"
                  value={formData.category}
                  onChange={e =>
                    setFormData({
                      category: e.target.value,
                      metric: '',
                      userId: '',
                      value: '',
                    })
                  }
                  required
                >
                  <option value="" disabled>Select a category</option>
                  <option value="Income">Income</option>
                  <option value="Expenses">Expenses</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="metric" className="block font-medium">Metric</label>
                <select
                  id="metric"
                  name="metric"
                  className="w-full p-2 border rounded"
                  value={formData.metric}
                  onChange={e =>
                    setFormData(f => ({ ...f, metric: e.target.value, userId: '' }))
                  }
                  required
                  disabled={!formData.category}
                >
                  <option value="" disabled>Select a metric</option>
                  {formData.category &&
                    metricsOptions[formData.category].map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                </select>
              </div>

              {formData.metric && salaryMetrics.includes(formData.metric) && (
                <div className="mb-4">
                  <label htmlFor="userId" className="block font-medium">User</label>
                  <select
                    id="userId"
                    name="userId"
                    className="w-full p-2 border rounded"
                    value={formData.userId}
                    onChange={e =>
                      setFormData(f => ({ ...f, userId: e.target.value }))
                    }
                    required
                  >
                    <option value="" disabled>Select a user</option>
                    {userOptions.map(u => (
                      <option key={u._id} value={u._id}>
                        {u.name} — {u.role}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="value" className="block font-medium">Value</label>
                <input
                  type="number"
                  id="value"
                  name="value"
                  className="w-full p-2 border rounded"
                  value={formData.value}
                  onChange={e => setFormData(f => ({ ...f, value: e.target.value }))}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeAccountModal}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{selectedMetric} Details</h2>
            <ul className="list-disc pl-5 space-y-2">
              {detailData.map((item, idx) => {
                const user = userOptions.find(u => u._id === item.userId);
                return (
                  <li key={idx}>
                    <strong>{item.metric}</strong> — {item.value}{' '}
                    ({user ? `${user.name} — ${user.role}` : '—'})
                  </li>
                );
              })}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeDetailModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bus Booking Income Modal */}
      {isBusModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Bus Booking Details</h2>
            <ul className="list-disc pl-5 space-y-2">
              {bookingIncome.map((b, idx) => (
                <li key={idx}>
                  <strong>{b.busTitle} #{b.bus_number}</strong> : Rs. {b.totalPrice} <br />
                  From {b.from} to {b.to}
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeBusModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSection;
