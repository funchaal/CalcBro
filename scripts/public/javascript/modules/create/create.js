import createMenu from './functions/create_menu.js'
import createShowResultButton from './functions/create_show_result_button.js'

const create = {
    menu: function (db) {
        createMenu(db)
    }, 
    showResultButton: function () {
        createShowResultButton()
    }
}

export default create