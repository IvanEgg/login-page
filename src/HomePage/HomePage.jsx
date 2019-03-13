import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.listUsers());
    }

    render() {
        const { token, users } = this.props;
        return (
            <div className="col-sm-6 card-block card-transparent card-home">
                <h3>List Users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.first_name + ' ' + user.last_name}
                            </li>
                        )}
                    </ul>
                }
                <p>
                <Link to="/login" className="btn btn-primary btn-custom"><b>Logout</b></Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { token } = authentication;
    return {
        token,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };