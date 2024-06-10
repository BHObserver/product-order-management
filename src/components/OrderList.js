/* eslint-disable import/no-extraneous-dependencies */
// Disables ESLint rule for importing dependencies not listed in package.json

// Import necessary modules and components from React, PropTypes, and Material-UI
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer, Typography, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the VisibilityIcon

// OrderList functional component to display a list of orders
const OrderList = ({
  orders, onView, onEdit, onDelete,
}) => {
  // If there are no orders, display a message
  if (orders.length === 0) {
    return <Typography>No orders found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      {/* Heading for the Orders Table */}
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            {/* Table headers for the order properties */}
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Total Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Iterate over orders and display each order in a table row */}
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.total_quantity}</TableCell>
              <TableCell>
                {/* View Button to trigger onView function */}
                <IconButton onClick={() => onView(order.id)}>
                  <VisibilityIcon />
                </IconButton>
                {/* Edit Button to trigger onEdit function */}
                <IconButton onClick={() => onEdit(order.id)}>
                  <EditIcon />
                </IconButton>
                {/* Delete Button to trigger onDelete function */}
                <IconButton onClick={() => onDelete(order.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// PropTypes to validate the props passed to the component
OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      total_quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onView: PropTypes.func.isRequired, // Function to handle viewing an order
  onEdit: PropTypes.func.isRequired, // Function to handle editing an order
  onDelete: PropTypes.func.isRequired, // Function to handle deleting an order
};

// Exporting the OrderList component as the default export
export default OrderList;
