"use client";
import React, { useEffect, useState } from "react";

const Navbar = ({
  searchQuery,
  setSearchQuery,

  selectedValue,
  setSelectedValue,
}) => {
  const [options, setOptions] = useState([]);
  console.log(options);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
    setSelectedValue(null);
  };

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSearchQuery("");
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products/categories"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setOptions(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <nav>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MoBooM
            </span>
          </a>

          <div className=" w-full md:block md:w-auto" id="navbar-multi-level">
            <ul className="flex flex-col font-medium p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleChange}
                  className="block p-4  py-1 px-2  w-full lg:w-[600px] text-gray-900 rounded  "
                />
              </li>

              <li>
                <a
                  href="#"
                  className="block my-2 py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent"
                  aria-current="page"
                >
                  Store
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block  my-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block  my-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Wish List
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block    my-2 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Basket
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className=" my-2 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-28 p-4 rounded-md ">
        <p>Lorum Ipsum</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et nihil.
        </p>
      </div>
      <div className="p-4 rounded-md ">
        <select
          className="outline-none cursor-pointer border w-[300px]  focus:outline-none p-2 px-4 bg-white "
          value={selectedValue}
          onChange={handleSelectChange}
        >
          {options.map((item, i) => (
            <option value={item} key={i}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
