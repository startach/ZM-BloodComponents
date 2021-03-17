import Spinner from "../../components/basic/Spinner";
import Logo from "../logo/Logo";

export default function AuthLoadingScreen() {
  return (
    <div style={{ textAlign: "center" }}>
      <Logo style={{ width: "100%", maxWidth: "320px", height: "400px" }} />
      <Spinner />
    </div>
  );
}
