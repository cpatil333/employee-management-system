export type Employee = {
  employeeId: number;
  name: string;
  email: string;
  department: Department;
  designation: Designation;
  status: "Active" | "Inactive";
  phone: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  joiningDate: string;
  salary: number;
  gender: "Male" | "Female";
  maritalStatus: "Married" | "Unmarried" | "Single" | "Divorce";
};

export type Department = {
  id: string;
  name: string;
};

export type Designation = {
  id: string;
  name: string;
};
