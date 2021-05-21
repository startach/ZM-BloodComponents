import AppRouter from "./navigation/AppRouter";
import WithGlobalTheme from "./HOCs/withGlobalTheme";
import Div100vh from "react-div-100vh";

export default function DonorApp() {
  return (
    <Div100vh>
      <WithGlobalTheme>
        <AppRouter />
      </WithGlobalTheme>
    </Div100vh>
  );
}
