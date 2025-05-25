import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';

const Nav = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        document.body.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
    <>
    <nav className="container navbar navbar-expand-lg rounded bg-body-tertiary">
        <div className="container-fluid">

            <Link href="/projects" className="navbar-brand">Prject Management</Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    <li className="nav-item">
                        <Link href="/projects" className="nav-link active">Home</Link>
                    </li>

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {/* Theme */}
                            {theme === 'dark' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill"></i>}
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <button className="dropdown-item" onClick={() => setTheme('light')}>Light</button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => setTheme('dark')}>Dark</button>
                            </li>
                        </ul>
                    </li>

                    {/* <div className="d-flex align-items-center">
                        <button onClick={toggleTheme} className="btn btn-link text-dark fs-4" style={{ textDecoration: 'none' }} title="Toggle Theme">
                        {theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill"></i>}
                        </button>
                    </div> */}
                    
                </ul>
            </div>
        </div>
    </nav>
    </>
    )
}

export default Nav;