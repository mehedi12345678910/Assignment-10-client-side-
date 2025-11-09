import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="footer p-6 sm:p-10 bg-base-300 text-base-content mt-12 shadow-inner">
			
			<div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
				
				<aside className="md:col-span-1">
					<div className="text-3xl font-extrabold text-primary">
						<span className="mr-1">📚</span>Book Haven
					</div>
					<p className="mt-2 text-base-content/70">
						Providing the best digital shelf for book enthusiasts since 2024.
					</p>
					<p className="text-sm mt-4">
						Copyright © 2025 Book Haven.<br />All rights reserved.
					</p>
				</aside>

				<nav className="md:col-span-1">
					<h6 className="footer-title text-lg text-secondary border-b border-base-content/10 pb-1 mb-2">Quick Links</h6>
					<div className="flex flex-col gap-2">
						<Link to="/" className="link link-hover">Home</Link>
						<Link to="/all-books" className="link link-hover">Browse All</Link>
						<Link to="/add-book" className="link link-hover">Add New Book</Link>
						<Link to="/my-books" className="link link-hover">My Bookshelf</Link>
					</div>
				</nav>

				<nav className="md:col-span-1">
					<h6 className="footer-title text-lg text-secondary border-b border-base-content/10 pb-1 mb-2">Company</h6>
					<div className="flex flex-col gap-2">
						<a className="link link-hover">About Us</a>
						<a className="link link-hover">Contact</a>
						<a className="link link-hover">Jobs</a>
						<a className="link link-hover">Press Kit</a>
					</div>
				</nav>
				
				<form className="md:col-span-1">
					<h6 className="footer-title text-lg text-secondary border-b border-base-content/10 pb-1 mb-2">Stay Updated</h6>
					
					<fieldset className="form-control w-full">
						<label className="label">
							<span className="label-text">Enter your email address</span>
						</label> 
						<div className="relative">
							<input type="email" placeholder="username@site.com" className="input input-bordered w-full pr-16" /> 
							<button className="btn btn-primary absolute top-0 right-0 rounded-l-none">Subscribe</button>
						</div>
					</fieldset>
					
					<div className="flex gap-4 mt-6">
						<a href="#" className="text-2xl text-base-content hover:text-primary transition duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.588-1.333h2.412v-3h-3.412c-4.695 0-5.588 1.57-5.588 4.667v2.333z"></path></svg></a>
						<a href="#" className="text-2xl text-base-content hover:text-primary transition duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.795-1.574 2.164-2.722-.951.565-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.373 0-6.095 2.593-6.095 5.773 0 .453.048.892.131 1.312-5.071-.248-9.563-2.684-12.571-6.386-.525.9-.824 1.936-.824 3.031 0 1.996 1.054 3.96 2.651 5.054-2.479-.079-4.553-.78-5.789-1.608.001.022.001.043.001.065 0 2.801 1.979 5.14 4.606 5.672-.48.131-.989.192-1.514.192-.375 0-.74-.035-1.096-.104.731 2.215 2.868 3.815 5.385 3.869-1.956 1.45-4.428 2.32-7.1 2.32-.464 0-.923-.028-1.375-.081 2.51 1.583 5.487 2.508 8.718 2.508 10.437 0 16.121-8.683 16.121-16.121 0-.246-.006-.491-.019-.734.695-.502 1.298-1.134 1.789-1.854z"></path></svg></a>
						<a href="#" className="text-2xl text-base-content hover:text-primary transition duration-200"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.972 5.074.058 1.189.07 1.58.07 4.85s-.012 3.584-.07 4.85c-.201 3.383-1.722 4.925-4.972 5.074-1.267.058-1.65.07-4.85.07s-3.585-.012-4.85-.07c-3.25-.149-4.771-1.692-4.971-5.074-.058-1.189-.07-1.58-.07-4.85s.012-3.584.07-4.85c.2-3.383 1.72-4.925 4.971-5.074 1.265-.058 1.65-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.944.072-4.359.202-6.703 2.59-6.912 6.912-.058 1.277-.072 1.685-.072 4.944s.014 3.667.072 4.944c.201 4.359 2.59 6.703 6.912 6.912 1.277.058 1.685.072 4.944.072s3.667-.014 4.944-.072c4.354-.201 6.703-2.59 6.912-6.912.058-1.277.072-1.685.072-4.944s-.014-3.667-.072-4.944c-.202-4.359-2.59-6.703-6.912-6.912-1.277-.058-1.685-.072-4.944-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.5-11.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"></path></svg></a>
					</div>
				</form>
				
			</div>

			<div className="md:hidden divider my-4"></div>
			
			<div className="w-full text-center">
				<p className="text-sm text-base-content/60">
					<Link to="/privacy" className="link link-hover">Privacy Policy</Link> | 
					<Link to="/terms" className="link link-hover ml-1">Terms of Service</Link>
				</p>
			</div>
			
		</footer>
	);
};

export default Footer;