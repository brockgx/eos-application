import {useState} from 'react';

import {Card,CardContent,CardHeader,Typography, IconButton, Collapse, CardActions} from '@material-ui/core'

import * as FaIcons from 'react-icons/fa';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const Machines = ({machines}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Card className="machineCard">
        <CardHeader
          className="cardHeader"
          avatar= {<FaIcons.FaDesktop />}
          title={machines.machine_name}
          subheader={machines.time}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          Status: {machines.status} <br/>
          IP: {machines.ip_address}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton
          className={expanded ? 'expandOpen' : 'expand'}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            Extra Info:
          </Typography>
        </CardContent>
        </Collapse>
      </Card>
      {/* <p>{props.machine.id}</p>
      <p>{props.machine.machine_name}</p>
      <p>{props.machine.status}</p>
      <p>{props.machine.ip_address}</p> */}
    </div>
  )
}

export default Machines
