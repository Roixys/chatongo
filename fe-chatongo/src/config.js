let BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) {
  throw new Error(
    "Missing `VITE_BACKEND_URL` environment variable. Example `http://127.0.0.1:8000`"
  );
}

export { BACKEND_URL };
