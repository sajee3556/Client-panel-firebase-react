import React, {Component} from "react";
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class EditClient extends Component{
    constructor(props){
        super(props);
        this.firstNameInput = React.createRef();
        this.lastNameInput = React.createRef();
        this.emailInput = React.createRef();
        this.phoneInput = React.createRef();
        this.balanceInput = React.createRef();
    }
    onSubmit = e =>{
        e.preventDefault();

        const {firestore, client, history} = this.props;

        const updateClient = {
            firstName: this.firstNameInput.current.value,
            lastName: this.lastNameInput.current.value,
            email: this.emailInput.current.value,
            phone: this.phoneInput.current.value,
            balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
        }

        firestore.update({collection: 'clients',doc: client.id},updateClient).then(history.push('/'));
    };

    render() {
        const {client} = this.props;
        const {disableBalanceOnEdit} = this.props.settings;
        if (client) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/" className="nav-link">
                                <i className="fas fa-arrow-circle-left"></i>Bact to Dashboard
                            </Link>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            Edit Client
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        defaultValue={client.firstName}
                                        ref = {this.firstNameInput}
                                        minLength="2"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        defaultValue={client.lastName}
                                        ref = {this.lastNameInput}
                                        minLength="2"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        defaultValue={client.email}
                                        ref = {this.emailInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        defaultValue={client.phone}
                                        ref = {this.phoneInput}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="firstName">Balance</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="balance"
                                        defaultValue={client.balance}
                                        ref = {this.balanceInput}
                                        disabled={disableBalanceOnEdit}
                                    />
                                </div>

                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-primary btn-block"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <Spinner/>
            );
        }
    }
}

EditClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}]),
    connect(({firestore: {ordered}, settings}, props) => ({
        client: ordered.client && ordered.client[0],
        settings
    }))
)(EditClient);