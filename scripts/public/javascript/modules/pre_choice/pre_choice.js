import preChoiceTranslate from "./functions/pre_choice_translate.js";
import preChoiceBring from "./functions/pre_choice_bring.js";
import preChoiceSelect from "./functions/pre_choice_select.js";
import preChoiceScroll from "./functions/pre_choice_scroll.js";
import preChoiceCreate from "./functions/pre_choice_create.js";

const preChoice = {
    translate: preChoiceTranslate, 
    bring: preChoiceBring, 
    select: preChoiceSelect, 
    scroll: preChoiceScroll, 
    create: preChoiceCreate
}

export default preChoice