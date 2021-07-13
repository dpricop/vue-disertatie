import { createStore } from "vuex";
import Partners from "./modules/Crm/Partners";
import PartnerContacts from "./modules/Crm/PartnerContacts";
import Actions from "./modules/Crm/Actions";
import ActionsType from "./modules/Crm/ActionsType";
import Tasks from "./modules/Crm/Tasks";
import Leads from "./modules/Crm/Leads";
import Opportunities from "./modules/Crm/Opportunities";
import OpportunityPhase from "./modules/Crm/OpportunityPhase";
import OpportunityStatus from "./modules/Crm/OpportunityStatus";
import OffersHeaders from "./modules/Crm/OffersHeaders";
import OffersDetails from "./modules/Crm/OffersDetails";
import Reasons from "./modules/Config/Reasons";
import CrmLeadStatus from "./modules/Crm/CrmLeadStatus";

export default createStore({
  modules: {
    partners: Partners,
    partnercontacts: PartnerContacts,
    actions: Actions,
    actionTypes: ActionsType,
    tasks: Tasks,
    leads: Leads,
    leadStatus: CrmLeadStatus,
    opportunities: Opportunities,
    opportunityPhase: OpportunityPhase,
    opportunityStatus: OpportunityStatus,
    offers: OffersHeaders,
    offersDetails: OffersDetails,
    reason: Reasons,
  },
});
