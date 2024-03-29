import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const AddNewBatchModal = ({ setControl, control }) => {
  <button className="text-red-500 text-2xl" onClick={() => reset()}>
    <FaXmark />
  </button>;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm(); // initialize the hook
  const addNewBatchHandler = (form) => {
    const { confirm } = form;
    if (confirm) {
      fetch(
        `https://routine-management-system-backend.onrender.com/api/v1/routine/add-new-batch`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setControl(!control);
            const modal = document.getElementById("add_new_batch_modal");
            modal.close();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "New Batch Added!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: data?.massage,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  return (
    <dialog id="add_new_batch_modal" className="modal">
      <div className="modal-box ">
        <form
          className="space-y-4 w-full"
          onSubmit={handleSubmit(addNewBatchHandler)}
        >
          <label htmlFor="confirm" className="font-semibold">
            Please type <span className="font-bold">Confirm</span> to add new
            batch
          </label>
          <div className="space-y-2 w-full">
            <input
              type="text"
              placeholder="Confirm"
              id="confirm"
              {...register("confirm", {
                validate: (value) =>
                  value === "Confirm" || 'Value must be "Confirm"',
              })}
              className="my-inp"
            />
            {/* {errors.confirm?.message && <span className="text-red-500">*{errors.confirm?.message}</span>} */}
          </div>

          <button
            type="submit"
            className={`my-btn-one ${
              watch("confirm") != "Confirm" && "!opacity-35"
            }`}
            disabled={watch("confirm") != "Confirm"}
          >
            Submit
          </button>
        </form>

        <div className="modal-action absolute top-0 right-1 mt-0">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="text-red-500 text-2xl" onClick={() => reset()}>
              <FaXmark />
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddNewBatchModal;
