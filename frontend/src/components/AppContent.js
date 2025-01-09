import * as React from 'react';
import { request, setAuthHeader } from '../helpers/axios_helper';
import Header from './Header';
import AuthContent from './AuthContent';
import logo from '../logo.svg';
import LoginForm from './LoginForm';
import WelcomeContent from './WelcomeContent';

export default class AppContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome"
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('auth_token');
        if (token) {
            setAuthHeader(token);
            this.setState({ componentToShow: "messages" });
        }
    }

    login = () => {
        this.setState({ componentToShow: "login" });
    };

    logout = () => {
        this.setState({ componentToShow: "welcome" });
        setAuthHeader(null);
    };

     onGoogleLogin = async () => {
        try {
        
            const response = await fetch("http://localhost:8081/oauth2/login/success", {
                method: "GET",
                credentials: "include" 
            });
    
            if (!response.ok) {
                throw new Error("Ошибка аутентификации");
            }
    
            const data = await response.json();
            localStorage.setItem("token", data.token); 
            setAuthHeader(data.token); 
            this.setState({ componentToShow: "messages" });
        } catch (error) {
            console.error("Ошибка при входе через Google", error);
        }
    };

    onLogin = (e, username, password) => {
        e.preventDefault();
        request("POST", "/login", {
            userName: username,
            password: password
        }).then((response) => {
            setAuthHeader(response.data.token);
            this.setState({ componentToShow: "messages" });
        }).catch((error) => {
            setAuthHeader(null);
            this.setState({ componentToShow: "welcome" });
        });
    };

    onRegister = (event, username, email, firstName, lastName, phone, password) => {
        event.preventDefault();
        request("POST", "/register", {
            userName: username,
            email: email,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            password: password
        }).then((response) => {
            setAuthHeader(response.data.token);
            this.setState({ componentToShow: "messages" });
        }).catch((error) => {
            setAuthHeader(null);
            this.setState({ componentToShow: "welcome" });
        });
    };

    render() {
        return (
            <>
                <Header
                    login={this.login}
                    logout={this.logout}
                    pageTitle="Название"
                    logoSrc={logo} />

                {this.state.componentToShow === "welcome" && <WelcomeContent />}
                {this.state.componentToShow === "login" && <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />}
                {this.state.componentToShow === "messages" && <AuthContent />}
            </>
        );
    }
}