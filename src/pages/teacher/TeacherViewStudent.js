import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography, Card, CardContent, Grid, Avatar, Chip } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp, Person, Class, School, Numbers } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart'
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const address = "Student"
    const studentID = params.id
    const teachSubject = currentUser.teachSubject?.subName
    const teachSubjectID = currentUser.teachSubject?._id

    useEffect(() => {
        dispatch(getUserDetails(studentID, address));
    }, [dispatch, studentID]);

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState('');
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const [openStates, setOpenStates] = useState({});

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || '');
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage, color: '#4CAF50' },  // Green
        { name: 'Absent', value: overallAbsentPercentage, color: '#F44336' }       // Red
    ];

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div style={{ padding: '20px' }}>
                    <Typography variant="h4" gutterBottom>
                        Student Details
                    </Typography>
                    
                    {/* Redesigned Basic Information Section */}
                    <Card elevation={3} sx={{ mb: 4, borderRadius: 3, overflow: 'hidden' }}>
                        <Box sx={{ 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            p: 3
                        }}>
                            <Box display="flex" alignItems="center" mb={2}>
                                <Avatar sx={{ 
                                    width: 60, 
                                    height: 60, 
                                    bgcolor: 'rgba(255,255,255,0.2)', 
                                    mr: 3,
                                    fontSize: '1.5rem'
                                }}>
                                    {userDetails?.name?.charAt(0)?.toUpperCase()}
                                </Avatar>
                                <Box>
                                    <Typography variant="h5" fontWeight="bold">
                                        {userDetails?.name}
                                    </Typography>
                                    <Chip 
                                        label="Student" 
                                        size="small" 
                                        sx={{ 
                                            bgcolor: 'rgba(255,255,255,0.2)', 
                                            color: 'white',
                                            mt: 1
                                        }} 
                                    />
                                </Box>
                            </Box>
                        </Box>
                        
                        <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box display="flex" alignItems="center" p={2} 
                                         sx={{ 
                                            bgcolor: '#f8f9ff', 
                                            borderRadius: 2,
                                            border: '1px solid #e3e6f3'
                                         }}>
                                        <Numbers sx={{ color: '#5c6ac4', mr: 2, fontSize: 28 }} />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                                Roll Number
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                                {userDetails?.rollNum || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box display="flex" alignItems="center" p={2} 
                                         sx={{ 
                                            bgcolor: '#fff8f0', 
                                            borderRadius: 2,
                                            border: '1px solid #f5e6d3'
                                         }}>
                                        <Class sx={{ color: '#f59e0b', mr: 2, fontSize: 28 }} />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                                Class
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                                {sclassName?.sclassName || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                
                                <Grid item xs={12} sm={6} md={6}>
                                    <Box display="flex" alignItems="center" p={2} 
                                         sx={{ 
                                            bgcolor: '#f0fdf4', 
                                            borderRadius: 2,
                                            border: '1px solid #d1fae5'
                                         }}>
                                        <School sx={{ color: '#10b981', mr: 2, fontSize: 28 }} />
                                        <Box>
                                            <Typography variant="body2" color="text.secondary" fontWeight="medium">
                                                School
                                            </Typography>
                                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                                {studentSchool?.schoolName || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Box mb={4}>
                        <Typography variant="h5" gutterBottom>
                            Attendance Overview
                        </Typography>
                        
                        {subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                            <>
                                {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(([subName, { present, allData, subId, sessions }], index) => {
                                    if (subName === teachSubject) {
                                        const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

                                        return (
                                            <Box key={index} mb={3}>
                                                <Table>
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            <StyledTableCell>Subject</StyledTableCell>
                                                            <StyledTableCell>Present</StyledTableCell>
                                                            <StyledTableCell>Total Sessions</StyledTableCell>
                                                            <StyledTableCell>Attendance Percentage</StyledTableCell>
                                                            <StyledTableCell align="center">Actions</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>

                                                    <TableBody>
                                                        <StyledTableRow>
                                                            <StyledTableCell>{subName}</StyledTableCell>
                                                            <StyledTableCell>{present}</StyledTableCell>
                                                            <StyledTableCell>{sessions}</StyledTableCell>
                                                            <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Button 
                                                                    variant="contained" 
                                                                    color="primary"
                                                                    onClick={() => handleOpen(subId)}
                                                                    endIcon={openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                                                >
                                                                    Details
                                                                </Button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        <StyledTableRow>
                                                            <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                                <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                                    <Box sx={{ margin: 1 }}>
                                                                        <Typography variant="h6" gutterBottom component="div">
                                                                            Attendance Details
                                                                        </Typography>
                                                                        <Table size="small" aria-label="purchases">
                                                                            <TableHead>
                                                                                <StyledTableRow>
                                                                                    <StyledTableCell>Date</StyledTableCell>
                                                                                    <StyledTableCell align="right">Status</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {allData.map((data, index) => {
                                                                                    const date = new Date(data.date);
                                                                                    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
                                                                                    return (
                                                                                        <StyledTableRow key={index}>
                                                                                            <StyledTableCell component="th" scope="row">
                                                                                                {dateString}
                                                                                            </StyledTableCell>
                                                                                            <StyledTableCell align="right">
                                                                                                <span style={{
                                                                                                    color: data.status === 'Present' ? '#4CAF50' : '#F44336',
                                                                                                    fontWeight: 'bold'
                                                                                                }}>
                                                                                                    {data.status}
                                                                                                </span>
                                                                                            </StyledTableCell>
                                                                                        </StyledTableRow>
                                                                                    );
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </Box>
                                                                </Collapse>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        )
                                    }
                                    return null;
                                })}

                                <Box mt={3} p={2} bgcolor="#fafafa" borderRadius={2} boxShadow={1}>
                                    <Typography variant="h6" gutterBottom>
                                        Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
                                    </Typography>
                                    
                                    <Box display="flex" justifyContent="center">
                                        <CustomPieChart data={chartData} />
                                    </Box>
                                    
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        {chartData.map((entry, index) => (
                                            <Box key={`legend-${index}`} display="flex" alignItems="center" mx={2}>
                                                <Box 
                                                    width={16} 
                                                    height={16} 
                                                    bgcolor={entry.color} 
                                                    mr={1} 
                                                    borderRadius={1}
                                                />
                                                <Typography variant="body2">
                                                    {entry.name}: {entry.value.toFixed(1)}%
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                </Box>

                                <Box mt={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                                    >
                                        Add Attendance
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Typography>No attendance records found</Typography>
                        )}
                    </Box>

                    <Box mb={4}>
                        <Typography variant="h5" gutterBottom>
                            Subject Marks
                        </Typography>
                        
                        {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0 ? (
                            <>
                                {subjectMarks.map((result, index) => {
                                    if (result.subName.subName === teachSubject) {
                                        return (
                                            <Box key={index} mb={2}>
                                                <Table>
                                                    <TableHead>
                                                        <StyledTableRow>
                                                            <StyledTableCell>Subject</StyledTableCell>
                                                            <StyledTableCell>Marks Obtained</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <StyledTableRow>
                                                            <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                            <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        )
                                    }
                                    return null;
                                })}
                                
                                <Box mt={2} display="flex" justifyContent="flex-end">
                                    <PurpleButton 
                                        variant="contained"
                                        onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                                    >
                                        Add Marks
                                    </PurpleButton>
                                </Box>
                            </>
                        ) : (
                            <Typography>No marks records found</Typography>
                        )}
                    </Box>
                </div>
            )}
        </>
    )
}

export default TeacherViewStudent