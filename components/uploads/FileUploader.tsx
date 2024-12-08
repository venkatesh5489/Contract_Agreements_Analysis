import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface FileUploaderProps {
  onFileSelect: (files: File[]) => void;
  acceptedFileTypes?: string[];
  maxFiles?: number;
  multiple?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  onFileSelect,
  acceptedFileTypes = ['.pdf', '.doc', '.docx', '.txt'],
  maxFiles = 5,
  multiple = false
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (onFileSelect) {
      onFileSelect(acceptedFiles);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxFiles: multiple ? maxFiles : 1,
    multiple
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors duration-200
        ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
      `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="text-4xl">📄</div>
        {isDragActive ? (
          <p className="text-center text-gray-600">Drop the files here...</p>
        ) : (
          <>
            <p className="text-center text-gray-600">
              Drag & drop {multiple ? 'files' : 'a file'} here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Supported formats: {acceptedFileTypes.join(', ')}
            </p>
            {multiple && (
              <p className="text-sm text-gray-500">
                Maximum {maxFiles} files
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}; 