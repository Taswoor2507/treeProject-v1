import axiosInstance from './axiosInstance';
import store from '../redux/store';
import { setCredentials, logout } from '../redux/authSlice/AuthSlice';

const refreshToken = async () => {
  try {
    const response = await axiosInstance.post('/users/refreshtoken', {}, {
      withCredentials: true,
    });

    // Add a null or undefined check before accessing nested properties
    if (response?.data?.data) {
      const { accessToken } = response.data.data;
      console.log("New access token:", accessToken);

      // Dispatch updated access token to Redux
      console.log(store.getState());
      // Uncomment this to dispatch credentials when user data is available
      // store.dispatch(setCredentials({ accessToken, data: { user } }));
      
      return accessToken;
    } else {
      throw new Error('Invalid response structure');
    }

  } catch (error) {
    // Handle specific Axios errors
    if (error.response) {
      // Server responded with a status code out of the range of 2xx
      if (error.response.status === 500) {
        // Handle 500 status (Internal Server Error)
        // console.log("Server Error: Unable to refresh token.");
      } else {
        // console.log(`Request failed with status code: ${error.response.status}`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      // console.log("No response received from server. Please try again later.");
    } else {
      // Other errors, like setting up the request or client-side issues
      console.log("Error setting up request:", error.message);
    }

    // Optionally, you can remove the navigation or keep it
    // navigate("/login");

    // Handle logout if refresh fails
    store.dispatch(logout());

    return null;
  }
};

export default refreshToken;
