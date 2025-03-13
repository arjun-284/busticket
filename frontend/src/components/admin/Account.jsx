import React from 'react'

const AccountSection = () => {
  const data = [
    { category: "Basic Accounting", metric: "Income", value: "$100,000" },
    { category: "Basic Accounting", metric: "Expenses", value: "$60,000" },
    { category: "Basic Accounting", metric: "Ledger Balance", value: "$40,000" },
    { category: "Payroll Management", metric: "Salary Expenses", value: "$30,000" },
    { category: "Payroll Management", metric: "Bonuses", value: "$5,000" },
    { category: "Payroll Management", metric: "Deductions", value: "$2,000" },
    { category: "Tax & Compliance", metric: "VAT", value: "$3,000" },
    { category: "Tax & Compliance", metric: "GST", value: "$2,000" },
    { category: "Real-Time Financial Reports", metric: "Profit", value: "$20,000" },
    { category: "Real-Time Financial Reports", metric: "Loss", value: "$5,000" },
    { category: "Real-Time Financial Reports", metric: "Cash Flow", value: "$15,000" },
    { category: "Vendor & Supplier Payments", metric: "Operational Costs", value: "$10,000" },
  ];

  // Group data by category
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push({ metric: item.metric, value: item.value });
    return acc;
  }, {});

  return (
    <div className="w-4/5">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Balance Sheet</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(groupedData).map(([category, items]) => (
            <div key={category} className="bg-gray-50 p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              <div className="grid gap-2">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{item.metric}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountSection