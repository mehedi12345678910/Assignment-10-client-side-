

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

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
                    setLoginError("Login failed. Please check your network.");
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
        <div className="container mx-auto p-4 md:p-8 min-h-screen flex justify-center items-center bg-base-100">
            <div className="card w-full max-w-md bg-base-200 shadow-2xl">
                <form onSubmit={handleLogin} className="card-body">
                    <h2 className="card-title text-4xl font-extrabold text-primary justify-center mb-6">🔑 Login</h2>
                    
                   
                    <div className="form-control">
                        <label className="label"><span className="label-text">Email</span></label>
                        <input type="email" name="email" placeholder="example@email.com" required className="input input-bordered input-primary" />
                    </div>
                    
                    <div className="form-control">
                        <label className="label"><span className="label-text">Password</span></label>
                        <input type="password" name="password" placeholder="********" required className="input input-bordered input-primary" />
                    </div>
                    
                    {loginError && (
                        <div role="alert" className="alert alert-error mt-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{loginError}</span>
                        </div>
                    )}
                    
                    <div className="form-control mt-6">
                        <button 
                            type="submit" 
                            className={`btn btn-primary shadow-lg ${isSubmitting && 'loading'}`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "" : "Log In"}
                        </button>
                    </div>
                    
               
                    <div className="divider text-base-content/60 text-xs my-4">OR</div>

                    <div className="form-control">
                        <button 
                            onClick={handleGoogleSignIn} 
                            type="button" 
                            className="btn btn-outline btn-info w-full shadow-md"
                            disabled={loading}
                        >
                            <svg className="h-5 w-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                               
                                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.309c-.752 4.417-3.856 7.643-8.84 7.643-6.096 0-11.028-4.932-11.028-11.028S17.373 13.67 23.47 13.67c3.344 0 5.484 1.455 6.775 2.684l4.63-4.63C32.1 7.155 27.683 4 23.47 4 14.536 4 7.22 11.316 7.22 20.25s7.316 16.25 16.25 16.25c9.088 0 15.53-6.425 15.53-15.656 0-1.034-.143-2.028-.354-2.984z"/><path fill="#FF3D00" d="M11.666 22.091c-.244-.687-.384-1.418-.384-2.17s.14-1.483.384-2.17L7.22 13.67C6.46 15.19 6 16.96 6 18.75s.46 3.56 1.22 5.08z"/><path fill="#4CAF50" d="M23.47 44c-9.088 0-15.53-6.425-15.53-15.656 0-1.034.143-2.028.354-2.984h4.869c-.244.687-.384 1.418-.384 2.17s.14 1.483.384 2.17l4.446 4.446C20.323 38.312 21.84 39 23.47 39c2.427 0 4.85-1.042 6.477-3.235l4.446 4.446C32.1 40.845 27.683 44 23.47 44z"/><path fill="#1976D2" d="M43.611 20.083h-1.611V20H24v8h11.309c-.752 4.417-3.856 7.643-8.84 7.643-6.096 0-11.028-4.932-11.028-11.028s4.932-11.028 11.028-11.028c3.344 0 5.484 1.455 6.775 2.684l4.63-4.63C32.1 7.155 27.683 4 23.47 4 14.536 4 7.22 11.316 7.22 20.25s7.316 16.25 16.25 16.25c9.088 0 15.53-6.425 15.53-15.656 0-1.034-.143-2.028-.354-2.984z"/></svg>
                            Sign in with Google
                        </button>
                    </div>

                    <p className="text-center mt-4">
                        Don't have an account? <Link to="/register" className="link link-hover text-secondary font-semibold">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;