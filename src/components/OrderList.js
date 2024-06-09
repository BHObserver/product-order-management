/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHead, TableBody, TableRow, TableCell, Paper, TableContainer, Typography, IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the VisibilityIcon

const OrderList = ({
  orders, onView, onEdit, onDelete,
}) => {
  if (orders.length === 0) {
    return <Typography>No orders found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Total Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.total_quantity}</TableCell>
              <TableCell>
                {/* View Button */}
                <IconButton onClick={() => onView(order.id)}>
                  <VisibilityIcon />
                </IconButton>
                {/* Edit Button */}
                <IconButton onClick={() => onEdit(order.id)}>
                  <EditIcon />
                </IconButton>
                {/* Delete Button */}
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

OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      total_quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onView: PropTypes.func.isRequired, // Add PropTypes for onView function
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default OrderList;
