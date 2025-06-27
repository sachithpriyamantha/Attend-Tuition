import React from 'react';
import styled from 'styled-components';
import { 
  Card, 
  CardContent, 
  Typography, 
  Divider
} from '@mui/material';
import { useSelector } from 'react-redux';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Class as ClassIcon, 
  Book as BookIcon, 
  School as SchoolIcon
} from '@mui/icons-material';

const TeacherProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <ProfileContainer>
      <ProfileCard>
        <CardContent>
          {/* Header Section with Name and Icon */}
          <HeaderSection>
            <NameAndIconContainer>
              <TeacherName variant="h4">{currentUser.name}</TeacherName>
              <PersonIcon style={{ fontSize: 32, color: '#3f51b5', marginLeft: 12 }} />
            </NameAndIconContainer>
            <TeacherEmail>
              <EmailIcon style={{ fontSize: 20, marginRight: 10, color: '#666' }} />
              {currentUser.email}
            </TeacherEmail>
          </HeaderSection>

          <StyledDivider />

          {/* Information Grid */}
          <InfoGrid>
            <InfoBox>
              <InfoIcon className="class">
                <ClassIcon style={{ fontSize: 24 }} />
              </InfoIcon>
              <InfoDetails>
                <InfoTitle>Class</InfoTitle>
                <InfoContent>{teachSclass?.sclassName || 'Not assigned'}</InfoContent>
              </InfoDetails>
            </InfoBox>

            <InfoBox>
              <InfoIcon className="subject">
                <BookIcon style={{ fontSize: 24 }} />
              </InfoIcon>
              <InfoDetails>
                <InfoTitle>Subject</InfoTitle>
                <InfoContent>{teachSubject?.subName || 'Not assigned'}</InfoContent>
              </InfoDetails>
            </InfoBox>

            <InfoBox>
              <InfoIcon className="school">
                <SchoolIcon style={{ fontSize: 24 }} />
              </InfoIcon>
              <InfoDetails>
                <InfoTitle>School</InfoTitle>
                <InfoContent>{teachSchool?.schoolName || 'Not assigned'}</InfoContent>
              </InfoDetails>
            </InfoBox>
          </InfoGrid>
        </CardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default TeacherProfile;

// Styled Components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const ProfileCard = styled(Card)`
  && {
    width: 100%;
    max-width: 600px;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    background: white;
    overflow: hidden;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
`;

const NameAndIconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TeacherName = styled(Typography)`
  && {
    font-weight: 700;
    color: #2c3e50;
    font-size: 2rem;
  }
`;

const TeacherEmail = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 16px;
  font-weight: 500;
`;

const StyledDivider = styled(Divider)`
  && {
    margin: 24px 0;
    background-color: #e0e0e0;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  background: #fafafa;
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const InfoIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  
  &.class {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  &.subject {
    background: #e8f5e8;
    color: #388e3c;
  }
  
  &.school {
    background: #f3e5f5;
    color: #7b1fa2;
  }
`;

const InfoDetails = styled.div`
  flex: 1;
`;

const InfoTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 6px;
`;

const InfoContent = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.2;
`;







// import React from 'react';
// import styled, { keyframes } from 'styled-components';
// import { Card, CardContent, Typography } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { Person as PersonIcon, Email as EmailIcon, Class as ClassIcon, Book as BookIcon, School as SchoolIcon } from '@mui/icons-material';

// // Keyframes for animations
// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-30px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const TeacherProfile = () => {
//   const { currentUser, response, error } = useSelector((state) => state.user);

//   if (response) {
//     console.log(response);
//   } else if (error) {
//     console.log(error);
//   }

//   const teachSclass = currentUser.teachSclass;
//   const teachSubject = currentUser.teachSubject;
//   const teachSchool = currentUser.school;

//   return (
//     <ProfileCard>
//       <ProfileCardContent>
//         <ProfileHeader>
//           <ProfileImage src="https://via.placeholder.com/100" alt="Profile" />
//           <ProfileInfo>
//             <ProfileName>{currentUser.name}</ProfileName>
//             <DetailText>{currentUser.email}</DetailText>
//           </ProfileInfo>
//         </ProfileHeader>
//         <DetailsContainer>
//           <ProfileDetail>
//             <ClassIcon style={{ marginRight: 8 }} />
//             <DetailText>Class: {teachSclass.sclassName}</DetailText>
//           </ProfileDetail>
//           <ProfileDetail>
//             <BookIcon style={{ marginRight: 8 }} />
//             <DetailText>Subject: {teachSubject.subName}</DetailText>
//           </ProfileDetail>
//           <ProfileDetail>
//             <SchoolIcon style={{ marginRight: 8 }} />
//             <DetailText>School: {teachSchool.schoolName}</DetailText>
//           </ProfileDetail>
//         </DetailsContainer>
//       </ProfileCardContent>
//     </ProfileCard>
//   );
// };

// export default TeacherProfile;

// // Styled Components
// const ProfileCard = styled(Card)`
//   margin: 20px;
//   width: 350px;
//   border-radius: 15px;
//   background: #ffffff;
//   box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
//   animation: ${fadeIn} 0.6s ease-in-out;
//   transition: transform 0.3s ease, box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
//   }
// `;

// const ProfileCardContent = styled(CardContent)`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start; /* Aligns items to the start of the flex container */
//   padding: 20px;
// `;

// const ProfileHeader = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 15px;
// `;

// const ProfileImage = styled.img`
//   width: 100px;
//   height: 100px;
//   border-radius: 50%; /* Circular profile image */
//   border: 2px solid #007bff; /* Blue border around image */
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
// `;

// const ProfileInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 15px; /* Space between image and name */
// `;

// const ProfileName = styled(Typography)`
//   font-size: 24px;
//   font-weight: 700;
//   color: #343a40;
// `;

// const DetailsContainer = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   margin-top: 10px;
// `;

// const ProfileDetail = styled.div`
//   display: flex;
//   align-items: center;
//   margin: 10px 0;
//   transition: color 0.3s ease; /* Smooth color transition */

//   &:hover {
//     color: #007bff; /* Change color on hover */
//   }
// `;

// const DetailText = styled.span`
//   font-size: 16px;
//   color: #495057; /* Text color for details */
// `;


// import React, { useState, useRef, useEffect } from 'react';
// import styled from 'styled-components';
// import { 
//   Card, 
//   CardContent, 
//   Typography, 
//   Divider, 
//   Button,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { 
//   Person as PersonIcon, 
//   Email as EmailIcon, 
//   Class as ClassIcon, 
//   Book as BookIcon, 
//   School as SchoolIcon,
//   CameraAlt as CameraIcon
// } from '@mui/icons-material';
// import axios from 'axios';

// const TeacherProfile = () => {
//   const { currentUser, response, error } = useSelector((state) => state.user);
//   const [profileImage, setProfileImage] = useState(null);
//   const [previewImage, setPreviewImage] = useState('');
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'success'
//   });
//   const fileInputRef = useRef(null);
  
//   // Load profile image on component mount
//   useEffect(() => {
//     if (currentUser?.profilePicture) {
//       setPreviewImage(currentUser.profilePicture);
//     }
//   }, [currentUser]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type and size
//       if (!file.type.match('image.*')) {
//         setSnackbar({
//           open: true,
//           message: 'Please select an image file',
//           severity: 'error'
//         });
//         return;
//       }
      
//       if (file.size > 5 * 1024 * 1024) { // 5MB limit
//         setSnackbar({
//           open: true,
//           message: 'Image size should be less than 5MB',
//           severity: 'error'
//         });
//         return;
//       }
      
//       setProfileImage(file);
//       setPreviewImage(URL.createObjectURL(file));
//     }
//   };

//   const handleUploadClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleImageUpload = async () => {
//     if (!profileImage) return;

//     const formData = new FormData();
//     formData.append('profilePicture', profileImage);

//     try {
//       const response = await axios.put(
//         `/api/teachers/upload-profile/${currentUser._id}`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       setSnackbar({
//         open: true,
//         message: 'Profile picture updated successfully!',
//         severity: 'success'
//       });
      
//       // Here you would typically update the user data in your Redux store
//       // or refetch the user data to get the updated profile picture URL
      
//     } catch (error) {
//       console.error('Error uploading profile picture:', error);
//       setSnackbar({
//         open: true,
//         message: 'Failed to upload profile picture',
//         severity: 'error'
//       });
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//   };

//   const teachSclass = currentUser.teachSclass;
//   const teachSubject = currentUser.teachSubject;
//   const teachSchool = currentUser.school;

//   return (
//     <ProfileContainer>
//       <ProfileCard>
//         <CardContent>
//           {/* Header Section */}
//           <HeaderSection>
//             <ProfileImageContainer>
//               <ProfileImage 
//                 src={previewImage || "https://via.placeholder.com/120"} 
//                 alt="Profile" 
//               />
//               <UploadOverlay onClick={handleUploadClick}>
//                 <CameraIcon style={{ color: 'white', fontSize: 30 }} />
//               </UploadOverlay>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageChange}
//                 accept="image/*"
//                 style={{ display: 'none' }}
//               />
//             </ProfileImageContainer>
//             <ProfileMainInfo>
//               <TeacherName variant="h4">{currentUser.name}</TeacherName>
//               <TeacherEmail>
//                 <EmailIcon style={{ fontSize: 20, marginRight: 10, color: '#666' }} />
//                 {currentUser.email}
//               </TeacherEmail>
//               {profileImage && (
//                 <UploadButton 
//                   variant="contained" 
//                   color="primary"
//                   onClick={handleImageUpload}
//                 >
//                   Save Profile Picture
//                 </UploadButton>
//               )}
//             </ProfileMainInfo>
//           </HeaderSection>

//           <StyledDivider />

//           {/* Information Grid */}
//           <InfoGrid>
//             <InfoBox>
//               <InfoIcon className="class">
//                 <ClassIcon style={{ fontSize: 24 }} />
//               </InfoIcon>
//               <InfoDetails>
//                 <InfoTitle>Class</InfoTitle>
//                 <InfoContent>{teachSclass?.sclassName || 'Not assigned'}</InfoContent>
//               </InfoDetails>
//             </InfoBox>

//             <InfoBox>
//               <InfoIcon className="subject">
//                 <BookIcon style={{ fontSize: 24 }} />
//               </InfoIcon>
//               <InfoDetails>
//                 <InfoTitle>Subject</InfoTitle>
//                 <InfoContent>{teachSubject?.subName || 'Not assigned'}</InfoContent>
//               </InfoDetails>
//             </InfoBox>

//             <InfoBox>
//               <InfoIcon className="school">
//                 <SchoolIcon style={{ fontSize: 24 }} />
//               </InfoIcon>
//               <InfoDetails>
//                 <InfoTitle>School</InfoTitle>
//                 <InfoContent>{teachSchool?.schoolName || 'Not assigned'}</InfoContent>
//               </InfoDetails>
//             </InfoBox>
//           </InfoGrid>
//         </CardContent>
//       </ProfileCard>

//       {/* Notification Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity={snackbar.severity}
//           sx={{ width: '100%' }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </ProfileContainer>
//   );
// };

// export default TeacherProfile;

// // Styled Components
// const ProfileContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   min-height: 100vh;
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//   padding: 20px;
// `;

// const ProfileCard = styled(Card)`
//   && {
//     width: 100%;
//     max-width: 600px;
//     border-radius: 16px;
//     box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//     background: white;
//     overflow: hidden;
//   }
// `;

// const HeaderSection = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 24px;
//   margin-bottom: 20px;
  
//   @media (max-width: 600px) {
//     flex-direction: column;
//     text-align: center;
//   }
// `;

// const ProfileImageContainer = styled.div`
//   position: relative;
//   cursor: pointer;
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: scale(1.05);
//   }
// `;

// const ProfileImage = styled.img`
//   width: 120px;
//   height: 120px;
//   border-radius: 12px;
//   object-fit: cover;
//   border: 3px solid #f0f0f0;
// `;

// const UploadOverlay = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   border-radius: 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   opacity: 0;
//   transition: opacity 0.3s ease;
  
//   ${ProfileImageContainer}:hover & {
//     opacity: 1;
//   }
// `;

// const ProfileMainInfo = styled.div`
//   flex: 1;
// `;

// const TeacherName = styled(Typography)`
//   && {
//     font-weight: 700;
//     color: #2c3e50;
//     margin-bottom: 12px;
//     font-size: 2rem;
//   }
// `;

// const TeacherEmail = styled.div`
//   display: flex;
//   align-items: center;
//   color: #666;
//   font-size: 16px;
//   font-weight: 500;
//   margin-bottom: 15px;
  
//   @media (max-width: 600px) {
//     justify-content: center;
//   }
// `;

// const UploadButton = styled(Button)`
//   && {
//     margin-top: 10px;
//     text-transform: none;
//     border-radius: 8px;
//     padding: 8px 16px;
//     font-weight: 500;
//   }
// `;

// const StyledDivider = styled(Divider)`
//   && {
//     margin: 24px 0;
//     background-color: #e0e0e0;
//   }
// `;

// const InfoGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//   gap: 20px;
// `;

// const InfoBox = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 20px;
//   background: #fafafa;
//   border-radius: 12px;
//   border: 1px solid #e8e8e8;
//   transition: all 0.3s ease;
  
//   &:hover {
//     background: #f0f0f0;
//     transform: translateY(-2px);
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   }
// `;

// const InfoIcon = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-right: 16px;
  
//   &.class {
//     background: #e3f2fd;
//     color: #1976d2;
//   }
  
//   &.subject {
//     background: #e8f5e8;
//     color: #388e3c;
//   }
  
//   &.school {
//     background: #f3e5f5;
//     color: #7b1fa2;
//   }
// `;

// const InfoDetails = styled.div`
//   flex: 1;
// `;

// const InfoTitle = styled.div`
//   font-size: 12px;
//   font-weight: 600;
//   color: #666;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   margin-bottom: 6px;
// `;

// const InfoContent = styled.div`
//   font-size: 16px;
//   font-weight: 600;
//   color: #2c3e50;
//   line-height: 1.2;
// `;