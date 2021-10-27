import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../assets/logo.png';

/*
This Sign In page is based on the free log in template found at the below link:
https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/sign-in-side
*/

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
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
    margin: theme.spacing(10, 0, 10),
  },

}));


export default function SignInSide() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root} >
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={4} square >

        <div className={classes.paper}>
              <div>
                <img src = {logo} 
                alt="logo" 
                width="150px" 
                height="150px" 
                border-radius="50%"
                display="inline-block"
                 />  
              </div>
              <Avatar className={classes.avatar} style = {{marginBottom:10}}>
                <LockOutlinedIcon/>
              </Avatar>
              
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          
          <form className={classes.form} noValidate>
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
              style = {{marginBottom:50}}
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
              style = {{marginBottom:30}}
            />
            <FormControlLabel
              className ="rememberMe"
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
              style = {{marginTop:30 ,marginLeft: 0, Align: 'left'}}
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
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
}