import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import InfiniteLoaderList from '../../components/infinite_loader_list.jsx';

import {fetchUserCategoryRecord, fetchUserStudyRecord} from '../../actions/account';
import {getQuery} from '../../common/tool';


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
        const {routing} = this.props;
        const id = getQuery(routing).id;
        return (
            <div>
                {id ? <InfiniteLoaderList fetchPromise={fetchUserStudyRecord} query={{categoryId: id}}/> : <InfiniteLoaderList fetchPromise={fetchUserCategoryRecord}/>}
            </div>
        );
    }
}

CategoryRecord.propTypes = {
    routing: propTypes.object
};

export default connect(propMap)(CategoryRecord);