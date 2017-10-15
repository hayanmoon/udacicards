import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const DECK_KEY = "DECK_KEY"
const NOTIFICATION_KEY = "NOTIFICATION_KEY"

export function getDecks(){
    return AsyncStorage.getItem(DECK_KEY).then(data => JSON.parse(data))
}
export function getDeck(id){
    return AsyncStorage.getItem(DECK_KEY).then(data => JSON.parse(data))
    .then(data =>{
        return data[id] 
    })
}
export function saveDeckTitle(title){
    const data = {[title]:{title,questions:[]}}
    return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify(data)).then(()=> data)
}
export function addCardToDeck(title,card){
    return AsyncStorage.getItem(DECK_KEY).then(result=>{
        const data = JSON.parse(result)
        data[title].questions = [...data[title].questions, card]
        AsyncStorage.setItem(DECK_KEY,JSON.stringify(data))
    })
}

function createNotification () {
    return {
      title: 'Take a Quiz!',
      body: "👋 don't forget to take a quiz for today!",
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        priority: 'high',
        sticky: false,
        vibrate: true,
      }
    }
  }

  export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  

export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()
                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate()+1)
                tomorrow.setHours(12)
                tomorrow.setMinutes(45)
                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            }).catch(e=>{console.log(e)})
        }
    })
}