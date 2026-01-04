import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";
import { SocketContextProvider } from "./Context/SocketContext.jsx";

if (typeof window !== "undefined") {
  import("bootstrap");
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a76f;",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <SocketContextProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </SocketContextProvider>
    </Provider>
  </ThemeProvider>
);
