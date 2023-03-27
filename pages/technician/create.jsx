import React from "react";
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";

const NewTechnician = () => {
  const [name, setName] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [schedule, setSchedule] = React.useState('')
  
  const { tokens } = useAuthentication();
  const router = useRouter();

  const onSubmitForm = async (e) => {
    e.preventDefault()

    console.log('submitting form')
    const newTech = await fetch('/technician_details/', {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
      body: JSON.stringify({
        tech_name: name,
        tech_phone: contact,
        tech_email: email,
        tech_sched: schedule
      })
    }).then((res) => res.json())

    console.log(newTech)

    if (newTech) {
      router.push(`/technician/${newTech.id}`);
    } else {
      alert('Error creating customer!')
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
                  placeholder="Enter technician's name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="col-span-3 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Contact
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id="contact"
                  type="text"
                  placeholder="Enter technician's contact number"
                  onChange={(e) => setContact(e.target.value)}
                  value={contact}
                  required
                />
              </div>
              <div className="col-span-3 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  E-mail
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id="email"
                  type="email"
                  placeholder="Enter technician's e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Schedule
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id="schedule"
                  type="text"
                  placeholder="Enter technician's schedule"
                  onChange={(e) => setSchedule(e.target.value)}
                  value={schedule}
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

export default NewTechnician;
