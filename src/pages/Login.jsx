

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";


import { FcGoogle } from "react-icons/fc"; 


const Login = () => {

    const { logIn, googleSignIn, loading } = useContext(AuthContext); 
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    const handleLogin = (e) => {
        e.preventDefault();
        setLoginError("");
        setIsSubmitting(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        logIn(email, password)
            .then(result => {
                console.log("Login Success:", result.user);
                navigate("/");
            })
            .catch(error => {
                console.error("Login Error:", error.message);
                setIsSubmitting(false);

              
                if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
                    setLoginError("Invalid email or password. Please try again.");
                } else if (error.code === 'auth/user-not-found') {
                    setLoginError("No user found with this email.");
                } else {
                    setLoginError("Login failed. Please check your network or try again.");
                }
            });
    };
    

    const handleGoogleSignIn = () => {
        setLoginError("");
        
        googleSignIn()
            .then(result => {
                console.log("Google Sign-in Success:", result.user);
                navigate("/");
            })
            .catch(error => {
                console.error("Google Sign-in Error:", error);
                setLoginError("Google Sign-in failed. Please try again.");
            });
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
            <div className="card w-full max-w-lg bg-white shadow-2xl transition-all duration-300 hover:shadow-primary/50 border border-gray-200">
                <form onSubmit={handleLogin} className="card-body">
                    
                    <h2 className="card-title text-5xl font-extrabold text-primary justify-center mb-8">
                        Welcome Back! 🚀
                    </h2>
                    
                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-medium text-gray-700">Email Address</span>
                        </label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="you@example.com" 
                            required 
                            className="input input-bordered input-primary w-full text-base" 
                        />
                    </div>
                    
                    {/* Password Input */}
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-lg font-medium text-gray-700">Password</span>
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="••••••••" 
                            required 
                            className="input input-bordered input-primary w-full text-base" 
                        />
                    </div>
                    
                    {/* Error Alert */}
                    {loginError && (
                        <div role="alert" className="alert alert-error mt-4 shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="font-semibold">{loginError}</span>
                        </div>
                    )}
                    
                    {/* Log In Button */}
                    <div className="form-control mt-6">
                        <button 
                            type="submit" 
                            className={`btn btn-primary btn-lg w-full text-lg font-bold shadow-xl transition-transform transform hover:scale-[1.01] ${isSubmitting ? 'loading' : ''}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "" : "Log In"}
                        </button>
                    </div>
                    
                    {/* Divider */}
                    <div className="divider text-gray-500 text-sm font-medium my-6">OR CONTINUE WITH</div>

                    {/* Google Sign-in Button */}
                    <div className="form-control">
                        <button 
                            onClick={handleGoogleSignIn} 
                            type="button" 
                            className="btn btn-outline btn-info btn-lg w-full text-lg shadow-md transition-all duration-300 hover:bg-info hover:text-white border-2 border-info"
                            disabled={loading}
                        >
                            {/* 2. <FcGoogle /> কম্পোনেন্টটি ব্যবহার করা হয়েছে */}
                            <FcGoogle className="w-6 h-6 mr-2" /> 
                            Sign in with Google
                        </button>
                    </div>

                    {/* Register Link */}
                    <p className="text-center mt-6 text-gray-600 text-base">
                        Don't have an account? <Link to="/register" className="link link-hover text-secondary font-bold hover:underline">Create an account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;