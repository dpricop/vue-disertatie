import { createStore } from "vuex";
import Partners from "./modules/Crm/Partners";
import PartnerContacts from "./modules/Crm/PartnerContacts";
import Actions from "./modules/Crm/Actions";
import Tasks from "./modules/Crm/Tasks";
import Leads from "./modules/Crm/Leads";
import Opportunities from "./modules/Crm/Opportunities";
import OffersHeaders from "./modules/Crm/OffersHeaders";

export default createStore({
  modules: {
    partners: Partners,
    partnercontacts: PartnerContacts,
    partnercontacts: PartnerContacts,
    actions: Actions,
    tasks: Tasks,
    leads: Leads,
    opportunities: Opportunities,
    offers: OffersHeaders,
  },
});
