import { Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Assignment from "../../assets/assignment.gif";
import BottomRightImage from "../../assets/img5.gif";
import Teachers from "../../assets/img6.gif";
import Subject from "../../assets/subjects.gif";
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import SeeNotice from '../../components/SeeNotice';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);
 
    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: 'relative', minHeight: '100vh' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={4}>
                    <StyledCard>
                        <CardContent>
                            <ImageWrapper>
                                <img src={Subject} alt="Subjects" />
                            </ImageWrapper>
                            <Title>Total Subjects</Title>
                            <Data start={0} end={subjectsList.length} duration={2.5} />
                        </CardContent>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <StyledCard>
                        <CardContent>
                            <ImageWrapper>
                                <img src={Assignment} alt="Assignments" />
                            </ImageWrapper>
                            <Title>Total Assignments</Title>
                            <Data start={0} end={15} duration={4} />
                        </CardContent>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                    <ChartContainer>
                        {loading ? (
                            <Typography variant="h6">Loading...</Typography>
                        ) : response ? (
                            <Typography variant="h6">No Attendance Found</Typography>
                        ) : (
                            subjectAttendance && subjectAttendance.length > 0 ? (
                                <CustomPieChart data={chartData} />
                            ) : (
                                <Typography variant="h6">No Attendance Found</Typography>
                            )
                        )}
                    </ChartContainer>
                </Grid>
                <Grid item xs={12}>
                    <StyledPaper>
                        <SeeNotice />
                    </StyledPaper>
                </Grid>
            </Grid>

            {/* Bottom Right Image */}
            <BottomRightImageWrapper>
                <BottomRightImageStyled src={BottomRightImage} alt="Bottom Right" />
            </BottomRightImageWrapper>

            {/* Bottom Left Image */}
            <BottomLeftImageWrapper>
                <BottomLeftImageStyled src={Teachers} alt="Bottom Left" />
            </BottomLeftImageWrapper>
        </Container>
    );
};

// Styled Components
const StyledCard = styled(Card)`
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 16px;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
`;

const Title = styled(Typography)`
    font-size: 1.5rem;
    margin: 12px 0;
    font-weight: bold;
`;

const ImageWrapper = styled.div`
    margin-bottom: 12px;
    img {
        width: 50px;
        height: 50px;
    }
`;

const ChartContainer = styled.div`
    padding: 2px;
    display: flex;
    flex-direction: column;
    height: 240px;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    background-color: #f9f9f9;
`;

const StyledPaper = styled.div`
    padding: 16px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
`;

// Bottom-Right Image Styling
const BottomRightImageWrapper = styled.div`
    position: fixed;
    bottom: -10px;
    right: 200px;
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
    left: 210px;
    z-index: 1;
`;

const BottomLeftImageStyled = styled.img`
    width: 460px;
    height: auto;
`;
const Data = styled(CountUp)`
  font-size: calc(1.5rem + .8vw); // Responsive font size
  color: #4caf50; // Material Green color
  font-weight: bold;
`;

export default StudentHomePage;
