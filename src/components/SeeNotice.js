// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
// import { 
//     Box, 
//     Typography, 
//     CircularProgress, 
//     Chip,
//     IconButton,
//     Tooltip,
//     Grid,
//     Tab,
//     Card,
//     CardContent,
//     Divider,
//     Avatar,
//     Badge,
//     Fade,
//     Paper,
// } from '@mui/material';
// import { TabContext, TabList, TabPanel } from '@mui/lab';
// import { 
//     Download, 
//     Image, 
//     PictureAsPdf, 
//     InsertDriveFile, 
//     Description, 
//     NotificationsActive, 
//     AttachFile,
//     AccessTime,
//     Search,
//     FilterList
// } from '@mui/icons-material';
// import backgroundImage from '../assets/notices.gif';

// const SeeNotice = () => {
//     const dispatch = useDispatch();
//     const [tabValue, setTabValue] = useState('1');
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
    
//     const { currentUser, currentRole } = useSelector(state => state.user);
//     const { noticesList, loading, error, response } = useSelector((state) => state.notice);

//     useEffect(() => {
//         if (currentRole === "Admin") {
//             dispatch(getAllNotices(currentUser._id, "Notice"));
//         } else {
//             dispatch(getAllNotices(currentUser.school._id, "Notice"));
//         }
//     }, [dispatch, currentRole, currentUser]);

//     if (error) {
//         console.error(error);
//     }

//     const handleTabChange = (event, newValue) => {
//         setTabValue(newValue);
//     };

//     const processNotices = (notices) => {
//         return notices.map((notice) => {
//             const date = new Date(notice.date);
//             const dateString = date.toString() !== "Invalid Date" ? date.toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//                 hour: '2-digit',
//                 minute: '2-digit'
//             }) : "Invalid Date";
            
//             // Calculate how long ago the notice was posted
//             const timeAgo = getTimeAgo(date);
            
//             return {
//                 title: notice.title,
//                 details: notice.details,
//                 date: dateString,
//                 timeAgo,
//                 id: notice._id,
//                 files: notice.files || []
//             };
//         });
//     };

//     const getTimeAgo = (date) => {
//         if (date.toString() === "Invalid Date") return "";
        
//         const now = new Date();
//         const diffTime = Math.abs(now - date);
//         const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//         const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
//         const diffMinutes = Math.floor(diffTime / (1000 * 60));
        
//         if (diffDays > 0) {
//             return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
//         } else if (diffHours > 0) {
//             return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
//         } else if (diffMinutes > 0) {
//             return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
//         } else {
//             return "Just now";
//         }
//     };

//     // Sort notices by date in descending order
//     const sortedNotices = noticesList ? processNotices(noticesList).sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

//     // Separate notices with files (attachments) and without files
//     const noticesWithFiles = sortedNotices.filter(notice => notice.files.length > 0);
//     const noticesWithoutFiles = sortedNotices.filter(notice => notice.files.length === 0);

//     const handleDownload = (fileUrl, fileName) => {
//         const link = document.createElement('a');
//         link.href = fileUrl;
//         link.download = fileName || 'download';
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const getFileIcon = (mimeType) => {
//         if (mimeType.includes('image')) {
//             return <Image color="primary" />;
//         } else if (mimeType.includes('pdf')) {
//             return <PictureAsPdf color="error" />;
//         } else if (mimeType.includes('text') || mimeType.includes('document')) {
//             return <Description color="action" />;
//         } else {
//             return <InsertDriveFile color="action" />;
//         }
//     };

//     if (loading) {
//         return (
//             <Box sx={{ 
//                 display: 'flex', 
//                 justifyContent: 'center', 
//                 alignItems: 'center', 
//                 height: '100vh',
//                 flexDirection: 'column',
//                 gap: 2
//             }}>
//                 <CircularProgress color="primary" />
//                 <Typography variant="body1" color="text.secondary">
//                     Loading notices...
//                 </Typography>
//             </Box>
//         );
//     }

//     return (
//         <Paper 
//             elevation={3} 
//             sx={{
//                 borderRadius: 4,
//                 overflow: 'hidden',
//                 background: 'linear-gradient(145deg, #f0f2f5, #ffffff)',
//                 position: 'relative',
//                 pb: 2,
//                 height: 'calc(100vh - 64px)', // Adjust based on your header height
//                 display: 'flex',
//                 flexDirection: 'column'
//             }}
//         >
//             {/* Header Section */}
//             <Box
//                 sx={{
//                     position: 'relative',
//                     display: 'flex',
//                     alignItems: 'center',
//                     p: 3,
//                     mb: 1,
//                     background: 'linear-gradient(145deg,rgb(66, 86, 201), #2196f3)',
//                     color: 'white',
//                     borderRadius: '16px 16px 0 0',
//                     flexShrink: 0
//                 }}
//             >
//                 <Avatar
//                     src={backgroundImage}
//                     alt="Notice Board"
//                     sx={{
//                         width: 56,
//                         height: 56,
//                         mr: 2,
//                         boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
//                     }}
//                 />
//                 <Box>
//                     <Typography variant="h5" fontWeight="700" component="div">
//                         Notices & Announcements
//                     </Typography>
//                     <Typography variant="body2" sx={{ opacity: 0.9 }}>
//                         Stay updated with the latest information
//                     </Typography>
//                 </Box>
//                 <Box sx={{ flexGrow: 1 }} />
//                 <Badge 
//                     badgeContent={sortedNotices.length} 
//                     color="error" 
//                     overlap="circular"
//                     sx={{ mr: 1 }}
//                 >
//                     <NotificationsActive />
//                 </Badge>
//                 <Tooltip title="Search notices">
//                     <IconButton 
//                         color="inherit" 
//                         onClick={() => setIsSearchOpen(!isSearchOpen)}
//                         sx={{ ml: 1 }}
//                     >
//                         <Search />
//                     </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Filter notices">
//                     <IconButton color="inherit" sx={{ ml: 1 }}>
//                         <FilterList />
//                     </IconButton>
//                 </Tooltip>
//             </Box>

//             {/* Content Section */}
//             <TabContext value={tabValue}>
//                 <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, flexShrink: 0 }}>
//                     <TabList 
//                         onChange={handleTabChange} 
//                         aria-label="notice tabs"
//                         textColor="primary"
//                         indicatorColor="primary"
//                         centered
//                     >
//                         <Tab 
//                             icon={<NotificationsActive />} 
//                             iconPosition="start" 
//                             label={`Notices (${noticesWithoutFiles.length})`} 
//                             value="1" 
//                         />
//                         <Tab 
//                             icon={<AttachFile />} 
//                             iconPosition="start" 
//                             label={`Attachments (${noticesWithFiles.length})`} 
//                             value="2" 
//                         />
//                     </TabList>
//                 </Box>

//                 <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
//                     <TabPanel value="1" sx={{ px: 3, mt: 1 }}>
//                         {noticesWithoutFiles.length > 0 ? (
//                             <Grid container spacing={2}>
//                                 {noticesWithoutFiles.map((notice, index) => (
//                                     <Grid item xs={12} key={notice.id}>
//                                         <Fade in={true} timeout={500 + index * 100}>
//                                             <Card 
//                                                 sx={{ 
//                                                     borderRadius: 2,
//                                                     boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
//                                                     transition: 'transform 0.3s, box-shadow 0.3s',
//                                                     '&:hover': {
//                                                         transform: 'translateY(-4px)',
//                                                         boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
//                                                     },
//                                                     overflow: 'hidden',
//                                                     border: '1px solid rgba(0,0,0,0.08)',
//                                                 }}
//                                             >
//                                                 <CardContent>
//                                                     <Box 
//                                                         sx={{ 
//                                                             display: 'flex', 
//                                                             alignItems: 'flex-start', 
//                                                             justifyContent: 'space-between',
//                                                             mb: 1
//                                                         }}
//                                                     >
//                                                         <Typography 
//                                                             variant="h6" 
//                                                             component="div"
//                                                             fontWeight="600"
//                                                             color="primary.main"
//                                                         >
//                                                             {notice.title}
//                                                         </Typography>
//                                                         <Chip 
//                                                             icon={<AccessTime fontSize="small" />}
//                                                             label={notice.timeAgo}
//                                                             size="small"
//                                                             sx={{ 
//                                                                 fontSize: '0.7rem', 
//                                                                 height: 24,
//                                                                 bgcolor: 'primary.light',
//                                                                 color: 'white',
//                                                                 fontWeight: 500
//                                                             }}
//                                                         />
//                                                     </Box>
//                                                     <Divider sx={{ mt: 1, mb: 2 }} />
//                                                     <Typography 
//                                                         variant="body1" 
//                                                         color="text.secondary"
//                                                         sx={{ 
//                                                             mb: 2,
//                                                             lineHeight: 1.6
//                                                         }}
//                                                     >
//                                                         {notice.details}
//                                                     </Typography>
//                                                     <Box 
//                                                         sx={{ 
//                                                             display: 'flex', 
//                                                             alignItems: 'center',
//                                                             justifyContent: 'flex-end',
//                                                             mt: 1
//                                                         }}
//                                                     >
//                                                         <Typography 
//                                                             variant="caption" 
//                                                             color="text.secondary"
//                                                             sx={{ fontSize: '0.75rem' }}
//                                                         >
//                                                             {notice.date}
//                                                         </Typography>
//                                                     </Box>
//                                                 </CardContent>
//                                             </Card>
//                                         </Fade>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         ) : (
//                             <Box 
//                                 sx={{ 
//                                     display: 'flex', 
//                                     flexDirection: 'column', 
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     py: 8
//                                 }}
//                             >
//                                 <NotificationsActive 
//                                     sx={{ 
//                                         fontSize: 64, 
//                                         color: 'text.disabled',
//                                         mb: 2
//                                     }} 
//                                 />
//                                 <Typography variant="h6" color="text.secondary">
//                                     No notices available
//                                 </Typography>
//                                 <Typography variant="body2" color="text.disabled">
//                                     Check back later for updates
//                                 </Typography>
//                             </Box>
//                         )}
//                     </TabPanel>

//                     <TabPanel value="2" sx={{ px: 3, mt: 1 }}>
//                         {noticesWithFiles.length > 0 ? (
//                             <Grid container spacing={2}>
//                                 {noticesWithFiles.map((notice, index) => (
//                                     <Grid item xs={12} key={notice.id}>
//                                         <Fade in={true} timeout={500 + index * 100}>
//                                             <Card 
//                                                 sx={{ 
//                                                     borderRadius: 2,
//                                                     boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
//                                                     transition: 'transform 0.3s, box-shadow 0.3s',
//                                                     '&:hover': {
//                                                         transform: 'translateY(-4px)',
//                                                         boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
//                                                     },
//                                                     overflow: 'hidden',
//                                                     border: '1px solid rgba(0,0,0,0.08)',
//                                                 }}
//                                             >
//                                                 <CardContent>
//                                                     <Box 
//                                                         sx={{ 
//                                                             display: 'flex', 
//                                                             alignItems: 'flex-start', 
//                                                             justifyContent: 'space-between',
//                                                             mb: 1
//                                                         }}
//                                                     >
//                                                         <Typography 
//                                                             variant="h6" 
//                                                             component="div" 
//                                                             fontWeight="600"
//                                                             color="primary.main"
//                                                         >
//                                                             {notice.title}
//                                                         </Typography>
//                                                         <Chip 
//                                                             icon={<AccessTime fontSize="small" />}
//                                                             label={notice.timeAgo}
//                                                             size="small"
//                                                             sx={{ 
//                                                                 fontSize: '0.7rem', 
//                                                                 height: 24,
//                                                                 bgcolor: 'primary.light',
//                                                                 color: 'white',
//                                                                 fontWeight: 500
//                                                             }}
//                                                         />
//                                                     </Box>
                                                    
//                                                     <Typography 
//                                                         variant="body2" 
//                                                         color="text.secondary"
//                                                         sx={{ mb: 2 }}
//                                                     >
//                                                         {notice.details || 'No description provided'}
//                                                     </Typography>
//                                                     <Divider sx={{ my: 2 }} />
                                                    
//                                                     <Typography 
//                                                         variant="subtitle2" 
//                                                         fontWeight="600" 
//                                                         gutterBottom
//                                                         sx={{ 
//                                                             display: 'flex',
//                                                             alignItems: 'center',
//                                                             gap: 1
//                                                         }}
//                                                     >
//                                                         <AttachFile fontSize="small" />
//                                                         Attachments
//                                                     </Typography>
                                                    
//                                                     <Grid container spacing={1} sx={{ mb: 2 }}>
//                                                         {notice.files.map((file, fileIndex) => (
//                                                             <Grid item xs={12} sm={6} md={4} key={fileIndex}>
//                                                                 <Paper
//                                                                     elevation={0}
//                                                                     sx={{
//                                                                         p: 1,
//                                                                         display: 'flex',
//                                                                         alignItems: 'center',
//                                                                         bgcolor: 'rgba(0,0,0,0.02)',
//                                                                         borderRadius: 2,
//                                                                         border: '1px solid rgba(0,0,0,0.09)',
//                                                                         '&:hover': {
//                                                                             bgcolor: 'rgba(0,0,0,0.04)',
//                                                                         },
//                                                                     }}
//                                                                 >
//                                                                     <Avatar
//                                                                         variant="rounded"
//                                                                         sx={{
//                                                                             bgcolor: 'background.paper',
//                                                                             width: 32,
//                                                                             height: 32,
//                                                                             boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
//                                                                             mr: 1
//                                                                         }}
//                                                                     >
//                                                                         {getFileIcon(file.mimetype)}
//                                                                     </Avatar>
//                                                                     <Typography
//                                                                         variant="body2"
//                                                                         sx={{
//                                                                             ml: 1,
//                                                                             flexGrow: 1,
//                                                                             overflow: 'hidden',
//                                                                             textOverflow: 'ellipsis',
//                                                                             whiteSpace: 'nowrap'
//                                                                         }}
//                                                                     >
//                                                                         {file.originalname}
//                                                                     </Typography>
//                                                                     <Tooltip title="Download">
//                                                                         <IconButton
//                                                                             size="small"
//                                                                             color="primary"
//                                                                             onClick={() => handleDownload(file.url, file.originalname)}
//                                                                             sx={{ 
//                                                                                 bgcolor: 'primary.light',
//                                                                                 color: 'white',
//                                                                                 width: 28,
//                                                                                 height: 28,
//                                                                                 '&:hover': {
//                                                                                     bgcolor: 'primary.main',
//                                                                                 },
//                                                                             }}
//                                                                         >
//                                                                             <Download fontSize="small" />
//                                                                         </IconButton>
//                                                                     </Tooltip>
//                                                                 </Paper>
//                                                             </Grid>
//                                                         ))}
//                                                     </Grid>
                                                    
//                                                     <Box 
//                                                         sx={{ 
//                                                             display: 'flex', 
//                                                             justifyContent: 'flex-end' 
//                                                         }}
//                                                     >
//                                                         <Typography 
//                                                             variant="caption" 
//                                                             color="text.secondary"
//                                                         >
//                                                             {notice.date}
//                                                         </Typography>
//                                                     </Box>
//                                                 </CardContent>
//                                             </Card>
//                                         </Fade>
//                                     </Grid>
//                                 ))}
//                             </Grid>
//                         ) : (
//                             <Box 
//                                 sx={{ 
//                                     display: 'flex', 
//                                     flexDirection: 'column', 
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     py: 8
//                                 }}
//                             >
//                                 <AttachFile 
//                                     sx={{ 
//                                         fontSize: 64, 
//                                         color: 'text.disabled',
//                                         mb: 2
//                                     }} 
//                                 />
//                                 <Typography variant="h6" color="text.secondary">
//                                     No attachments available
//                                 </Typography>
//                                 <Typography variant="body2" color="text.disabled">
//                                     Check back later for updates
//                                 </Typography>
//                             </Box>
//                         )}
//                     </TabPanel>
//                 </Box>
//             </TabContext>
//         </Paper>
//     );
// };

// export default SeeNotice;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { 
    Box, 
    Typography, 
    CircularProgress, 
    Chip,
    IconButton,
    Tooltip,
    Grid,
    Tab,
    Card,
    CardContent,
    Divider,
    Avatar,
    Badge,
    Fade,
    Paper,
    TextField,
    InputAdornment,
    Collapse
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { 
    Download, 
    Image, 
    PictureAsPdf, 
    InsertDriveFile, 
    Description, 
    NotificationsActive, 
    AttachFile,
    AccessTime,
    Search,
    FilterList,
    Close
} from '@mui/icons-material';
import backgroundImage from '../assets/notices.gif';

const SeeNotice = () => {
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState('1');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        if (currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        } else {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch, currentRole, currentUser]);

    if (error) {
        console.error(error);
    }

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const processNotices = (notices) => {
        return notices.map((notice) => {
            const date = new Date(notice.date);
            const dateString = date.toString() !== "Invalid Date" ? date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }) : "Invalid Date";
            
            // Calculate how long ago the notice was posted
            const timeAgo = getTimeAgo(date);
            
            return {
                title: notice.title,
                details: notice.details,
                date: dateString,
                timeAgo,
                id: notice._id,
                files: notice.files || []
            };
        });
    };

    const getTimeAgo = (date) => {
        if (date.toString() === "Invalid Date") return "";
        
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        
        if (diffDays > 0) {
            return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
        } else if (diffHours > 0) {
            return diffHours === 1 ? "1 hour ago" : `${diffHours} hours ago`;
        } else if (diffMinutes > 0) {
            return diffMinutes === 1 ? "1 minute ago" : `${diffMinutes} minutes ago`;
        } else {
            return "Just now";
        }
    };

    // Sort notices by date in descending order
    const sortedNotices = noticesList ? processNotices(noticesList).sort((a, b) => new Date(b.date) - new Date(a.date)) : [];

    // Filter notices based on search query
    const filterNotices = (notices) => {
        if (!searchQuery) return notices;
        
        const query = searchQuery.toLowerCase();
        return notices.filter(notice => 
            notice.title.toLowerCase().includes(query) || 
            notice.details.toLowerCase().includes(query) ||
            notice.files.some(file => file.originalname.toLowerCase().includes(query))
        );
    };

    // Separate notices with files (attachments) and without files
    const noticesWithFiles = filterNotices(sortedNotices.filter(notice => notice.files.length > 0));
    const noticesWithoutFiles = filterNotices(sortedNotices.filter(notice => notice.files.length === 0));

    const handleDownload = (fileUrl, fileName) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getFileIcon = (mimeType) => {
        if (mimeType.includes('image')) {
            return <Image color="primary" />;
        } else if (mimeType.includes('pdf')) {
            return <PictureAsPdf color="error" />;
        } else if (mimeType.includes('text') || mimeType.includes('document')) {
            return <Description color="action" />;
        } else {
            return <InsertDriveFile color="action" />;
        }
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress color="primary" />
                <Typography variant="body1" color="text.secondary">
                    Loading notices...
                </Typography>
            </Box>
        );
    }

    return (
        <Paper 
            elevation={3} 
            sx={{
                borderRadius: 4,
                overflow: 'hidden',
                background: 'linear-gradient(145deg, #f0f2f5, #ffffff)',
                position: 'relative',
                pb: 2,
                height: 'calc(100vh - 64px)', // Adjust based on your header height
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* Header Section */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    p: 3,
                    mb: 1,
                    background: 'linear-gradient(145deg,rgb(85, 105, 216), #2196f3)',
                    color: 'white',
                    borderRadius: '16px 16px 0 0',
                    flexShrink: 0
                }}
            >
                <Avatar
                    src={backgroundImage}
                    alt="Notice Board"
                    sx={{
                        width: 56,
                        height: 56,
                        mr: 2,
                        boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
                    }}
                />
                <Box>
                    <Typography variant="h5" fontWeight="700" component="div">
                        Notices & Announcements
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        (Stay updated with the latest information)
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Badge 
                    badgeContent={sortedNotices.length} 
                    color="error" 
                    overlap="circular"
                    sx={{ mr: 1 }}
                >
                    <NotificationsActive />
                </Badge>
                <Tooltip title={isSearchOpen ? "Close search" : "Search notices"}>
                    <IconButton 
                        color="inherit" 
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                        sx={{ ml: 1 }}
                    >
                        {isSearchOpen ? <Close /> : <Search />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Filter notices">
                    <IconButton color="inherit" sx={{ ml: 1 }}>
                        <FilterList />
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Search Field */}
            <Collapse in={isSearchOpen}>
                <Box sx={{ px: 3, py: 1, bgcolor: 'background.default' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search notices by title, content or file name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: searchQuery && (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        onClick={() => setSearchQuery('')}
                                        size="small"
                                    >
                                        <Close fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: {
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: 'rgba(0, 0, 0, 0.12)',
                                },
                            }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                },
                            },
                        }}
                    />
                </Box>
            </Collapse>

            {/* Content Section */}
            <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, flexShrink: 0 }}>
                    <TabList 
                        onChange={handleTabChange} 
                        aria-label="notice tabs"
                        textColor="primary"
                        indicatorColor="primary"
                        centered
                    >
                        <Tab 
                            icon={<NotificationsActive />} 
                            iconPosition="start" 
                            label={`Notices (${noticesWithoutFiles.length})`} 
                            value="1" 
                        />
                        <Tab 
                            icon={<AttachFile />} 
                            iconPosition="start" 
                            label={`Attachments (${noticesWithFiles.length})`} 
                            value="2" 
                        />
                    </TabList>
                </Box>

                <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                    <TabPanel value="1" sx={{ px: 3, mt: 1 }}>
                        {noticesWithoutFiles.length > 0 ? (
                            <Grid container spacing={2}>
                                {noticesWithoutFiles.map((notice, index) => (
                                    <Grid item xs={12} key={notice.id}>
                                        <Fade in={true} timeout={500 + index * 100}>
                                            <Card 
                                                sx={{ 
                                                    borderRadius: 2,
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
                                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                                    },
                                                    overflow: 'hidden',
                                                    border: '1px solid rgba(0,0,0,0.08)',
                                                }}
                                            >
                                                <CardContent>
                                                    <Box 
                                                        sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'flex-start', 
                                                            justifyContent: 'space-between',
                                                            mb: 1
                                                        }}
                                                    >
                                                        <Typography 
                                                            variant="h6" 
                                                            component="div"
                                                            fontWeight="600"
                                                            color="primary.main"
                                                        >
                                                            {notice.title}
                                                        </Typography>
                                                        <Chip 
                                                            icon={<AccessTime fontSize="small" />}
                                                            label={notice.timeAgo}
                                                            size="small"
                                                            sx={{ 
                                                                fontSize: '0.7rem', 
                                                                height: 24,
                                                                bgcolor: 'primary.light',
                                                                color: 'white',
                                                                fontWeight: 500
                                                            }}
                                                        />
                                                    </Box>
                                                    <Divider sx={{ mt: 1, mb: 2 }} />
                                                    <Typography 
                                                        variant="body1" 
                                                        color="text.secondary"
                                                        sx={{ 
                                                            mb: 2,
                                                            lineHeight: 1.6
                                                        }}
                                                    >
                                                        {notice.details}
                                                    </Typography>
                                                    <Box 
                                                        sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'center',
                                                            justifyContent: 'flex-end',
                                                            mt: 1
                                                        }}
                                                    >
                                                        <Typography 
                                                            variant="caption" 
                                                            color="text.secondary"
                                                            sx={{ fontSize: '0.75rem' }}
                                                        >
                                                            {notice.date}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Fade>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    py: 8
                                }}
                            >
                                <NotificationsActive 
                                    sx={{ 
                                        fontSize: 64, 
                                        color: 'text.disabled',
                                        mb: 2
                                    }} 
                                />
                                <Typography variant="h6" color="text.secondary">
                                    {searchQuery ? "No matching notices found" : "No notices available"}
                                </Typography>
                                <Typography variant="body2" color="text.disabled">
                                    {searchQuery ? "Try a different search term" : "Check back later for updates"}
                                </Typography>
                            </Box>
                        )}
                    </TabPanel>

                    <TabPanel value="2" sx={{ px: 3, mt: 1 }}>
                        {noticesWithFiles.length > 0 ? (
                            <Grid container spacing={2}>
                                {noticesWithFiles.map((notice, index) => (
                                    <Grid item xs={12} key={notice.id}>
                                        <Fade in={true} timeout={500 + index * 100}>
                                            <Card 
                                                sx={{ 
                                                    borderRadius: 2,
                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.07)',
                                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                                    '&:hover': {
                                                        transform: 'translateY(-4px)',
                                                        boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
                                                    },
                                                    overflow: 'hidden',
                                                    border: '1px solid rgba(0,0,0,0.08)',
                                                }}
                                            >
                                                <CardContent>
                                                    <Box 
                                                        sx={{ 
                                                            display: 'flex', 
                                                            alignItems: 'flex-start', 
                                                            justifyContent: 'space-between',
                                                            mb: 1
                                                        }}
                                                    >
                                                        <Typography 
                                                            variant="h6" 
                                                            component="div" 
                                                            fontWeight="600"
                                                            color="primary.main"
                                                        >
                                                            {notice.title}
                                                        </Typography>
                                                        <Chip 
                                                            icon={<AccessTime fontSize="small" />}
                                                            label={notice.timeAgo}
                                                            size="small"
                                                            sx={{ 
                                                                fontSize: '0.7rem', 
                                                                height: 24,
                                                                bgcolor: 'primary.light',
                                                                color: 'white',
                                                                fontWeight: 500
                                                            }}
                                                        />
                                                    </Box>
                                                    
                                                    <Typography 
                                                        variant="body2" 
                                                        color="text.secondary"
                                                        sx={{ mb: 2 }}
                                                    >
                                                        {notice.details || 'No description provided'}
                                                    </Typography>
                                                    <Divider sx={{ my: 2 }} />
                                                    
                                                    <Typography 
                                                        variant="subtitle2" 
                                                        fontWeight="600" 
                                                        gutterBottom
                                                        sx={{ 
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: 1
                                                        }}
                                                    >
                                                        <AttachFile fontSize="small" />
                                                        Attachments
                                                    </Typography>
                                                    
                                                    <Grid container spacing={1} sx={{ mb: 2 }}>
                                                        {notice.files.map((file, fileIndex) => (
                                                            <Grid item xs={12} sm={6} md={4} key={fileIndex}>
                                                                <Paper
                                                                    elevation={0}
                                                                    sx={{
                                                                        p: 1,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        bgcolor: 'rgba(0,0,0,0.02)',
                                                                        borderRadius: 2,
                                                                        border: '1px solid rgba(0,0,0,0.09)',
                                                                        '&:hover': {
                                                                            bgcolor: 'rgba(0,0,0,0.04)',
                                                                        },
                                                                    }}
                                                                >
                                                                    <Avatar
                                                                        variant="rounded"
                                                                        sx={{
                                                                            bgcolor: 'background.paper',
                                                                            width: 32,
                                                                            height: 32,
                                                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                                                            mr: 1
                                                                        }}
                                                                    >
                                                                        {getFileIcon(file.mimetype)}
                                                                    </Avatar>
                                                                    <Typography
                                                                        variant="body2"
                                                                        sx={{
                                                                            ml: 1,
                                                                            flexGrow: 1,
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                            whiteSpace: 'nowrap'
                                                                        }}
                                                                    >
                                                                        {file.originalname}
                                                                    </Typography>
                                                                    <Tooltip title="Download">
                                                                        <IconButton
                                                                            size="small"
                                                                            color="primary"
                                                                            onClick={() => handleDownload(file.url, file.originalname)}
                                                                            sx={{ 
                                                                                bgcolor: 'primary.light',
                                                                                color: 'white',
                                                                                width: 28,
                                                                                height: 28,
                                                                                '&:hover': {
                                                                                    bgcolor: 'primary.main',
                                                                                },
                                                                            }}
                                                                        >
                                                                            <Download fontSize="small" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </Paper>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                    
                                                    <Box 
                                                        sx={{ 
                                                            display: 'flex', 
                                                            justifyContent: 'flex-end' 
                                                        }}
                                                    >
                                                        <Typography 
                                                            variant="caption" 
                                                            color="text.secondary"
                                                        >
                                                            {notice.date}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Fade>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    py: 8
                                }}
                            >
                                <AttachFile 
                                    sx={{ 
                                        fontSize: 64, 
                                        color: 'text.disabled',
                                        mb: 2
                                    }} 
                                />
                                <Typography variant="h6" color="text.secondary">
                                    {searchQuery ? "No matching attachments found" : "No attachments available"}
                                </Typography>
                                <Typography variant="body2" color="text.disabled">
                                    {searchQuery ? "Try a different search term" : "Check back later for updates"}
                                </Typography>
                            </Box>
                        )}
                    </TabPanel>
                </Box>
            </TabContext>
        </Paper>
    );
};

export default SeeNotice;