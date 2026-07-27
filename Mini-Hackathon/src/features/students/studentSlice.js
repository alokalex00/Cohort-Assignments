import { createSlice } from "@reduxjs/toolkit";

const defaultStudents = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "9876543210",
    enrollment: "EDU-2026-001",
    course: "B.Tech",
    admissionDate: "2026-07-12",
    status: "Active",
  },
  {
    id: 2,
    name: "Ananya Verma",
    email: "ananya@gmail.com",
    phone: "9123456780",
    enrollment: "EDU-2026-002",
    course: "BCA",
    admissionDate: "2026-07-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Rohan Singh",
    email: "rohan@gmail.com",
    phone: "9988776655",
    enrollment: "EDU-2026-003",
    course: "BBA",
    admissionDate: "2026-07-08",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Ishita Gupta",
    email: "ishita@gmail.com",
    phone: "9012345678",
    enrollment: "EDU-2026-004",
    course: "MCA",
    admissionDate: "2026-07-05",
    status: "Active",
  },
];

const storedStudents = JSON.parse(
  localStorage.getItem("students")
);

const initialState = {
  studentList: storedStudents || defaultStudents,
};

const saveInLocalStorage = (students) => {
  localStorage.setItem("students", JSON.stringify(students));
};

const studentSlice = createSlice({
  name: "students",

  initialState,

  reducers: {
    addStudent: (state, action) => {
      state.studentList.unshift(action.payload);

      saveInLocalStorage(state.studentList);
    },

    updateStudent: (state, action) => {
      const studentIndex = state.studentList.findIndex(
        (student) => student.id === action.payload.id
      );

      if (studentIndex !== -1) {
        state.studentList[studentIndex] = action.payload;
      }

      saveInLocalStorage(state.studentList);
    },

    deleteStudent: (state, action) => {
      state.studentList = state.studentList.filter(
        (student) => student.id !== action.payload
      );

      saveInLocalStorage(state.studentList);
    },

    changeStudentStatus: (state, action) => {
      const student = state.studentList.find(
        (student) => student.id === action.payload
      );

      if (student) {
        student.status =
          student.status === "Active" ? "Inactive" : "Active";
      }

      saveInLocalStorage(state.studentList);
    },
  },
});

export const {
  addStudent,
  updateStudent,
  deleteStudent,
  changeStudentStatus,
} = studentSlice.actions;

export default studentSlice.reducer;