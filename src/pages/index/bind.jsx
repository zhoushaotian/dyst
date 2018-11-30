import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import fetchData from '../../common/api';

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
    Page
} from 'react-weui';
import { message } from '../../common/tool';



function propMap(state) {
    return {
        organization: state.organization,
        modal: state.modal
    };
}
class Bind extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            idcard: '',
            code: '',
            phone: '',
            codeTime: 0
        };

        this.handleFetchCode = this.handleFetchCode.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleClickBind = this.handleClickBind.bind(this);

        this.hasGetCode = false;
    }
    render() {
        const {idcard, code, phone, codeTime} = this.state;
        return (
            <Page infiniteLoader={false}>
                <CellsTitle>党员绑定</CellsTitle>
                <Form>
                    <FormCell>
                        <CellHeader>
                            <Label>身份证号码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请输入身份证号码" value={idcard} onChange={(e) => {this.handleValueChange('idcard', e.target.value);}}/>
                        </CellBody>
                    </FormCell>
                    <FormCell vcode>
                        <CellHeader>
                            <Label>手机号</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="tel" placeholder="请输入手机号码" value={phone} onChange={(e) => {this.handleValueChange('phone', e.target.value);}}/>
                        </CellBody>
                        <CellFooter>
                            <Button type="vcode" onClick={this.handleFetchCode}>{codeTime ? `${codeTime}秒` : '获取验证码'}</Button>
                        </CellFooter>
                    </FormCell>
                    <FormCell>
                        <CellHeader>
                            <Label>验证码</Label>
                        </CellHeader>
                        <CellBody>
                            <Input type="number" placeholder="请输入验证码" value={code} onChange={(e) => {this.handleValueChange('code', e.target.value);}}/>
                        </CellBody>
                    </FormCell>
                </Form>
                <Button onClick={this.handleClickBind} style={{marginTop: '20px'}}>绑定党员</Button>
            </Page>
        );
    }
    handleClickBind() {
        const {code, phone, idcard} = this.state;
        if(!idcard) {
            return message.error('请填写身份证');
        }
        if(!phone) {
            return message.error('请填写手机号');
        }
        if(!code) {
            return message.error('请填写验证码');
        }
        if(!this.hasGetCode) {
            return message.error('请先获取验证码');
        }
        fetchData('bindParty', {
            idcard,
            phone,
            code
        }, 'post').then(function(res) {
            message.success(res.msg + '即将跳转首页');
            setTimeout(() => {
                window.location = '/client/';
            }, 2500);
        }).catch(function(err) {
            message.error(err.message);
        });
    }
    handleValueChange(feild, value) {
        this.setState({
            [feild]: value
        });
    }
    handleFetchCode() {
        const {phone} = this.state;
        if(!phone) {
            return message.error('请填写手机号');
        }
        fetchData('getBindCode', {
            phone
        }).then(() => {
            this.hasGetCode = true;
            message.success('验证码已发送到您的手机，请稍后');
            this.setState({
                codeTime: 60
            }, () => {
                this.codeTime = 60;
                this.timer = setInterval(() => {
                    if(this.codeTime === 0) {
                        clearInterval(this.timer);
                        return this.timer = null;
                    }
                    this.setState({
                        codeTime: --this.codeTime
                    });
                }, 1000);
            });
        }).catch((err) => {
            message.error(err.message);
        });
    }
}

Bind.propTypes = {
    dispatch: propTypes.func,
    modal: propTypes.object,
    organization: propTypes.object
};

export default connect(propMap)(Bind);