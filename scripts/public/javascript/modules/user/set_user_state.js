import logged from "./functions/logged.js"
import unlogged from "./functions/unlogged.js"

export default function setUserState(state) {
    userState = state
    if (userState) {
        logged()
    } else {
        unlogged()
    }
}