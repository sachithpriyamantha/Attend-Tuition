// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
// import { getUserDetails } from '../../../redux/userRelated/userHandle';

// import {
//   Box,
//   CircularProgress, FormControl,
//   InputLabel,
//   MenuItem, Select,
//   Stack,
//   TextField,
//   Typography
// } from '@mui/material';
// import { PurpleButton } from '../../../components/buttonStyles';
// import Popup from '../../../components/Popup';

// const StudentAttendance = ({ situation }) => {
//     const dispatch = useDispatch();
//     const { currentUser, userDetails, loading } = useSelector((state) => state.user);
//     const { subjectsList } = useSelector((state) => state.sclass);
//     const { response, error, statestatus } = useSelector((state) => state.student);
//     const params = useParams()

//     const [studentID, setStudentID] = useState("");
//     const [subjectName, setSubjectName] = useState("");
//     const [chosenSubName, setChosenSubName] = useState("");
//     const [status, setStatus] = useState('');
//     const [date, setDate] = useState('');

//     const [showPopup, setShowPopup] = useState(false);
//     const [message, setMessage] = useState("");
//     const [loader, setLoader] = useState(false)

//     useEffect(() => {
//         if (situation === "Student") {
//             setStudentID(params.id);
//             const stdID = params.id
//             dispatch(getUserDetails(stdID, "Student"));
//         }
//         else if (situation === "Subject") {
//             const { studentID, subjectID } = params
//             setStudentID(studentID);
//             dispatch(getUserDetails(studentID, "Student"));
//             setChosenSubName(subjectID);
//         }
//     }, [situation]);

//     useEffect(() => {
//         if (userDetails && userDetails.sclassName && situation === "Student") {
//             dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
//         }
//     }, [dispatch, userDetails]);

//     const changeHandler = (event) => {
//         const selectedSubject = subjectsList.find(
//             (subject) => subject.subName === event.target.value
//         );
//         setSubjectName(selectedSubject.subName);
//         setChosenSubName(selectedSubject._id);
//     }

//     const fields = { subName: chosenSubName, status, date }

//     const submitHandler = (event) => {
//         event.preventDefault()
//         setLoader(true)
//         dispatch(updateStudentFields(studentID, fields, "StudentAttendance"))
//     }

//     useEffect(() => {
//         if (response) {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage(response)
//         }
//         else if (error) {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("error")
//         }
//         else if (statestatus === "added") {
//             setLoader(false)
//             setShowPopup(true)
//             setMessage("Done Successfully")
//         }
//     }, [response, statestatus, error])

//     return (
//         <>
//             {loading
//                 ?
//                 <>
//                     <div>Loading...</div>
//                 </>
//                 :
//                 <>
//                     <Box
//                         sx={{
//                             flex: '1 1 auto',
//                             alignItems: 'center',
//                             display: 'flex',
//                             justifyContent: 'center'
//                         }}
//                     >
//                         <Box
//                             sx={{
//                                 maxWidth: 550,
//                                 px: 3,
//                                 py: '100px',
//                                 width: '100%'
//                             }}
//                         >
//                             <Stack spacing={1} sx={{ mb: 3 }}>
//                                 <Typography variant="h4">
//                                     Student Name: {userDetails.name}
//                                 </Typography>
//                                 {currentUser.teachSubject &&
//                                     <Typography variant="h4">
//                                         Subject Name: {currentUser.teachSubject?.subName}
//                                     </Typography>
//                                 }
//                             </Stack>
//                             <form onSubmit={submitHandler}>
//                                 <Stack spacing={3}>
//                                     {
//                                         situation === "Student" &&
//                                         <FormControl fullWidth>
//                                             <InputLabel id="demo-simple-select-label">Select Subject</InputLabel>
//                                             <Select
//                                                 labelId="demo-simple-select-label"
//                                                 id="demo-simple-select"
//                                                 value={subjectName}
//                                                 label="Choose an option"
//                                                 onChange={changeHandler} required
//                                             >
//                                                 {subjectsList ?
//                                                     subjectsList.map((subject, index) => (
//                                                         <MenuItem key={index} value={subject.subName}>
//                                                             {subject.subName}
//                                                         </MenuItem>
//                                                     ))
//                                                     :
//                                                     <MenuItem value="Select Subject">
//                                                         Add Subjects For Attendance
//                                                     </MenuItem>
//                                                 }
//                                             </Select>
//                                         </FormControl>
//                                     }
//                                     <FormControl fullWidth>
//                                         <InputLabel id="demo-simple-select-label">Attendance Status</InputLabel>
//                                         <Select
//                                             labelId="demo-simple-select-label"
//                                             id="demo-simple-select"
//                                             value={status}
//                                             label="Choose an option"
//                                             onChange={(event) => setStatus(event.target.value)}
//                                             required
//                                         >
//                                             <MenuItem value="Present">Present</MenuItem>
//                                             <MenuItem value="Absent">Absent</MenuItem>
//                                         </Select>
//                                     </FormControl>
//                                     <FormControl>
//                                         <TextField
//                                             label="Select Date"
//                                             type="date"
//                                             value={date}
//                                             onChange={(event) => setDate(event.target.value)} required
//                                             InputLabelProps={{
//                                                 shrink: true,
//                                             }}
//                                         />
//                                     </FormControl>
//                                 </Stack>

//                                 <PurpleButton
//                                     fullWidth
//                                     size="large"
//                                     sx={{ mt: 3 }}
//                                     variant="contained"
//                                     type="submit"
//                                     disabled={loader}
//                                 >
//                                     {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
//                                 </PurpleButton>
//                             </form>
//                         </Box>
//                     </Box>
//                     <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
//                 </>
//             }
//         </>
//     )
// }

// export default StudentAttendance






/*********************************this is a QR Scan code with Subject********************************************/



// import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { QrReader } from 'react-qr-reader';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

// const AdminAttendance = ({ studentID }) => {
//   const dispatch = useDispatch();
//   const { subjectsList } = useSelector((state) => state.sclass);
//   const [scanResult, setScanResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [subjectName, setSubjectName] = useState('');
//   const [chosenSubName, setChosenSubName] = useState('');

//   useEffect(() => {
//     // Assuming the class or some identifier is available to fetch subjects
//     dispatch(getSubjectList("classOrRelevantIdentifier", "ClassSubjects"));
//   }, [dispatch]);

//   const handleScan = (data) => {
//     if (data) {
//       setScanResult(data); // Capture the student ID from the QR code
//       setErrorMessage('');
//       setLoading(false);
//     }
//   };

//   const handleError = (err) => {
//     setLoading(false);
//     setErrorMessage('Error scanning QR code. Please try again.');
//     console.error(err);
//   };

//   const handleAddAttendance = () => {
//     if (scanResult && chosenSubName) {
//       const fields = {
//         status: 'Present',
//         date: new Date().toISOString().split('T')[0],
//         subName: chosenSubName, // Subject chosen manually
//       };
//       dispatch(updateStudentFields(scanResult, fields, 'StudentAttendance'));
//       setErrorMessage('');
//       setScanResult(null);
//     } else {
//       setErrorMessage('Please select a subject before scanning the QR code.');
//     }
//   };

//   const handleSubjectChange = (event) => {
//     const selectedSubject = subjectsList.find(
//       (subject) => subject.subName === event.target.value
//     );
//     setSubjectName(selectedSubject.subName);
//     setChosenSubName(selectedSubject._id);
//   };

//   return (
//     <Box p={3} textAlign="center">
//       <Typography variant="h4" gutterBottom>
//         Select Subject and Scan QR Code for Attendance
//       </Typography>

//       <FormControl fullWidth sx={{ mb: 3 }}>
//         <InputLabel id="subject-select-label">Select Subject</InputLabel>
//         <Select
//           labelId="subject-select-label"
//           id="subject-select"
//           value={subjectName}
//           label="Choose an option"
//           onChange={handleSubjectChange}
//           required
//         >
//           {subjectsList ? (
//             subjectsList.map((subject, index) => (
//               <MenuItem key={index} value={subject.subName}>
//                 {subject.subName}
//               </MenuItem>
//             ))
//           ) : (
//             <MenuItem value="Select Subject">Add Subjects For Attendance</MenuItem>
//           )}
//         </Select>
//       </FormControl>

//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         flexDirection="column"
//         border="2px dashed #3f51b5"
//         borderRadius="8px"
//         p={2}
//         mb={2}
//         width={{ xs: '90%', sm: '60%', md: '40%' }}
//         mx="auto"
//       >
//         {/* Add a scanning area with proper feedback */}
//         {loading && (
//           <Box mb={2}>
//             <CircularProgress color="primary" />
//             <Typography variant="body1" color="textSecondary">
//               Scanning...
//             </Typography>
//           </Box>
//         )}

//         {/* Camera Preview with fixed aspect ratio */}
//         <QrReader
//           onResult={(result, error) => {
//             if (!!result) {
//               handleScan(result?.text); // Handle scan result
//             }
//             if (!!error) {
//               handleError(error);
//             }
//           }}
//           constraints={{ facingMode: 'environment' }} 
//           videoStyle={{ width: '100%', height: 'auto' }} 
//           containerStyle={{ width: '100%', paddingTop: '100%', position: 'relative' }} 
//           videoContainerStyle={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
//         />
//       </Box>

//       {scanResult && (
//         <>
//           <Typography variant="h6" color="green" gutterBottom>
//             Student ID: {scanResult}
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAddAttendance}
//             sx={{ mt: 2 }}
//           >
//             Add Attendance
//           </Button>
//         </>
//       )}

//       {errorMessage && (
//         <Typography variant="body1" color="error">
//           {errorMessage}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default AdminAttendance;




// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CircularProgress,
//   Fade,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { QrReader } from 'react-qr-reader';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
// import MenuIcon from '@mui/icons-material/Menu';
// import { keyframes } from '@mui/system';
// const bounce = keyframes`
//   0%, 20%, 50%, 80%, 100% {
//     transform: translateY(0);
//   }
//   40% {
//     transform: translateY(-10px);
//   }
//   60% {
//     transform: translateY(-5px);
//   }
// `;
// const AdminAttendance = () => {
//   const dispatch = useDispatch();
//   const { subjectsList } = useSelector((state) => state.sclass);
//   const [scanResult, setScanResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [subjectName, setSubjectName] = useState('');
//   const [chosenSubName, setChosenSubName] = useState('');
//   const [date, setDate] = useState('');
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   useEffect(() => {
//     dispatch(getSubjectList("classOrRelevantIdentifier", "ClassSubjects"));
//   }, [dispatch]);
//   const handleScan = (data) => {
//     if (data) {
//       setScanResult(data);
//       setSnackbarMessage("QR Code Scanned Successfully!");
//       setSnackbarOpen(true);
//       setErrorMessage('');
//       setLoading(false);
//     }
//   };
//   const handleError = (err) => {
//     setLoading(false);
//     console.error(err);
//   };
//   const handleAddAttendance = () => {
//     if (scanResult && chosenSubName && date) {
//       const fields = {
//         status: 'Present',
//         date,
//         subName: chosenSubName,
//       };
//       dispatch(updateStudentFields(scanResult, fields, 'StudentAttendance'));
//       setErrorMessage('');
//       setScanResult(null);
//       setSnackbarMessage("Attendance Recorded!");
//       setSnackbarOpen(true);
//     } else {
//       setErrorMessage('Please select a subject, date, and scan the QR code.');
//     }
//   };
//   const handleSubjectChange = (event) => {
//     const selectedSubject = subjectsList.find(
//       (subject) => subject.subName === event.target.value
//     );
//     setSubjectName(selectedSubject.subName);
//     setChosenSubName(selectedSubject._id);
//   };
//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };
//   return (
//     <Box display="flex" height="150vh" bgcolor="#E8F0FE">
//       <AppBar position="fixed" color="primary">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={toggleDrawer}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6">Attendance Management</Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
//         <Box
//           sx={{ width: 250 }}
//           role="presentation"
//           onClick={toggleDrawer}
//           onKeyDown={toggleDrawer}
//         >
//           <List>
//             {['Dashboard', 'Attendance', 'Reports', 'Settings'].map((text) => (
//               <ListItem button key={text}>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, p: 3, marginTop: '64px', position: 'relative' }}
//       >
//         <Fade in={true}>
//           <Card sx={{
//             maxWidth: 700,
//             mx: 'auto',
//             mb: 3,
//             borderRadius: 10,
//             boxShadow: '0 6px 30px rgba(0, 0, 0, 0.1)',
//             backgroundColor: '#FFFFFF',
//             transition: 'transform 0.3s ease',
//             '&:hover': {
//               transform: 'scale(1.02)',
//             },
//           }}>
//             <CardContent>
//               <Typography variant="h4" gutterBottom sx={{ color: '#3F51B5', textAlign: 'center', fontWeight: 'bold' }}>
//                 Scan QR Code for Attendance
//               </Typography>
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel id="subject-select-label">Select Subject</InputLabel>
//                 <Select
//                   labelId="subject-select-label"
//                   id="subject-select"
//                   value={subjectName}
//                   label="Choose an option"
//                   onChange={handleSubjectChange}
//                   required
//                 >
//                   {subjectsList.length > 0 ? (
//                     subjectsList.map((subject, index) => (
//                       <MenuItem key={index} value={subject.subName}>
//                         {subject.subName}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem value="" disabled>
//                       No Subjects Available
//                     </MenuItem>
//                   )}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth sx={{ mb: 3 }}>
//                 <TextField
//                   label="Select Date"
//                   type="date"
//                   value={date}
//                   onChange={(event) => setDate(event.target.value)}
//                   required
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </FormControl>
//               <Box
//                 display="flex"
//                 justifyContent="center"
//                 alignItems="center"
//                 flexDirection="column"
//                 border="2px dashed #3F51B5"
//                 borderRadius="40px"
//                 p={2}
//                 mb={2}
//                 width="100%"
//                 mx="auto"
//                 sx={{
//                   backgroundColor: '#F3F4F6',
//                   transition: 'border-color 0.3s ease-in-out',
//                   '&:hover': {
//                     borderColor: '#1A73E8',
//                   },
//                 }}

//               >
//                 {loading && (
//                   <Box mb={2}>
//                     <CircularProgress color="primary" />
//                     <Typography variant="body1" color="textSecondary">
//                       Scanning...
//                     </Typography>
//                   </Box>
//                 )}
//                 <QrReader
//                   onResult={(result, error) => {
//                     if (!!result) {
//                       handleScan(result?.text);
//                     }
//                     if (!!error) {
//                       handleError(error);
//                     }
//                   }}
//                   constraints={{ facingMode: 'environment' }}
//                   videoStyle={{
//                     width: '100%',
//                     height: 'auto',
//                     borderRadius: '20px',
//                     border: '5px solid #3F51B5',
//                   }}
//                   containerStyle={{
//                     width: '100%',
//                     paddingTop: '100%',
//                     position: 'relative',
//                     overflow: 'hidden',
//                     borderRadius: '20px',
//                   }}
//                   videoContainerStyle={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '100%',
//                   }}
//                 />
//               </Box>
//               {scanResult && (
//                 <Box textAlign="center" mb={2}>
//                   <Typography variant="h6" color="green" gutterBottom>
//                     Student ID: <strong>{scanResult}</strong>
//                   </Typography>
//                 </Box>
//               )}
//               {errorMessage && (
//                 <Typography variant="body1" color="error" sx={{ textAlign: 'center', mt: 2 }}>
//                   {errorMessage}
//                 </Typography>
//               )}
//             </CardContent>
//           </Card>
//         </Fade>
//         {/* Add Attendance Button at Top Right */}
//         {scanResult && (
//           <Box
//             sx={{
//               position: 'absolute',
//               top: 20,
//               right: 20,
//               display: 'flex',
//               justifyContent: 'flex-end',
//               zIndex: 1000, // Ensure it stays above other elements
//             }}
//           >
//             <Button
//               variant="contained"
//               color="success"
//               onClick={handleAddAttendance}
//               sx={{
//                 borderRadius: '20px',
//                 boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//                 animation: `${bounce} 1s infinite`,
//                 '&:hover': {
//                   boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
//                 },
//                 padding: '10px 20px',
//               }}
//             >
//               Add Attendance
//             </Button>
//           </Box>
//         )}
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={3000}
//           onClose={handleSnackbarClose}
//         >
//           <Alert onClose={handleSnackbarClose} severity="success">
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   );
// };
// export default AdminAttendance;



import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
  Paper,
  Divider,
  Avatar
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SubjectIcon from '@mui/icons-material/Subject';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AdminAttendance = () => {
  const dispatch = useDispatch();
  const { subjectsList } = useSelector((state) => state.sclass);
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [chosenSubName, setChosenSubName] = useState('');
  const [date, setDate] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  
  useEffect(() => {
    dispatch(getSubjectList("classOrRelevantIdentifier", "ClassSubjects"));
  }, [dispatch]);

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      setSnackbarMessage("QR Code scanned successfully!");
      setSnackbarOpen(true);
      setErrorMessage('');
      setLoading(false);
    }
  };

  const handleError = (err) => {
    setLoading(false);
    console.error(err);
  };

  const handleAddAttendance = () => {
    if (scanResult && chosenSubName && date) {
      const fields = {
        status: 'Present',
        date,
        subName: chosenSubName,
      };
      dispatch(updateStudentFields(scanResult, fields, 'StudentAttendance'));
      setErrorMessage('');
      setScanResult(null);
      setSnackbarMessage("Attendance recorded successfully!");
      setSnackbarOpen(true);
    } else {
      setErrorMessage('Please complete all fields and scan a QR code');
    }
  };

  const handleSubjectChange = (event) => {
    const selectedSubject = subjectsList.find(
      (subject) => subject.subName === event.target.value
    );
    setSubjectName(selectedSubject.subName);
    setChosenSubName(selectedSubject._id);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Attendance', icon: <AssignmentIcon /> },
    { text: 'Reports', icon: <ReportIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> }
  ];

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f5f7fa">
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'white',
          color: '#3f51b5',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Attendance Portal
          </Typography>
          <Avatar sx={{ bgcolor: '#3f51b5' }}>A</Avatar>
        </Toolbar>
      </AppBar>

      <Drawer 
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#3f51b5',
            color: 'white'
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}>
                <ListItemIcon sx={{ color: 'white' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Paper 
          elevation={3} 
          sx={{
            width: '100%',
            maxWidth: '800px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
        >
          <Box 
            sx={{
              backgroundColor: '#3f51b5',
              color: 'white',
              padding: '20px',
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              <QrCodeScannerIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
              Student Attendance Scanner
            </Typography>
          </Box>

          <CardContent sx={{ padding: '32px' }}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { md: '1fr 1fr' },
              gap: 3,
              mb: 4
            }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="subject-select-label">
                  <SubjectIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: '20px' }} />
                  Select Subject
                </InputLabel>
                <Select
                  labelId="subject-select-label"
                  id="subject-select"
                  value={subjectName}
                  label="Select Subject"
                  onChange={handleSubjectChange}
                  required
                  sx={{
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center'
                    }
                  }}
                >
                  {subjectsList.length > 0 ? (
                    subjectsList.map((subject, index) => (
                      <MenuItem key={index} value={subject.subName}>
                        {subject.subName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="" disabled>
                      No Subjects Available
                    </MenuItem>
                  )}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  label={
                    <>
                      <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: '20px' }} />
                      Select Date
                    </>
                  }
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              border="2px dashed #e0e0e0"
              borderRadius="12px"
              p={4}
              mb={4}
              sx={{
                backgroundColor: '#f9f9f9',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: '#3f51b5',
                  backgroundColor: '#f0f4ff'
                }
              }}
            >
              {loading ? (
                <Box textAlign="center">
                  <CircularProgress color="primary" size={60} />
                  <Typography variant="body1" color="textSecondary" mt={2}>
                    Scanning for QR code...
                  </Typography>
                </Box>
              ) : (
                <>
                  <QrCodeScannerIcon sx={{ fontSize: 60, color: '#3f51b5', mb: 2 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    Scan Student QR Code
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 3, textAlign: 'center' }}>
                    Position the QR code within the frame to scan. Make sure the code is clear and well-lit.
                  </Typography>
                  
                  <Box sx={{ 
                    width: '100%', 
                    maxWidth: '400px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '4px solid #3f51b5'
                  }}>
                    <QrReader
                      onResult={(result, error) => {
                        if (!!result) {
                          handleScan(result?.text);
                        }
                        if (!!error) {
                          handleError(error);
                        }
                      }}
                      constraints={{ facingMode: 'environment' }}
                      videoStyle={{
                        width: '100%',
                        height: 'auto',
                      }}
                    />
                  </Box>
                </>
              )}
            </Box>

            {scanResult && (
              <Box 
                sx={{
                  backgroundColor: '#e8f5e9',
                  borderRadius: '12px',
                  padding: '16px',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ color: '#4caf50', fontSize: '30px', mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      Student ID Detected
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#2e7d32' }}>
                      {scanResult}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddAttendance}
                  sx={{
                    borderRadius: '12px',
                    padding: '8px 20px',
                    textTransform: 'none',
                    fontWeight: 600,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 2px 10px rgba(63, 81, 181, 0.3)'
                    }
                  }}
                >
                  Confirm Attendance
                </Button>
              </Box>
            )}

            {errorMessage && (
              <Box 
                sx={{
                  backgroundColor: '#ffebee',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center'
                }}
              >
                <Typography variant="body1" color="error">
                  {errorMessage}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Paper>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AdminAttendance;













// import {
//   Box,
//   Card,
//   CardContent,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Snackbar,
//   Alert,
//   Button,
//   Divider,
//   Badge
// } from '@mui/material';
// import React, { useEffect, useState } from 'react';
// import { QrReader } from 'react-qr-reader';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
// import MenuIcon from '@mui/icons-material/Menu';
// import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
// import EventIcon from '@mui/icons-material/Event';
// import ClassIcon from '@mui/icons-material/Class';
// import CheckIcon from '@mui/icons-material/Check';

// const AdminAttendance = () => {
//   const dispatch = useDispatch();
//   const { subjectsList } = useSelector((state) => state.sclass);
//   const [scanResult, setScanResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [subjectName, setSubjectName] = useState('');
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [scanHistory, setScanHistory] = useState([]);
//   const [cameraActive, setCameraActive] = useState(true);

//   useEffect(() => {
//     dispatch(getSubjectList("classOrRelevantIdentifier", "ClassSubjects"));
//   }, [dispatch]);

//   const handleScan = (data) => {
//     if (data) {
//       setLoading(true);
//       setScanResult(data);
//       setScanHistory(prev => [...prev, {
//         id: data,
//         time: new Date().toLocaleTimeString(),
//         date: new Date().toLocaleDateString()
//       }]);
      
//       setSnackbarMessage(`QR Code Scanned: ${data}`);
//       setSnackbarOpen(true);
//       setLoading(false);
      
//       // Temporarily disable camera to prevent multiple scans
//       setCameraActive(false);
//       setTimeout(() => setCameraActive(true), 2000);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     setSnackbarMessage('Scanner error. Please try again.');
//     setSnackbarOpen(true);
//     setLoading(false);
//   };

//   const handleSubjectChange = (event) => {
//     setSubjectName(event.target.value);
//   };

//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleAddAttendance = () => {
//     if (scanResult && subjectName && date) {
//       setSnackbarMessage(`Attendance would be recorded for ${scanResult}`);
//       setSnackbarOpen(true);
//       // Here you would dispatch your attendance action
//       // dispatch(updateStudentFields(scanResult, fields, 'StudentAttendance'));
//     } else {
//       setSnackbarMessage('Please select subject, date, and scan a QR code first');
//       setSnackbarOpen(true);
//     }
//   };

//   return (
//     <Box display="flex" minHeight="100vh" bgcolor="#f8fafc">
//       <AppBar position="fixed" color="primary" elevation={0}>
//         <Toolbar>
//           <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>Attendance Portal</Typography>
//         </Toolbar>
//       </AppBar>

//       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
//         <Box sx={{ width: 250 }} role="presentation">
//           <List>
//             {['Dashboard', 'Attendance', 'Reports', 'Settings'].map((text) => (
//               <ListItem button key={text}>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
//         <Box sx={{ maxWidth: 900, mx: 'auto', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
//           {/* Scanner Card */}
//           <Card sx={{ 
//             flex: 1,
//             borderRadius: 2,
//             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//             overflow: 'hidden'
//           }}>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: 1.5,
//                 mb: 3 
//               }}>
//                 <QrCodeScannerIcon color="primary" fontSize="large" />
//                 <Typography variant="h6" fontWeight="medium">QR Code Scanner</Typography>
//               </Box>

//               <Box sx={{ 
//                 position: 'relative',
//                 borderRadius: 2,
//                 overflow: 'hidden',
//                 border: '1px dashed',
//                 borderColor: 'divider',
//                 mb: 3,
//                 aspectRatio: '1/1'
//               }}>
//                 {cameraActive ? (
//                   <QrReader
//                     onResult={(result, error) => {
//                       if (!!result) handleScan(result?.text);
//                       if (!!error) handleError(error);
//                     }}
//                     constraints={{ facingMode: 'environment' }}
//                     videoStyle={{ width: '100%', height: '100%' }}
//                   />
//                 ) : (
//                   <Box sx={{
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     bgcolor: 'background.paper'
//                   }}>
//                     <Typography color="text.secondary">Scanner paused</Typography>
//                   </Box>
//                 )}

//                 {loading && (
//                   <Box sx={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     bgcolor: 'rgba(255,255,255,0.7)'
//                   }}>
//                     <CircularProgress size={60} />
//                   </Box>
//                 )}
//               </Box>

//               <Box sx={{ mb: 3 }}>
//                 <FormControl fullWidth sx={{ mb: 2 }}>
//                   <InputLabel id="subject-label">
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <ClassIcon fontSize="small" /> Subject
//                     </Box>
//                   </InputLabel>
//                   <Select
//                     labelId="subject-label"
//                     value={subjectName}
//                     label="Subject"
//                     onChange={handleSubjectChange}
//                     required
//                   >
//                     {subjectsList.map((subject, index) => (
//                       <MenuItem key={index} value={subject.subName}>
//                         {subject.subName}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>

//                 <FormControl fullWidth>
//                   <TextField
//                     label={
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <EventIcon fontSize="small" /> Date
//                       </Box>
//                     }
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     required
//                     InputLabelProps={{ shrink: true }}
//                   />
//                 </FormControl>
//               </Box>

//               {scanResult && (
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   size="large"
//                   startIcon={<CheckIcon />}
//                   onClick={handleAddAttendance}
//                   disabled={!subjectName || !date}
//                   sx={{ py: 1.5 }}
//                 >
//                   Confirm Attendance
//                 </Button>
//               )}
//             </CardContent>
//           </Card>

//           {/* Scan History Card */}
//           <Card sx={{ 
//             flex: 1,
//             borderRadius: 2,
//             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
//             display: scanHistory.length > 0 ? 'block' : { xs: 'none', md: 'block' }
//           }}>
//             <CardContent sx={{ p: 3, height: '100%' }}>
//               <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
//                 Scan History
//               </Typography>
              
//               {scanHistory.length > 0 ? (
//                 <Box sx={{ 
//                   height: 'calc(100% - 40px)',
//                   overflowY: 'auto',
//                   pr: 1
//                 }}>
//                   {scanHistory.slice().reverse().map((scan, index) => (
//                     <React.Fragment key={index}>
//                       <Box sx={{ 
//                         display: 'flex', 
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         py: 1.5
//                       }}>
//                         <Box>
//                           <Typography fontWeight="medium">Student ID: {scan.id}</Typography>
//                           <Typography variant="body2" color="text.secondary">
//                             {scan.date} at {scan.time}
//                           </Typography>
//                         </Box>
//                         <Badge badgeContent={index === 0 ? "New" : 0} color="primary">
//                           <CheckIcon color="success" />
//                         </Badge>
//                       </Box>
//                       {index < scanHistory.length - 1 && <Divider />}
//                     </React.Fragment>
//                   ))}
//                 </Box>
//               ) : (
//                 <Box sx={{ 
//                   height: '100%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   textAlign: 'center'
//                 }}>
//                   <Typography color="text.secondary">
//                     No scan history yet. <br /> Scan QR codes to see them appear here.
//                   </Typography>
//                 </Box>
//               )}
//             </CardContent>
//           </Card>
//         </Box>

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={4000}
//           onClose={handleSnackbarClose}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//         >
//           <Alert 
//             onClose={handleSnackbarClose} 
//             severity={scanResult ? "success" : "error"}
//             sx={{ width: '100%' }}
//           >
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </Box>
//   );
// };

// export default AdminAttendance;