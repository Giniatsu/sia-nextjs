import React from "react";
import { Tab } from "@headlessui/react";

const create_order = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full lg:max-w-5xl bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <Tab.Group>
            <Tab.List className="flex w-full items-center justify-center">
              <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold bg-[#ffe49d] rounded-none">
                CUSTOMER INFO
              </Tab>
              <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold bg-[#ffe49d] rounded-none">
                ORDER DETAILS
              </Tab>
              <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold bg-[#ffe49d] rounded-none">
                PAYMENT DETAILS
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <form action="">
                  <div class="grid grid-cols-6 justify-items-center gap-4 px-20 pb-20">
                    <div class="col-start-2 col-span-4 justify-self-stretch">
                      <label className="block mb-2 text-sm font-semibold">
                        Name
                      </label>
                      <input
                        className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                        id="name"
                        type="text"
                        placeholder="Enter customer's name"
                        required
                      />
                    </div>
                    <div className="col-span-3 justify-self-stretch">
                      <label className="block mb-2 text-sm font-semibold">
                        Contact
                      </label>
                      <input
                        className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                        id="contact"
                        type="text"
                        placeholder="Enter customer's contact number"
                        required
                      />
                    </div>
                    <div className="col-span-3 justify-self-stretch">
                      <label className="block mb-2 text-sm font-semibold">
                        E-mail
                      </label>
                      <input
                        className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                        id="email"
                        type="email"
                        placeholder="Enter customer's e-mail"
                        required
                      />
                    </div>
                    <div className="col-span-6 justify-self-stretch">
                      <label className="block mb-2 text-sm font-semibold">
                        Address
                      </label>
                      <input
                        className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                        id="address"
                        type="text"
                        placeholder="Enter customer's address"
                        required
                      />
                    </div>
                    <div className="col-span-6">
                      <button className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full">
                        NEXT
                      </button>
                    </div>
                  </div>
                </form>
              </Tab.Panel>
              <Tab.Panel>
                <form action="">
                  <div className="px-28 pb-20">
                    <h2 className="text-lg">SERVICE OPTIONS</h2>
                    <div className="flex flex-col">
                      <div className="w-1/2">
                        <input
                          type="radio"
                          id="option1"
                          name="options"
                          className="mr-2"
                        />
                        <label for="option1">Cars</label>
                        <input
                          type="radio"
                          id="option2"
                          name="options"
                          className="ml-2 my-2"
                        />
                        <label for="option2">House</label>
                      </div>
                      <div className="w-1/2">
                        <input
                          type="radio"
                          id="option3"
                          name="options"
                          className="mr-2"
                        />
                        <label for="option3">Office</label>
                        <input
                          type="radio"
                          id="option4"
                          name="options"
                          className="ml-2 my-2"
                        />
                        <label for="option4">N/A</label>
                      </div>
                    </div>
                    <h2 className="text-lg">UNIT OPTIONS</h2>
                    <div className="flex flex-col">
                      <div>
                        <input
                          type="radio"
                          id="option1"
                          name="options2"
                          className="mr-2"
                        />
                        <label for="option1">Split Type</label>
                      </div>
                      <div className="my-2">
                        <input
                          type="radio"
                          id="option2"
                          name="options2"
                          className="mr-2"
                        />
                        <label for="option2">Window Air Conditioner</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          id="option3"
                          name="options2"
                          className="mr-2"
                        />
                        <label for="option3">N/A</label>
                      </div>
                      <div className="text-center">
                        <button className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full">
                          NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </Tab.Panel>
              <Tab.Panel>
                <form action="">
                  <div className="px-28 pb-20">
                    <h2 className="text-lg">PAYMENT OPTIONS</h2>
                    <div className="flex mt-5">
                      <button className="bg-gray-500 hover:bg-yellow-500 py-4 px-8 rounded-lg">
                        Credit/Debit Card
                      </button>
                      <button className="bg-gray-500 hover:bg-yellow-500 py-4 px-20 rounded-lg ml-4">
                        Cash
                      </button>
                    </div>
                  </div>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default create_order;
