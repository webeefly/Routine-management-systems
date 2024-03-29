import { useState } from "react";
import TableWrapper from "../../Shared/TableWrapper";
import TeacherAssign from "../Modal/TeacherAssign";
import Loading from "../../Shared/Loading";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const EveningFridayTable = ({
  data,
  loading,
  selectShift,
  eveningDayTab,
  setControl,
  control,
}) => {
  const [courseId, setCourseId] = useState("");
  const [rowIndex, setRowIndex] = useState(null);
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

  console.log(swapClass, "swapClass");
  console.log(data, "data");

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <TableWrapper>
      <table
        border={1}
        className="table-auto font-bold text-center border-2 border-[#000] table-ui w-full text-white"
        cellPadding="0"
        cellSpacing={0}
        //   style={{
        //     position: "relative", // Ensure table remains on top of watermark
        //     zIndex: 1, // Set higher z-index to keep table above watermark
        //   }}
      >
        <thead>
          <tr>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-black p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              Batch
            </td>
            <td
              className="text-[14px] border-[#000]  border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center"
              rowSpan={2}
              colSpan={3}
            >
              Year/ Sem
            </td>
            <td
              className="text-[14px] border-[#000]  border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center"
              rowSpan={2}
              colSpan={2}
            >
              Sem No
            </td>
            <td
              className="text-[14px]  border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center"
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
              09:00-09:50
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              9:50 - 10:40
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              10:50 - 11:40
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              11:40 - 12:30
            </td>

            <td className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"></td>
            {/* After Break */}
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              2:10 - 3:00
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              3:00 - 3:50
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              3:50 -4:40
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              4:50 - 5:40
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              5:40 - 6:30
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              6:50 - 7:40
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              7:40 - 8:30
            </td>
          </tr>
        </thead>

        {/* table body start here  */}
        {!loading &&
          data?.map((item, index) => {
            const { _id, batch, courses, room, sem, yearSem } = item;
            const classesBeforeBreak = courses.slice(0, 4);

            console.log(classesBeforeBreak, "Class Before Break");

            const classesAfterBreak = courses.slice(4, 11);

            return (
              <tr key={_id}>
                <td
                  className={`px-[16px] border-r-[1px] bg-white py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
                  colSpan={3}
                >
                  {batch}th
                </td>
                <td
                  className={`px-[16px] border-r-[1px] bg-white py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
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
                  className="px-[
                          16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px]"
                  colSpan={2}
                >
                  {room}
                </td>

                {/* First Two Class */}
                <td
                  onClick={() => {
                    if (
                      classesBeforeBreak[0]?.courseCode ||
                      classesBeforeBreak[0]?.courseTitle
                    ) {
                      handleClickTD(
                        _id,
                        classesBeforeBreak[0]?.rowIndex,
                        classesBeforeBreak[0]?.credit
                      );
                    }
                  }}
                  onDoubleClick={() => {
                    if (
                      classesBeforeBreak[0]?.courseCode ||
                      classesBeforeBreak[0]?.courseTitle
                    ) {
                      setCourseId(_id);
                      setRowIndex(classesBeforeBreak[0]?.rowIndex);
                      setCourseCredit(classesBeforeBreak[0]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers");
                    }
                  }}
                  colSpan={`${
                    classesBeforeBreak[0]?.courseCode ===
                    classesBeforeBreak[1]?.courseCode
                      ? "6"
                      : "3"
                  }`}
                  className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                    swapClass?.routineId === _id &&
                    (swapClass?.firstRowIndex ===
                      classesBeforeBreak[0]?.rowIndex ||
                      swapClass?.secondRowIndex ===
                        classesBeforeBreak[0]?.rowIndex) &&
                    "bg-purple-500"
                  }`}
                >
                  {classesBeforeBreak[0]?.courseCode && (
                    <>
                      {classesBeforeBreak[0]?.courseCode} (
                      {classesBeforeBreak[0]?.courseTitle}){" "}
                      {classesBeforeBreak[0]?.teacher?.sortForm ?? ""}
                      {classesBeforeBreak[0]?.room ?? ""}
                    </>
                  )}
                </td>

                {classesBeforeBreak[0]?.courseCode !==
                classesBeforeBreak[1]?.courseCode ? (
                  <td
                    onClick={() => {
                      if (
                        classesBeforeBreak[1]?.courseCode ||
                        classesBeforeBreak[1]?.courseTitle
                      ) {
                        handleClickTD(
                          _id,
                          classesBeforeBreak[1]?.rowIndex,
                          classesBeforeBreak[1]?.credit
                        );
                      }
                    }}
                    onDoubleClick={() => {
                      if (
                        classesBeforeBreak[1]?.courseCode ||
                        classesBeforeBreak[1]?.courseTitle
                      ) {
                        setCourseId(_id);
                        setRowIndex(classesBeforeBreak[1]?.rowIndex);
                        setCourseCredit(classesBeforeBreak[1]?.credit);
                        document.getElementById("teacher_assign").showModal();
                        setTab("SelectTeachers");
                      }
                    }}
                    colSpan={`${
                      classesBeforeBreak[1]?.courseCode ===
                      classesBeforeBreak[2]?.courseCode
                        ? "6"
                        : "3"
                    }`}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer  ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex ===
                        classesBeforeBreak[1]?.rowIndex ||
                        swapClass?.secondRowIndex ===
                          classesBeforeBreak[1]?.rowIndex) &&
                      "bg-purple-500"
                    }`}
                  >
                    {classesBeforeBreak[1]?.courseCode && (
                      <>
                        {classesBeforeBreak[1]?.courseCode} (
                        {classesBeforeBreak[1]?.courseTitle}){" "}
                        {classesBeforeBreak[1]?.teacher?.sortForm ?? ""}
                        {classesBeforeBreak[1]?.room ?? ""}
                      </>
                    )}
                  </td>
                ) : (
                  ""
                )}
                {/* Second Two Class */}
                <td
                  onClick={() => {
                    if (
                      classesBeforeBreak[2]?.courseTitle ||
                      classesBeforeBreak[2]?.courseCode
                    ) {
                      handleClickTD(
                        _id,
                        classesBeforeBreak[2]?.rowIndex,
                        classesBeforeBreak[2]?.credit
                      );
                    }
                  }}
                  onDoubleClick={() => {
                    if (
                      classesBeforeBreak[2]?.courseTitle ||
                      classesBeforeBreak[2]?.courseCode
                    ) {
                      setCourseId(_id);
                      setRowIndex(classesBeforeBreak[2]?.rowIndex);
                      setCourseCredit(classesBeforeBreak[2]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers");
                    }
                  }}
                  colSpan={`${
                    classesBeforeBreak[2]?.courseCode ===
                    classesBeforeBreak[3]?.courseCode
                      ? "6"
                      : "3"
                  }`}
                  className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer  ${
                    swapClass?.routineId === _id &&
                    (swapClass?.firstRowIndex ===
                      classesBeforeBreak[2]?.rowIndex ||
                      swapClass?.secondRowIndex ===
                        classesBeforeBreak[2]?.rowIndex) &&
                    "bg-purple-500"
                  }`}
                >
                  {classesBeforeBreak[2]?.courseCode && (
                    <>
                      {classesBeforeBreak[2]?.courseCode} (
                      {classesBeforeBreak[2]?.courseTitle}){" "}
                      {classesBeforeBreak[2]?.teacher?.sortForm ?? ""}
                      {classesBeforeBreak[2]?.room ?? ""}
                    </>
                  )}
                </td>
                {classesBeforeBreak[2]?.courseCode !==
                classesBeforeBreak[3]?.courseCode ? (
                  <td
                    onClick={() => {
                      if (
                        classesBeforeBreak[3]?.courseTitle ||
                        classesBeforeBreak[3]?.courseCode
                      ) {
                        handleClickTD(
                          _id,
                          classesBeforeBreak[3]?.rowIndex,
                          classesBeforeBreak[3]?.credit
                        );
                      }
                    }}
                    onDoubleClick={() => {
                      if (
                        classesBeforeBreak[3]?.courseTitle ||
                        classesBeforeBreak[3]?.courseCode
                      ) {
                        setCourseId(_id);
                        setRowIndex(classesBeforeBreak[3]?.rowIndex);
                        setCourseCredit(classesBeforeBreak[3]?.credit);
                        document.getElementById("teacher_assign").showModal();
                        setTab("SelectTeachers");
                      }
                    }}
                    colSpan={3}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer  ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex ===
                        classesBeforeBreak[3]?.rowIndex ||
                        swapClass?.secondRowIndex ===
                          classesBeforeBreak[3]?.rowIndex) &&
                      "bg-purple-500"
                    }`}
                  >
                    {classesBeforeBreak[3]?.courseCode && (
                      <>
                        {classesBeforeBreak[3]?.courseCode} (
                        {classesBeforeBreak[3]?.courseTitle}){" "}
                        {classesBeforeBreak[3]?.teacher?.sortForm ?? ""}
                        {classesBeforeBreak[3]?.room ?? ""}
                      </>
                    )}
                  </td>
                ) : (
                  ""
                )}

                <td className="px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 border-t-0 border-b-0 text-[20px]">
                  {" "}
                  {index === 4 ? "B" : ""} {index === 5 ? "R" : ""}{" "}
                  {index === 6 ? "E" : ""} {index === 7 ? "A" : ""}{" "}
                  {index === 8 ? "K" : ""}
                </td>
                {/* After Half Period */}
                {/* Number 5 */}
                <td
                  onClick={() => {
                    if (
                      classesAfterBreak[0]?.courseTitle ||
                      classesAfterBreak[0]?.courseCode
                    ) {
                      handleClickTD(
                        _id,
                        classesAfterBreak[0]?.rowIndex,
                        classesAfterBreak[0]?.credit
                      );
                    }
                  }}
                  onDoubleClick={() => {
                    if (
                      classesAfterBreak[0]?.courseTitle ||
                      classesAfterBreak[0]?.courseCode
                    ) {
                      setCourseId(_id);
                      setRowIndex(classesAfterBreak[0]?.rowIndex);
                      setCourseCredit(classesAfterBreak[0]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers");
                    }
                  }}
                  colSpan={`${
                    classesAfterBreak[0]?.courseCode ===
                    classesAfterBreak[1]?.courseCode
                      ? "6"
                      : "3"
                  }`}
                  className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer  ${
                    swapClass?.routineId === _id &&
                    (swapClass?.firstRowIndex ===
                      classesAfterBreak[0]?.rowIndex ||
                      swapClass?.secondRowIndex ===
                        classesAfterBreak[0]?.rowIndex) &&
                    "bg-purple-500"
                  }`}
                >
                  {classesAfterBreak[0]?.courseCode && (
                    <>
                      {classesAfterBreak[0]?.courseCode} (
                      {classesAfterBreak[0]?.courseTitle}){" "}
                      {classesAfterBreak[0]?.teacher?.sortForm ?? ""}
                      {classesAfterBreak[0]?.room ?? ""}
                    </>
                  )}
                </td>

                <td
                  onClick={() => {
                    if (
                      classesAfterBreak[1]?.courseCode ||
                      classesAfterBreak[1]?.courseCode
                    ) {
                      handleClickTD(
                        _id,
                        classesAfterBreak[1]?.rowIndex,
                        classesAfterBreak[1]?.credit
                      );
                    }
                  }}
                  onDoubleClick={() => {
                    if (
                      classesAfterBreak[1]?.courseCode ||
                      classesAfterBreak[1]?.courseTitle
                    ) {
                      setCourseId(_id);
                      setRowIndex(classesAfterBreak[1]?.rowIndex);
                      setCourseCredit(classesAfterBreak[1]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers");
                    }
                  }}
                  colSpan={`${
                    classesAfterBreak[1]?.courseCode ===
                    classesAfterBreak[2]?.courseCode
                      ? "6"
                      : "3"
                  }`}
                  className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                    swapClass?.routineId === _id &&
                    (swapClass?.firstRowIndex ===
                      classesAfterBreak[1]?.rowIndex ||
                      swapClass?.secondRowIndex ===
                        classesAfterBreak[1]?.rowIndex) &&
                    "bg-purple-500"
                  }`}
                >
                  {classesAfterBreak[1]?.courseCode && (
                    <>
                      {classesAfterBreak[1]?.courseCode} (
                      {classesAfterBreak[1]?.courseTitle}){" "}
                      {classesAfterBreak[1]?.teacher?.sortForm ?? ""}
                      {classesAfterBreak[1]?.room ?? ""}
                    </>
                  )}
                </td>
                {classesAfterBreak[1]?.courseCode !==
                  classesAfterBreak[2]?.courseCode && (
                  <td
                    onClick={() => {
                      if (
                        classesAfterBreak[2]?.courseCode ||
                        classesAfterBreak[2]?.courseTitle
                      ) {
                        handleClickTD(
                          _id,
                          classesAfterBreak[2]?.rowIndex,
                          classesAfterBreak[2]?.credit
                        );
                      }
                    }}
                    onDoubleClick={() => {
                      if (
                        classesAfterBreak[2]?.courseCode ||
                        classesAfterBreak[2]?.courseTitle
                      ) {
                        setCourseId(_id);
                        setRowIndex(classesAfterBreak[2]?.rowIndex);
                        setCourseCredit(classesAfterBreak[2]?.credit);
                        document.getElementById("teacher_assign").showModal();
                        setTab("SelectTeachers");
                      }
                    }}
                    colSpan={3}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex ===
                        classesAfterBreak[2]?.rowIndex ||
                        swapClass?.secondRowIndex ===
                          classesAfterBreak[2]?.rowIndex) &&
                      "bg-purple-500"
                    }`}
                  >
                    {classesAfterBreak[2]?.courseCode && (
                      <>
                        {classesAfterBreak[2]?.courseCode} (
                        {classesAfterBreak[2]?.courseTitle}){" "}
                        {classesAfterBreak[2]?.teacher?.sortForm ?? ""}
                        {classesAfterBreak[2]?.room ?? ""}
                      </>
                    )}
                  </td>
                )}

                {/* 7 and 8 */}

                <td
                  onClick={() => {
                    if (
                      classesAfterBreak[3]?.courseCode ||
                      classesAfterBreak[3]?.courseTitle
                    ) {
                      handleClickTD(
                        _id,
                        classesAfterBreak[3]?.rowIndex,
                        classesAfterBreak[3]?.credit
                      );
                    }
                  }}
                  onDoubleClick={() => {
                    if (
                      classesAfterBreak[3]?.courseCode ||
                      classesAfterBreak[3]?.courseTitle
                    ) {
                      setCourseId(_id);
                      setRowIndex(classesAfterBreak[3]?.rowIndex);
                      setCourseCredit(classesAfterBreak[3]?.credit);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers");
                    }
                  }}
                  colSpan={`${
                    classesAfterBreak[3]?.courseCode ===
                    classesAfterBreak[4]?.courseCode
                      ? "6"
                      : "3"
                  }`}
                  className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                    swapClass?.routineId === _id &&
                    (swapClass?.firstRowIndex ===
                      classesAfterBreak[3]?.rowIndex ||
                      swapClass?.secondRowIndex ===
                        classesAfterBreak[3]?.rowIndex) &&
                    "bg-purple-500"
                  }`}
                >
                  {classesAfterBreak[3]?.courseCode && (
                    <>
                      {classesAfterBreak[3]?.courseCode} (
                      {classesAfterBreak[3]?.courseTitle}){" "}
                      {classesAfterBreak[3]?.teacher?.sortForm ?? ""}
                      {classesAfterBreak[3]?.room ?? ""}
                    </>
                  )}
                </td>
                {classesAfterBreak[3]?.courseCode !==
                  classesAfterBreak[4]?.courseCode && (
                  <td
                    onClick={() => {
                      if (
                        classesAfterBreak[4]?.courseCode ||
                        classesAfterBreak[4]?.courseTitle
                      ) {
                        handleClickTD(
                          _id,
                          classesAfterBreak[4]?.rowIndex,
                          classesAfterBreak[4]?.credit
                        );
                      }
                    }}
                    onDoubleClick={() => {
                      if (
                        classesAfterBreak[4]?.courseCode ||
                        classesAfterBreak[4]?.courseTitle
                      ) {
                        setCourseId(_id);
                        setRowIndex(classesAfterBreak[4]?.rowIndex);
                        setCourseCredit(classesAfterBreak[4]?.credit);
                        document.getElementById("teacher_assign").showModal();
                        setTab("SelectTeachers");
                      }
                    }}
                    colSpan={3}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex ===
                        classesAfterBreak[4]?.rowIndex ||
                        swapClass?.secondRowIndex ===
                          classesAfterBreak[4]?.rowIndex) &&
                      "bg-purple-500"
                    }`}
                  >
                    {classesAfterBreak[4]?.courseCode && (
                      <>
                        {classesAfterBreak[4]?.courseCode} (
                        {classesAfterBreak[4]?.courseTitle}){" "}
                        {classesAfterBreak[4]?.teacher?.sortForm ?? ""}
                        {classesAfterBreak[4]?.room ?? ""}
                      </>
                    )}
                  </td>
                )}

                <td
                  onClick={() => {
                    if (
                      classesAfterBreak[5]?.courseCode ||
                      classesAfterBreak[5]?.courseTitle
                    ) {
                      handleClickTD(
                        _id,
                        classesAfterBreak[5]?.rowIndex,
                        classesAfterBreak[5]?.credit
                      );
                    }
                  }}
                  onDoubleClick={() => {
                    if (
                      classesAfterBreak[5]?.courseCode ||
                      classesAfterBreak[5]?.courseTitle
                    ) {
                      setCourseCredit(classesAfterBreak[5]?.credit);
                      setCourseId(_id);
                      setRowIndex(classesAfterBreak[5]?.rowIndex);
                      document.getElementById("teacher_assign").showModal();
                      setTab("SelectTeachers");
                    }
                  }}
                  colSpan={`${
                    classesAfterBreak[5]?.courseCode ===
                    classesAfterBreak[6]?.courseCode
                      ? "6"
                      : "3"
                  }`}
                  className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                    swapClass?.routineId === _id &&
                    (swapClass?.firstRowIndex ===
                      classesAfterBreak[5]?.rowIndex ||
                      swapClass?.secondRowIndex ===
                        classesAfterBreak[5]?.rowIndex) &&
                    "bg-purple-500"
                  }`}
                >
                  {classesAfterBreak[5]?.courseCode && (
                    <>
                      {classesAfterBreak[5]?.courseCode} (
                      {classesAfterBreak[5]?.courseTitle}){" "}
                      {classesAfterBreak[5]?.teacher?.sortForm ?? ""}
                      {classesAfterBreak[5]?.room ?? ""}
                    </>
                  )}
                </td>

                {classesAfterBreak[5]?.courseCode !==
                  classesAfterBreak[6]?.courseCode && (
                  <td
                    onClick={() => {
                      if (
                        classesAfterBreak[6]?.courseCode ||
                        classesAfterBreak[6]?.courseTitle
                      ) {
                        handleClickTD(
                          _id,
                          classesAfterBreak[6]?.rowIndex,
                          classesAfterBreak[6]?.credit
                        );
                      }
                    }}
                    onDoubleClick={() => {
                      if (
                        classesAfterBreak[6]?.courseCode ||
                        classesAfterBreak[6]?.courseTitle
                      ) {
                        setCourseId(_id);
                        setRowIndex(classesAfterBreak[6]?.rowIndex);
                        setCourseCredit(classesAfterBreak[6]?.credit);
                        document.getElementById("teacher_assign").showModal();
                        setTab("SelectTeachers");
                      }
                    }}
                    colSpan={3}
                    className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] cursor-pointer ${
                      swapClass?.routineId === _id &&
                      (swapClass?.firstRowIndex ===
                        classesAfterBreak[6]?.rowIndex ||
                        swapClass?.secondRowIndex ===
                          classesAfterBreak[6]?.rowIndex) &&
                      "bg-purple-500"
                    }`}
                  >
                    {classesAfterBreak[6]?.courseCode && (
                      <>
                        {classesAfterBreak[6]?.courseCode} (
                        {classesAfterBreak[6]?.courseTitle}){" "}
                        {classesAfterBreak[6]?.teacher?.sortForm ?? ""}
                        {classesAfterBreak[6]?.room ?? ""}
                      </>
                    )}
                  </td>
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
          <button className="my-btn-one ml-4" onClick={() => setSwapClass({})}>
            Reset
          </button>
        </div>
      )}
      <TeacherAssign
        courseId={courseId}
        rowIndex={rowIndex}
        selectShift={selectShift}
        eveningDayTab={eveningDayTab}
        setControl={setControl}
        control={control}
        courseCredit={courseCredit}
        tab={tab}
        setTab={setTab}
      ></TeacherAssign>
    </TableWrapper>
  );
};

export default EveningFridayTable;
