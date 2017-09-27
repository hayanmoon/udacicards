import { RECEIVE_DECKS } from '../actions'
const initialState = {
    decks:[]
}

function Deck(state = initialState, action){
    switch(action.type){
        case RECEIVE_DECKS:
        return{
            decks: action.decks
        }
        default:
            return state
    }
}

export default Deck