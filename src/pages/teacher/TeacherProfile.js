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


import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { 
  Person as PersonIcon, 
  Email as EmailIcon, 
  Class as ClassIcon, 
  Book as BookIcon, 
  School as SchoolIcon
} from '@mui/icons-material';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);
  
  if (response) {
    console.log(response);
  } else if (error) {
    console.log(error);
  }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <ProfileContainer>
      <ProfileCard>
        <CardContent>
          {/* Header Section */}
          <HeaderSection>
            <ProfileImageContainer>
              <ProfileImage src="https://via.placeholder.com/120" alt="Profile" />
            </ProfileImageContainer>
            <ProfileMainInfo>
              <TeacherName variant="h4">{currentUser.name}</TeacherName>
              <TeacherEmail>
                <EmailIcon style={{ fontSize: 20, marginRight: 10, color: '#666' }} />
                {currentUser.email}
              </TeacherEmail>
            </ProfileMainInfo>
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
                <InfoContent>{teachSclass.sclassName}</InfoContent>
              </InfoDetails>
            </InfoBox>

            <InfoBox>
              <InfoIcon className="subject">
                <BookIcon style={{ fontSize: 24 }} />
              </InfoIcon>
              <InfoDetails>
                <InfoTitle>Subject</InfoTitle>
                <InfoContent>{teachSubject.subName}</InfoContent>
              </InfoDetails>
            </InfoBox>

            <InfoBox>
              <InfoIcon className="school">
                <SchoolIcon style={{ fontSize: 24 }} />
              </InfoIcon>
              <InfoDetails>
                <InfoTitle>School</InfoTitle>
                <InfoContent>{teachSchool.schoolName}</InfoContent>
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
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
`;

const ProfileImageContainer = styled.div`
  position: relative;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid #f0f0f0;
`;

const ProfileMainInfo = styled.div`
  flex: 1;
`;

const TeacherName = styled(Typography)`
  && {
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 12px;
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