import React from "react";
import Image from "next/image";
import siaImg from "../public/assets/sialogo.jpg";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-96 bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center justify-center">
            <Image
              src="/../public/assets/sialogo.jpg"
              alt="/"
              width={90}
              height={90}
            />
          </div>
          <form className="space-y-4 md:space-y-6" action="">
            <div>
              <label className="block mb-2 text-sm font-medium">Username</label>
              <input
                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg"
                id="username"
                name="username"
                type="text"
                placeholder="Type your username"
                required
              />
            </div>
            <div>
              <label for="password" className="block mb-2 text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Type your password"
                className="block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg"
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
                className="w-32 font-medium rounded-full text-sm px-5 py-2.5 text-center bg-red-600"
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
