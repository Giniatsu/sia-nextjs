import React from "react";
import { useRouter } from "next/router";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";

let PHPesos = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP',
});

function formatTechSchedule(techScheds) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let dayTimes = {};
  techScheds.sort((a, b) => a.tech_sched_day - b.tech_sched_day);
  techScheds.forEach(sched => {
    const day = days[sched.tech_sched_day - 1];
    const timeRange = `${sched.tech_sched_time_start} - ${sched.tech_sched_time_end}`;
    if (day in dayTimes) {
      dayTimes[day].push(timeRange);
    } else {
      dayTimes[day] = [timeRange];
    }
  });
  let formattedSched = '';
  for (const day in dayTimes) {
    formattedSched += `${day} ${dayTimes[day].join(', ')}; `;
  }
  return formattedSched.slice(0, -2);
}

const TechnicianDetails = () => {
  const router = useRouter();
  const { tokens } = useAuthentication();
  const { id } = router.query;

  const [serviceOrders, setServiceOrders] = React.useState([]);
  const [technician, setTechnician] = React.useState(null);

  // fetch transaction details
  React.useEffect(() => {
    if (!id || !tokens) {
      return;
    }
    
    fetch(`/technician_details/${id}`, {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTechnician(data);
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
    ]).then(([res1]) => {
      return Promise.all([res1.json()]);
    }).then(([data1]) => {
      const serviceOrders = data1.filter((order) => order.technician_id == id);
      setServiceOrders(serviceOrders);
    }).catch((err) => {
      console.error(err);
    });
  }, [id, tokens]);

  const handleDelete = () => {
    if (!id || !tokens) {
      return;
    }

    fetch(`/technician_details/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
      },
    })
      .then((res) => {
        router.push('/technician');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <div className="container px-4 mx-auto my-2">
            <div className="grid grid-cols-6 m-5">
              <div className="flex items-center col-span-4">
                <h4 className="mr-2">Technician ID#</h4>
                <p className="">{technician?.id}</p>
              </div>
              <div className="col-span-2 justify-self-end">
                <button className="px-3 py-2 mx-2 text-sm bg-blue-500 rounded" onClick={() => router.push(`/technician/${id}/edit`)}>
                  EDIT
                </button>
                <button className="px-3 py-2 mx-2 text-sm bg-red-700 rounded" onClick={() => handleDelete()}>
                  DELETE
                </button>
                <button className="px-3 py-2 mx-2 text-sm bg-red-700 rounded" onClick={() => router.back()}>
                  BACK
                </button>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-5">
                  <h3 className="col-span-1">Name</h3>
                  <p className="col-span-4">{technician?.tech_name}</p>
                  <h3 className="col-span-1">Contact</h3>
                  <p className="col-span-4">{technician?.tech_phone}</p>
                  <h3 className="col-span-1">E-mail</h3>
                  <p className="col-span-4">{technician?.tech_email}</p>
                  <h3 className="col-span-1">Schedule</h3>
                  <p className="col-span-4">
                    {formatTechSchedule(technician?.tech_scheds ?? [])}
                  </p>
                </div>
              </div>
              
              <div className="col-span-3 m-0 mt-4">
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
                            {service?.customer} - Order #{service?.id}
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

export default TechnicianDetails;
