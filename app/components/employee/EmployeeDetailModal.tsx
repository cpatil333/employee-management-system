import {
  fetchCitiesByStateId,
  fetchCounties,
  fetchDepartments,
  fetchDesignations,
  fetchStatesByCountryId,
  setEmployeeDetailModal,
} from "@/app/features/employee/employeeSlice";
import { useAppDispatch } from "@/app/hooks/useAppDispatch";
import { useAppSelector } from "@/app/hooks/useAppSelector";
import { useEffect } from "react";

export default function EmployeeDetailModal() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchDesignations());
    dispatch(fetchCounties());
  }, [dispatch]);

  const selectedEmployee = useAppSelector(
    (state) => state.employee.selectedEmployee,
  );

  useEffect(() => {
    if (selectedEmployee) {
      dispatch(fetchStatesByCountryId(selectedEmployee.countryId));
      dispatch(fetchCitiesByStateId(selectedEmployee.stateId));
    }
  }, [dispatch, selectedEmployee]);

  const departmentList = useAppSelector(
    (state) => state.employee.departmentList,
  );

  const designationtList = useAppSelector(
    (state) => state.employee.designationList,
  );

  const countryList = useAppSelector((state) => state.employee.countryList);
  const filteredStates = useAppSelector(
    (state) => state.employee.selectFilteredStates ?? [],
  );
  const filteredCities = useAppSelector(
    (state) => state.employee.selectFilteredCities ?? [],
  );

  //console.log(selectedEmployee);

  return (
    <div
      className="fixed inset-0 const selectedEmployee = useAppSelector(
        (state) => state.employee.selectedEmployee,
      ); bg-black/50 flex items-center justify-center z-50"
    >
      <div className="bg-white max-w-5xl w-full h-[90vh] rounded-xl shadow-xl overflow-x-auto">
        <div className="flex items-center justify-center border-2 p-2">
          <h2 className="text-2xl font-semibold text-blue-700">
            Employee Details
          </h2>
        </div>
        <div className="flex flex-col ml-20 mt-5 font-semibold text-xl p-2">
          <DetailRows label="Name" value={selectedEmployee?.name} />
          <DetailRows label="Email" value={selectedEmployee?.email} />
          <DetailRows label="Phone" value={selectedEmployee?.phone} />
          <DetailRows
            label="Department"
            value={
              departmentList.find(
                (d) => d.id === selectedEmployee?.departmentId,
              )?.name ?? ""
            }
          />
          <DetailRows
            label="Designation"
            value={
              designationtList.find(
                (d) => d.id === selectedEmployee?.designationId,
              )?.name ?? ""
            }
          />
          <DetailRows
            label="Status"
            value={
              selectedEmployee?.status === "Active"
                ? "🟢 Active"
                : "🔴 Inactive"
            }
          />
          <DetailRows
            label="Joining Date"
            value={
              selectedEmployee?.joiningDate
                ? new Date(selectedEmployee?.joiningDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    },
                  )
                : ""
            }
          />
          <DetailRows
            label="Salary"
            value={selectedEmployee?.salary.toLocaleString("en-IN")}
          />
          <DetailRows
            label="Marital Status"
            value={selectedEmployee?.maritalStatus}
          />
          <DetailRows label="Address1" value={selectedEmployee?.address1} />
          <DetailRows label="Address2" value={selectedEmployee?.address2} />
          <DetailRows
            label="Country"
            value={
              countryList.find((d) => d.id === selectedEmployee?.countryId)
                ?.name ?? ""
            }
          />
          <DetailRows
            label="State"
            value={
              filteredStates.find((d) => d.id === selectedEmployee?.stateId)
                ?.name ?? ""
            }
          />
          <DetailRows
            label="City"
            value={
              filteredCities.find((c) => c.id === selectedEmployee?.cityId)
                ?.name ?? ""
            }
          />
          <DetailRows label="Pincode" value={selectedEmployee?.pincode} />

          <div className="w-full flex items-center justify-center">
            <button
              className="bg-blue-700 text-xl text-white p-2 m-2"
              onClick={() => dispatch(setEmployeeDetailModal(false))}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//Calling row per lable and values for display
type DetailRowProps = {
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
}
