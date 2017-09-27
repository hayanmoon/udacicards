import { AsyncStorage } from 'react-native'

const DECK_KEY = "DECK_KEY"

export function getDecks(){
    return AsyncStorage.getItem(DECK_KEY).then(data => JSON.parse(data))
}
export function getDeck(id){}
export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({[title]:{title}}))
}
export function addCardToDeck(title,card){
    
}

// getDecks: return all of the decks along with their titles, questions, and answers. 
// getDeck: take in a single id argument and return the deck associated with that id. 
// saveDeckTitle: take in a single title argument and add it to the decks. 
// addCardToDeck: 