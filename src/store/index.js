import { createStore } from "vuex";
import Partners from "./modules/Crm/Partners";
import PartnerContacts from "./modules/Crm/PartnerContacts";
import Actions from "./modules/Crm/Actions";
import Tasks from "./modules/Crm/Tasks";
export default createStore({
  modules: {
    partners: Partners,
    partnercontacts: PartnerContacts,
    partnercontacts: PartnerContacts,
    actions: Actions,
    tasks: Tasks,
  },
});
