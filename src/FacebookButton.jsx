import React from 'react';

export default class FacebookButton extends React.Component {
   constructor(props) {
      super(props);

      this.FB = props.fb;

      this.state = {
         message: ""
      };
   }

   componentDidMount() {
      this.FB.Event.subscribe('auth.login', 
         this.onLogin.bind(this));
      this.FB.Event.subscribe('auth.logout', 
         this.onLogout.bind(this));
   }

   onLogin(response) {
      var self = this;
      this.FB.api('/me', function(response) {
         var message = "Welcome " + response.name;
         self.setState({
            message: message
         });
      });
   }

   onLogout(response) {
      this.setState({
         message: ""
      });
   }

   render() {
      return (
         <div>
            <div 
               className="fb-login-button" 
               data-max-rows="1" 
               data-size="xlarge" 
               data-show-faces="false" 
               data-auto-logout-link="true"
               >
            </div>
            <div>{this.state.message}</div>
         </div>
      );
   }
};
