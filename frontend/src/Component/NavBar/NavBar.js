import React, { useState, useEffect } from 'react';
import { SidebarData } from "./SlidebarData";
import './NavBar.css';
import { NavLink} from 'react-router-dom';
import logo from '../../img/logo_ahgency.png';


function NavBar(){

     const [menu, setMenu] = useState([]);
     const currentRole = (localStorage.getItem("currentRole").replaceAll('"',''));
     const currentName = (localStorage.getItem("currentNOM").replaceAll('"',''));
     const currentPname = (localStorage.getItem("currentPNOM").replaceAll('"',''));
     const currentMail = (localStorage.getItem("currentMAIL").replaceAll('"',''));

     useEffect(() => {
      const LoadMenu = () => {
        if (currentRole !== "administrator") {
            SidebarData.filter(recherche => recherche.admin === false).map((donnee) => setMenu(menu => [...menu, donnee]));
        } else {
            SidebarData.map((donnee) => setMenu(menu => [...menu, donnee]));
        }
      }

      LoadMenu();
      }, [currentRole]);
        
      return (
          <div className="s-sidebar__nav">

                <div id="gen_settings">
                    <img src={logo} alt="Logo_AhGency"></img>
                    <p className="myinfo_nav"><span className="name">Hello {currentName} {currentPname}</span>
                      <br></br>
                      <span className="role">{currentMail}</span>
                      <br></br>
                      <span className="role">{currentRole}</span>
                    </p>
                </div>

               <ul className="NavBar">
                <h2>Application</h2>
                    {
                           menu.filter(menu => menu.category === 'app').map((item, index) => {
                          return ( <li key = { index }>
                            <NavLink to = { item.path } 
                                    className = { item.cName } 
                                    
                                    ><p>{ item.icon }<br></br><span className="desktop"> {item.title}</span></p>
                            </NavLink></li>
                          )})
                    }
                
                { currentRole === 'administrator' ? <h2>Administration</h2> : null}
                    {
                      menu.filter(menu => menu.category === 'admin').map((item, index) => {
                          return ( <li key = { index }>
                            <NavLink to = { item.path } 
                                    className = { item.cName } 
                                    
                                    ><p>{ item.icon }<br></br><span className="desktop"> {item.title}</span></p>
                            </NavLink></li>
                          )})
                    }
                <h2>Mon compte</h2>
                    {
                      menu.filter(menu => menu.category === 'account').map((item, index) => {
                          return ( <li key = { index }>
                            <NavLink to = { item.path } 
                                    className = { item.cName } 
                                    
                                    ><p>{ item.icon }<br></br><span className="desktop"> {item.title}</span></p>
                            </NavLink></li>
                          )})
                    }               
               </ul>


          </div>  
     );    
};

export default NavBar

