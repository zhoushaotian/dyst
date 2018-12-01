import React from 'react';
import propTypes from 'prop-types';


import {InfiniteLoader} from 'react-weui';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    card: {
        width: '100%',
        marginBottom: '10px'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 20,
    },
    time: {
        fontSize: 12
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        fontSize: 14
    },
    wp: {
        padding: '5px'
    }
};
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
        const {classes} = this.props;
        const {data} = this.state;
        return (
            <InfiniteLoader
                triggerPercent={99}
                onLoadMore={ (resolve, finish) => {
                    this.handleGetList(resolve, finish);
                }}
            >
                <div className={classes.wp}>
                    {data.map(function(item, index) {
                        return (
                            <Card className={classes.card} key={index}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" className={classes.title}>
                                        {item.title}
                                    </Typography>
                                    <Chip
                                        icon={<FaceIcon />}
                                        label={item.studyTime}
                                        color="primary"
                                        variant="outlined"
                                    />
                                </CardContent>
                                {
                                    item.href ?
                                        (
                                            <CardActions>
                                                <a href={item.href}><Button size="small" variant="contained" color="secondary" className={classes.button}>查看详情</Button></a>
                                            </CardActions>
                                        ) : null}
                            </Card>
                        );
                    })}
                </div>
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
            // 处理数据
            res.data.rows = res.data.rows.map(function(item) {
                return Object.assign({}, item, {
                    href: item.categoryId ? `/client/record/?id=${item.categoryId}` : ''
                });
            });
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
    query: propTypes.object,
    classes: propTypes.object
};

export default withStyles(styles)(CategoryRecord);