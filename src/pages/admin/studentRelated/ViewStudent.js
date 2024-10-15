// import { Delete as DeleteIcon, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
// import { BottomNavigation, BottomNavigationAction, Box, Button, Collapse, Container, IconButton, Paper, Tab, Table, TableBody, TableHead, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../../components/attendanceCalculator';
// import CustomBarChart from '../../../components/CustomBarChart';
// import CustomPieChart from '../../../components/CustomPieChart';
// import { StyledTableCell, StyledTableRow } from '../../../components/styles';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
// import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';

// import InsertChartIcon from '@mui/icons-material/InsertChart';
// import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
// import TableChartIcon from '@mui/icons-material/TableChart';
// import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
// import Popup from '../../../components/Popup';

// const ViewStudent = () => {
//     const [showTab, setShowTab] = useState(false);

//     const navigate = useNavigate()
//     const params = useParams()
//     const dispatch = useDispatch()
//     const { userDetails, response, loading, error } = useSelector((state) => state.user);

//     const studentID = params.id
//     const address = "Student"

//     useEffect(() => {
//         dispatch(getUserDetails(studentID, address));
//     }, [dispatch, studentID])

//     useEffect(() => {
//         if (userDetails && userDetails.sclassName && userDetails.sclassName._id !== undefined) {
//             dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
//         }
//     }, [dispatch, userDetails]);

//     if (response) { console.log(response) }
//     else if (error) { console.log(error) }

//     const [name, setName] = useState('');
//     const [rollNum, setRollNum] = useState('');
//     const [password, setPassword] = useState('');
//     const [sclassName, setSclassName] = useState('');
//     const [studentSchool, setStudentSchool] = useState('');
//     const [subjectMarks, setSubjectMarks] = useState('');
//     const [subjectAttendance, setSubjectAttendance] = useState([]);

//     const [openStates, setOpenStates] = useState({});

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");

//     const handleOpen = (subId) => {
//         setOpenStates((prevState) => ({
//             ...prevState,
//             [subId]: !prevState[subId],
//         }));
//     };

//     const [value, setValue] = useState('1');

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     const [selectedSection, setSelectedSection] = useState('table');
//     const handleSectionChange = (event, newSection) => {
//         setSelectedSection(newSection);
//     };

//     const fields = password === ""
//         ? { name, rollNum }
//         : { name, rollNum, password }

//     useEffect(() => {
//         if (userDetails) {
//             setName(userDetails.name || '');
//             setRollNum(userDetails.rollNum || '');
//             setSclassName(userDetails.sclassName || '');
//             setStudentSchool(userDetails.school || '');
//             setSubjectMarks(userDetails.examResult || '');
//             setSubjectAttendance(userDetails.attendance || []);
//         }
//     }, [userDetails]);

//     const submitHandler = (event) => {
//         event.preventDefault()
//         dispatch(updateUser(fields, studentID, address))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//             .catch((error) => {
//                 console.error(error)
//             })
//     }

//     const deleteHandler = () => {
//         setMessage("Sorry the delete function has been disabled for now.")
//         setShowPopup(true)

//         dispatch(deleteUser(studentID, address))
//             .then(() => {
//                 navigate(-1)
//             })
//     }

//     const removeHandler = (id, deladdress) => {
//         dispatch(removeStuff(id, deladdress))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//     }

//     const removeSubAttendance = (subId) => {
//         dispatch(updateStudentFields(studentID, { subId }, "RemoveStudentSubAtten"))
//             .then(() => {
//                 dispatch(getUserDetails(studentID, address));
//             })
//     }

//     const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
//     const overallAbsentPercentage = 100 - overallAttendancePercentage;

//     const chartData = [
//         { name: 'Present', value: overallAttendancePercentage },
//         { name: 'Absent', value: overallAbsentPercentage }
//     ];

//     const subjectData = Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { subCode, present, sessions }]) => {
//         const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
//         return {
//             subject: subName,
//             attendancePercentage: subjectAttendancePercentage,
//             totalClasses: sessions,
//             attendedClasses: present
//         };
//     });

//     const StudentAttendanceSection = () => {
//         const renderTableSection = () => {
//             return (
//                 <>
//                     <h3>Attendance:</h3>
//                     <Table>
//                         <TableHead>
//                             <StyledTableRow>
//                                 <StyledTableCell>Subject</StyledTableCell>
//                                 <StyledTableCell>Present</StyledTableCell>
//                                 <StyledTableCell>Total Sessions</StyledTableCell>
//                                 <StyledTableCell>Attendance Percentage</StyledTableCell>
//                                 <StyledTableCell align="center">Actions</StyledTableCell>
//                             </StyledTableRow>
//                         </TableHead>
//                         {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
//                             const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
//                             return (
//                                 <TableBody key={index}>
//                                     <StyledTableRow>
//                                         <StyledTableCell>{subName}</StyledTableCell>
//                                         <StyledTableCell>{present}</StyledTableCell>
//                                         <StyledTableCell>{sessions}</StyledTableCell>
//                                         <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
//                                         <StyledTableCell align="center">
//                                             <Button variant="contained"
//                                                 onClick={() => handleOpen(subId)}>
//                                                 {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}Details
//                                             </Button>
//                                             <IconButton onClick={() => removeSubAttendance(subId)}>
//                                                 <DeleteIcon color="error" />
//                                             </IconButton>
//                                             <Button variant="contained" sx={styles.attendanceButton}
//                                                 onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}>
//                                                 Change
//                                             </Button>
//                                         </StyledTableCell>
//                                     </StyledTableRow>
//                                     <StyledTableRow>
//                                         <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//                                             <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
//                                                 <Box sx={{ margin: 1 }}>
//                                                     <Typography variant="h6" gutterBottom component="div">
//                                                         Attendance Details
//                                                     </Typography>
//                                                     <Table size="small" aria-label="purchases">
//                                                         <TableHead>
//                                                             <StyledTableRow>
//                                                                 <StyledTableCell>Date</StyledTableCell>
//                                                                 <StyledTableCell align="right">Status</StyledTableCell>
//                                                             </StyledTableRow>
//                                                         </TableHead>
//                                                         <TableBody>
//                                                             {allData.map((data, index) => {
//                                                                 const date = new Date(data.date);
//                                                                 const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
//                                                                 return (
//                                                                     <StyledTableRow key={index}>
//                                                                         <StyledTableCell component="th" scope="row">
//                                                                             {dateString}
//                                                                         </StyledTableCell>
//                                                                         <StyledTableCell align="right">{data.status}</StyledTableCell>
//                                                                     </StyledTableRow>
//                                                                 )
//                                                             })}
//                                                         </TableBody>
//                                                     </Table>
//                                                 </Box>
//                                             </Collapse>
//                                         </StyledTableCell>
//                                     </StyledTableRow>
//                                 </TableBody>
//                             )
//                         }
//                         )}
//                     </Table>
//                     <div>
//                         Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%
//                     </div>
//                     <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => removeHandler(studentID, "RemoveStudentAtten")}>Delete All</Button>
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
//                         Add Attendance
//                     </Button>
//                 </>
//             )
//         }
//         const renderChartSection = () => {
//             return (
//                 <>
//                     <CustomBarChart chartData={subjectData} dataKey="attendancePercentage" />
//                 </>
//             )
//         }
//         return (
//             <>
//                 {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0
//                     ?
//                     <>
//                         {selectedSection === 'table' && renderTableSection()}
//                         {selectedSection === 'chart' && renderChartSection()}

//                         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                             <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                 <BottomNavigationAction
//                                     label="Table"
//                                     value="table"
//                                     icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                 />
//                                 <BottomNavigationAction
//                                     label="Chart"
//                                     value="chart"
//                                     icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                 />
//                             </BottomNavigation>
//                         </Paper>
//                     </>
//                     :
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/attendance/" + studentID)}>
//                         Add Attendance
//                     </Button>
//                 }
//             </>
//         )
//     }

//     const StudentMarksSection = () => {
//         const renderTableSection = () => {
//             return (
//                 <>
//                     <h3>Subject Marks:</h3>
//                     <Table>
//                         <TableHead>
//                             <StyledTableRow>
//                                 <StyledTableCell>Subject</StyledTableCell>
//                                 <StyledTableCell>Marks</StyledTableCell>
//                             </StyledTableRow>
//                         </TableHead>
//                         <TableBody>
//                             {subjectMarks.map((result, index) => {
//                                 if (!result.subName || !result.marksObtained) {
//                                     return null;
//                                 }
//                                 return (
//                                     <StyledTableRow key={index}>
//                                         <StyledTableCell>{result.subName.subName}</StyledTableCell>
//                                         <StyledTableCell>{result.marksObtained}</StyledTableCell>
//                                     </StyledTableRow>
//                                 );
//                             })}
//                         </TableBody>
//                     </Table>
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
//                         Add Marks
//                     </Button>
//                 </>
//             )
//         }
//         const renderChartSection = () => {
//             return (
//                 <>
//                     <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
//                 </>
//             )
//         }
//         return (
//             <>
//                 {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
//                     ?
//                     <>
//                         {selectedSection === 'table' && renderTableSection()}
//                         {selectedSection === 'chart' && renderChartSection()}

//                         <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
//                             <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
//                                 <BottomNavigationAction
//                                     label="Table"
//                                     value="table"
//                                     icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
//                                 />
//                                 <BottomNavigationAction
//                                     label="Chart"
//                                     value="chart"
//                                     icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
//                                 />
//                             </BottomNavigation>
//                         </Paper>
//                     </>
//                     :
//                     <Button variant="contained" sx={styles.styledButton} onClick={() => navigate("/Admin/students/student/marks/" + studentID)}>
//                         Add Marks
//                     </Button>
//                 }
//             </>
//         )
//     }



//     //EDIT DETAILS
//     const StudentDetailsSection = () => {
//         return (
//             <div>
//                 Name: {userDetails.name}
//                 <br />
//                 Roll Number: {userDetails.rollNum}
//                 <br />
//                 Class: {sclassName.sclassName}
//                 <br />
//                 School: {studentSchool.schoolName}
//                 {
//                     subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 && (
//                         <CustomPieChart data={chartData} />
//                     )
//                 }
//                 <Button variant="contained" sx={styles.styledButton} onClick={deleteHandler}>
//                     Delete
//                 </Button>
//                 <br />
//                 <Button variant="contained" sx={styles.styledButton} className="show-tab" onClick={() => { setShowTab(!showTab) }}>
//                     {
//                         showTab
//                             ? <KeyboardArrowUp />
//                             : <KeyboardArrowDown />
//                     }
//                     Edit Student
//                 </Button>
//                 <Collapse in={showTab} timeout="auto" unmountOnExit>
//                     <div className="register">
//                         <form className="registerForm" onSubmit={submitHandler}>
//                             <span className="registerTitle">Edit Details</span>
//                             <label>Name</label>
//                             <input className="registerInput" type="text" placeholder="Enter user's name..."
//                                 value={name}
//                                 onChange={(event) => setName(event.target.value)}
//                                 autoComplete="name" required />

//                             <label>Roll Number</label>
//                             <input className="registerInput" type="number" placeholder="Enter user's Roll Number..."
//                                 value={rollNum}
//                                 onChange={(event) => setRollNum(event.target.value)}
//                                 required />

//                             <label>Password</label>
//                             <input className="registerInput" type="password" placeholder="Enter user's password..."
//                                 value={password}
//                                 onChange={(event) => setPassword(event.target.value)}
//                                 autoComplete="new-password" />

//                             <button className="registerButton" type="submit" >Update</button>
//                         </form>
//                     </div>
//                 </Collapse>
//             </div>
//         )
//     }

//     return (
//         <>
//             {loading
//                 ?
//                 <>
//                     <div>Loading...</div>
//                 </>
//                 :
//                 <>
//                     <Box sx={{ width: '100%', typography: 'body1', }} >
//                         <TabContext value={value}>
//                             <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                                 <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
//                                     <Tab label="Details" value="1" />
//                                     <Tab label="Attendance" value="2" />
//                                     <Tab label="Marks" value="3" />
//                                 </TabList>
//                             </Box>
//                             <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
//                                 <TabPanel value="1">
//                                     <StudentDetailsSection />
//                                 </TabPanel>
//                                 <TabPanel value="2">
//                                     <StudentAttendanceSection />
//                                 </TabPanel>
//                                 <TabPanel value="3">
//                                     <StudentMarksSection />
//                                 </TabPanel>
//                             </Container>
//                         </TabContext>
//                     </Box>
//                 </>
//             }
//             <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

//         </>
//     )
// }

// export default ViewStudent

// const styles = {
//     attendanceButton: {
//         marginLeft: "20px",
//         backgroundColor: "#270843",
//         "&:hover": {
//             backgroundColor: "#3f1068",
//         }
//     },
//     styledButton: {
//         margin: "20px",
//         backgroundColor: "#02250b",
//         "&:hover": {
//             backgroundColor: "#106312",
//         }
//     }
// }








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
                                    <StyledTableCell>Subject</StyledTableCell>
                                    <StyledTableCell>Present</StyledTableCell>
                                    <StyledTableCell>Total Sessions</StyledTableCell>
                                    <StyledTableCell>Attendance Percentage</StyledTableCell>
                                    <StyledTableCell align="center">Actions</StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                    const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                    return (
                                        <React.Fragment key={index}>
                                            <StyledTableRow>
                                                <StyledTableCell>{subName}</StyledTableCell>
                                                <StyledTableCell>{present}</StyledTableCell>
                                                <StyledTableCell>{sessions}</StyledTableCell>
                                                <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
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
                                                <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="h6" gutterBottom component="div">
                                                                Attendance Details
                                                            </Typography>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <StyledTableRow>
                                                                        <StyledTableCell>Date</StyledTableCell>
                                                                        <StyledTableCell align="right">Status</StyledTableCell>
                                                                    </StyledTableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {allData.map((data, index) => {
                                                                        const date = new Date(data.date);
                                                                        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                        return (
                                                                            <StyledTableRow key={index}>
                                                                                <StyledTableCell>{dateString}</StyledTableCell>
                                                                                <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                            </StyledTableRow>
                                                                        );
                                                                    })}
                                                                </TableBody>
                                                            </Table>
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

// const styles = {
//     licenseCard: {
//         width: 350, // Adjust the width of the card
//         padding: 2,
//         margin: 'auto',
//         borderRadius: '12px',
//         border: '1px solid #ddd',
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f9f9f9',
//     },
//     cardTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 1,
//         textAlign: 'center',
//     },
//     cardText: {
//         fontSize: 14,
//         marginBottom: 0.5,
//     },
//     chartContainer: {
//         marginTop: 2,
//         width: '100%', // Ensure the chart adjusts with the card width
//         display: 'flex',
//         justifyContent: 'center',
//     },
//     styledButton: {
//         margin: 1,
//         fontSize: '12px',
//     },
//     attendanceButton: {
//         backgroundColor: "#673ab7",
//         margin: 2
//     }
// };




// const styles = {
//     centeredContainer: {
//         display: 'flex',
//         justifyContent: 'center', // Center horizontally
//         alignItems: 'center', // Center vertically
//         minHeight: '100vh', // Full viewport height
//         backgroundColor: '#f0f0f0', // Optional background to highlight the card
//     },
//     licenseCardWide: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%', // Make the card wide
//         maxWidth: 900, // Set a max width
//         padding: 3,
//         borderRadius: '12px',
//         border: '1px solid #ddd',
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//         backgroundColor: '#ffffff',
//     },
//     cardContent: {
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: '100%',
//     },
//     cardColumn: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//     },
//     cardTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 1,
//     },
//     cardText: {
//         fontSize: 14,
//         marginBottom: 0.5,
//     },
//     chartContainer: {
//         width: 160, // Adjust the width of the chart to fit into the card
//         height: 150, // Set the height of the chart
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     actionButtons: {
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-around',
//         height: '100%',
//     },
//     styledButton: {
//         margin: 1,
//         fontSize: '12px',
//         padding: '5px 10px',
//     },
// };


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
        gap: '20px', // Space between the card and the table
        alignItems: 'flex-start', // Align the card and the table at the top
        width: '100%', // Ensure it takes full width
    },
    licenseCardSmall: {
        width: '250px', // Make the card smaller
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
        height: '250px', // Adjust the chart height
        display: 'flex',
        justifyContent: 'center',
        marginTop: '-70px',
    },
    attendanceTableContainer: {
        flex: 1, // Make the table take up the remaining space
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
