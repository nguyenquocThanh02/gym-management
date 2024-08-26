import { CloudDownload } from "lucide-react";
import React from "react";

interface FileInputCustomProps {
  onFileSelect: (file: File) => void;
}

const FileInputCustom: React.FC<FileInputCustomProps> = ({ onFileSelect }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event?.target?.files;
    if (files && files[0]) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div className="w-full mb-5">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center py-9 w-full rounded-2xl cursor-pointer"
      >
        <div className="mb-3 flex items-center justify-center">
          <CloudDownload color="#000" size={32} />
        </div>
        <h2 className="text-center text-gray-900 text-xs font-normal leading-4 mb-1">
          PNG, JPG or PDF, smaller than 15MB
        </h2>
        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
          Click here to select image
        </h4>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileInputCustom;
