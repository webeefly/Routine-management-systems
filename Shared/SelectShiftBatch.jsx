/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const SelectShiftBatch = ({ setSelectBatch, setSelectShift, selectShift }) => {
  return (
    <div className="flex justify-between items-center">
      {/* Select shift */}
      <div>
        <label htmlFor="" className="font-bold">
          Select Shift:{" "}
        </label>
        <select
          className="border-2 my-[10px] px-5 py-3 cursor-pointer outline-none"
          onChange={(e) => setSelectShift(e.target.value)}
          value={selectShift}
        >
          <option value="Regular">Regular</option>
          <option value="Evening">Evening</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        {/* Added new batch*/}
        <button
          onClick={() =>
            document.getElementById("add_new_batch_modal").showModal()
          }
          className="relative px-5 py-2 font-medium text-white group"
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
          <span className="relative">Add new batch</span>
        </button>

        {/* All faculty */}
        <Link to="/all-faculties">
          <button>
            {" "}
            <a
              href="#_"
              className="relative px-5 py-2 font-medium text-white group"
            >
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-orange-400 group-hover:bg-orange-500 group-hover:skew-x-12"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-orange-500 group-hover:bg-orange-700 group-hover:-skew-x-12"></span>
              <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-orange-500 -rotate-12"></span>
              <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-orange-500 -rotate-12"></span>
              <span className="relative">All Faculty</span>
            </a>
          </button>
        </Link>

        <button
          onClick={() => document.getElementById("uploadRoutine").showModal()}
          className="relative px-5 py-2 font-medium text-white group"
        >
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-purple-500 group-hover:bg-purple-700 group-hover:skew-x-12"></span>
          <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-purple-700 group-hover:bg-purple-500 group-hover:-skew-x-12"></span>
          <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-purple-600 -rotate-12"></span>
          <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-purple-400 -rotate-12"></span>
          <span className="relative">Upload Routine</span>
        </button>
      </div>

      {/* Select batch */}
      {/* <div>
        <label htmlFor="" className="font-bold">
          Select Batch:{" "}
        </label>
        <select
          className="border-2 my-[10px] px-5 py-3 cursor-pointer outline-none"
          onChange={(e) => setSelectBatch(e.target.value)}
          name=""
          id=""
        >
          <option value="">Selected Batch</option>

          <option value="16">16th</option>
          <option value="17">17th</option>
          <option value="18">18th</option>
          <option value="19">19th</option>
          <option value="20">20th</option>
          <option value="21">21th</option>
          <option value="22">22th</option>
          <option value="23">23th</option>
          <option value="24">24th</option>
          <option value="25">25th</option>
          <option value="26">26th</option>
          <option value="27">27th</option>
        </select>
      </div>  */}
    </div>
  );
};

export default SelectShiftBatch;
