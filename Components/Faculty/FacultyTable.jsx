import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaBackward } from "react-icons/fa";
import UploadFacultiesModal from "../Modal/UploadFacultiesModal";
import Loading from "../../Shared/Loading";

const FacultyTable = () => {
  const navigate = useNavigate();
  const [allFaculty, setAllFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState(false);
  useEffect(() => {
    setControl(true);
    fetch(
      `https://routine-management-system-backend.onrender.com/api/v1/teacher`
    )
      .then((res) => res.json())
      .then((data) => {
        setAllFaculty(data?.data);
        setLoading(false);
        setControl(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setControl(false);
      });
  }, [control]);

  return (
    <div className="container mx-auto">
      <div className="my-5 flex justify-between items-center">
        <button
          className="flex items-center gap-2 font-medium"
          onClick={() => navigate(-1)}
        >
          <FaBackward /> <span>back</span>
        </button>
        <button
          onClick={() => document.getElementById("uploadFaculties").showModal()}
        >
          <a
            href="#_"
            className="relative px-5 py-2 font-medium text-white group"
          >
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-orange-400 group-hover:bg-orange-500 group-hover:skew-x-12"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-orange-500 group-hover:bg-orange-700 group-hover:-skew-x-12"></span>
            <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-orange-500 -rotate-12"></span>
            <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-orange-500 -rotate-12"></span>
            <span className="relative">Upload Faculties</span>
          </a>
        </button>
      </div>

      <div className="text-end my-3">
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allFaculty?.map((faculty, ind) => {
              const { fullName, _id } = faculty;
              return (
                <div
                  key={ind}
                  className="rounded bg-slate-100 border shadow p-2 space-y-2 flex items-center justify-center flex-col"
                >
                  <h2 className="font-semibold">{fullName}</h2>
                  <Link to={`/individual-faculty/${_id}`}>
                    <button className="my-btn-one-outline ">See table</button>
                  </Link>
                </div>
              );
            })}
          </div>
          // <select
          //   name=""
          //   className="outline-none bg-slate-200 p-2 cursor-pointer"
          //   id=""
          //   onChange={(e) => setFacultyId(e.target.value)}
          // >
          //   {allFaculty?.map((faculty) => {
          //     const { fullName, _id } = faculty;
          //     return (
          //       <option className="cursor-pointer" key={_id} value={_id}>
          //         {fullName}
          //       </option>
          //     );
          //   })}
          // </select>
        )}
      </div>

      <UploadFacultiesModal setControl={setControl} control={control} />
    </div>
  );
};

// const MyDocument = ({ facultyName, allFaculty }) => {
//   console.log({ facultyName, allFaculty });
//   return (
//     <>
//       <TableWrapper maxWidth="max-w-[600px] mx-auto" borderStyle="">
//         <table
//           border={1}
//           className="table-auto font-medium text-center  border-[#000] mx-auto w-full"
//           cellPadding="0"
//           cellSpacing={0}
//         >
//           <tr>
//             <td
//               className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap"
//               rowSpan={2}
//               colSpan={1}
//             >
//               Day
//             </td>

//             <td
//               className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
//               colSpan={6}
//             >
//               Time
//             </td>
//           </tr>
//           <tr>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               9:0-10:20am
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               10:30-11:50am
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               12:00-1:20pm
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               2:00-3:20pm
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               5:30-7:10pm
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               6:20-7:10pm
//             </td>
//           </tr>

//           <tr>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               a
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               b
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               c
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               d
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               e
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               f
//             </td>
//             <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//               g
//             </td>
//           </tr>
//         </table>
//       </TableWrapper>
//       <div className="mt-[40px]">
//         <TableWrapper maxWidth="max-w-[615px] mx-auto" borderStyle="">
//           <table
//             border={1}
//             className="table-auto font-medium text-center  border-[#000] mx-auto w-full"
//             cellPadding="0"
//             cellSpacing={0}
//           >
//             {/* table head */}
//             <tr>
//               <td className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap">
//                 Serial No
//               </td>

//               <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//                 Course Code
//               </td>
//               <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//                 Course Title
//               </td>
//               <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//                 Program
//               </td>
//               <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//                 Cr
//               </td>
//               <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//                 Cr Hr
//               </td>
//               <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
//                 Batch & Year-Semester
//               </td>
//             </tr>
//             {/* table footer */}
//             <tr>
//               <td
//                 className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap"
//                 colSpan={4}
//               >
//                 Total Credits & Minutes
//               </td>
//               <td
//                 className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap"
//                 colSpan={1}
//               >
//                 Total cr
//               </td>
//               <td
//                 className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap"
//                 colSpan={1}
//               >
//                 Total cr Hr
//               </td>
//               <td
//                 className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
//                 colSpan={1}
//               >
//                 Total cr Hr
//               </td>
//             </tr>
//           </table>
//         </TableWrapper>
//       </div>
//     </>
//   );
// };

export default FacultyTable;
