import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";

function SearchResultItem(props) {
  const color = props.mineralItem.color[0].toLowerCase();
  return (
    <Grid container spacing={1} alignItems="center" style={{ padding: 18 }}>
      <Grid item>
        <div className="outter-circle">
          <div className="inner-circle">
            <Avatar
              style={{
                margin: 10,
                width: 80,
                height: 80,
                backgroundColor: "white",
                display: "inline-block"
              }}
              alt="mineralImage"
              src={`https://crystallizer.s3.eu-west-2.amazonaws.com/${color}.svg`}
            />
          </div>
        </div>
      </Grid>
      <Grid item>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h5"
            style={{ color: "black", fontSize: 15 }}
          >
            {props.mineralItem.name}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            color="textSecondary"
            component="p"
            style={{ fontSize: 12 }}
          >
            {`${props.mineralItem.color[0]} mineral`}
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
}

export default SearchResultItem;
