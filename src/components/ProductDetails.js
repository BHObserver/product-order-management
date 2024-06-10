/* eslint-disable import/no-extraneous-dependencies */
// Disables ESLint rule for importing dependencies not listed in package.json

// Import necessary modules and components from React, PropTypes, Material-UI, and React Router
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

// Custom styled components for layout and styling using Material-UI's theme
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

// Functional component to display the details of a product
const ProductDetails = ({ product }) => {
  const navigate = useNavigate(); // Navigation function from React Router

  return (
    <RootPaper>
      {/* Button to navigate back to the product list */}
      <BackButton variant="contained" onClick={() => navigate('/products')}>
        Back
      </BackButton>
      {/* Display product name */}
      <HeadingTypography variant="h4">
        {product.name}
      </HeadingTypography>
      {/* List to display product details */}
      <List>
        <ListItem>
          <ListItemText primary={`Brand: ${product.brand}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Type: ${product.type}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Created At: ${new Date(product.created_at).toLocaleDateString()}`} />
        </ListItem>
      </List>
      {/* Heading for product variants */}
      <HeadingTypography variant="h5">Variants</HeadingTypography>
      {/* List to display each variant of the product */}
      <List>
        {product.variants.map((variant) => (
          <React.Fragment key={variant.id}>
            <ListItem>
              <ListItemText primary={`Color: ${variant.color}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Specification: ${variant.specification}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Size: ${variant.size}`} />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </RootPaper>
  );
};

// PropTypes to validate the props passed to the component
ProductDetails.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        color: PropTypes.string.isRequired,
        specification: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

// Exporting the ProductDetails component as the default export
export default ProductDetails;
