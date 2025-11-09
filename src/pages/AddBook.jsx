import { useState, useContext } from "react";
import { addBook } from "../api/bookApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	
	const [book, setBook] = useState({
		title: "",
		author: "",
		genre: "",
		rating: 1,
		summary: "",
		coverImage: "",
		userEmail: user?.email || "",
		userName: user?.name || "",
	});
	
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);

	const handleChange = (e) => {
		const value = e.target.name === "rating" ? Number(e.target.value) : e.target.value;
		setBook({ ...book, [e.target.name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setSuccessMessage(null);

		if (book.rating < 1 || book.rating > 5) {
			setError("Rating must be between 1 and 5.");
			setIsLoading(false);
			return;
		}

		addBook(book)
			.then(() => {
				setSuccessMessage("Book added successfully! Redirecting...");
				setBook({ 
					title: "", author: "", genre: "", rating: 1, 
					summary: "", coverImage: "", 
					userEmail: user?.email || "", userName: user?.name || ""
				});
				
				setTimeout(() => {
					navigate("/all-books");
				}, 1500);
			})
			.catch(err => {
				console.error("Failed to add book:", err);
				setError("Failed to add book. Please try again.");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="min-h-screen flex items-start justify-center bg-base-200 p-6">
			<div className="card w-full max-w-2xl bg-base-100 shadow-2xl mt-10">
				<div className="card-body">
					<h2 className="card-title text-3xl font-extrabold text-primary mb-6 justify-center">
						<span className="mr-2">📝</span>
						Add a New Book to the Collection
					</h2>
					<p className="text-center text-sm text-base-content/70 mb-4">
						Fill in the details below to share your reading discovery.
					</p>
					
					<form onSubmit={handleSubmit} className="space-y-4">
						
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							
							<div className="form-control">
								<label className="label">
									<span className="label-text font-semibold">Title</span>
								</label>
								<input 
									type="text" 
									name="title" 
									placeholder="e.g., The Lord of the Rings" 
									onChange={handleChange} 
									required 
									className="input input-bordered w-full" 
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text font-semibold">Author</span>
								</label>
								<input 
									type="text" 
									name="author" 
									placeholder="e.g., J.R.R. Tolkien" 
									onChange={handleChange} 
									required 
									className="input input-bordered w-full" 
								/>
							</div>

							<div className="form-control">
								<label className="label">
									<span className="label-text font-semibold">Genre</span>
								</label>
								<input 
									type="text" 
									name="genre" 
									placeholder="e.g., Fantasy, Sci-Fi" 
									onChange={handleChange} 
									required 
									className="input input-bordered w-full" 
								/>
							</div>
							
							<div className="form-control">
								<label className="label">
									<span className="label-text font-semibold">Rating (1-5)</span>
								</label>
								<input 
									type="number" 
									name="rating" 
									placeholder="Enter a number from 1 to 5" 
									onChange={handleChange} 
									value={book.rating}
									min="1"
									max="5"
									step="0.1"
									required 
									className="input input-bordered w-full" 
								/>
								{error && name === "rating" && <p className="text-error text-sm mt-1">{error}</p>}
							</div>

						</div>

						<div className="form-control">
							<label className="label">
								<span className="label-text font-semibold">Cover Image URL</span>
							</label>
							<input 
								type="url"
								name="coverImage" 
								placeholder="https://example.com/cover.jpg" 
								onChange={handleChange} 
								required 
								className="input input-bordered w-full" 
							/>
						</div>
						
						<div className="form-control">
							<label className="label">
								<span className="label-text font-semibold">Summary</span>
							</label>
							<textarea 
								name="summary" 
								placeholder="Write a brief summary of the book..." 
								onChange={handleChange} 
								required 
								rows="4"
								className="textarea textarea-bordered h-24 w-full" 
							></textarea>
						</div>
						
						{error && <div role="alert" className="alert alert-error">
							<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							<span>{error}</span>
						</div>}

						{successMessage && <div role="alert" className="alert alert-success mt-4">
							<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
							<span>{successMessage}</span>
						</div>}

						<div className="form-control mt-6">
							<button 
								type="submit" 
								className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
								disabled={isLoading}
							>
								{isLoading ? "Adding..." : "Add Book"}
							</button>
						</div>
					</form>
					
					<div className="mt-4 text-sm text-center text-base-content/50">
						Book will be added by: **{user?.name || "Guest"}**
					</div>

				</div>
			</div>
		</div>
	);
};

export default AddBook;