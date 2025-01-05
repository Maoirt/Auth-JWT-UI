import * as React from 'react';
import classNames from 'classnames';

export default class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: "login",
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      // authProvider: "",
      onLogin: props.onLogin,
      onRegister: props.onRegister
    };
  };

  onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  onSubmitLogin = (e) => {
    this.state.onLogin(e, this.state.userName, this.state.password);
  };

  onSubmitRegister = (e) => {
    console.log("Registering user:", this.state.userName, this.state.password);
    this.state.onRegister(e, this.state.userName, this.state.email, this.state.firstName, this.state.lastName, this.state.phone, this.state.password/*, this.state.authProvider*/);
  };

  loginGoogle = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/google"
  }

  loginGithub = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/github"
  }

  render() {
    return (
      <div className='AuthForm'>
        <div className="row justify-content-center margin">
          <div className="col-4">
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "login" ? "active" : "")} id="tab-login"
                  onClick={() => this.setState({ active: "login" })}>Вход</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className={classNames("nav-link", this.state.active === "register" ? "active" : "")} id="tab-register"
                  onClick={() => this.setState({ active: "register" })}>Регистрация</button>
              </li>
            </ul>

            <div className="tab-content">
              <div className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")} id="pills-login" >
                <form onSubmit={this.onSubmitLogin}>

                  <div className="form-outline mb-4">
                    <input type="login" id="userName" name="userName" className="form-control" onChange={this.onChangeHandler} />
                    <label className="form-label" htmlFor="userName">Ник</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password" id="loginPassword" name="password" className="form-control" onChange={this.onChangeHandler} />
                    <label className="form-label" htmlFor="loginPassword">Пароль</label>
                  </div>

                  <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Войти</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button type="submit" className="btn btn-primary btn-block mb-2" onClick={this.loginGithub}>
                      Войти с GitHub
                    </button>

                    <button type="submit" className="btn btn-primary btn-block mb-2" onClick={this.loginGoogle}>
                      Войти с Google
                    </button>
                  </div>
                </form>
              </div>
              <div className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")} id="pills-register" >
                <form onSubmit={this.onSubmitRegister}>
                  <div className="form-outline mb-4">
                    <input type="text" id="registerUserName" name="userName" className="form-control" onChange={this.onChangeHandler} />
                    <label className="form-label" htmlFor="registerUserName">Ник</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="email" id="registerEmail" name="email" className="form-control" onChange={this.onChangeHandler} />
                    <label className="form-label" htmlFor="registerEmail">Почта</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="registerFirstName" name="firstName" className="form-control" onChange={this.onChangeHandler} />
                    <label className="form-label" htmlFor="registerFirstName">Имя</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="registerLastName" name="lastName" className="form-control" onChange={this.onChangeHandler} />
                    <label className="form-label" htmlFor="registerLastName">Фамилия</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="text" id="registerPhone" name="phone" className="form-control" onChange={this.onChangeHandler} />
                    <label className="form-label" htmlFor="registerPhone">Телефон</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" id="registerPassword" name="password" className="form-control" onChange={this.onChangeHandler} />
                    <label className="form-label" htmlFor="registerPassword">Пароль</label>
                  </div>
                  <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <button type="submit" className="btn btn-primary btn-block mb-2">Зарегистироваться</button>
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