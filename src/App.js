import React, { Component } from 'react';
import { Navbar, Nav, Popover, OverlayTrigger, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './App.css';

// const auth = new Auth();
// auth.login();

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
        persons:[], 
    };
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  
  // accede au formulaire de création
  goToCreate = () =>{
    this.props.history.push('/create');
  }
  
  // componentDidMount(){
  //
  // }

  render() {

    return (
      <div className="App">
        <div className="App-nav">
          <header className="App App-header ">
              <a href="http://www.serli.com/">
                <img src='logo-serli-reserve.png' className="App-logo" alt="logo" />
              </a>
          </header>

          <Navbar>
            <Navbar.Header>
               <Navbar.Brand>
                   <Link className="nav-link" to="/home">Page d'accueil <span className="sr-only">(current)</span></Link>
                   {/*<Link className="nav-link" to="/premier">Page d'accueil <span className="sr-only">(current)</span></Link>*/}
              </Navbar.Brand>
            </Navbar.Header>

            <Nav>
              <NavItem eventKey={1}><div><Link to="/trombinoscope">Trombinoscope</Link></div></NavItem> 
              <NavItem eventKey={2}><div><Link to="">Lunch at work</Link></div></NavItem> 
            </Nav>

            <Nav pullRight>
              <OverlayTrigger trigger="click" placement="bottom" 
                overlay={
                  <Popover id="popover-positioned-bottom" title={'Info Serlien:'}>
                      <div className="">
                        <div className="">
                          <div className="">
                            {/*<b>{userName}</b>*/}
                          </div>
                      
                          <div className="">
                            <Link to="/profile">Votre profile</Link>
                          </div>
                        
                          <div className="">
                            <a href=""><i>Accerder à ma boîte email</i></a>
                            {/*<a href={`mailto:${userEmail}`}><i>Accerder à ma boîte email</i></a>*/}
                          </div>
                      
                          <div className="" style={{fontSize:"13px"}}>
                            <button onClick="">Déconnexion</button> {' '}
                            <button onClick=""> Se reconnecter </button>
                          </div>
                        </div>

                        {/*<div className="">*/}
                          {/*<div className="">*/}
                            {/*Vous n'êtes pas connecté.*/}
                          {/*</div>*/}
                        
                          {/*<div className="" style={{fontSize:"13px"}}>*/}
                            {/*<button onClick=""> Se connecter </button>*/}
                            {/*/!*<button onClick={ () => this.login()}> Se connecter </button>*!/*/}

                          {/*</div>*/}
                        {/*</div>*/}
                          {/**/}
                      </div>
                      
                  </Popover>}
              >
              {/* bouton user */}
                <button type="button" className="bouton1">
                  <span className="glyphicon glyphicon-user"></span>
                </button>
              </OverlayTrigger>
            </Nav>


        </Navbar>

        </div>
      </div>
    );
  }
}

export default App;


