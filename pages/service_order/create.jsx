import React from "react";
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";


const CreateOrder = () => {
  const router = useRouter();

  const [serviceDate, setServiceDate] = React.useState('')
  const [technicianId, setTechnicianId] = React.useState('')
  const [serviceChoice, setServiceChoice] = React.useState('')
  
  const [customers, setCustomers] = React.useState([])
  const [technicians, setTechnicians] = React.useState([])
  const [services, setServices] = React.useState([])

  const [customerId, setCustomerId] = React.useState('')

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)
  
  const { tokens } = useAuthentication();

  React.useEffect(() => {
    if (tokens) {
      fetch(`/technician_details/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => setTechnicians(data))
      fetch(`/customer_details/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => setCustomers(data))
      fetch(`/services/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => setServices(data))
    }

  }, [tokens])

  const onSubmitForm = async (e) => {
    e.preventDefault()

    console.log('submitting form')
    console.log('creating service order')
    const newServiceOrder = await fetch('/service_orders/', {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        serviceDate: serviceDate,
        technician_id: technicianId,
        customer_id: customerId,
        service_id: serviceChoice
      })
    }).then((res) => res.json())

    console.log(newServiceOrder)

    if (newServiceOrder) {
      router.push(`/service_order/${newServiceOrder.id}`);
    } else {
      alert('Error creating order!')
    }
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form onSubmit={onSubmitForm}>
            <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
              <Tab.List className="flex items-center justify-center w-full">
                <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold bg-[#ffe49d] rounded-none">
                  ORDER DETAILS
                </Tab>
                <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold bg-[#ffe49d] rounded-none">
                  PAYMENT DETAILS
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="pb-20 px-28">
                    <h2 className="mt-4 text-lg">CUSTOMER</h2>
                    <div class="col-start-2 col-span-4 justify-self-stretch mb-8">
                      <select
                        className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                        id="customer_name"
                        type="text"
                        placeholder="Select Customer"
                        onChange={(e) => setCustomerId(e.target.value)}
                        value={customerId}
                        required
                      >
                        <option value="">Select Customer</option>
                        {customers.map((customer) => (
                          <option key={`customer_${customer.id}`} value={customer.id}>{customer.customerName} ({customer.customerEmail})</option>
                        ))}
                      </select>
                    </div>
                    <h2 className="text-lg">SERVICE OPTIONS</h2>
                    <div className="flex flex-col">
                      <label for="servicedate">Service Date: </label>
                      <input type="date" id="servicedate" onChange={(e) => setServiceDate(e.target.value)} value={serviceDate}></input>
                      <label for="technician">Technician:</label>
                      <select id="technician" onChange={(e) => setTechnicianId(e.target.value)} value={technicianId}>
                          <option value="">Select a technician</option>
                        { technicians.map((technician) => (
                          <option key={technician.id} value={technician.id}>{technician.techName}</option>
                        )) }
                      </select>
                      <div className="w-1/2">
                        {services.map((service) => (
                          <div key={service.serviceChoice}>
                            <input
                              type="radio"
                              id={service.serviceChoice}
                              name="options"
                              className="mr-2"
                              value={service.serviceChoice}
                              checked={serviceChoice === service.serviceChoice}
                              onChange={(e) => setServiceChoice(e.target.value)}
                            />
                            <label for={service.id}>{service.serviceChoice}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-center">
                        <button type="button" className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full" onClick={() => setSelectedTabIndex(1)}>
                          NEXT
                        </button>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="pb-20 px-28">
                    <h2 className="text-lg">PAYMENT OPTIONS</h2>
                    <div className="flex mt-5">
                      <button type="submit" className="px-8 py-4 bg-gray-500 rounded-lg hover:bg-yellow-500">
                        Credit/Debit Card
                      </button>
                      <button type="submit" className="px-20 py-4 ml-4 bg-gray-500 rounded-lg hover:bg-yellow-500">
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
