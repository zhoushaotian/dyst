import React from 'react';
import {
    LoadMore,
    Panel,
    PanelHeader,
    // PanelBody,
    MediaBox,
    MediaBoxInfo,
    MediaBoxHeader,
    // MediaBoxInfoMeta,
    MediaBoxDescription
} from 'react-weui';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {fetchStudyCategory, fetchStudyList} from '../../actions/study';

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
        this.handleNavClick = this.handleNavClick.bind(this);
    }
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchStudyCategory(true));
    }
    render() {
        const {study, modal} = this.props;
        if(modal.loadingData) {
            return <LoadMore loading/>;
        }
        return (
            <div >
                {study.category.map((item, index) => {
                    return (
                        <Panel key={index}>
                            <a className="study-list-wp" href={`/client/list/?id=${item.id}`} key={index}>
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
            </div>
            
        );
    }
    handleNavClick(id, index) {
        const {dispatch} = this.props;
        this.setState({
            activeNav: index
        }, () => {
            dispatch(fetchStudyList({
                id
            }));
        });
    }
}

StudyCategory.propTypes = {
    study: propTypes.object,
    modal: propTypes.object,
    dispatch: propTypes.func
};

export default connect(propsMap)(StudyCategory);