import { Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <HeroContainer>
            <BackgroundVideo autoPlay muted loop>
                <source src={require('../assets/video1.mp4')} type="video/mp4" />
                Your browser does not support the video tag.
            </BackgroundVideo>
            <ContentWrapper> 
                <Grid container spacing={0} alignItems="center" justifyContent="space-between">
                    <Grid item xs={12} md={6} container justifyContent="flex-start">
                        <FloatingImage
                            src={Students}
                            alt="students"
                            initial={{ opacity: 0, x: -90 }}
                            animate={{ opacity: 1, x: 10 }}
                            transition={{ duration: 1.5 }}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="center">
                        <motion.div
                            initial={{ opacity: 0, y: 70 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.7 }}
                        >
                            <AnimatedCard>
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", color: "#333" }}
                                >
                                    Welcome!..
                                    <br />
                                    Class Management System
                                    <br />
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    style={{ fontFamily: "'Roboto', sans-serif", color: "#555", fontSize: "16px", lineHeight: "1.6" }}
                                >
                                    Streamline Class Management,<br /> 
                                    class organization, and add students and faculty.<br />
                                    Seamlessly track attendance, assess performance, and provide feedback.
                                    Access records, view marks, and communicate effortlessly.
                                </motion.p>
                                <StyledBox>
                                    <motion.div
                                        whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <StyledLink to="/choose">
                                            <GlowingButton variant="contained" fullWidth>
                                                Login
                                            </GlowingButton>
                                        </StyledLink>
                                    </motion.div>
                                    <motion.div
                                        whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <StyledLink to="/chooseasguest">
                                            {/* <RippleButton variant="outlined" fullWidth>
                                                Login as Guest
                                            </RippleButton> */}
                                        </StyledLink>
                                    </motion.div>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.3 }}
                                        style={{ fontFamily: "'Roboto', sans-serif", color: "#777" }}
                                    >
                                        Don't have an account?{' '}
                                        <Link to="/Adminregister" style={{ color: "#550080", fontWeight: "bold" }}>
                                            Sign up
                                        </Link>
                                    </motion.p>
                                </StyledBox>
                            </AnimatedCard>
                        </motion.div>
                    </Grid>
                </Grid>
            </ContentWrapper>
        </HeroContainer>
    );
};

export default Homepage;

const FloatingImage = styled(motion.img)`
    width: 150%;  /* Ensure the image takes the full width of its container */
    max-width: 500px;  /* Adjust this value to increase or decrease the size */
    height: auto;  /* Maintain aspect ratio */
    animation: float 6s ease-in-out infinite;
    margin-left: 0; /* Aligns the image to the left */
    text-align: left; /* Aligns content to the left */
`;

const AnimatedCard = styled(motion.div)`
    width: 87%; /* Adjust this value to decrease the size */
    max-width: 500px; /* Ensures it doesn't grow too large on wider screens */
    padding: 22px;
    background-color: rgba(255, 255, 255, 0.85);
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    transform: translateY(0);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
        transform: translateY(-15px);
        box-shadow: 0px 12px 35px rgba(0, 0, 0, 0.4);
    }
`;

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
    padding: 24px;
`;

const GlowingButton = styled(LightPurpleButton)`
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
        background-color: #7f56da;
        color: #fff;
        box-shadow: 0px 0px 20px rgba(127, 86, 218, 0.8);
    }
`;

const RippleButton = styled(Button)`
    color: #7f56da;
    border-color: #7f56da;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: color 0.3s ease, border-color 0.3s ease;
    
    &:hover {
        background-color: #7f56da;
        color: white;
        border-color: #7f56da;
    }

    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300%;
        height: 300%;
        background: rgba(127, 86, 218, 0.3);
        transition: width 0.4s ease, height 0.4s ease;
        transform: translate(-50%, -50%) scale(1);
        opacity: 0;
        border-radius: 50%;
        z-index: -1;
    }

    &:hover:after {
        width: 0;
        height: 0;
        opacity: 1;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    width: 100%;
`;

const HeroContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow: hidden;
`;

const BackgroundVideo = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 1;
`;




















//     import { Box, Button, Grid } from '@mui/material';
// import { motion } from 'framer-motion';
// import React from 'react';
// import { Link } from 'react-router-dom';
// import styled from 'styled-components';
// import Students from "../assets/students.svg";
// import { LightPurpleButton } from '../components/buttonStyles';

// const Homepage = () => {
//     return (
//         <HeroContainer>
//             <Grid container spacing={0} alignItems="center" justifyContent="space-between">
//                 <Grid item xs={12} md={6}>
//                     <FloatingImage
//                         src={Students}
//                         alt="students"
//                         initial={{ opacity: 0, x: -90 }}
//                         animate={{ opacity: 1, x: 10 }}
//                         transition={{ duration: 1.5 }}
//                     />
//                 </Grid>
//                 <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="center">
//                     <motion.div
//                         initial={{ opacity: 0, y: 70 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 1, delay: 0.7 }}
//                     >
//                         <AnimatedCard>
//                             <motion.h1
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.8 }}
//                                 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", color: "#333" }}
//                             >
//                                 Welcome!..
//                                 <br />
//                                 Class Management System
//                                 <br />
//                             </motion.h1>
//                             <motion.p
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 1 }}
//                                 style={{ fontFamily: "'Roboto', sans-serif", color: "#555", fontSize: "16px", lineHeight: "1.6" }}
//                             >
//                                 Streamline Class Management,<br /> 
//                                 class organization, and add students and faculty.<br />
//                                 Seamlessly track attendance, assess performance, and provide feedback.
//                                 Access records, view marks, and communicate effortlessly.
//                             </motion.p>
//                             <StyledBox>
//                                 <motion.div
//                                     whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}
//                                     whileTap={{ scale: 0.95 }}
//                                 >
//                                     <StyledLink to="/choose">
//                                         <GlowingButton variant="contained" fullWidth>
//                                             Login
//                                         </GlowingButton>
//                                     </StyledLink>
//                                 </motion.div>
//                                 <motion.div
//                                     whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}
//                                     whileTap={{ scale: 0.95 }}
//                                 >
//                                     <StyledLink to="/chooseasguest">
//                                         <RippleButton variant="outlined" fullWidth>
//                                             Login as Guest
//                                         </RippleButton>
//                                     </StyledLink>
//                                 </motion.div>
//                                 <motion.p
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ delay: 1.3 }}
//                                     style={{ fontFamily: "'Roboto', sans-serif", color: "#777" }}
//                                 >
//                                     Don't have an account?{' '}
//                                     <Link to="/Adminregister" style={{ color: "#550080", fontWeight: "bold" }}>
//                                         Sign up
//                                     </Link>
//                                 </motion.p>
//                             </StyledBox>
//                         </AnimatedCard>
//                     </motion.div>
//                 </Grid>
//             </Grid>
//         </HeroContainer>
//     );
// };

// export default Homepage;

// const FloatingImage = styled(motion.img)`
//     width: 100%;
//     animation: float 6s ease-in-out infinite;

//     @keyframes float {
//         0% { transform: translateY(0px); }
//         50% { transform: translateY(-20px); }
//         100% { transform: translateY(0px); }
//     }
// `;

// const AnimatedCard = styled(motion.div)`
//     width: 87%; /* Adjust this value to decrease the size */
//     max-width: 500px; /* Ensures it doesn't grow too large on wider screens */
//     padding: 32px;
//     background-color: rgba(255, 255, 255, 0.85);
//     box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3);
//     border-radius: 24px;
//     backdrop-filter: blur(20px);
//     transform: translateY(0);
//     transition: transform 0.3s ease, box-shadow 0.3s ease;
    
//     &:hover {
//         transform: translateY(-15px);
//         box-shadow: 0px 12px 35px rgba(0, 0, 0, 0.4);
//     }
// `;

// const StyledBox = styled(Box)`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     gap: 24px;
//     padding: 24px;
// `;

// const GlowingButton = styled(LightPurpleButton)`
//     transition: all 0.3s ease;
//     position: relative;
//     overflow: hidden;

//     &:hover {
//         background-color: #7f56da;
//         color: #fff;
//         box-shadow: 0px 0px 20px rgba(127, 86, 218, 0.8);
//     }
// `;

// const RippleButton = styled(Button)`
//     color: #7f56da;
//     border-color: #7f56da;
//     position: relative;
//     overflow: hidden;
//     z-index: 1;
//     transition: color 0.3s ease, border-color 0.3s ease;
    
//     &:hover {
//         background-color: #7f56da;
//         color: white;
//         border-color: #7f56da;
//     }

//     &:after {
//         content: '';
//         position: absolute;
//         top: 50%;
//         left: 50%;
//         width: 300%;
//         height: 300%;
//         background: rgba(127, 86, 218, 0.3);
//         transition: width 0.4s ease, height 0.4s ease;
//         transform: translate(-50%, -50%) scale(1);
//         opacity: 0;
//         border-radius: 50%;
//         z-index: -1;
//     }

//     &:hover:after {
//         width: 0;
//         height: 0;
//         opacity: 1;
//     }
// `;

// const StyledLink = styled(Link)`
//     text-decoration: none;
//     width: 100%;
// `;

// const HeroContainer = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 100vh;
//     width: 100vw;
//     margin: 0;
//     padding: 0;
//     overflow: hidden;
//     background: linear-gradient(135deg, #f0f, #0ff);
//     background-size: 400% 400%;
//     animation: gradientBackground 15s ease infinite;

//     @keyframes gradientBackground {
//         0% { background-position: 0% 50%; }
//         50% { background-position: 100% 50%; }
//         100% { background-position: 0% 50%; }
//     }
// `;





    // import React from 'react';
    // import { Link } from 'react-router-dom';
    // import { Container, Grid, Box, Button } from '@mui/material';
    // import styled from 'styled-components';
    // import Students from "../assets/students.svg";
    // import { LightPurpleButton } from '../components/buttonStyles';

    // const Homepage = () => {
    //     return (
    //         <StyledContainer>
    //             <Grid container spacing={1}>
    //                 <Grid item xs={12} md={6}>
    //                     <img src={Students} alt="students" style={{ width: '100%' }} />
    //                 </Grid>
    //                 <Grid item xs={12} md={6}>
    //                     <StyledPaper elevation={4}>
    //                         <StyledTitle>
    //                             Welcome to
    //                             <br />
    //                             Class Management
    //                             <br />
    //                             System
    //                         </StyledTitle>
    //                         <StyledText>
    //                             Streamline school management, class organization, and add students and faculty.
    //                             Seamlessly track attendance, assess performance, and provide feedback.
    //                             Access records, view marks, and communicate effortlessly.
    //                         </StyledText>
    //                         <StyledBox>
    //                             <StyledLink to="/choose">
    //                                 <LightPurpleButton variant="contained" fullWidth>
    //                                     Login
    //                                 </LightPurpleButton>
    //                             </StyledLink>
    //                             <StyledLink to="/chooseasguest">
    //                                 <Button variant="outlined" fullWidth
    //                                     sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
    //                                 >
    //                                     Login as Guest
    //                                 </Button>
    //                             </StyledLink>
    //                             <StyledText>
    //                                 Don't have an account?{' '}
    //                                 <Link to="/Adminregister" style={{color:"#550080"}}>
    //                                     Sign up
    //                                 </Link>
    //                             </StyledText>
    //                         </StyledBox>
    //                     </StyledPaper>
    //                 </Grid>
    //             </Grid>
    //         </StyledContainer>
    //     );
    // };

    // export default Homepage;

    // const StyledContainer = styled(Container)`
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // height: 100vh;
    // `;

    // const StyledPaper = styled.div`
    // padding: 24px;
    // height: 100vh;
    // `;

    // const StyledBox = styled(Box)`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content:center;
    // gap: 16px;
    // padding: 24px;
    // `;

    // const StyledTitle = styled.h1`
    // font-size: 3rem;
    // color: #252525;
    // /* font-family: "Manrope"; */
    // font-weight: bold;
    // padding-top: 0;
    // letter-spacing: normal;
    // line-height: normal;
    // `;

    // const StyledText = styled.p`
    // /* color: #550080; */
    // margin-top: 30px;
    // margin-bottom: 30px; 
    // letter-spacing: normal;
    // line-height: normal;
    // `;

    // const StyledLink = styled(Link)`
    // text-decoration: none;
    // `;

    // import { Box, Button, Grid } from '@mui/material';
    // import { motion } from 'framer-motion';
    // import React from 'react';
    // import { Link } from 'react-router-dom';
    // import styled from 'styled-components';
    // import Students from "../assets/students.svg";
    // import { LightPurpleButton } from '../components/buttonStyles';
    
    // const Homepage = () => {
    //     return (
    //         <HeroContainer>
    //             <Grid container spacing={0} alignItems="center" justifyContent="space-between">
    //                 <Grid item xs={12} md={6}>
    //                     <FloatingImage
    //                         src={Students}
    //                         alt="students"
    //                         initial={{ opacity: 0, x: -90 }}
    //                         animate={{ opacity: 1, x: 10 }}
    //                         transition={{ duration: 1.5 }}
    //                     />
    //                 </Grid>
    //                 <Grid item xs={12} md={6} container justifyContent="flex-end" alignItems="center">
    //                     <motion.div
    //                         initial={{ opacity: 0, y: 70 }}
    //                         animate={{ opacity: 1, y: 0 }}
    //                         transition={{ duration: 1, delay: 0.7 }}
    //                     >
    //                         <AnimatedCard>
    //                             <motion.h1
    //                                 initial={{ opacity: 0, y: 20 }}
    //                                 animate={{ opacity: 1, y: 0 }}
    //                                 transition={{ delay: 0.8 }}
    //                                 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold", color: "#333" }}
    //                             >
    //                                 Welcome!..
    //                                 <br />
    //                                 Class Management System
    //                                 <br />
    //                             </motion.h1>
    //                             <motion.p
    //                                 initial={{ opacity: 0, y: 20 }}
    //                                 animate={{ opacity: 1, y: 0 }}
    //                                 transition={{ delay: 1 }}
    //                                 style={{ fontFamily: "'Roboto', sans-serif", color: "#555", fontSize: "16px", lineHeight: "1.6" }}
    //                             >
    //                                 Streamline Class Management, class organization, and add students and faculty.
    //                                 Seamlessly track attendance, assess performance, and provide feedback.
    //                                 Access records, view marks, and communicate effortlessly.
    //                             </motion.p>
    //                             <StyledBox>
    //                                 <motion.div
    //                                     whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}
    //                                     whileTap={{ scale: 0.95 }}
    //                                 >
    //                                     <StyledLink to="/choose">
    //                                         <GlowingButton variant="contained" fullWidth>
    //                                             Login
    //                                         </GlowingButton>
    //                                     </StyledLink>
    //                                 </motion.div>
    //                                 <motion.div
    //                                     whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}
    //                                     whileTap={{ scale: 0.95 }}
    //                                 >
    //                                     <StyledLink to="/chooseasguest">
    //                                         <RippleButton variant="outlined" fullWidth>
    //                                             Login as Guest
    //                                         </RippleButton>
    //                                     </StyledLink>
    //                                 </motion.div>
    //                                 <motion.p
    //                                     initial={{ opacity: 0 }}
    //                                     animate={{ opacity: 1 }}
    //                                     transition={{ delay: 1.3 }}
    //                                     style={{ fontFamily: "'Roboto', sans-serif", color: "#777" }}
    //                                 >
    //                                     Don't have an account?{' '}
    //                                     <Link to="/Adminregister" style={{ color: "#550080", fontWeight: "bold" }}>
    //                                         Sign up
    //                                     </Link>
    //                                 </motion.p>
    //                             </StyledBox>
    //                         </AnimatedCard>
    //                     </motion.div>
    //                 </Grid>
    //             </Grid>
    //         </HeroContainer>
    //     );
    // };
    
    // export default Homepage;
    
    // const FloatingImage = styled(motion.img)`
    //     width: 100%;
    //     animation: float 6s ease-in-out infinite;
    
    //     @keyframes float {
    //         0% { transform: translateY(0px); }
    //         50% { transform: translateY(-20px); }
    //         100% { transform: translateY(0px); }
    //     }
    // `;
    
    // const AnimatedCard = styled(motion.div)`
    //     padding: 22px;
    //     background-color: rgba(255, 255, 255, 0.85);
    //     box-shadow: 10px 8px 30px rgba(0, 0, 0, 0.3);
    //     border-radius: 34px;
    //     backdrop-filter: blur(20px);
    //     transform: translateY(0);
    //     transition: transform 0.3s ease, box-shadow 0.3s ease;
        
    //     &:hover {
    //         transform: translateY(-15px);
    //         box-shadow: 0px 12px 35px rgba(0, 0, 0, 0.4);
    //     }
    // `;
    
    // const StyledBox = styled(Box)`
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     justify-content: center;
    //     gap: 24px;
    //     padding: 24px;
    // `;
    
    // const GlowingButton = styled(LightPurpleButton)`
    //     transition: all 0.3s ease;
    //     position: relative;
    //     overflow: hidden;
    
    //     &:hover {
    //         background-color: #7f56da;
    //         color: #fff;
    //         box-shadow: 0px 0px 20px rgba(127, 86, 218, 0.8);
    //     }
    // `;
    
    // const RippleButton = styled(Button)`
    //     color: #7f56da;
    //     border-color: #7f56da;
    //     position: relative;
    //     overflow: hidden;
    //     z-index: 1;
    //     transition: color 0.3s ease, border-color 0.3s ease;
        
    //     &:hover {
    //         background-color: #7f56da;
    //         color: white;
    //         border-color: #7f56da;
    //     }
    
    //     &:after {
    //         content: '';
    //         position: absolute;
    //         top: 50%;
    //         left: 50%;
    //         width: 300%;
    //         height: 300%;
    //         background: rgba(127, 86, 218, 0.3);
    //         transition: width 0.4s ease, height 0.4s ease;
    //         transform: translate(-50%, -50%) scale(1);
    //         opacity: 0;
    //         border-radius: 50%;
    //         z-index: -1;
    //     }
    
    //     &:hover:after {
    //         width: 0;
    //         height: 0;
    //         opacity: 1;
    //     }
    // `;
    
    // const StyledLink = styled(Link)`
    //     text-decoration: none;
    //     width: 100%;
    // `;
    
    // const HeroContainer = styled.div`
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     height: 100vh;
    //     width: 100vw;
    //     margin: 0;
    //     padding: 0;
    //     overflow: hidden;
    //     background: linear-gradient(135deg, #f0f, #0ff);
    //     background-size: 400% 400%;
    //     animation: gradientBackground 15s ease infinite;
    
    //     @keyframes gradientBackground {
    //         0% { background-position: 0% 50%; }
    //         50% { background-position: 100% 50%; }
    //         100% { background-position: 0% 50%; }
    //     }
    // `;
    