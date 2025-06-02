import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import Popup from '../../../components/Popup';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl,
    Paper, useMediaQuery, useTheme,
    Card, CardHeader, CardContent,
    Avatar, Divider, Alert
} from '@mui/material';
import { Assignment, School, Person } from '@mui/icons-material';

const StudentExamMarks = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [marksObtained, setMarksObtained] = useState("");

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (situation === "Student") {
            setStudentID(params.id);
            dispatch(getUserDetails(params.id, "Student"));
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
        setErrorMessage(""); // Clear error when subject changes
    };

    const handleMarksChange = (e) => {
        const value = e.target.value;
        setMarksObtained(value);
        
        // Real-time validation
        if (value !== "") {
            const numericMarks = Number(value);
            if (isNaN(numericMarks) || numericMarks <= 0 || numericMarks > 100) {
                setErrorMessage("Marks must be between 1 and 100");
            } else {
                setErrorMessage("");
            }
        } else {
            setErrorMessage("");
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const numericMarks = Number(marksObtained);

        if (isNaN(numericMarks) || numericMarks <= 0 || numericMarks > 100) {
            setShowPopup(true);
            setMessage("Please enter a number between 1 and 100.");
            return;
        }

        if (!chosenSubName) {
            setShowPopup(true);
            setMessage("Please select a subject.");
            return;
        }

        setLoader(true);
        const fields = { subName: chosenSubName, marksObtained };
        dispatch(updateStudentFields(studentID, fields, "UpdateExamResult"));
    };

    useEffect(() => {
        if (response || statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage(response || "Marks updated successfully");

            setTimeout(() => {
                navigate(-1);
            }, 1500);
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Error occurred while updating marks");
        }
    }, [response, statestatus, error, navigate]);

    return (
        <Box
            sx={{
                p: isMobile ? 2 : 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Card
                sx={{
                    width: isMobile ? '100%' : '70%',
                    maxWidth: 600,
                    borderRadius: 3,
                    boxShadow: theme.shadows[4],
                    mt: 4
                }}
            >
                <CardHeader
                    title={
                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                            {situation === "Student" ? "Add Exam Marks" : "Update Exam Marks"}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" color="text.secondary">
                            {situation === "Student" 
                                ? "Enter student's exam performance" 
                                : "Update the student's marks"}
                        </Typography>
                    }
                    avatar={
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                            <Assignment />
                        </Avatar>
                    }
                    sx={{ 
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.primary.contrastText,
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12
                    }}
                />

                <CardContent>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box>
                            <Stack spacing={2} sx={{ mb: 3 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
                                        <Person />
                                    </Avatar>
                                    <Typography variant="h6">
                                        Student: {userDetails?.name}
                                    </Typography>
                                </Box>

                                {currentUser?.teachSubject && (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                                            <School />
                                        </Avatar>
                                        <Typography variant="h6">
                                            Subject: {currentUser.teachSubject?.subName}
                                        </Typography>
                                    </Box>
                                )}
                            </Stack>

                            <Divider sx={{ my: 2 }} />

                            <form onSubmit={submitHandler}>
                                <Stack spacing={3}>
                                    {situation === "Student" && (
                                        <FormControl fullWidth size={isMobile ? "small" : "medium"}>
                                            <InputLabel id="subject-select-label">
                                                Select Subject
                                            </InputLabel>
                                            <Select
                                                labelId="subject-select-label"
                                                id="subject-select"
                                                value={subjectName}
                                                label="Select Subject"
                                                onChange={changeHandler}
                                                required
                                                sx={{ borderRadius: 2 }}
                                            >
                                                {subjectsList && subjectsList.length > 0 ? (
                                                    subjectsList.map((subject, index) => (
                                                        <MenuItem key={index} value={subject.subName}>
                                                            {subject.subName}
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <MenuItem disabled value="">
                                                        No subjects available
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    )}

                                    <FormControl fullWidth>
                                        <TextField
                                            type="number"
                                            label="Enter marks"
                                            value={marksObtained}
                                            required
                                            onChange={handleMarksChange}
                                            InputLabelProps={{ shrink: true }}
                                            inputProps={{ 
                                                min: 1, 
                                                max: 100,
                                                step: "0.01"
                                            }}
                                            size={isMobile ? "small" : "medium"}
                                            error={!!errorMessage}
                                            helperText={errorMessage}
                                            sx={{ borderRadius: 2 }}
                                            fullWidth
                                        />
                                    </FormControl>

                                    {errorMessage && (
                                        <Alert severity="error" sx={{ borderRadius: 2 }}>
                                            {errorMessage}
                                        </Alert>
                                    )}

                                    <Box sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'flex-end',
                                        gap: 2,
                                        mt: 2
                                    }}>
                                        <GreenButton
                                            variant="outlined"
                                            onClick={() => navigate(-1)}
                                            disabled={loader}
                                        >
                                            Cancel
                                        </GreenButton>
                                        <BlueButton
                                            variant="contained"
                                            type="submit"
                                            disabled={loader || !!errorMessage}
                                            sx={{ minWidth: 120 }}
                                        >
                                            {loader ? (
                                                <CircularProgress size={24} color="inherit" />
                                            ) : (
                                                "Submit"
                                            )}
                                        </BlueButton>
                                    </Box>
                                </Stack>
                            </form>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
            />
        </Box>
    );
};

export default StudentExamMarks;
