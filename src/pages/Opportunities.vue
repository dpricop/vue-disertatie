<template>
  <div class="col-12 p-3"><h1>Opportunities</h1></div>
  <div class="col-12 py-3 bg-light">
    <div class="table-responsive">
      <crm-opportunities-table />
    </div>
  </div>
</template>
<script>
import CrmOpportunitiesTable from "../components/Crm/CrmOpportunities/CrmOpportunitiesTable.vue";

export default {
  name: "CrmOpportunities",
  components: {
    CrmOpportunitiesTable,
  },
};
</script>
