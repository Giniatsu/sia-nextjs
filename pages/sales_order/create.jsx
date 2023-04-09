import React from "react";
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";

const CreateOrder = () => {
  const router = useRouter();

  // products should be array of ids
  const [selectedProducts, setSelectedProducts] = React.useState([])
  const [productQuantities, setProductQuantities] = React.useState({})

  const [customers, setCustomers] = React.useState([])
  const [products, setProducts] = React.useState([])

  const [customerId, setCustomerId] = React.useState('')

  const [selectedTabIndex, setSelectedTabIndex] = React.useState(0)

  const [ccNumber, setCcNumber] = React.useState('')
  const [ccName, setCcName] = React.useState('')
  const [ccExpiry, setCcExpiry] = React.useState('')
  const [ccCvv, setCcCvv] = React.useState('')
  
  const { tokens } = useAuthentication();

  React.useEffect(() => {
    if (tokens) {
      fetch(`/customer_details/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => setCustomers(data))
      fetch(`/product_units/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => {
        setProducts(data)
      })
    }

  }, [tokens])

  React.useEffect(() => {
    // set initial product quantities to 0
    const initialProductQuantities = products.reduce((acc, product) => {
      acc[product.id] = 0
      return acc
    }, {})

    console.log(initialProductQuantities)
    setProductQuantities(initialProductQuantities)
  }, [products])

  const onSubmitForm = async (e) => {
    e.preventDefault()

    console.log('submitting form')

    console.log('creating sales order')
    const newSalesOrder = await fetch('/sales_orders/', {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        customer_id: customerId,
      })
    }).then((res) => res.json())
    console.log(newSalesOrder)

    console.log('creating sales order entries')
    let totalCost = 0;
    for await (const productId of selectedProducts) {
      const quantity = productQuantities[productId]
      const newSalesOrderEntry = await fetch('/sales_order_entries/', {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
          order_id: newSalesOrder.id,
          product_id: productId,
          quantity
        })
      }).then((res) => res.json())

      totalCost += parseFloat(newSalesOrderEntry.entry_price)
    }

    const isCash = selectedTabIndex === 1;
    await fetch('/sales_order_payments/', {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        order_id: newSalesOrder.id,
        amount_paid: totalCost,
        cc_number: isCash ? null : ccNumber,
        cc_name: isCash ? null : ccName,
        cc_expiry: isCash ? null : ccExpiry,
        cc_cvv: isCash ? null : ccCvv,
      })
    })

    if (newSalesOrder) {
      router.push(`/sales_order/${newSalesOrder.id}`);
    } else {
      alert('Error creating order!')
    }
  }

  const onCheckProduct = (e) => {
    const { checked, name } = e.target
    const id = name.split('_')[1]

    if (checked) {
      setSelectedProducts((prev) => [...prev, id])
      setProductQuantities((prev) => ({
        ...prev,
        [id]: 1
      }))
    } else {
      setSelectedProducts(selectedProducts.filter((product) => product !== id))
      setProductQuantities((prev) => ({
        ...prev,
        [id]: 0
      }))
    }
  }

  const onQuantityChange = (e) => {
    const { value, name } = e.target

    setProductQuantities((prev) => ({
      ...prev,
      [name.split('_')[1]]: value
    }))
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
                <Tab className="text-black py-1 px-2 lg:px-[74px] font-semibold bg-[#ffe49d] rounded-none">
                  CARD DETAILS
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
                          <option key={`customer_${customer.id}`} value={customer.id}>{customer.customer_name} ({customer.customer_email})</option>
                        ))}
                      </select>
                    </div>
                    <h2 className="text-lg">UNIT OPTIONS</h2>
                    <div className="flex flex-col">
                      {products.map((product) => product.unit_stock > 0 ? (
                        <div
                          key={`unit_${product.id}`}
                        >
                          <div>
                            <input
                              type="checkbox"
                              id={`option_${product.id}`}
                              name={`option_${product.id}`}
                              className="mr-2"
                              value={product.unit_name}
                              onChange={onCheckProduct}
                            />
                            <label for={`option_${product.id}`}>{product.unit_name}</label>
                          </div>
                          <div>
                            <label for={`quantity_${product.id}`}>Quantity: </label>
                            <input
                              type="number"
                              id={`quantity_${product.id}`}
                              name={`quantity_${product.id}`}
                              min={0}
                              max={product.unit_stock}
                              className="mr-2"
                              value={productQuantities[product.id]}
                              onChange={onQuantityChange}
                            />
                          </div>
                        </div>
                      ) : null)}
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
                      <button type="button" className="px-8 py-4 bg-gray-500 rounded-lg hover:bg-yellow-500" onClick={() => setSelectedTabIndex(2)}>
                        Credit/Debit Card
                      </button>
                      <button type="submit" className="px-20 py-4 ml-4 bg-gray-500 rounded-lg hover:bg-yellow-500">
                        Cash
                      </button>
                    </div>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="pb-20 px-28">
                    <h2 className="text-lg">CARD DETAILS</h2>
                    <div class="grid grid-cols-3 justify-items-center gap-4 px-20 pb-20">
                      <div className="col-span-2 justify-self-stretch">
                        <label className="block mb-2 text-sm font-semibold">
                          Card Number
                        </label>
                        <input
                          className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                          id=""
                          type=""
                          placeholder="1234 5678 9012 3456"
                          onChange={(e) => setCcNumber(e.target.value)}
                          value={ccNumber}
                        />
                      </div>
                      <div className="col-span-1 justify-self-stretch">
                        <label className="block mb-2 text-sm font-semibold">CVV</label>
                        <input
                          className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                          id=""
                          type=""
                          placeholder="123"
                          onChange={(e) => setCcCvv(e.target.value)}
                          value={ccCvv}
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
                          onChange={(e) => setCcName(e.target.value)}
                          value={ccName}
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
                          onChange={(e) => setCcExpiry(e.target.value)}
                          value={ccExpiry}
                        />
                      </div>
                      <div className="col-span-3">
                        <button
                          type="submit"
                          className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full"
                        >
                          SUBMIT
                        </button>
                      </div>
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
