import React from 'react'
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from '@/utils/fetch';
import Link from 'next/link'
import TechnicianTable from '@/components/TechnicianTable';

const Customer = () => {
    const [allOrders, setAllOrders] = React.useState([]);
    const { tokens } = useAuthentication();

    // same lang sa useEffect sa sales_order.jsx pero for service_order lang
    React.useEffect(() => {
      if (tokens) {
        fetch(`/technician_details/`, {
          headers: {
            'Authorization': `Bearer ${tokens?.access}`
          }
        }).then((res) => res.json()).then((data) => setAllOrders(data))
      }

    }, [tokens])
    
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link
        href="/technician/create"
        className="text-white font-semibold bg-yellow-400 rounded-full px-5 py-2.5 text-center w-full lg:max-w-5xl sm:max-w-md mb-4"
      >
        Add New Technician
      </Link>
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <TechnicianTable data={allOrders} />
        </div>
      </div>
    </div>
  );
}

export default Customer