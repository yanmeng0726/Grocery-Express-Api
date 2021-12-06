import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import icon from '../../Assets/icon.jpg'
//import icon2 from '../../Assets/icon2.jpg'
import icon3 from '../../Assets/icon3.jpg'
import icon4 from '../../Assets/icon4.jpg'
import icon5 from '../../Assets/icon5.jpg'
import icon6 from '../../Assets/icon6.jpg'
import icon7 from '../../Assets/icon7.jpg'
import icon8 from '../../Assets/icon8.jpg'
import icon2 from '../../Assets/icon2.jpg'
import { useParams, useNavigate } from 'react-router-dom';


export const StoreCard = (props)=> {
  const iconList = [icon,icon2,icon3,icon4,icon5,icon6,icon7,icon8]
  let navigate = useNavigate();
  return (
    <Card style={props.style} sx={{ maxWidth: 380 }}>
      <CardActionArea
        onClick={() => {
          props.handleClick(props.id);
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image= { iconList[props.index%8] }
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
