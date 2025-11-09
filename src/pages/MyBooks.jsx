import { useEffect, useState, useContext } from "react";
import { getAllBooks, deleteBook } from "../api/bookApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

const MyBooks = () => {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [deletingId, setDeletingId] = useState(null);

	// Custom Confirmation Modal State
	const [bookToDeleteId, setBookToDeleteId] = useState(null);
	const [bookToDeleteTitle, setBookToDeleteTitle] = useState("");
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	
	// General Error State
	const [generalError, setGeneralError] = useState(null);

	const fetchMyBooks = () => {
		if (!user) {
			setLoading(false);
			return;
		}

		getAllBooks()
			.then(res => {
				// Filter books posted by the current user
				const userBooks = res.data.filter(b => b.userEmail === user.email);
				setBooks(userBooks);
				setLoading(false);
				setGeneralError(null); // Clear errors on success
			})
			.catch(err => {
				console.error("Error fetching user's books:", err);
				setLoading(false);
				// Replaced alert with state error
				setGeneralError("Failed to load your books. Please check your connection.");
			});
	};

	useEffect(() => {
		fetchMyBooks();
	}, [user]);

	// 1. Function to initiate the deletion process by showing the modal
	const handleDelete = (id, title) => {
		setBookToDeleteId(id);
		setBookToDeleteTitle(title);
		setShowConfirmModal(true);
	};

	// 2. Function to cancel deletion
	const cancelDelete = () => {
		setShowConfirmModal(false);
		setBookToDeleteId(null);
		setBookToDeleteTitle("");
	};

	// 3. Function to confirm and execute the API deletion
	const confirmDelete = () => {
		if (!bookToDeleteId) return;
		
		setShowConfirmModal(false);
		setDeletingId(bookToDeleteId);
		setGeneralError(null);

		deleteBook(bookToDeleteId)
			.then(() => {
				// Optimistically update the UI by removing the deleted book
				setBooks(prevBooks => prevBooks.filter(b => b._id !== bookToDeleteId));
			})
			.catch(err => {
				console.error("Error deleting book:", err);
				// Replaced alert with state error
				setGeneralError("Deletion failed. Please try again.");
			})
			.finally(() => {
				setDeletingId(null);
				setBookToDeleteId(null);
				setBookToDeleteTitle("");
			});
	};


	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-base-100">
				<LoadingSpinner />
			</div>
		);
	}

	// --- Display based on User/Book Status ---
	
	if (!user) {
		return (
			<div className="container mx-auto p-8 text-center min-h-screen">
				<div role="alert" className="alert alert-warning max-w-lg mx-auto shadow-lg">
					<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z" /></svg>
					<span>**Access Denied.** Please log in to view your personalized book list.</span>
				</div>
				<button onClick={() => navigate("/login")} className="btn btn-primary mt-6">
					Go to Login
				</button>
			</div>
		);
	}

	if (books.length === 0) {
		return (
			<div className="container mx-auto p-8 text-center min-h-screen">
				<h2 className="text-4xl font-bold text-primary mb-4">Your Shelf is Empty, {user.name}!</h2>
				<p className="text-xl text-base-content/70 mb-8">
					You haven't added any books to the collection yet. Start sharing your favorites!
				</p>
				<button onClick={() => navigate("/add-book")} className="btn btn-lg btn-secondary">
					<span className="mr-2 text-xl">➕</span> Add Your First Book
				</button>
			</div>
		);
	}

	// --- Main Content: Table Display ---

	return (
		<div className="container mx-auto p-4 md:p-8 bg-base-100 min-h-screen">
			
			{/* General Error Display */}
			{generalError && (
				<div role="alert" className="alert alert-error mb-6 max-w-2xl mx-auto">
					<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
					<span>{generalError}</span>
				</div>
			)}
			
			{/* 📚 Header Section */}
			<div className="mb-8">
				<h2 className="text-4xl font-bold text-base-content inline-block border-b-4 border-secondary pb-1">
					<span className="mr-2">👤</span>
					My Book Collection
				</h2>
				<p className="mt-2 text-lg text-base-content/70">
					Welcome back, **{user.name}**! Here are the {books.length} books you've contributed.
				</p>
			</div>

			{/* 📊 Responsive Table */}
			<div className="overflow-x-auto card bg-base-200 shadow-xl">
				<table className="table table-lg w-full">
					{/* Table Header */}
					<thead>
						<tr className="text-base text-secondary">
							<th>Title</th>
							<th>Author</th>
							<th className="hidden sm:table-cell">Genre</th>
							<th>Rating</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					
					{/* Table Body */}
					<tbody>
						{books.map(book => (
							<tr key={book._id} className="hover:bg-base-300 transition duration-150">
								{/* Title and Cover Image */}
								<td className="font-semibold text-base-content">
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12 bg-base-300">
												{book.coverImage && (
													<img src={book.coverImage} alt={`${book.title} cover`} className="object-cover" />
												)}
											</div>
										</div>
										<div>
											{book.title}
										</div>
									</div>
								</td>
								
								{/* Author */}
								<td>
									<span className="font-light">{book.author}</span>
								</td>
								
								{/* Genre (Hidden on small screens) */}
								<td className="hidden sm:table-cell">
									<div className="badge badge-outline badge-info">{book.genre}</div>
								</td>
								
								{/* Rating */}
								<td>
									<div className="flex items-center font-bold text-warning">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
											<path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.55l6.568-.955L10 1l2.945 5.595 6.568.955-4.758 4.095 1.123 6.545z" />
										</svg>
										{book.rating}
									</div>
								</td>
								
								{/* Actions */}
								<td className="text-center space-x-2">
									<button 
										onClick={() => navigate(`/update-book/${book._id}`)} 
										className="btn btn-sm btn-warning"
									>
										Edit
									</button>
									<button 
										onClick={() => handleDelete(book._id, book.title)} 
										className={`btn btn-sm btn-error ${deletingId === book._id ? 'loading' : ''}`}
										disabled={deletingId !== null}
									>
										{deletingId === book._id ? '' : 'Delete'}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			
			{/* Confirmation Modal (Hidden by default, shown by state) */}
			{showConfirmModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={cancelDelete}>
					<div className="card w-full max-w-md bg-base-100 shadow-xl" onClick={(e) => e.stopPropagation()}>
						<div className="card-body p-6">
							<h3 className="card-title text-2xl text-error">Confirm Deletion</h3>
							<p className="py-4">
								Are you absolutely sure you want to delete the book: 
								<br />
								<span className="font-bold italic text-base-content/80">"{bookToDeleteTitle}"</span>?
								<br />
								This action cannot be undone.
							</p>
							<div className="card-actions justify-end space-x-3">
								<button 
									className="btn btn-ghost" 
									onClick={cancelDelete}
								>
									Cancel
								</button>
								<button 
									className="btn btn-error" 
									onClick={confirmDelete}
								>
									Yes, Delete It
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
			
		</div>
	);
};

export default MyBooks;