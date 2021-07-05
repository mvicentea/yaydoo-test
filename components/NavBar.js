import { useState, useEffect, useRef} from 'react';
import Link from 'next/link'
import Router from 'next/router'
import Image from 'next/image'
import { useUser } from '../lib/hooks';

    const NavBar = () => {
        const user = useUser();
	    const session = user ? true:false;

        const headertoggle = useRef(null);
        const navbar = useRef(null);
        const header = useRef(null);

        useEffect(() => {
            showNavbar();
        });

        const handleClick = async () => {
            const res = await fetch('/api/logout', {method: 'get'});
            Router.push('/');
            Router.reload(window.location.pathname)

        }
        
        const showNavbar = () =>{
            const toggle = headertoggle.current,
            nav = navbar.current,
            bodypd = document.getElementById("__next"),
            headerpd = header.current;


            // Validate that all variables exist
            if(toggle && nav && bodypd && headerpd){
            // if(toggle && nav && headerpd){  
                toggle.addEventListener('click', ()=>{
                    // show navbar
                    nav.classList.toggle('sliNanShow');
                    // change icon
                    toggle.classList.toggle('bx-x');
                    // add padding to body
                    bodypd.classList.toggle('body-pd');
                    // add padding to header
                    headerpd.classList.toggle('body-pd');
                })
            }
        }
     
        return (<>
                
                <header className="header" id="header" ref = {header}>
                    <div className="header_toggle"> 
                    {session &&<i className='bx bx-menu' id="header-toggle" ref={headertoggle}></i>}
                    </div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <Link href="/">
                                            <a className="nav-link" aria-current="page">Home</a>
                                        </Link>
                                    </li>
                                    {!session && <li className="nav-item">
                                        <Link href="/login">
                                            <a className="nav-link " aria-current="page">Login</a>
                                        </Link>
                                    </li>}
                                    {session && <li className="nav-item">
                                        <a className="nav-link " aria-current="page" onClick = {handleClick}>SignOut</a>
                                    </li>}
                                    {!session && <li className="nav-item">
                                        <Link href="/signup">
                                            <a className="nav-link " aria-current="page">Signup</a>
                                        </Link>
                                    </li>}
                                    
                                </ul>

                                <Image
                                    className = "header_img"
                                    src="/images/doge.jpg"
                                    width = {40}
                                    height = {40}
                                    objectFit = "unset"
                                    objectPosition = "center"
                                />

                            </div>
                        </div>
                    </nav>
                </header>
                {session && <div className="l-navbar" id="nav-bar" ref ={navbar}>
                    <nav className="nav">
                        <div> 
                            <a href="#" className="nav_logo"> 
                                <i className='bx bx-layer nav_logo-icon'></i> 
                                <span className="nav_logo-name">Yaydoo Test</span> 
                            </a>
                            <div className="nav_list"> 
                                <Link href="/">
                                    <a className="nav_link active">
                                        <i className='bx bx-home-alt nav_icon'></i>
                                        <span className="nav_name">Home</span>
                                    </a>
                                </Link>
                                <Link href="/">
                                    <a className="nav_link"> 
                                        <i className='bx bx-grid-alt nav_icon'></i> 
                                        <span className="nav_name">Dashboard</span> 
                                    </a> 
                                </Link>
                                <Link href="/products">
                                    <a className="nav_link"> 
                                        <i className='bx bx-barcode nav_icon'></i> 
                                        <span className="nav_name">Products</span> 
                                    </a> 
                                </Link>
                                <Link href="/users">
                                <a className="nav_link"> 
                                    <i className='bx bx-user nav_icon'></i> 
                                    <span className="nav_name">Users</span> 
                                </a> 
                                </Link>
                            </div>
                        </div> 
                        <a className="nav_link" onClick = {handleClick}> 
                            <i className='bx bx-log-out nav_icon'></i> 
                            <span className="nav_name">SignOut</span> 
                        </a>
                    </nav>
                </div>}
                </>
             )
    }

export default NavBar