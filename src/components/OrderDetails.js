/* eslint-disable import/no-extraneous-dependencies */
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

const OrderDetails = ({ order }) => {
  const navigate = useNavigate();

  return (
    <RootPaper>
      <BackButton variant="contained" onClick={() => navigate('/orders')}>
        Back
      </BackButton>
      <HeadingTypography variant="h4">
        {order.name}
      </HeadingTypography>
      <List>
        <ListItem>
          <ListItemText primary={`Email: ${order.email}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Address: ${order.address}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Total Quantity: ${order.total_quantity}`} />
        </ListItem>
      </List>
      <HeadingTypography variant="h5">Details</HeadingTypography>
      <List>
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

export default OrderDetails;
