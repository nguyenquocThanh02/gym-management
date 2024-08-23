import React from "react";

const WaitingLayout = () => {
  return (
    <div className="fixed right-0 left-0 top-0 bottom-0 w-full h-full bg-BgDark/40 z-50 flex justify-center items-center">
      <div className="grid gap-3">
        <h2 className="text-4xl leading-loose font-manrope font-extrabold text-transparent bg-gradient-to-tr from-Secondary to-Primary bg-clip-text flex items-center">
          L{" "}
          <div className="items-center justify-center rounded-md w-6 h-6 flex bg-gradient-to-tr from-Secondary to-Primary animate-spin">
            <div className="h-4 w-4 rounded-md bg-Tertiary "></div>
          </div>
          ading...
        </h2>
      </div>
    </div>
  );
};

export default WaitingLayout;
