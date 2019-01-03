import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {
//     // Panel,
//     // PanelBody,
//     // MediaBox,
//     // MediaBoxHeader,
//     // MediaBoxBody,
//     // MediaBoxTitle,
//     // MediaBoxDescription,
    LoadMore
//     // Cells,
//     // CellBody,
//     // CellFooter,
//     // Cell

} from 'react-weui';

import {fetchUserInfo } from '../../actions/account';
// import {getDevDisplayValue} from '../../common/tool';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
// import Collapse from '@material-ui/core/Collapse';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import ExpandListItem from '../../components/expand_list_item.jsx';



function propMap(state) {
    return {
        modal: state.modal,
        account: state.account
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        margin: '5px',
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
    }
});
class Account extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(fetchUserInfo());
    }
    render() {
        const {account, modal, classes} = this.props;
        const {info} = account;
        const isBind = info.haveBind === 1;
        if(modal.loadingData) {
            return <LoadMore loading/>;
        }
        return (
            <Card
                className={classes.root}
            >
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar} src={info.avator}/>
                        }
                        title={info.nickname}
                        subheader={isBind ? '党员' : '未绑定党员'}
                    />
                    <CardContent>
                        <Typography gutterBottom component="span" className={classes.time}>
                            组织名称:{info.deptName}
                        </Typography>
                        <Typography gutterBottom component="span" className={classes.time}>
                            身份证号:{info.idcard}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {isBind ? null : <a href="/client/bind/"><Button variant="contained" size="small" color="secondary">绑定党员</Button></a>}
                    {isBind ? <a href="/client/record/"><Button variant="contained" size="small" color="secondary">查看我的学习记录</Button></a> : null}
                    {isBind ? <a href="/client/collect/" style={{marginLeft: '10px'}}><Button variant="contained" size="small" color="secondary">我的收藏</Button></a> : null}
                </CardActions>
            </Card>
        );
    }
}

Account.propTypes = {
    account: propTypes.object,
    modal: propTypes.object,
    dispatch: propTypes.func,
    classes: propTypes.object
};

export default connect(propMap)(withStyles(styles)(Account));