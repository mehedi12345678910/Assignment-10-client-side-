const LoadingSpinner = () => (

  <div className="flex flex-col items-center justify-center p-10 bg-base-100 min-h-[30vh]">
    

    <span className="loading loading-spinner loading-lg text-primary"></span>
    

    <p className="mt-4 text-lg font-medium text-base-content/80">
      Loading data, please wait...
    </p>

  </div>
);

export default LoadingSpinner;