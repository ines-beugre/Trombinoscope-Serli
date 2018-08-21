import React, { Component } from 'react'; 
import PropTypes from 'prop-types';
import TrombiCard from './TrombiCard';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import '../App.css';
import './Trombinoscope.css';

import * as PersonServices from '../services/person';

export class Trombinoscope extends Component {

    static propTypes = {
        onSelectedPerson: PropTypes.func,
        persons: PropTypes.array, 
        person: PropTypes.object,
    };

    constructor(props){
        super(props);
        this.state = {
            persons: [],
            personsToDisplay: [],
            person: {},
            search:'',
            choiceSort:'',
            profile: {},
            isAdmin:false,
            existPerson: true,
            test : false,
            userInfo : null
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handleSortFirstname = this.handleSortFirstname.bind(this);
        this.handleSortLastname = this.handleSortLastname.bind(this);
    }

    displayList(){
        PersonServices.getPersonList()
            .then(r => r.json())
            .then(persons => {
                persons.slice || (persons = []);
                this.setState({persons, personsToDisplay: persons})
            });
    }
  
    handleSort = (e) => {
        const choice = (e.target.value);
        console.log("choiceSort:", choice);
        if(choice === "sortFirstname") {
            this.handleSortFirstname();
            sessionStorage.setItem("test","true");
        } else if (choice === "sortLastname") {
            this.handleSortLastname();
            sessionStorage.setItem("test","false");
        } else {
            this.displayList();
        }
        e.preventDefault();
    }

    handleSortFirstname = () => {
        console.log("sorfirst");
        PersonServices.sortFirstname()
            .then(r => r.json())
            .then(persons => {
                persons.slice || (persons = []);
                this.setState({persons, personsToDisplay: persons});
            })
    }

    handleSortLastname = () => {
        console.log("sortlasst");
        PersonServices.sortLastname()
            .then(r => r.json())
            .then(persons => {
                persons.slice || (persons = []);
                this.setState({persons, personsToDisplay: persons});
            })
    }

    componentDidMount () {
        {this.displayList()};
        this.getHome();
    };

    // barre de recherche
    handleSearch = (e) => {
        console.log("updateSearch", e.target.value);
        const persons = this.search(e.target.value);
        this.setState({search: e.target.value, personsToDisplay: persons});
    }

    search = (query) => {
        const {persons} = this.state;
        return persons.filter(
            (person) => {
                let queryObject = Object.keys(person).filter(
                    (key) => {
                        return person[key].toLowerCase && person[key].toLowerCase().indexOf(query) !== -1;
                    }
                );
                return queryObject.length > 0
            }
        );
    }

    // redirection pour créer une personne
    goToCreate = () => {
        this.props.history.push(`/create`);

    }

    // suppression d'une personne
    handleDelete = (person) => {
        console.log("list", this.state.persons);
        console.log("person a supprimer", person.name);
        PersonServices.removePerson(person.email).then(()=>{
            this.displayList();
            let message = person.firstname + " " + person.lastname + " a été supprimé(e)";
            alert(message);
        }); 
    }

    deletePerson=(person)=>{
        if (window.confirm(`Êtes-vous sur? Ce processus est irreversible.`)){
            this.handleDelete(person)
        }
    }

    getHome(){
        PersonServices.getHome()
            .then(r => r.json())
            .then(userInfo => {
                console.log('userInfo', userInfo)
                this.setState({userInfo : userInfo})
            })
    }
    
    render(){

        const personsToDisplay = this.state.personsToDisplay;
        const userInfo = this.state.userInfo;
        console.log("userInfo : ", userInfo)

        return(
            

            <div className="App">
                <h2 className="trombi-title"><b>Membres de la Team Serli</b></h2>

                        <OverlayTrigger placement="bottom"
                            overlay={  <Tooltip id="tooltip" >  Ajouter une nouvelle personne :).</Tooltip>} >
                            <button type="button" className="bouton2" onClick={ () =>this.goToCreate() }>
                             <i className="fa fa-plus"></i>
                             </button>
                        </OverlayTrigger> 

                    <div className="space">
                    </div>
                    {/* barre de recherche */}
                    <div className="flex">
                    <div className="search-bar">
                        <div className="input-group">
                            <label htmlFor="search" className="input-group-addon" style={{minWidth: "20px"}}>
                            <i className="fa fa-fw fa-search" />
                            </label>        
                            <input
                                id="query"
                                type="text"
                                value={this.state.search}
                                onChange={this.handleSearch.bind(this)}
                                className="form-control"
                                placeholder="Search..."
                            />
                        </div>
                        <p>{this.state.query}</p>
                    </div>

                        {/* tri */}

                    <div >
                        <select className="styled-select blue semi-square " value={this.state.value} onChange={this.handleSort}>
                            <option value="list"> Trier par...  </option>
                            <option value="sortFirstname"> prénom </option>
                            <option value="sortLastname" > nom </option>
                            <div className="border">
                            </div>
                        </select>
                    </div>

                    </div>
 <div className="space">
 </div>


                    {/* affichage des personnes */}
                    <div className="trombi-container animated pulse">
                            {
                            personsToDisplay.map(person =>(
                                <TrombiCard key={person.email} person = {person} deletePerson = {this.deletePerson.bind(this)}/>
                                )
                            )    
                            }
                    </div>

                    {/* bouton d'ajout d'une personne */}


                        <div className="">
                            <button type="button" className="add" onClick={ () => {this.goToCreate()} }>
                            <i className="fa fa-plus"></i> Ajouter une nouvelle personne :)</button>
                        </div>
            </div> 
        ) 
    }
}
