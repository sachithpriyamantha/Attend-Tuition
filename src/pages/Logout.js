// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { authLogout } from '../redux/userRelated/userSlice';
// import styled from 'styled-components';

// const Logout = () => {
//     const currentUser = useSelector(state => state.user.currentUser);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleLogout = () => {
//         dispatch(authLogout());
//         navigate('/');
//     };

//     const handleCancel = () => {
//         navigate(-1);
//     };

//     return (
//         <LogoutContainer>
//             <h1>{currentUser.name}</h1>
//             <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
//             <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
//             <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
//         </LogoutContainer>
//     );
// };

// export default Logout;

// const LogoutContainer = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 10px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
//   background-color: #85769f66;
//   color: black;
// `;

// const LogoutMessage = styled.p`
//   margin-bottom: 20px;
//   font-size: 16px;
//   text-align: center;
// `;

// const LogoutButton = styled.button`
//   padding: 10px 20px;
//   margin-top: 10px;
//   border-radius: 5px;
//   font-size: 16px;
//   color: #fff;
//   cursor: pointer;

//   &:hover {
//     color: #fff;
//     background-color: #333;
//   }
// `;

// const LogoutButtonLogout = styled(LogoutButton)`
//   background-color: #ea0606;
// `;

// const LogoutButtonCancel = styled(LogoutButton)`
//   background-color: rgb(99, 60, 99);
// `;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled, { keyframes } from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const [showWarning, setShowWarning] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleWarningConfirm = () => {
        setShowWarning(false);
        handleLogout();
    };

    const handleWarningCancel = () => {
        setShowWarning(false);
    };

    return (
        <NeonBackground>
            <NeonCard>
                <h1>{currentUser ? currentUser.name : 'Guest'}</h1>
                <LogoutMessage>
                    {showWarning ? 'Are you sure you want to log out?' : 'Do you want to log out?'}
                </LogoutMessage>
                <ButtonContainer>
                    {showWarning ? (
                        <>
                            <NeonButton onClick={handleWarningConfirm} primary>Yes, Log Out</NeonButton>
                            <NeonButton onClick={handleWarningCancel}>Cancel</NeonButton>
                        </>
                    ) : (
                        <>
                            <NeonButton onClick={() => setShowWarning(true)} primary>Log Out</NeonButton>
                            <NeonButton onClick={handleCancel}>Cancel</NeonButton>
                        </>
                    )}
                </ButtonContainer>
            </NeonCard>
        </NeonBackground>
    );
};

export default Logout;

// Animated background gradient
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Entry animation for the card
const cardEntry = keyframes`
  from {
    opacity: 0;
    transform: rotateX(10deg) translateY(50px);
  }
  to {
    opacity: 1;
    transform: rotateX(0) translateY(0);
  }
`;

const NeonBackground = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #1f4037, #99f2c8, #645cfd, #ff00c8);
  background-size: 300% 300%;
  animation: ${gradientAnimation} 8s ease infinite;
`;

const NeonCard = styled.div`
  background: rgba(0, 0, 0, 0.85);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  color: #fff;
  box-shadow: 0px 0px 20px rgba(255, 0, 255, 0.3), 0px 0px 30px rgba(100, 92, 253, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.1);
  animation: ${cardEntry} 1s ease forwards;
  transform-style: preserve-3d;
  backdrop-filter: blur(8px);

  h1 {
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 0 0 10px #ff00c8, 0 0 20px #ff00c8;
  }
`;

const LogoutMessage = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 0 8px rgba(255, 0, 255, 0.6), 0 0 15px rgba(100, 92, 253, 0.7);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const NeonButton = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 30px;
  border: 2px solid ${({ primary }) => (primary ? '#ff00c8' : '#645cfd')};
  color: #fff;
  background: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-shadow: 0 0 5px #fff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px ${({ primary }) => (primary ? '#ff00c8' : '#645cfd')}, inset 0 0 10px rgba(255, 255, 255, 0.2);

  &:hover {
    box-shadow: 0 0 20px ${({ primary }) => (primary ? '#ff00c8' : '#645cfd')}, 0 0 30px ${({ primary }) => (primary ? '#ff00c8' : '#645cfd')};
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 0 10px ${({ primary }) => (primary ? '#ff00c8' : '#645cfd')}, 0 0 15px ${({ primary }) => (primary ? '#ff00c8' : '#645cfd')};
  }
`;




