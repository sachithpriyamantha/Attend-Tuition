import { Delete as DeleteIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { BottomNavigation, BottomNavigationAction, Box, Button, Card, CardContent, Collapse, IconButton, Paper, Table, TableBody, TableHead, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomPieChart from '../../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';

const ViewStudent = () => {
    const [showTab, setShowTab] = useState(false);
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id;
    const address = "Student";

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        return {
            subject: subName,
            attendancePercentage: subjectAttendancePercentage,
            totalClasses: sessions,
            attendedClasses: present
        };
    });

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails]);

    useEffect(() => {
        if (userDetails) {
            setName(userDetails.name || '');
            setRollNum(userDetails.rollNum || '');
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const submitHandler = (event) => {
        event.preventDefault();
        const fields = password === "" ? { name, rollNum } : { name, rollNum, password };
        dispatch(updateUser(fields, studentID, address))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteHandler = () => {
        setMessage("Sorry the delete function has been disabled for now.");
        setShowPopup(true);

        dispatch(deleteUser(studentID, address))
            .then(() => {
                navigate(-1);
            });
    };

    const removeHandler = (id, deladdress) => {
        dispatch(removeStuff(id, deladdress))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    };

    const removeSubAttendance = (subId) => {
        dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
            .then(() => {
                dispatch(getUserDetails(studentID, address));
            });
    };

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };
    const StudentMarksSection = () => {
        return (
            <div>
                <h3>Marks:</h3>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
                    Add Marks
                </Button>
            </div>
        );
    };

    const StudentDetailsAndAttendanceSection = () => {
        return (
            <Box sx={styles.centeredContainer}>
                <Box sx={styles.studentSectionContainer}>
                    {/* Student ID Card */}
                    <Card sx={styles.licenseCardSmall}>
                        <CardContent sx={styles.cardContent}>
                            <Box sx={styles.cardColumn}>
                                <Typography variant="h6" component="div" sx={styles.cardTitle}>Student ID Card</Typography>
                                <Typography sx={styles.cardText}><strong>Name:</strong> {userDetails.name}</Typography>
                                <Typography sx={styles.cardText}><strong>Roll Number:</strong> {userDetails.rollNum}</Typography>
                                <Typography sx={styles.cardText}><strong>Class:</strong> {sclassName.sclassName}</Typography>
                                <Typography sx={styles.cardText}><strong>School:</strong> {studentSchool.schoolName}</Typography>
                            </Box>
                            {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
                                <Box sx={styles.chartContainer}>
                                    <CustomPieChart data={chartData} />
                                </Box>
                            )}
                        </CardContent>
                    </Card>

                    {/* Attendance Table */}
                    <Box sx={styles.attendanceTableContainer}>
                        <h3>Attendance:</h3>
                        <Table>
                            <TableHead>
                                <StyledTableRow>
                                    <StyledTableCell align="left">Subject</StyledTableCell>
                                    <StyledTableCell align="center">Present</StyledTableCell>
                                    <StyledTableCell align="center">Total Sessions</StyledTableCell>
                                    <StyledTableCell align="center">Attendance Percentage</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                    return (
                                        <React.Fragment key={index}>
                                            <StyledTableRow>
                                                <StyledTableCell align="left">{subName}</StyledTableCell>
                                                <StyledTableCell align="center">{present}</StyledTableCell>
                                                <StyledTableCell align="center">{sessions}</StyledTableCell>
                                                <StyledTableCell align="center">{subjectAttendancePercentage}%</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <Button variant="contained" onClick={() => handleOpen(subId)}>
                                                        {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                                                    </Button>
                                                    <IconButton onClick={() => removeSubAttendance(subId)}>
                                                        <DeleteIcon color="error" />
                                                    </IconButton>
                                                    <Button variant="contained" sx={styles.attendanceButton} onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>
                                                        Change
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell style={{ paddingLeft: 400 }} colSpan={4}>
                                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="h6" gutterBottom component="div">
                                                                Attendance Details
                                                            </Typography>
                                                            <Box sx={{ overflowX: 'auto', maxHeight: 200 }}>
                                                                <Table size="small" aria-label="purchases">
                                                                    <TableHead>
                                                                        <StyledTableRow>
                                                                            <StyledTableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }} align="center" >
                                                                                Date
                                                                            </StyledTableCell>
                                                                            <StyledTableCell sx={{ position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 1 }} align="center">
                                                                                Status
                                                                            </StyledTableCell>
                                                                        </StyledTableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {allData.map((data, index) => {
                                                                            const date = new Date(data.date);
                                                                            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                            return (
                                                                                <StyledTableRow key={index}>
                                                                                    <StyledTableCell align="center">{dateString}</StyledTableCell>
                                                                                    <StyledTableCell align="center">{data.status}</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            );
                                                                        })}
                                                                    </TableBody>
                                                                </Table>
                                                            </Box>
                                                        </Box>
                                                    </Collapse>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </React.Fragment>
                                    );
                                })}
                            </TableBody>
                        </Table>
                        <div>Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%</div>
                        <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>Delete All</Button>
                        <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
                            Add Attendance
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <div>
            <BottomNavigation sx={{ width: '100%', mb: 4 }} value={showTab ? 1 : 0} onChange={() => setShowTab(!showTab)}>
                <BottomNavigationAction label="Attendance" showLabel />
                <BottomNavigationAction label="Marks" showLabel />
            </BottomNavigation>

            <Paper elevation={3}>
                {showTab ? (
                    <div>
                        <StudentMarksSection />
                    </div>
                ) : (
                    <div>
                        <StudentDetailsAndAttendanceSection />

                    </div>
                )}
            </Paper>
        </div>
    );
};

export default ViewStudent;


const styles = {
    centeredContainer: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '20px',
    },
    studentSectionContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        alignItems: 'flex-start',
        width: '100%',
    },
    licenseCardSmall: {
        width: '250px',
        padding: '10px',
        borderRadius: '12px',
        border: '1px solid #ddd',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    cardColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    cardText: {
        fontSize: 14,
        marginBottom: '8px',
    },
    chartContainer: {
        width: '100%',
        height: '250px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-70px',
    },
    attendanceTableContainer: {
        flex: 1,
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    styledButton: {
        margin: '8px',
        fontSize: '12px',
    },
    attendanceButton: {
        backgroundColor: "#673ab7",
        margin: '8px',
    },
};
