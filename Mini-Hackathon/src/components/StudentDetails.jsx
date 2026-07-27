import {
  FiBookOpen,
  FiCalendar,
  FiHash,
  FiMail,
  FiPhone,
  FiX,
} from "react-icons/fi";

const StudentDetails = ({ student, closeDetails }) => {
  if (!student) {
    return null;
  }

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
    month: "long",
    year: "numeric",
  });

  return (
    <div className="student-modal-background">
      <div className="student-details-modal">
        <button
          type="button"
          className="student-details-close"
          onClick={closeDetails}
        >
          <FiX />
        </button>

        <div className="student-details-profile">
          <div className="student-details-avatar">
            {initials}
          </div>

          <span
            className={`student-status ${
              student.status === "Active"
                ? "active-status"
                : "inactive-status"
            }`}
          >
            {student.status}
          </span>

          <h2>{student.name}</h2>
          <p>{student.enrollment}</p>
        </div>

        <div className="student-detail-list">
          <div>
            <span>
              <FiMail />
            </span>

            <section>
              <small>Email address</small>
              <strong>{student.email}</strong>
            </section>
          </div>

          <div>
            <span>
              <FiPhone />
            </span>

            <section>
              <small>Phone number</small>
              <strong>{student.phone}</strong>
            </section>
          </div>

          <div>
            <span>
              <FiBookOpen />
            </span>

            <section>
              <small>Course</small>
              <strong>{student.course}</strong>
            </section>
          </div>

          <div>
            <span>
              <FiCalendar />
            </span>

            <section>
              <small>Admission date</small>
              <strong>{formattedDate}</strong>
            </section>
          </div>

          <div>
            <span>
              <FiHash />
            </span>

            <section>
              <small>Enrollment ID</small>
              <strong>{student.enrollment}</strong>
            </section>
          </div>
        </div>

        <button
          className="student-details-button"
          onClick={closeDetails}
        >
          Close Profile
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;