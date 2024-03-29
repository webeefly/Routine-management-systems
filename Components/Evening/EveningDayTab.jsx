/* eslint-disable react/prop-types */
const EveningDayTab = ({ setEveningDayTab, eveningDayTab }) => {
  console.log(eveningDayTab);
  return (
    <div className="flex gap-3 items-center mt-5">
      {["Thursday", "Saturday", "Friday"].map((elem, ind) => {
        return (
          <button
            key={ind}
            onClick={() => setEveningDayTab(elem)}
            className={`${
              eveningDayTab == elem
                ? "bg-orange-500 font-bold px-3 rounded-sm"
                : ""
            }`}
          >
            {elem}
          </button>
        );
      })}
    </div>
  );
};

export default EveningDayTab;
