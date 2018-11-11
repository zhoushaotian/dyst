import React from 'react';
import propTypes from 'prop-types';


class Layout extends React.Component {
    render() {
        const {children} = this.props;
        return (
            <div className="layout">
                {children}
            </div>
        );
    }
}

Layout.propTypes = {
    children: propTypes.element
};

export default Layout;