import {combineReducers, compose, createStore} from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import {firebaseReducer, reactReduxFirebase} from 'react-redux-firebase';
import {firestoreReducer, reduxFirestore} from 'redux-firestore';
import notifyReducers from './reducers/notifyReducers';
import settingsReducer from './reducers/settingsReducer';

const firebaseConfig = {
    apiKey: "AIzaSyCe7LtnB5QISmn7Oeb-rbQcwloRMX-YemI",
    authDomain: "clients-react.firebaseapp.com",
    databaseURL: "https://clients-react.firebaseio.com",
    projectId: "clients-react",
    storageBucket: "clients-react.appspot.com",
    messagingSenderId: "450177716543"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize firebase instance
firebase.firestore();

// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    notify: notifyReducers,
    settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem('settings') == null) {
    // Default settings
    const defaultSettings = {
        disableBalanceOnAdd: true,
        disableBalanceOnEdit: false,
        allowRegistration: false
    };

    // Set to localStorage
    localStorage.setItem('settings', JSON.stringify(defaultSettings));
    // localStorage.setItem('settings', defaultSettings);
}

// Create initial state
const initialState = {settings: JSON.parse(localStorage.getItem('settings'))};
// const initialState = {settings: localStorage.getItem('settings')};

// Create store
const store = createStoreWithFirebase(
    rootReducer,
    initialState,
    compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;