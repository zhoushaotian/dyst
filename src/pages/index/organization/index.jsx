import React from 'react';
import propTypes from 'prop-types';

// import {
//     Tab,
//     TabBody,
//     NavBar,
//     NavBarItem,
// } from 'react-weui';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

import Cash from './cash';
import Party from './party';

export const NAV_BARS = [
    {
        name: '组织架构',
        component: <Party/>
    },
    {
        name: '党费缴纳',
        component: <Cash/>
    }
];
const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper
    }
});
class Organization extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav: 0
        };
        this.handleNavClick = this.handleNavClick.bind(this);
        
    }
    render() {
        const {classes} = this.props;
        const {nav} = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        value={nav}
                        onChange={this.handleNavClick}
                        fullWidth
                    >
                        {NAV_BARS.map((bar, index) => {
                            return <Tab label={bar.name} key={index}/>;
                        })}
                    </Tabs>
                </AppBar>
                {NAV_BARS[nav].component}
            </div>
            // <Tab>
            //     <NavBar>
            //         {NAV_BARS.map((bar, index) => {
            //             return (
            //                 <NavBarItem key={index} active={nav === (index + 1)} onClick={() => {this.handleNavClick(index + 1);}}>{bar.name}</NavBarItem>
            //             );
            //         })}
            //     </NavBar>
            //     <TabBody>
            //         {NAV_BARS[nav - 1].component}
            //     </TabBody>
            // </Tab>
        );
    }
    handleNavClick(nav, value) {
        this.setState({
            nav: value
        });
    }
}

Organization.propTypes = {
    classes: propTypes.object
};

export default withStyles(styles)(Organization);