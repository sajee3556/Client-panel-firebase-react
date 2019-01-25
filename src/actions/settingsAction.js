import {ALLOW_REGISTRATION, DISABLE_BALANCE_ON_ADD, DISABLE_BALANCE_ON_EDIT} from './Type';

export const setDisableBalanceOnAdd = () => {
    //Get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //toggle
    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd;

    //Set settings to local storage
    localStorage.setItem('settings',JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd
    }
};

export const setDisableBalanceOnEdit = () => {
    //Get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //toggle
    settings.disableBalanceOnEdit = !settings.disableBalanceOnEdit;

    //Set settings to local storage
    localStorage.setItem('settings',JSON.stringify(settings));

    return {
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    }
};

export const setAllowRegistration = () => {
    //Get settings from local storage
    const settings = JSON.parse(localStorage.getItem('settings'));

    //toggle
    settings.allowOnRegistration = !settings.allowOnRegistration;

    //Set settings to local storage
    localStorage.setItem('settings',JSON.stringify(settings));

    return {
        type: ALLOW_REGISTRATION,
        payload: settings.allowOnRegistration
    }
};