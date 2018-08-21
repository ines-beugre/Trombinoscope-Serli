import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';

class Profile extends Component {

  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;

    if (!userProfile) {
      getProfile((err, profile) => {
        const appMetadata = profile['https://auth0-serli/metadata/app_metadata'];
        const isAdmin = appMetadata.is_admin;
        const userEmail = profile.email;

        sessionStorage.getItem('isAdmin', isAdmin);
        sessionStorage.getItem('userEmail', userEmail);
        sessionStorage.getItem('userName', profile.name);
        // sessionStorage.setItem('existPerson', existPerson);
        
        console.log('isadminP', isAdmin)
        console.log('userEmail', userEmail)

        this.setState({ profile: profile, isAdmin: isAdmin });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state;
    const appMetadata = profile['https://auth0-serli/metadata/app_metadata'];

    return (
      <div className="Add-form animated pulse">
        <div className="App">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img className="imgprofile" src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname: <b>{profile.nickname}</b></ControlLabel>
              
            </div>
            <pre>
                {/* {JSON.stringify(profile, null, 2)}<br/> */}
                Prénom: {profile.given_name} <br/>
                Nom: {profile.family_name} <br/>
                Email: {profile.email} <br/>
                {/* Admin: {appMetadata} <br/> */}
                <i><a href={`mailto:${profile.email}`}>Acceder à ma boîte mail</a></i><br/>
            </pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;