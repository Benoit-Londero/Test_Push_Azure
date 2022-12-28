import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";


import AjoutClient from '../AjoutClient/AjoutClient.js';

import Button from 'react-bootstrap/Button';

export default function Clients() {

     const [addClient, setAddClient] = useState(false);

     const [showDetails, setShowDetails] = useState(false);
     const [showEntreprise, setShowEntreprise] = useState(false);

     /* Création Variable pour liste + infos Clients - AJOUT BENOIT DEC. 2022 */

     const [currentNOM, setCurrentNOM] = useState();
     const [currentPNOM, setCurrentPNOM] = useState();
     const [currentMAIL, setCurrentMAIL] = useState();
     const [currentID, setCurrentID] = useState();
     const [currentIDentr, setCurrentIDentr] = useState();
     const [currentRole, setCurrentRole] = useState();
     const [currentMina, setCurrentMina] = useState();
     const [currentTitre, setCurrentTitre] = useState();

     const [allUsers, setAllUsers] = useState([]);
     const [data,setDataClient] = useState();

     /* Création Variable pour liste + infos Entreprise - AJOUT BENOIT DEC. 2022 */

     const [currentIDE, setCurrentIDE] = useState();
     const [currentNOMSOC, setCurrentNOMSOC] = useState();
     const [currentMAILE, setCurrentMAILE] = useState();
     const [currentTVA, setCurrentTVA] = useState();
     const [currentADR, setCurrentADR] = useState();
     const [currentTelEnt, setCurrentTelEnt] = useState();
     const [currentDatCrea, setCurrentDatCrea] = useState();
     const [currentMaint, setCurrentMaint] = useState();
     const [currentSiteWeb, setCurrentSiteWeb] = useState();
     
     const [allEntreprise, setAllEntreprise] = useState([]);
     const [dataE, setDataEntr] = usestate();

     

/*      const currentIDU = localStorage.getItem("currentIDU");
     const currentIDE = localStorage.getItem("currentIDE"); */

     useEffect (() => {

          const listUser = async () => {
               const response = await fetch('/api/getAllUsers');

               const result = await response.json();
               if(response.status === 200){
                    setAllUsers(result)
                    console.log(allUsers);
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard');
               }
          }

          listUser();

          const listEntrep = async () => {
               const response = await fetch('/api/getAllEntreprise');

               const res = await response.json();
               if(res.status === 200){
                    setAllEntreprise(res);
                    console.log(allEntreprise);
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard')
               }
          }

          listEntrep();
     }, [])

     /* AJOUT BENOIT - DECEMBRE 2022 */

          const handleAddClient = (e) =>{
               setAddClient(true);
          }

          const closeTasks = (e) => {
               setAddClient(false);
               setShowDetails(false);
               setShowDetailsEntreprise(false);
          }

          /** Switch l'affichage entre l'onglet client & entreprise **/
          const handleEntreprise = (e) => {
               let onglet = e.target.value;
               if(onglet === "entreprise"){
                    setShowEntreprise(true)
               } else {
                    setShowEntreprise(false);
               }
               e.target.classList.toggle('active');
          }

          /** Function qui permet de récupérer les informations CLIENTS et de les définir pour la modale **/
          const handleShowClient = (e) => {
               let id_client = e.target.value;
               
               let jsonID = {currentIDUser: id_client};
               console.log(jsonID);

               fetch('/api/getInfosClient', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(jsonID)
               })
               .then(res => res.json())
               .then(json => setDataClient(json))
               .then(console.log(data))

               .then(setCurrentID(data.ID))
               .then(setCurrentNOM(data.Nom))
               .then(setCurrentPNOM(data.Prenom))
               .then(setCurrentMAIL(data.Email))
               .then(setCurrentIDentr(data.ID_entreprise))
               .then(setCurrentRole(data.Role))
               .then(setCurrentMina(data.Minutes_Achetees))
               .then(setCurrentTitre(data.Titre))

               .then(setShowDetails(true))
               .catch(err => console.info(err))
          }

          /** Function qui permet de récupérer les informations ENTREPRISE et de les définir pour la modale **/
          const handleShowEntreprise = (e) => {
               let id_entr = e.target.value;
               
               let jsonID = {currentIDE: id_entr};
               console.log(jsonID);

               fetch('/api/getInfosEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(jsonID)
               })
               .then(res => res.json())
               .then(json => setDataEntr(json))
               .then(console.log(dataE))

               .then(setCurrentIDE(dataE.ID_entreprise))
               .then(setCurrentNOMSOC(dataE.Nom_societe))
               .then(setCurrentTVA(dataE.TVA))
               .then(setCurrentADR(dataE.Adresse))
               .then(setCurrentTelEnt(dataE.Telephone))
               .then(setCurrentMAILE(dataE.Email))
               .then(setCurrentDatCrea(dataE.Date_creation))
               .then(setCurrentMaint(dataE.Maintenance))
               .then(setCurrentSiteWeb(dataE.Site_Web))

               .then(setShowEntrDetails(true))
               .catch(err => console.info(err))
          }

     return (

     <div>
     <NavBar />
     
     <div className="project_sidebar">
          <h2>CRM</h2>

          <ul>
               <li><Button className='btn noborder' value="clients" onClick={handleEntreprise}>Clients</Button></li>
               <li><Button className='btn noborder' value="entreprise" onClick={handleEntreprise}>Entreprise</Button></li>
               <li><Button className="btn sidebar_btn" onClick={handleAddClient}>+</Button></li>
          </ul>
     </div>

     <Container id="page_dashboard"  className="main__content">

          <Row>
               {showEntreprise === false ?
                    <Col className="tbl" id="TblClients">
                         <h2>Clients</h2>
                         <table>
                              <thead>
                                   <th><p>Nom</p></th>
                                   <th><p>Entreprise</p></th>
                                   <th><p>Projets</p></th>
                                   <th><p>Créé</p></th>
                                   <th><p>Action</p></th>
                              </thead>
                              <tbody>
                                   {/* <tr>
                                        <td><p>Vicky Allard</p></td>
                                        <td><p>Greenkids</p></td>
                                        <td><p>4</p></td>
                                        <td><p>20.12.2022</p></td>
                                        <td><Button className="dts_client" onClick={handleShowClient} value="55">...</Button> </td>
                                   </tr> */}

                                   {allUsers && allUsers.map((item,index) => {
                                        return(
                                             <tr key={index}>
                                                  <td><p>{item.Nom} {item.Prenom}</p></td>
                                                  <td><p>{item.ID_entreprise}</p></td>
                                                  <td><p>{item.Titre}</p></td>
                                                  <td><p>{item.Date_creation}</p></td>
                                                  <td><Button className="dts_client" onClick={handleShowClient} value={item.ID}>...</Button> </td>
                                             </tr>
                                        )
                                   })
                                   }
                              </tbody>
                         </table>
                    </Col> 

               :    
                    <Col className="tbl" id="TblClients">
                         <h2>Entreprise</h2>
                         <table>
                              <thead>
                                   <th><p>Nom de l'entreprise</p></th>
                                   <th><p>Membres</p></th>
                                   <th><p>Créé</p></th>
                                   <th><p>Action</p></th>
                              </thead>
                              <tbody>
                                   <tr onClick={handleShowClient} value="3">
                                        <td><p>Greenkids</p></td>
                                        <td>
                                             <p className="bdg_user">V</p>
                                             <p className="bdg_user">S</p>
                                             <p className="bdg_user">J</p>
                                        </td>
                                        <td><p>20</p></td>
                                        <td><p>20.12.2022</p></td>
                                   </tr>

                                   {allEntreprise && allEntreprise.map((item,index) => {
                                        return(
                                             <tr key={index}>
                                                  <td><p>{item.Nom_societe}</p></td>
                                                  <td><p>{item.Email}</p></td>
                                                  <td><p>{item.Date_creation}</p></td>
                                                  <td><Button className="dts_client" onClick={handleShowEntreprise} value={item.ID_entreprise}>...</Button> </td>
                                             </tr>
                                        )
                                   })
                                   }
                              </tbody>
                         </table>
                    </Col> 
          }

          </Row>

          {addClient === true ? <Row className="modal__newTask">
               
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         <AjoutClient/>
                    </div>  
          </Row> : ''}

          {showDetails === true ? 
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         <h2>Détails Client</h2>

                         <div>
                              <table>
                                   <tr>
                                        <td><p className="bold">ID Client :</p></td>
                                        <td><p>{currentID}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Role :</p></td>
                                        <td><p>{currentRole}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Nom :</p></td>
                                        <td><p>{currentNOM}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Prénom :</p></td>
                                        <td><p>{currentPNOM}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Adresse mail :</p></td>
                                        <td><p>{currentMAIL}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">ID Entreprise :</p></td>
                                        <td><p>{currentIDentr}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Fonction :</p></td>
                                        <td><p>{currentTitre}</p></td>
                                   </tr>
                                   
                                   <tr>
                                        <td><p className="bold">Minutes achetées :</p></td>
                                        <td><p>{currentMina}</p></td>
                                   </tr>
                              </table>
                         </div>
                    </div>  
               </Row>
          : ''}

          {showDetailsEntreprise === true ? 
               <Row className="modal__newTask">
                    <div id="modal_desktop">
                         <button className="close_modale" onClick={closeTasks}>X</button>                                   
                         <h2>Détails Entreprise</h2>

                         <div>
                              <table>
                                   <tr>
                                        <td><p className="bold">ID Entreprise :</p></td>
                                        <td><p>{currentIDE}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Nom société :</p></td>
                                        <td><p>{currentNOMSOC}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">TVA :</p></td>
                                        <td><p>{currentTVA}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Adresse :</p></td>
                                        <td><p>{currentADR}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Telephone :</p></td>
                                        <td><p>{currentTelEnt}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Email :</p></td>
                                        <td><p>{currentMAILE}</p></td>
                                   </tr>
                                   <tr>
                                        <td><p className="bold">Maintenance :</p></td>
                                        <td><p>{currentMaint}</p></td>
                                   </tr>
                                   
                                   <tr>
                                        <td><p className="bold">Site Web :</p></td>
                                        <td><p>{currentSiteWeb}</p></td>
                                   </tr>

                                   <tr>
                                        <td><p className="bold">Date création :</p></td>
                                        <td><p>{currentDatCrea}</p></td>
                                   </tr>
                              </table>
                         </div>
                    </div>  
               </Row>
          : ''}
     </Container>
     </div>
      )
 }