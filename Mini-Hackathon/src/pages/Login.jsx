import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiUsers,
} from "react-icons/fi";
import toast from "react-hot-toast";

import { loginAdmin } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector(
    (state) => state.auth.isLoggedIn
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
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
      general: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const adminEmail = "admin@gmail.com";
      const adminPassword = "admin123";

      if (
        formData.email.trim().toLowerCase() === adminEmail &&
        formData.password === adminPassword
      ) {
        const adminData = {
          name: "Alok Admin",
          email: adminEmail,
          role: "Administrator",
        };

        dispatch(loginAdmin(adminData));

        toast.success("Welcome back, Admin!");

        navigate("/dashboard");
      } else {
        setErrors({
          general: "Incorrect email address or password",
        });

        toast.error("Invalid login credentials");
      }

      setIsLoading(false);
    }, 700);
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: "admin@gmail.com",
      password: "admin123",
    });

    setErrors({});
  };

  return (
    <main className="login-page">
      <section className="login-showcase">
        <div className="login-showcase-shape shape-one"></div>
        <div className="login-showcase-shape shape-two"></div>

        <div className="login-showcase-content">
          <div className="login-brand">
            <div className="login-brand-logo">E</div>

            <div>
              <h2>EduManage</h2>
              <span>Student Management System</span>
            </div>
          </div>

          <div className="login-showcase-text">
            <span className="login-small-heading">
              SMART STUDENT MANAGEMENT
            </span>

            <h1>
              Manage students
              <br />
              with confidence.
            </h1>

            <p>
              A modern and efficient dashboard to manage student
              records, courses and academic information from one
              place.
            </p>
          </div>

          <div className="login-feature-list">
            <div className="login-feature">
              <div className="login-feature-icon">
                <FiUsers />
              </div>

              <div>
                <h3>Student Management</h3>
                <p>Add, update, view and remove student records.</p>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                <FiBookOpen />
              </div>

              <div>
                <h3>Course Organization</h3>
                <p>Organize students according to their courses.</p>
              </div>
            </div>

            <div className="login-feature">
              <div className="login-feature-icon">
                <FiCheckCircle />
              </div>

              <div>
                <h3>Secure Admin Access</h3>
                <p>Only authorized admins can manage the dashboard.</p>
              </div>
            </div>
          </div>

          <p className="login-showcase-footer">
            Built with React and Redux Toolkit
          </p>
        </div>
      </section>

      <section className="login-form-section">
        <div className="login-mobile-brand">
          <div className="login-brand-logo">E</div>

          <div>
            <h2>EduManage</h2>
            <span>Admin Portal</span>
          </div>
        </div>

        <form className="login-form-card" onSubmit={handleSubmit}>
          <div className="login-form-heading">
            <span>WELCOME BACK</span>
            <h2>Login to your account</h2>

            <p>
              Enter your admin credentials to access the student
              management dashboard.
            </p>
          </div>

          {errors.general && (
            <div className="login-error-message">
              {errors.general}
            </div>
          )}

          <div className="login-input-group">
            <label htmlFor="email">Email address</label>

            <div
              className={`login-input-box ${
                errors.email ? "login-input-error" : ""
              }`}
            >
              <FiMail />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {errors.email && (
              <small className="login-field-error">
                {errors.email}
              </small>
            )}
          </div>

          <div className="login-input-group">
            <div className="login-password-label">
              <label htmlFor="password">Password</label>

              <button type="button">Forgot password?</button>
            </div>

            <div
              className={`login-input-box ${
                errors.password ? "login-input-error" : ""
              }`}
            >
              <FiLock />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              <button
                type="button"
                className="login-password-toggle"
                onClick={() =>
                  setShowPassword((previousValue) => !previousValue)
                }
                aria-label="Show or hide password"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {errors.password && (
              <small className="login-field-error">
                {errors.password}
              </small>
            )}
          </div>

          <div className="login-options">
            <label>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
          </div>

          <button
            className="login-submit-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="login-loader"></span>
                Signing in...
              </>
            ) : (
              <>
                Login to Dashboard
                <FiArrowRight />
              </>
            )}
          </button>

          <div className="login-divider">
            <span></span>
            <p>Demo access</p>
            <span></span>
          </div>

          <button
            type="button"
            className="demo-login-button"
            onClick={fillDemoCredentials}
          >
            Use Demo Credentials
          </button>

          <div className="demo-details">
            <div>
              <span>Email</span>
              <strong>admin@gmail.com</strong>
            </div>

            <div>
              <span>Password</span>
              <strong>admin123</strong>
            </div>
          </div>

          <p className="login-form-footer">
            Secure admin access for EduManage
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;