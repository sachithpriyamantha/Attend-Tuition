import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Paper, Box, IconButton, CircularProgress, Typography, Button, styled, keyframes
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// Keyframes for slide-up, bounce-in, and glowing effects
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

const bounceIn = keyframes`
    0% {
        transform: scale(0.8);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
`;

const glow = keyframes`
    0% {
        text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    }
    50% {
        text-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
    }
    100% {
        text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
    }
`;

// Styled components with animations and updated colors
const SlidingCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    backgroundColor: '#ffffff', // White background
    border: '1px solid #dddddd', // Light gray border
    transition: 'transform 0.4s ease, opacity 0.4s ease',
    animation: `${slideUp} 0.6s ease-out`,
    position: 'relative',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    },
}));

const GradientButton = styled(Button)(({ theme }) => ({
    background: 'linear-gradient(45deg, #ff4d4d, #ff1a1a)', // Red gradient
    color: '#fff',
    padding: theme.spacing(1, 4),
    borderRadius: '8px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
    '&:hover': {
        animation: `${bounceIn} 0.6s ease-in-out`,
        background: 'linear-gradient(45deg, #ff1a1a, #ff4d4d)', // Reversed gradient on hover
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    },
}));

const GlowingIconButton = styled(IconButton)(({ theme }) => ({
    transition: 'text-shadow 0.3s ease',
    '&:hover': {
        animation: `${glow} 1s infinite`,
    },
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
    margin: theme.spacing(2),
    color: theme.palette.primary.main,
}));

// Styled component for the "New" badge
const NewBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: 'red', // Red background
    color: '#fff',
    padding: theme.spacing(0.5, 1),
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    textAlign: 'center',
}));

const ShowNotices = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (currentUser?._id) {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        }
    }, [currentUser?._id, dispatch]);

    const handleDelete = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => dispatch(getAllNotices(currentUser._id, "Notice")));
    };

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList?.map((notice) => {
        const date = new Date(notice.date);
        const formattedDate = date.toISOString().split('T')[0];
        return {
            title: notice.title,
            details: notice.details,
            date: formattedDate,
            id: notice._id,
        };
    }) || [];

    // Sort notices by date in ascending order
    noticeRows.sort((a, b) => new Date(a.date) - new Date(b.date));

    const NoticeButtonHaver = ({ row }) => (
        <GlowingIconButton onClick={() => handleDelete(row.id, "Notice")}>
            <DeleteIcon />
        </GlowingIconButton>
    );

    const actions = [
        {
            icon: <NoteAddIcon />,
            name: 'Add New Notice',
            action: () => navigate("/Admin/addnotice"),
        },
        {
            icon: <DeleteIcon />,
            name: 'Delete All Notices',
            action: () => handleDelete(currentUser._id, "Notices"),
        },
    ];

    return (
        <Box sx={{ padding: 2 }}>
            {loading ? (
                <Box display="flex" alignItems="center" justifyContent="center" height="60vh">
                    <LoadingSpinner size={60} />
                </Box>
            ) : (
                <>
                    {response ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                            <GradientButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
                                Add Notice
                            </GradientButton>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {noticeRows.length > 0 ? (
                                noticeRows.map((row, index) => (
                                    <SlidingCard
                                        key={index}
                                        sx={{
                                            border: index === noticeRows.length - 1 ? '2px solid red' : '1px solid #dddddd',
                                        }}
                                    >
                                        {index === noticeRows.length - 1 && (
                                            <NewBadge>New</NewBadge>
                                        )}
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                fontWeight: index === noticeRows.length - 1 ? 'bold' : 'normal',
                                                color: index === noticeRows.length - 1 ? 'inherit' : 'black', // Keep title color unchanged for non-new items
                                            }}
                                        >
                                            {row.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {row.details}
                                        </Typography>
                                        <Typography variant="caption" color="textSecondary">
                                            {row.date}
                                        </Typography>
                                        <NoticeButtonHaver row={row} />
                                    </SlidingCard>
                                ))
                            ) : (
                                <Box p={2} textAlign="center">
                                    <Typography variant="body1">No notices available</Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                    <SpeedDialTemplate actions={actions} />
                </>
            )}
        </Box>
    );
};

export default ShowNotices;

















// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Paper, Box, IconButton, CircularProgress, Typography, Button, styled, keyframes } from '@mui/material';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';
// import TableTemplate from '../../../components/TableTemplate';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// // Keyframes for animations
// const flip = keyframes`
//     0% {
//         transform: rotateY(0);
//     }
//     50% {
//         transform: rotateY(180deg);
//     }
//     100% {
//         transform: rotateY(360deg);
//     }
// `;

// const zoomIn = keyframes`
//     from {
//         transform: scale(0.8);
//         opacity: 0;
//     }
//     to {
//         transform: scale(1);
//         opacity: 1;
//     }
// `;

// const rotate = keyframes`
//     from {
//         transform: rotate(0deg);
//     }
//     to {
//         transform: rotate(360deg);
//     }
// `;

// // Styled components
// const FlipCard = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(3),
//     borderRadius: theme.shape.borderRadius,
//     boxShadow: theme.shadows[3],
//     animation: `${flip} 2s infinite`,
//     perspective: '1000px',
//     '&:hover': {
//         transform: 'rotateY(180deg)',
//     },
// }));

// const ZoomButton = styled(Button)(({ theme }) => ({
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     margin: theme.spacing(1),
//     animation: `${zoomIn} 0.6s ease-out`,
//     '&:hover': {
//         backgroundColor: theme.palette.primary.dark,
//         transform: 'scale(1.05)',
//     },
// }));

// const RotatingIcon = styled(IconButton)(({ theme }) => ({
//     animation: `${rotate} 1.5s linear infinite`,
//     transition: 'color 0.3s',
//     '&:hover': {
//         color: theme.palette.secondary.main,
//     },
// }));

// const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
//     margin: theme.spacing(2),
//     color: theme.palette.primary.main,
// }));

// const ShowNotices = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { noticesList, loading, error, response } = useSelector((state) => state.notice);
//     const { currentUser } = useSelector(state => state.user);
//     const [isMounted, setIsMounted] = useState(false);

//     useEffect(() => {
//         if (currentUser?._id) {
//             dispatch(getAllNotices(currentUser._id, "Notice"));
//         }
//         setIsMounted(true);
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

//     const NoticeButtonHaver = ({ row }) => (
//         <RotatingIcon onClick={() => handleDelete(row.id, "Notice")} color="error">
//             <DeleteIcon />
//         </RotatingIcon>
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
//                             <ZoomButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
//                                 Add Notice
//                             </ZoomButton>
//                         </Box>
//                     ) : (
//                         <FlipCard>
//                             <Typography variant="h4" gutterBottom>
//                                 Notices
//                             </Typography>
//                             {noticeRows.length > 0 ? (
//                                 <TableTemplate
//                                     buttonHaver={NoticeButtonHaver}
//                                     columns={noticeColumns}
//                                     rows={noticeRows}
//                                 />
//                             ) : (
//                                 <Box p={2} textAlign="center">
//                                     <Typography variant="body1">No notices available</Typography>
//                                 </Box>
//                             )}
//                         </FlipCard>
//                     )}
//                     <SpeedDialTemplate actions={actions} />
//                 </>
//             )}
//         </Box>
//     );
// };

// export default ShowNotices;





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
// import TableTemplate from '../../../components/TableTemplate';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// // Keyframes for animations
// const fadeInZoom = keyframes`
//     0% {
//         opacity: 0;
//         transform: scale(0.9);
//     }
//     100% {
//         opacity: 1;
//         transform: scale(1);
//     }
// `;

// const glow = keyframes`
//     0% {
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//     }
//     100% {
//         box-shadow: 0 0 20px rgba(0, 255, 255, 0.6);
//     }
// `;

// // Styled components
// const AnimatedCard = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     margin: theme.spacing(2),
//     transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//     animation: `${fadeInZoom} 0.6s ease`,
//     '&:hover': {
//         transform: 'translateY(-5px)',
//         boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
//     },
// }));

// const GlowingButton = styled(Button)(({ theme }) => ({
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     margin: theme.spacing(1),
//     transition: 'box-shadow 0.3s ease',
//     '&:hover': {
//         animation: `${glow} 0.6s ease-in-out`,
//     },
// }));

// const DeleteIconButton = styled(IconButton)(({ theme }) => ({
//     transition: 'transform 0.3s ease',
//     '&:hover': {
//         transform: 'scale(1.1)',
//         color: theme.palette.error.main,
//     },
// }));

// const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
//     margin: theme.spacing(2),
//     color: theme.palette.primary.main,
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

//     const NoticeButtonHaver = ({ row }) => (
//         <DeleteIconButton onClick={() => handleDelete(row.id, "Notice")}>
//             <DeleteIcon />
//         </DeleteIconButton>
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
//                             <GlowingButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
//                                 Add Notice
//                             </GlowingButton>
//                         </Box>
//                     ) : (
//                         <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                             {noticeRows.length > 0 ? (
//                                 noticeRows.map((row, index) => (
//                                     <AnimatedCard key={index}>
//                                         <Typography variant="h6" gutterBottom>
//                                             {row.title}
//                                         </Typography>
//                                         <Typography variant="body2" color="textSecondary">
//                                             {row.details}
//                                         </Typography>
//                                         <Typography variant="caption" color="textSecondary">
//                                             {row.date}
//                                         </Typography>
//                                         <NoticeButtonHaver row={row} />
//                                     </AnimatedCard>
//                                 ))
//                             ) : (
//                                 <Box p={2} textAlign="center">
//                                     <Typography variant="body1">No notices available</Typography>
//                                 </Box>
//                             )}
//                         </Box>
//                     )}
//                     <SpeedDialTemplate actions={actions} />
//                 </>
//             )}
//         </Box>
//     );
// };

// export default ShowNotices;
















// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { Paper, Box, IconButton, CircularProgress, Typography, Card, CardContent, Divider, Button, styled } from '@mui/material';
// import NoteAddIcon from '@mui/icons-material/NoteAdd';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
// import { deleteUser } from '../../../redux/userRelated/userHandle';
// import TableTemplate from '../../../components/TableTemplate';
// import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// const GradientBox = styled(Box)(({ theme }) => ({
//     background: 'linear-gradient(135deg, #f2f2f2, #e6e6e6)',
//     borderRadius: theme.shape.borderRadius,
//     padding: theme.spacing(2),
// }));

// const FancyCard = styled(Card)(({ theme }) => ({
//     boxShadow: theme.shadows[10],
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//     '&:hover': {
//         transform: 'scale(1.02)',
//         boxShadow: theme.shadows[20],
//     },
// }));

// const ActionButton = styled(Button)(({ theme }) => ({
//     background: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     '&:hover': {
//         background: theme.palette.primary.dark,
//     },
// }));

// const ShowNotices = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { noticesList, loading, error, response } = useSelector((state) => state.notice);
//     const { currentUser } = useSelector(state => state.user);

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

//     const NoticeButtonHaver = ({ row }) => (
//         <IconButton onClick={() => handleDelete(row.id, "Notice")} color="error">
//             <DeleteIcon />
//         </IconButton>
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
//         <GradientBox>
//             {loading ? (
//                 <Box display="flex" alignItems="center" justifyContent="center" height="60vh">
//                     <CircularProgress size={60} />
//                 </Box>
//             ) : (
//                 <>
//                     {response ? (
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//                             <ActionButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
//                                 Add Notice
//                             </ActionButton>
//                         </Box>
//                     ) : (
//                         <FancyCard>
//                             <CardContent>
//                                 <Typography variant="h4" gutterBottom>
//                                     Notices
//                                 </Typography>
//                                 <Divider sx={{ mb: 2 }} />
//                                 {noticeRows.length > 0 ? (
//                                     <TableTemplate
//                                         buttonHaver={NoticeButtonHaver}
//                                         columns={noticeColumns}
//                                         rows={noticeRows}
//                                     />
//                                 ) : (
//                                     <Box p={2} textAlign="center">
//                                         <Typography variant="body1">No notices available</Typography>
//                                     </Box>
//                                 )}
//                             </CardContent>
//                         </FancyCard>
//                     )}
//                     <SpeedDialTemplate actions={actions} />
//                 </>
//             )}
//         </GradientBox>
//     );
// };

// export default ShowNotices;
