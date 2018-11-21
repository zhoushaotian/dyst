import React from 'react';
// import propTypes from 'prop-types';

import {
    Tab,
    TabBody,
    NavBar,
    NavBarItem
} from 'react-weui';

import Cash from './cash';

export const NAV_BARS = [
    {
        name: '党员之家',
        component: <div>家</div>
    },
    {
        name: '党费缴纳',
        component: <Cash/>
    }
];

class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: 1
        };
        this.handleNavClick = this.handleNavClick.bind(this);
        
    }
    render() {
        const {nav} = this.state;
        return (
            <Tab>
                <NavBar>
                    {NAV_BARS.map((bar, index) => {
                        return (
                            <NavBarItem key={index} active={nav === (index + 1)} onClick={() => {this.handleNavClick(index + 1);}}>{bar.name}</NavBarItem>
                        );
                    })}
                </NavBar>
                <TabBody>
                    {NAV_BARS[nav - 1].component}
                </TabBody>
            </Tab>
        );
    }
    handleNavClick(nav) {
        this.setState({
            nav
        });
    }
}

Organization.propTypes = {
    
};

export default Organization;