import AppRouter from "./navigation/AppRouter";
import Div100vh from "react-div-100vh";
import WithGlobalTheme from "./HOCs/withGlobalTheme";

export default function DonorApp() {
  return (
    <Div100vh>
      <WithGlobalTheme>
        <AppRouter />
      </WithGlobalTheme>
    </Div100vh>
  );
}
