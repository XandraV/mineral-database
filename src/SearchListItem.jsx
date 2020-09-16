import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import StyledAvatar from "./StyledAvatar";
import MineralLink from "./MineralLink";

const SearchListItem = (props) => {
  const color = props.mineral.color[0].toLowerCase();
  return (
    <Grid container spacing={1} alignItems="center" style={{ padding: 18 }}>
      <Grid item>
        <StyledAvatar color={color} />
      </Grid>
      <Grid item>
        <CardContent>
          <MineralLink onClick={props.onClick}>
            <Typography
              gutterBottom
              variant="h5"
              component="h5"
              style={{ color: "black", fontSize: 15 }}
            >
              {props.mineral.name}
            </Typography>
            <Typography
              gutterBottom
              color="textSecondary"
              component="p"
              style={{ fontSize: 12 }}
            >
              {`${props.mineral.color[0]} mineral`}
            </Typography>
          </MineralLink>
        </CardContent>
      </Grid>
    </Grid>
  );
};
export default SearchListItem;
