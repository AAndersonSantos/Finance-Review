import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './sideBarData';
import { Link } from 'react-router-dom';
import './sidebar.css'
import { IconContext } from 'react-icons'
import LogOut from '../logout/logOut'

function SideBar() {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        if (sidebar === true) {
            document.body.style.marginLeft = "120px"
            document.body.style.transition = "850ms"

        } else {
            document.body.style.marginLeft = "0px"
            document.body.style.transition = "850ms"
        }
    })

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        <p>{item.icon}</p>
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}

                        <LogOut />

                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default SideBar;