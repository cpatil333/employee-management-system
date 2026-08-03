export const employeeValidation = {
  name: {
    required: "Name is required",
    minLength: {
      value: 3,
      message: "Minimum 3 characters required",
    },
  },

  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: "Invalid email address",
    },
  },

  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^[6-9]\d{9}$/,
      message: "Invalid mobile number",
    },
  },

  password: {
    required: "Password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      message:
        "Password must contain uppercase, lowercase, number and special character",
    },
  },

  salary: {
    required: "Salary is required",
    min: {
      value: 1,
      message: "Salary must be greater than 0",
    },
  },

  joiningDate: {
    required: "Joining Date is required",
  },

  departmentId: {
    required: "Department is required",
  },

  designationId: {
    required: "Designation is required",
  },

  countryId: {
    required: "Country is required",
  },

  stateId: {
    required: "State is required",
  },

  cityId: {
    required: "City is required",
  },

  pincode: {
    required: "Pincode is required",
    pattern: {
      value: /^[1-9][0-9]{5}$/,
      message: "Invalid pincode",
    },
  },

  address1: {
    required: "Address is required",
  },

  gender: {
    required: "Gender is required",
  },

  maritalStatus: {
    required: "Marital Status is required",
  },

  status: {
    required: "Status is required",
  },
};
