import React from "react";

const Creditcard = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="font-bold text-3xl">Fill Up</h1>
          <p className="font-semibold text-base !mt-0">Payment Details</p>
          <form onSubmit={null}>
            <div class="grid grid-cols-3 justify-items-center gap-4 px-20 pb-20">
              <div className="col-span-3 font-bold justify-self-start">
                Credit/Debit Card
              </div>
              <div className="col-span-2 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Card Number
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id=""
                  type=""
                  placeholder="1234 5678 9012 3456"
                  //onChange={(e) => setContact(e.target.value)}
                  //value={contact}
                  required
                />
              </div>
              <div className="col-span-1 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">CVC</label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id=""
                  type=""
                  placeholder="123"
                  //onChange={(e) => setContact(e.target.value)}
                  //value={contact}
                  required
                />
              </div>
              <div className="col-span-3 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Card Holder
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id=""
                  type=""
                  placeholder="Enter Card Holder's Name"
                  //onChange={(e) => setContact(e.target.value)}
                  //value={contact}
                  required
                />
              </div>
              <div className="col-span-1 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Valid till
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id=""
                  type=""
                  placeholder="04/25"
                  //onChange={(e) => setContact(e.target.value)}
                  //value={contact}
                  required
                />
              </div>
              <div className="col-span-3">
                <button
                  type="submit"
                  className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full"
                >
                  NEXT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Creditcard;
