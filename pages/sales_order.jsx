import React from "react";
import { Tab } from "@headlessui/react";
import DataTable from "@/components/DataTable";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from '@/utils/fetch';

/*
const sample_data = [
  {
    id: '123123',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123124',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123125',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123126',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123127',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Cancelled'
  },
  {
    id: '123128',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123129',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123130',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123131',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123132',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
  {
    id: '123133',
    customer: 'asdasd',
    date: '01-01-2000',
    status: 'Active'
  },
];
*/



const SalesOrder = () => {
  const [allOrders, setAllOrders] = React.useState([]);
  const { tokens } = useAuthentication();

  React.useEffect(() => {
    if (tokens) {
      fetch(`/sales_orders/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => setAllOrders(data))
    }

  }, [tokens])

  const activeOrders = React.useMemo(() => {
    return allOrders.filter((data) => data.status === 'Active');
  }, [allOrders]);

  const finishedOrders = React.useMemo(() => {
    return allOrders.filter((data) => data.status === 'Finished');
  }, [allOrders]);

  const cancelledOrders = React.useMemo(() => {
    return allOrders.filter((data) => data.status === 'Cancelled');
  }, [allOrders]);

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
                <DataTable data={allOrders} />
              </Tab.Panel>
              <Tab.Panel>
                <DataTable data={activeOrders} />
              </Tab.Panel>
              <Tab.Panel>
                <DataTable data={finishedOrders} />
              </Tab.Panel>
              <Tab.Panel>
                <DataTable data={cancelledOrders} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default SalesOrder;
