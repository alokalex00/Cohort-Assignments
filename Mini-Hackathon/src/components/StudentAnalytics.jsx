const StudentAnalytics = ({ students }) => {
  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const activePercentage =
    totalStudents === 0
      ? 0
      : Math.round((activeStudents / totalStudents) * 100);

  const inactivePercentage =
    totalStudents === 0
      ? 0
      : Math.round((inactiveStudents / totalStudents) * 100);

  const courseData = students.reduce((courses, student) => {
    courses[student.course] =
      (courses[student.course] || 0) + 1;

    return courses;
  }, {});

  const courseEntries = Object.entries(courseData).sort(
    (firstCourse, secondCourse) =>
      secondCourse[1] - firstCourse[1]
  );

  const getCoursePercentage = (studentCount) => {
    if (totalStudents === 0) {
      return 0;
    }

    return Math.round(
      (studentCount / totalStudents) * 100
    );
  };

  return (
    <section className="analytics-section">
      <div className="analytics-heading">
        <div>
          <span>STUDENT INSIGHTS</span>
          <h2>Student Analytics</h2>

          <p>
            A simple overview of student status and course
            distribution.
          </p>
        </div>

        <div className="analytics-total-courses">
          <strong>{courseEntries.length}</strong>
          <span>Total Courses</span>
        </div>
      </div>

      <div className="analytics-grid">
        <article className="analytics-card status-analytics-card">
          <div className="analytics-card-heading">
            <div>
              <h3>Student Status</h3>
              <p>Active and inactive student comparison.</p>
            </div>

            <span>{totalStudents} Students</span>
          </div>

          <div className="status-progress-group">
            <div className="status-progress-item">
              <div className="status-progress-information">
                <div>
                  <span className="analytics-dot active-dot"></span>
                  <strong>Active Students</strong>
                </div>

                <span>
                  {activeStudents} ({activePercentage}%)
                </span>
              </div>

              <div className="analytics-progress-track">
                <div
                  className="analytics-progress-fill active-progress"
                  style={{
                    width: `${activePercentage}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="status-progress-item">
              <div className="status-progress-information">
                <div>
                  <span className="analytics-dot inactive-dot"></span>
                  <strong>Inactive Students</strong>
                </div>

                <span>
                  {inactiveStudents} ({inactivePercentage}%)
                </span>
              </div>

              <div className="analytics-progress-track">
                <div
                  className="analytics-progress-fill inactive-progress"
                  style={{
                    width: `${inactivePercentage}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="analytics-summary">
            <div>
              <strong>{activeStudents}</strong>
              <span>Active</span>
            </div>

            <div>
              <strong>{inactiveStudents}</strong>
              <span>Inactive</span>
            </div>

            <div>
              <strong>{totalStudents}</strong>
              <span>Total</span>
            </div>
          </div>
        </article>

        <article className="analytics-card course-analytics-card">
          <div className="analytics-card-heading">
            <div>
              <h3>Course Distribution</h3>
              <p>Students enrolled in each course.</p>
            </div>
          </div>

          {courseEntries.length === 0 ? (
            <div className="analytics-empty-state">
              <h4>No course data available</h4>
              <p>Add students to view course analytics.</p>
            </div>
          ) : (
            <div className="course-progress-list">
              {courseEntries.map(
                ([courseName, studentCount]) => {
                  const percentage =
                    getCoursePercentage(studentCount);

                  return (
                    <div
                      className="course-progress-item"
                      key={courseName}
                    >
                      <div className="course-progress-information">
                        <div>
                          <strong>{courseName}</strong>
                          <span>
                            {studentCount}{" "}
                            {studentCount === 1
                              ? "student"
                              : "students"}
                          </span>
                        </div>

                        <span>{percentage}%</span>
                      </div>

                      <div className="analytics-progress-track">
                        <div
                          className="analytics-progress-fill course-progress"
                          style={{
                            width: `${percentage}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </article>
      </div>
    </section>
  );
};

export default StudentAnalytics;