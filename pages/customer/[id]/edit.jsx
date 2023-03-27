import React from "react";
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";

const EditCustomer = () => {
  const [name, setName] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [address, setAddress] = React.useState('')
  
  const { tokens } = useAuthentication();
  const router = useRouter();

  const { id } = router.query;

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
        setName(data.customer_name)
        setContact(data.customer_contact)
        setEmail(data.customer_email)
        setAddress(data.customer_address)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, tokens]);

  const onSubmitForm = async (e) => {
    e.preventDefault()

    console.log('submitting form')
    const newCustomer = await fetch(`/customer_details/${id}/`, {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({
        customer_name: name,
        customer_contact: contact,
        customer_email: email,
        customer_address: address
      })
    }).then((res) => res.json())

    console.log(newCustomer)

    if (newCustomer) {
      router.push(`/customer/${newCustomer.id}`);
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
                  placeholder="Enter customer's name"
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
                  placeholder="Enter customer's contact number"
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
                  placeholder="Enter customer's e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Address
                </label>
                <input
                  className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                  id="address"
                  type="text"
                  placeholder="Enter customer's address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
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

export default EditCustomer;
