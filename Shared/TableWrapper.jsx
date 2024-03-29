/* eslint-disable react/prop-types */
const TableWrapper = ({ children, minWidth, borderStyle }) => {
    return (
      <section
        className={`overflow-x-auto custom-table-class`}
      >
        <div className={` ${minWidth ? minWidth : "min-w-[1000px]"}`}>
          {children}
        </div>
      </section>
    );
  };
  
  export default TableWrapper;
  