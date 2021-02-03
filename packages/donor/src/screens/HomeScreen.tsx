import React from "react";
import Button from "../components/Button";

interface HomeScreenProps {
  onSignOut: () => void;
  goToExtendedSignupScreen: () => void;
  goToBookDonationScreen: () => void;
  goToUpcomingDonationScreen: () => void;
}

export default function HomeScreen(props: HomeScreenProps) {
  return (
    <div>
      בחר מסך:
      <Button title="מסך הזנת פרטים" onClick={props.goToExtendedSignupScreen} />
      <Button
        title="מסך תרומה קרובה"
        onClick={props.goToUpcomingDonationScreen}
      />
      <Button title="מסך קביעת תרומה" onClick={props.goToBookDonationScreen} />
      <Button title="התנתק" onClick={props.onSignOut} />
    </div>
  );
}
