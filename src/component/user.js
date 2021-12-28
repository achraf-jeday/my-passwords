import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAccessToken} from '../store/actions/usersActions';

 class user extends Component {
    componentDidMount() {
        this.props.getAccessToken()
        
    }
    render() {
        return (
            <div>
                <h1>Achraf JEDAY</h1>
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({access_token:state.access_token})

export default connect(mapStateToProps, {getAccessToken})(user)
