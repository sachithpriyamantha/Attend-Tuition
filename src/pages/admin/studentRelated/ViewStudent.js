import { 
  Delete as DeleteIcon, 
  KeyboardArrowDown, 
  KeyboardArrowUp, 
  Search as SearchIcon,
  Menu as MenuIcon 
} from '@mui/icons-material';
import { 
  BottomNavigation, 
  BottomNavigationAction, 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Collapse, 
  IconButton, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography,
  TextField,
  InputAdornment,
  CircularProgress,
  Tooltip,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Stack
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
import CustomPieChart from '../../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';

const ViewStudent = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    
    const [showTab, setShowTab] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchExpanded, setSearchExpanded] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [openStates, setOpenStates] = useState({});
    
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

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage, color: '#4CAF50' },
        { name: 'Absent', value: overallAbsentPercentage, color: '#F44336' }
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
            <Box sx={{ p: isMobile ? 1 : 2 }}>
                <TableContainer component={Paper} sx={{ mb: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                                <TableCell align="left" sx={{ color: 'white', fontWeight: 'bold' }}>Subject</TableCell>
                                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Marks</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjectMarks.map((result, index) => {
                                if (!result.subName || !result.marksObtained) {
                                    return null;
                                }
                                return (
                                    <TableRow key={index}>
                                        <TableCell align="left">{result.subName.subName}</TableCell>
                                        <TableCell align="center">{result.marksObtained}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button 
                    variant="contained" 
                    fullWidth={isMobile}
                    onClick={() => navigate("/Admin/students/student/marks/" + studentID)}
                    sx={{ 
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    Add Marks
                </Button>
            </Box>
        );
    };

    const AttendanceDetailRow = ({ data }) => {
        const date = new Date(data.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        const statusColor = data.status === 'Present' ? '#4CAF50' : 
                         data.status === 'Late' ? '#FFC107' : '#F44336';
        
        return (
            <TableRow>
                <TableCell align="center">{dateString}</TableCell>
                <TableCell align="center" sx={{ color: statusColor }}>
                    {data.status}
                </TableCell>
            </TableRow>
        );
    };

    const SubjectAttendanceCard = ({ subName, present, sessions, subId, allData }) => {
        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
        const attendanceColor = subjectAttendancePercentage >= 75 ? '#4CAF50' : 
                              subjectAttendancePercentage >= 50 ? '#FFC107' : '#F44336';
        
        return (
            <Card sx={{ mb: 2, borderRadius: 2 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ 
                                color: 'white',
                                backgroundColor: theme.palette.primary.main,
                                p: 1,
                                borderRadius: 1,
                                mb: 1
                            }}>
                                {subName}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip 
                                    label={`${present}/${sessions} sessions`}
                                    color="primary"
                                    size="small"
                                    variant="outlined"
                                />
                                <Chip 
                                    label={`${subjectAttendancePercentage}%`}
                                    sx={{ 
                                        backgroundColor: attendanceColor,
                                        color: 'white'
                                    }}
                                    size="small"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button 
                                    variant="outlined"
                                    size="small"
                                    onClick={() => handleOpen(subId)}
                                    startIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                >
                                    Details
                                </Button>
                                <Button 
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    onClick={() => removeSubAttendance(subId)}
                                    startIcon={<DeleteIcon />}
                                >
                                    Remove
                                </Button>
                                <Button 
                                    variant="contained"
                                    size="small"
                                    onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}
                                    sx={{ 
                                        backgroundColor: theme.palette.secondary.main,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: theme.palette.secondary.dark,
                                        },
                                    }}
                                >
                                    Change
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                    
                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Attendance Details
                            </Typography>
                            <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
                                <Table size="small" stickyHeader>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allData.map((data, index) => (
                                            <AttendanceDetailRow key={index} data={data} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Collapse>
                </CardContent>
            </Card>
        );
    };

    const StudentDetailsAndAttendanceSection = () => {
        return (
            <Box sx={{ p: isMobile ? 1 : 2 }}>
                {/* Student ID Card */}
                <Card sx={{ 
                    mb: 3, 
                    borderRadius: 2,
                    boxShadow: theme.shadows[3]
                }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h6" component="div" sx={{ 
                                    mb: 2,
                                    color: theme.palette.primary.main,
                                    fontWeight: 'bold'
                                }}>
                                    Student ID Card
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Typography>
                                        <strong>Name:</strong> {userDetails?.name || 'N/A'}
                                    </Typography>
                                    <Typography>
                                        <strong>Roll Number:</strong> {userDetails?.rollNum || 'N/A'}
                                    </Typography>
                                    <Typography>
                                        <strong>Class:</strong> {sclassName?.sclassName || 'N/A'}
                                    </Typography>
                                    <Typography>
                                        <strong>School:</strong> {studentSchool?.schoolName || 'N/A'}
                                    </Typography>
                                </Box>
                            </Grid>
                            {subjectAttendance && subjectAttendance.length > 0 && (
                                <Grid item xs={12} sm={6}>
                                    <Box sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        alignItems: 'center',
                                        height: '100%',
                                        justifyContent: 'center'
                                    }}>
                                        <CustomPieChart data={chartData} />
                                        <Box sx={{ 
                                            display: 'flex', 
                                            gap: 2, 
                                            mt: 1,
                                            flexWrap: 'wrap',
                                            justifyContent: 'center'
                                        }}>
                                            {chartData.map((item, index) => (
                                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Box sx={{ 
                                                        width: 12, 
                                                        height: 12, 
                                                        backgroundColor: item.color,
                                                        borderRadius: '2px'
                                                    }} />
                                                    <Typography variant="caption">
                                                        {item.name}: {item.value.toFixed(1)}%
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </Card>

                {/* Attendance Section */}
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Attendance Records
                </Typography>
                
                {subjectAttendance && subjectAttendance.length > 0 ? (
                    <>
                        {isMobile ? (
                            // Mobile Card View
                            <Box>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => (
                                    <SubjectAttendanceCard 
                                        key={index}
                                        subName={subName}
                                        present={present}
                                        sessions={sessions}
                                        subId={subId}
                                        allData={allData}
                                    />
                                ))}
                            </Box>
                        ) : (
                            // Desktop Table View
                            <TableContainer component={Paper} sx={{ mb: 2 }}>
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                                            <TableCell align="left" sx={{ color: 'white', fontWeight: 'bold' }}>Subject</TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Present</TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Total Sessions</TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Attendance %</TableCell>
                                            <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                            const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                            const attendanceColor = subjectAttendancePercentage >= 75 ? '#4CAF50' : 
                                                                  subjectAttendancePercentage >= 50 ? '#FFC107' : '#F44336';
                                            
                                            return (
                                                <React.Fragment key={index}>
                                                    <TableRow>
                                                        <TableCell align="left">{subName}</TableCell>
                                                        <TableCell align="center">{present}</TableCell>
                                                        <TableCell align="center">{sessions}</TableCell>
                                                        <TableCell align="center" sx={{ color: attendanceColor }}>
                                                            {subjectAttendancePercentage}%
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                                <Button 
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onClick={() => handleOpen(subId)}
                                                                    startIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                                >
                                                                    Details
                                                                </Button>
                                                                <Button 
                                                                    variant="outlined"
                                                                    size="small"
                                                                    color="error"
                                                                    onClick={() => removeSubAttendance(subId)}
                                                                    startIcon={<DeleteIcon />}
                                                                >
                                                                    Remove
                                                                </Button>
                                                                <Button 
                                                                    variant="contained"
                                                                    size="small"
                                                                    onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}
                                                                    sx={{ 
                                                                        backgroundColor: theme.palette.secondary.main,
                                                                        color: 'white',
                                                                        '&:hover': {
                                                                            backgroundColor: theme.palette.secondary.dark,
                                                                        },
                                                                    }}
                                                                >
                                                                    Change
                                                                </Button>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                                            <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                                <Box sx={{ margin: 1 }}>
                                                                    <Typography variant="subtitle2" gutterBottom>
                                                                        Attendance Details
                                                                    </Typography>
                                                                    <Table size="small">
                                                                        <TableHead>
                                                                            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
                                                                                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                                                                                <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {allData.map((data, index) => (
                                                                                <AttendanceDetailRow key={index} data={data} />
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </Box>
                                                            </Collapse>
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                        <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: 2,
                            mb: 2
                        }}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Overall Attendance: <span style={{ 
                                    color: overallAttendancePercentage >= 75 ? '#4CAF50' : 
                                           overallAttendancePercentage >= 50 ? '#FFC107' : '#F44336'
                                }}>
                                    {overallAttendancePercentage.toFixed(2)}%
                                </span>
                            </Typography>
                            
                            <Stack direction="row" spacing={1} sx={{ width: isMobile ? '100%' : 'auto' }}>
                                <Button 
                                    variant="contained"
                                    color="error"
                                    onClick={() => removeHandler(studentID, "RemoveStudentAtten")}
                                    startIcon={<DeleteIcon />}
                                    fullWidth={isMobile}
                                >
                                    Delete All
                                </Button>
                                <Button 
                                    variant="contained"
                                    onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                                    fullWidth={isMobile}
                                    sx={{ 
                                        backgroundColor: theme.palette.primary.main,
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: theme.palette.primary.dark,
                                        },
                                    }}
                                >
                                    Add Attendance
                                </Button>
                            </Stack>
                        </Box>
                    </>
                ) : (
                    <Paper sx={{ p: 3, textAlign: 'center', mb: 2 }}>
                        <Typography color="text.secondary">
                            No attendance records found
                        </Typography>
                        <Button 
                            variant="contained"
                            onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}
                            sx={{ 
                                mt: 2,
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            Add Attendance
                        </Button>
                    </Paper>
                )}
            </Box>
        );
    };

    const mobileMenuItems = [
        {
            icon: <KeyboardArrowUp />,
            text: 'Attendance',
            action: () => {
                setShowTab(false);
                setMobileMenuOpen(false);
            }
        },
        {
            icon: <KeyboardArrowDown />,
            text: 'Marks',
            action: () => {
                setShowTab(true);
                setMobileMenuOpen(false);
            }
        }
    ];

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Paper sx={{ 
                p: 3, 
                textAlign: 'center', 
                mt: 3, 
                backgroundColor: theme.palette.error.light 
            }}>
                <Typography color="error" sx={{ mb: 2 }}>
                    Error loading student data
                </Typography>
                <Button 
                    variant="contained"
                    onClick={() => dispatch(getUserDetails(studentID, address))}
                    sx={{ 
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}
                >
                    Retry
                </Button>
            </Paper>
        );
    }

    return (
        <Box sx={{ p: isMobile ? 1 : 3 }}>
            {/* Mobile Controls */}
            {isMobile && (
                <Box sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <IconButton 
                            onClick={() => setMobileMenuOpen(true)}
                            sx={{ 
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        
                        <Typography variant="h6" sx={{ flex: 1 }}>
                            {userDetails?.name || 'Student Details'}
                        </Typography>
                    </Stack>
                </Box>
            )}

            {/* Desktop/Tablet Controls */}
            {!isMobile && (
                <BottomNavigation 
                    value={showTab ? 1 : 0} 
                    onChange={(event, newValue) => setShowTab(newValue === 1)}
                    showLabels
                    sx={{ 
                        mb: 3,
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: theme.shadows[2]
                    }}
                >
                    <BottomNavigationAction label="Attendance" icon={<KeyboardArrowUp />} />
                    <BottomNavigationAction label="Marks" icon={<KeyboardArrowDown />} />
                </BottomNavigation>
            )}

            <Paper 
                elevation={3} 
                sx={{ 
                    borderRadius: 2,
                    overflow: 'hidden',
                    p: isMobile ? 1 : 2
                }}
            >
                {showTab ? <StudentMarksSection /> : <StudentDetailsAndAttendanceSection />}
            </Paper>

            {/* Mobile Menu Drawer */}
            <Drawer
                anchor="bottom"
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                PaperProps={{
                    sx: { 
                        borderTopLeftRadius: 16, 
                        borderTopRightRadius: 16,
                        p: 2
                    }
                }}
            >
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                    Navigation
                </Typography>
                <List>
                    {mobileMenuItems.map((item, index) => (
                        <ListItem 
                            button 
                            key={index} 
                            onClick={item.action}
                            sx={{ 
                                borderRadius: 1, 
                                mb: 1,
                                backgroundColor: showTab === (item.text === 'Marks') ? 
                                    theme.palette.action.selected : 'transparent'
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Popup 
                message={message} 
                setShowPopup={setShowPopup} 
                showPopup={showPopup} 
            />
        </Box>
    );
};

export default ViewStudent;