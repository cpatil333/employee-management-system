export type Employee = {
  employeeId: number;
  name: string;
  email: string;
  departmentId: number;
  designationId: number;
  status: "Active" | "Inactive";
  phone: string;
  address1: string;
  address2: string;
  country: number;
  state: number;
  city: number;
  pincode: string;
  joiningDate: string;
  salary: number;
  gender: "Male" | "Female";
  maritalStatus: "Married" | "Unmarried" | "Single" | "Divorce";
};
