import React from 'react';
import {
    Page,
    Article
} from 'react-weui';
import propTypes from 'prop-types';

import LinkHeader from '../../components/link_header';
import {connect} from 'react-redux';

import {getQuery} from '../../common/tool';

import {fetchStudyDetail, cleanStudyDetail} from '../../actions/study';

function propMap(state, ownProps) {
    return {
        study: state.study,
        routing: ownProps
    };
}



class StudyDetail extends React.Component {
    componentDidMount() {
        const {routing, dispatch} = this.props;
        const id = getQuery(routing).id;
        if(id) {
            dispatch(fetchStudyDetail({
                id
            }));
        }
    }
    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(cleanStudyDetail());
    }
    render() {
        const {study} = this.props;
        const {detail} = study;
        return (
            <Page infiniteLoader={false}>
                <LinkHeader/>
                <div>
                    <Article>
                        <h1>{detail.title}</h1>
                        <section dangerouslySetInnerHTML={{
                            __html: detail.content
                        }}>
                            
                        </section>
                    </Article>
                </div>
            </Page>
        );
    }
}

StudyDetail.propTypes = {
    routing: propTypes.object,
    dispatch: propTypes.func,
    study: propTypes.object
};

export default connect(propMap)(StudyDetail);