import { Dispatch, SetStateAction, useState } from "react";

type FilterData = {
  filterId: string;
  labelStr: string;
};

export default function SearchModalRadioButton({
    radioName,
    data,
    selectedId,
    changeSearchParams,
    onChange
}: {
    radioName: string;
    data: FilterData[];
    selectedId: string; // 現在選択中のfilterId
    changeSearchParams: (filterId: string) => void;
    onChange: (filterId: string) => void;
}) {
  return (
    <div className="flex flex-row flex-wrap gap-0  w-fit">
      {data.map((item,index) => (
        <label
          key={item.filterId}
          className="flex flex-row relative cursor-pointer"
        >
          <input
            type="radio"
            name={radioName}
            id={item.filterId}
            checked={selectedId === item.filterId}
            className="hidden peer"
            onChange={(e) => {
              onChange(item.filterId);
              changeSearchParams(item.filterId);
            }}
          />
          <div
            className={`${index===0?'rounded-l-xl':(index+1)===data.length?'rounded-r-xl':''}
              text-left justify-center px-2 py-0 lg:py-1 w-fit break-keep
              text-stone-500
              peer-checked:text-green-400
              font-sans text-sm lg:text-base 
              bg-stone-200/20 peer-checked:bg-stone-200/0
              hover:bg-green-200/20 hover:text-green-400
              border-2
              peer-checked:border-green-300 peer-checked:border-2
              drop-shadow-md peer-checked:drop-shadow-none
              transition-all duration-500 ease-out
              select-none`}
          >
            {item.labelStr}
          </div>
        </label>
      ))}
    </div>
  );
}
