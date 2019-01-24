import React, {Component} from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import Spinner from '../layouts/Spinner';
import {firestoreConnect} from 'react-redux-firebase';

class Clients extends Component {
    state = {
        totalOwed: null
    };

    static getDerivedStateFromProps(props, state) {
        const {clients} = props;
        if (clients) {
            //Add balance
            const total = clients.reduce((total, client) => {
                return total + parseFloat(client.balance.toString());
            }, 0);

            return {totalOwed: total}
        }
        return null;
    };

    render() {
        // const clients = [{
        //     id: '4344435',
        //     firstName: 'John',
        //     lastName: 'Cena',
        //     email: 'jc@gmail.com',
        //     phone: '112-324-4567',
        //     balance: '50'
        // },
        //     {
        //         id: '4344436',
        //         firstName: 'Rob',
        //         lastName: 'Damen',
        //         email: 'rd@gmail.com',
        //         phone: '112-324-4568',
        //         balance: '150'
        //     },
        //     {
        //         id: '4344437',
        //         firstName: 'Fert',
        //         lastName: 'Lise',
        //         email: 'fl@gmail.com',
        //         phone: '112-324-4569',
        //         balance: '250'
        //     }];
        const {clients} = this.props; //{used for pulling the value from props}
        const {totalOwed} = this.state;
        if (clients) {
            return (
                <div className="row">
                    <div className="col md-6">
                        {' '}
                        <h2><i className="fas fa-users"></i> Clients{' '}
                        </h2>
                    </div>
                    <div className="col md-6">
                        <h5 className="text-right text-secondary">
                            Total Owed {' '}
                            <span className="text-primary">
                        ${parseFloat(totalOwed).toFixed(2)}
                    </span>
                        </h5>
                    </div>
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.firstName} {client.lastName}</td>
                                <td>{client.email}</td>
                                <td>${parseFloat(client.balance).toFixed(2)}</td>
                                <td>
                                    <Link to={`/client/${client.id}`} className="btn btn-secondary btn-sm">
                                        <i className="fas fa-arrow-circle-right"></i> Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <Spinner/>
            )
        }
    }
}

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
};

export default compose(
    firestoreConnect([{collection: 'clients'}]),
    connect((state, props) => ({
        clients: state.firestore.ordered.clients
    }))
)(Clients);