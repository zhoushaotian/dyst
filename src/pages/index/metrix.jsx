import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchMetrix} from '../../actions/organization';


import {
    Grids,
    LoadMore
} from 'react-weui';
import Paper from '@material-ui/core/Paper';

function propMap(state) {
    return {
        modal: state.modal,
        organization: state.organization
    };
}
class Metrix extends React.Component {
    constructor(props) {
        super(props);
        this.open = true;
    }
    componentDidMount() {
        const {dispatch} = this.props;
        if(this.open) {
            dispatch(fetchMetrix());
        }
    }
    componentWillUnmount() {
        this.open = false;
    }
    render() {
        const {modal, organization} = this.props;
        const {metrix} = organization;
        if(modal.loadingData) {
            return <LoadMore loading/>;
        }
        return (
            <Paper style={{marginTop: '20px'}}>
                <Grids data={metrix.map(function(item) {
                    return {
                        icon: <img src={item.imgUrl}/>,
                        label: item.name,
                        href: item.url 
                    };
                })}/>
            </Paper>
        );
    }
}

Metrix.propTypes = {
    organization: propTypes.object,
    modal: propTypes.object,
    dispatch: propTypes.func
};

export default connect(propMap)(Metrix);