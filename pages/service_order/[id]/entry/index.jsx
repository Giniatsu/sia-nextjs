import React from "react";
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";


const CreateOrder = () => {
  const router = useRouter();
  const { id } = router.query;

  // products should be array of ids
  const [selectedServices, setSelectedServices] = React.useState([])
  const [serviceQuantities, setServiceQuantities] = React.useState({})
  
  const [services, setServices] = React.useState([])
  
  const { tokens } = useAuthentication();

  React.useEffect(() => {
    if (tokens) {
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

    try {
      await Promise.all(selectedServices.map(async (serviceId) => {
        const newServiceOrderItem = await fetch('/service_order_entries/', {
          headers: {
            'Authorization': `Bearer ${tokens?.access}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'post',
          body: JSON.stringify({
            service_id: serviceId,
            order_id: id,
            quantity: serviceQuantities[serviceId]
          })
        }).then((res) => res.json())
        return newServiceOrderItem
      }))

      router.push(`/service_order/${id}`);
    } catch(err) {
      alert('Error creating order!')
    }
  }

  const onCheckService = (e) => {
    const { checked, name } = e.target
    const id = name.split('_')[1]

    if (checked) {
      setSelectedServices((prev) => [...prev, id])
      setServiceQuantities((prev) => ({
        ...prev,
        [id]: 1
      }))
    } else {
      setSelectedServices(selectedServices.filter((service) => service !== id))
      setServiceQuantities((prev) => ({
        ...prev,
        [id]: 0
      }))
    }
  }

  const onQuantityChange = (e) => {
    const { value, name } = e.target

    setServiceQuantities((prev) => ({
      ...prev,
      [name.split('_')[1]]: value
    }))
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form onSubmit={onSubmitForm}>
            <div className="pb-20 px-28">
              <h2 className="text-lg">SERVICE OPTIONS</h2>
              <div className="flex flex-col">
                <div className="w-1/2">
                  {services.map((service) => (
                    <div
                      key={`unit_${service.id}`}
                    >
                      <div>
                        <input
                          type="checkbox"
                          id={`option_${service.id}`}
                          name={`option_${service.id}`}
                          className="mr-2"
                          value={service.service_name}
                          onChange={onCheckService}
                        />
                        <label for={`option_${service.id}`}>{service.service_name}</label>
                      </div>
                      <div>
                        <label for={`quantity_${service.id}`}>Quantity: </label>
                        <input
                          type="number"
                          id={`quantity_${service.id}`}
                          name={`quantity_${service.id}`}
                          className="mr-2"
                          value={serviceQuantities[service.id]}
                          onChange={onQuantityChange}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="text-center">
                  <button type="submit" className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
