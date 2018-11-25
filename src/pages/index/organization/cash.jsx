import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {
    Form,
    FormCell,
    CellHeader,
    Label,
    CellBody,
    Input,
    CellFooter,
    Button,
    CellsTitle,
    LoadMore,
    Select,
    Checkbox

} from 'react-weui';

import {fetchIdCardInfo, fetchCashMonth} from '../../../actions/organization';
import {cleanUserInfo, fetchUserInfo} from '../../../actions/account';
import { message } from '../../../common/tool';


function propMap(state) {
    return {
        organization: state.organization,
        modal: state.modal,
        account: state.account
    };
}
class Cash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcard: '',
            selectYear: '',
            selectMonth: []
        };
        this.handleFormItemChange = this.handleFormItemChange.bind(this);
        this.handleIdCardQuery = this.handleIdCardQuery.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
        this.handleSelectMonth = this.handleSelectMonth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchUserInfo());
    }
    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(cleanUserInfo());
    }
    render() {
        const {modal, organization} = this.props;
        const {idcard, selectYear, selectMonth} = this.state;
        const {cashMonth} = organization;
        let info = organization.idCardInfo ? organization.idCardInfo : {};
        return (
            <div>
                <CellsTitle>输入身份证号查询</CellsTitle>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>身份证号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input name="idcard" type="number" placeholder="请输入身份证号" value={idcard} onChange={(e) => this.handleFormItemChange('idcard', e.target.value)}/>
                        </CellBody>
                        <CellFooter>
                            <Button type="vcode" onClick={this.handleIdCardQuery}>查询</Button>
                        </CellFooter>
                    </FormCell>
                </Form>
                {modal.loadingData || Object.keys(organization.idCardInfo).length === 0 ? <LoadMore loading={modal.loadingData}/> : (
                    <Form>
                        <FormCell>
                            <CellHeader>
                                <Label>党支部</Label>
                            </CellHeader>
                            <CellBody>
                                <Input value={info.deptname} disabled/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>姓名</Label>
                            </CellHeader>
                            <CellBody>
                                <Input value={info.realname} disabled/>
                            </CellBody>
                        </FormCell>
                        <FormCell>
                            <CellHeader>
                                <Label>身份证号</Label>
                            </CellHeader>
                            <CellBody>
                                <Input value={info.idcard} disabled/>
                            </CellBody>
                        </FormCell>
                    </Form>)}
                {info.stringList &&  selectYear ? <Form>
                    <FormCell select selectPos="after">
                        <CellHeader>
                            <Label>缴费年份</Label>
                        </CellHeader>
                        <CellBody>
                            <Select onChange={this.handleYearChange} data={info.stringList.map(function(item) {
                                return {
                                    label: item + '年',
                                    value: item
                                };
                            })} />
                        </CellBody>
                    </FormCell>
                    
                </Form> : null}
                {cashMonth.length === 0 ? null : (
                    [
                        <CellsTitle key={1}>缴费月份</CellsTitle>,
                        <Form checkbox key={2} onChange={this.handleSelectMonth}>
                            {cashMonth.map((item, index) => {
                                return (
                                    <FormCell checkbox key={'month' + index}>
                                        <CellHeader>
                                            <Checkbox name="month" value={item.month} />
                                        </CellHeader>
                                        <CellBody>{item.month + '月'}</CellBody>
                                    </FormCell>
                                );
                            })}
                        </Form>
                    ]
                )}
                <div style={{marginTop: '30px'}}>
                </div>
                {
                    selectMonth.length !== 0 ?
                        <Button onClick={this.handleSubmit}>确认缴费</Button>
                        : null
                }
                <div style={{marginBottom: '30px'}}>
                </div>
                
            </div>
        );
    }
    handleSubmit() {
        message.error('抱歉，暂未开通线上缴费');
        console.log(this.state.selectMonth);
        
        window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                'appId': 'wx2421b1c4370ec43b',     //公众号名称，由商户传入     
                'timeStamp': '1395712654',         //时间戳，自1970年以来的秒数     
                'nonceStr': 'e61463f8efa94090b1f366cccfbbb444', //随机串     
                'package': 'prepay_id=u802345jgfjsdfgsdg888',     
                'signType': 'MD5',         //微信签名方式：     
                'paySign': '70EA570631E4BB79628FBCA90534C63FF7FADD89' //微信签名 
            },
            function(res) {
                if(res.err_msg == 'get_brand_wcpay_request:ok' ) {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                } 
            }); 
    }
    handleFormItemChange(field, value) {
        this.setState({
            [field]: value
        });
    }
    handleIdCardQuery() {
        // 查询身份证信息
        const {idcard} = this.state;
        const {dispatch} = this.props;
        dispatch(fetchIdCardInfo({
            idcard
        }, (data) => {
            console.log(data);
            // 设置年份
            this.setState({
                selectYear: data.stringList && data.stringList.length !== 0 ? data.stringList[0] : ''
            }, () => {
                dispatch(fetchCashMonth({
                    idcard,
                    year: this.state.selectYear
                }));
            });
        }));
    }
    handleYearChange(e) {
        this.setState({
            selectYear: e.target.value
        });
    }
    handleSelectMonth(e) {
        const {selectMonth} = this.state;
        const curValue = e.target.value;
        if(selectMonth.includes(curValue)) {
            return this.setState({
                selectMonth: selectMonth.filter(function(item) {
                    return item !== curValue;
                })
            });
        }
        return this.setState({
            selectMonth: selectMonth.concat([curValue])
        });
    }
}

Cash.propTypes = {
    dispatch: propTypes.func,
    modal: propTypes.object,
    organization: propTypes.object,
    account: propTypes.object
};

export default connect(propMap)(Cash);