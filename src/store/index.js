import { createStore } from "vuex";
import Partners from "./modules/Crm/Partners";
import PartnerContacts from "./modules/Crm/PartnerContacts";

export default createStore({
  modules: {
    partners: Partners,
    partnercontacts: PartnerContacts,
  },
});
