import { createStore } from "vuex";
import Partners from "./modules/Crm/Partners";
import PartnerContacts from "./modules/Crm/PartnerContacts";
import Actions from "./modules/Crm/Actions";
import ActionsType from "./modules/Crm/ActionsType";
import Tasks from "./modules/Crm/Tasks";
import Leads from "./modules/Crm/Leads";
import Opportunities from "./modules/Crm/Opportunities";
import OffersHeaders from "./modules/Crm/OffersHeaders";
import Reasons from "./modules/Config/Reasons";
import CrmLeadStatus from "./modules/Crm/CrmLeadStatus";

export default createStore({
  modules: {
    partners: Partners,
    partnercontacts: PartnerContacts,
    partnercontacts: PartnerContacts,
    actions: Actions,
    actionTypes: ActionsType,
    tasks: Tasks,
    leads: Leads,
    leadStatus: CrmLeadStatus,
    opportunities: Opportunities,
    offers: OffersHeaders,
    reason: Reasons,
  },
});
