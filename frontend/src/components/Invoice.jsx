import React, { useState } from 'react'

const Invoice = () => {



   return (
      <>
         <div className='flex justify-around gap-4 w-full h-30 p-4 border-b-1 rounded-lg mb-4'>
            <div>
               <h1 className='text-7xl mt-3 font-bold text-gray-800'>Invoice</h1>
            </div>

            <img className='object-fill'
               src="https://thumbs.dreamstime.com/b/cartoon-coach-bus-clipart-illustration-white-background-drawn-simple-style-bright-colors-s-perfect-336068470.jpg" alt="" />
         </div>


         <div class="max-w-4xl mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow-lg">

            <div class="flex justify-between items-center mb-8">
               <div>
                  <h1 class="text-3xl font-bold text-gray-800">Invoice</h1>
                  <p class="text-gray-600">Invoice #: 12345</p>
               </div>
               <div class="text-right">
                  <p class="text-lg font-semibold text-gray-800">Date: 2025-03-11</p>
                  <p class="text-sm text-gray-500">Due Date: 2025-04-11</p>
               </div>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
               <div>
                  <h2 class="font-semibold text-gray-800">Bill To:</h2>
                  <p class="text-gray-700">John Doe</p>
                  <p class="text-gray-700">1234 Elm St.</p>
                  <p class="text-gray-700">City, State, 12345</p>
               </div>
               <div class="text-right">
                  <h2 class="font-semibold text-gray-800">Ship To:</h2>
                  <p class="text-gray-700">Jane Smith</p>
                  <p class="text-gray-700">5678 Oak St.</p>
                  <p class="text-gray-700">City, State, 67890</p>
               </div>
            </div>

            <table class="w-full table-auto mb-8">
               <thead>
                  <tr>
                     <th class="text-left py-2 px-4 bg-gray-100">Item</th>
                     <th class="text-left py-2 px-4 bg-gray-100">Description</th>
                     <th class="text-right py-2 px-4 bg-gray-100">Quantity</th>
                     <th class="text-right py-2 px-4 bg-gray-100">Unit Price</th>
                     <th class="text-right py-2 px-4 bg-gray-100">Total</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td class="border-t py-2 px-4">Widget A</td>
                     <td class="border-t py-2 px-4">A great widget</td>
                     <td class="border-t py-2 px-4 text-right">2</td>
                     <td class="border-t py-2 px-4 text-right">$10.00</td>
                     <td class="border-t py-2 px-4 text-right">$20.00</td>
                  </tr>
                  <tr>
                     <td class="border-t py-2 px-4">Widget B</td>
                     <td class="border-t py-2 px-4">Another great widget</td>
                     <td class="border-t py-2 px-4 text-right">3</td>
                     <td class="border-t py-2 px-4 text-right">$15.00</td>
                     <td class="border-t py-2 px-4 text-right">$45.00</td>
                  </tr>
               </tbody>
            </table>

            <div class="flex justify-end mb-8">
               <div class="w-1/3 text-right">
                  <p class="text-lg font-semibold text-gray-800">Subtotal: $65.00</p>
                  <p class="text-lg font-semibold text-gray-800">Tax (5%): $3.25</p>
                  <p class="text-2xl font-bold text-gray-800">Total: $68.25</p>
               </div>
            </div>

            <div class="text-center text-sm text-gray-500">
               <p>Thank you for your business!</p>
               <p>If you have any questions, please contact us at support@company.com</p>
            </div>
         </div>


      </>
   )
}

export default Invoice