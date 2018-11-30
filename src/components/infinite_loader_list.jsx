import React from 'react';
import propTypes from 'prop-types';


import {InfiniteLoader, Page, Cells, Cell, CellBody, CellFooter} from 'react-weui';


class CategoryRecord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            offset: 1,
            limit: 15
        };
    }
    componentDidMount() {
        this.handleGetList();
    }
    render() {
        const {data} = this.state;
        return (
            <InfiniteLoader
                triggerPercent={99}
                onLoadMore={ (resolve, finish) => {
                    this.handleGetList(resolve, finish);
                }}
            >
                <Page className="infinite"
                    loaderDefaultIcon={<div style={{fontSize: '14px', textAlign: 'center'}}>没有更多数据了</div>}
                    triggerPercent={99}
                    onLoadMore={ (resolve, finish) => {
                        this.handleGetList(resolve, finish);
                    }}
                >
                    <Cells>
                        {
                            data.map( (item, i) => {
                                return (
                                    <Cell href={item.href} key={i} access>
                                        <CellBody>
                                            {item.name}
                                        </CellBody>
                                        <CellFooter/>
                                    </Cell>
                                );
                            })
                        }
                    </Cells>
                </Page>
            </InfiniteLoader>
        );
    }
    handleGetList(resolve, finish) {
        let {limit, offset, data} = this.state;
        const {fetchPromise, query} = this.props;
        return fetchPromise({
            limit,
            offset,
            ...query
        }).then((res) => {
            if(res.data.rows.length !== 0) {
                return this.setState({
                    offset: ++offset,
                    data: data.concat(res.data.rows)
                }, () => {
                    if(typeof resolve === 'function') resolve();
                });
            }
            if(typeof resolve === 'function') finish();
            
        });
    }
}

CategoryRecord.propTypes = {
    fetchPromise: propTypes.func,
    query: propTypes.object
};

export default CategoryRecord;