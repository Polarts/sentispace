import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Routes } from '../../App';

type MenuItmeProps = {
    icon: string,
    text: string,
    route: Routes,
    onClick?: () => void
};

export default function NavMenuItem({ icon, text, route, onClick }: MenuItmeProps) {

    const location = useLocation();

    return (
        <li onClick={onClick}>
            <Link to={route} 
                  className={`nav-menu-item${location.pathname === route? ' selected' : ''}`}>
                <i className={`fas ${icon}`}></i>
                <span>{text}</span>
            </Link>
        </li>
    );
}