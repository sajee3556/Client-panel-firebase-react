import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    };

    onChange = (e) =>
        this.setState({
            [e.target.name]: e.target.value
        });

    onSubmit =(e) => {
        e.preventDefault();

        const newClient = this.state;

        const{firestore , history } = this.props;

        if(newClient.balance === '') newClient.balance = 0;

        firestore.add({collection:'clients'},newClient).then(()=> history.push('/'));
    };

    render() {
        const {disableBalanceOnAdd} = this.props.settings;
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
                        Add Client
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.onChange}
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
                                    value={this.state.lastName}
                                    onChange={this.onChange}
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
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">Balance</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="balance"
                                    value={this.state.balance}
                                    onChange={this.onChange}
                                    disabled={disableBalanceOnAdd}
                                />
                            </div>

                            <input
                                type="submit"
                                value="Add Client"
                                className="btn btn-primary btn-block"
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddClient.propTypes ={
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
};

export default compose(firestoreConnect(),
    connect((state,props) => ({
        settings: state.settings
    }))
    )(AddClient);
