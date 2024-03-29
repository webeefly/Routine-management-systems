/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TableWrapper from "../../Shared/TableWrapper";

const RegularBatchTable = ({ selectBatch }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`allData.json`)
      .then((res) => res.json())
      .then((data) => {
        const singleBatchData = data.filter((d) => d.batch == selectBatch);
        setData(singleBatchData);
        setLoading(false);
        console.log(data);
        console.log(singleBatchData);
      });
  }, [selectBatch]);
  return (
    <div>
      <TableWrapper>
        <table
          border={1}
          className="table-auto font-bold text-center border-2 border-[#000] table-ui w-full h-[50vh]"
          cellPadding="0"
          cellSpacing={0}
        >
          <tr>
            <td
              className="text-[14px] border-[#000] border-2 bg-white border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              Day
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
              09.00-10.20AM
            </td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              rowSpan={2}
              colSpan={3}
            >
              10.30-11.50AM
            </td>

            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              colSpan={2}
            >
              12.00-02.00PM
            </td>
            <td className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"></td>
            <td
              className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center whitespace-nowrap"
              colSpan={2}
            >
              02.00-04.00PM
            </td>
          </tr>
          <tr>
            <td className="text-[14px] border-[#000] border-2 relative !z-[-1] border-b-[1px] border-r-[1px] whitespace-nowrap text-[#000] p-[16px] text-center">
              12.00-01.20PM
            </td>
            <td className="text-[14px] border-[#000] border-2 relative !z-[-1] border-b-[1px] border-r-[1px] whitespace-nowrap text-[#000] p-[16px] text-center"></td>
            <td className="text-[14px] border-[#000] border-2 border-r-[1px] text-[#000] p-[16px] text-center  border-b-0"></td>
            <td className="text-[14px] border-[#000] border-2 relative !z-[-1] border-b-[1px] border-r-[1px] whitespace-nowrap text-[#000] p-[16px] text-center">
              02.00-03.20PM
            </td>
            <td className="text-[14px] border-[#000] border-2 border-b-[1px] border-r-[1px] text-[#000] p-[16px] text-center"></td>
          </tr>
          {/* table body start here  */}

          {/* table footer */}

          {loading
            ? "loading"
            : data?.map((item, index) => {
                const { day, courses, room } = item;
                return (
                  <tr key={item}>
                    <td
                      className={`px-[16px] border-r-[1px]
            bg-white  py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
                      colSpan={3}
                    >
                      {day}
                    </td>

                    <td
                      className="px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px]"
                      colSpan={2}
                    >
                      {room}
                    </td>
                    <td
                      colSpan={3}
                      className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
                    >
                      {courses?.["1"]?.courseCode && (
                        <>
                          {courses?.["1"]?.courseCode}{" "}
                          {courses?.["1"]?.courseTitle}{" "}
                        </>
                      )}
                    </td>
                    <td
                      colSpan={3}
                      className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px]`}
                    >
                      {courses?.["2"]?.courseCode && (
                        <>
                          {courses?.["2"]?.courseCode}{" "}
                          {courses?.["2"]?.courseTitle}{" "}
                        </>
                      )}
                    </td>
                    <td
                      className={`px-[16px] border-r-[0px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] ${
                        courses?.["3"]?.courseTitle?.includes("Sessional")
                          ? "border-r-0"
                          : ""
                      }`}
                    >
                      {courses?.["3"]?.courseCode && (
                        <>
                          {courses?.["3"]?.courseCode}{" "}
                          {courses?.["3"]?.courseTitle}{" "}
                        </>
                      )}
                    </td>
                    <td
                      className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] ${
                        courses?.["3"]?.courseTitle?.includes("Sessional")
                          ? "border-l-0"
                          : ""
                      }`}
                    ></td>
                    <td className="px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 border-t-0 border-b-0 text-[20px]">
                      {" "}
                      {index === 0 ? "B" : ""} {index === 1 ? "R" : ""}{" "}
                      {index === 2 ? "E" : ""} {index === 3 ? "A" : ""}{" "}
                      {index === 4 ? "K" : ""}
                    </td>
                    <td
                      className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] ${
                        courses?.["4"]?.courseTitle?.includes("Sessional")
                          ? "border-r-0"
                          : ""
                      }`}
                    >
                      {courses?.["4"]?.courseCode && (
                        <>
                          {courses?.["4"]?.courseCode}{" "}
                          {courses?.["4"]?.courseTitle}{" "}
                        </>
                      )}
                    </td>
                    <td
                      className={`px-[16px] border-r-[1px] py-[6px] text-[#000] border-[#000] border-2 text-[14px] ${
                        courses?.["4"]?.courseTitle?.includes("Sessional")
                          ? "border-l-0"
                          : ""
                      }`}
                    ></td>
                  </tr>
                );
              })}
        </table>
      </TableWrapper>
    </div>
  );
};

export default RegularBatchTable;
