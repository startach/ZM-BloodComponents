import { useState } from "react";
import styles from "./AppointmentScreen.module.scss";
import Input from "../../components/Input";
import Button, { ButtonVariant } from "../../components/Button";
import { useNavigate } from "react-router-dom";

export interface AppointmentScreenProps {
  onSubmit: () => void;
  onCencel: () => void;
}

export default function AppointmentScreen(props: AppointmentScreenProps) {
  const [date, setDate] = useState("");
  const [dateFocus, setDateFocus] = useState(false)
  const [errorDate, setErrorDate] = useState("");

  const [time, setTime] = useState("");
  const [errorHour, setErrorHour] = useState("");

  const [type, setType] = useState("");

  const navigate = useNavigate()

  return (
    <div className={styles.addAppoinmentScreen}>
      <div className={styles.cardContainer}>
        <div className={styles.title}>הוספת תור יחיד</div>
        <div 
          className={styles.appointmentScreenXButton}
          onClick={() => {navigate(-1)}}
        >
          X
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.addApponimentSubtitle}>
          <text>זמני תור</text>
        </div>
        <div className={styles.appointmentScreenInputsContainer}>
          <Input
              onChangeText={(newValue) => {
                setDate(newValue);
              }}
              value={date}
              type={"date"}
              errorMessage={errorDate}
            />
        </div>
        <div className={styles.appointmentScreenInputsContainer}>
          <Input
            onChangeText={(newValue) => {
              setTime(newValue)
            }}
            value={time}
            type={"time"}
            errorMessage={errorHour}
          />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.addApponimentSubtitle}>
          <text>מספר עמדות</text>
        </div>
        <div className={styles.appointmentScreenInputsContainer}>
          <Input
              onChangeText={(newValue) => {
                setType(newValue)
              }}
              value={type}
              type={"number"}
              label={`מספר עמדות`}
              errorMessage={""}
            />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <div className={styles.appointmentScreenInputsContainer}>
          <Button
            onClick={() => {}}
            title="אשר והמשך"
          />
        </div>
        <div className={styles.appointmentScreenInputsContainer}>
          <Button
            onClick={() => {}}
            title="ביטול"
            variant={ButtonVariant.outlined}
          />
        </div>
      </div>
    </div>
  );
}
