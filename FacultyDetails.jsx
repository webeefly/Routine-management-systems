import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import html2pdf from "html2pdf.js";
import { FaBackward } from "react-icons/fa6";
import Loading from "./Shared/Loading";

// const FacultyTable = () => {
//   const data = [
//     { id: 1, name: "John Doe", job: "Software Engineer", color: "Blue" },
//     { id: 2, name: "Jane Smith", job: "Data Scientist", color: "Red" },
//     { id: 3, name: "Alice Johnson", job: "UI/UX Designer", color: "Green" },
//   ];
// };

const FacultyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [facultyTimes, setFacultyTimes] = useState({});
  const [facultyTimesLoading, setFacultyTimesLoading] = useState(false);

  useEffect(() => {
    setFacultyTimesLoading(true);
    fetch(
      `https://routine-management-system-backend.onrender.com/api/v1/teacher/get-individual-routine/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFacultyTimesLoading(false);
        setFacultyTimes(data?.data);
      })
      .catch((err) => {
        setFacultyTimesLoading(false);
        console.error(err);
      });
  }, [id]);

  console.log("facultyTimes:", facultyTimes);

  const handleDownload = () => {
    const dataContainer = document.getElementById("download-container");
    const opt = {
      margin: 0.2,
      filename: "Leads.pdf",
      image: { type: "jpeg", quality: 100 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(dataContainer).set(opt).save();
  };

  // console.log({ times: facultyTimes.times?.classesTimes?.classesTimes });

  console.log(facultyTimes, "all data");
  const combinedClassesTimes = facultyTimes.times?.reduce(
    (acc, currentValue) => {
      return acc.concat(currentValue.classesTimes);
    },
    []
  );
  console.log(combinedClassesTimes, "combine classes");

  const totalCredit = combinedClassesTimes?.reduce(
    (accumulator, currentValue) =>
      accumulator + (currentValue.credit ? currentValue.credit : 0),
    0
  );

  if (facultyTimesLoading) {
    return <Loading />;
  }
  return (
    <main className="w-[900px] mx-auto p-4 space-y-2">
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 font-medium"
          onClick={() => navigate(-1)}
        >
          <FaBackward /> <span>back</span>
        </button>
        <button onClick={handleDownload} id="download" className="my-btn-one">
          Download
        </button>
      </div>
      <section id="download-container">
        <table
          border={1}
          className=" font-medium text-center  border-[#000] mx-auto w-full"
          cellPadding="0"
          cellSpacing={0}
        >
          <tr>
            <td
              className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={1}
            >
              Day
            </td>

            <td
              className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap"
              colSpan={6}
            >
              Time
            </td>
          </tr>
          <tr>
            <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap">
              9:0-10:20am
            </td>
            <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap">
              10:30-11:50am
            </td>
            <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap">
              12:00-1:20pm
            </td>
            <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap">
              2:00-3:20pm
            </td>
            <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap">
              5:30-7:10pm
            </td>
            <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap">
              6:20-7:10pm
            </td>
          </tr>

          {[
            "Sunday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day, i) => {
            const time = facultyTimes.times?.find((item) => item.day === day);
            console.log({ time });
            return (
              <tr key={i}>
                <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap">
                  {day}
                </td>

                {time?.classesTimes.map((item, i) => {
                  return (
                    <td
                      key={i}
                      className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[6px] text-center whitespace-nowrap"
                    >
                      {item?.startTime}-{item?.endTime}
                      <br />
                      <span>{item?.courseCode}</span>
                    </td>
                  );
                })}

                {Array.from(
                  { length: 7 - ((time?.classesTimes?.length || 0) + 1) },
                  (v, i) => (
                    <td
                      key={i}
                      className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
                    ></td>
                  )
                )}
              </tr>
            );
          })}
        </table>

        <div className="mt-[40px]">
          <table
            border={1}
            className="table-auto font-medium text-center  border-[#000] mx-auto w-full"
            cellPadding="0"
            cellSpacing={0}
          >
            {/* table head */}
            <tr>
              <td className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap">
                Serial No
              </td>

              <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                Course Code
              </td>
              <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                Course Title
              </td>
              <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                Program
              </td>
              <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                Cr
              </td>
              <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                Day
              </td>
              <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                Batch & Year-Semester
              </td>
            </tr>

            {combinedClassesTimes?.map((item, i) => {
              console.log(item, "faculty time item");
              return (
                <tr key={i}>
                  <td className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap">
                    {i + 1}
                  </td>

                  <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                    {item?.courseCode}
                  </td>
                  <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                    {item?.courseTitle}
                  </td>
                  <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                    CSE(REG)
                  </td>
                  <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                    {item?.credit}
                  </td>
                  <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                    Day
                  </td>
                  <td className="text-[14px] border-[#000] border border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap">
                    {item?.batch}th {item?.yearSem}
                  </td>
                </tr>
              );
            })}
            {/* table footer */}
            <tr>
              <td
                className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap"
                colSpan={4}
              >
                Total Credits & Minutes
              </td>
              <td
                className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap"
                colSpan={1}
              >
                Total cr {totalCredit}
                {/* {JSON.stringify(combinedClassesTimes)} */}
              </td>
              <td
                className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] border-r-[0px] text-[#000] p-[16px] text-center whitespace-nowrap"
                colSpan={1}
              >
                Total cr Hr
              </td>
              <td
                className="text-[14px] border-[#000] border bg-white border-t border-b-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
                colSpan={1}
              >
                Total cr Hr
              </td>
            </tr>
          </table>
        </div>
      </section>
    </main>
  );
};

export default FacultyDetails;
