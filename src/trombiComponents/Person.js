import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { Link } from 'react-router-hash-link';

import { Pager} from 'react-bootstrap';

import './Person.css';
import * as PersonServices from '../services/person';

export class  Person extends Component{
    
    static propTypes = {
        person: PropTypes.object,
    };

    constructor(props){
        super(props);
        
        this.state = {
            person: {}
        }
    };

    componentDidMount() {
        this.onSelectPerson(this.props.match.params.email);
    };

    onSelectPerson = (email) => {
        PersonServices.displayPerson(email)
            .then(r => r.json())
            .then(person => this.setState({person}));
    };

    handleDelete = (person) => {
        console.log("list", this.state.persons);
        console.log("person a supprimer", person.name);
        PersonServices.removePerson(person.email).then(()=>{
            this.props.history.push("/list");
            let message = person.firstname +" "+ person.lastname + " a été supprimé(e)";
            alert(message);
        }); 
    };

    render(){    
        const {person} = this.state;
        const image = person.image;

        return(
            <div className="App form-person" >
                <h3 className="person-title">Profil</h3>
                    <div className="card-person">                        
                        <div className="zoom card-image-person">
                            <div>
                                {image 
                                    &&<img className="displayImg-person" src={image} alt="visage" />
                                }
                             </div>
                        </div>
                    </div> 
                    <div className="card-information-person">
                        <label>Nom:</label> {person.lastname} <br/>
                        <label>Prénom:</label> {person.firstname} <br/>
                        <label>Profession:</label> {person.occupation} <br/>
                        <label>Couleur:</label> 
                            <span className="person-color" style={{backgroundColor:person.color} }/> <br/>
                        <label>Message d'accueil:</label> {person.welcomeMsg} <br/>
                        <label>Email: &nbsp; </label>
                            <a href={`mailto: ${person.email}`}>{person.email}</a> <br/>
                    </div>
                    
                    <div className="card-action">
                        <Pager>
                            <Pager.Item><Link to={`/update/${person.email}`}>Mettre à jour</Link></Pager.Item>

                            {' '}
                            <Pager.Item data-toggle="modal" data-target="#myModal">Supprimer</Pager.Item>

                                <div className="modal fade" id="myModal" role="dialog" >
                                    <div className="modal-dialog modal-sm" style={{ background:"#6c1212", boxShadow:"0 0 40px -10px rgb(161, 10, 10)"}}>
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                <h4 className="modal-title">Êtes-vous sur?</h4>
                                          </div>
                                            <div className="modal-body">
                                                <p>Voulez-vous supprimer: "<b>{person.firstname} {person.lastname}</b>"? <br/>Ce processus est irreversible.</p>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={ ()=>{this.handleDelete(person)} } >Supprimer</button>
                                                <button type="button" className="btn btn-default" data-dismiss="modal">Fermer</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {' '}
                            <Pager.Item><Link to="/trombinoscope">Précédent</Link></Pager.Item>
                        </Pager>
                    </div>
                    
            </div>
        )
    }
}
