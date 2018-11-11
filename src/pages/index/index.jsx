import React from 'react';
import {
    Tab,
    TabBarItem,
} from 'react-weui';

import StudyCategory from './study';

const TAB_BARS = [
    {
        name: '党员学习',
        component: <StudyCategory/>
    },
    {
        name: '党员组织',
        component: <div>党员组织</div>
    },
    {
        name: '我的信息',
        component: <div>我的信息</div>
    }
];


class Index extends React.Component {
    render() {
        return (
            <Tab type="tabbar" style={{}}>
                {TAB_BARS.map(function(bar, index) {
                    return (
                        <TabBarItem label={bar.name} key={index}>
                            {bar.component}
                        </TabBarItem>
                    );
                })}
            </Tab>
            
        );
    }
}

export default Index;