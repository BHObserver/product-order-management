/* eslint-disable import/no-extraneous-dependencies */
// Disables ESLint rule for importing dependencies not listed in package.json

// Import necessary modules and components from React, PropTypes, and Material-UI
import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Styled components using Material-UI's styled API
const RootPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

// OrderDetails functional component to display details of a specific order
const OrderDetails = ({ order }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  return (
    <RootPaper>
      {/* Back button to navigate to the orders list */}
      <BackButton variant="contained" onClick={() => navigate('/orders')}>
        Back
      </BackButton>
      {/* Display order name */}
      <HeadingTypography variant="h4">
        {order.name}
      </HeadingTypography>
      <List>
        {/* Display order email */}
        <ListItem>
          <ListItemText primary={`Email: ${order.email}`} />
        </ListItem>
        {/* Display order address */}
        <ListItem>
          <ListItemText primary={`Address: ${order.address}`} />
        </ListItem>
        {/* Display total quantity of items in the order */}
        <ListItem>
          <ListItemText primary={`Total Quantity: ${order.total_quantity}`} />
        </ListItem>
      </List>
      {/* Heading for order details */}
      <HeadingTypography variant="h5">Details</HeadingTypography>
      <List>
        {/* Iterate over order details and display each detail */}
        {order.details && order.details.map((detail) => (
          <React.Fragment key={detail.variant_id}>
            <ListItem>
              <ListItemText primary={`Variant ID: ${detail.variant_id}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Quantity: ${detail.quantity}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Color: ${detail.variant.color}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Specification: ${detail.variant.specification}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Size: ${detail.variant.size}`} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </RootPaper>
  );
};

// PropTypes to validate the props passed to the component
OrderDetails.propTypes = {
  order: PropTypes.shape({
    name: PropTypes.string.isRequired,
    store: PropTypes.string,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    total_quantity: PropTypes.number.isRequired,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        variant_id: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        variant: PropTypes.shape({
          color: PropTypes.string.isRequired,
          specification: PropTypes.string.isRequired,
          size: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

// Exporting the OrderDetails component as the default export
export default OrderDetails;
