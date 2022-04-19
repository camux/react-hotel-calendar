import React from "react";
import { Grid, Label } from "semantic-ui-react";

import "./GroupTags.css";

function GroupTags(props) {
  const { tags } = props;

  const values = Object.entries(tags);

  function getStyle(color) {
    return {
      backgroundColor: color,
      color: "white",
      margin: "6px",
      minWidth: "90px",
      minHeight: "34px",
      display: "flex",
    };
  }

  return (
    <Grid.Row className="hotel-calendar-grid-group-tags">
      {values.map(([name, color]) => {
        return (
          <Label key={name} style={getStyle(color)}>
            <span className="hotel-calendar-tag-span">{name}</span>
          </Label>
        );
      })}
    </Grid.Row>
  );
}

export default GroupTags;
