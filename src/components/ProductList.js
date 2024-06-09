/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableHead, TableBody, TableRow,
  TableCell, Paper, TableContainer, Typography, IconButton,
  Tooltip, Pagination, Button, Box, CircularProgress,
} from '@mui/material';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const Container = styled('div')({
  padding: '20px',
});

const HeaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  marginTop: '25px',
});

const StyledTableContainer = styled(TableContainer)({
  marginBottom: '20px',
  minWidth: 650,
});

const StyledTable = styled(Table)({
  minWidth: 650,
});

const StyledPagination = styled(Pagination)({
  marginTop: 20,
  display: 'flex',
  justifyContent: 'center',
});

const StyledTableCell = styled(TableCell)({
  textAlign: 'center',
  border: '1px solid #e0e0e0',
  padding: '10px',
});

const StyledTableHeadCell = styled(StyledTableCell)({
  backgroundColor: '#4f5b62',
  color: 'white',
  fontWeight: 'bold',
});

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f0f4f8',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#ffffff',
  },
}));

const ProductListHeading = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  color: '#37474f',
});

const IconStyle = styled(InventoryRoundedIcon)({
  marginRight: '10px',
  fontSize: '32px',
  color: '#37474f',
});

const ProductList = ({
  products, onEdit, onDelete, totalPages, currentPage, onPageChange, loading,
}) => {
  const navigate = useNavigate();

  const handleView = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  }

  if (!Array.isArray(products) || products.length === 0) {
    return <Typography>No products found.</Typography>;
  }

  return (
    <Container>
      <HeaderContainer>
        <ProductListHeading variant="h5" gutterBottom>
          <IconStyle />
          PRODUCT LIST
        </ProductListHeading>
        <Button
          variant="contained"
          style={{ backgroundColor: '#4f5b62', color: 'white' }}
          startIcon={<AddIcon />}
          onClick={() => navigate('/products/new')}
        >
          Create
        </Button>
      </HeaderContainer>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <StyledTableRow>
              <StyledTableHeadCell>ID</StyledTableHeadCell>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Brand</StyledTableHeadCell>
              <StyledTableHeadCell>Type</StyledTableHeadCell>
              <StyledTableHeadCell>Created At</StyledTableHeadCell>
              <StyledTableHeadCell>Actions</StyledTableHeadCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell>{product.id}</StyledTableCell>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>{product.brand}</StyledTableCell>
                <StyledTableCell>{product.type}</StyledTableCell>
                <StyledTableCell>{product.createdAt}</StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="View">
                    <IconButton
                      color="primary"
                      onClick={() => handleView(product.id)}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Tooltip>
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
                </StyledTableCell>
              </StyledTableRow>
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
  loading: PropTypes.bool.isRequired,
};

export default ProductList;
