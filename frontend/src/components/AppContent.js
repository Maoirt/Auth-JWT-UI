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

    onRegister = (event, username, password) => {
        event.preventDefault();
        request("POST", "/register", {
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