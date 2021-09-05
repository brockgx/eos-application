import React from 'react';
import 'animate.css' ;
import '../styles/home.css';


//Main homepage view/component
const Home = (props) => {

 function clickMe(){
     alert('You clicked me');
 } 


    return (
        <div>
            <div class="splash">
                <h1 class="fade-in">Please wait while your page loads :)</h1>
            </div>
            <div class='finished'></div>
            <h1>HOMEPAGE</h1>
            <p>[TO DO]</p>
            <p>Another paragraph</p>
            <div>
                <button onClick={clickMe}>
                    button
                </button>
            </div>
            <div>
                <form className='form'>
                    <p>Login</p>
                    <input className='username'></input>
                    <input className='password'></input>
                </form>
            </div>
        </div>
)}

export { Home }