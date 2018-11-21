import React from 'react';
import {
    Page,
    Panel,
    PanelBody,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
} from 'react-weui';
import propTypes from 'prop-types';


import {connect} from 'react-redux';

import {getQuery} from '../../common/tool';

import {fetchStudyList, cleanStudyList} from '../../actions/study';

function propMap(state, ownProps) {
    return {
        study: state.study,
        routing: ownProps
    };
}

function handleListItemType(item) {
    const PAGE_URL = `/client/list/detail/?id=${item.cid}`;
    switch(item.type) {
    case 1:
        return (
            <MediaBox type="appmsg" href={PAGE_URL}>
                <MediaBoxHeader><img src={item.imgUrl}/></MediaBoxHeader>
                <MediaBoxBody>
                    <MediaBoxTitle>{item.title}</MediaBoxTitle>
                    <MediaBoxDescription>
                        
                    </MediaBoxDescription>
                </MediaBoxBody>
            </MediaBox>
        );
    case 2:
        return (
            <MediaBox type="appmsg" href={PAGE_URL}>
                <MediaBoxBody>
                    <MediaBoxTitle></MediaBoxTitle>
                    <MediaBoxDescription>
                        {item.title}
                    </MediaBoxDescription>
                </MediaBoxBody>
            </MediaBox>
        );
    case 3:
        return (
            <MediaBox type="appmsg" href={PAGE_URL}>
                <MediaBoxHeader></MediaBoxHeader>
                <MediaBoxBody>
                    <MediaBoxDescription>
                        <img src={item.imgUrl}/>
                    </MediaBoxDescription>
                </MediaBoxBody>
            </MediaBox>
        );
    default:
        return null;
    }
}

class StudyList extends React.Component {
    componentDidMount() {
        const {routing, dispatch} = this.props;
        const id = getQuery(routing).id;
        if(id) {
            dispatch(fetchStudyList({
                id
            }));
        }
    }
    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(cleanStudyList());
    }
    render() {
        const {study} = this.props;
        const {list} = study;
        return (
            <Page>
                <Panel style={{marginTop: '30px'}}>
                    {list.map(function(item, index) {
                        return (
                            <PanelBody key={index}>
                                {handleListItemType(item)}
                            </PanelBody>
                        );
                    })}
                </Panel>
            </Page>
        );
    }
}

StudyList.propTypes = {
    routing: propTypes.object,
    dispatch: propTypes.func,
    study: propTypes.object
};

export default connect(propMap)(StudyList);