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

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();

  return (
    <RootPaper>
      <BackButton variant="contained" onClick={() => navigate('/products')}>
        Back
      </BackButton>
      <HeadingTypography variant="h4">
        {product.name}
      </HeadingTypography>
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
      <HeadingTypography variant="h5">Variants</HeadingTypography>
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

export default ProductDetails;
