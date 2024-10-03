import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AccountMenu from '../../components/AccountMenu';
import { AppBar, Drawer } from '../../components/styles';
import Logout from '../Logout';
import StudentComplain from './StudentComplain';
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSideBar from './StudentSideBar';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';

const StudentDashboard = () => {
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Student Dashboard
                        </Typography>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <StudentSideBar />
                    </List>
                </Drawer>
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />

                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Student/complain" element={<StudentComplain />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default StudentDashboard

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },   
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}



// import { Avatar, Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
// import QRCode from 'qrcode';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import styled from 'styled-components';

// const StudentProfile = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [qrCode, setQrCode] = useState("");

//   // Function to generate QR code from student data
//   const generateQRCode = () => {
//     const studentData = {
//       name: currentUser.name,
//       rollNum: currentUser.rollNum,
//       sclassName: currentUser.sclassName?.sclassName,
//       schoolName: currentUser.school?.schoolName,
//       dob: currentUser.dob,
//     };
//     // Generate QR code as a string
//     QRCode.toDataURL(JSON.stringify(studentData))
//       .then((url) => {
//         setQrCode(url);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   return (
//     <>
//       <Container maxWidth="md">
//         <StyledPaper elevation={3}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
//                   {String(currentUser.name).charAt(0)}
//                 </Avatar>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center">
//                 <Typography variant="h5" component="h2" textAlign="center">
//                   {currentUser.name}
//                 </Typography>
//               </Box>
//             </Grid>
//             {/* Other student details */}
//           </Grid>

//           {/* QR Code Section */}
//           <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
//             <Button variant="contained" color="primary" onClick={generateQRCode}>
//               Generate QR Code
//             </Button>
//           </Grid>
//           {qrCode && (
//             <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
//               <img src={qrCode} alt="Student QR Code" />
//             </Grid>
//           )}
//         </StyledPaper>
//       </Container>
//     </>
//   );
// };

// export default StudentProfile;

// const StyledPaper = styled(Paper)`
//   padding: 20px;
//   margin-bottom: 20px;
//   width: 90%;
// `;
