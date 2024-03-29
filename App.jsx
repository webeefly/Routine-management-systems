import { useState } from "react";
import { useEffect } from "react";

import RegularDayTab from "./Components/Regular/RegularDayTab";
import RegularBatchTable from "./Components/Regular/RegularBatchTable";
import SelectShiftBatch from "./Shared/SelectShiftBatch";
import EveningDayTab from "./Components/Evening/EveningDayTab";
import RegularTable from "./Components/Regular/RegularTable";
import EveningTable from "./Components/Evening/EveningTable";
import EveningFridayTable from "./Components/Evening/EveningFridayTable";
import AddNewBatchModal from "./Components/Modal/AddNewBatchModal";
import UploadRoutine from "./Components/Modal/UploadRoutine";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectBatch, setSelectBatch] = useState("");
  const [selectShift, setSelectShift] = useState("Regular");
  const [regularDayTab, setRegularDayTab] = useState("Saturday");
  const [eveningDayTab, setEveningDayTab] = useState("Thursday");
  const [control, setControl] = useState(false);
  /*  
  api : "https://routine-management-system-backend.onrender.com/api/v1/routine?day=Saturday&shift=Regular"
  */
  useEffect(() => {
    setLoading(true);

    fetch(
      `https://routine-management-system-backend.onrender.com/api/v1/routine?day=${
        selectShift === "Regular" ? regularDayTab : eveningDayTab
      }&shift=${selectShift}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        // console.log(data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [regularDayTab, eveningDayTab, selectShift, control]);

  return (
    <div className="container mx-auto">
      {/* To select shift and batch */}
      <SelectShiftBatch
        setSelectBatch={setSelectBatch}
        setSelectShift={setSelectShift}
        selectShift={selectShift}
        selectBatch={selectBatch}
      ></SelectShiftBatch>

      {/* Regular batch table */}
      {!selectBatch && selectShift === "Regular" && (
        <RegularTable
          data={data.data}
          loading={loading}
          selectShift={selectShift}
          regularDayTab={regularDayTab}
          eveningDayTab={eveningDayTab}
          setControl={setControl}
          control={control}
        ></RegularTable>
      )}

      {/* Evening batch table  Friday*/}
      {!selectBatch &&
      selectShift === "Evening" &&
      eveningDayTab === "Friday" ? (
        <EveningFridayTable
          eveningDayTab={eveningDayTab}
          data={data.data}
          loading={loading}
          selectShift={selectShift}
          setControl={setControl}
          control={control}
        ></EveningFridayTable>
      ) : (
        !selectBatch &&
        selectShift === "Evening" &&
        eveningDayTab != "Friday" && (
          <EveningTable
            data={data.data}
            loading={loading}
            selectShift={selectShift}
            eveningDayTab={eveningDayTab}
            regularDayTab={regularDayTab}
            setControl={setControl}
            control={control}
          />
        )
      )}

      {/* Individual table */}
      {selectBatch && selectShift === "Regular" && (
        <RegularBatchTable selectBatch={selectBatch}></RegularBatchTable>
      )}

      {/* Regular day tab */}
      {selectShift == "Regular" && !selectBatch && (
        <RegularDayTab
          setRegularDayTab={setRegularDayTab}
          regularDayTab={regularDayTab}
        ></RegularDayTab>
      )}
      {/* Evening day tab */}
      {selectShift == "Evening" && !selectBatch && (
        <EveningDayTab
          setEveningDayTab={setEveningDayTab}
          eveningDayTab={eveningDayTab}
        ></EveningDayTab>
      )}

      {/* Modal */}
      <AddNewBatchModal setControl={setControl} control={control} />
      <UploadRoutine control={control} setControl={setControl}></UploadRoutine>
    </div>
  );
};

export default App;
