import {useState} from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";

export default function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
}) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await handleDeleteAddress(addressInfo);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Failed to delete address:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">Address: {addressInfo?.address}</Typography>
        <Typography variant="body1">City: {addressInfo?.city}</Typography>
        <Typography variant="body1">PinCode: {addressInfo?.pincode}</Typography>
        <Typography variant="body1">Phone: {addressInfo?.phone}</Typography>
        <Typography variant="body1">Notes: {addressInfo?.notes}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete
        </Button>
      </CardActions>

      {/* Confirmation Modal */}
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are You Sure You Want To Delete This Address..!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <CircularProgress size={20} color="inherit" />
                &nbsp;Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </Button>
          <Button onClick={() => setShowDeleteConfirm(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
