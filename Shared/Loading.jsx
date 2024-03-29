
const Loading = () => {
  return (
    <div className="h-[70vh]  flex items-center justify-center">
      <span className="animate-spin h-5 w-5 mr-3 border-2 border-l-orange-500 border-r-purple-500 border-t-white border-b-black  rounded-full "></span>
      <h2 className="font-bold text-xl">
        Loading <span className="text-purple-500">.</span>
        <span className="text-orange-500">.</span>
        <span className="text-black">.</span>
      </h2>
    </div>
  );
};

export default Loading;
