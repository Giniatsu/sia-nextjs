import React from "react";
import { Tab } from "@headlessui/react";
import { useAuthentication } from "@/hooks/useAuthentication";
import fetch from "@/utils/fetch";
import { useRouter } from "next/router";

const EditTechnician = () => {
  const [name, setName] = React.useState('')
  const [contact, setContact] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [schedule, setSchedule] = React.useState('')

  const [schedules, setSchedules] = React.useState([
    {
      day: 2,
      timeStart: null,
      timeEnd: null,
      active: false,
    },
    {
      day: 3,
      timeStart: null,
      timeEnd: null,
      active: false,
    },
    {
      day: 4,
      timeStart: null,
      timeEnd: null,
      active: false,
    },
    {
      day: 5,
      timeStart: null,
      timeEnd: null,
      active: false,
    },
    {
      day: 6,
      timeStart: null,
      timeEnd: null,
      active: false,
    },
    {
      day: 7,
      timeStart: null,
      timeEnd: null,
      active: false,
    },
  ])

  const [currentSchedules, setCurrentSchedules] = React.useState([])
  
  const { tokens } = useAuthentication();
  const router = useRouter();

  const { id } = router.query;

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
        setName(data.tech_name)
        setContact(data.tech_phone)
        setEmail(data.tech_email)

        setSchedules(data.tech_scheds.map((sched) => {
          return {
            day: sched.tech_sched_day,
            timeStart: sched.tech_sched_time_start.split(':').slice(0, 2).join(':'),
            timeEnd: sched.tech_sched_time_end.split(':').slice(0, 2).join(':'),
            active: true,
          }
        }))

        setCurrentSchedules(data.tech_scheds)
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id, tokens]);

  const onSubmitForm = async (e) => {
    e.preventDefault()

    console.log('submitting form')

    const newScheds = schedules.filter((sched) => sched.active).map((sched) => {
      return {
        technician_id: id,
        tech_sched_day: sched.day,
        tech_sched_time_start: sched.timeStart + ':00',
        tech_sched_time_end: sched.timeEnd + ':00',
        tech_sched_status: true,
      }
    })

    console.log(newScheds)

    await Promise.all(currentSchedules.map((sched) => {
      return fetch(`/technician_schedule/${sched.id}`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'delete',
      })
    }))

    await Promise.all(newScheds.map((sched) => {
      return fetch(`/technician_schedule/`, {
        headers: {
          'Authorization': `Bearer ${tokens?.access}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(sched),
      })
    }))

    const newTech = await fetch(`/technician_details/${id}/`, {
      headers: {
        'Authorization': `Bearer ${tokens?.access}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'put',
      body: JSON.stringify({
        tech_name: name,
        tech_phone: contact,
        tech_email: email,
      })
    }).then((res) => res.json())

    console.log(newTech)

    if (newTech) {
      router.push(`/technician/${newTech.id}`);
    } else {
      alert('Error creating customer!')
    }
  }

  const handleScheduleStartChange = (e, day) => setSchedules((prev) => {
    return [...prev].filter((item) => item.day !== day).concat({
      day,
      timeStart: e.target.value,
      timeEnd: prev.find((item) => item.day === day)?.timeEnd,
      active: prev.find((item) => item.day === day)?.active,
    })
  })

  const handleScheduleEndChange = (e, day) => setSchedules((prev) => {
    return [...prev].filter((item) => item.day !== day).concat({
      day,
      timeEnd: e.target.value,
      timeStart: prev.find((item) => item.day === day)?.timeStart,
      active: prev.find((item) => item.day === day)?.active,
    })
  })

  const handleScheduleActiveChange = (e, day) => setSchedules((prev) => {
    return [...prev].filter((item) => item.day !== day).concat({
      day,
      active: e.target.checked,
      timeStart: prev.find((item) => item.day === day)?.timeStart,
      timeEnd: prev.find((item) => item.day === day)?.timeEnd,
    })
  })

  React.useEffect(() => {
    console.log(schedules)
  }, [schedules])


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
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

              <hr className="col-span-6" />
              
              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Monday
                </label>
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={schedules.find((item) => item.day === 2)?.active}
                    onChange={(e) => handleScheduleActiveChange(e, 2)}
                  />
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      Start
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleStartChange(e, 2)}
                      value={schedules.find((item) => item.day === 2)?.timeStart}
                      required={schedules.find((item) => item.day === 2)?.active}
                    />
                  </div>
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      End
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleEndChange(e, 2)}
                      value={schedules.find((item) => item.day === 2)?.timeEnd}
                      required={schedules.find((item) => item.day === 2)?.active}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Tuesday
                </label>
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={schedules.find((item) => item.day === 3)?.active}
                    onChange={(e) => handleScheduleActiveChange(e, 3)}
                  />
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      Start
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleStartChange(e, 3)}
                      value={schedules.find((item) => item.day === 3)?.timeStart}
                      required={schedules.find((item) => item.day === 3)?.active}
                    />
                  </div>
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      End
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleEndChange(e, 3)}
                      value={schedules.find((item) => item.day === 3)?.timeEnd}
                      required={schedules.find((item) => item.day === 3)?.active}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Wednesday
                </label>
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={schedules.find((item) => item.day === 4)?.active}
                    onChange={(e) => handleScheduleActiveChange(e, 4)}
                  />
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      Start
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleStartChange(e, 4)}
                      value={schedules.find((item) => item.day === 4)?.timeStart}
                      required={schedules.find((item) => item.day === 4)?.active}
                    />
                  </div>
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      End
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleEndChange(e, 4)}
                      value={schedules.find((item) => item.day === 4)?.timeEnd}
                      required={schedules.find((item) => item.day === 4)?.active}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Thursday
                </label>
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={schedules.find((item) => item.day === 5)?.active}
                    onChange={(e) => handleScheduleActiveChange(e, 5)}
                  />
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      Start
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleStartChange(e, 5)}
                      value={schedules.find((item) => item.day === 5)?.timeStart}
                      required={schedules.find((item) => item.day === 5)?.active}
                    />
                  </div>
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      End
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleEndChange(e, 5)}
                      value={schedules.find((item) => item.day === 5)?.timeEnd}
                      required={schedules.find((item) => item.day === 5)?.active}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Friday
                </label>
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={schedules.find((item) => item.day === 6)?.active}
                    onChange={(e) => handleScheduleActiveChange(e, 6)}
                  />
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      Start
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleStartChange(e, 6)}
                      value={schedules.find((item) => item.day === 6)?.timeStart}
                      required={schedules.find((item) => item.day === 6)?.active}
                    />
                  </div>
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      End
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleEndChange(e, 6)}
                      value={schedules.find((item) => item.day === 6)?.timeEnd}
                      required={schedules.find((item) => item.day === 6)?.active}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-6 justify-self-stretch">
                <label className="block mb-2 text-sm font-semibold">
                  Saturday
                </label>
                <div className="flex flex-row gap-4">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={schedules.find((item) => item.day === 7)?.active}
                    onChange={(e) => handleScheduleActiveChange(e, 7)}
                  />
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      Start
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleStartChange(e, 7)}
                      value={schedules.find((item) => item.day === 7)?.timeStart}
                      required={schedules.find((item) => item.day === 7)?.active}
                    />
                  </div>
                  <div className="flex-col">
                    <label className="block mb-2 text-sm font-semibold">
                      End
                    </label>
                    <input
                      className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                      type="time"
                      placeholder="Enter technician's schedule"
                      onChange={(e) => handleScheduleEndChange(e, 7)}
                      value={schedules.find((item) => item.day === 7)?.timeEnd}
                      required={schedules.find((item) => item.day === 7)?.active}
                    />
                  </div>
                </div>
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

export default EditTechnician;
