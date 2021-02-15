import DeleteOutlineOutline from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';


const DeleteAppointmentButton = ({ onClick, title }) => {
  return (
    <div className="deleteAppointmentButtonContainer">
      <Button color="secondary" onClick={onClick}>
        {title}
        <DeleteOutlineOutline />
      </Button>
    </div>
  );
};

export default DeleteAppointmentButton;
