import {atom} from 'recoil'

export const storeContext=atom({
    key:"store",
    default:[]
})

export const choosenContext=atom({
    key:'choosen',
    default:{}
})