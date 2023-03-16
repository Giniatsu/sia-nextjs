import React from "react";
import { useRouter } from "next/router";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";

let PHPesos = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',
});

const CustomerDetails = () => {
  const router = useRouter();
  const { tokens } = useAuthentication();
  const { id } = router.query;

  const [serviceOrders, setServiceOrders] = React.useState([]);
  const [salesOrders, setSalesOrders] = React.useState([]);
  const [customer, setCustomer] = React.useState(null);

  // fetch transaction details
  React.useEffect(() => {
    if (!id || !tokens) {
      return;
    }
    
    fetch(`/customer_details/${id}`, {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCustomer(data);
      })
      .catch((err) => {
        console.error(err);
      });
    
    Promise.all([
      fetch(`/service_orders`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`,
        },
      }),
      fetch(`/sales_orders`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`,
        },    
      })
    ]).then(([res1, res2]) => {
      return Promise.all([res1.json(), res2.json()]);
    }).then(([data1, data2]) => {
      const serviceOrders = data1.filter((order) => order.customer_id == id);
      const salesOrders = data2.filter((order) => order.customer_id == id);
      setServiceOrders(serviceOrders);
      setSalesOrders(salesOrders);
    }).catch((err) => {
      console.error(err);
    });
  }, [id, tokens]);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <div className="container px-4 mx-auto my-2">
            <div className="grid grid-cols-6 m-5">
              <div className="flex items-center col-span-4">
                <h4 className="mr-2">Customer ID#</h4>
                <p className="">{customer?.id}</p>
              </div>
              <div className="col-span-2 justify-self-end">
                <button className="px-3 py-2 mx-2 text-sm bg-blue-500 rounded" onClick={() => router.push(`/customer/${id}/edit`)}>
                  EDIT
                </button>
                <button className="px-3 py-2 mx-2 text-sm bg-red-700 rounded" onClick={() => router.back()}>
                  BACK
                </button>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-5">
                  <h3 className="col-span-1">Name</h3>
                  <p className="col-span-4">{customer?.customerName}</p>
                  <h3 className="col-span-1">Contact</h3>
                  <p className="col-span-4">{customer?.customerContact}</p>
                  <h3 className="col-span-1">E-mail</h3>
                  <p className="col-span-4">{customer?.customerEmail}</p>
                  <h3 className="col-span-1">Address</h3>
                  <p className="col-span-4">
                    {customer?.customerAddress}
                  </p>
                </div>
              </div>
              <div className="col-span-3 m-0 mt-4">
                <h3>SALES ORDERS</h3>
              </div>
              <div className="col-span-6">
                <div class="bg-white shadow-md rounded my-6">
                  <table class="w-full table-auto">
                    <thead>
                      <tr class="bg-gray-200 text-black text-sm font-bold leading-normal">
                        <th class="py-3 px-6 text-left">Unit</th>
                        <th class="py-3 px-6 text-left">Status</th>
                        <th class="py-3 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="text-black text-sm font-light">
                      {salesOrders?.map((order) => (
                        <tr class="hover:bg-gray-100" key={`sales_${order?.id}`}>
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            {order?.product}
                          </td>
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            <span className={`${order?.status.toUpperCase() === 'ACTIVE' || order?.status.toUpperCase() === 'FINISHED' ? 'bg-lime-600' : 'bg-red-600'} text-white text-sm font-medium mr-2 px-2.5 py-1.5 rounded`}>
                              {order?.status.toUpperCase()}
                            </span>
                          </td>
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            <button
                              class="bg-[#cfcfcf] text-black px-4 py-2 rounded-md text-sm font-medium"
                              onClick={() => {
                                router.push(`/sales_order/${order?.id}`)
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-span-3 m-0">
                <h3>SERVICE ORDERS</h3>
              </div>
              <div className="col-span-6">
                <div class="bg-white shadow-md rounded my-6">
                  <table class="w-full table-auto">
                    <thead>
                      <tr class="bg-gray-200 text-black text-sm font-bold leading-normal">
                        <th class="py-3 px-6 text-left">Service</th>
                        <th class="py-3 px-6 text-left">Status</th>
                        <th class="py-3 px-6 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody class="text-black text-sm font-light">
                      { serviceOrders?.map((service) => (
                        <tr class="hover:bg-gray-100" key={`service_${service.id}`}>
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            {service?.service}
                          </td>
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            <span className={`${service?.status.toUpperCase() === 'ACTIVE' || service?.status.toUpperCase() === 'FINISHED' ? 'bg-lime-600' : 'bg-red-600'} text-white text-sm font-medium mr-2 px-2.5 py-1.5 rounded`}>
                              {service?.status.toUpperCase()}
                            </span>
                          </td>
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            <button
                              class="bg-[#cfcfcf] text-black px-4 py-2 rounded-md text-sm font-medium"
                              onClick={() => {
                                router.push(`/service_order/${service?.id}`)
                              }}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
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

export default CustomerDetails;
