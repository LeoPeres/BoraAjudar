import Rebase from 're-base'
import firebase from 'firebase'

const config = {
    apiKey: 'AIzaSyBdCUTsdjyXVUxJNPF2Yh63YhsKDUzzoPY',
    authDomain: 'bora-fe98f.firebaseapp.com',
    databaseURL: 'https://bora-fe98f.firebaseio.com',
    projectId: 'bora-fe98f',
    storageBucket: 'bora-fe98f.appspot.com',
    messagingSenderId: '463596977499'
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export const auth = firebase.auth()
export default base