/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHead, TableBody, TableRow,
  TableCell, Paper, TableContainer, Typography, IconButton, Tooltip, Pagination, Button,
} from '@mui/material';
import ViewIcon from '@mui/icons-material/VisibilityOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')({
  padding: '20px',
});

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
});

const StyledTableContainer = styled(TableContainer)({
  marginBottom: '20px',
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledPagination = styled(Pagination)({
  marginTop: 20,
  display: 'flex',
  justifyContent: 'center',
});

const ProductList = ({
  products, onEdit, onDelete, totalPages, currentPage, onPageChange,
}) => {
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderContainer>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/products/new')}
        >
          Create
        </Button>
      </HeaderContainer>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.type}</TableCell>
                <TableCell>{product.createdAt}</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                      onClick={() => onEdit(product)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      color="secondary"
                      onClick={() => onDelete(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <StyledPagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
      />
    </Container>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      specification: PropTypes.string.isRequired,
      size: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ProductList;
