import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Entreprise.css';

import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
/* 
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom"; */

export default function Entreprise() {

     const [currentNomE, setCurrentNomE] = useState();
     const [currentTVA, setCurrentTVA] = useState();
     const [currentADRESSE, setCurrentADRESSE] = useState();
     const [currentTEL, setCurrentTEL] = useState();
     const [currentEMAILE, setCurrentEMAILE] = useState();
     const [currentSITE, setCurrentSITE] = useState();
     const [minEntreprise, setMinEntreprise] = useState();
     const [totminEntreprise,setTotMinEntreprise] = useState();
     const [tempsAlloue, setTempsAlloue] = useState();
     const [validation, setValidation] = useState(false);

     const [checkPercent, setCheckPercent] = useState();

     const currentIDE = localStorage.getItem("currentIDE");

     useEffect(() => {
          let dataE = {currentIDEntreprise: currentIDE};
          
          const onLoad = async () => {
               const response = await fetch('/api/getInfosEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               })
     
               const data = await response.json();
               
               if(response.status === 200){
                    setCurrentNomE(data.Nom_societe); 
                    setCurrentTVA(data.TVA);
                    setCurrentADRESSE(data.Adresse);
                    setCurrentTEL(data.Telephone);
                    setCurrentEMAILE(data.Email);
                    setCurrentSITE(data.Site_web);
               } else {
                    alert('Erreur du serveur, veuillez réessayer plus tard');
               }

               fetch('/api/getHeureEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               })
               .then(res => res.json())
               .then(json => setMinEntreprise(json[0].minutesEntreprise))
               .catch(err => console.info(err))

               fetch('/api/getTempsAlloue', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               })
               .then(res => res.json())
               .then(json => setTempsAlloue(json[0].minutesAllouees))
               .then(console.log(res))
               .catch(err => console.info(err))

               const respHour = await fetch('/api/getTotHeurEntreprise', { 
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(dataE)
               });

               const data_hour = await respHour.json();
               const minRes = Number(data_hour.totachEntreprise - data_hour.restheEntreprise);

               console.log(minRes);
               console.log(typeof(data_hour.totachEntreprise));

               if (parseInt(data_hour.totachEntreprise) === 0) {
                    
                    Math.round(((100*minRes) / totminEntreprise))

                    const percentage = 0;
                    setCheckPercent(percentage);
                    setTotMinEntreprise(data_hour.totachEntreprise);

                    console.log(percentage);

               } else {
                    const percentage = Math.round(((100*minRes) / Number(data_hour.totachEntreprise)));
                    console.log('hooooo')
                    setCheckPercent(percentage);
                    setTotMinEntreprise(data_hour.totachEntreprise);

                    console.log(percentage);

               } 
          }

          onLoad();
     }, [currentIDE])


     const handleClick = async e => {
          e.preventDefault();
          let editForm = document.getElementById('editForm'); //on récupère l'élement <form> et ces différents <input>
          let dataForm = new FormData(editForm); //que l'on intègre à un formData

          const formJSON = buildJsonFormData(dataForm);

          //On crée une boucle pour transformer le FormData en JSON
          function buildJsonFormData(dataForm){
               const jsonFormData = {};
               
               for(const pair of dataForm){
                    jsonFormData[pair[0]] = pair[1];
               }
               return jsonFormData; // On retourne l'objet pour pouvoir l'envoyer
          }

          const response = await fetch('/api/editEntInfo', { 
               method: 'POST',
               headers: {'Content-Type': 'application/json'},
               body: JSON.stringify(formJSON)
          })

          const ress = await response.json();
          if(response.status === 200)
          {
               console.log(ress);
               setValidation(true);
          }
     }

     const styleProgress = {
          backgroundColor: '#6610f2',
          width: `${checkPercent}%`
     }

     const warningProgress = {
          backgroundColor: '#ff0000',
          width: `${checkPercent}%`
     }

     return (
          <div id="page_entreprise">
               <Container>
                    <h2><BsIcons.BsBuilding/>Entreprise</h2>
                    <Row>
                         <div className="stats_account">
                              <table>
                                   <tr><td colspan="4"><h2>Statistiques</h2></td></tr>          
                                   <tr>
                                        <td>
                                             <p>Achetées : {Math.round(totminEntreprise/60)} h</p>
                                             <p className="highlight">Restantes : {Math.trunc(minEntreprise /60)} h {minEntreprise % 60 } min 
                                                  <br></br> (dont {Math.trunc(tempsAlloue /60)} h {tempsAlloue % 60 } allouées)</p> 
                                        </td>
                                        <td><p><b>Dépensé : {Math.round(((totminEntreprise/60) * 90))} €</b></p></td>                              
                                   </tr>
                                   <tr>
                                        <td colspan="2">
                                             {checkPercent < 10 ?
                                                  <div id="progress_bar"  style={styleProgress} ><p>{checkPercent} %</p>
                                                  </div>
                                                  : <div id="progress_bar"  style={warningProgress}><p>{checkPercent} %</p>
                                                  </div>}
                                             
                                        </td>
                                   </tr>
                                   <tr>{/* {checkPercent > 10 ? null : <Link to ='/Credits'><Button className="recharger">Recharger</Button></Link>} */}</tr>
                              </table>
                         </div>
                    </Row>
                    <Row>    
                         <Col>
                              <form id="editForm" onSubmit={handleClick}>
                                   <table className="Profil">
                                        <tbody>
                                             <tr>
                                                  <td><label className="bold">Nom: </label></td>
                                                  <td><input type="text" name="nom" placeholder="Nom de l'entreprise" defaultValue ={currentNomE} required/></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"> Numéro de TVA: </label></td>
                                                  <td><input type="text" name="tva" placeholder="BE123456789" defaultValue ={currentTVA} required/></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"> Adresse: </label></td>
                                                  <td><input type="text" name="adresse" placeholder="Votre adresse" defaultValue ={currentADRESSE} required/></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"><BsIcons.BsFillTelephoneFill/> Téléphone: </label></td>
                                                  <td><input type="tel" id="telephone" name="telephone" placeholder="01/234.567" defaultValue ={currentTEL}></input></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"><MdIcons.MdAlternateEmail/> Email: </label></td>
                                                  <td><input type="mail" id="email" name="email" placeholder="bernard@bouchard.be" defaultValue= {currentEMAILE}></input></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"> Site: </label></td>
                                                  <td><input type="text" id="web" name="web"  defaultValue= {currentSITE}></input></td>
                                             </tr>
                                             <tr>
                                                  <td><label className="bold"> Membres: </label></td>
                                                  <td>
                                                       <p className="bdg_user">F</p>
                                                       <p className="bdg_user">Q</p>
                                                       <p className="bdg_user">B</p>
                                                  </td>
                                             </tr>
                                             <tr>
                                                  <td colspan="2"><input type="hidden" id="idE" name="idE" defaultValue= {currentIDE}></input>
                                                  <input type="submit" name="modifier" value="Enregistrer" /></td>
                                             </tr>
                                        </tbody>
                                   </table>
                              </form>
                              {validation === true ? <tr><td colspan="3"><span>Vos données ont bien été modifiées !</span></td></tr> : null}
                              </Col>
                         </Row>          
                    </Container>
               </div>
          )
          }
