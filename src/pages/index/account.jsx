import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    Panel,
    PanelBody,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    LoadMore
    // Cells,
    // CellBody,
    // CellFooter,
    // Cell

} from 'react-weui';

import {fetchUserInfo} from '../../actions/account';
import {getDevDisplayValue} from '../../common/tool';

function propMap(state) {
    return {
        modal: state.modal,
        account: state.account
    };
}
class Account extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchUserInfo());
    }
    render() {
        const {account, modal} = this.props;
        const {info} = account;
        const isBind = info.haveBind === 1;
        if(modal.loadingData) {
            return <LoadMore loading/>;
        }
        return (
            <div className="page">
                <Panel>
                    <PanelBody>
                        <MediaBox type="appmsg" href="javascript:void(0);">
                            <MediaBoxHeader><img src={info.avator} alt=""/></MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>{info.nickname}</MediaBoxTitle>
                                <MediaBoxDescription>
                                    {isBind && info.deptName ? info.deptName : getDevDisplayValue()}
                                    <br/>
                                    {isBind && info.idcard ? info.idcard : getDevDisplayValue()}
                                </MediaBoxDescription>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
            </div>
        );
    }
}

Account.propTypes = {
    account: propTypes.object,
    modal: propTypes.object,
    dispatch: propTypes.func
};

export default connect(propMap)(Account);