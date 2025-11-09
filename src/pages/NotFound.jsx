import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
 
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 p-6">
      
   
      <div className="text-9xl font-extrabold text-primary opacity-70 mb-4 tracking-widest">
        404
      </div>

    
      <div className="card bg-base-200 shadow-xl w-full max-w-lg p-8 text-center border-t-4 border-error">
        <div className="card-body p-0">
          
          <h2 className="text-4xl font-bold text-error mb-4">
            <span className="mr-2">🚨</span> Page Not Found
          </h2>
          
          <p className="text-lg text-base-content/80 mb-6">
            Oops! It looks like you've wandered off the reading path. The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>

       
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
            
           
            <button 
              onClick={() => navigate("/")} 
              className="btn btn-lg btn-primary shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3" /></svg>
              Go to Homepage
            </button>
            
            
            <button 
              onClick={() => navigate(-1)} 
              className="btn btn-lg btn-ghost hover:bg-base-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" /></svg>
              Go Back
            </button>
            
          </div>

        </div>
      </div>
    </div>
  );
};

export default NotFound;