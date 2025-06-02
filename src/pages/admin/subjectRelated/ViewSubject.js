import React, { useEffect, useState } from 'react';
import {
  getClassStudents,
  getSubjectDetails,
} from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Tab,
  Container,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Grid,
  Chip,
} from '@mui/material';
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import SubjectIcon from '@mui/icons-material/Subject';

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } =
    useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, 'Subject'));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState('attendance');
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: 'rollNum', label: 'Roll No.', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 170 },
  ];

  const studentRows = sclassStudents.map((student) => ({
    rollNum: student.rollNum,
    name: student.name,
    id: student._id,
  }));

  const StudentsAttendanceButtonHaver = ({ row }) => (
    <>
      <BlueButton
        variant="contained"
        onClick={() => navigate("/Admin/students/student/" + row.id)}
      >
        View
      </BlueButton>
      <PurpleButton
        variant="contained"
        onClick={() =>
          navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
        }
      >
        Take Attendance
      </PurpleButton>
    </>
  );

  const StudentsMarksButtonHaver = ({ row }) => (
    <>
      <BlueButton
        variant="contained"
        onClick={() => navigate("/Admin/students/student/" + row.id)}
      >
        View
      </BlueButton>
      <PurpleButton
        variant="contained"
        onClick={() =>
          navigate(`/Admin/subject/student/marks/${row.id}/${subjectID}`)
        }
      >
        Provide Marks
      </PurpleButton>
    </>
  );

  const SubjectStudentsSection = () => (
    <>
      {getresponse ? (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <GreenButton
            variant="contained"
            onClick={() => navigate("/Admin/class/addstudents/" + classID)}
          >
            Add Students
          </GreenButton>
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>
            Students List:
          </Typography>

          {selectedSection === 'attendance' && (
            <TableTemplate
              buttonHaver={StudentsAttendanceButtonHaver}
              columns={studentColumns}
              rows={studentRows}
            />
          )}
          {selectedSection === 'marks' && (
            <TableTemplate
              buttonHaver={StudentsMarksButtonHaver}
              columns={studentColumns}
              rows={studentRows}
            />
          )}

          <Paper
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: '#f5f5f5',
            }}
            elevation={3}
          >
            <BottomNavigation
              value={selectedSection}
              onChange={handleSectionChange}
              showLabels
            >
              <BottomNavigationAction
                label="Attendance"
                value="attendance"
                icon={
                  selectedSection === 'attendance' ? (
                    <TableChartIcon />
                  ) : (
                    <TableChartOutlinedIcon />
                  )
                }
              />
              <BottomNavigationAction
                label="Marks"
                value="marks"
                icon={
                  selectedSection === 'marks' ? (
                    <InsertChartIcon />
                  ) : (
                    <InsertChartOutlinedIcon />
                  )
                }
              />
            </BottomNavigation>
          </Paper>
        </>
      )}
    </>
  );

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <Box sx={{ mb: 4 }}>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            bgcolor: '#f9fafb',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            gap={2}
            mb={3}
          >
            <Box
              sx={{
                bgcolor: 'primary.light',
                color: 'primary.contrastText',
                borderRadius: '12px',
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SubjectIcon fontSize="medium" />
            </Box>
            <Typography
              variant="h5"
              color="primary"
              fontWeight={700}
            >
              Subject Overview
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Subject Name
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {subjectDetails?.subName || 'N/A'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Subject Code
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {subjectDetails?.subCode || 'N/A'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Total Sessions
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {subjectDetails?.sessions || '0'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Students Enrolled
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {numberOfStudents}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Class
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {subjectDetails?.sclassName?.sclassName || 'Unassigned'}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  bgcolor: 'white',
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                >
                  Assigned Teacher
                </Typography>
                {subjectDetails?.teacher ? (
                  <Box>
                    <Chip
                      label="Assigned"
                      color="success"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="h6" fontWeight={600} color="primary">
                      {subjectDetails.teacher.name}
                    </Typography>
                  </Box>
                ) : (
                  <GreenButton
                    variant="contained"
                    size="small"
                    onClick={() =>
                      navigate(
                        "/Admin/teachers/addteacher/" + subjectDetails._id
                      )
                    }
                    sx={{ alignSelf: 'start' }}
                  >
                    Assign Teacher
                  </GreenButton>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  };

  return (
    <>
      {subloading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
          }}
        >
          <Typography variant="h6">Loading...</Typography>
        </Box>
      ) : (
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  bgcolor: 'background.paper',
                }}
              >
                <Tab label="Details" value="1" />
                <Tab label="Students" value="2" />
              </TabList>
            </Box>
            <Container sx={{ mt: 8, mb: 10 }}>
              <TabPanel value="1">
                <SubjectDetailsSection />
              </TabPanel>
              <TabPanel value="2">
                <SubjectStudentsSection />
              </TabPanel>
            </Container>
          </TabContext>
        </Box>
      )}
    </>
  );
};

export default ViewSubject;