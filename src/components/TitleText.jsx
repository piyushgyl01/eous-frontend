import Typography from "@mui/material/Typography";

export default function TitleText({ products, type, text }) {
  return (
    <>
      {type === "cart" ? (
        <Typography variant="h4" component="h1" gutterBottom align="center">
          My Cart ({products.length} items)
        </Typography>
      ) : (
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {text}
        </Typography>
      )}
    </>
  );
}
