import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";

const BookDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { user } = useContext(AuthContext); 

	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [commentText, setCommentText] = useState("");
	const [isPosting, setIsPosting] = useState(false);
	const [alertMessage, setAlertMessage] = useState(null);
	const [alertType, setAlertType] = useState("info");

	useEffect(() => {
		setLoading(true);
		axios
			.get(`http://localhost:5000/book/${id}`)
			.then(res => {
				setBook(res.data);
				setLoading(false);
			})
			.catch(err => {
				console.error("Error fetching book details:", err);
				setLoading(false);
			});
	}, [id]);

	const handleCommentSubmit = async (e) => {
		e.preventDefault();

		if (!commentText.trim()) {
			setAlertType("error");
			setAlertMessage("Comment cannot be empty!");
			return;
		}
		if (!user) {
			setAlertType("error");
			setAlertMessage("You must be logged in to comment.");
			return;
		}
		
		if (!user.email || !user.uid) {
				setAlertType("error");
				setAlertMessage("User information is incomplete. Please re-login.");
				return;
		}

		setIsPosting(true);

		const commentData = {
			text: commentText,
			userId: user.uid, 
			userName: user.displayName, 
			userEmail: user.email,
			userAvatar: user.photoURL || "", 
		};
		
		const token = await user.getIdToken();

		try {
			const res = await axios.post(
				`http://localhost:5000/book/${book._id}/comments`,
				commentData,
				{
						headers: {
								Authorization: `Bearer ${token}`,
						},
				}
			);

			if (res.data.success) {
				setAlertType("success");
				setAlertMessage("Comment posted successfully!");
				setCommentText("");
				
				setBook(prev => ({
					...prev,
					comments: [...(prev.comments || []), { 
								text: commentData.text,
								userName: commentData.userName,
								userEmail: commentData.userEmail,
								userAvatar: commentData.userAvatar,
								createdAt: new Date() 
						}]
				}));
			} else {
				setAlertType("error");
				setAlertMessage("Failed to post comment.");
			}
		} catch (error) {
			console.error("Comment submission failed:", error);
			setAlertType("error");
			if (error.response?.status === 401) {
						setAlertMessage("Authentication failed. Please log in again.");
				} else {
						setAlertMessage("An error occurred while submitting the comment.");
				}
		} finally {
			setIsPosting(false);
			setTimeout(() => setAlertMessage(null), 3000);
		}
	};

	if (loading) return (
		<div className="min-h-screen flex items-center justify-center bg-base-100">
			<LoadingSpinner />
		</div>
	);

	if (!book) return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-8">
			<h2 className="text-3xl font-bold text-error mb-4">Book Not Found</h2>
			<p className="text-lg text-base-content/70">The requested book could not be loaded.</p>
			<button onClick={() => navigate("/all-books")} className="btn btn-primary mt-6">
				Go Back to All Books
			</button>
		</div>
	);

	const isOwner = user && book.userEmail && user.email === book.userEmail;

	return (
		<div className="container mx-auto p-4 md:p-10 bg-base-100 min-h-screen">
			<div className="max-w-6xl mx-auto">
				<div className="card lg:card-side bg-base-200 shadow-2xl p-6">
					<figure className="lg:w-1/3 w-full max-w-xs mx-auto lg:mx-0 shadow-2xl rounded-lg overflow-hidden shrink-0">
						<img src={book.coverImage} alt={book.title} className="object-cover w-full h-96" />
					</figure>
					<div className="card-body p-4 lg:p-8">
						<h2 className="card-title text-4xl font-extrabold text-primary mb-2">{book.title}</h2>
						<p className="text-xl text-base-content/80 mb-4">
							by <span className="font-semibold text-secondary">{book.author}</span>
						</p>

						<div className="flex items-center gap-6 mb-4">
							<div className="flex items-center text-lg font-bold">
								<span className="text-2xl text-warning mr-1">⭐</span>
								<span className="text-base-content/90">{book.rating || 'N/A'}</span>
							</div>
							<div className="badge badge-lg badge-outline badge-primary">
								{book.genre || 'Uncategorized'}
							</div>
						</div>
						
						<h3 className="text-2xl font-bold mt-4 mb-2 text-base-content">Summary</h3>
						<p className="text-base text-base-content/70 italic leading-relaxed mb-6">
								{book.summary || 'No summary provided for this book.'}
						</p>

						<div className="mt-auto pt-4 border-t border-base-300">
								<p className="text-sm text-base-content/60 mb-2">
										Added by: <span className="font-semibold">{book.userName || 'Unknown User'}</span> ({book.userEmail})
								</p>
								{isOwner && (
										<button onClick={() => navigate(`/update-book/${book._id}`)} className="btn btn-warning mt-2">
												<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
												Edit Book
										</button>
								)}
						</div>
					</div>
				</div>

				<div className="divider my-10">Reader Interactions</div>

				{alertMessage && (
					<div className={`alert shadow-lg mb-4 ${alertType === "success" ? "alert-success" : alertType === "error" ? "alert-error" : "alert-info"}`}>
						<div>{alertMessage}</div>
					</div>
					)}

				{user ? (
					<form onSubmit={handleCommentSubmit} className="bg-base-300 p-6 rounded-lg shadow-inner space-y-4">
						<textarea
							className="textarea textarea-bordered w-full resize-none"
							placeholder="Share your thoughts..."
							value={commentText}
							onChange={e => setCommentText(e.target.value)}
							disabled={isPosting}
							required
						></textarea>
						<button type="submit" className={`btn btn-secondary ${isPosting ? 'loading' : ''}`} disabled={isPosting}>
							{isPosting ? 'Posting...' : 'Submit Comment'}
						</button>
					</form>
				) : (
					<div className="alert alert-info flex items-center">
						<span>Login to comment!</span>
						<button onClick={() => navigate("/login")} className="btn btn-sm btn-info ml-auto">Login</button>
					</div>
				)}

				<div className="mt-8 space-y-4">
					<h3 className="text-2xl font-bold mb-4">User Reviews ({book.comments?.length || 0})</h3>
					{book.comments?.map((c, i) => (
						<div key={i} className="card bg-base-100 shadow-md p-4">
								<div className="flex items-center mb-2">
										<div className="avatar mr-3">
												<div className="w-8 rounded-full">
														<img 
																src={c.userAvatar || "https://via.placeholder.com/100?text=👤"} 
																alt={c.userName}
														/>
												</div>
										</div>
										<div>
												<p className="font-semibold text-primary">{c.userName || 'Anonymous'}</p>
												<p className="text-xs text-base-content/50">
														{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Just now'}
												</p>
										</div>
								</div>
							<p className="text-base-content/80 mt-2">{c.text}</p>
						</div>
					))}
				</div>

			</div>
		</div>
	);
};

export default BookDetails;