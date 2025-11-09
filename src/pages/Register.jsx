// src/pages/Register.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [registerError, setRegisterError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setRegisterError(null);
    setIsSubmitting(true);

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long.");
      setIsSubmitting(false);
      return;
    }

    signUp(email, password, name, photoUrl)
      .then((result) => {
        console.log("Registration Success!", result.user);
        setIsSubmitting(false);
        alert(`Welcome, ${name}! Your account has been created.`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setIsSubmitting(false);

        if (error.code === "auth/email-already-in-use") {
          setRegisterError("This email is already in use. Please log in.");
        } else if (error.code === "auth/invalid-email") {
          setRegisterError("Please enter a valid email address.");
        } else {
          setRegisterError(
            "Registration failed. Please check your credentials."
          );
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-4">
      <div className="card w-full max-w-sm bg-base-100 shadow-2xl border-t-4 border-secondary">
        <div className="card-body p-8">
          <div className="text-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 mx-auto text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            <h2 className="text-3xl font-bold mt-2 text-base-content">
              Create New Account
            </h2>
            <p className="text-sm text-base-content/70">
              Join the Book Haven community!
            </p>
          </div>

          {registerError && (
            <div role="alert" className="alert alert-error mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{registerError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Your Name (Required)
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input input-bordered input-secondary w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Email Address (Required)
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered input-secondary w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  Password (Min 6 Characters)
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered input-secondary w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  **Profile Photo URL (Optional)**
                </span>
              </label>
              <input
                type="url"
                name="photoUrl"
                placeholder="https://example.com/my-profile.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">
                  About You (Optional)
                </span>
              </label>
              <textarea
                name="bio"
                placeholder="Tell us about your favorite genre or what you're currently reading..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows="3"
                className="textarea textarea-bordered textarea-secondary w-full"
              ></textarea>
            </div>

            <div className="form-control pt-2">
              <button
                type="submit"
                className={`btn btn-secondary w-full shadow-lg shadow-secondary/50 ${
                  isSubmitting && "loading"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "" : "Register & Start Reading"}
              </button>
            </div>
          </form>

          <div className="divider mt-6 mb-4 text-base-content/60 text-xs">
            Already have an account?
          </div>
          <div className="text-center text-sm">
            <Link
              to="/login"
              className="link link-hover text-primary hover:text-secondary font-medium"
            >
              Log In here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
