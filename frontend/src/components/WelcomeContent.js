import * as React from 'react';

export default class WelcomeContent extends React.Component {

  render() {
    return (
            <div className="jumbotron jumbotron-fluid">
              <div className="container">
                <h1 className="display-4">Название</h1>
                <p className="lead">Войдите, чтобы пользоваться сервисом.</p>
              </div>
            </div>
    );
  };
}