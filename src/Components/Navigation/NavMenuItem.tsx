import React from 'react';
import { useLocation } from 'react-router';
import { Routes } from '../../App';

type MenuItmeProps = {
    icon: string,
    text: string,
    route: Routes
};

export default function NavMenuItem({ icon, text, route }: MenuItmeProps) {

    const location = useLocation();

    return (
        <li>
            <a href={route} 
               className={`nav-menu-item${location.pathname === route? ' selected' : ''}`}>
                <i className={`fas ${icon}`}></i>
                <span>{text}</span>
            </a>
        </li>
    );
}