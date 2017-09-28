import { RECEIVE_DECKS, ADD_DECK } from '../actions'
const initialState = {
    decks: null
}

function Deck(state = initialState, action){
    switch(action.type){
        case ADD_DECK:
        return{
            decks:{
                ...state.decks,
                ...action.deck
            }
        }
        case RECEIVE_DECKS:
        return{
            decks: action.decks
        }
        default:
            return state
    }
}

export default Deck