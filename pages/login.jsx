import React from "react";
import Image from "next/image";
import siaImg from "../public/assets/sialogo.jpg";
import { useRouter } from "next/router";
import { useAuthentication } from "@/hooks/useAuthentication";

const Login = () => {
  const router = useRouter()
  const { login, tokens } = useAuthentication()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [loggingIn, setLoggingIn] = React.useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoggingIn(true)
    await login(username, password)

    if (tokens) router.push('/sales_order')

    setLoggingIn(false)
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-96 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center justify-center">
            <Image src={siaImg} alt="/" width={90} height={90} />
          </div>
          <form className="space-y-4 md:space-y-6" action="" onSubmit={onSubmit}>
            <div>
              <label className="block mb-2 text-sm font-semibold">
                Username
              </label>
              <input
                className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                id="username"
                name="username"
                type="text"
                placeholder="Type your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Type your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full p-2.5 drop-shadow-lg sm:text-sm rounded-lg"
                required
              />
            </div>
            <div className="flex items-end justify-end">
              <a
                href="#"
                className="text-sm font-medium hover:underline text-blue-600"
              >
                Reset Password
              </a>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-32 font-medium rounded-full text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-[#5b1010]"
                disabled={loggingIn}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
