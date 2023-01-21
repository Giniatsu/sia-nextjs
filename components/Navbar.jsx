import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-5">
      <Link href="/" className="flex-1">
        <Image
          src="/../public/sialogo.ico"
          alt="/"
          width="125"
          height="50"
        />
      </Link>
      <div className="flex items-center">
        <Link href="/">
          <li className="text-sm uppercase hover:border-b my-0 mx-2.5">
            Sales Order
          </li>
        </Link>
        <div className="border-l-8 border-green-400 h-[50] absolute left-2/4 ml-[-3] top-0"></div>
        <Link href="/#about">
          <li className="text-sm uppercase hover:border-b my-0 mx-2.5">
            Service Order
          </li>
        </Link>
      </div>
    </div>
  );
}

export default Navbar