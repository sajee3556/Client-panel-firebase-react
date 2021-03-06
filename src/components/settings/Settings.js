import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setAllowRegistration, setDisableBalanceOnAdd, setDisableBalanceOnEdit} from '../../actions/settingsAction';

class Settings extends Component {
    disableBalanceOnEditChange = () => {
        const {setDisableBalanceOnEdit} = this.props;
        setDisableBalanceOnEdit();
    };
    disableBalanceOnAddChange = () => {
        const {setDisableBalanceOnAdd} = this.props;
        setDisableBalanceOnAdd();
    };
    allowRegistrationChange = () => {
        const {setAllowRegistration} = this.props;
        setAllowRegistration();
    };

    render() {
        const {disableBalanceOnAdd, disableBalanceOnEdit, allowOnRegistration} = this.props.settings;
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btn btn-link">
                            <i className="fas fa-arrow-circle-left"></i>Back To Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        Edit Settings
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label>Allow Registration</label>{' '}
                                <input
                                    type="checkbox"
                                    name="allowOnRegistration"
                                    checked={!!allowOnRegistration}
                                    onChange={this.allowRegistrationChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Disable Balance On Add</label>{' '}
                                <input
                                    type="checkbox"
                                    name="disableBalanceOnAdd"
                                    checked={!!disableBalanceOnAdd}
                                    onChange={this.disableBalanceOnAddChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Disable Balance On Edit</label>{' '}
                                <input
                                    type="checkbox"
                                    name="disableBalanceOnEdit"
                                    checked={!!disableBalanceOnEdit}
                                    onChange={this.disableBalanceOnEditChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Settings.propTypes = {
    settings: PropTypes.object.isRequired,
    setDisableBalanceOnAdd: PropTypes.func.isRequired,
    setDisableBalanceOnEdit: PropTypes.func.isRequired,
    setAllowRegistration: PropTypes.func.isRequired
};

export default connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
}), {
    setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration
})(Settings);