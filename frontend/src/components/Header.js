import * as React from 'react';

export default function Header(props) {
    return (
        <header className="App-header d-flex align-items-center">
            <img src={props.logoSrc} className="App-logo" alt="logo" width="50px" height="30px" />
            <h1 className="App-title ms-5">{props.pageTitle}</h1>
            <div className="ms-auto">
                <button onClick={props.login} className="btn btn-primary me-2">Войти</button>
                <button onClick={props.logout} className="btn btn-light">Выйти</button>
            </div>
        </header>
    );
}