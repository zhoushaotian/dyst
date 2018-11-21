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


function propMap(state) {
    return {
        organization: state.organization,
        modal: state.modal
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
    }
    render() {
        const {modal, organization} = this.props;
        const {idcard, selectYear} = this.state;
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
                        <Form checkbox key={2}>
                            {cashMonth.map((item, index) => {
                                return (
                                    <FormCell checkbox key={'month' + index}>
                                        <CellHeader>
                                            <Checkbox name="month" value={item.month}/>
                                        </CellHeader>
                                        <CellBody>{item.month + '月'}</CellBody>
                                    </FormCell>
                                );
                            })}
                        </Form>
                    ]
                )}
                
            </div>
        );
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
}

Cash.propTypes = {
    dispatch: propTypes.func,
    modal: propTypes.object,
    organization: propTypes.object
};

export default connect(propMap)(Cash);