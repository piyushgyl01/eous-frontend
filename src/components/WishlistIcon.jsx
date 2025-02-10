import { Box, IconButton, CircularProgress } from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

export default function WishlistIcon({
  item,
  updatingId,
  handleUpdateWishlist,
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 8,
        right: 16,
        backgroundColor: "#fff",
        borderRadius: "50%",
        padding: 0.5,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1,
      }}
    >
      <IconButton
        onClick={() => handleUpdateWishlist(item._id)}
        disabled={updatingId === item?._id}
        sx={{ "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.8)" } }}
      >
        {updatingId === item?._id ? (
          <CircularProgress size={20} sx={{ color: "gray" }} />
        ) : item?.isWishlisted ? (
          <FavoriteIcon sx={{ color: "red", "&:hover": { color: "gray" } }} />
        ) : (
          <FavoriteBorderIcon
            sx={{ color: "gray", "&:hover": { color: "pink" } }}
          />
        )}
      </IconButton>
    </Box>
  );
}
