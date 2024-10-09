import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Person as PersonIcon, Email as EmailIcon, Class as ClassIcon, Book as BookIcon, School as SchoolIcon } from '@mui/icons-material';

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
    <ProfileCard>
      <ProfileCardContent>
        <ProfileHeader>
          <ProfileImage src="https://via.placeholder.com/100" alt="Profile" />
          <ProfileInfo>
            <ProfileName>{currentUser.name}</ProfileName>
            <DetailText>{currentUser.email}</DetailText>
          </ProfileInfo>
        </ProfileHeader>
        <DetailsContainer>
          <ProfileDetail>
            <ClassIcon style={{ marginRight: 8 }} />
            <DetailText>Class: {teachSclass.sclassName}</DetailText>
          </ProfileDetail>
          <ProfileDetail>
            <BookIcon style={{ marginRight: 8 }} />
            <DetailText>Subject: {teachSubject.subName}</DetailText>
          </ProfileDetail>
          <ProfileDetail>
            <SchoolIcon style={{ marginRight: 8 }} />
            <DetailText>School: {teachSchool.schoolName}</DetailText>
          </ProfileDetail>
        </DetailsContainer>
      </ProfileCardContent>
    </ProfileCard>
  );
};

export default TeacherProfile;

// Styled Components
const ProfileCard = styled(Card)`
  margin: 20px;
  width: 350px;
  border-radius: 15px;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.6s ease-in-out;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  }
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns items to the start of the flex container */
  padding: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Circular profile image */
  border: 2px solid #007bff; /* Blue border around image */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px; /* Space between image and name */
`;

const ProfileName = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  color: #343a40;
`;

const DetailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  transition: color 0.3s ease; /* Smooth color transition */

  &:hover {
    color: #007bff; /* Change color on hover */
  }
`;

const DetailText = styled.span`
  font-size: 16px;
  color: #495057; /* Text color for details */
`;
