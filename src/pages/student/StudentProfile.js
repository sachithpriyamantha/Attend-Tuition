// import EditIcon from '@mui/icons-material/Edit';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import SaveIcon from '@mui/icons-material/Save';
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   Fade,
//   Grid,
//   IconButton,
//   Paper,
//   Slide,
//   TextField,
//   Typography
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import { QRCodeCanvas } from 'qrcode.react';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';

// // Styled components for a modern look
// const ProfilePaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   borderRadius: '20px',
//   background: 'linear-gradient(to right, #ffffff, #e3f2fd)',
//   boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
// }));

// const ProfileAvatar = styled(Avatar)({
//   width: 120,
//   height: 120,
//   boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
//   transition: 'transform 0.3s',
//   '&:hover': {
//     transform: 'scale(1.1)',
//   },
// });

// const InputField = styled(TextField)({
//   marginTop: '12px',
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: '#64b5f6',
//     },
//     '&:hover fieldset': {
//       borderColor: '#2196f3',
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: '#1976d2',
//     },
//   },
// });

// const SaveButton = styled(Button)({
//   marginTop: '20px',
//   borderRadius: '20px',
//   padding: '10px 20px',
//   backgroundColor: '#42a5f5',
//   color: '#fff',
//   '&:hover': {
//     backgroundColor: '#1e88e5',
//   },
// });

// const UploadButton = styled(Button)({
//   marginTop: '20px',
//   borderRadius: '20px',
//   color: '#fff',
//   backgroundColor: '#66bb6a',
//   '&:hover': {
//     backgroundColor: '#43a047',
//   },
// });

// const StudentProfile = () => {
//   const { currentUser } = useSelector((state) => state.user);
//   const [editMode, setEditMode] = useState(false);
//   const [userData, setUserData] = useState({
//     name: currentUser.name,
//     rollNum: currentUser.rollNum,
//     sclassName: currentUser.sclassName.sclassName,
//     schoolName: currentUser.school.schoolName,
//     phone: currentUser.phoneNumber,
//     address: currentUser.address,
//     emergencyContact: currentUser.guardianPhone,
//   });
//   const [profilePic, setProfilePic] = useState(null);
//   const [previewPic, setPreviewPic] = useState(currentUser.profilePicture || ''); // Assuming currentUser has a profilePicture field

//   const toggleEditMode = () => {
//     setEditMode(!editMode);
//   };

//   const saveChanges = () => {
//     console.log('Updated User Data:', userData);
//     setEditMode(false);
//   };

//   const handlePicChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewPic(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setProfilePic(file);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Slide in={true} direction="up" timeout={600}>
//         <ProfilePaper elevation={3}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} textAlign="center">
//               <Box display="flex" flexDirection="column" alignItems="center">
//                 <Fade in={true} timeout={800}>
//                   <ProfileAvatar alt="Student Avatar" src={previewPic}>
//                     {String(currentUser.name).charAt(0)}
//                   </ProfileAvatar>
//                 </Fade>
//                 <label htmlFor="upload-pic">
//                   <UploadButton component="span" variant="contained" startIcon={<PhotoCamera />}>
//                     Upload Picture
//                   </UploadButton>
//                 </label>
//                 <input
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                   id="upload-pic"
//                   type="file"
//                   onChange={handlePicChange}
//                 />
//               </Box>
//             </Grid>

//             <Grid item xs={12}>
//               <Box display="flex" justifyContent="center" alignItems="center">
//                 <Fade in={true} timeout={1000}>
//                   <Typography variant="h4" component="h2" sx={{ fontWeight: '600', mb: 2 }}>
//                     {currentUser.name}
//                   </Typography>
//                 </Fade>
//                 <IconButton onClick={toggleEditMode} sx={{ ml: 2 }}>
//                   {editMode ? <SaveIcon color="primary" /> : <EditIcon color="primary" />}
//                 </IconButton>
//               </Box>
//             </Grid>

//             {/* QR Generator */}
//             <Grid item xs={12} textAlign="center">
//               <Fade in={true} timeout={1200}>
//                 <QRCodeCanvas value={currentUser._id} size={140} />
//               </Fade>
//             </Grid>

//             {/* Profile Details */}
//             <Grid item xs={12}>
//               <Box display="flex" flexDirection="column" gap={2}>
//                 {editMode ? (
//                   <>
//                     <InputField
//                       label="Student Roll No"
//                       variant="outlined"
//                       value={userData.rollNum}
//                       onChange={(e) => setUserData({ ...userData, rollNum: e.target.value })}
//                     />
//                     <InputField
//                       label="Class"
//                       variant="outlined"
//                       value={userData.sclassName}
//                       onChange={(e) => setUserData({ ...userData, sclassName: e.target.value })}
//                     />
//                     <InputField
//                       label="School"
//                       variant="outlined"
//                       value={userData.schoolName}
//                       onChange={(e) => setUserData({ ...userData, schoolName: e.target.value })}
//                     />
//                     <InputField
//                       label="Home Address"
//                       variant="outlined"
//                       value={userData.address}
//                       onChange={(e) => setUserData({ ...userData, address: e.target.value })}
//                     />
//                     <InputField
//                       label="Phone Number"
//                       variant="outlined"
//                       value={userData.phone}
//                       onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
//                     />
//                     <InputField
//                       label="Emergency Number"
//                       variant="outlined"
//                       value={userData.emergencyContact}
//                       onChange={(e) => setUserData({ ...userData, emergencyContact: e.target.value })}
//                     />
//                   </>
//                 ) : (
//                   <>
//                     <Typography variant="subtitle1">
//                       <strong>Student Roll No:</strong> {userData.rollNum}
//                     </Typography>
//                     <Typography variant="subtitle1">
//                       <strong>Class:</strong> {userData.sclassName}
//                     </Typography>
//                     <Typography variant="subtitle1">
//                       <strong>School:</strong> {userData.schoolName}
//                     </Typography>
//                     <Typography variant="subtitle1">
//                       <strong>Home Address:</strong> {userData.address}
//                     </Typography>
//                     <Typography variant="subtitle1">
//                       <strong>Phone Number:</strong> {userData.phone}
//                     </Typography>
//                     <Typography variant="subtitle1">
//                       <strong>Emergency Number:</strong> {userData.emergencyContact}
//                     </Typography>
//                   </>
//                 )}
//               </Box>
//             </Grid>
//           </Grid>

//           {editMode && (
//             <Box textAlign="center">
//               <Fade in={true}>
//                 <SaveButton variant="contained" onClick={saveChanges}>
//                   Save Changes
//                 </SaveButton>
//               </Fade>
//             </Box>
//           )}
//         </ProfilePaper>
//       </Slide>
//     </Container>
//   );
// };

// export default StudentProfile;







import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Avatar,
  Box,
  Button,
  Container,
  Fade,
  Grid,
  IconButton,
  Paper,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios'; // Using axios for API calls
import { QRCodeCanvas } from 'qrcode.react';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

// Styled components for a modern look
const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  background: 'linear-gradient(to right, #ffffff, #e3f2fd)',
  boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
}));

const ProfileAvatar = styled(Avatar)({
  width: 120,
  height: 120,
  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.1)',
  },
});

const InputField = styled(TextField)({
  marginTop: '12px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#64b5f6',
    },
    '&:hover fieldset': {
      borderColor: '#2196f3',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});

const SaveButton = styled(Button)({
  marginTop: '20px',
  borderRadius: '20px',
  padding: '10px 20px',
  backgroundColor: '#42a5f5',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1e88e5',
  },
});

const UploadButton = styled(Button)({
  marginTop: '20px',
  borderRadius: '20px',
  color: '#fff',
  backgroundColor: '#66bb6a',
  '&:hover': {
    backgroundColor: '#43a047',
  },
});

const StudentProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: currentUser.name,
    rollNum: currentUser.rollNum,
    sclassName: currentUser.sclassName.sclassName,
    schoolName: currentUser.school.schoolName,
    phone: currentUser.phoneNumber,
    address: currentUser.address,
    emergencyContact: currentUser.guardianPhone,
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(currentUser.profilePicture || ''); // Assuming currentUser has a profilePicture field
  const qrRef = useRef(null); // Ref for the QR code

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Function to update user profile data to the server
  const updateProfile = async () => {
    try {
      const formData = new FormData();

      formData.append('id', currentUser._id); // Assuming user id is part of the currentUser object
      formData.append('name', userData.name);
      formData.append('rollNum', userData.rollNum);
      formData.append('sclassName', userData.sclassName);
      formData.append('schoolName', userData.schoolName);
      formData.append('phone', userData.phone);
      formData.append('address', userData.address);
      formData.append('emergencyContact', userData.emergencyContact);

      if (profilePic) {
        formData.append('profilePicture', profilePic); // Attach profile picture if changed
      }

      const response = await axios.put(`/api/user/updateProfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Since we're sending files
        },
      });

      if (response.status === 200) {
        console.log('Profile updated successfully:', response.data);
        // Optionally, update state with new user data
      } else {
        console.error('Failed to update profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const saveChanges = async () => {
    console.log('Updated User Data:', userData);
    await updateProfile(); // Call the updateProfile function to persist data to the database
    setEditMode(false);
  };

  const handlePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPic(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePic(file);
    }
  };

  // Download QR Code as PNG
  const downloadQRCode = () => {
    const qrCanvas = qrRef.current.querySelector('canvas'); // Get the canvas element
    const pngUrl = qrCanvas.toDataURL('image/png'); // Convert canvas to PNG data URL

    const downloadLink = document.createElement('a'); // Create a temporary anchor element
    downloadLink.href = pngUrl;
    downloadLink.download = `${currentUser.name}_QRCode.png`; // Set the filename for download
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink); // Clean up after download
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Slide in={true} direction="up" timeout={600}>
        <ProfilePaper elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Fade in={true} timeout={800}>
                  <ProfileAvatar alt="Student Avatar" src={previewPic}>
                    {String(currentUser.name).charAt(0)}
                  </ProfileAvatar>
                </Fade>
                <label htmlFor="upload-pic">
                  <UploadButton component="span" variant="contained" startIcon={<PhotoCamera />}>
                    Upload Picture
                  </UploadButton>
                </label>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="upload-pic"
                  type="file"
                  onChange={handlePicChange}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Fade in={true} timeout={1000}>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: '600', mb: 2 }}>
                    {currentUser.name}
                  </Typography>
                </Fade>
                <IconButton onClick={toggleEditMode} sx={{ ml: 2 }}>
                  {editMode ? <SaveIcon color="primary" /> : <EditIcon color="primary" />}
                </IconButton>
              </Box>
            </Grid>

            {/* QR Generator */}
            <Grid item xs={12} textAlign="center">
              <Fade in={true} timeout={1200}>
                <div ref={qrRef}>
                  <QRCodeCanvas value={currentUser._id} size={140} />
                </div>
              </Fade>
            </Grid>

            {/* Download QR Code Button */}
            <Grid item xs={12} textAlign="center">
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={downloadQRCode}
                sx={{ mt: 2 }}
              >
                Download QR Code
              </Button>
            </Grid>

            {/* Profile Details */}
            <Grid item xs={12}>
              <Box display="flex" flexDirection="column" gap={2}>
                {editMode ? (
                  <>
                    <InputField
                      label="Student Roll No"
                      variant="outlined"
                      value={userData.rollNum}
                      onChange={(e) => setUserData({ ...userData, rollNum: e.target.value })}
                    />
                    <InputField
                      label="Class"
                      variant="outlined"
                      value={userData.sclassName}
                      onChange={(e) => setUserData({ ...userData, sclassName: e.target.value })}
                    />
                    <InputField
                      label="School"
                      variant="outlined"
                      value={userData.schoolName}
                      onChange={(e) => setUserData({ ...userData, schoolName: e.target.value })}
                    />
                    <InputField
                      label="Home Address"
                      variant="outlined"
                      value={userData.address}
                      onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    />
                    <InputField
                      label="Phone Number"
                      variant="outlined"
                      value={userData.phone}
                      onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />
                    <InputField
                      label="Emergency Contact"
                      variant="outlined"
                      value={userData.emergencyContact}
                      onChange={(e) => setUserData({ ...userData, emergencyContact: e.target.value })}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="body1">Roll No: {userData.rollNum}</Typography>
                    <Typography variant="body1">Class: {userData.sclassName}</Typography>
                    <Typography variant="body1">School: {userData.schoolName}</Typography>
                    <Typography variant="body1">Address: {userData.address}</Typography>
                    <Typography variant="body1">Phone: {userData.phone}</Typography>
                    <Typography variant="body1">Emergency Contact: {userData.emergencyContact}</Typography>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>

          {editMode && (
            <SaveButton variant="contained" onClick={saveChanges}>
              Save Changes
            </SaveButton>
          )}
        </ProfilePaper>
      </Slide>
    </Container>
  );
};

export default StudentProfile;


