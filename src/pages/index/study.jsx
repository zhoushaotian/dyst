import React from 'react';
import {
    LoadMore,
    Panel,
    // PanelHeader,
    // PanelBody,
    MediaBoxTitle,
    MediaBox,
    MediaBoxInfo,
    MediaBoxInfoMeta,
    MediaBoxDescription
} from 'react-weui';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

import {fetchStudyCategory, fetchStudyList} from '../../actions/study';

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
                <Panel>
                    {study.category.map((item, index) => {
                        return (
                            <div key={item.id} onClick={() => {this.handleNavClick(item.id, index);}}>
                                
                            </div>
                        );
                    })}
                </Panel>
                <div className="study-list-wp">
                    <MediaBox type="text">
                        <MediaBoxTitle>Media heading</MediaBoxTitle>
                        <MediaBoxDescription>
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </MediaBoxDescription>
                        <MediaBoxInfo>
                            <MediaBoxInfoMeta>WeUI</MediaBoxInfoMeta>
                            <MediaBoxInfoMeta>2016-8-8</MediaBoxInfoMeta>
                            <MediaBoxInfoMeta extra>More</MediaBoxInfoMeta>
                        </MediaBoxInfo>
                    </MediaBox>
                </div>
                
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