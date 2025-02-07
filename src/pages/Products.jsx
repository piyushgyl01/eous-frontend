import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react"; // Import useState
import ProductList from "../features/product/ProductList";


const MAX = 300;
const MIN = 0;
const marks = [
  { value: MIN, label: "" },
  { value: MAX, label: "" },
];

const Products = () => {

    const [isFiltersOpen, setIsFiltersOpen] = useState(false); //  Add state for filter visibility

  return (
    <>
      {/* Removed Header, you'll add your own. */}
      <main className="container py-4">
        <div className="row">
          {/* Mobile Filter Toggle */}
          <Box className="d-md-none w-100 mb-4">
            <Button
              variant="outlined"
              fullWidth
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}  // Toggle filter visibility
              startIcon={isFiltersOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{
                justifyContent: "space-between",
                p: 2,
                backgroundColor: "background.paper",
              }}
            >
              <Typography>Filters</Typography>
            </Button>
          </Box>

          {/* Filters Section */}
          <div className={`col-md-3 ${isFiltersOpen ? "block" : "d-none d-md-block"}`}>
            <Box sx={{ marginBottom: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 2,
                }}
              >
                <h4>Filters</h4>
                <Typography
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                    color: "primary.main",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                  // onClick={handleClearFilters}  <-- Add your clear handler
                >
                  Clear
                </Typography>
              </Box>
            </Box>

            {/* Price Filter */}
            <Box sx={{ marginBottom: 4 }}>
              <h4>Price</h4>
              <Box sx={{ width: "100%" }}>
                <Slider
                  marks={marks}
                  step={10}
                  // value={val}   <--  Add your state
                  valueLabelDisplay="auto"
                  min={MIN}
                  max={MAX}
                  // onChange={handleSliderChange}  <-- Your handler
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="body2"
                    // onClick={() => setVal(MIN)} <-- Your handler
                    sx={{ cursor: "pointer" }}
                  >
                    ${MIN}
                  </Typography>
                  <Typography
                    variant="body2"
                    // onClick={() => setVal(MAX)} <-- Your handler
                    sx={{ cursor: "pointer" }}
                  >
                    ${MAX}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Category Filter */}
            <Box sx={{ marginBottom: 4 }}>
              <FormControl component="fieldset" variant="standard">
                <FormLabel>
                  <h4>Category</h4>
                </FormLabel>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.men} <-- Your state
                        // onChange={handleCheckboxChange} <-- Your handler
                        name="men"
                      />
                    }
                    label="Men"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        // checked={state.women} <-- Your state
                        // onChange={handleCheckboxChange} <-- Your handler
                        name="women"
                      />
                    }
                    label="Women"
                  />
                </FormGroup>
              </FormControl>
            </Box>

            {/* Rating Filter */}
            <Box sx={{ marginBottom: 4 }}>
              <FormControl>
                <FormLabel id="rating-label">
                  <h4>Rating</h4>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="rating-label"
                  // value={ratingValue || ""}  <-- Your state
                  name="rating"
                  // onChange={handleRatingChange} <-- Your handler
                >
                  <FormControlLabel
                    value={4}  //  Keep the values.
                    control={<Radio />}
                    label="4 Stars & above"
                  />
                  <FormControlLabel
                    value={3}
                    control={<Radio />}
                    label="3 Stars & above"
                  />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="2 Stars & above"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="1 Stars & above"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Sort Filter */}
            <Box sx={{ marginBottom: 4 }}>
              <FormControl>
                <FormLabel id="sort-by-label">
                  <h4>Sort by</h4>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="sort-by-label"
                  // value={sortValue} <-- Your state
                  name="sort-by"
                  // onChange={handleSortChange} <-- Your handler
                >
                  <FormControlLabel
                    value="lowToHigh" // Keep these values
                    control={<Radio />}
                    label="Price - Low to High"
                  />
                  <FormControlLabel
                    value="highToLow"
                    control={<Radio />}
                    label="Price - High to Low"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </div>

          {/* Products Grid */}
           <ProductList />
        </div>
      </main>

        {/* Removed Snackbar, you will add if needed */}
    </>
  );
};

export default Products;