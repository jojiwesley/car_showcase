"use client";

import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react";
import { SearchManufacturereProps } from "@/Types";
import { manufacturers } from "@/constants";
import React from "react";
import { useState, Fragment } from "react";

const SearchManufacturer = ({
  manufacturer,
  setManufacturer,
}: SearchManufacturereProps) => {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox>
        <div className="realative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="Car Logo"
            />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="volkswaagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== "" ? (
                <Combobox.Options
                  value={query}
                  className="search-manufacturer-option"
                ></Combobox.Options>
              ) : (
                filteredManufacturers.map((item) => (
                  <Combobox.Options
                    key={item}
                    className={({ action }) =>
                      `relative search-manufacturer__option ${
                        action ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {item}
                  </Combobox.Options>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchManufacturer;
