// import React, { useState } from 'react';
// import {
//   Box,
//   Button,
//   Container,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
//   CircularProgress
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// const FilesUploadPage = () => {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
  
//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setSelectedFiles(prevFiles => [...prevFiles, ...files]);
//   };
 
//   const handleRemoveFile = (fileToRemove) => {
//     setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
//   };
 
//   const handleUpload = async () => {
//     if (selectedFiles.length === 0) return;
//     setUploading(true);
//     try {
      
//       const formData = new FormData();
//       selectedFiles.forEach(file => {
//         formData.append('files', file);
//       });
      
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       setUploadedFiles(prev => [...prev, ...selectedFiles]);
//       setSelectedFiles([]);
//     } catch (error) {
//       console.error('Upload failed:', error);
      
//     } finally {
//       setUploading(false);
//     }
//   };
  
//   const isPDFFile = (file) => file.type === 'application/pdf';
//   return (
//     <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Upload Files
//       </Typography>
//       <Paper elevation={3} sx={{ p: 3 }}>
        
//         <Box sx={{ mb: 3 }}>
//           <Button
//             variant="contained"
//             component="label"
//             startIcon={<UploadFileIcon />}
//           >
//             Select Files
//             <input
//               type="file"
//               hidden
//               multiple
//               accept=".pdf,.doc,.docx,.txt"  
//               onChange={handleFileChange}
//             />
//           </Button>
//         </Box>
        
//         {selectedFiles.length > 0 && (
//           <Box sx={{ mb: 3 }}>
//             <Typography variant="h6">Selected Files:</Typography>
//             <List>
//               {selectedFiles.map((file, index) => (
//                 <ListItem key={index}>
                  
//                   <ListItemText
//                     primary={file.name}
//                     secondary={`${(file.size / 1024).toFixed(2)} KB`}
//                   />
//                   <ListItemSecondaryAction>
//                     <IconButton
//                       edge="end"
//                       onClick={() => handleRemoveFile(file)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </ListItemSecondaryAction>
//                 </ListItem>
//               ))}
//             </List>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleUpload}
//               disabled={uploading}
//               startIcon={uploading && <CircularProgress size={20} />}
//             >
//               {uploading ? 'Uploading...' : 'Upload Files'}
//             </Button>
//           </Box>
//         )}
       
//         {uploadedFiles.length > 0 && (
//           <Box>
//             <Typography variant="h6">Uploaded Files:</Typography>
//             <List>
//               {uploadedFiles.map((file, index) => (
//                 <ListItem key={index}>
                  
//                   <ListItemText
//                     primary={file.name}
//                     secondary={`${(file.size / 1024).toFixed(2)} KB`}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// };
// export default FilesUploadPage;




import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Button, 
    Box, 
    Typography, 
    CircularProgress,
    Paper,
    IconButton,
    styled,
    keyframes
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// Animation keyframes
const pulse = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

// Styled components
const UploadContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2, 0),
    border: '2px dashed #ccc',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 0, 0, 0.02)',
        animation: `${pulse} 2s infinite`,
    },
}));

const PreviewImage = styled('img')(({ theme }) => ({
    maxWidth: '100%',
    maxHeight: '200px',
    margin: theme.spacing(2, 0),
    borderRadius: '4px',
    boxShadow: theme.shadows[2],
    animation: `${fadeIn} 0.5s ease-in`,
}));

const FileInfo = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    backgroundColor: theme.palette.grey[100],
    borderRadius: '4px',
}));

const FileUpload = ({ noticeId }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        
        if (!selectedFile) return;

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 
                             'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                             'text/plain', 'image/jpeg', 'image/png'];
        
        if (!allowedTypes.includes(selectedFile.type)) {
            setError('Only PDF, DOC, DOCX, TXT, JPG, JPEG, and PNG files are allowed');
            return;
        }

        // Validate file size (5MB)
        if (selectedFile.size > 5 * 1024 * 1024) {
            setError('File size must be less than 5MB');
            return;
        }

        setError(null);
        setFile(selectedFile);
        setSuccess(false);

        // Create preview for images
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleUpload = async () => {
        if (!file || !currentUser?._id) return;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', `Notice Attachment - ${new Date().toLocaleDateString()}`);
        formData.append('details', 'File attachment for notice');
        formData.append('adminID', currentUser._id);

        try {
            const endpoint = noticeId 
                ? `/notices/${noticeId}` // Update existing notice
                : '/notices'; // Create new notice

            const response = await fetch(endpoint, {
                method: noticeId ? 'PUT' : 'POST',
                body: formData,
                // Headers are automatically set by the browser for FormData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            setSuccess(true);
            setFile(null);
            setPreview(null);
            // You might want to refresh notices list here
        } catch (err) {
            setError(err.message || 'Failed to upload file');
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setPreview(null);
        setError(null);
        setSuccess(false);
    };

    return (
        <UploadContainer elevation={3}>
            <Typography variant="h6" gutterBottom>
                Upload Notice Attachment
            </Typography>
            
            {success && (
                <Box color="success.main" display="flex" alignItems="center" justifyContent="center">
                    <CheckCircleIcon style={{ marginRight: '8px' }} />
                    <Typography>File uploaded successfully!</Typography>
                </Box>
            )}

            {error && (
                <Box color="error.main" display="flex" alignItems="center" justifyContent="center">
                    <ErrorIcon style={{ marginRight: '8px' }} />
                    <Typography>{error}</Typography>
                </Box>
            )}

            {!file ? (
                <>
                    <input
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                            sx={{ mt: 2 }}
                        >
                            Select File
                        </Button>
                    </label>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        (PDF, DOC, DOCX, TXT, JPG, JPEG, PNG - Max 5MB)
                    </Typography>
                </>
            ) : (
                <>
                    <FileInfo>
                        <Typography>{file.name}</Typography>
                        <IconButton onClick={handleRemoveFile} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </FileInfo>

                    {preview && <PreviewImage src={preview} alt="File preview" />}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={uploading}
                        startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                        sx={{ mt: 2 }}
                    >
                        {uploading ? 'Uploading...' : 'Upload File'}
                    </Button>
                </>
            )}
        </UploadContainer>
    );
};

export default FileUpload;