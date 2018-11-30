import {UPDATE_IDCARD_INFO, CLEAN_IDCARD_INFO, UPDATE_CASH_MONTH, CLEAN_CASH_MONTH, UPDATE_PARTY_ORG, UPDATE_METRIX} from '../actions/organization';

const INIT_STATE = {
    idCardInfo: {},
    cashMonth: [],
    partyOrg: [],
    metrix: []
};
function cacLevel(data) {
    let tmpArr = [];
    let level = 0;
    tmpArr.push(data);
    while(tmpArr.length > 0) {
        let node = tmpArr.shift();
        if(Array.isArray(node.children) && node.children.length !== 0) {
            node.children.map((item) => {
                item.level = level;
                tmpArr.push(item);
                return item;
            });
        }
        level++;
    }
    return data;
}

export default function(state = INIT_STATE, action) {
    
    switch(action.type) {
    case UPDATE_METRIX:
        return Object.assign({}, state, {
            metrix: action.data
        });
    case UPDATE_PARTY_ORG:
        // 计算级数
        action.data = cacLevel({children: action.data}).children;
        return Object.assign({}, state, {
            partyOrg: action.data
        });
    case UPDATE_CASH_MONTH:
        return Object.assign({}, state, {
            cashMonth: action.data
        });
    case CLEAN_CASH_MONTH:
        return Object.assign({}, state, {
            cashMonth: []
        });
    case UPDATE_IDCARD_INFO:
        return Object.assign({}, state, {
            idCardInfo: action.data
        });
    case CLEAN_IDCARD_INFO:
        return Object.assign({}, state, {
            idCardInfo: {}
        });
    default:
        return state;
    }
}