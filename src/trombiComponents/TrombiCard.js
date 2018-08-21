import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Trombinoscope.css';

export default class TrombiCard extends Component{
    
    static propTypes = {
        person: PropTypes.object,
        test : PropTypes.bool
    };

    constructor(props){
        super(props);
        this.state = {
            person: {},
            profile: {},
        }
    };

    componentDidMount() {

        let isAdmin = JSON.parse(sessionStorage.getItem('isAdmin'));
        let userEmail = sessionStorage.getItem("userEmail");
        this.setState({ isAdmin, userEmail });
        console.log("sessionStorage", isAdmin)
        console.log("userEmail", userEmail)
    };


    render(){ 
        const {person} = this.props;
        const image = person.image;
        const { userEmail, isAdmin} = this.state;
        let test = sessionStorage.getItem("test");
        console.log("userEmail1",userEmail);
        console.log("test",test)

        return(
            <div className="" >
                <div className="card">
                    <div className="card-border">
                            {
                                image ?
                                <img className="displayImg-trombi" style={{borderColor:person.color}} src={image} alt="visage"/>
                                :<img className="displayImg-trombi" src={'default.jpg'} alt="default" />
                            }
                        <div className="card-information-trombi">
                            <div>
                                <label>Nom: </label> {person.firstname} {" "} {person.lastname}
                            </div>
                            <div>
                                <label>Profession:</label> {person.occupation}
                            </div>
                            <div>
                                <label>Message d'accueil:</label> {person.welcomeMsg}
                            </div>
                            <div>
                                <label>Email:</label> {person.email}
                            </div>

                            <div className="card-action">
                                <span className="edit" title="Edit" data-toggle="tooltip"><Link to={`/update/${person.email}`}><i className="material-icons">&#xE254;</i></Link></span>
                                <span className="delete" title="Delete" data-toggle="tooltip" style={{cursor: "pointer"}} onClick={ () => {this.props.deletePerson(person)} }> <i className="material-icons">&#xE872;</i></span>
                            </div>
                        
                        </div>                                        
                    </div> 
                    <div className="card-name-trombi">
                        <Link to={`/person/${person.email}`} style={{marginTop:"215px"}}>
                        {
                            person.firstname
                        }
                        <br/>
                        {
                            person.lastname
                        }
                        </Link>
                    </div>


                </div> 
            </div>
        )
    }
}