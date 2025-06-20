import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Wrapper to intercept all fetch calls
export async function apiFetch(
  url: string,
  options: RequestInit = {},
  withAuth = false
) {
  // Interception before the call
  // Example: adding an Authorization header
  if (withAuth) {
    const token = await AsyncStorage.getItem('jwt');
    options.headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    };
  }

  // Log or other interception
  console.log("HTTP Request:", `${API_URL}${url}`, options);

  try {
    const response = await fetch(`${API_URL}${url}`, options);
    console.log("HTTP Response:", response.status, response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error: any = new Error(errorData.message || 'Network error');
      error.status = response.status;
      error.body = errorData;
      // Log the detailed error in the Metro console
      console.error("HTTP Error:", {
        url,
        options,
        status: response.status,
        errorData,
      });
      throw error;
    }
    const data = await response.json();
    console.log("HTTP Success:", data);
    return data;
  } catch (error) {
    // Log the error in the Metro console
    console.log("API_URL", API_URL);
    console.error("HTTP Exception:", error);
    throw error;
  }
}