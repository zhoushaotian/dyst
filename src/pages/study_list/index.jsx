import React from 'react';
import {
    InfiniteLoader
} from 'react-weui';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';


import {connect} from 'react-redux';

import {getQuery, loop} from '../../common/tool';

import {fetchStudyList, cleanStudyList} from '../../actions/study';

function propMap(state, ownProps) {
    return {
        study: state.study,
        routing: ownProps
    };
}


const styles = theme => ({
    root: {
        position: 'relative',
        overflow: 'scroll',
        overflowScrolling: 'touch',
        webkitOverFlowScrolling: 'touch',
        zIndex: 1000,
        
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: '16px'
    },
    time: {
        marginTop: '20px',
        fongtSize: '12px'
    },
    padding: {
        padding: '10px'
    }
});

class StudyList extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleGetList = this.handleGetList.bind(this);
    }
    componentDidMount() {
        this.handleGetList(loop, loop);
    }
    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(cleanStudyList());
    }
    render() {
        const {study, classes} = this.props;
        const {list} = study;
        return (
            <div className={classes.root}>
                <InfiniteLoader
                    loaderDefaultIcon={<div className="no-more">没有更多数据了</div>}
                    triggerPercent={99}
                    onLoadMore={ (resolve, finish) => {
                        this.handleGetList(resolve, finish);
                    }}
                >
                    <Grid container>
                        {list.map(function(item, index) {
                            return (
                                <Grid item xs={12} key={index} className={classes.padding}>
                                    <a href={`/client/list/detail/?id=${item.cid}`}>
                                        <Card>
                                            {item.type !== 1 ? <CardMedia
                                                component="img"
                                                image={item.imgUrl}
                                            /> : null}
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="p" className={classes.title}>
                                                    {item.title}
                                                </Typography>
                                                <Typography gutterBottom component="span" className={classes.time} color="textSecondary">
                                                    {item.time}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </a>
                                </Grid>
                            );
                        })}
                    </Grid>
                </InfiniteLoader>
            </div>
        );
    }
    handleGetList(resolve, finish) {
        const {study, dispatch, routing} = this.props;
        const {categoryPage} = study;
        const id = getQuery(routing).id;
        dispatch(fetchStudyList({
            offset: ++categoryPage.offset,
            limit: 10,
            categoryId: id
        }, resolve, finish));
    }
}

StudyList.propTypes = {
    routing: propTypes.object,
    dispatch: propTypes.func,
    study: propTypes.object,
    classes: propTypes.object
};

export default connect(propMap)(withStyles(styles)(StudyList));