import React from 'react';
import {
    Panel,
    PanelHeader,
    // PanelBody,
    MediaBox,
    MediaBoxInfo,
    MediaBoxHeader,
    // MediaBoxInfoMeta,
    MediaBoxDescription,
    InfiniteLoader
} from 'react-weui';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {fetchStudyCategory} from '../../actions/study';
import {loop} from '../../common/tool';

const imgStyle = {
    height: '150px',
    width: '100%'
};

function propsMap(state) {
    return {
        modal: state.modal,
        study: state.study
    };
}


class StudyCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNav: 0
        };

        this.handleGetList = this.handleGetList.bind(this);
    }
    componentDidMount() {
        this.handleGetList(loop, loop);
    }
    render() {
        const {study} = this.props;
        return (
            <InfiniteLoader
                loaderDefaultIcon={<div style={{fontSize: '14px', textAlign: 'center'}}>没有更多数据了</div>}
                height={'90vh'}
                triggerPercent={99}
                onLoadMore={ (resolve, finish) => {
                    this.handleGetList(resolve, finish);
                }}
            >
                {study.category.map((item, index) => {
                    return (
                        <Panel key={index}>
                            <a className="study-list-wp" href={`/client/list/?id=${item.id}`}>
                                <PanelHeader>
                                    {item.name}
                                </PanelHeader>
                                <MediaBox type="text">
                                    <MediaBoxHeader>
                                    </MediaBoxHeader>
                                    <MediaBoxDescription>
                                        <img src={item.bimgUrl} alt="" style={imgStyle}/>
                                    </MediaBoxDescription>
                                    <MediaBoxInfo>
                                        {item.desc}
                                    </MediaBoxInfo>
                                </MediaBox>
                            </a>
                        </Panel>
                    );
                })}
            </InfiniteLoader>
            
        );
    }
    handleGetList(resolve, finish) {
        const {study, dispatch} = this.props;
        const {categoryPage} = study;
        dispatch(fetchStudyCategory({
            offset: ++categoryPage.offset,
            limit: 10
        }, resolve, finish));
    }
}

StudyCategory.propTypes = {
    study: propTypes.object,
    modal: propTypes.object,
    dispatch: propTypes.func
};

export default connect(propsMap)(StudyCategory);