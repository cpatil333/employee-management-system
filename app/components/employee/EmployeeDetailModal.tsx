import { cities } from "@/app/data/cities";
import { countries } from "@/app/data/countries";
import { department } from "@/app/data/department";
import { designation } from "@/app/data/designation";
import { states } from "@/app/data/states";

export default function EmployeeDetailModal() {
  //const { setEmployeeDetailModal, selectedEmployee } = useEmployee();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white max-w-5xl w-full h-[90vh] rounded-xl shadow-xl overflow-x-auto">
        <div className="flex items-center justify-center border-2 p-2">
          <h2 className="text-2xl font-semibold text-blue-700">
            Employee Details
          </h2>
        </div>
        <div className="flex flex-col ml-20 mt-5 font-semibold text-xl p-2">
          {/* <DetailRows label="Name" value={selectedEmployee?.name} />
          <DetailRows label="Email" value={selectedEmployee?.email} />
          <DetailRows label="Phone" value={selectedEmployee?.phone} />
          <DetailRows
            label="Department"
            value={
              department.find((d) => d.id === selectedEmployee?.departmentId)
                ?.name ?? ""
            }
          />
          <DetailRows
            label="Designation"
            value={
              designation.find((d) => d.id === selectedEmployee?.departmentId)
                ?.name ?? ""
            }
          />
           */}
          {/* <div className="w-full flex items-center justify-center">
          <button
            className="bg-blue-700 text-xl text-white p-2 m-2"
            onClick={() => setEmployeeDetailModal(false)}
          >
            Close
          </button>*/}
        </div>
      </div>
    </div>
  );
}

//Calling row per lable and values for display
{
  /* type DetailRowProps = {
  label: string;
  value: React.ReactNode;
};

function DetailRows({ label, value }: DetailRowProps) {
  return (
    <div className="flex py-1 border-0">
      <span className="w-50 font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
} */
}
