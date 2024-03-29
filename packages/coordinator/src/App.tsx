import "./App.css";
import CoordinatorRouter from "./navigation/CoordinatorRouter";
import { BrowserRouter as Router } from "react-router-dom";
import WithGlobalTheme from "./HOCs/withGlobalTheme";
import { he } from "date-fns/locale";
import Div100vh from "react-div-100vh";
import store from "./store/store";
import { Provider } from "react-redux";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  return (
    <Div100vh className="App">
      <WithGlobalTheme>
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={he}>
            <Router>
              <CoordinatorRouter />
            </Router>
          </LocalizationProvider>
        </Provider>
      </WithGlobalTheme>
    </Div100vh>
  );
}

export default App;
