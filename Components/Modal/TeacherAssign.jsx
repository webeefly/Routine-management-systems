/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import Swal from "sweetalert2";
const TeacherAssign = ({
  courseId,
  rowIndex: index,
  selectShift,
  regularDayTab,
  eveningDayTab,
  setControl,
  control,
  courseCredit,
  tab,
  setTab,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allReacher, setAllTeacher] = useState([]);
  const [selectedTeacherName, setSelectedTeacherName] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectTeacher, setSelectTeacher] = useState({});
  const [selectRoom, setSelectRoom] = useState("");
  const url = `https://routine-management-system-backend.onrender.com/api/v1`;

  // Function to handle search logic
  const handleSearch = () => {
    // Perform search logic based on searchQuery
    // Update searchResults state with matching players
    // For example:
    fetch(`${url}/teacher`)
      .then((res) => res.json())
      .then((data) => {
        const filteredResults = data.data?.filter((teacher) => {
          return teacher.fullName
            .toLowerCase()
            .includes(searchQuery?.toLowerCase());
        });

        setLoading(false);
        if (filteredResults) {
          setAllTeacher(filteredResults);
          setSelectedTeacherName({});
        } else {
          console.log(data.data);
          setAllTeacher(data.data);
          setSelectedTeacherName({});
        }
      });
  };

  const handleTeacherAssign = (id, name) => {
    const teacherId = id;
    const rowIndex = index;
    const routineId = courseId;
    const obj = {
      routineId,
      teacherId,
      rowIndex,
      shift: selectShift,
      day: selectShift === "Regular" ? regularDayTab : eveningDayTab,
    };
    console.log(obj, "teacher assign");
    setSelectTeacher(obj);
    setSelectedTeacherName({ name });
    setAllTeacher([]);
    setSearchQuery("");
  };
  /* 
{
    "day": "Tuesday",
    "shift": "Regular",
    "rowIndex": "3",
    "roomNumber": "2030",
    "routineId": "6603935a2615c0d3783ab7aa"
}
*/
  const handleSubmitTeacher = () => {
    fetch(`${url}/teacher/assign`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectTeacher),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setControl(!control);
          Swal.fire({
            title: data?.message,
            position: "top-center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setControl(!control);
          Swal.fire({
            title: data?.message,
            position: "top-center",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        setControl(!control);
        console.error("Error updating item:", error);
      });
  };
  const handleSubmitRoom = () => {
    const rowIndex = index;
    const routineId = courseId;
    const obj = {
      routineId,
      rowIndex,
      roomNumber: selectRoom,
      shift: selectShift,
      day: selectShift === "Regular" ? regularDayTab : eveningDayTab,
    };
    fetch(`${url}/routine/assign-room`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.success) {
          setControl(!control);
          Swal.fire({
            title: data?.message,
            position: "top-center",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setControl(!control);
          Swal.fire({
            title: data?.message,
            position: "top-center",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        setControl(!control);
        console.error("Error updating item:", error);
      });
  };
  return (
    <dialog id="teacher_assign" className="modal">
      <div className="modal-box flex-col max-h-[50vh] w-full">
        <div className="flex gap-4 justify-center items-center w-full">
          <h2
            onClick={() => setTab("SelectTeachers")}
            className={`${
              tab == "SelectTeachers" ? "bg-slate-100 px-4 font-bold" : ""
            } cursor-pointer`}
          >
            Select Teacher
          </h2>
          {courseCredit == 1.5 ? (
            <h2
              onClick={() => setTab("SelectRoom")}
              className={`${
                tab == "SelectRoom" ? "bg-slate-100 px-4 font-bold " : ""
              } cursor-pointer`}
            >
              Select Room
            </h2>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-2 justify-start items-start w-full mt-[10px]">
          {tab == "SelectTeachers" ? (
            <div className="w-full ">
              <div className="h-[46px] mt-[18px] md:mt-auto relative overflow-hidden shadow-lg  rounded-[6px] w-full">
                <FiSearch className="text-[#636363] text-[18px] left-[17px] absolute top-1/2 -translate-y-1/2" />
                <input
                  className="my-inp teacher_modal "
                  placeholder="Search Individual Player"
                  value={searchQuery}
                  onChange={(e) => {
                    setSelectedTeacherName({});
                    setSelectTeacher({});
                    setSearchQuery(e.target.value);
                  }}
                  onKeyUp={() => {
                    setSelectedTeacherName({});
                    setSelectTeacher({});
                    handleSearch();
                  }}
                  onFocus={() => {
                    handleSearch();
                    setSelectTeacher({});
                  }}
                />
              </div>
              <div className="w-full">
                {loading ? (
                  "Loading..."
                ) : !(allReacher.length > 0) ? (
                  searchQuery === "" && selectedTeacherName ? (
                    <>
                      <p>
                        <span className="font-medium">Selected: </span>
                        <span className="text-orange-400">
                          {selectedTeacherName?.name}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="mt-[10px] text-red-600">
                      Not Match Teacher Name.
                    </p>
                  )
                ) : (
                  <ul className="w-full">
                    <div className="bg-white p-[24px] flex flex-col gap-[8px] w-full rounded-[8px]">
                      {allReacher?.slice(0, 4).map((teacher) => {
                        const { fullName, sortForm, _id } = teacher;
                        return (
                          <div
                            onClick={() => handleTeacherAssign(_id, fullName)}
                            key={teacher?._id}
                            className="flex flex-col w-full hover:bg-gray-300 p-[8px] rounded-[8px] cursor-pointer bg-slate-200"
                          >
                            <h2>
                              <span className="font-semibold">Name: </span>
                              <span className="text-orange-500">
                                {fullName}
                              </span>
                            </h2>
                            <h2>
                              <span className="font-semibold">
                                Short Name:{" "}
                              </span>
                              <span className="text-orange-500">
                                {sortForm}
                              </span>
                            </h2>
                          </div>
                        );
                      })}
                    </div>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full">
              {courseCredit == 1.5 && (
                <div className="w-full flex items-center gap-4">
                  <label className="font-bold whitespace-nowrap " htmlFor="">
                    Select Room:
                  </label>
                  <select
                    onChange={(e) => setSelectRoom(e.target.value)}
                    name=""
                    id=""
                    className="w-full border outline-none bg-slate-200 p-3"
                  >
                    <option selected disabled>
                      Choose The Room
                    </option>
                    <option value="1020">1020</option>
                    <option value="1030">1030</option>
                  </select>
                </div>
              )}
            </div>
          )}

          {tab == "SelectTeachers" ? (
            <button onClick={handleSubmitTeacher} className="my-btn-one">
              Assign
            </button>
          ) : (
            <button onClick={handleSubmitRoom} className="my-btn-one">
              Assign
            </button>
          )}
        </div>
        <div className="modal-action fixed top-0 right-1 mt-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="text-red-500 text-2xl">
              <FaXmark />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default TeacherAssign;
