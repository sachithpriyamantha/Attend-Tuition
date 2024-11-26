import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import {
    AppBar,
    Tabs,
    Tab,
    Container,
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    Fade,
    Zoom,
    Avatar,
} from '@mui/material';
import CustomBarChart from '../../components/CustomBarChart';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, 'Student'));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, 'ClassSubjects'));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderClassDetailsSection = () => (
        <Fade in timeout={800}>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
                    You are currently in Class <strong>{sclassDetails?.sclassName || 'N/A'}</strong>
                </Typography>
                <Box sx={{ marginTop: 4 }}>
                    <Grid container spacing={3}>
                        {subjectsList.length > 0 ? (
                            subjectsList.map((subject, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Zoom in timeout={800}>
                                        <Card
                                            sx={{
                                                backgroundColor: '#a8d4fc',
                                                borderRadius: '16px',
                                                boxShadow: 3,
                                                textAlign: 'center',
                                            }}
                                        >
                                            <CardContent>
                                                <Avatar sx={{ margin: '0 auto', bgcolor: '#007bb2' }}>
                                                    {subject.subName.charAt(0)}
                                                </Avatar>
                                                <Typography variant="h6" mt={2}>
                                                    {subject.subName}
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    {subject.subCode}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="h6" color="text.secondary">
                                No subjects available.
                            </Typography>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Fade>
    );

    const renderMarksSection = () => (
        <Fade in timeout={800}>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Subject Marks
                </Typography>
                <Grid container spacing={3}>
                    {subjectMarks.length > 0 ? (
                        subjectMarks.map((result, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Zoom in timeout={800}>
                                    <Card
                                        sx={{
                                            backgroundColor: '#a8d4fc',
                                            borderRadius: '16px',
                                            boxShadow: 3,
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" color="primary" gutterBottom>
                                                {result.subName?.subName || 'Unknown Subject'}
                                            </Typography>
                                            <Typography variant="h5">
                                                {result.marksObtained} / 100
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" color="text.secondary">
                            No marks available.
                        </Typography>
                    )}
                </Grid>
            </Box>
        </Fade>
    );

    const renderChartSection = () => (
        <Fade in timeout={800}>
            <Box sx={{ padding: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Marks Chart
                </Typography>
                <Box sx={{ marginTop: 4 }}>
                    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
                </Box>
            </Box>
        </Fade>
    );

    const renderContent = () => {
        switch (selectedTab) {
            case 0:
                return renderClassDetailsSection();
            case 1:
                return renderMarksSection();
            case 2:
                return renderChartSection();
            default:
                return null;
        }
    };

    return (
        <Container>
            <AppBar position="static" sx={{ backgroundColor: '#007bb2' }}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    textColor="inherit"
                    indicatorColor="secondary"
                    variant="fullWidth"
                >
                    <Tab label="Class Details" />
                    <Tab label="Subject Marks" />
                    <Tab label="Marks Chart" />
                </Tabs>
            </AppBar>

            <Box sx={{ padding: 3 }}>
                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '70vh',
                        }}
                    >
                        <CircularProgress sx={{ color: '#007bb2' }} />
                    </Box>
                ) : (
                    renderContent()
                )}
            </Box>
        </Container>
    );
};

export default StudentSubjects;
