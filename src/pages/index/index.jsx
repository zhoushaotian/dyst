import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {
    Tab,
    TabBarItem,
    TabBody,
    TabBar
} from 'react-weui';

import StudyCategory from './study_category';
import Organization from './organization/index';
import Account from './account';
import Metrix from './metrix';

import {getQuery} from '../../common/tool';

const studyIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAAWNJREFUaAXtmssNwjAMhpOKMTjwkNgF2IMpgAMwBXsAuyDxODAHISlVTzGylMS41Z9T5Dqx/X9GTVGMwYACqhWwVHbP7Wz+du+jcW5I+aiwW/uqbLUa7a6XWD5VzBhsnSguJOoB1LmGeWQMIravqSE3OdxIyuRawQf39dT96jKSoGCORUOhwKLyCmwOggIiFw0BgkXlFdgcBAVELhoCBIvKK7A5fRZlBn9spifnzILpHnWz1pzH+9sy+jDR2PsWTSZYSvlEcO3y3hNEgS3rjk5AsKPg2rRBsJWio5Pk92COkwylXY4TjuoWdf5fT6p4rj2ZIE4yXKkL+alu0Rw1o8AcKv5zDxD8p/o5YveeYPJ7ECeZhD7DSYYhXu9/gyiQ0QWqXUBQNR5GciDIEEm1CwiqxsNIDgQZIql2ob8m/D3McIuvvs2nugSfXMiVGGSLhkumvxYS+8mbmwux8oEREQpkUeADV8xGaoJtaEsAAAAASUVORK5CYII=';
const listIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAAH5JREFUaAXt17ERgDAIAEDiKs5i4zlERnOJVO7iKvFsc0fvmacDGvikIUIQIECAAIFUoGSdtV6t99iz/ufqJdp9bsc41zIW5AQIECBAgAABAgQIECDwCrgH/QMCBAgQIECAAAECBAjMKeAenPPdbU2AAAECBAgQIECAAIHfCzxT3RUKkM/E+AAAAABJRU5ErkJggg==';
const infoIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAABIpJREFUaAXtWk9IVEEYn2/LSomIiAJDMLU6GWkQ/TtoGQSdDDL04iYdulqXDhF76FBQdO0Q/iFIMqhLQaCmh0oI0sgumlYQGkVERGilven7vX2zvre7rr6debgub2D3zXvzfd/8fvPNm/m+4QkRlnAEcnoEKB26A60vCr/9mD4qhagUUq5NJ5Mzz4j+MImRzRuL+gZvHpxJxpVCcNfZ3t2zs+K+EHJnsnBu39NYQYE4NXq77o0bp4cgPPfl+/RrkCNBw+zBJxGSf90KuVa3JK1hEselkFVC0NjWTUV73J5c7QaMaanIlWxftW8gVjvnbs/Vek2s//KnD/9egmScg3iksEZUBVf7nYtfn6wUcsANrJhtqCsOqKN4CKoFJdenZRy69z+BOWlR9BL06uTFXUhwpbsx9GDowRwfgbyfop5IJghnSClpR8vTKkuIXWTJYvQhIzTFIzv6ru3IMBHx3hxcCYxg+bnnW+TM74sV0b4GDqG2gUKCiSUFExbcNlnW3NdNheuuTtw69DUImoFM0fLm3gtiZmZCCKvVJkf0kQPiLorQDfvHdcHP4sStVsjaOgEwNOrBmmj/uk9yro2BNwIrZyQPmdCV8fajQ+mwV5zpq5aWvMTy9dx+vby5Z28JrW4Z6Kj9nU4+m2dGCcbJiUb21k+ejk0TnXWPM4FyiJ8sa+45wTp3WaeRbUClKZOenzZjUxRTDABtciQOv+88lpGcGyRkJes4A9NocroaIYgFhQHHABqee99xbAR1PwU60HV0Yo5NPybSyhohiNWS36P1eOf8eC4ZEXRhA7ZgM7k9m3ttgtjniKzT6BwLSjYg3DrKBgnZANvutmzq2gQrov3VUopiLPsLrZZ+gNk2nC0Etv3oppPVJigj8dM3knIwXQfZPFO2lO1sbCgdbYIq/BIcfimj2lfHVsK2hkFtghp9L6pK/CIuKrSIgDZBBM52H04gvUh/S2uWwo5dLaLPS1NYWEqbIFk0BvO8lh5YuBt/Ley2/dBgcKP+NFOltQmOd9QO8VSa4iPHUsSWqV34e2LbYFu8H04infKnnSqtTRD5nJSRezCNwDm1C39PlA0pqNtErqhNEPCLCuQ1HvFfyAoQOPujNC8NXdiALeSI8y3Z14wQfHu77gtDiAEGsoKyaE8l6n4KdKDr6MRMJcBGCAIUp0Y3GGAXLxAb+BDimR9P2ukS69i6bAO2/AxOJlljBNEJklVFkm8fcdrzINPCgzbIQFaRgw3YMlWMJrxOJt7EoF8xwBjeJ1406suivR/t8Mu1Z2JbsSyrFETwzkEenuNzDqPFKEGFDEA5n7sjOOVBpsHLbCl7qFTwYVOicISO7cVegQM8dAqEIEg4i8R5JnfBzjg4KFexJaIfBAjj7dhDV+ixofKUQwBTFj9PoU7PbSA3RheZQBBqGg0Jag7gsquHHlx2F2gCCD2oOYDLru71IH/YBkT4PGrZkfkEkMDscFDqHoIcKNtH7nw9zp9HBRblqM5NXYEVmGFPcVC2+X6+5OPHeB6CoJrXn1MqX+bTB7GKU3gNRyBHR+A/KFjbvWAqMXEAAAAASUVORK5CYII=';
const metirIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAAXNSR0IArs4c6QAAAWNJREFUaAXtmssNwjAMhpOKMTjwkNgF2IMpgAMwBXsAuyDxODAHISlVTzGylMS41Z9T5Dqx/X9GTVGMwYACqhWwVHbP7Wz+du+jcW5I+aiwW/uqbLUa7a6XWD5VzBhsnSguJOoB1LmGeWQMIravqSE3OdxIyuRawQf39dT96jKSoGCORUOhwKLyCmwOggIiFw0BgkXlFdgcBAVELhoCBIvKK7A5fRZlBn9spifnzILpHnWz1pzH+9sy+jDR2PsWTSZYSvlEcO3y3hNEgS3rjk5AsKPg2rRBsJWio5Pk92COkwylXY4TjuoWdf5fT6p4rj2ZIE4yXKkL+alu0Rw1o8AcKv5zDxD8p/o5YveeYPJ7ECeZhD7DSYYhXu9/gyiQ0QWqXUBQNR5GciDIEEm1CwiqxsNIDgQZIql2ob8m/D3McIuvvs2nugSfXMiVGGSLhkumvxYS+8mbmwux8oEREQpkUeADV8xGaoJtaEsAAAAASUVORK5CYII=';

export const TAB_BARS = [
    {
        name: '党员学习',
        component: <StudyCategory/>,
        icon: studyIcon,
        href: '/client/?tab=1'
    },
    {
        name: '党员组织',
        component: <Organization/>,
        icon: listIcon,
        href: '/client/?tab=2'
    },
    {
        name: '政务矩阵',
        component: <Metrix/>,
        icon: metirIcon,
        href: '/client/?tab=3'
    },
    {
        name: '我的信息',
        component: <Account/>,
        icon: infoIcon,
        href: '/client/?tab=4'
    },
];

function propMap(state, ownProps) {
    return {
        routing: ownProps
    };
}
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
        };
        this.handleTabClick = this.handleTabClick.bind(this);
    }
    componentDidMount() {
        const {routing} = this.props;
        const tab = parseInt(getQuery(routing).tab);
        if(tab) {
            this.setState({
                tab
            });
        }
    }
    render() {
        const {tab} = this.state;
        return (
            <Tab style={{zIndex: '1000'}}>
                <TabBody>
                    {TAB_BARS[tab - 1].component}
                </TabBody>
                <TabBar>
                    {TAB_BARS.map((bar, index) => {
                        return (
                            <TabBarItem active={tab === (index + 1)} label={bar.name} key={index} icon={<img src={bar.icon}/>} onClick={() => {this.handleTabClick(index + 1);}}/>
                        );
                    })}
                </TabBar>
            </Tab>
            
        );
    }
    handleTabClick(tab) {
        this.setState({
            tab
        });
    }
}

Index.propTypes = {
    routing: propTypes.object
};

export default connect(propMap)(Index);