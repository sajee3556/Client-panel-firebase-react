import {DISABLE_BALANCE_ON_EDIT, ALLOW_REGISTRATION, DISABLE_BALANCE_ON_ADD} from '../actions/Type';

export default function (state = {},action) {
    switch (action.type){
        case DISABLE_BALANCE_ON_ADD:
            return{
                ...state,
                disableBalanceOnAdd: action.payload
            };
        case DISABLE_BALANCE_ON_EDIT:
            return{
                ...state,
                disableBalanceOnEdit: action.payload
            };
        case ALLOW_REGISTRATION:
            return{
                ...state,
                allowOnRegistration: action.payload
            };
        default: return state;
    }
}