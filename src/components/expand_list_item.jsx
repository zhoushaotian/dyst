import React from 'react';
import {
} from 'react-weui';
import propTypes from 'prop-types';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';


class ExpandListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childrenData: []
        };

        this.handleClick = this.handleClick.bind(this);
    }
    render() {
        const {title} = this.props;
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} onClick={this.handleClick}>
                    <Typography>
                        {title}
                    </Typography>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        );
    }
    handleClick() {
        const {onExpand} = this.props;
        onExpand((data) => {
            this.setState({
                childrenData: data
            });
        });
    }
}
ExpandListItem.propTypes = {
    title: propTypes.string,
    onExpand: propTypes.func.isRequired
};

export default ExpandListItem;
