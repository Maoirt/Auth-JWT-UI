import * as React from 'react';
import classNames from 'classnames';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

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
      showModal: false, // состояние для управления модальным окном
      onLogin: props.onLogin,
      onRegister: props.onRegister
    };
  }

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
    this.state.onRegister(e, this.state.userName, this.state.email, this.state.firstName, this.state.lastName, this.state.phone, this.state.password);
  };

  loginGoogle = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/google"
  }

  loginGithub = () => {
    window.location.href = "http://localhost:8081/oauth2/authorization/github"
  }

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
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

                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={this.toggleModal} 
                    style={{ marginLeft: '80%', marginBottom: '10px' }}>
                    Забыл пароль
                  </button>

                  {this.state.showModal && (
                    <div className="modal top fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" style={{ width: '300px' }}>
                        <div className="modal-content text-center">
                          <div className="modal-header h5 text-white bg-primary justify-content-center">
                            Сброс пароля
                            <button type="button" className="btn-close" onClick={this.toggleModal} aria-label="Close"></button>
                          </div>
                          <div className="modal-body px-5">
                            <p className="py-2">
                              Введите ваш адрес электронной почты, и мы отправим вам инструкции по сбросу пароля.
                            </p>
                            <div data-mdb-input-init className="form-outline">
                              <input type="email" id="typeEmail" className="form-control my-3" />
                              <label className="form-label" htmlFor="typeEmail">Email</label>
                            </div>
                            <button 
                              type="button" 
                              data-mdb-ripple-init 
                              className="btn btn-primary w-100" 
                              // onClick={handleResetPassword}
                            >
                              Сбросить пароль
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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