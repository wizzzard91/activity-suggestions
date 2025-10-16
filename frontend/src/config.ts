const apiUrl = import.meta.env.VITE_BACKEND_URL;

if (!apiUrl) {
  throw new Error(
    "VITE_BACKEND_URL is not defined. Please check your .env file."
  );
}

export const config = {
  apiUrl,
};