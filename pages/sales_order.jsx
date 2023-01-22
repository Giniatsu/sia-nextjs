import React from "react";
import { Tab } from "@headlessui/react";

const sales_order = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full lg:max-w-5xl bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <Tab.Group>
            <Tab.List className="bg-[#cfcfcf] rounded-t-lg">
              <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold rounded-none">
                All Orders
              </Tab>
              <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold rounded-none">
                Active
              </Tab>
              <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold rounded-none">
                Finished
              </Tab>
              <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold rounded-none">
                Cancelled
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div class="flex items-center justify-between m-5">
                  <div class="relative">
                    <div class="text-lg font-medium leading-5 text-black">
                      Show{" "}
                      <select class="form-select text-black rounded drop-shadow-lg bg-white px-2 py-1">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </select>{" "}
                      Entries
                    </div>
                  </div>
                  <label for="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative drop-shadow-lg">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-black"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="table-search"
                      className="block p-2 pl-10 text-sm text-gray-900 rounded-lg w-80"
                      placeholder="Enter Information"
                    />
                  </div>
                </div>
                <table className="w-full text-left">
                  <thead className="bg-[#cfcfcf]">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Transaction ID
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        RViswjy5080120014
                      </th>
                      <td class="px-6 py-4">Joohyun Bae</td>
                      <td class="px-6 py-4">10-16-2021</td>
                      <td class="px-6 py-4">Active</td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        RViswjy5080120014
                      </th>
                      <td class="px-6 py-4">Joohyun Bae</td>
                      <td class="px-6 py-4">10-16-2021</td>
                      <td class="px-6 py-4">Active</td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        RViswjy5080120014
                      </th>
                      <td class="px-6 py-4">Joohyun Bae</td>
                      <td class="px-6 py-4">10-16-2021</td>
                      <td class="px-6 py-4">Active</td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium whitespace-nowrap"
                      >
                        RViswjy5080120014
                      </th>
                      <td class="px-6 py-4">Joohyun Bae</td>
                      <td class="px-6 py-4">10-16-2021</td>
                      <td class="px-6 py-4">Active</td>
                    </tr>
                  </tbody>
                </table>
                <nav
                  class="flex items-center justify-between m-5"
                  aria-label="Table navigation"
                >
                  <span class="text-sm font-normal text-black">
                    Showing{" "}
                    <span class="font-semibold text-black">1 to 10</span> of{" "}
                    <span class="font-semibold text-black">55 entries</span>
                  </span>
                  <ul class="flex list-style-none">
                    <li class="page-item mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-black hover:text-black focus:shadow-none"
                        href="#"
                      >
                        Previous
                      </a>
                    </li>
                    <li class="page-item rounded bg-white drop-shadow-lg mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 font-bold text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                        href="#"
                      >
                        1
                      </a>
                    </li>
                    <li class="page-item rounded bg-white drop-shadow-lg mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 font-bold text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                        href="#"
                      >
                        2
                      </a>
                    </li>
                    <li class="page-item rounded bg-white drop-shadow-lg mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 font-bold text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                        href="#"
                      >
                        3
                      </a>
                    </li>
                    <li class="page-item rounded bg-white drop-shadow-lg mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 font-bold text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                        href="#"
                      >
                        4
                      </a>
                    </li>
                    <li class="page-item rounded bg-white drop-shadow-lg mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 font-bold text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                        href="#"
                      >
                        5
                      </a>
                    </li>
                    <li class="page-item rounded bg-white drop-shadow-lg mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 font-bold text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                        href="#"
                      >
                        6
                      </a>
                    </li>
                    <li class="page-item rounded bg-white drop-shadow-lg mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 font-bold text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                        href="#"
                      >
                        7
                      </a>
                    </li>
                    <li class="page-item mx-2">
                      <a
                        class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-black hover:text-black hover:bg-gray-200 focus:shadow-none"
                        href="#"
                      >
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </Tab.Panel>
              <Tab.Panel></Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
              <Tab.Panel>Content 4</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default sales_order;
