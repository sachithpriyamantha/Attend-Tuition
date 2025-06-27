import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Box, IconButton, CircularProgress, Typography, Button, styled, keyframes,
    Chip, Grid, Card, CardContent, CardHeader,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Input,
    Tooltip, Fade, Grow
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import ArticleIcon from '@mui/icons-material/Article';
import { uploadNoticeWithFiles, getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// Animations
const slideUp = keyframes`
    0% { transform: translateY(30px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
`;

const fadeIn = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

// Styled Components
const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
}));

const NoticeCard = styled(Card)(({ theme }) => ({
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.07)',
    transition: 'all 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    animation: `${slideUp} 0.5s ease-out`,
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.12)',
    },
}));

const NoticeCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(3),
    flexGrow: 1,
}));

const FilesList = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(2),
    maxHeight: '200px',
    overflowY: 'auto',
}));

const FileChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    borderRadius: '12px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #eeeeee',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: '#e0e0e0',
        transform: 'scale(1.02)',
    },
    '& .MuiChip-label': {
        padding: theme.spacing(0.5, 1),
        fontSize: '0.85rem',
    },
    '& .MuiChip-icon': {
        marginLeft: theme.spacing(0.5),
    }
}));

const ImagePreviewDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflow: 'hidden',
    },
}));

const ImagePreview = styled('img')(({ theme }) => ({
    maxWidth: '100%',
    maxHeight: 'calc(90vh - 64px)',
    objectFit: 'contain',
}));

const fileTypeIcons = {
    pdf: <PictureAsPdfIcon sx={{ color: '#FF5252' }} />,
    doc: <ArticleIcon sx={{ color: '#4285F4' }} />,
    docx: <ArticleIcon sx={{ color: '#4285F4' }} />,
    xls: <InsertDriveFileIcon sx={{ color: '#0F9D58' }} />,
    xlsx: <InsertDriveFileIcon sx={{ color: '#0F9D58' }} />,
    jpg: <ImageIcon sx={{ color: '#FF9800' }} />,
    jpeg: <ImageIcon sx={{ color: '#FF9800' }} />,
    png: <ImageIcon sx={{ color: '#FF9800' }} />,
    default: <DescriptionIcon sx={{ color: '#757575' }} />
};

const getFileIcon = (filename) => {
    if (!filename) return fileTypeIcons.default;
    const extension = filename.split('.').pop().toLowerCase();
    return fileTypeIcons[extension] || fileTypeIcons.default;
};

const isImageFile = (filename) => {
    if (!filename) return false;
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
    const extension = filename.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
};

const ShowNotices = () => {
    const dispatch = useDispatch();
    const { noticesList, loading } = useSelector((state) => state.notice);
    const { currentUser } = useSelector((state) => state.user);

    const [openDialog, setOpenDialog] = useState(false);
    const [newNotice, setNewNotice] = useState({ title: '', details: '', files: [] });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviewOpen, setImagePreviewOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        }
    }, [currentUser?._id, dispatch]);

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', newNotice.title);
        formData.append('details', newNotice.details);
        formData.append('adminID', currentUser._id);

        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        dispatch(uploadNoticeWithFiles(formData)).then(() => {
            setOpenDialog(false);
            setNewNotice({ title: '', details: '', files: [] });
            setSelectedFiles([]);
            dispatch(getAllNotices(currentUser._id, "Notice"));
        });
    };

    const handleRemoveFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleDelete = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address)).then(() =>
            dispatch(getAllNotices(currentUser._id, "Notice"))
        );
    };

    const handleDownload = async (filename) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/noticeFile/${filename}`,
                { responseType: 'blob' }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const handleFileClick = (file) => {
        if (isImageFile(file.filename || file.name)) {
            if (file.url) {
                setCurrentImage(file.url);
            } else {
                // For local files (when adding new notice)
                const reader = new FileReader();
                reader.onload = (e) => {
                    setCurrentImage(e.target.result);
                    setImagePreviewOpen(true);
                };
                reader.readAsDataURL(file);
            }
            setImagePreviewOpen(true);
        } else {
            handleDownload(file.filename || file.name);
        }
    };

    const noticesWithFiles = noticesList.filter(notice => notice.files && notice.files.length > 0);

    return (
        <Box sx={{ padding: { xs: 1, md: 3 }, maxWidth: '1200px', margin: '0 auto' }}>
            <Typography 
                variant="h4" 
                gutterBottom
                sx={{ 
                    fontWeight: 'bold', 
                    mb: 4, 
                    color: '#333', 
                    borderBottom: '2px solid #f0f0f0',
                    paddingBottom: 2,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <DescriptionIcon sx={{ mr: 1.5, color: '#536DFE' }} />
                Notice Attachments 
            </Typography>

            {loading ? (
                <LoadingContainer>
                    <LoadingSpinner size={60} />
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                        Loading notices...
                    </Typography>
                </LoadingContainer>
            ) : (
                <>
                    {noticesWithFiles.length > 0 ? (
                        <Grid container spacing={3}>
                            {noticesWithFiles.map((notice, index) => (
                                <Grow
                                    in={true}
                                    style={{ transformOrigin: '0 0 0' }}
                                    timeout={(index + 1) * 300}
                                    key={notice._id || index}
                                >
                                    <Grid item xs={12} sm={6} md={4}>
                                        <NoticeCard>
                                            <CardHeader
                                                title={notice.title || "Notice"}
                                                subheader={new Date(notice.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                                sx={{
                                                    bgcolor: '#f7f9fc',
                                                    borderBottom: '1px solid #edf2f7'
                                                }}
                                            />
                                            
                                            <NoticeCardContent>
                                                {notice.details && (
                                                    <Typography 
                                                        variant="body2" 
                                                        color="text.secondary"
                                                        sx={{ mb: 2 }}
                                                    >
                                                        {notice.details}
                                                    </Typography>
                                                )}
                                                
                                                <Typography 
                                                    variant="subtitle2" 
                                                    sx={{ 
                                                        fontWeight: 600, 
                                                        mb: 1.5,
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <AttachFileIcon fontSize="small" sx={{ mr: 0.5 }} />
                                                    Attachments ({notice.files.length})
                                                </Typography>
                                                
                                                <FilesList>
                                                    {notice.files.map((file, fileIndex) => (
                                                        <Tooltip
                                                            key={fileIndex}
                                                            title={isImageFile(file.originalname) ? "Click to view" : "Click to download"}
                                                            arrow
                                                            placement="top"
                                                        >
                                                            <FileChip
                                                                icon={getFileIcon(file.originalname)}
                                                                label={file.originalname}
                                                                onClick={() => handleFileClick(file)}
                                                                deleteIcon={
                                                                    <CloudDownloadIcon 
                                                                        fontSize="small" 
                                                                        sx={{ color: '#536DFE' }} 
                                                                    />
                                                                }
                                                                onDelete={() => handleDownload(file.filename)}
                                                            />
                                                        </Tooltip>
                                                    ))}
                                                </FilesList>
                                            </NoticeCardContent>
                                        </NoticeCard>
                                    </Grid>
                                </Grow>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ 
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 6,
                            textAlign: 'center',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '16px',
                            border: '1px dashed #cfd8dc',
                            animation: `${fadeIn} 0.8s ease-out`,
                        }}>
                            <DescriptionIcon sx={{ fontSize: 60, color: '#cfd8dc', mb: 2 }} />
                            <Typography variant="h6" sx={{ color: '#546e7a', mb: 1 }}>
                                No Attachments Available
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ maxWidth: '500px' }}>
                                There are no notices with attachments yet. Click the plus button to add a new notice with attachments.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<NoteAddIcon />}
                                sx={{ mt: 3, borderRadius: '10px' }}
                                onClick={() => setOpenDialog(true)}
                            >
                                Add New Attachments
                            </Button>
                        </Box>
                    )}
                </>
            )}

            {/* Image Preview Dialog */}
            <ImagePreviewDialog
                open={imagePreviewOpen}
                onClose={() => setImagePreviewOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: '#f5f5f5',
                }}>
                    <Typography variant="h6">Image Preview</Typography>
                    <IconButton onClick={() => setImagePreviewOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ 
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: '#424242',
                    p: 0,
                }}>
                    <ImagePreview src={currentImage} alt="Preview" />
                </DialogContent>
                <DialogActions sx={{ bgcolor: '#f5f5f5' }}>
                    <Button 
                        startIcon={<CloudDownloadIcon />}
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = currentImage;
                            link.download = 'image-preview';
                            link.click();
                        }}
                    >
                        Download
                    </Button>
                </DialogActions>
            </ImagePreviewDialog>

            {/* Add New Notice Dialog */}
            <Dialog 
                open={openDialog} 
                onClose={() => setOpenDialog(false)} 
                maxWidth="md" 
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        borderRadius: '16px',
                    }
                }}
            >
                <DialogTitle sx={{ 
                    bgcolor: '#f7f9fc', 
                    borderBottom: '1px solid #edf2f7',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    <NoteAddIcon color="primary" />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Add New Notice
                    </Typography>
                    <IconButton 
                        edge="end" 
                        color="inherit" 
                        onClick={() => setOpenDialog(false)} 
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                
                <DialogContent sx={{ pt: 3 }}>
                    <Box sx={{ width: '100%' }}>
                        <TextField
                            autoFocus
                            margin="normal"
                            label="Notice Title"
                            fullWidth
                            variant="outlined"
                            value={newNotice.title}
                            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                            InputProps={{
                                sx: { borderRadius: '10px' }
                            }}
                        />
                        
                        <TextField
                            margin="normal"
                            label="Notice Details"
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            value={newNotice.details}
                            onChange={(e) => setNewNotice({ ...newNotice, details: e.target.value })}
                            InputProps={{
                                sx: { borderRadius: '10px' }
                            }}
                        />
                        
                        <Box mt={3} mb={2}>
                            <Input
                                type="file"
                                id="notice-files"
                                inputProps={{ multiple: true }}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="notice-files">
                                <Button 
                                    variant="outlined" 
                                    component="span" 
                                    startIcon={<AttachFileIcon />}
                                    sx={{
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        borderColor: '#536DFE',
                                        color: '#536DFE',
                                        '&:hover': {
                                            backgroundColor: 'rgba(83, 109, 254, 0.08)'
                                        }
                                    }}
                                >
                                    Select Files
                                </Button>
                            </label>
                            
                            <Typography 
                                variant="caption" 
                                display="block" 
                                color="textSecondary" 
                                mt={1}
                            >
                                Max 5 files (PDF, DOC, XLS, JPG, PNG) up to 10MB each
                            </Typography>
                        </Box>

                        {selectedFiles.length > 0 && (
                            <Box sx={{ 
                                marginTop: 2,
                                padding: 2,
                                backgroundColor: '#f8f9fa',
                                borderRadius: '12px',
                                border: '1px solid #e0e0e0',
                            }}>
                                <Typography 
                                    variant="subtitle2" 
                                    sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        mb: 1.5 
                                    }}
                                >
                                    <DescriptionIcon fontSize="small" sx={{ mr: 1 }} />
                                    Selected Files ({selectedFiles.length})
                                </Typography>
                                
                                <Box display="flex" flexWrap="wrap">
                                    {selectedFiles.map((file, index) => (
                                        <Tooltip
                                            key={index}
                                            title={isImageFile(file.name) ? "Click to view" : "Click to download"}
                                            arrow
                                            placement="top"
                                        >
                                            <FileChip
                                                icon={getFileIcon(file.name)}
                                                label={file.name}
                                                onClick={() => handleFileClick(file)}
                                                onDelete={() => handleRemoveFile(index)}
                                                deleteIcon={<CloseIcon fontSize="small" />}
                                            />
                                        </Tooltip>
                                    ))}
                                </Box>
                            </Box>
                        )}
                    </Box>
                </DialogContent>
                
                <DialogActions sx={{ padding: 3, pt: 2 }}>
                    <Button 
                        onClick={() => setOpenDialog(false)}
                        sx={{ 
                            borderRadius: '10px',
                            textTransform: 'none'
                        }}
                    >
                        Cancel
                    </Button>
                    
                    <Button
                        onClick={handleSubmit}
                        disabled={!newNotice.title || !newNotice.details || selectedFiles.length === 0}
                        variant="contained"
                        sx={{ 
                            borderRadius: '10px',
                            textTransform: 'none',
                            background: 'linear-gradient(45deg, #536DFE, #8C9EFF)',
                            boxShadow: '0 4px 12px rgba(83, 109, 254, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(45deg, #3D5AFE, #536DFE)',
                                boxShadow: '0 6px 16px rgba(83, 109, 254, 0.4)'
                            }
                        }}
                    >
                        Create Notice
                    </Button>
                </DialogActions>
            </Dialog>

            <SpeedDialTemplate
                actions={[
                    {
                        icon: <NoteAddIcon />,
                        name: 'Add New Notice',
                        action: () => setOpenDialog(true),
                    },
                    {
                        icon: <DeleteIcon />,
                        name: 'Delete All Notices',
                        action: () => handleDelete(currentUser._id, "Notices"),
                    },
                ]}
            />
        </Box>
    );
};

export default ShowNotices;