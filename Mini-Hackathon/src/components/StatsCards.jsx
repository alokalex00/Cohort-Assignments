import {
  FiBookOpen,
  FiCheckCircle,
  FiUserX,
  FiUsers,
} from "react-icons/fi";

const StatsCards = ({ students }) => {
  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  const totalCourses = new Set(
    students.map((student) => student.course)
  ).size;

  const cards = [
    {
      title: "Total Students",
      value: students.length,
      text: "All registered students",
      icon: <FiUsers />,
      color: "purple-card",
    },
    {
      title: "Active Students",
      value: activeStudents,
      text: "Currently active",
      icon: <FiCheckCircle />,
      color: "green-card",
    },
    {
      title: "Inactive Students",
      value: inactiveStudents,
      text: "Require attention",
      icon: <FiUserX />,
      color: "orange-card",
    },
    {
      title: "Total Courses",
      value: totalCourses,
      text: "Available programs",
      icon: <FiBookOpen />,
      color: "blue-card",
    },
  ];

  return (
    <section className="stats-container">
      {cards.map((card) => (
        <article className="stats-card" key={card.title}>
          <div className={`stats-icon ${card.color}`}>
            {card.icon}
          </div>

          <div className="stats-information">
            <span>{card.title}</span>
            <h3>{card.value}</h3>
            <p>{card.text}</p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default StatsCards;