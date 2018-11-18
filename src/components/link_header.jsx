import React from 'react';
import {
} from 'react-weui';
import propTypes from 'prop-types';
import {browserHistory} from 'react-router';

class LinkHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleLinkBack = this.handleLinkBack.bind(this);
    }
    render() {
        const {headerName} = this.props;
        return (
            <div className="link-header">
                <div className="back-wp" onClick={this.handleLinkBack}>
                    &lt;
                </div>
                <div className="link-header-name">
                    {headerName}
                </div>
            </div>
        );
    }
    handleLinkBack() {
        browserHistory.goBack();
    }
}

LinkHeader.propTypes = {
    headerName: propTypes.string
};

export default LinkHeader;

