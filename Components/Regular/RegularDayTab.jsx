/* eslint-disable react/prop-types */
const RegularDayTab = ({ setRegularDayTab, regularDayTab }) => {
  // console.log(regularDayTab);
  return (
    <div className="flex gap-3 items-center mt-5">
      {["Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"].map(
        (elem, ind) => {
          return (
            <button
              key={ind}
              onClick={() => setRegularDayTab(elem)}
              className={`${
                regularDayTab == elem
                  ? "bg-orange-500 font-bold px-3 rounded-sm"
                  : ""
              }`}
            >
              {elem}
            </button>
          );
        }
      )}
    </div>
  );
};

export default RegularDayTab;
