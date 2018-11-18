import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {Toast, Toptips} from 'react-weui';

function propMap(state) {
    return {
        modal: state.modal
    };
}
class Layout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {children, modal} = this.props;
        const {showToast, toastType, toastMsg} = modal;
        return (
            <div className="layout">
                <Toptips type="warn" show={modal.pageWarn ? true : false}>{modal.pageWarn}</Toptips>
                {children}
                <Toast icon={toastType} show={showToast}>{toastMsg}</Toast>
            </div>
        );
    }
}

Layout.propTypes = {
    children: propTypes.element,
    modal: propTypes.object
};

export default connect(propMap)(Layout);