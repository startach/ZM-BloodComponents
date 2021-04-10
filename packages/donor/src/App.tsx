import AppRouter from "./navigation/AppRouter";
import WithGlobalTheme from "./HOCs/withGlobalTheme";

export default function DonorApp() {
  return (
    <WithGlobalTheme>
      <AppRouter />
    </WithGlobalTheme>
  );
}
