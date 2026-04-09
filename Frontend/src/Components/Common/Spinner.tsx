type LoaderProps = {
  show: boolean;
  text?: string;
};

function Loader({ show, text = "Loading..." }: LoaderProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        
        {/* Spinner */}
        <div className="h-12 w-12 border-4 border-white/30 border-t-indigo-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-white text-sm sm:text-base md:text-lg">
          {text}
        </p>

      </div>
    </div>
  );
}

export default Loader;