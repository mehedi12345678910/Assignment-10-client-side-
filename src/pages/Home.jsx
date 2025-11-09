import { useEffect, useState } from "react";
import { getAllBooks } from "../api/bookApi";
import BookCard from "../components/BookCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";

const Home = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	const topGenres = [
		{ name: "Fantasy", icon: "🧙‍♂️" },
		{ name: "Mystery", icon: "🕵️‍♀️" },
		{ name: "Sci-Fi", icon: "🚀" },
		{ name: "Thriller", icon: "🔪" },
		{ name: "Non-Fiction", icon: "🧠" },
		{ name: "Romance", icon: "💘" },
	];

	useEffect(() => {
		getAllBooks()
			.then(res => {
				setBooks(res.data.slice(-6).reverse());
				setLoading(false);
			})
			.catch(err => {
				console.error("Error fetching books for home:", err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-base-100">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="bg-base-100 min-h-screen">
			
			<section className="hero min-h-[70vh] bg-base-300 shadow-lg mb-12">
				<div className="hero-content text-center py-20">
					<div className="max-w-2xl">
						<h1 className="text-6xl font-extrabold text-primary mb-4 animate-fadeIn">
							Welcome to Book Haven 📚
						</h1>
						<p className="py-6 text-xl text-base-content/90 font-light">
							Explore, discover, and share your favorite reads in our curated digital library.
							Join the community of readers today!
						</p>
						<div className="flex justify-center gap-6 mt-6">
							<Link to="/all-books" className="btn btn-lg btn-primary shadow-xl hover:scale-105 transition">
								Explore All Books
							</Link>
							<Link to="/add-book" className="btn btn-lg btn-outline btn-primary hover:bg-primary/10 hover:border-primary transition">
								Add Your Book
							</Link>
						</div>
					</div>
				</div>
			</section>

			<div className="divider text-2xl font-bold text-base-content/80">RECENTLY ADDED</div>
			
			<section className="container mx-auto px-4 py-8">
				<h2 className="text-4xl font-bold mb-8 text-center text-secondary inline-block border-b-2 border-secondary/50 pb-1">
					Latest Additions
				</h2>

				{books.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{books.map(book => (
							<BookCard key={book._id} book={book} />
						))}
					</div>
				) : (
					<div className="text-center py-10 bg-base-200 rounded-xl shadow-inner mx-auto max-w-xl">
						<p className="text-xl text-base-content/70">No books found yet. Be the first to add one!</p>
					</div>
				)}

				<div className="text-center mt-12">
					<Link to="/all-books" className="btn btn-lg btn-link text-primary hover:text-secondary">
						View All {books.length}+ Books →
					</Link>
				</div>
			</section>

			<div className="divider my-12 text-2xl font-bold text-base-content/80">BROWSE BY CATEGORY</div>

			<section className="container mx-auto px-4 py-8 mb-16">
				<h2 className="text-4xl font-bold mb-8 text-center text-accent inline-block border-b-2 border-accent/50 pb-1">
					Top Genres
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
					{topGenres.map(genre => (
						<Link 
							key={genre.name} 
							to={`/all-books?genre=${genre.name}`} 
							className="card card-compact bg-base-200 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition duration-300 cursor-pointer group"
						>
							<div className="card-body items-center p-6">
								<span className="text-4xl mb-2 group-hover:animate-bounce">{genre.icon}</span>
								<h3 className="card-title text-lg font-semibold text-base-content group-hover:text-primary">
									{genre.name}
								</h3>
							</div>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;