
import { useEffect, useState, useContext } from "react";
import { getAllBooks, deleteBook } from "../api/bookApi";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner"; 
import { AuthContext } from "../context/AuthContext";

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);
    const [sortOrder, setSortOrder] = useState(null); // 'high' or 'low'
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchBooks = () => {
        getAllBooks()
            .then(res => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching books:", err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = (id, title) => {
        if (!user) {
            alert("Please login first to delete books.");
            navigate("/login");
            return;
        }
        
        if (!window.confirm(`Are you sure you want to delete the book: "${title}"?`)) {
            return;
        }

        setDeletingId(id);
        deleteBook(id)
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
                setDeletingId(null);
            })
            .catch(err => {
                console.error("Error deleting book:", err);
                alert("Failed to delete the book. Please try again.");
                setDeletingId(null);
            });
    };

    // New sorting logic
    const handleSort = (order) => {
        setSortOrder(order);
        // Create a copy of the books array to sort
        const sortedBooks = [...books].sort((a, b) => {
            const ratingA = parseFloat(a.rating) || 0; // Ensure rating is a number
            const ratingB = parseFloat(b.rating) || 0;
            
            if (order === 'high') {
                return ratingB - ratingA; // High to Low (Descending)
            } else if (order === 'low') {
                return ratingA - ratingB; // Low to High (Ascending)
            }
            return 0;
        });
        setBooks(sortedBooks);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 bg-base-100 min-h-screen">
            
            <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-primary inline-block border-b-4 border-secondary pb-2">
                    <span className="mr-2">📚</span>
                    All Books in the Shelf
                </h2>
                <p className="mt-4 text-lg text-base-content/80">Discover new reads added by our community.</p>
            </div>
            
            {/* --- Sorting Options Added Here --- */}
            <div className="flex justify-end space-x-4 mb-10">
                <button 
                    onClick={() => handleSort('high')} 
                    className={`btn btn-sm ${sortOrder === 'high' ? 'btn-secondary' : 'btn-outline btn-secondary'}`}
                >
                    ⭐ High Rating First
                </button>
                <button 
                    onClick={() => handleSort('low')} 
                    className={`btn btn-sm ${sortOrder === 'low' ? 'btn-secondary' : 'btn-outline btn-secondary'}`}
                >
                    ☆ Low Rating First
                </button>
            </div>
            {/* --- End Sorting Options --- */}

            {books.length === 0 && (
                <div className="text-center py-20 bg-base-200 rounded-lg shadow-inner mx-auto max-w-lg">
                    <h3 className="text-2xl font-bold mb-2">Shelf is Empty!</h3>
                    <p className="text-base-content/70">It looks like no books have been added yet.</p>
                    <button 
                        onClick={() => navigate("/add-book")} 
                        className="btn btn-primary mt-4"
                    >
                        Add the First Book
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map(book => {
                    const isOwner = user?.email === book.userEmail;
                    const isDeleting = deletingId === book._id;

                    return (
                        <div key={book._id} className="card w-full bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                            
                            <figure className="h-60 overflow-hidden bg-base-300">
                                {book.coverImage ? (
                                    <img 
                                        src={book.coverImage} 
                                        alt={`${book.title} cover`} 
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-full h-full text-base-content/50">
                                        No Cover Image
                                    </div>
                                )}
                            </figure>
                            
                            <div className="card-body p-4">
                                <h3 className="card-title text-xl line-clamp-2">
                                    {book.title}
                                    {isOwner && (
                                        <div className="badge badge-secondary ml-2">Mine</div>
                                    )}
                                </h3>
                                <p className="text-sm text-base-content/70">by **{book.author}**</p>
                                
                                <div className="flex justify-between items-center text-sm mt-2">
                                    <div className="badge badge-outline badge-info">{book.genre}</div>
                                    <div className="flex items-center font-bold text-warning">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.55l6.568-.955L10 1l2.945 5.595 6.568.955-4.758 4.095 1.123 6.545z" />
                                        </svg>
                                        {book.rating} / 5
                                    </div>
                                </div>

                                <div className="card-actions justify-end mt-4">
                                    
                                    <button 
                                        onClick={() => navigate(`/book/${book._id}`)} 
                                        className="btn btn-sm btn-info btn-outline flex-grow"
                                    >
                                        View Details
                                    </button>
                                    
                                    {isOwner && (
                                        <>
                                            <button 
                                                onClick={() => navigate(`/update-book/${book._id}`)} 
                                                className="btn btn-sm btn-warning"
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(book._id, book.title)} 
                                                className={`btn btn-sm btn-error ${isDeleting ? 'loading' : ''}`}
                                                disabled={isDeleting}
                                            >
                                                {isDeleting ? '' : 'Delete'}
                                            </button>
                                        </>
                                    )}
                                </div>
                                
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AllBooks;