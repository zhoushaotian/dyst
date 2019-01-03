import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import InfiniteLoaderList from '../../components/infinite_loader_list.jsx';

import {fetchUserCollectRecord} from '../../actions/account';


function propMap(state, ownProps) {
    return {
        routing: ownProps
    };
}
class CategoryRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    render() {
        return (
            <div>
                <InfiniteLoaderList fetchPromise={fetchUserCollectRecord}/>
            </div>
        );
    }
}

CategoryRecord.propTypes = {
    routing: propTypes.object
};

export default connect(propMap)(CategoryRecord);