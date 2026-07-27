import StudentAnalytics from "../components/StudentAnalytics";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FiDownload,
  FiEdit2,
  FiEye,
  FiFilter,
  FiGithub,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import toast from "react-hot-toast";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCards from "../components/StatsCards";
import StudentForm from "../components/StudentForm";
import StudentDetails from "../components/StudentDetails";
import DeleteStudentModal from "../components/DeleteStudentModal";

import { logoutAdmin } from "../features/auth/authSlice";

import {
  addStudent,
  changeStudentStatus,
  deleteStudent,
  updateStudent,
} from "../features/students/studentSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const admin = useSelector((state) => state.auth.admin);

  const students = useSelector(
    (state) => state.students.studentList
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [studentFormOpen, setStudentFormOpen] =
    useState(false);

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [viewingStudent, setViewingStudent] =
    useState(null);

  const [deletingStudent, setDeletingStudent] =
    useState(null);

  const [searchText, setSearchText] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeSection, setActiveSection] = useState("dashboard");

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());

    toast.success("Logged out successfully");

    navigate("/login");
  };
  const handleSectionChange = (section) => {
  setActiveSection(section);

  const sectionElement = document.getElementById(section);

  if (sectionElement) {
    sectionElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

  const courseOptions = [
    "All",
    ...new Set(students.map((student) => student.course)),
  ];

  const filteredStudents = useMemo(() => {
    const searchValue = searchText.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue) ||
        student.enrollment.toLowerCase().includes(searchValue);

      const matchesCourse =
        courseFilter === "All" ||
        student.course === courseFilter;

      const matchesStatus =
        statusFilter === "All" ||
        student.status === statusFilter;

      return (
        matchesSearch &&
        matchesCourse &&
        matchesStatus
      );
    });
  }, [
    students,
    searchText,
    courseFilter,
    statusFilter,
  ]);

  const createEnrollmentId = () => {
    const highestNumber = students.reduce(
      (highestValue, student) => {
        const currentNumber = Number(
          student.enrollment.split("-").pop()
        );

        return currentNumber > highestValue
          ? currentNumber
          : highestValue;
      },
      0
    );

    const nextNumber = String(highestNumber + 1).padStart(
      3,
      "0"
    );

    return `EDU-2026-${nextNumber}`;
  };

  const openAddStudentForm = () => {
    setEditingStudent(null);
    setStudentFormOpen(true);
  };

  const openEditStudentForm = (student) => {
    setEditingStudent(student);
    setStudentFormOpen(true);
  };

  const closeStudentForm = () => {
    setStudentFormOpen(false);
    setEditingStudent(null);
  };

  const handleStudentSubmit = (studentData) => {
    if (editingStudent) {
      dispatch(
        updateStudent({
          ...editingStudent,
          ...studentData,
        })
      );

      toast.success("Student updated successfully");
    } else {
      dispatch(
        addStudent({
          id: Date.now(),
          enrollment: createEnrollmentId(),
          ...studentData,
        })
      );

      toast.success("Student added successfully");
    }

    closeStudentForm();
  };

  const confirmDeleteStudent = () => {
    dispatch(deleteStudent(deletingStudent.id));

    toast.success("Student deleted successfully");

    setDeletingStudent(null);
  };

  const handleStatusChange = (studentId) => {
    dispatch(changeStudentStatus(studentId));

    toast.success("Student status updated");
  };

  const exportStudents = () => {
    if (students.length === 0) {
      toast.error("No student data available");
      return;
    }

    const headings = [
      "Enrollment ID",
      "Name",
      "Email",
      "Phone",
      "Course",
      "Admission Date",
      "Status",
    ];

    const studentRows = students.map((student) => [
      student.enrollment,
      student.name,
      student.email,
      student.phone,
      student.course,
      student.admissionDate,
      student.status,
    ]);

    const csvData = [headings, ...studentRows]
      .map((row) =>
        row
          .map((value) => `"${value}"`)
          .join(",")
      )
      .join("\n");

    const csvFile = new Blob([csvData], {
      type: "text/csv",
    });

    const fileUrl = URL.createObjectURL(csvFile);
    const downloadLink = document.createElement("a");

    downloadLink.href = fileUrl;
    downloadLink.download = "student-records.csv";
    downloadLink.click();

    URL.revokeObjectURL(fileUrl);

    toast.success("Student data exported");
  };

  return (
    <div className="dashboard-page">
      <Sidebar
  isOpen={sidebarOpen}
  closeSidebar={() => setSidebarOpen(false)}
  handleLogout={handleLogout}
  activeSection={activeSection}
  handleSectionChange={handleSectionChange}
/>

      <div className="dashboard-main">
        <Header
          admin={admin}
          theme={theme}
          changeTheme={changeTheme}
          openSidebar={() => setSidebarOpen(true)}
        />

        <main className="dashboard-content">
          <section className="dashboard-welcome" id="dashboard">
            <div>
              <span>OVERVIEW</span>

              <h1>
                Welcome back,{" "}
                {admin?.name?.split(" ")[0] || "Admin"} 👋
              </h1>

              <p>
                Manage all student records from one place.
              </p>
            </div>

            <div className="welcome-buttons">
              <button
                className="dashboard-secondary-button"
                onClick={exportStudents}
              >
                <FiDownload />
                Export CSV
              </button>

              <button
                className="dashboard-primary-button"
                onClick={openAddStudentForm}
              >
                <FiPlus />
                Add Student
              </button>
            </div>
          </section>

          <StatsCards students={students} />
          <div id="courses">
            <StudentAnalytics students={students} />
            </div>

          <section className="students-section" id="students">
            <div className="students-section-heading">
              <div>
                <h2>Student Directory</h2>

                <p>
                  Search and manage registered students.
                </p>
              </div>

              <span className="student-result-count">
                {filteredStudents.length} results
              </span>
            </div>

            <div className="student-filter-section">
              <div className="student-search-box">
                <FiSearch />

                <input
                  type="search"
                  placeholder="Search by name, email or ID..."
                  value={searchText}
                  onChange={(event) =>
                    setSearchText(event.target.value)
                  }
                />
              </div>

              <div className="student-filter-box">
                <FiFilter />

                <select
                  value={courseFilter}
                  onChange={(event) =>
                    setCourseFilter(event.target.value)
                  }
                >
                  {courseOptions.map((course) => (
                    <option key={course} value={course}>
                      {course === "All"
                        ? "All Courses"
                        : course}
                    </option>
                  ))}
                </select>
              </div>

              <select
                className="student-status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="no-students-found">
                <div>⌕</div>
                <h3>No students found</h3>
                <p>
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              <div className="student-table-wrapper">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Enrollment ID</th>
                      <th>Course</th>
                      <th>Admission Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredStudents.map((student) => {
                      const initials = student.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();

                      const formattedDate = new Date(
                        `${student.admissionDate}T00:00:00`
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      });

                      return (
                        <tr key={student.id}>
                          <td>
                            <div className="student-profile">
                              <div className="student-avatar">
                                {initials}
                              </div>

                              <div>
                                <h3>{student.name}</h3>
                                <span>{student.email}</span>
                              </div>
                            </div>
                          </td>

                          <td>
                            <span className="enrollment-id">
                              {student.enrollment}
                            </span>
                          </td>

                          <td>{student.course}</td>

                          <td>{formattedDate}</td>

                          <td>
                            <button
                              className={`student-status status-change-button ${
                                student.status === "Active"
                                  ? "active-status"
                                  : "inactive-status"
                              }`}
                              onClick={() =>
                                handleStatusChange(student.id)
                              }
                            >
                              {student.status}
                            </button>
                          </td>

                          <td>
                            <div className="student-actions">
                              <button
                                className="view-student"
                                title="View student"
                                onClick={() =>
                                  setViewingStudent(student)
                                }
                              >
                                <FiEye />
                              </button>

                              <button
                                className="edit-student"
                                title="Edit student"
                                onClick={() =>
                                  openEditStudentForm(student)
                                }
                              >
                                <FiEdit2 />
                              </button>

                              <button
                                className="delete-student"
                                title="Delete student"
                                onClick={() =>
                                  setDeletingStudent(student)
                                }
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
          <section className="settings-section" id="settings">
  <div className="settings-heading">
    <span>PREFERENCES</span>
    <h2>Settings</h2>
    <p>Manage basic dashboard preferences.</p>
  </div>

  <div className="settings-card">
    <div>
      <h3>Dashboard Theme</h3>
      <p>Switch between light and dark appearance.</p>
    </div>

    <button
      className="settings-theme-button"
      onClick={changeTheme}
    >
      {theme === "light"
        ? "Enable Dark Mode"
        : "Enable Light Mode"}
    </button>
  </div>

  <div className="settings-card">
    <div>
      <h3>Admin Account</h3>
      <p>{admin?.email || "admin@gmail.com"}</p>
    </div>

    <span className="settings-admin-badge">
      Administrator
    </span>
  </div>
</section>

<section className="github-section">
  <a
    href="https://github.com/YOUR-USERNAME/YOUR-REPOSITORY"
    target="_blank"
    rel="noopener noreferrer"
    className="github-repo-card"
  >
    <div className="github-logo-box">
      <FiGithub />
    </div>

    <div className="github-repo-info">
      <span>PROJECT SOURCE CODE</span>

      <h2>EduManage GitHub Repository</h2>

      <p>
        View the complete source code of this project on GitHub.
      </p>
    </div>

    <div className="github-open-text">
      Open Repository →
    </div>
  </a>
</section>
        </main>
      </div>

      <StudentForm
        isOpen={studentFormOpen}
        closeForm={closeStudentForm}
        handleStudentSubmit={handleStudentSubmit}
        editingStudent={editingStudent}
        students={students}
      />

      <StudentDetails
        student={viewingStudent}
        closeDetails={() => setViewingStudent(null)}
      />

      <DeleteStudentModal
        student={deletingStudent}
        closeDeleteModal={() =>
          setDeletingStudent(null)
        }
        confirmDelete={confirmDeleteStudent}
      />
    </div>
  );
};

export default Dashboard;