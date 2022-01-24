import datalistLogic from './functions/datalist/datalist_logic.js'
import datalistHistoryManagement from './functions/datalist/datalist_history_management.js'
import searchBarMediaManagement from './functions/search_bar_media_management.js'
import searchBarInit from './functions/search_bar_init.js'

const searchBar = {
    datalist: {
        logic: datalistLogic, 
        historyManagement: datalistHistoryManagement
    }, 
    init: searchBarInit, 
    mediaManagement: searchBarMediaManagement
}

export default searchBar