<template>
  <h1 class="my-4 px-4">
    Settings
  </h1>

  <div class="accordion accordion-flush" id="settingsAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingOne">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
          aria-expanded="false"
          aria-controls="flush-collapseOne"
        >
          leads and opportunities settings
        </button>
      </h2>
      <div
        id="flush-collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingOne"
        data-bs-parent="#settingsAccordion"
      >
        <div class="accordion-body px-0">
          <ul class="nav nav-tabs" id="lead-opportunity-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="reasons-btn"
                data-bs-toggle="tab"
                data-bs-target="#reasons-tab"
                type="button"
                role="tab"
                aria-controls="reasons-tab"
                aria-selected="true"
              >
                Reasons
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="lead-status-btn"
                data-bs-toggle="tab"
                data-bs-target="#lead-status-tab"
                type="button"
                role="tab"
                aria-controls="lead-status-tab"
                aria-selected="false"
              >
                Lead status
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="opportunity-status-btn"
                data-bs-toggle="tab"
                data-bs-target="#opportunity-status-tab"
                type="button"
                role="tab"
                aria-controls="opportunity-status-tab"
                aria-selected="false"
              >
                Opportunity status
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="opportunity-phase-btn"
                data-bs-toggle="tab"
                data-bs-target="#opportunity-phase-tab"
                type="button"
                role="tab"
                aria-controls="opportunity-phase-tab"
                aria-selected="false"
              >
                Opportunity phase
              </button>
            </li>
          </ul>
          <div class="tab-content">
            <div
              class="tab-pane fade show active p-3"
              id="reasons-tab"
              role="tabpanel"
              aria-labelledby="reasons-btn"
            >
              <config-motive-table />
            </div>
            <div
              class="tab-pane fade p-3"
              id="lead-status-tab"
              role="tabpanel"
              aria-labelledby="lead-status-btn"
            >
              <crm-lead-status-table />
            </div>
            <div
              class="tab-pane fade p-3"
              id="opportunity-status-tab"
              role="tabpanel"
              aria-labelledby="opportunity-status-btn"
            >
              <crm-opportunity-status-table />
            </div>
            <div
              class="tab-pane fade p-3"
              id="opportunity-phase-tab"
              role="tabpanel"
              aria-labelledby="opportunity-phase-btn"
            >
              <crm-opportunity-faza-table />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingTwo">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
          aria-expanded="false"
          aria-controls="flush-collapseTwo"
        >
          Location settings
        </button>
      </h2>
      <div
        id="flush-collapseTwo"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingTwo"
        data-bs-parent="#settingsAccordion"
      >
        <div class="accordion-body px-0">
          <ul class="nav nav-tabs" id="location-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="cities-btn"
                data-bs-toggle="tab"
                data-bs-target="#cities-tab"
                type="button"
                role="tab"
                aria-controls="cities-tab"
                aria-selected="false"
              >
                Cities
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="counties-btn"
                data-bs-toggle="tab"
                data-bs-target="#counties-tab"
                type="button"
                role="tab"
                aria-controls="counties-tab"
                aria-selected="false"
              >
                Counties
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="countries-btn"
                data-bs-toggle="tab"
                data-bs-target="#countries-tab"
                type="button"
                role="tab"
                aria-controls="countries-tab"
                aria-selected="false"
              >
                Countries
              </button>
            </li>
          </ul>
          <div class="tab-content">
            <div
              class="tab-pane fade show active p-3"
              id="cities-tab"
              role="tabpanel"
              aria-labelledby="cities-btn"
            >
              <config-localitati-table />
            </div>
            <div
              class="tab-pane fade p-3"
              id="counties-tab"
              role="tabpanel"
              aria-labelledby="counties-btn"
            >
              <config-judete-table />
            </div>
            <div
              class="tab-pane fade p-3"
              id="countries-tab"
              role="tabpanel"
              aria-labelledby="countries-btn"
            >
              <config-tari-table />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingThree">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseThree"
          aria-expanded="false"
          aria-controls="flush-collapseThree"
        >
          Articles settings
        </button>
      </h2>
      <div
        id="flush-collapseThree"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingThree"
        data-bs-parent="#settingsAccordion"
      >
        <div class="accordion-body px-0">
          <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="articles-btn"
                data-bs-toggle="tab"
                data-bs-target="#articles-tab"
                type="button"
                role="tab"
                aria-controls="articles-tab"
                aria-selected="false"
              >
                Articles
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="groups-btn"
                data-bs-toggle="tab"
                data-bs-target="#groups-tab"
                type="button"
                role="tab"
                aria-controls="groups-tab"
                aria-selected="false"
              >
                Groups
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="monede-btn"
                data-bs-toggle="tab"
                data-bs-target="#monede-tab"
                type="button"
                role="tab"
                aria-controls="monede-tab"
                aria-selected="false"
              >
                Currencies
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="um-btn"
                data-bs-toggle="tab"
                data-bs-target="#um-tab"
                type="button"
                role="tab"
                aria-controls="um-tab"
                aria-selected="false"
              >
                Unit of measures
              </button>
            </li>
          </ul>
          <div class="tab-content">
            <div
              class="tab-pane fade show active p-3"
              id="articles-tab"
              role="tabpanel"
              aria-labelledby="articles-btn"
            >
              <crm-articole-table />
            </div>
            <div
              class="tab-pane fade p-3"
              id="groups-tab"
              role="tabpanel"
              aria-labelledby="groups-btn"
            >
              <config-grupe-table />
            </div>
            <div
              class="tab-pane fade p-3"
              id="monede-tab"
              role="tabpanel"
              aria-labelledby="monede-btn"
            >
              <config-monede-table />
            </div>
            <div
              class="tab-pane fade p-3"
              id="um-tab"
              role="tabpanel"
              aria-labelledby="um-btn"
            >
              <config-um-table />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="accordion-item">
      <h2 class="accordion-header" id="flush-headingFour">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseFour"
          aria-expanded="false"
          aria-controls="flush-collapseFour"
        >
          Actions settings
        </button>
      </h2>
      <div
        id="flush-collapseFour"
        class="accordion-collapse collapse"
        aria-labelledby="flush-headingFour"
        data-bs-parent="#settingsAccordion"
      >
        <div class="accordion-body px-0">
          <ul class="nav nav-tabs" id="action-tab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="action-types-btn"
                data-bs-toggle="tab"
                data-bs-target="#action-types-tab"
                type="button"
                role="tab"
                aria-controls="action-types-tab"
                aria-selected="false"
              >
                Action types
              </button>
            </li>
          </ul>
          <div class="tab-content">
            <div
              class="tab-pane fade show active p-3"
              id="action-types-tab"
              role="tabpanel"
              aria-labelledby="action-types-btn"
            >
              <crm-tip-actiuni-table />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Accordion 1 - tab elements
import ConfigMotiveTable from "@/components/Config/ConfigMotive/ConfigMotiveTable";
import CrmLeadStatusTable from "@/components/Crm/CrmLeadStatus/CrmLeadStatusTable";
import CrmOpportunityStatusTable from "@/components/Crm/CrmOpportunityStatus/CrmOpportunityStatusTable";
import CrmOpportunityFazaTable from "@/components/Crm/CrmOpportunityFaza/CrmOpportunityFazaTable";

// Accordion 2 - tab elements
import ConfigTariTable from "@/components/Config/ConfigTari/ConfigTariTable";
import ConfigJudeteTable from "@/components/Config/ConfigJudete/ConfigJudeteTable";
import ConfigLocalitatiTable from "@/components/Config/ConfigLocalitati/ConfigLocalitatiTable";

// Accordion 3 - tab elements
import CrmArticoleTable from "@/components/Crm/CrmArticole/CrmArticoleTable";
import ConfigGrupeTable from "@/components/Config/ConfigGrupe/ConfigGrupeTable";
import ConfigMonedeTable from "@/components/Config/ConfigMonede/ConfigMonedeTable";
import ConfigUmTable from "@/components/Config/ConfigUm/ConfigUmTable";

// Accordion 4 - tab element
import CrmTipActiuniTable from "@/components/Crm/CrmTipActiuni/CrmTipActiuniTable";

export default {
  name: "",
  components: {
    ConfigMotiveTable,
    CrmLeadStatusTable,
    CrmOpportunityStatusTable,
    CrmOpportunityFazaTable,

    ConfigTariTable,
    ConfigJudeteTable,
    ConfigLocalitatiTable,

    CrmArticoleTable,
    ConfigGrupeTable,
    ConfigMonedeTable,
    ConfigUmTable,

    CrmTipActiuniTable,
  },
};
</script>
<style scop CrmTipActiuniTableed>
.accordion-button:focus,
.accordion-button:active {
  outline: none;
  box-shadow: none;
}
.accordion-button:not(.collapsed) {
  /* background-color: #6c757d !important; */
}
.accordion-body {
  padding: 0px !important;
}
.accordion-body > .tab-content {
  background-color: #f8f9fa;
}
.nav-item > button {
  border-radius: 0px !important;
}
.nav-item .nav-link.active {
  background-color: #f8f9fa !important;
  border-bottom-color: #f8f9fa;
}
</style>
