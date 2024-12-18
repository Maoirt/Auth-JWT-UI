import * as React from 'react';

import { request, setAuthHeader } from '../helpers/axios_helper';

export default class AuthContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    };

    componentDidMount() {
        request(
            "GET",
            "/messages",
            {}).then(
            (response) => {
                this.setState({data: response.data})
            }).catch(
            (error) => {
                if (error.response.status === 401) {
                    setAuthHeader(null);
                } else {
                    this.setState({data: error.response.code})
                }

            }
        );
    };

  render() {
    return (
        <div className="row justify-content-md-center" style={{margin:"25px"}}>
            <div className="col-2">
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">С backend</h5>
                        <p className="card-text">Контент для авторизованного пользователя:</p>
                        <ul>
                            {this.state.data && this.state.data
                                .map((line) =>
                                    <li key={line}>{line}</li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
  };
}