<template>
  <h1 class="my-4 px-4">
    Actions
  </h1>
  <crm-actiuni-table css-styles="col-12 py-3" />
</template>

<script>
import CrmActiuniTable from "@/components/Crm/CrmActiuni/CrmActiuniTable";

export default {
  name: "Actions",
  components: { CrmActiuniTable },
};
</script>
