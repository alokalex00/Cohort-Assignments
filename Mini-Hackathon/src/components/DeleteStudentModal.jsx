import { FiAlertTriangle, FiX } from "react-icons/fi";

const DeleteStudentModal = ({
  student,
  closeDeleteModal,
  confirmDelete,
}) => {
  if (!student) {
    return null;
  }

  return (
    <div className="student-modal-background">
      <div className="delete-student-modal">
        <button
          className="delete-modal-close"
          onClick={closeDeleteModal}
        >
          <FiX />
        </button>

        <div className="delete-warning-icon">
          <FiAlertTriangle />
        </div>

        <h2>Delete student?</h2>

        <p>
          You are about to remove{" "}
          <strong>{student.name}</strong> from the student
          directory. This action cannot be undone.
        </p>

        <div className="delete-modal-buttons">
          <button
            className="student-cancel-button"
            onClick={closeDeleteModal}
          >
            Cancel
          </button>

          <button
            className="confirm-delete-button"
            onClick={confirmDelete}
          >
            Delete Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStudentModal;