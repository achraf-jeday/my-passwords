import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getAccessToken} from '../store/actions/usersActions';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

 class user extends Component {

    constructor(props) {
        super(props);
        this.state = { open: true };
    }

    componentDidMount() {
        this.props.getAccessToken()
        .then(result => {
            this.setState({open: false});
        });
    }

    render() {
        return (
            <div>
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={this.state.open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
        )
    }
}

const mapStateToProps  = (state) => ({user_state:state.user_state})

export default connect(mapStateToProps, {getAccessToken})(user)
