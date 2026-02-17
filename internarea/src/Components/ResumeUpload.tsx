import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface ResumeUploadProps {
    onUploadSuccess: (url: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUploadSuccess }) => {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            // Validation
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(selectedFile.type)) {
                toast.error('Please upload only PDF or DOC/DOCX files');
                return;
            }

            if (selectedFile.size > 2 * 1024 * 1024) {
                toast.error('File size must be less than 2MB');
                return;
            }

            setFile(selectedFile);
            handleUpload(selectedFile);
        }
    };

    const handleUpload = async (selectedFile: File) => {
        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            setUploading(true);
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload/resume`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadedUrl(res.data.url);
            onUploadSuccess(res.data.url);
            toast.success('Resume uploaded successfully');
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload resume');
        } finally {
            setUploading(false);
        }
    };

    const removeFile = () => {
        setFile(null);
        setUploadedUrl(null);
        onUploadSuccess('');
    };

    return (
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Resume (PDF, DOC, DOCX - Max 2MB)
            </label>

            {!file ? (
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 2MB</p>
                    </div>
                </div>
            ) : (
                <div className="mt-1 flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                            <FileText size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                                {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {(file.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {uploading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                        ) : uploadedUrl ? (
                            <CheckCircle2 className="text-green-500" size={20} />
                        ) : null}
                        <button type="button" onClick={removeFile} className="p-1 hover:bg-blue-100 rounded-full text-gray-500 hover:text-red-500 transition-colors">
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeUpload;
