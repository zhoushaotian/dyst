import React from 'react';
import {connect} from 'react-redux';
import {
    Panel,
    PanelBody,
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    // MediaBoxTitle,
    Cells,
    CellBody,
    CellFooter,
    Cell

} from 'react-weui';

function propMap(state) {
    return {
        modal: state.modal
    };
}
class Account extends React.Component {
    render() {
        return (
            <div className="page">
                <Panel>
                    <PanelBody>
                        <MediaBox type="appmsg" href="javascript:void(0);">
                            <MediaBoxHeader></MediaBoxHeader>
                            <MediaBoxBody>
                                <div>
                                    222
                                </div>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                </Panel>
                <Cells>
                    <Cell href="javascript:;" access>
                        <CellBody>
                            Title
                        </CellBody>
                        <CellFooter/>
                    </Cell>
                    <Cell access>
                        <CellBody>
                            Title
                        </CellBody>
                        <CellFooter/>
                    </Cell>
                </Cells>
            </div>
        );
    }
}

export default connect(propMap)(Account);