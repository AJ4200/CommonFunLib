import useCommonFunctions from "@/hooks/useCommonFunctions";
import React from "react";
import { FaCalculator } from "react-icons/fa";

function CommonFunctionsPG() {
  const [
    { input1, input2, result, functionType, loading },
    {
      handleInput1Change,
      handleInput2Change,
      handleFunctionTypeChange,
      handleComputeFunction,
    },
  ] = useCommonFunctions();

  return (
    <div>
      <section>
        <div className="flex flex-row mt-2 space-x-2">
          <select
            className="bg-[var(--secondary)] rounded  font-bold flex items-center  icon-shadow focus:outline-[var(--secondary)] focus:border-none"
            value={functionType}
            onChange={handleFunctionTypeChange}
          >
            <option value="">Select function type</option>
            <option value="even">Is Even</option>
            <option value="odd">Is Odd</option>
            <option value="factorial">Factorial</option>
            <option value="gcd">GCD</option>
            <option value="lcm">LCM</option>
            <option value="prime">Is Prime</option>
            <option value="reverse">Reverse String</option>
          </select>
          <div className=" flex flex-col space-y-2">
            <input
              type="text"
              className="bg-[var(--primary)] rounded font-semibold p-1 icon-shadow outline-[var(--secondary)] border-[var(--secondary)]  border-[1px] placeholder:text-[var(--secondary)]"
              value={input1}
              onChange={handleInput1Change}
              placeholder={`value ${
                functionType === "gcd" || functionType === "lcm" ? "A" : ""
              }`}
            />
            {functionType === "gcd" || functionType === "lcm" ? (
              <input
                type="text"
                className="bg-[var(--primary)] rounded font-semibold p-1 icon-shadow outline-[var(--secondary)] border-[var(--secondary)]  border-[1px] placeholder:text-[var(--secondary)]"
                value={input2}
                onChange={handleInput2Change}
                placeholder="value B"
              />
            ) : null}
          </div>{" "}
          <button
            className="flex items-center cursor-pointer bg-[var(--secondary)] rounded-lg shadow-md p-2 self-end active:icon-shadow text-[var(--primary)]"
            onClick={handleComputeFunction}
          >
            <FaCalculator className={``} />
            Compute
          </button>
        </div>

        <div
          className={` w-full h-full mt-2 cursor-pointer bg-[var(--secondary)] rounded-lg shadow-md p-3 self-end ${
            !result ? "icon-shadow" : "text-[var(--primary)]"
          } `}
        >
          {loading
            ? "Loading..."
            : result !== ""
            ? `Result: ${result}`
            : "No result computed yet."}
        </div>
      </section>
    </div>
  );
}

export default CommonFunctionsPG;
