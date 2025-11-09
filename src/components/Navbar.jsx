import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const toggleTheme = () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	const newTheme = currentTheme === 'light' ? 'dark' : 'light';
	document.documentElement.setAttribute('data-theme', newTheme);
};

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext); 
	const [isDarkTheme, setIsDarkTheme] = useState(document.documentElement.getAttribute('data-theme') === 'dark');

	const userPhoto = user && user.photoURL ? user.photoURL : "https://via.placeholder.com/100?text=👤";

	const navLinks = [
		{ to: "/", label: "Home", requiresAuth: false, icon: '🏠' },
		{ to: "/all-books", label: "Browse All", requiresAuth: false, icon: '📚' },
		{ to: "/add-book", label: "Add Book", requiresAuth: true, icon: '✍️' },
		{ to: "/my-books", label: "My Books", requiresAuth: true, icon: '👤' },
	];

	const renderLink = (link) => {
		if (!link.requiresAuth || user) {
			return (
				<Link 
					key={link.to} 
					to={link.to} 
					className="btn btn-ghost normal-case text-base font-semibold transition hover:text-primary md:ml-2"
				>
					{link.label}
				</Link>
			);
		}
		return null;
	};

	return (
		<div className="navbar bg-base-100 shadow-2xl sticky top-0 z-40 px-4 md:px-8">
			<div className="container mx-auto flex justify-between items-center">
				
				<div className="flex items-center">
					
					<div className="dropdown md:hidden">
						<label tabIndex={0} className="btn btn-ghost btn-circle mr-2">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
							</svg>
						</label>
						<ul tabIndex={0} className="menu menu-lg dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-200 rounded-box w-64">
							<li className="menu-title text-secondary border-b pb-2 mb-2">Navigation</li>
							{navLinks.map(link => (
								(!link.requiresAuth || user) && (
									<li key={link.to}>
										<Link to={link.to} className="justify-start text-base">
											<span className="text-lg mr-2">{link.icon}</span>{link.label}
										</Link>
									</li>
								)
							))}
							
							{!user && (
								<li className="mt-4 flex flex-col gap-2 p-1">
									<Link to="/login" className="btn btn-sm btn-primary">Login</Link>
									<Link to="/register" className="btn btn-sm btn-secondary">Register</Link>
								</li>
							)}
							<li className="flex justify-between items-center p-2 mt-4">
								<span className="text-base font-semibold">Dark Mode:</span>
								<input type="checkbox" className="toggle toggle-primary" checked={isDarkTheme} onChange={() => { toggleTheme(); setIsDarkTheme(!isDarkTheme); }}/>
							</li>
						</ul>
					</div>
					
					<Link to="/" className="btn btn-ghost normal-case text-xl md:text-2xl font-extrabold text-primary hover:bg-transparent">
						<span className="mr-1">📚</span>Book Haven
					</Link>
				</div>
				
				<div className="hidden md:flex flex-grow justify-center">
					<div className="flex gap-1">
						{navLinks.map(link => renderLink(link))}
					</div>
				</div>

				<div className="flex-none gap-2 sm:gap-4">
					

					{user ? (
						
						<div className="dropdown dropdown-end">
							<div className="flex items-center gap-5">
								<label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary hover:border-secondary transition">
									<div className="w-10 rounded-full bg-base-300 overflow-hidden">
										<img 
											src={userPhoto} 
											alt={`${user.displayName || user.email} avatar`} 
											className="object-cover h-full w-full" 
											onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/100?text=👤"; }}
										/>
									</div>
									
								</label>
								<div className="hidden md:block items-center">
									<span className="mr-2 text-base-content/70 text-sm">Theme:</span>
									<input 
										type="checkbox" 
										className="toggle toggle-sm toggle-primary" 
										checked={isDarkTheme} 
										onChange={() => { toggleTheme(); setIsDarkTheme(!isDarkTheme); }}
										title="Toggle Light/Dark Mode"
									/>
								</div>
							</div>
			
							<ul tabIndex={0} className="mt-3 z-[1] p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
								<li className="menu-title text-sm text-base-content/80 pt-0 pb-1 border-b mb-1">
									<span className="font-bold text-primary block">{user.displayName || "User"}</span>
									<span className="text-xs font-normal">({user.email})</span>
								</li>
								<li className="mt-2">
									<button onClick={logOut} className="text-error hover:bg-error/80 hover:text-white">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
										Logout
									</button>
								</li>
							</ul>
							
						</div>
						
					) : (
						
						<div className="flex gap-2">
			 
							<Link to="/login" className="btn btn-primary btn-sm md:btn-md shadow-md">Login</Link>
							<Link to="/register" className="btn btn-secondary btn-sm md:btn-md hidden sm:inline-flex">Register</Link>
						 
						</div>
					)}
					
				</div>
				
			</div>
		</div>
	);
};

export default Navbar;