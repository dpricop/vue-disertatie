<template>
  <h1 class="my-3">Home</h1>
  <div class="row mx-0 bg-light pb-4">
    <div class="col-12 col-md-4 col-xl-3">
      <h3 class="py-3">Tasks</h3>
      <lista-notite css-styles="col-auto" />
    </div>

    <div class="col-12  col-md-8 col-xl-9">
      <h3 class="py-3">Actions</h3>

      <div class="table-responsive">
        <crm-actiuni-table
          vuex-getter="getUnfinished"
          :is-lead="true"
          :is-opportunity="true"
          css-styles="col-auto"
        />
      </div>
    </div>
  </div>

  <!-- <router-link
          class="btn btn-sm btn-success text-light"
          tag="button"
          :to="{
            name: 'AboutView',
            params: { universitatea: 'uvt', facultatea: 'feaa' },
            query: { specializarea: 'contabilitate', lang: 'ro' },
            hash: '#fiseDiscipline',
          }"
        >
          Complex URL Address
        </router-link> -->
</template>
<script>
import ListaNotite from "@/components/Crm/CrmListaNotite/ListaNotite";
import CrmActiuniTable from "@/components/Crm/CrmActiuni/CrmActiuniTable";

export default {
  name: "Home",
  components: { ListaNotite, CrmActiuniTable },
};
</script>
