import React from 'react';
import propTypes from 'prop-types';

import {
    Page,
    Article,
    TabBar,
    TabBarItem,
    LoadMore,
    Footer,
    FooterText
} from 'react-weui';

import moment from 'moment';
import {connect} from 'react-redux';

import {getQuery} from '../../common/tool';

import {fetchStudyDetail, cleanStudyDetail, recordStudyTime, fetchStudyList, collectStudy} from '../../actions/study';

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
    constructor(props) {
        super(props);
        this.handleCollect = this.handleCollect.bind(this);
    }
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
            dispatch(fetchStudyList({
                offset: 1,
                limit: 3,
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
        const {detail, list} = study;
        console.log(list);
        return (
            <Page ptr={false} infiniteLoader={false} className="article" title="Article" subTitle="文章">
                {modal.loadingData ? <LoadMore loading/> : <div style={{backgroundColor: 'white', paddingBottom: '50px'}}>
                    <Article
                    >
                        <h1 style={{marginBottom: 0, fontWeight: 'bold'}}>{detail.title}</h1>
                        <hr/>
                        <div>
                            <span className="time">{detail.time}</span>
                            <div dangerouslySetInnerHTML={{
                                __html: detail.content
                            }} className="detail-wp"></div> 
                            <img src="/img/txqjd.jpg" alt="" width="100%"/>
                            <div style={{textAlign: 'center', marginBottom: '20px'}}>长按关注天星桥街道</div>
                        </div>
                        <ul className="list">
                            <span className="list-top">精彩推荐</span>
                            {list.map((item, key) => {
                                return (
                                    <li key={key} className="lis">
                                        <a href={`/client/list/detail/?id=${item.cid}`}>{item.title}</a>
                                    </li>
                                );
                            })}
                        </ul>
                        <Footer>
                            <FooterText>天星桥街道</FooterText>
                        </Footer>
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
                        <TabBarItem
                            label={detail.isCollect === 1 ? '已收藏' : '收藏'}
                            icon={detail.isCollect === 1 ? <svg fill="red" style={{color: 'red'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/><path d="M0 0h24v24H0z" fill="none"/></svg> : <svg fill="red" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>}
                            onClick={this.handleCollect}
                        />
                    </TabBar>
                </div>
            </Page>
        );
    }
    handleCollect() {
        const {dispatch, routing} = this.props;
        const id = getQuery(routing).id;
        dispatch(collectStudy({
            id
        }));
    }
}

StudyDetail.propTypes = {
    routing: propTypes.object,
    dispatch: propTypes.func,
    study: propTypes.object,
    modal: propTypes.object
};

export default connect(propMap)(StudyDetail);