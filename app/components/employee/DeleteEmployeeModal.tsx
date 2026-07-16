//import { useEmployee } from "@/app/hooks/useEmployee";

export default function DeleteEmployeeModal() {
  // const { setIsDeleteModalOpen, deleteEmployee, selectedEmployee } =
  //   useEmployee();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-100 max-w-5xl h-[30vh]">
        <div className="flex items-center justify-between border-2 p-4">
          <h2 className="text-2xl font-semibold text-blue-700">
            Delete Employee
          </h2>
          <button
            // onClick={() => setIsDeleteModalOpen(false)}
            className="text-2xl font-bold text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
        <div className="max-w-xl mt-10 ml-10">
          Are you sure you want to delete
          {/* <strong> {selectedEmployee?.name}</strong>? */}
          <div>
            <button
              className="bg-blue-700 text-xl text-white p-2 m-2"
              // onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-700 text-xl text-white p-2 m-2"
              onClick={() =>
                // deleteEmployee(Number(selectedEmployee?.employeeId))
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
