import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { AppBar, Tabs, Tab, Container, Box, Typography, CircularProgress, Grid, Card, CardContent, Fade, Zoom } from '@mui/material';
import CustomBarChart from '../../components/CustomBarChart';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails]);

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const renderClassDetailsSection = () => (
        <Fade in timeout={1000}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Class Details
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                    You are currently in Class {sclassDetails && sclassDetails.sclassName}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Subjects Enrolled:
                    </Typography>
                    <Grid container spacing={3}>
                        {subjectsList.length > 0 ? (
                            subjectsList.map((subject, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Zoom in timeout={1000}>
                                        <Card sx={{ backgroundColor: '#e3f2fd', borderRadius: '12px', boxShadow: 3 }}>
                                            <CardContent>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    {subject.subName} ({subject.subCode})
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {/* Additional details can be added here */}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Grid>
                            ))
                        ) : (
                            <Typography>No subjects available.</Typography>
                        )}
                    </Grid>
                </Box>
            </Box>
        </Fade>
    );

    const renderMarksSection = () => (
        <Fade in timeout={1000}>
            <Grid container spacing={3}>
                {subjectMarks.length > 0 ? (
                    subjectMarks.map((result, index) => {
                        if (!result.subName || !result.marksObtained) {
                            return null;
                        }
                        return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Zoom in timeout={1000}>
                                    <Card sx={{ backgroundColor: '#e3f2fd', borderRadius: '12px', boxShadow: 3 }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                {result.subName.subName}
                                            </Typography>
                                            <Typography variant="body1">Marks: {result.marksObtained}</Typography>
                                        </CardContent>
                                    </Card>
                                </Zoom>
                            </Grid>
                        );
                    })
                ) : (
                    <Typography>No marks available.</Typography>
                )}
            </Grid>
        </Fade>
    );

    const renderChartSection = () => (
        <Fade in timeout={1000}>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Marks Chart
                </Typography>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </Box>
        </Fade>
    );

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

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
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleTabChange} textColor="inherit" indicatorColor="secondary">
                    <Tab label="Class Details" />
                    <Tab label="Subject Marks" />
                    <Tab label="Marks Chart" />
                </Tabs>
            </AppBar>

            <Box sx={{ padding: 2 }}>
                {loading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                        <CircularProgress />
                    </div>
                ) : (
                    renderContent()
                )}
            </Box>
        </Container>
    );
};

export default StudentSubjects;
