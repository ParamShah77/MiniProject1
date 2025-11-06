import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const ResumeUpload = ({ onFileSelect, maxSize = 5242880 }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === 'file-too-large') {
          setError('File size must be less than 5MB');
        } else if (rejection.errors[0].code === 'file-invalid-type') {
          setError('Only PDF and DOCX files are accepted');
        } else {
          setError('File upload failed. Please try again.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];
        setFile(uploadedFile);
        if (onFileSelect) {
          onFileSelect(uploadedFile);
        }
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxFiles: 1,
    maxSize,
  });

  const removeFile = () => {
    setFile(null);
    setError(null);
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
            : error
            ? 'border-error bg-red-50 dark:bg-red-950'
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className={`w-16 h-16 mx-auto mb-4 ${error ? 'text-error' : 'text-primary-500'}`} />
        
        {isDragActive ? (
          <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
            Drop your resume here...
          </p>
        ) : (
          <>
            <p className="text-lg text-text-primary-light dark:text-text-primary-dark font-medium mb-2">
              Drag & drop your resume here
            </p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
              or click to browse files
            </p>
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
              Supported formats: PDF, DOCX • Max size: 5MB
            </p>
          </>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-error">Upload Error</p>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* File Preview */}
      {file && !error && (
        <div className="p-4 bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 rounded-lg">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-md">
                <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-text-primary-light dark:text-text-primary-dark truncate">
                  {file.name}
                </p>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <button
                onClick={removeFile}
                className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded-md transition-colors"
              >
                <X className="w-5 h-5 text-error" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
