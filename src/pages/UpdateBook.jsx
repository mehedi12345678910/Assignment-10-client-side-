import { useState, useEffect, useContext } from "react";
import { getBookById, updateBook } from "../api/bookApi";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    if (!user) {
      setError("Authentication required to edit books.");
      setLoading(false);
      return;
    }

    getBookById(id)
      .then((res) => {
        const fetchedBook = res.data;

        if (fetchedBook.userEmail !== user.email) {
          setError("Unauthorized access. You can only edit your own books.");
          setLoading(false);
          return;
        }

        setBook(fetchedBook);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        setLoading(false);
        setError(
          "Failed to load book details for editing. It may have been deleted."
        );
      });
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === "rating" ? Number(value) : value;
    setBook({ ...book, [name]: updatedValue });

    if (name === "rating" && error && error.includes("Rating")) {
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    if (book.rating < 1 || book.rating > 5) {
      setError("Rating must be between 1 and 5.");
      setIsSubmitting(false);
      return;
    }

    updateBook(id, book)
      .then(() => {
        setIsSubmitting(false);
        setSuccessMessage(
          `Book "${book.title}" updated successfully! Redirecting to My Books...`
        );

        setTimeout(() => {
          navigate("/my-books");
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setIsSubmitting(false);
        setError("Failed to update book. Check details and try again.");
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-8">
        <div role="alert" className="alert alert-error max-w-lg shadow-lg">
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
          <span>{error || "Book details could not be loaded."}</span>
        </div>
        <button
          onClick={() => navigate("/my-books")}
          className="btn btn-primary mt-6"
        >
          Back to My Books
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-base-100 min-h-screen">
      <div className="max-w-3xl mx-auto card bg-base-200 shadow-2xl p-6 md:p-10">
        <h2 className="text-4xl font-extrabold text-warning text-center mb-8 border-b pb-2">
          <span className="mr-2">✏️</span>Edit Book: {book.title}
        </h2>
        <p className="text-center text-base-content/70 mb-6">
          You are editing a book added by **{book.userName}**.
        </p>

        {successMessage && (
          <div role="alert" className="alert alert-success mb-4">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{successMessage}</span>
          </div>
        )}

        {error && (
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
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Book Title</span>
              </label>
              <input
                type="text"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
                className="input input-bordered input-warning w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Author</span>
              </label>
              <input
                type="text"
                name="author"
                value={book.author}
                onChange={handleChange}
                required
                className="input input-bordered input-warning w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Genre</span>
              </label>
              <input
                type="text"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                required
                className="input input-bordered input-warning w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Rating (1-5)</span>
              </label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={book.rating}
                onChange={handleChange}
                required
                className="input input-bordered input-warning w-full"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Cover Image URL</span>
            </label>
            <input
              type="url"
              name="coverImage"
              placeholder="https://example.com/cover.jpg"
              value={book.coverImage}
              onChange={handleChange}
              className="input input-bordered input-warning w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Summary/Description</span>
            </label>
            <textarea
              name="summary"
              value={book.summary}
              onChange={handleChange}
              rows="5"
              required
              className="textarea textarea-bordered textarea-warning w-full"
            ></textarea>
          </div>

          <div className="form-control pt-4">
            <button
              type="submit"
              className={`btn btn-warning w-full shadow-lg ${
                isSubmitting ? "loading" : ""
              }`}
              disabled={isSubmitting || successMessage}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
