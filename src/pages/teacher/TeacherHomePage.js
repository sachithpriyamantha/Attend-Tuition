import { Container, Grid, Paper, Typography } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.gif";
import Lessons from "../../assets/subjects.gif";
import Tests from "../../assets/assignment.gif";
import Time from "../../assets/time.gif";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <StyledImage src={Students} alt="Students" />
                        <StyledTitle>Class Students</StyledTitle>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <StyledImage src={Lessons} alt="Lessons" />
                        <StyledTitle>Total Lessons</StyledTitle>
                        <Data start={0} end={numberOfSessions} duration={5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <StyledImage src={Tests} alt="Tests" />
                        <StyledTitle>Tests Taken</StyledTitle>
                        <Data start={0} end={24} duration={4} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <StyledImage src={Time} alt="Time" />
                        <StyledTitle>Total Hours</StyledTitle>
                        <Data start={0} end={30} duration={4} suffix=" hrs" />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <StyledNoticePaper>
                        <SeeNotice />
                    </StyledNoticePaper>
                </Grid>
            </Grid>
        </Container>
    );
};

const StyledPaper = styled(Paper)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f9f9f9; // Light background for contrast
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05); // Subtle hover effect
  }
`;

const StyledNoticePaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled.img`
  width: 60px; // Set a consistent size for icons
  height: auto;
`;

const StyledTitle = styled(Typography)`
  font-size: 1.5rem; // Increased font size
  font-weight: bold;
  margin: 12px 0;
  color: #333; // Darker color for better visibility
`;

const Data = styled(CountUp)`
  font-size: calc(1.5rem + .8vw); // Responsive font size
  color: #4caf50; // Material Green color
  font-weight: bold;
`;

export default TeacherHomePage;
