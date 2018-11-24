import React from 'react';
import propTypes from 'prop-types';

import {
    Page,
    Article,
    TabBar,
    TabBarItem,
} from 'react-weui';

import moment from 'moment';
import {connect} from 'react-redux';

import {getQuery} from '../../common/tool';

import {fetchStudyDetail, cleanStudyDetail, recordStudyTime} from '../../actions/study';

import {TAB_BARS} from '../index/index';

const INTERVAL_RECORD_TIME = 30 * 1000;

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
            }, () => {
                // 定时调用记录学习时间
                let curTime = new moment();
                this.recordTimer =  setInterval(() => {
                    dispatch(recordStudyTime({
                        startTime: curTime.valueOf(),
                        endTime: curTime.add(30, 's').valueOf(),
                        cid: parseInt(id)
                    }));
                }, INTERVAL_RECORD_TIME);
            }));
        }
    }
    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(cleanStudyDetail());
        if(this.recordTimer) {
            clearInterval(this.recordTimer);
        }
    }
    render() {
        const {study} = this.props;
        const {detail} = study;
        return (
            <Page infiniteLoader={false} className="article" title="Article" subTitle="文章">
                <div style={{backgroundColor: 'white', paddingBottom: '30px'}}>
                    <Article
                    >
                        <h1>{detail.title}</h1>
                        <section>
                            <h2 className="title">{detail.time}</h2>
                            <div dangerouslySetInnerHTML={{
                                __html: detail.content
                            }}></div>                            
                        </section>
                    </Article>
                </div>
                <div style={{position: 'fixed', bottom: 0, right: 0, left: 0}}>
                    <TabBar style={{}}>
                        {TAB_BARS.map(function(bar, index) {
                            return (
                                <TabBarItem 
                                    label={bar.name} 
                                    key={index} 
                                    icon={<img src={bar.icon}/>}
                                    onClick={() => {window.location = bar.href;}}
                                />
                            );
                        })}
                    </TabBar>
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