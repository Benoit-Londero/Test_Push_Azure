import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './Inscription.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Inscription() {
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
        let inscForm = document.getElementById('inscForm'); //on récupère l'élement <form> et ces différents <input>
        let myInscr = new FormData(inscForm); //que l'on intègre à un formData
        
        console.log(myInscr);

        const jsonForm = buildJsonFormData(myInscr)

        //On crée une boucle pour transformer le FormData en JSON
        function buildJsonFormData(myInscr){
            const jsonFormData = {};
            for(const pair of myInscr){
                jsonFormData[pair[0]] = pair[1];
            }

            return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
        }
        //console.log(jsonForm);

        fetch('/api/postInscription', { 
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(jsonForm) 
        })
        .then(res => res.json())
        .then(response=>{
            e.target.reset();
        })
        .then(navigate('/'))// On redirige vers le form de connexion
        .catch(err => console.info(err))
    }

  return (
    <div id="page_inscription">
        <Container>
            <Row className="inscription_form">
                <Col lg={12}>
                    <h1>CREER MON COMPTE</h1>
                <form id="inscForm" onSubmit={handleSubmit}>
                    <label>Nom<br/>
                        <input type="text" name="nom" placeholder="Doe" required/>
                    </label><br/>
                    <label>Prénom<br/>
                        <input type="text" name="prenom" placeholder="John" required/>
                    </label><br/>
                    <label>Email<br/>
                        <input type="email" name="email" placeholder="johndoe@mail.be" required/>
                    </label><br/>
                    <label>Mot de passe<br/>
                        <input type="password" name="pass" placeholder="*********" required/>
                    </label><br/>
                    <input type="submit" name="inscription" value="M'inscrire" />
                </form>

                <Link to ='/'> Retourner à l'accueil</Link>
                </Col>
               </Row>
        </Container>
        
    </div>
    )
}
