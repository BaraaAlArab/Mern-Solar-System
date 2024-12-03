import {useState} from "react";
import {
  Grid,
  Typography,
  Divider,
  Chip,
  Card,
  CardContent,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const initialFormData = {
  status: "",
};

export default function AdminOrderDetailsView({orderDetails}) {
  const [formData, setFormData] = useState(initialFormData);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  function handleSnackbarClose() {
    setSnackbar({...snackbar, open: false});
  }

  return (
    <Box p={3}>
      <Card variant="outlined" sx={{maxWidth: 600, margin: "auto", p: 2}}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order Details
          </Typography>
          <Divider sx={{mb: 2}} />

          {/* Order Info Section */}
          <Grid container spacing={2} sx={{mb: 2}}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Order ID
              </Typography>
              <Typography variant="body1">{orderDetails?._id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Order Date
              </Typography>
              <Typography variant="body1">
                {orderDetails?.orderDate.split("T")[0]}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Total Price
              </Typography>
              <Typography variant="body1">
                ${orderDetails?.totalAmount}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Payment Method
              </Typography>
              <Typography variant="body1">
                {orderDetails?.paymentMethod}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Payment Status
              </Typography>
              <Typography variant="body1">
                {orderDetails?.paymentStatus}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Order Status
              </Typography>
              <Chip
                label={orderDetails?.orderStatus}
                color={
                  orderDetails?.orderStatus === "confirmed"
                    ? "success"
                    : orderDetails?.orderStatus === "rejected"
                    ? "error"
                    : "default"
                }
              />
            </Grid>
          </Grid>

          <Divider sx={{my: 2}} />

          {/* Cart Items Section */}
          <Typography variant="h6" gutterBottom>
            Cart Items
          </Typography>
          {orderDetails?.cartItems && orderDetails.cartItems.length > 0 ? (
            <Paper variant="outlined" sx={{p: 2, mt: 2}}>
              {orderDetails.cartItems.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  sx={{mb: 1}}
                >
                  <Typography variant="body1">{item.productName}</Typography>
                  <Typography variant="body1">
                    {item.quantity} x ${item.price}
                  </Typography>
                </Box>
              ))}
            </Paper>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No items in the cart.
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{width: "100%"}}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
