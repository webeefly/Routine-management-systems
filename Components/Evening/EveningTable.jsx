import { useEffect, useState } from "react";
import TableWrapper from "../../Shared/TableWrapper";
import TeacherAssign from "../Modal/TeacherAssign";
import Loading from "../../Shared/Loading";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import Swal from "sweetalert2";

const EveningTable = ({
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
  const [courseCredit, setCourseCredit] = useState(null);
  const [swapClass, setSwapClass] = useState({});
  const [tab, setTab] = useState("SelectTeachers");
  const [timeSlot, setTimeSlot] = useState([]);
  const [timeSlotLoading, setTimeSlotLoading] = useState(false);

  useEffect(() => {
    setTimeSlotLoading(true);
    fetch(
      "https://routine-management-system-backend.onrender.com/api/v1/times/get-times-slots?day=Saturday&shift=Evening"
    )
      .then((res) => res.json())
      .then((data) => {
        setTimeSlot(data?.data);
        setTimeSlotLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setTimeSlotLoading(false);
      });
  }, []);
  if (loading || timeSlotLoading) {
    return <Loading></Loading>;
  }

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

  return (
    <TableWrapper>
      <table className="min-w-full table-auto mb-1 border-2 border-black">
        <thead>
          <tr>
            <th className="border-2 border-black p-3">Batch</th>
            <th className="border-2 border-black p-3">Year/Sem</th>
            <th className="border-2 border-black p-3">Sem No.</th>
            <th className="border-2 border-black p-3">Room No.</th>
            <th className="border-2 border-black p-3">
              {" "}
              {timeSlot[0]?.startTime} {timeSlot[0]?.period} -{" "}
              {timeSlot[0]?.endTime} {timeSlot[0]?.period}{" "}
            </th>
            <th className="border-2 border-black p-3">
              {timeSlot[1]?.startTime} {timeSlot[1]?.period} -{" "}
              {timeSlot[1]?.endTime} {timeSlot[1]?.period}
            </th>
            <th className="border-2 border-black border-b-0 p-3"></th>
            <th className="border-2 border-black p-3">
              {timeSlot[2]?.startTime} {timeSlot[2]?.period} -{" "}
              {timeSlot[2]?.endTime} {timeSlot[2]?.period}
            </th>
            <th className="border-2 border-black p-3">
              {timeSlot[3]?.startTime} {timeSlot[3]?.period} -{" "}
              {timeSlot[3]?.endTime} {timeSlot[3]?.period}
            </th>
          </tr>
        </thead>

        <tbody className=" text-center font-semibold">
          {loading
            ? "loading"
            : data?.map((elem, ind) => {
                const { batch, yearSem, sem, room, courses, _id } = elem;
                const classesBeforeBreak = courses.slice(0, 2);
                const classesAfterBreak = courses.slice(2, 4);
                return (
                  <tr key={ind}>
                    <td className="border-2 border-black p-3">{batch}</td>
                    <td className="border-2 border-black p-3">{yearSem}</td>
                    <td className="border-2 border-black p-3">{sem}</td>
                    <td className="border-2 border-black p-3">{room}</td>
                    {classesBeforeBreak[0]?.courseCode ===
                    classesBeforeBreak[1]?.courseCode ? (
                      <td
                        className={`border-2 border-black p-3 ${
                          swapClass?.routineId === elem?._id &&
                          (swapClass?.firstRowIndex ===
                            classesBeforeBreak[0]?.rowIndex ||
                            swapClass?.secondRowIndex ===
                              classesBeforeBreak[0]?.rowIndex) &&
                          "bg-purple-500"
                        }`}
                        onClick={() => {
                          if (
                            classesBeforeBreak[0]?.courseCode ||
                            classesBeforeBreak[0]?.courseTitle
                          ) {
                            handleClickTD(
                              elem?._id,
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
                            document
                              .getElementById("teacher_assign")
                              .showModal();
                            setTab("SelectTeachers");
                          }
                        }}
                        colSpan={2}
                      >
                        {`${classesBeforeBreak[0]?.courseCode ?? ""} ${
                          classesBeforeBreak[0]?.courseTitle
                            ? `(${classesBeforeBreak[0]?.courseTitle})`
                            : ""
                        } ${classesBeforeBreak[0]?.teacher?.sortForm ?? ""} ${
                          classesBeforeBreak[0]?.room ?? ""
                        }`}
                      </td>
                    ) : (
                      classesBeforeBreak?.map((classBeforeBreak, ind) => (
                        <td
                          key={ind}
                          onClick={() => {
                            if (
                              classBeforeBreak?.courseCode ||
                              classBeforeBreak?.courseTitle
                            ) {
                              handleClickTD(
                                elem?._id,
                                classBeforeBreak?.rowIndex,
                                classBeforeBreak?.credit
                              );
                            }
                          }}
                          onDoubleClick={() => {
                            if (
                              classBeforeBreak?.courseCode ||
                              classBeforeBreak?.courseTitle
                            ) {
                              setCourseId(_id);
                              setRowIndex(classBeforeBreak?.rowIndex);
                              setCourseCredit(classBeforeBreak?.credit);
                              document
                                .getElementById("teacher_assign")
                                .showModal();
                              setTab("SelectTeachers");
                            }
                          }}
                          className={`border-2 border-black p-3 ${
                            swapClass?.routineId === elem?._id &&
                            (swapClass?.firstRowIndex ===
                              classBeforeBreak?.rowIndex ||
                              swapClass?.secondRowIndex ===
                                classBeforeBreak?.rowIndex) &&
                            "bg-purple-500"
                          }`}
                        >
                          {`${classBeforeBreak?.courseCode ?? ""} ${
                            classBeforeBreak?.courseTitle
                              ? `(${classBeforeBreak?.courseTitle})`
                              : ""
                          }  ${classBeforeBreak?.teacher?.sortForm ?? ""}`}
                        </td>
                      ))
                    )}
                    {ind === 0 && (
                      <td rowSpan={data.length}>
                        <div className="flex flex-col font-bold">
                          {"BREAK".split("").map((elem, ind) => (
                            <span key={ind}>{elem}</span>
                          ))}
                        </div>
                      </td>
                    )}
                    {classesAfterBreak[0]?.courseCode ===
                    classesAfterBreak[1]?.courseCode ? (
                      <td
                        onClick={() => {
                          if (
                            classesAfterBreak[0]?.courseCode ||
                            classesAfterBreak[0]?.courseTitle
                          ) {
                            handleClickTD(
                              elem?._id,
                              classesAfterBreak[0]?.rowIndex,
                              classesAfterBreak[0]?.credit
                            );
                          }
                        }}
                        onDoubleClick={() => {
                          if (
                            classesAfterBreak[0]?.courseCode ||
                            classesAfterBreak[0]?.courseTitle
                          ) {
                            setCourseId(_id);
                            setRowIndex(classesAfterBreak[0]?.rowIndex);
                            setCourseCredit(classesAfterBreak[0]?.credit);
                            document
                              .getElementById("teacher_assign")
                              .showModal();
                            setTab("SelectTeachers");
                          }
                        }}
                        className={`border-2 border-black p-3 ${
                          swapClass?.routineId === elem?._id &&
                          (swapClass?.firstRowIndex ===
                            classesAfterBreak[0]?.rowIndex ||
                            swapClass?.secondRowIndex ===
                              classesAfterBreak[0]?.rowIndex) &&
                          "bg-purple-500"
                        }`}
                        colSpan={2}
                      >
                        {`${classesAfterBreak[0]?.courseCode ?? ""} ${
                          classesAfterBreak[0]?.courseTitle
                            ? `(${classesAfterBreak[0]?.courseTitle})`
                            : ""
                        } ${classesAfterBreak[0]?.teacher?.sortForm ?? ""} ${
                          classesAfterBreak[0]?.room ?? ""
                        }`}
                      </td>
                    ) : (
                      classesAfterBreak?.map((classAfterBreak, ind) => (
                        <td
                          key={ind}
                          onClick={() => {
                            if (
                              classAfterBreak?.courseCode ||
                              classAfterBreak?.courseTitle
                            ) {
                              handleClickTD(
                                elem?._id,
                                classAfterBreak?.rowIndex,
                                classAfterBreak?.credit
                              );
                            }
                          }}
                          onDoubleClick={() => {
                            if (
                              classAfterBreak?.courseCode ||
                              classAfterBreak?.courseTitle
                            ) {
                              setCourseId(_id);
                              setRowIndex(classAfterBreak?.rowIndex);
                              setCourseCredit(classAfterBreak?.credit);
                              document
                                .getElementById("teacher_assign")
                                .showModal();
                              setTab("SelectTeachers");
                            }
                          }}
                          className={`border-2 border-black p-3 ${
                            swapClass?.routineId === elem?._id &&
                            (swapClass?.firstRowIndex ===
                              classAfterBreak?.rowIndex ||
                              swapClass?.secondRowIndex ===
                                classAfterBreak?.rowIndex) &&
                            "bg-purple-500"
                          }`}
                        >
                          {`${classAfterBreak?.courseCode ?? ""} ${
                            classAfterBreak?.courseTitle
                              ? `(${classAfterBreak?.courseTitle})`
                              : ""
                          } ${classAfterBreak?.teacher?.sortForm ?? ""}`}
                        </td>
                      ))
                    )}
                  </tr>
                );
              })}
        </tbody>
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

      {/* Teacher assign modal  */}
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
    </TableWrapper>
  );
};

export default EveningTable;
