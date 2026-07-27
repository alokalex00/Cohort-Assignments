import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  course: "B.Tech",
  admissionDate: "",
  status: "Active",
};

const StudentForm = ({
  isOpen,
  closeForm,
  handleStudentSubmit,
  editingStudent,
  students,
}) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name,
        email: editingStudent.email,
        phone: editingStudent.phone,
        course: editingStudent.course,
        admissionDate: editingStudent.admissionDate,
        status: editingStudent.status,
      });
    } else {
      setFormData(emptyForm);
    }

    setErrors({});
  }, [editingStudent, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[6-9]\d{9}$/;

    if (formData.name.trim().length < 3) {
      newErrors.name = "Enter a valid student name";
    }

    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    const emailAlreadyExists = students.some(
      (student) =>
        student.email.toLowerCase() ===
          formData.email.trim().toLowerCase() &&
        student.id !== editingStudent?.id
    );

    if (emailAlreadyExists) {
      newErrors.email = "This email is already registered";
    }

    if (!phonePattern.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.admissionDate) {
      newErrors.admissionDate = "Select admission date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitForm = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    handleStudentSubmit({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
    });
  };

  return (
    <div className="student-modal-background">
      <div className="student-form-modal">
        <div className="student-modal-header">
          <div>
            <span>
              {editingStudent
                ? "UPDATE STUDENT"
                : "NEW ADMISSION"}
            </span>

            <h2>
              {editingStudent
                ? "Edit Student Details"
                : "Add New Student"}
            </h2>

            <p>
              Fill in the required student information below.
            </p>
          </div>

          <button
            type="button"
            className="student-modal-close"
            onClick={closeForm}
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={submitForm}>
          <div className="student-form-grid">
            <div className="student-form-group full-field">
              <label htmlFor="studentName">Full name</label>

              <input
                id="studentName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student name"
                className={errors.name ? "student-field-error" : ""}
              />

              {errors.name && (
                <small>{errors.name}</small>
              )}
            </div>

            <div className="student-form-group">
              <label htmlFor="studentEmail">Email address</label>

              <input
                id="studentEmail"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@gmail.com"
                className={errors.email ? "student-field-error" : ""}
              />

              {errors.email && (
                <small>{errors.email}</small>
              )}
            </div>

            <div className="student-form-group">
              <label htmlFor="studentPhone">Phone number</label>

              <input
                id="studentPhone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                maxLength="10"
                className={errors.phone ? "student-field-error" : ""}
              />

              {errors.phone && (
                <small>{errors.phone}</small>
              )}
            </div>

            <div className="student-form-group">
              <label htmlFor="studentCourse">Course</label>

              <select
                id="studentCourse"
                name="course"
                value={formData.course}
                onChange={handleChange}
              >
                <option value="B.Tech">B.Tech</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="MCA">MCA</option>
                <option value="MBA">MBA</option>
                <option value="B.Sc">B.Sc</option>
              </select>
            </div>

            <div className="student-form-group">
              <label htmlFor="admissionDate">
                Admission date
              </label>

              <input
                id="admissionDate"
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                className={
                  errors.admissionDate
                    ? "student-field-error"
                    : ""
                }
              />

              {errors.admissionDate && (
                <small>{errors.admissionDate}</small>
              )}
            </div>

            <div className="student-form-group full-field">
              <label htmlFor="studentStatus">Status</label>

              <select
                id="studentStatus"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="student-form-buttons">
            <button
              type="button"
              className="student-cancel-button"
              onClick={closeForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="student-save-button"
            >
              {editingStudent
                ? "Save Changes"
                : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;