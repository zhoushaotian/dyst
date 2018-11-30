import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {fetchPartyOrg} from '../../../actions/organization';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {LoadMore} from 'react-weui';


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    }
});


function getEveryLevelCom(data, classes) {
    if(Array.isArray(data) && data.length !== 0) {
        return data.map(function(item) {
            return (
                <ExpansionPanel  key={item.id} defaultExpanded={false} >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading} component={() => {
                            return <span style={{textIndent: `${item.level * 10}px`}}>{item.name}</span>;
                        }}></Typography>
                    </ExpansionPanelSummary>
                    <div>
                        {getEveryLevelCom(item.children, classes)}
                    </div>
                </ExpansionPanel>
            );
        });
    }else {
        return null;
    }
}

function propMap(state) {
    return {
        modal: state.modal,
        organization: state.organization,
    };
}

class Party extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchPartyOrg());
    }
    render() {
        const {classes, organization, modal} = this.props;
        const {partyOrg} = organization;
        if(modal.loadingData) {
            <LoadMore loading/>;
        }
        return (
            <div className={classes.root}>
                {getEveryLevelCom(partyOrg, classes)}
            </div>
        );
    }
}

Party.propTypes = {
    dispatch: propTypes.func,
    classes: propTypes.object,
    organization: propTypes.object,
    modal: propTypes.object
};

export default connect(propMap)(withStyles(styles)(Party));

