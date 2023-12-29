'use client'
import { Combobox } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import logo from '../../assets/logo.png'
import { sparePartsCategories } from '../../utils/sparePartsCategories'
import SearchBar from '../Searchbar'

export default function NavBar() {
  const [selectedPerson, setSelectedPerson] = useState();
  const [query, setQuery] = useState("");
  const router = useRouter();
  const cartItems = useSelector((state) => state?.cart?.value);
  const productList = useSelector((state) => state?.productList?.value);

  const handleOnChangeCombobox = (e) => {
    setSelectedPerson(e);
    router.push(`/${e}`);
  };

  return (
    <div className="flex flex-col  fixed z-20 space-y-3 bg-white p-3 shadow-sm w-full ">
      <div className="flex space-x-5 items-center   justify-between md:justify-around bg-white">
        {/* Left Side Bar*/}
        <Link href={"/"}>
          <Image
            width={150}
            height={50}
            src={logo}
            alt="logo"
            className="w-40 px-2 cursor-pointer"
          />
        </Link>

        {/* Center bar */}
        <div className="w-1/2 hidden  md:flex ">
          <SearchBar />
        </div>
        {/* Right Side Bar */}
        <div className="flex items-center space-x-8 ">
          {/* Cart */}
          <Link href={"/seller"}>
            <div className="flex relative cursor-pointer hover:text-[#bb2433]">
              {/*<svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
          </svg>*/}
              <h1 className="text-base font-semibold mx-1 hidden lg:inline">
                I'm selling
              </h1>
              {/*<h1 className="text-xs rounded-full px-1 text-white -right-2 md:ml-4 font-semibold  absolute bg-[#bb2433]">
                {cartItems.length}
        </h1>*/}
            </div>
          </Link>

          {/* search Icon */}
          {/*<BsSearch size={20} />*/}

          {/* Login */}

          {/* </Link> */}

        </div>
      </div>
      {/* Category */}

      {/*<div className="text-black w-full lg:flex hidden bg-white px-10  space-x-5">
        {sparePartsCategories.map((e) => (
          <p key={e} className="text-sm cursor-pointer hover:text-red-600">
            {e}
          </p>
        ))}
        </div>*/}
    </div>
  );
}

// mkshbhgt@okaxis
