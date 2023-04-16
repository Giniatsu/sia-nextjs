import React from "react";
import { useRouter } from "next/router";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";

const SupplyOrderDetails = () => {
  const router = useRouter();
  const { tokens } = useAuthentication();
  const { id } = router.query;

  const [order, setOrder] = React.useState(null);

  // fetch transaction details
  React.useEffect(() => {
    if (!id || !tokens) {
      return;
    }
    
    fetch(`/supply_orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, tokens]);

  const handleDelete = () => {
    if (!id || !tokens) {
      return;
    }

    fetch(`/supply_orders/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
      },
    })
      .then((res) => {
        router.push('/sales_order');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddEntry = () => {
    router.push(`/supply_order/${id}/entry`);
  }

  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editingValue, setEditingValue] = React.useState(null);

  const handleEditEntry = (index) => {
    const entry = order?.entries[index];
    setEditingIndex(index);
    setEditingValue(entry.quantity);
  }

  const handleSaveEntry = (index) => {
    const entry = order?.entries[index];

    fetch(`/supply_order_entries/${entry.id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_id: entry.product_id,
        order_id: entry.order_id,
        quantity: editingValue,
      }),
    })
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleDeleteEntry = (index) => {
    const entry = order?.entries[index];

    fetch(`/supply_order_entries/${entry.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
      },
    })
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handlePrint = () => {
    let printContents = document.getElementById('printable_div').innerHTML;
    let popupWin = window.open('Print', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open()
    popupWin.document.write('<html><head><link href="print.css" rel="stylesheet" type="text/css" media="print"></head><body onload="window.print()">' + printContents + '</html>');

    popupWin.document.close();
    popupWin.focus();
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="space-y-4 md:space-y-6">
          <div className="container px-4 mx-auto my-2">
            <div className="grid grid-cols-6 m-5" id="printable_div">
              <div className="flex items-center col-span-2">
                <h4 className="mr-2">Transaction ID#</h4>
                <p className="">{order?.id}</p>
              </div>
              <div className="col-span-4 justify-self-end">
                <button className="px-3 py-2 mx-2 text-sm bg-red-700 rounded" onClick={() => handleDelete()}>
                  DELETE
                </button>
                <button className="px-3 py-2 mx-2 text-sm bg-blue-500 rounded" onClick={() => handlePrint()}>
                  PRINT
                </button>
                <button className="px-3 py-2 mx-2 text-sm bg-blue-500 rounded" onClick={() => handleAddEntry()}>
                  ADD ORDER
                </button>
              </div>
              <div className="flex flex-row col-span-3">
                <div className="border-r-4 rounded-full border-[#5b1010] mr-2"></div>
                <div className="flex flex-col">
                  <div className="flex flex-row items-center justify-between">
                    <h4 className="mr-5">Order</h4>
                  </div>
                  {/*
                  <div className="flex flex-row items-center justify-between">
                    <h4 className="mr-2">Shipment</h4>
                    <p className="mb-0">Pending</p>
                  </div>
                  */}
                </div>
              </div>

              <div className="col-span-6">
                <div class="bg-white shadow-md rounded my-6">
                  <table class="w-full table-auto">
                    <thead>
                      <tr class="bg-gray-200 text-black text-sm font-bold leading-normal">
                        <th class="py-3 px-6 text-left">Unit</th>
                        <th class="py-3 px-6 text-left">Quantity</th>
                        <th class="py-3 px-6 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody class="text-black text-sm font-light">
                      { order?.entries.map((entry, i) => (
                        <tr class="hover:bg-gray-100" key={entry.id}>
                          <td class="py-3 px-6 text-left whitespace-pre-wrap">
                            {entry?.product} 
                          </td>
                          { editingIndex === i ? (
                            <td class="py-3 px-6 text-left whitespace-nowrap">
                              <input type="number" className="w-full" value={editingValue} onChange={(e) => setEditingValue(e.target.value)} />
                            </td>
                          ) : (
                            <td class="py-3 px-6 text-left whitespace-nowrap">
                              {entry?.quantity}
                            </td>
                          ) }
                          <td class="py-3 px-6 text-left whitespace-nowrap">
                            { editingIndex === i ? (
                              <button className="px-3 py-2 mx-2 text-sm bg-blue-500 rounded" onClick={() => handleSaveEntry(i)}>
                                SAVE
                              </button>
                            ) : (
                              <button className="px-3 py-2 mx-2 text-sm bg-blue-500 rounded" onClick={() => handleEditEntry(i)}>
                                EDIT
                              </button>
                            ) }
                            <button className="px-3 py-2 mx-2 text-sm bg-red-700 rounded" onClick={() => handleDeleteEntry(i)}>
                              DELETE
                            </button>
                          </td>
                        </tr>
                      )) }
                      
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

export default SupplyOrderDetails;
