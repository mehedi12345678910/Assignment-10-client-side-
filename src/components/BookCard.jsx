import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const { _id, title, author, genre, rating, coverImage } = book;

  return (
    <div className="card w-full bg-base-200 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden">
      <figure className="h-56 w-full overflow-hidden bg-base-300">
        {coverImage ? (
          <img
            src={coverImage}
            alt={`${title} cover`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-base-content/50">
            [No Cover Available]
          </div>
        )}
      </figure>

      <div className="card-body p-5">
        <Link to={`/book/${_id}`} className="hover:text-primary transition">
          <h2 className="card-title text-xl font-bold leading-tight line-clamp-2">
            {title}
          </h2>
        </Link>

        <p className="text-sm text-base-content/70 mt-1">by **{author}**</p>

        <div className="flex justify-between items-center mt-3">
          <div className="badge badge-outline badge-info text-xs font-semibold">
            {genre}
          </div>

          <div className="flex items-center font-extrabold text-warning text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.55l6.568-.955L10 1l2.945 5.595 6.568.955-4.758 4.095 1.123 6.545z" />
            </svg>
            {rating} / 5
          </div>
        </div>

        <div className="card-actions justify-end mt-4 pt-2 border-t border-base-300">
          <Link
            to={`/book/${_id}`}
            className="btn btn-primary btn-sm btn-block shadow-md hover:shadow-lg transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
