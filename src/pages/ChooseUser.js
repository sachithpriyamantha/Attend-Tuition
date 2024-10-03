import { AccountCircle, Group, School } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Popup from '../components/Popup';
import { loginUser } from '../redux/userRelated/userHandle';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    if (user === "Admin") {
      if (visitor === "guest") {
        const email = "yogendra@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        const rollNum = "1";
        const studentName = "Dipesh Awasthi";
        const fields = { rollNum, studentName, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        const email = "tony@12";
        const fields = { email, password };
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'Admin') {
        navigate('/Admin/dashboard');
      } else if (currentRole === 'Student') {
        navigate('/Student/dashboard');
      } else if (currentRole === 'Teacher') {
        navigate('/Teacher/dashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      {/* Background Video */}
      <VideoBackground autoPlay loop muted>
        <source src={require('../assets/video.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      <StyledHeader>Choose User..!</StyledHeader>
      <ContentContainer>
        <Container>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <StyledPaper onClick={() => navigateHandler("Admin")} elevation={6}>
                <IconWrapper>
                  <AccountCircle fontSize="large" />
                </IconWrapper>
                <StyledTypography>
                  Admin
                </StyledTypography>
                Login as an administrator to access the dashboard to manage app data, add attendance!!
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledPaper onClick={() => navigateHandler("Student")} elevation={6}>
                <IconWrapper>
                  <School fontSize="large" />
                </IconWrapper>
                <StyledTypography>
                  Student
                </StyledTypography>
                Login as a student to explore course materials, assignments, and mark attendance.
              </StyledPaper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StyledPaper onClick={() => navigateHandler("Teacher")} elevation={6}>
                <IconWrapper>
                  <Group fontSize="large" />
                </IconWrapper>
                <StyledTypography>
                  Teacher
                </StyledTypography>
                Login as a teacher to create courses, assignments, and track student progress.
              </StyledPaper>
            </Grid>
          </Grid>
        </Container>
      </ContentContainer>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

// Video Background Styling
const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
  filter: brightness(50%); /* Adjust for darker background */
`;

// Gradient animation for background
const gradientAnimation = keyframes`
  0% {
    background-color: rgb(0, 170, 255);
  }
  50% {
    background-color: rgb(0, 77, 153);
  }
  100% {
    background-color: rgb(0, 170, 255);
  }
`;

// Card entrance animation
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Hover effect with scale
const hoverEffect = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  100% {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }
`;

// Typing animation
const typingAnimation = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

// Blinking animation
const blinkingAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;

const StyledContainer = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledHeader = styled.h1`
  position: absolute;
  top: 20px;
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  white-space: nowrap;
  animation: ${typingAnimation} 4s steps(40, end) 1s forwards, ${blinkingAnimation} 1s step-start 4s infinite;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 30px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  color: rgb(51, 51, 51);
  cursor: pointer;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  border-radius: 20px;
  animation: ${fadeInUp} 1.2s ease-out;

  &:hover {
    animation: ${hoverEffect} 0.4s forwards ease-in-out;
    background-color: rgba(255, 255, 255, 0.85);
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  font-size: 1.8rem;
  font-weight: 500;
  color: rgb(51, 51, 51);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
`;

// Wrapper for the icon with subtle animation
const IconWrapper = styled(Box)`
  margin-bottom: 15px;
  font-size: 2.2rem;
  color: rgb(0, 170, 255);
  transition: transform 0.3s ease-in-out;
  animation: ${fadeInUp} 1.5s ease-out;

  &:hover {
    transform: translateY(-8px);
  }
`;
