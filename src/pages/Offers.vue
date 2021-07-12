<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <div class="col-12 p-3"><h1>Offers</h1></div>

    <div class="col-12 col-md-10 col-lg-8 py-3 bg-light">
      <div class="table-responsive">
        <crm-offers-header-table />
      </div>
    </div>
  </template>
</template>
<script>
import Loading from "@/components/Loading";
import CrmOffersHeaderTable from "../components/Crm/CrmOffers/CrmOffersHeaderTable.vue";

export default {
  name: "offers",
  components: {
    Loading,
    CrmOffersHeaderTable,
  },
};
</script>
