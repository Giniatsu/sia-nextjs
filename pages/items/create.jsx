import React from "react";
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";

const NewItem = () => {
  const [name, setName] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [typeId, setTypeId] = React.useState('')
  
  const { tokens } = useAuthentication();
  const router = useRouter();

  const [unitTypes, setUnitTypes] = React.useState([])

  React.useEffect(() => {
    if (tokens) {
      fetch(`/aircon_types/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`
        }
      }).then((res) => res.json()).then((data) => setUnitTypes(data))
    }
  }, [tokens])

  const onSubmitForm = async (e) => {
    e.preventDefault()

    console.log('submitting form')
    const newItem = await fetch('/product_units/', {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        unit_name: name,
        unit_price: price,
        unit_stock: 0,
        unit_type_id: typeId
      })
    }).then((res) => res.json())

    console.log(newItem)

    if (newItem) {
      router.push(`/items`);
    } else {
      alert('Error creating item!')
    }
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow lg:max-w-5xl md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form onSubmit={onSubmitForm}>
            <div class="grid grid-cols-6 justify-items-center gap-4 px-20 pb-20">
              <div class="col-start-2 col-span-4 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Name
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id="name"
                  type="text"
                  placeholder="Enter unit name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="col-span-3 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Price
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id="price"
                  type="number"
                  placeholder="Enter unit price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
              </div>
              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Schedule
                </label>
                <select
                  id="type"
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  onChange={(e) => setTypeId(e.target.value)}
                  value={typeId}
                  required
                >
                  <option value="">Select a type</option>
                  { unitTypes.map((type) => (
                    <option key={type.type_name} value={type.type_name}>{type.type_name}</option>
                  )) }
                </select>
              </div>
              <div className="col-span-6">
                <button type="submit" className="w-28 p-2 bg-[#ffbb0e] text-white font-bold rounded-full">
                  SUBMIT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewItem;
