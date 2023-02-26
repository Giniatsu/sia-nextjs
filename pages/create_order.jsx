import React from "react";
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";

const CreateOrder = () => {
  const [name, setName] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [address, setAddress] = React.useState('')

  const [serviceDate, setServiceDate] = React.useState('')
  const [technicianId, setTechnicianId] = React.useState('')
  const [serviceChoice, setServiceChoice] = React.useState('')
  const [product, setProduct] = React.useState('')

  const [technicians, setTechnicians] = React.useState([])

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)
  
  const { tokens } = useAuthentication();

  React.useEffect(() => {
    if (tokens) {
      fetch(`/technician_details/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => setTechnicians(data))
    }

  }, [tokens])

  const onSubmitForm = async (e) => {
    e.preventDefault()

    const newCustomer = await fetch('/customer_details/', {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        customerName: name,
        customerContact: contact,
        customerEmail: email,
        customerAddress: address
      })
    }).then((res) => res.json())

    let newServiceOrder = null;
    let newSalesOrder = null;

    console.log(newCustomer)
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full lg:max-w-5xl bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form onSubmit={onSubmitForm}>
            <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
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
                        onChange={(e) => setName(e.target.value)}
                        value={name}
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
                        onChange={(e) => setContact(e.target.value)}
                        value={contact}
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
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
                        onChange={(e) => setAddress(e.target.value)}
                        value={address}
                        required
                      />
                    </div>
                    <div className="col-span-6">
                      <button className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full" onClick={() => setSelectedTabIndex(1)}>
                        NEXT
                      </button>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="px-28 pb-20">
                    <h2 className="text-lg">SERVICE OPTIONS</h2>
                    <div className="flex flex-col">
                      <label for="servicedate">Service Date: </label>
                      <input type="date" id="servicedate" onChange={(e) => setServiceDate(e.target.value)} value={serviceDate}></input>
                      <label for="technician">Technician:</label>
                      <select id="technician" onChange={(e) => setTechnicianId(e.target.value)} value={technicianId}>
                        { technicians.map((technician) => (
                          <option key={technician.id} value={technician.id}>{technician.techName}</option>
                        )) }
                      </select>
                      <div className="w-1/2">
                        <input
                          type="radio"
                          id="option1"
                          name="options"
                          className="mr-2"
                          value="Cars"
                          checked={serviceChoice === 'Cars'}
                          onChange={(e) => setServiceChoice(e.target.value)}
                        />
                        <label for="option1">Cars</label>
                        <input
                          type="radio"
                          id="option2"
                          name="options"
                          className="ml-2 my-2"
                          value="House"
                          checked={serviceChoice === 'House'}
                          onChange={(e) => setServiceChoice(e.target.value)}
                        />
                        <label for="option2">House</label>
                      </div>
                      <div className="w-1/2">
                        <input
                          type="radio"
                          id="option3"
                          name="options"
                          className="mr-2"
                          value="Office"
                          checked={serviceChoice === 'Office'}
                          onChange={(e) => setServiceChoice(e.target.value)}
                        />
                        <label for="option3">Office</label>
                        <input
                          type="radio"
                          id="option4"
                          name="options"
                          className="ml-2 my-2"
                          value="N/A"
                          checked={serviceChoice === 'N/A'}
                          onChange={(e) => setServiceChoice(e.target.value)}
                        />
                        <label for="option4">N/A</label>
                      </div>
                    </div>
                    <h2 className="text-lg">UNIT OPTIONS</h2>
                    <div className="flex flex-col">
                      <div>
                        <input
                          type="radio"
                          id="option5"
                          name="options5"
                          className="mr-2"
                          value="Split Type"
                          checked={product === 'Split Type'}
                          onChange={(e) => setProduct(e.target.value)}
                        />
                        <label for="option5">Split Type</label>
                      </div>
                      <div className="my-2">
                        <input
                          type="radio"
                          id="option6"
                          name="options6"
                          className="mr-2"
                          value="Window Air Conditioner"
                          checked={product === 'Window Air Conditioner'}
                          onChange={(e) => setProduct(e.target.value)}
                        />
                        <label for="option6">Window Air Conditioner</label>
                      </div>
                      <div className="mb-2">
                        <input
                          type="radio"
                          id="option7"
                          name="options7"
                          className="mr-2"
                          value="N/A"
                          checked={product === 'N/A'}
                          onChange={(e) => setProduct(e.target.value)}
                        />
                        <label for="option7">N/A</label>
                      </div>
                      <div className="text-center">
                        <button className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full" onClick={() => setSelectedTabIndex(2)}>
                          NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="px-28 pb-20">
                    <h2 className="text-lg">PAYMENT OPTIONS</h2>
                    <div className="flex mt-5">
                      <button type="submit" className="bg-gray-500 hover:bg-yellow-500 py-4 px-8 rounded-lg">
                        Credit/Debit Card
                      </button>
                      <button type="submit" className="bg-gray-500 hover:bg-yellow-500 py-4 px-20 rounded-lg ml-4">
                        Cash
                      </button>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
