const LineLoader = () => {
    return (
      <div className="w-full">
        <div className="w-full h-1 bg-white rounded-full relative overflow-hidden">
          <div className="absolute left-[-50%] h-1 w-[40%] bg-[#1B473B] animate-lineAnim rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default LineLoader;
  
  // Add this to your global CSS or tailwind.config.js file
  // Inside tailwind.config.js:
  // module.exports = {
  //   theme: {
  //     extend: {
  //       animation: {
  //         lineAnim: 'lineAnim 1s linear infinite',
  //       },
  //       keyframes: {
  //         lineAnim: {
  //           '0%': { left: '-40%' },
  //           '50%': { left: '20%', width: '80%' },
  //           '100%': { left: '100%', width: '100%' },
  //         },
  //       },
  //     },
  //   },
  // };
  