import React from "react";

const SalesOrderDetails = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full lg:max-w-5xl bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <div className="container mx-auto my-2 px-4">
            <div className="grid grid-cols-6 m-5">
              <div className="col-span-4 flex items-center">
                <h4 className="mr-2">Transaction ID#</h4>
                <p className="">RAWFA2112414SA</p>
              </div>
              <div className="col-span-2 justify-self-end">
                <button className="bg-blue-500 rounded mx-2 px-3 py-2 text-sm">
                  PRINT
                </button>
                <button className="bg-red-700 rounded mx-2 px-3 py-2 text-sm">
                  BACK
                </button>
              </div>
              <div className="col-span-6 mb-3">
                <h3>STATUS</h3>
              </div>
              <div className="col-span-3 flex flex-row">
                <div className="border-r-4 rounded-full border-[#5b1010] mr-2"></div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between">
                    <h4 className="mr-5">Order</h4>
                    <span className="bg-lime-600 text-white text-sm font-medium mr-2 px-2.5 py-1.5 rounded">
                      ACTIVE
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <h4 className="mr-2">Shipment</h4>
                    <p className="mb-0">Pending</p>
                  </div>
                </div>
              </div>

              <div className="col-span-3 self-end">
                <h3>CUSTOMER DETAILS</h3>
              </div>
              <div className="col-span-3 mt-3">
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <h4 className="">BOOKING DATE</h4>
                  <p className="">10-16-2021</p>
                  <h4 className="">EXPECTED SHIPMENT DATE</h4>
                  <p className="">10-24-2021</p>
                </div>
              </div>
              <div className="col-span-3">
                <div className="grid grid-cols-5">
                  <h3 className="col-span-1">Name</h3>
                  <p className="col-span-4">Joohyun Bae</p>
                  <h3 className="col-span-1">Contact</h3>
                  <p className="col-span-4">09667490895</p>
                  <h3 className="col-span-1">E-mail</h3>
                  <p className="col-span-4">baejoohyun@gmail.com</p>
                  <h3 className="col-span-1">Address</h3>
                  <p className="col-span-4">
                    Block 14 Lot 5 Gardena Street, Robinsons Highlands,
                    Buhangin, Davao City, Davao del Sur 8000
                  </p>
                </div>
              </div>
              <div className="col-span-6">
                <div class="bg-white shadow-md rounded my-6">
                  <table class="w-full table-auto">
                    <thead>
                      <tr class="bg-gray-200 text-black text-sm font-bold leading-normal">
                        <th class="py-3 px-6 text-left">Unit</th>
                        <th class="py-3 px-6 text-left">Quantity</th>
                        <th class="py-3 px-6 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody class="text-black text-sm font-light">
                      <tr class="hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          Item 1
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">2</td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          $10
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          Item 2
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">3</td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          $15
                        </td>
                      </tr>
                      <tr class="hover:bg-gray-100">
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          Item 3
                        </td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">1</td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          $5
                        </td>
                      </tr>
                      <tr class="bg-gray-200 text-black font-bold text-sm leading-normal">
                        <td class="py-3 px-6 text-left"></td>
                        <td class="py-3 px-6 text-left">Total:</td>
                        <td class="py-3 px-6 text-left whitespace-nowrap">
                          $35
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOrderDetails;
