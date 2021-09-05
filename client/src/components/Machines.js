import {useState} from 'react';

import {Card,CardContent,Typography, IconButton, Collapse, CardActions} from '@material-ui/core'

import * as FaIcons from 'react-icons/fa';

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


const Machines = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      {props.machine.map(machines => {
        return(
          <div className="machinesCard">
             <Card >
               <CardContent className="cardContent">
                 <div className="machineName">
                  <FaIcons.FaDesktop className="desktopIcon"/>
                  <Typography component="h5" variant="h5">
                    {machines.machine_name}
                  </Typography>
                </div>
                <div className="cardBody">
                  <Typography variant="subtitle1" color="textSecondary">
                    {machines.time}
                  </Typography>
                  <Typography component="h6" variant="h6">
                    Status: {machines.status}
                  </Typography>
                  <Typography component="h6" variant="h6">
                    IP: {machines.ip_address}
                  </Typography>
                </div>
              </CardContent>
              <div className="cardControls">
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
              </div>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

export default Machines
