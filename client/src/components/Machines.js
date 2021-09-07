import {useState} from 'react';

import {Card,CardContent,Typography, IconButton, Collapse, CardActions} from '@material-ui/core'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import windows from '../assets/windows.png'
import linux from '../assets/linux.png'

const Machines = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      {props.machine.map(machines => {
        return(
          <div className="machinesWrapper">
             <Card className="machinesCard">
               <CardContent className="cardContent">
                  {machines.machine_type === windows
                    ? <img src={windows} className="desktopIcon" alt="desktop icon" />
                    : <img src={linux} className="desktopIcon" alt="desktop" />
                  }
                 <div className="machineName">
                  <Typography component="h5" variant="h5">
                    {machines.machine_name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {machines.time}
                  </Typography>
                </div>
                <div className="cardBody">
                  
                  <Typography component="h6" variant="h6">
                    <b>Status:</b> {machines.status}
                  </Typography>
                  <Typography component="h6" variant="h6">
                    <b>IP:</b> {machines.ip_address}
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
