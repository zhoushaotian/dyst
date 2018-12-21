import React from 'react';
import propTypes from 'prop-types';

import {
    Page,
    Article,
    TabBar,
    TabBarItem,
    LoadMore
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
        routing: ownProps,
        modal: state.modal
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
        const {study, modal} = this.props;
        const {detail} = study;
        return (
            <Page ptr={false} infiniteLoader={false} className="article" title="Article" subTitle="文章">
                {modal.loadingData ? <LoadMore loading/> : <div style={{backgroundColor: 'white', paddingBottom: '50px'}}>
                    <Article
                    >
                        <h1>{detail.title}</h1>
                        <div>
                            <h2 className="title">{detail.time}</h2>
                            <div dangerouslySetInnerHTML={{
                                __html: detail.content
                            }}></div> 
                            <img src="/img/txqjd.jpg" alt="" width="100%"/>
                            <div style={{textAlign: 'center'}}>长按关注天星桥街道</div>
                        </div>
                    </Article>
                    
                </div>}
                <br/>
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
    study: propTypes.object,
    modal: propTypes.object
};

export default connect(propMap)(StudyDetail);