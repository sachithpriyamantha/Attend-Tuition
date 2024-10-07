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




import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Fade,
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
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import MenuIcon from '@mui/icons-material/Menu';
import { keyframes } from '@mui/system';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

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
      setSnackbarMessage("QR Code Scanned Successfully!");
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
      setSnackbarMessage("Attendance Recorded!");
      setSnackbarOpen(true);
    } else {
      setErrorMessage('Please select a subject, date, and scan the QR code.');
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

  return (
    <Box display="flex" height="100vh" bgcolor="#e8f0fe">
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Attendance Management</Typography>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <List>
            {['Dashboard', 'Attendance', 'Reports', 'Settings'].map((text) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, marginTop: '64px', position: 'relative' }}
      >
        <Fade in={true}>
          <Card sx={{
            maxWidth: 700,
            mx: 'auto',
            mb: 3,
            borderRadius: 10,
            boxShadow: '0 6px 30px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#ffffff',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}>
            <CardContent>
              <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5', textAlign: 'center', fontWeight: 'bold' }}>
                Scan QR Code for Attendance
              </Typography>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="subject-select-label">Select Subject</InputLabel>
                <Select
                  labelId="subject-select-label"
                  id="subject-select"
                  value={subjectName}
                  label="Choose an option"
                  onChange={handleSubjectChange}
                  required
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

              <FormControl fullWidth sx={{ mb: 3 }}>
                <TextField
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                border="2px dashed #3f51b5"
                borderRadius="20px"
                p={2}
                mb={2}
                width="100%"
                mx="auto"
                sx={{
                  backgroundColor: '#f3f4f6',
                  transition: 'border-color 0.3s ease-in-out',
                  '&:hover': {
                    borderColor: '#1a73e8',
                  },
                }}
              >
                {loading && (
                  <Box mb={2}>
                    <CircularProgress color="primary" />
                    <Typography variant="body1" color="textSecondary">
                      Scanning...
                    </Typography>
                  </Box>
                )}

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
                    borderRadius: '20px',
                    border: '5px solid #3f51b5',
                  }}
                  containerStyle={{
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '20px',
                  }}
                  videoContainerStyle={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>

              {scanResult && (
                <Box textAlign="center" mb={2}>
                  <Typography variant="h6" color="green" gutterBottom>
                    Student ID: <strong>{scanResult}</strong>
                  </Typography>
                </Box>
              )}

              {errorMessage && (
                <Typography variant="body1" color="error" sx={{ textAlign: 'center', mt: 2 }}>
                  {errorMessage}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Fade>

        {/* Add Attendance Button at Top Right */}
        {scanResult && (
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              display: 'flex',
              justifyContent: 'flex-end',
              zIndex: 1000, // Ensure it stays above other elements
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={handleAddAttendance}
              sx={{
                borderRadius: '20px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                animation: `${bounce} 1s infinite`,
                '&:hover': {
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                },
                padding: '10px 20px',
              }}
            >
              Add Attendance
            </Button>
          </Box>
        )}

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AdminAttendance;
