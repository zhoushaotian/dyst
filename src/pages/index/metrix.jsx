import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchMetrix} from '../../actions/organization';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';


import {
    LoadMore
} from 'react-weui';

import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: '10px'
    },
    title: {
        fontSize: '14px'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    wrap: {
        padding: '10px'
    }
});

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
        const {modal, organization, classes} = this.props;
        const {metrix} = organization;
        if(modal.loadingData) {
            return <LoadMore loading/>;
        }
        return (
            <Paper style={{margin: '10px', minHeight: '95vh'}}>
                <GridList cellHeight={180} className={classes.gridList} spacing="8">
                    {metrix. map(function(item, index) {
                        return (
                            <GridListTile key={index} classes={{
                                root: 'pd'
                            }}>
                                <a href={item.url}><img src={item.imgUrl} style={{width: '100%'}}/></a>
                                <GridListTileBar
                                    title={item.name}
                                    classes={{
                                        title: 'ft-14'
                                    }}
                                />
                            </GridListTile>
                        );
                    })}
                </GridList>
            </Paper>
        );
    }
}

Metrix.propTypes = {
    organization: propTypes.object,
    modal: propTypes.object,
    dispatch: propTypes.func,
    classes: propTypes.object
};

export default connect(propMap)(withStyles(styles)(Metrix));