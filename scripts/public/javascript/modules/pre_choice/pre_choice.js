import preChoiceTranslate from "./functions/pre_choice_translate.js";
import preChoiceBring from "./functions/pre_choice_bring.js";
import preChoiceSelect from "./functions/pre_choice_select.js";
import preChoiceScroll from "./functions/pre_choice_scroll.js";

const preChoice = {
    translate: preChoiceTranslate, 
    bring: preChoiceBring, 
    select: preChoiceSelect, 
    scroll: preChoiceScroll
}

export default preChoice