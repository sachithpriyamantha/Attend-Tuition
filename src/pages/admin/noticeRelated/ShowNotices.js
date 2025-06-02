// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//     Paper, Box, IconButton, CircularProgress, Typography, Button, styled, keyframes
// } from '@mui/material';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';
// import FileUpload  from './FileUpload'
// import TableTemplate from '../../../components/TableTemplate';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// // Keyframes for slide-up, bounce-in, and glowing effects
// const slideUp = keyframes`
//     0% {
//         transform: translateY(20px);
//         opacity: 0;
//     }
//     100% {
//         transform: translateY(0);
//         opacity: 1;
//     }
// `;

// const bounceIn = keyframes`
//     0% {
//         transform: scale(0.8);
//     }
//     50% {
//         transform: scale(1.2);
//     }
//     100% {
//         transform: scale(1);
//     }
// `;

// const glow = keyframes`
//     0% {
//         text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
//     }
//     50% {
//         text-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
//     }
//     100% {
//         text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
//     }
// `;

// // Styled components with animations and updated colors
// const SlidingCard = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(3),
//     margin: theme.spacing(2),
//     backgroundColor: '#ffffff', // White background
//     border: '1px solid #dddddd', // Light gray border
//     transition: 'transform 0.4s ease, opacity 0.4s ease',
//     animation: `${slideUp} 0.6s ease-out`,
//     position: 'relative',
//     '&:hover': {
//         transform: 'scale(1.02)',
//         boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
//     },
// }));

// const GradientButton = styled(Button)(({ theme }) => ({
//     background: 'linear-gradient(45deg, #ff4d4d, #ff1a1a)', // Red gradient
//     color: '#fff',
//     padding: theme.spacing(1, 4),
//     borderRadius: '8px',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
//     '&:hover': {
//         animation: `${bounceIn} 0.6s ease-in-out`,
//         background: 'linear-gradient(45deg, #ff1a1a, #ff4d4d)', // Reversed gradient on hover
//         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
//     },
// }));

// const GlowingIconButton = styled(IconButton)(({ theme }) => ({
//     transition: 'text-shadow 0.3s ease',
//     '&:hover': {
//         animation: `${glow} 1s infinite`,
//     },
// }));

// const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
//     margin: theme.spacing(2),
//     color: theme.palette.primary.main,
// }));

// // Styled component for the "New" badge
// const NewBadge = styled(Box)(({ theme }) => ({
//     position: 'absolute',
//     top: theme.spacing(2),
//     right: theme.spacing(2),
//     backgroundColor: 'red', // Red background
//     color: '#fff',
//     padding: theme.spacing(0.5, 1),
//     borderRadius: '4px',
//     fontWeight: 'bold',
//     fontSize: '0.8rem',
//     textAlign: 'center',
// }));

// const ShowNotices = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { noticesList, loading, error, response } = useSelector((state) => state.notice);
//     const { currentUser } = useSelector((state) => state.user);

//     useEffect(() => {
//         if (currentUser?._id) {
//             dispatch(getAllNotices(currentUser._id, "Notice"));
//         }
//     }, [currentUser?._id, dispatch]);

//     const handleDelete = (deleteID, address) => {
//         dispatch(deleteUser(deleteID, address))
//             .then(() => dispatch(getAllNotices(currentUser._id, "Notice")));
//     };

//     const noticeColumns = [
//         { id: 'title', label: 'Title', minWidth: 170 },
//         { id: 'details', label: 'Details', minWidth: 100 },
//         { id: 'date', label: 'Date', minWidth: 170 },
//     ];

//     const noticeRows = noticesList?.map((notice) => {
//         const date = new Date(notice.date);
//         const formattedDate = date.toISOString().split('T')[0];
//         return {
//             title: notice.title,
//             details: notice.details,
//             date: formattedDate,
//             id: notice._id,
//         };
//     }) || [];

//     // Sort notices by date in ascending order
//     noticeRows.sort((a, b) => new Date(a.date) - new Date(b.date));

//     const NoticeButtonHaver = ({ row }) => (
//         <GlowingIconButton onClick={() => handleDelete(row.id, "Notice")}>
//             <DeleteIcon />
//         </GlowingIconButton>
//     );

//     const actions = [
//         {
//             icon: <NoteAddIcon />,
//             name: 'Add New Notice',
//             action: () => navigate("/Admin/addnotice"),
//         },
//         {
//             icon: <DeleteIcon />,
//             name: 'Delete All Notices',
//             action: () => handleDelete(currentUser._id, "Notices"),
//         },
//     ];

//     return (
        
//         <Box sx={{ padding: 2 }}>
//             {loading ? (
//                 <Box display="flex" alignItems="center" justifyContent="center" height="60vh">
//                     <LoadingSpinner size={60} />
//                 </Box>
//             ) : (
//                 <>
//                     {response ? (
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//                             <GradientButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
//                                 Add Notice
//                             </GradientButton>
//                         </Box>
//                     ) : (
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                             {noticeRows.length > 0 ? (
//                                 noticeRows.map((row, index) => (
//                                     <SlidingCard
//                                         key={index}
//                                         sx={{
//                                             border: index === noticeRows.length - 1 ? '2px solid red' : '1px solid #dddddd',
//                                         }}
//                                     >
//                                         {index === noticeRows.length - 1 && (
//                                             <NewBadge>New</NewBadge>
//                                         )}
//                                         <Typography
//                                             variant="h6"
//                                             gutterBottom
//                                             sx={{
//                                                 fontWeight: index === noticeRows.length - 1 ? 'bold' : 'normal',
//                                                 color: index === noticeRows.length - 1 ? 'inherit' : 'black', // Keep title color unchanged for non-new items
//                                             }}
//                                         >
//                                             {row.title}
//                                         </Typography>
//                                         <Typography variant="body2" color="textSecondary">
//                                             {row.details}
//                                         </Typography>
//                                         <Typography variant="caption" color="textSecondary">
//                                             {row.date}
//                                         </Typography>
//                                         <NoticeButtonHaver row={row} />
//                                     </SlidingCard>
//                                 ))
//                             ) : (
//                                 <Box p={2} textAlign="center">
//                                     <Typography variant="body1">No notices available</Typography>
//                                 </Box>
//                             )}
//                             <FileUpload />
//                         </Box>
                        
//                     )}
//                     <SpeedDialTemplate actions={actions} />
//                 </>
//             )}
//         </Box>
//     );
// };

// export default ShowNotices;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Paper, Box, IconButton, CircularProgress, Typography, Button, styled, keyframes,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip, Tooltip, Snackbar, Alert, Grid, Card, CardContent, CardActions, Badge
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SortIcon from '@mui/icons-material/Sort';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EmptyStateIcon from '@mui/icons-material/InboxOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { uploadNoticeWithFiles } from '../../../redux/noticeRelated/noticeHandle';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// Keyframes
const slideUp = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Styled Components
const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '70vh',
  '& .MuiTypography-root': {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  boxShadow: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  }
}));

const AddNoticeButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg,rgb(85, 106, 224), #2196f3)',
  color: '#fff',
  borderRadius: '10px',
  padding: theme.spacing(1, 3),
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #2196f3, #3f51b5)',
    boxShadow: '0 6px 14px rgba(33, 150, 243, 0.4)',
    transform: 'translateY(-2px)',
  }
}));

const NoticeCard = styled(Card)(({ theme, isNew }) => ({
  position: 'relative',
  overflow: 'visible',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  border: isNew ? `2px solid ${theme.palette.primary.main}` : 'none',
  boxShadow: isNew 
    ? '0 8px 24px rgba(33, 150, 243, 0.2)'
    : '0 2px 12px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
  },
  animation: isNew ? `${pulse} 2s infinite ease-in-out` : 'none',
}));

const NoticeHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(1),
}));

const NoticeTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.1rem',
  lineHeight: 1.4,
  color: theme.palette.text.primary,
}));

const NoticeBadge = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5, 1.5),
  borderRadius: '16px',
  fontSize: '0.75rem',
  fontWeight: 700,
  color: theme.palette.primary.contrastText,
  background: theme.palette.primary.main,
  display: 'inline-flex',
  alignItems: 'center',
  position: 'absolute',
  top: -10,
  right: 16,
  zIndex: 1,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(8),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
  textAlign: 'center',
  marginTop: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    fontSize: '4rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    opacity: 0.6,
  }
}));

const FileInput = styled('input')({
  display: 'none',
});

const FileInputLabel = styled('label')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.paper,
  border: `1px dashed ${theme.palette.primary.main}`,
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  }
}));

const FileChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: '8px',
  '& .MuiChip-deleteIcon': {
    color: theme.palette.error.main,
    '&:hover': {
      color: theme.palette.error.dark,
    }
  }
}));

const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { noticesList, loading, error, response } = useSelector((state) => state.notice);
  const { currentUser } = useSelector((state) => state.user);

  const [openDialog, setOpenDialog] = useState(false);
  const [newNotice, setNewNotice] = useState({
    title: '',
    details: '',
    files: []
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [sortOrder, setSortOrder] = useState('newest'); // newest or oldest

  useEffect(() => {
    if (currentUser?._id) {
      dispatch(getAllNotices(currentUser._id, "Notice"));
    }
  }, [currentUser?._id, dispatch]);

  const handleDelete = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
        setSnackbar({
          open: true,
          message: 'Notice deleted successfully',
          severity: 'success'
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Failed to delete notice',
          severity: 'error'
        });
      });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', newNotice.title);
    formData.append('details', newNotice.details);
    formData.append('adminID', currentUser._id);
    
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    dispatch(uploadNoticeWithFiles(formData))
      .then(() => {
        setOpenDialog(false);
        setNewNotice({ title: '', details: '', files: [] });
        setSelectedFiles([]);
        dispatch(getAllNotices(currentUser._id, "Notice"));
        setSnackbar({
          open: true,
          message: 'Notice created successfully',
          severity: 'success'
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: 'Failed to create notice',
          severity: 'error'
        });
      });
  };

  const handleDownload = (filename) => {
    window.open(`/uploads/notices/${filename}`, '_blank');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  // Filter notices - only show notices without attachments
  const getFilteredNotices = () => {
    if (!noticesList) return [];
    
    let filtered = [...noticesList];
    
    // Filter to only show notices without attachments
    filtered = filtered.filter(notice => !notice.files || notice.files.length === 0);
    
    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    return filtered;
  };

  const filteredNotices = getFilteredNotices();

  return (
    <Box sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
      {loading ? (
        <LoadingContainer>
          <CircularProgress size={60} />
          <Typography variant="body1">Loading notices...</Typography>
        </LoadingContainer>
      ) : (
        <>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' }, 
            mb: 3,
            gap: 2
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" component="h1" fontWeight="700" gutterBottom>
                Notice Board
              </Typography>
              
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              flexWrap: 'wrap',
              justifyContent: { xs: 'flex-start', sm: 'flex-end' }
            }}>
              <Tooltip title={`Sort by ${sortOrder === 'newest' ? 'oldest' : 'newest'} first`}>
                <ActionButton 
                  variant="outlined" 
                  startIcon={<SortIcon />}
                  onClick={handleSortToggle}
                >
                  {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
                </ActionButton>
              </Tooltip>
              
              <AddNoticeButton
                variant="contained"
                startIcon={<NoteAddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Add Notice
              </AddNoticeButton>
            </Box>
          </Box>
          
          

          {filteredNotices.length > 0 ? (
            <Grid container spacing={3}>
              {filteredNotices.map((notice, index) => (
                <Grid item xs={12} sm={6} md={4} key={notice._id}>
                  <NoticeCard isNew={index === 0}>
                    {index === 0 && (
                      <NoticeHeader>
                        <NoticeBadge>
                          <NotificationsActiveIcon sx={{ fontSize: '0.875rem', mr: 0.5 }} />
                          New
                        </NoticeBadge>
                      </NoticeHeader>
                    )}
                    
                    <CardContent sx={{ pt: index === 0 ? 2 : 3, pb: 1, flex: 1 }}>
                      <NoticeTitle gutterBottom>{notice.title}</NoticeTitle>
                      
                      <Typography variant="body2" color="text.secondary" paragraph sx={{ 
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {notice.details}
                      </Typography>
                      
                      <Box display="flex" alignItems="center" mt={1}>
                        <DateRangeIcon sx={{ fontSize: '0.875rem', color: 'text.secondary', mr: 0.5 }} />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notice.date).toLocaleDateString(undefined, { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </Typography>
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                      <Tooltip title="Delete Notice">
                        <IconButton 
                          size="small" 
                          onClick={() => handleDelete(notice._id, "Notice")}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="View Full Notice">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => {
                            // Future implementation: View full notice details
                          }}
                        >
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </NoticeCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyStateContainer>
              <EmptyStateIcon />
              <Typography variant="h6" gutterBottom>No notices without attachments found</Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                There are currently no notices without attachments available.
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<NoteAddIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Create your first notice
              </Button>
            </EmptyStateContainer>
          )}
          
          <Dialog 
            open={openDialog} 
            onClose={() => setOpenDialog(false)} 
            maxWidth="md" 
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: '12px',
                overflow: 'hidden'
              }
            }}
          >
            <DialogTitle sx={{ 
              borderBottom: '1px solid',
              borderColor: 'divider',
              px: 3,
              py: 2
            }}>
              <Typography variant="h6" fontWeight={600}>Create New Notice</Typography>
            </DialogTitle>
            
            <DialogContent sx={{ p: 3 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Add Class Name"
                fullWidth
                variant="outlined"
                value={newNotice.title}
                onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                sx={{ mb: 3 }}
                InputProps={{
                  sx: { borderRadius: '8px' }
                }}
              />
              
              <TextField
                margin="dense"
                label="Notice Details"
                fullWidth
                variant="outlined"
                multiline
                rows={5}
                value={newNotice.details}
                onChange={(e) => setNewNotice({...newNotice, details: e.target.value})}
                sx={{ mb: 3 }}
                InputProps={{
                  sx: { borderRadius: '8px' }
                }}
              />
              
              
              
              <FileInput
                id="notice-file-input"
                type="file"
                multiple
                onChange={handleFileChange}
              />
              
              {selectedFiles.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Selected Files:</Typography>
                  <Box display="flex" flexWrap="wrap">
                    {selectedFiles.map((file, index) => (
                      <FileChip
                        key={index}
                        label={file.name}
                        onDelete={() => handleRemoveFile(index)}
                        deleteIcon={<CloseIcon />}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </DialogContent>
            
            <DialogActions sx={{ 
              p: 2,
              borderTop: '1px solid',
              borderColor: 'divider'
            }}>
              <Button 
                onClick={() => setOpenDialog(false)}
                variant="outlined"
                sx={{ 
                  borderRadius: '8px',
                  textTransform: 'none'
                }}
              >
                Cancel
              </Button>
              
              <Button 
                onClick={handleSubmit}
                disabled={!newNotice.title || !newNotice.details}
                variant="contained"
                color="primary"
                sx={{ 
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600
                }}
                startIcon={<NoteAddIcon />}
              >
                Create Notice
              </Button>
            </DialogActions>
          </Dialog>
          
          <SpeedDialTemplate actions={[
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
          ]} />
          
          <Snackbar 
            open={snackbar.open} 
            autoHideDuration={4000} 
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert 
              onClose={handleCloseSnackbar} 
              severity={snackbar.severity} 
              variant="filled"
              sx={{ width: '100%', borderRadius: '8px' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </Box>
  );
};

export default ShowNotices;