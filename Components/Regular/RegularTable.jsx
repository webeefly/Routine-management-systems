/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TableWrapper from "../../Shared/TableWrapper";
import TeacherAssign from "../Modal/TeacherAssign";
import Loading from "../../Shared/Loading";
import Swal from "sweetalert2";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const RegularTable = ({
  data,
  loading,
  selectShift,
  regularDayTab,
  eveningDayTab,
  setControl,
  control,
}) => {
  const [courseId, setCourseId] = useState("");
  const [rowIndex, setRowIndex] = useState(null);
  const [timeSlot, setTimeSlot] = useState([]);
  const [loadingTime, setLoadingTime] = useState(false);
  const [courseCredit, setCourseCredit] = useState(null);
  const [tab, setTab] = useState("SelectTeachers");
  // swapClass
  const [swapClass, setSwapClass] = useState({});
  //   Class swapping handler
  const classSwappingHandler = () => {
    fetch(
      "https://routine-management-system-backend.onrender.com/api/v1/routine/swap",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstRowIndex: swapClass?.firstRowIndex,
          secondRowIndex: swapClass?.secondRowIndex,
          routineId: swapClass?.routineId,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setControl(!control);
        setSwapClass({});
        Swal.fire({
          title: data?.message,
          position: "top-center",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((e) => {
        console.log(e);
        setControl(!control);
        setSwapClass({});
        Swal.fire({
          title: data?.message,
          position: "top-center",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // Handle click td
  const handleClickTD = (routineId, rowIndex, credit) => {
    const isSessional = credit % 1 !== 0;

    setSwapClass((prevState) => {
      // If routineId is different, select the class
      if (prevState.routineId !== routineId) {
        return {
          routineId: routineId,
          firstRowIndex: rowIndex,
          firstRowCredit: credit, // Store the credit of the first selected class
          secondRowIndex: null, // Reset secondRowIndex
        };
      } else {
        // If routineId is the same, deselect the class
        if (
          prevState.firstRowIndex === rowIndex ||
          prevState.secondRowIndex === rowIndex
        ) {
          // If the clicked class is already selected, deselect it
          return {
            ...prevState,
            firstRowIndex:
              prevState.firstRowIndex === rowIndex
                ? null
                : prevState.firstRowIndex,
            secondRowIndex:
              prevState.secondRowIndex === rowIndex
                ? null
                : prevState.secondRowIndex,
          };
        } else if (prevState.firstRowIndex === null) {
          // If neither firstRowIndex nor secondRowIndex matches, set firstRowIndex
          return {
            ...prevState,
            firstRowIndex: rowIndex,
            firstRowCredit: credit, // Store the credit of the first selected class
          };
        } else if (
          prevState.secondRowIndex === null &&
          ((isSessional && prevState.firstRowCredit % 1 !== 0) || // If first class is sessional
            (!isSessional && prevState.firstRowCredit % 1 === 0)) // If first class is not sessional
        ) {
          // If firstRowIndex is already set but secondRowIndex is not,
          // and the selected class is either sessional or normal,
          // and the credit of the first selected class matches the second class
          return {
            ...prevState,
            secondRowIndex: rowIndex,
          };
        }
      }
      return prevState; // Return prevState if no state update is needed
    });
  };

  useEffect(() => {
    setLoadingTime(true);
    fetch(
      "https://routine-management-system-backend.onrender.com/api/v1/times/get-times-slots?day=Saturday&shift=Regular"
    )
      .then((res) => res.json())
      .then((data) => setTimeSlot(data?.data), setLoadingTime(false))
      .catch((err) => {
        setLoadingTime(false);
        console.log(err);
      });
  }, []);
  if (loading || loadingTime) {
    return <Loading></Loading>;
  }
  return (
    <>
      <TableWrapper>
        <table
          border={1}
          className="table-auto font-bold text-center border-2 border-[#000] table-ui w-full h-[70vh]"
          cellPadding="0"
          cellSpacing={0}
        >
          <tr>
            <td
              className="text-[14px] border-[#000] border-2 bg-white border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              Batch
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center"
              rowSpan={2}
              colSpan={3}
            >
              Year/ Sem
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center"
              rowSpan={2}
              colSpan={2}
            >
              Sem No
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center"
              rowSpan={2}
              colSpan={2}
            >
              Room Number
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              {timeSlot[0]?.startTime}-{timeSlot[0]?.endTime}
              {timeSlot[0]?.period}
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              {timeSlot[1]?.startTime}-{timeSlot[1]?.endTime}
              {timeSlot[1]?.period}
            </td>

            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              colSpan={2}
            >
              {timeSlot[2]?.sessionalStartTime}-{timeSlot[2]?.sessionalEndTime}
              {timeSlot[2]?.period}
            </td>
            <td className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"></td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              colSpan={2}
            >
              {timeSlot[3]?.sessionalStartTime}-{timeSlot[3]?.sessionalEndTime}
              {timeSlot[3]?.period}
            </td>
          </tr>

          <tr>
            <td className="text-[14px] border-[#000] border-2 relative !z-[-1] border-b-[1px] border-r-[1px] whitespace-nowrap text-[#000] p-[16px] text-center">
              {timeSlot[2]?.startTime}-{timeSlot[2]?.endTime}
              {timeSlot[2]?.period}
            </td>
            <td className="text-[14px] border-[#000] border-2 relative !z-[-1] border-b-[1px] border-r-[1px] whitespace-nowrap text-[#000] p-[16px] text-center"></td>
            <td className="text-[14px] border-[#000] border-2 border-r-[1px] text-[#000] p-[16px] text-center  border-b-0"></td>
            <td className="text-[14px] border-[#000] border-2 relative !z-[-1] border-b-[1px] border-r-[1px] whitespace-nowrap text-[#000] p-[16px] text-center">
              {timeSlot[3]?.startTime}-{timeSlot[3]?.endTime}
              {timeSlot[3]?.period}
            </td>
            <td className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center"></td>
          </tr>
          {/* table body start here  */}

          {/* table footer */}

          {data?.map((item, index) => {
            const { batch, courses, room, sem, yearSem, _id } = item;
            // console.log(courses, "from batch regular", batch);
            return (
              <tr key={index}>
                <td
                  className={`px-[16px] border-r-[1px]
            bg-white  py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
                  colSpan={3}
                >
                  {batch}th
                </td>
                <td
                  className={`px-[16px] border-r-[1px]
            bg-white  py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
                  colSpan={3}
                >
                  {yearSem}
                </td>
                <td
                  className="px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px]"
                  colSpan={2}
                >
                  {sem}
                </td>
                <td
                  className="px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px]"
                  colSpan={2}
                >
                  {room}
                </td>
                {courses["0"]?.courseTitle ? (
                  <td
                    colSpan={3}
                    onClick={() => {
                      handleClickTD(
                        _id,
                        courses[0]?.rowIndex,
                        courses[0]?.credit
                      );
                    }}
                    onDoubleClick={() => {
                      setRowIndex(courses["0"]?.rowIndex);
                      setCourseId(_id);
                      setCourseCredit(courses["0"]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers")
                    }}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex === courses["0"]?.rowIndex ||
                        swapClass?.secondRowIndex === courses["0"]?.rowIndex) &&
                      "bg-purple-500"
                    }`}
                  >
                    {courses["0"]?.courseCode && (
                      <>
                        {courses["0"]?.courseCode} {courses["0"]?.courseTitle}{" "}
                        {courses["0"]?.teacher?.sortForm
                          ? `(${courses["0"]?.teacher?.sortForm})`
                          : ""}
                      </>
                    )}
                  </td>
                ) : (
                  <td
                    colSpan={3}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] `}
                  >
                    {courses["0"]?.courseCode && (
                      <>
                        {courses["0"]?.courseCode} {courses["0"]?.courseTitle}{" "}
                        {courses["0"]?.teacher?.sortForm
                          ? `(${courses["0"]?.teacher?.sortForm})`
                          : ""}
                      </>
                    )}
                  </td>
                )}
                {courses["1"]?.courseTitle ? (
                  <td
                    colSpan={3}
                    onClick={() => {
                      handleClickTD(
                        _id,
                        courses[1]?.rowIndex,
                        courses[1]?.credit
                      );
                    }}
                    onDoubleClick={() => {
                      setCourseId(_id);
                      setRowIndex(courses["1"]?.rowIndex);
                      setCourseCredit(courses["1"]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers")
                    }}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex === courses["1"]?.rowIndex ||
                        swapClass?.secondRowIndex === courses["1"]?.rowIndex) &&
                      "bg-purple-500"
                    }`}
                  >
                    {courses["1"]?.courseCode && (
                      <>
                        {courses["1"]?.courseCode} {courses["1"]?.courseTitle}{" "}
                        {courses["1"]?.teacher?.sortForm
                          ? `(${courses["1"]?.teacher?.sortForm})`
                          : ""}
                      </>
                    )}
                  </td>
                ) : (
                  <td
                    colSpan={3}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] `}
                  >
                    {courses["1"]?.courseCode && (
                      <>
                        {courses["1"]?.courseCode} {courses["1"]?.courseTitle}{" "}
                        {courses["1"]?.teacher?.sortForm
                          ? `(${courses["1"]?.teacher?.sortForm})`
                          : ""}
                      </>
                    )}
                  </td>
                )}
                {courses["2"]?.courseTitle ? (
                  <td
                    colSpan={
                      courses["2"]?.courseTitle?.includes("Sessional") ? 2 : 1
                    }
                    onClick={() => {
                      handleClickTD(
                        _id,
                        courses["2"]?.rowIndex,
                        courses["2"]?.credit
                      );
                    }}
                    onDoubleClick={() => {
                      setCourseId(_id);
                      setRowIndex(courses["2"]?.rowIndex);
                      setCourseCredit(courses["2"]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers")
                    }}
                    className={`px-[16px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex === courses["2"]?.rowIndex ||
                        swapClass?.secondRowIndex === courses["2"]?.rowIndex) &&
                      "bg-purple-500"
                    } ${
                      courses["2"]?.courseTitle?.includes("Sessional")
                        ? "border-r-0"
                        : ""
                    }`}
                  >
                    {courses["2"]?.courseCode && (
                      <>
                        {courses["2"]?.courseCode} {courses["2"]?.courseTitle}{" "}
                        {courses["2"]?.teacher?.sortForm
                          ? `(${courses["2"]?.teacher?.sortForm})`
                          : ""}{" "}
                        {courses["2"]?.room ? courses["2"]?.room : ""}
                      </>
                    )}
                  </td>
                ) : (
                  <td
                    colSpan={
                      courses["2"]?.courseTitle?.includes("Sessional") ? 2 : 1
                    }
                    className={`px-[16px] border-r-[0px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] ${
                      courses["2"]?.courseTitle?.includes("Sessional")
                        ? "border-r-0"
                        : ""
                    }`}
                  >
                    {courses["2"]?.courseCode && (
                      <>
                        {courses["2"]?.courseCode} {courses["2"]?.courseTitle}{" "}
                        {courses["2"]?.teacher?.sortForm
                          ? `(${courses["2"]?.teacher?.sortForm})`
                          : ""}
                      </>
                    )}
                  </td>
                )}
                {!courses["2"]?.courseTitle?.includes("Sessional") && (
                  <td
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] ${
                      courses["3"]?.courseTitle?.includes("Sessional")
                        ? "border-l-0"
                        : ""
                    }`}
                  ></td>
                )}

                <td className="px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 border-t-0 border-b-0 text-[20px]">
                  {" "}
                  {index === 4 ? "B" : ""} {index === 5 ? "R" : ""}{" "}
                  {index === 6 ? "E" : ""} {index === 7 ? "A" : ""}{" "}
                  {index === 8 ? "K" : ""}
                </td>
                {courses["3"]?.courseTitle ? (
                  <td
                    onClick={() => {
                      handleClickTD(
                        _id,
                        courses[3]?.rowIndex,
                        courses[3]?.credit
                      );
                    }}
                    onDoubleClick={() => {
                      setCourseId(_id);
                      setRowIndex(courses["3"]?.rowIndex);
                      setCourseCredit(courses["3"]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers")
                    }}
                    className={`px-[16px]  py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex === courses["3"]?.rowIndex ||
                        swapClass?.secondRowIndex === courses["3"]?.rowIndex) &&
                      "bg-purple-500"
                    }`}
                    colSpan={
                      courses["3"]?.courseTitle?.includes("Sessional") ? 2 : 1
                    }
                  >
                    {courses["3"]?.courseCode && (
                      <>
                        {courses["3"]?.courseCode} {courses["3"]?.courseTitle}{" "}
                        {courses["3"]?.teacher?.sortForm
                          ? `(${courses["3"]?.teacher?.sortForm})`
                          : ""}
                        {courses["3"]?.room ? courses["3"]?.room : ""}
                      </>
                    )}
                  </td>
                ) : (
                  <td
                    className={`px-[16px]  py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
                    colSpan={
                      courses["3"]?.courseTitle?.includes("Sessional") ? 2 : 1
                    }
                  >
                    {courses["3"]?.courseCode && (
                      <>
                        {courses["3"]?.courseCode} {courses["3"]?.courseTitle}{" "}
                        {courses["3"]?.teacher?.sortForm
                          ? `(${courses["3"]?.teacher?.sortForm})`
                          : ""}
                      </>
                    )}
                  </td>
                )}
                {!courses["3"]?.courseTitle?.includes("Sessional") && (
                  <td
                    className={`px-[16px]  py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
                  ></td>
                )}
              </tr>
            );
          })}
        </table>
        {/* Swapping btn */}
        {swapClass.firstRowIndex && swapClass.secondRowIndex && (
          <div className="h-screen w-full bg-slate-500 bg-opacity-75 flex items-center justify-center absolute left-0 top-0">
            <button className="my-btn-one" onClick={classSwappingHandler}>
              Swap <FaArrowRightArrowLeft />
            </button>
            <button
              className="my-btn-one ml-4"
              onClick={() => setSwapClass({})}
            >
              Reset
            </button>
          </div>
        )}
      </TableWrapper>
      <TeacherAssign
        courseId={courseId}
        rowIndex={rowIndex}
        selectShift={selectShift}
        regularDayTab={regularDayTab}
        eveningDayTab={eveningDayTab}
        setControl={setControl}
        control={control}
        courseCredit={courseCredit}
        tab={tab}
        setTab={setTab}
      />
    </>
  );
};

export default RegularTable;
