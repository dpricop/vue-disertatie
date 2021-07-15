<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <div class="col-12 d-flex align-items-center">
      <router-link
        class="text-decoration-none d-inline-block m-2"
        :to="{
          name: 'leads',
        }"
      >
        <i class="cil-chevron-circle-left-alt"></i>
        <span>All leads</span>
      </router-link>
      <h1 class="my-4 px-4 d-inline-block">
        {{ this.LeadData.LeadNume }}
      </h1>
    </div>

    <div class="col-12 py-3 bg-light">
      <crm-leads-form-accordion
        v-bind:propsData="this.LeadData"
        :key="this.LeadData"
        @editedItem="this.LeadData"
      />
    </div>
    <div class="col-12 py-3 mt-3 bg-light">
      <h4>Actions</h4>
      <div class="table-responsive">
        <crm-actiuni-table
          vuex-getter="getByLeadId"
          :vuex-param="idLead"
          :is-lead="true"
          :is-opportunity="false"
          css-styles="col-auto"
        />
      </div>
    </div>
  </template>
</template>

<script>
import Loading from "@/components/Loading";
import CrmLeadsFormAccordion from "@/components/Crm/CrmLeads/CrmLeadsFormAccordion";
import CrmActiuniTable from "@/components/Crm/CrmActiuni/CrmActiuniTable";

export default {
  name: "Lead",
  components: {
    Loading,
    CrmLeadsFormAccordion,
    CrmActiuniTable,
  },
  data: function(e) {
    return {
      isLoading: true,
      idLead: 0,
      LeadData: {},
      partnerContactsData: [],
    };
  },
  created() {
    this.idLead = this.$route.params["id"];
  },
  mounted() {
    this.reloadStore();
  },
  methods: {
    async reloadStore() {
      await this.$store.dispatch("leads/getDataSource");
      this.LeadData = await this.$store.getters["leads/getById"](this.idLead);
      this.isLoading = false;
    },

    // partenerModalToggle() {
    //   var formModal = window.bootstrap.Modal.getInstance(
    //     document.getElementById("CrmParteneriForm")
    //   );
    //   formModal.toggle();
    // },
  },
};
</script>
