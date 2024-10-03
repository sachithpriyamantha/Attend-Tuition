import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import Students from "../../assets/img1.gif";
import Classes from "../../assets/img2.gif";
import Teachers from "../../assets/img3.gif"; // We'll use this image for bottom-left corner too.
import Fees from "../../assets/img4.gif";
import BottomRightImage from "../../assets/img5.gif";
import BottomlefttImage from "../../assets/img6.gif";
import styled from 'styled-components';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllSclasses } from '../../redux/sclassRelated/sclassHandle';
import { getAllStudents } from '../../redux/studentRelated/studentHandle';
import { getAllTeachers } from '../../redux/teacherRelated/teacherHandle';

const AdminHomePage = () => {
    const dispatch = useDispatch();
    const { studentsList } = useSelector((state) => state.student);
    const { sclassesList } = useSelector((state) => state.sclass);
    const { teachersList } = useSelector((state) => state.teacher);
    const { currentUser } = useSelector(state => state.user);
    const adminID = currentUser._id;

    useEffect(() => {
        dispatch(getAllStudents(adminID));
        dispatch(getAllSclasses(adminID, "Sclass"));
        dispatch(getAllTeachers(adminID));
    }, [adminID, dispatch]);

    const numberOfStudents = studentsList && studentsList.length;
    const numberOfClasses = sclassesList && sclassesList.length;
    const numberOfTeachers = teachersList && teachersList.length;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, minHeight: '100vh', position: 'relative' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <StyledImage src={Students} alt="Students" />
                        <Title>Total Students</Title>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <StyledImage src={Classes} alt="Classes" />
                        <Title>Total Classes</Title>
                        <Data start={0} end={numberOfClasses} duration={5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <StyledImage src={Teachers} alt="Teachers" />
                        <Title>Total Teachers</Title>
                        <Data start={0} end={numberOfTeachers} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <StyledImage src={Fees} alt="Fees" />
                        <Title>Fees Collection</Title>
                        <Data start={0} end={23000} duration={2.5} prefix="Rs." />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <AnimatedNoticePaper>
                        <SeeNotice />
                    </AnimatedNoticePaper>
                </Grid>
            </Grid>
            {/* Bottom Right Image */}
            <BottomRightImageWrapper>
                <BottomRightImageStyled src={BottomRightImage} alt="Bottom Right" />
            </BottomRightImageWrapper>

            {/* Bottom Left Image */}
            <BottomLeftImageWrapper>
                <BottomLeftImageStyled src={BottomlefttImage} alt="Bottom Left" />
            </BottomLeftImageWrapper>
        </Container>
    );
};

// Styled Components
const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #ffffff;
`;

const StyledImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-size: 1.25rem;
  margin: 0;
  color: #333;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: #28a745;
`;

const AnimatedNoticePaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BottomRightImageWrapper = styled.div`
  position: fixed;
  bottom: -10px;
  right: -120px;
  z-index: 1;
`;

const BottomRightImageStyled = styled.img`
  width: 460px;
  height: auto;
`;

// Bottom-Left Image Styling
const BottomLeftImageWrapper = styled.div`
  position: fixed;
  bottom: -10px;
  left: -60px;
  z-index: 1;
`;

const BottomLeftImageStyled = styled.img`
  width: 460px; /* Adjust the size as needed */
  height: auto;
`;

export default AdminHomePage;
