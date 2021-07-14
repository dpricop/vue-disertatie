<template>
  <div class="col-12 d-flex align-items-center">
    <router-link
      class="text-decoration-none d-inline-block m-2"
      :to="{
        name: 'offers',
      }"
    >
      <i class="cil-chevron-circle-left-alt"></i>
      <span>All offers</span>
    </router-link>
    <h1 class="my-4 px-4 d-inline-block">
      offer code {{ this.OfferHeadData.IdOfertaAntent }}
    </h1>
  </div>

  <div class="col-12 py-3 bg-light">
    <crm-offers-header-form-accordion
      v-bind:propsData="this.OfferHeadData"
      :key="this.OfferHeadData"
    />
  </div>
  <div class="col-12 py-3 mt-3 bg-light">
    <div class="table-responsive">
      <crm-offers-details-table
        vuex-getter="getByAntetId"
        :vuex-param="idOffer"
      />
    </div>
  </div>
</template>

<script>
import CrmOffersDetailsTable from "../components/Crm/CrmOffers/CrmOffersDetailsTable.vue";
import CrmOffersHeaderFormAccordion from "../components/Crm/CrmOffers/CrmOffersHeaderFormAccordion.vue";

export default {
  name: "Opportunity",
  components: {
    CrmOffersDetailsTable,
    CrmOffersHeaderFormAccordion,
  },
  data: function(e) {
    return {
      idOffer: this.$route.params["id"],
      OfferHeadData: {},
      partnerContactsData: [],
    };
  },
  created() {},
  mounted() {
    this.reloadStore();
  },
  methods: {
    async reloadStore() {
      await this.$store.dispatch("offers/getDataSource");
      this.OfferHeadData = await this.$store.getters["offers/getById"](
        this.idOffer
      );
    },
  },
};
</script>
