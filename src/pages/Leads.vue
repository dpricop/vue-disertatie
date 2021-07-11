<template>
  <div class="col-12 p-3">
    <h1>Leads</h1>
  </div>
  <div class="col-12 bg-light">
    <div class="table-responsive">
      <crm-leads-table />
    </div>
  </div>
</template>
<script>
import CrmLeadsTable from "@/components/Crm/CrmLeads/CrmLeadsTable";
export default {
  name: "Leads",
  components: {
    CrmLeadsTable,
  },
};
</script>
