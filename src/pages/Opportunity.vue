<template>
  <div class="col-12 d-flex align-items-center">
    <router-link
      class="text-decoration-none d-inline-block m-2"
      :to="{
        name: 'opportunities',
      }"
    >
      <i class="cil-chevron-circle-left-alt"></i>
      <span>All opportunities</span>
    </router-link>
    <h1 class="my-4 px-4 d-inline-block">
      {{ this.OpportunityData.OppDescriere }}
    </h1>
  </div>

  <div class="col-12 py-3 bg-light">
    <crm-opportunities-form-accordion
      v-bind:propsData="this.OpportunityData"
      :key="this.OpportunityData"
      @editedItem="this.OpportunityData"
    />
  </div>
  <div class="col-12 py-3 mt-3 bg-light">
    <div class="table-responsive">
      <crm-actiuni-table
        vuex-getter="getByOpportunityId"
        :vuex-param="idOpportunity"
        :is-lead="false"
        :is-opportunity="true"
        css-styles="col-auto"
      />
    </div>
  </div>
</template>

<script>
import CrmOpportunitiesFormAccordion from "../components/Crm/CrmOpportunities/CrmOpportunitiesFormAccordion.vue";
import CrmActiuniTable from "@/components/Crm/CrmActiuni/CrmActiuniTable";

export default {
  name: "Opportunity",
  components: {
    CrmOpportunitiesFormAccordion,
    CrmActiuniTable,
  },
  data: function(e) {
    return {
      idOpportunity: this.$route.params["id"],
      OpportunityData: {},
      partnerContactsData: [],
    };
  },
  created() {},
  mounted() {
    this.reloadStore();
  },
  methods: {
    async reloadStore() {
      await this.$store.dispatch("opportunities/getDataSource");
      this.OpportunityData = await this.$store.getters["opportunities/getById"](
        this.idOpportunity
      );
    },
  },
};
</script>
