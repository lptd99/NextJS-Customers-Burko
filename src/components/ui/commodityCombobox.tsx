import { ICommodity, ICommodityFunction } from "@/app/interfaces/interfaces";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";

const commodityList: ICommodity[] = [
  { id: 1, name: "Produto Fisico" },
  { id: 2, name: "Produto Digital" },
  { id: 3, name: "Produto Intelectual" },
  { id: 4, name: "Serviços" },
  { id: 5, name: "Equipamento" },
  { id: 6, name: "Imóveis" },
];

export default function CommodityCombobox(props: ICommodityFunction) {
  const [selected, setSelected] = useState<ICommodity | null>(commodityList[0]);
  const [query, setQuery] = useState("");

  const filteredCommodityList =
    query === ""
      ? commodityList
      : commodityList.filter((commodity: ICommodity) =>
          commodity.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {
    if (selected) {
      props.handleCommodityChange(selected);
    }
  }, [selected, props]);

  return (
    <section>
      <Combobox
        value={selected}
        onChange={setSelected}>
        <section className='relative mt-1'>
          <section className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
            <Combobox.Input
              className='w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0'
              displayValue={(commodity: ICommodity) => commodity?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
              <ChevronUpDownIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </Combobox.Button>
          </section>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery("")}>
            <Combobox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm'>
              {filteredCommodityList.length === 0 && query !== "" ? (
                <section className='relative cursor-default select-none px-4 py-2 text-gray-700'>
                  Nothing found.
                </section>
              ) : (
                filteredCommodityList.map((commodity) => (
                  <Combobox.Option
                    key={commodity.id}
                    className={({ active }: { active: boolean }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={commodity}>
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}>
                          {commodity?.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}>
                            <CheckIcon
                              className='h-5 w-5'
                              aria-hidden='true'
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </section>
      </Combobox>
    </section>
  );
}
