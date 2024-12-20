import * as React from 'react';
import classNames from 'classnames';

export default class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            active: "login",
            userName: "",
            password: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister
        };
    };

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name] : value});
    };

    onSubmitLogin = (e) => {
        this.state.onLogin(e, this.state.userName, this.state.password);
    };

    onSubmitRegister = (e) => {
      console.log("Registering user:", this.state.userName, this.state.password);
      this.state.onRegister(e, this.state.userName, this.state.password);
  };

    render() {
        return (
          <div className='AuthForm'>
        <div className="row justify-content-center margin">
            <div className="col-4">
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")} id="tab-login"
                  onClick={() => this.setState({active: "login"})}>Вход</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")} id="tab-register"
                  onClick={() => this.setState({active: "register"})}>Регистрация</button>
              </li>
            </ul>

            <div className="tab-content">
              <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} id="pills-login" >
                <form onSubmit={this.onSubmitLogin}>

                  <div className="form-outline mb-4">
                    <input type="login" id="userName" name= "userName" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="userName">Ник</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                    <label className="form-label" htmlFor="loginPassword">Пароль</label>
                  </div>

                  <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block mb-4">Войти</button>
                  </div>
                </form>
              </div>
              <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
                <form onSubmit={this.onSubmitRegister}>
                    <div className="form-outline mb-4">
                        <input type="text" id="registerUserName" name="userName" className="form-control" onChange={this.onChangeHandler}/>
                        <label className="form-label" htmlFor="registerUserName">Ник</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                        <label className="form-label" htmlFor="registerPassword">Пароль</label>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-primary btn-block mb-3">Зарегистироваться</button>
                    </div>
                </form>
              </div>
            </div>
            </div>
        </div>
        </div>
        );
    };

}