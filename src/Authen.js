import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyB8bgxRm3dXZn53a62nYgXpLgksGGVaPVw",
    authDomain: "usurvey-3667a.firebaseapp.com",
    databaseURL: "https://usurvey-3667a.firebaseio.com",
    projectId: "usurvey-3667a",
    storageBucket: "usurvey-3667a.appspot.com",
    messagingSenderId: "917034498194"
  };
  firebase.initializeApp(config);

class Authen extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise.then(user => {
      var lout = document.getElementById('logout');
      lout.classList.remove('hide');
    });

    promise.catch(e =>{
      var err = e.message;
      console.log(err);
      this.setState({err: err})
    });

    promise
    .then(user => {
      var msg = "welcome "+ user.email+ " You are now logged in";
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({msg: msg});
    });
  }


  signup(){

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var err = "welcome "+ user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(user);
      this.setState({err: err});
    });
    promise
    .catch(e => {
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });

  }

  logout(){
    firebase.auth().signOut();
    var lout = document.getElementById('logout');
    lout.classList.add('hide');
  }

  google(){

    var provider = new firebase.auth.GoogleAuthProvider();
    var promise = firebase.auth().signInWithPopup(provider);

    promise.then( result => {
      var user = result.user;
      console.log(result);
      firebase.database().ref('users/'+user.uid).set({
        email: user.email,
        name: user.displayName
      });
    });

    promise.catch(e => {
      var msg = e.message;
      console.log(msg);
    });

  }

  constructor(props){
    super(props);

    this.state = {
      err: '',
      msg: ''
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
    this.google = this.google.bind(this);
  }

  render(){
    return(
      <div>
        <input id="email" ref="email" type="email" placeholder="Enter your Email" /><br />
        <input id="pass" ref="password" type="password" placeholder="Enter your Password" /><br />
        <p>{this.state.err}</p>
        <p>{this.state.msg}</p>
        <button onClick={this.login} >Log In</button>
        <button onClick={this.signup} >Sign Up</button>
        <button onClick={this.logout} id="logout" className="hide" >Log Out</button><br />
        <button onClick={this.google} id="google" className="google" >Sign In with Google</button>

      </div>
    );
  }
}

export default Authen;
