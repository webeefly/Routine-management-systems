import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types
const UploadFacultiesModal = ({ setControl, control }) => {
  const [error, setError] = useState(null);
  const [lineCount, setLineCount] = useState(10);
  const [textareaStyle, setTextareaStyle] = useState({
    outlineColor: "black",
  });
  const url = `https://routine-management-system-backend.onrender.com/api/v1`;

  useEffect(() => {
    const textarea = document.querySelector("textarea[name='routineByJSON']");
    if (textarea) {
      textarea.scrollTop = textarea.scrollHeight; // Auto scroll to bottom on mount
    }
  }, []);

  const handleInputChange = (event) => {
    const textAreaValue = event.target.value;
    const lines = textAreaValue.split("\n").length;
    setLineCount(lines === 0 ? 1 : lines);
    if (textAreaValue.trim() === "") {
      setError(null); // Clear error if textarea is empty
      setTextareaStyle({ outlineColor: "black" }); // Reset outline color
    } else {
      try {
        JSON.parse(textAreaValue);
        setError(null);
        setTextareaStyle({ outlineColor: "black" }); // Reset outline color
      } catch (error) {
        setError(extractErroneousData(error.message)); // Set error to the portion of data causing the error
        setTextareaStyle({ outlineColor: "red" }); // Set outline color to red
      }
    }
  };

  const handleUploadRoutine = async (e) => {
    e.preventDefault();

    try {
      const textAreaValue = e.target.elements.routineByJSON.value;
      if (!isValidJSON(textAreaValue)) {
        throw new Error("Input is not in valid JSON format");
      }

      const dataArray = JSON.parse(textAreaValue);

      const response = await fetch(`${url}/teacher/insert-teachers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataArray),
      });

      if (response.ok) {
        console.log("Routine uploaded successfully");
        const modal = document.getElementById("uploadFaculties");
        modal.close();
        setControl(!control);
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Faculty Upload Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Reset textarea value after successful upload
        e.target.elements.routineByJSON.value = "";
      } else {
        throw new Error("Failed to upload routine");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
    }
  };

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  };

  const extractErroneousData = (errorMessage) => {
    const matches = errorMessage.match(/line (\d+)/);
    if (matches) {
      return `Error: ${errorMessage}`;
    } else {
      return errorMessage;
    }
  };

  const renderLineNumbers = () => {
    const lineNumberArray = [];
    for (let i = 1; i <= lineCount; i++) {
      const lineNumberClassName =
        error && error.includes(`line ${i}`)
          ? "line-number error"
          : "line-number";
      const style =
        error && error.includes(`line ${i}`)
          ? { backgroundColor: "red", borderRadius: "5px" }
          : {};
      lineNumberArray.push(
        <div key={i} className={lineNumberClassName} style={style}>
          {i}
        </div>
      );
    }
    return lineNumberArray;
  };

  return (
    <dialog id="uploadFaculties" className="modal">
      <div className="modal-box flex">
        <form className="flex-grow" onSubmit={handleUploadRoutine}>
          <div className="overflow-y-auto h-[550px] border outline-dark border-gray-400">
            <div className="flex min-h-[550p] ">
              <div className="mt-[10px] ps-2 ">
                <div className="line-numbers leading-[20.9px] text-[18px] text-center">
                  {renderLineNumbers()}
                </div>
              </div>
              <textarea
                name="routineByJSON"
                placeholder="Please Write JSON Format"
                className="w-full resize-none  p-3 rounded-lg min-h-[550px] leading-[24.9px] text-[18px] border-0 !outline-none"
                style={textareaStyle}
                rows={lineCount} // Set number of rows dynamically
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end mt-2">
            <button type="submit" className="my-btn-one" disabled={error}>
              Upload Faculties
            </button>
          </div>
        </form>
        <div className="modal-action fixed top-0 right-1 mt-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="text-red-500 text-2xl">
              <FaTimes />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UploadFacultiesModal;
