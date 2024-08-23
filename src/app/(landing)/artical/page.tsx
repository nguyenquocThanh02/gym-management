import React from "react";

const ArticalPage = () => {
  return (
    <div className="l-container bg-BgLight/30 rounded-ss-full ">
      <h1 className="text-center font-bold text-2xl md:text-4xl my-5">
        Artical
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="md:basis-1/2 lg:basis-1/3">
            {/* <CardArtical
              src="/path/to/image.jpg"
              name="Lyly"
              experience="8"
              describe="Expert in designing tailored programs for muscle building, fat loss, and enhancing overall fitness performance."
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticalPage;
