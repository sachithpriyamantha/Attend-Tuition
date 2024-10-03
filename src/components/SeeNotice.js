import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Card, CardContent, Typography, CircularProgress, Box, styled } from '@mui/material';
import backgroundImage from '../assets/notices.gif'; // Replace with your image path

// Styled components
const NoticePanel = styled(Box)(({ theme }) => ({
    position: 'relative',
    marginTop: theme.spacing(6),
    marginRight: theme.spacing(2),
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    backgroundColor: '#fff',
    overflow: 'hidden',
    background: `linear-gradient(to bottom right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    color: '#fff',
    textAlign: 'center',
    paddingLeft: theme.spacing(10), // Adjust padding for left side if needed
}));

const HeaderImage = styled('img')(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1), // Align to the left
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    boxShadow: theme.shadows[4],
    animation: 'spin 10s linear infinite',
}));

const NoticeTitle = styled(Typography)(({ theme }) => ({
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: '#fff',
    animation: 'fadeIn 1s ease-in-out',
}));

const NoNoticesText = styled(Typography)(({ theme }) => ({
    fontSize: '1.2rem',
    color: '#f1f1f1',
    textAlign: 'center',
    margin: theme.spacing(2),
    animation: 'fadeIn 1s ease-in-out',
}));

const LoadingContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}));

const NoticeCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    background: '#fff',
    boxShadow: theme.shadows[4],
    transition: '0.6s',
    '&:hover': {
        boxShadow: theme.shadows[6],
        transform: 'scale(1.02)',
    },
}));

const NoticeCardContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
    '&:last-child': {
        paddingBottom: theme.spacing(2),
    },
}));

// Keyframe animations
const keyframes = `
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(30deg); /* Fixed rotation */
    }
}
`;

const globalStyle = document.createElement('style');
globalStyle.type = 'text/css';
globalStyle.innerHTML = keyframes;
document.head.appendChild(globalStyle);

const SeeNotice = () => {
    const dispatch = useDispatch();

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

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            title: notice.title,
            details: notice.details,
            date: dateString,
            id: notice._id,
        };
    });

    // Sort the noticeRows by date in descending order
    const sortedNotices = noticeRows.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <NoticePanel>
            <HeaderImage src={backgroundImage} alt="Notice Board" />
            {loading ? (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            ) : response ? (
                <NoNoticesText>No Notices to Show Right Now</NoNoticesText>
            ) : (
                <>
                    <NoticeTitle>Notices</NoticeTitle>
                    {Array.isArray(sortedNotices) && sortedNotices.length > 0 &&
                        <Box sx={{ width: '100%' }}>
                            {sortedNotices.map((notice) => (
                                <NoticeCard key={notice.id}>
                                    <NoticeCardContent>
                                        <Typography variant="h6">{notice.title}</Typography>
                                        <Typography variant="body2">{notice.details}</Typography>
                                        <Typography variant="caption" color="textSecondary">{notice.date}</Typography>
                                    </NoticeCardContent>
                                </NoticeCard>
                            ))}
                        </Box>
                    }
                </>
            )}
        </NoticePanel>
    );
}

export default SeeNotice;
