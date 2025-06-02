import axios from "axios";

// Action to fetch class students for a given classID
export const getClassStudents = (classID) => async (dispatch) => {
  try {
    dispatch({ type: "CLASS_STUDENTS_LOADING" });
    // Replace the endpoint URL with your actual API endpoint
    const { data } = await axios.get(`/api/classes/${classID}/students`);
    // Assuming the API returns an object with a 'students' array
    dispatch({ type: "CLASS_STUDENTS_SUCCESS", payload: data.students });
  } catch (error) {
    dispatch({
      type: "CLASS_STUDENTS_FAIL",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Action to fetch attendance count for a given classID and date
export const getAttendanceCount = (classID, date) => async (dispatch) => {
  try {
    dispatch({ type: "ATTENDANCE_COUNT_LOADING" });
    // Replace the endpoint URL with your actual API endpoint
    // Example: /api/attendance/{classID}?date={date}
    const { data } = await axios.get(`/api/attendance/${classID}?date=${date}`);
    // Assuming the API returns an object with a 'count' property
    dispatch({ type: "ATTENDANCE_COUNT_SUCCESS", payload: data.count });
  } catch (error) {
    dispatch({
      type: "ATTENDANCE_COUNT_FAIL",
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
