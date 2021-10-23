/*
 * Name: home.js
 * Purpose: Renders various components that make up the 'Home Page' 
 * Source: https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side

 * Used by: App.js to render the Home page
 */

// Module imports here
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import styles here
import { makeStyles } from '@material-ui/core/styles';

// Import icons and assets here
import logo from '../assets/logo.png';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Renders the copyright component 
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        EoS Monitor
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// Implementation of styles using material ui "makeStyles" directive
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    //backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundImage: 'url(https://source.unsplash.com/hpjSkU2UYSU)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'top',
  },
  paper: {
    margin: theme.spacing(2, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    
  },
  submit: {
    margin: theme.spacing(10, 0, 2),
  },

}));

/*
 * This is the main implementation for the "Home" page
 */
const Home = () => {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root} >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={4} square >
        <div className={classes.paper}>
          
          <div style={{display: "flex", alignItems:"center", marginTop: "50px"}}>
            <img src = {logo} 
            alt="logo" 
            width="120px" 
            height="120px" 
            border-radius="50%"
            display="inline-block"
              />  
            <span style={{ margin:"30px", fontSize: "72px", fontWeight: "700", color:"#1d3557"}}>
              EoS Monitor
            </span>
          </div>
          <Avatar className={classes.avatar} style={{marginTop: "180px"}}>
            <LockOutlinedIcon/>
          </Avatar>  
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate >
            <TextField
              variant="standard"
              margin="normal"
              fullWidth
              required 
              id="email address or username"
              label="Email Address or Username"
              autoComplete="email"
              autoFocus
              className = "classEmail"
              style = {{marginBottom:60}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              style = {{marginBottom:10}}
            />
            <FormControlLabel
              className ="rememberMe"
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
              style = {{marginTop:20 ,marginLeft: 0, Align: 'left'}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              Link href="/dashboard"
            >
              Sign In
            </Button>
            <div >
              <div >
                <Link href="#" variant="body2">
                  Forgotten your password?
                </Link>
              </div>
            </div>
            <div style={{marginTop: "250px"}}>
              <Copyright />
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export { Home }