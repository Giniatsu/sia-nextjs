import React from "react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";

const NewService = () => {
  const [name, setName] = React.useState('')
  const [cost, setCost] = React.useState('')
  
  const { tokens } = useAuthentication();
  const router = useRouter();

  const onSubmitForm = async (e) => {
    e.preventDefault()

    console.log('submitting form')
    const newService = await fetch('/services/', {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        service_name: name,
        service_cost: cost,
      })
    }).then((res) => res.json())

    console.log(newService)

    if (newService) {
      router.push(`/services`);
    } else {
      alert('Error creating service!')
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
                  placeholder="Enter service name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="col-span-4 col-start-2 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Cost
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id="name"
                  type="number"
                  placeholder="Enter service cost"
                  onChange={(e) => setCost(e.target.value)}
                  value={cost}
                  required
                />
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

export default NewService;
