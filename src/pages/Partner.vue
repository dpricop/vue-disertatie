<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <div class="col-12 d-flex align-items-center">
      <router-link
        class="text-decoration-none d-inline-block m-2"
        :to="{
          name: 'partners',
        }"
      >
        <i class="cil-chevron-circle-left-alt"></i>
        <span>All parteners</span>
      </router-link>
      <h1 class="my-4 px-4 d-inline-block">
        {{ this.partnerData.NumePartener }}
      </h1>
    </div>

    <div class="col-12 pt-3 bg-light">
      <crm-parteneri-form-accordion
        v-bind:propsData="this.partnerData"
        :key="this.partnerData"
        @editedItem="this.partnerData"
      />
    </div>

    <div class="col-12 bg-light">
      <crm-partener-contacte-table
        vuexGetter="getByPartenerId"
        :vuexParam="this.partnerData.IdPartener"
      />
    </div>
  </template>
</template>

<script>
import Loading from "@/components/Loading";
import CrmParteneriFormAccordion from "@/components/Crm/CrmParteneri/CrmParteneriFormAccordion.vue";
import CrmPartenerContacteTable from "@/components/Crm/CrmPartenerContacte/CrmParteneriContacteTable";

export default {
  name: "Partner",
  components: {
    Loading,
    CrmParteneriFormAccordion,
    CrmPartenerContacteTable,
  },
  data: function(e) {
    return {
      isLoading: true,
      idPartener: 0,
      partnerData: {},
      partnerContactsData: [],
    };
  },
  created() {
    this.idPartener = this.$route.params["id"];
  },
  mounted() {
    this.reloadStore();
  },
  methods: {
    async reloadStore() {
      await this.$store.dispatch("partners/getDataSource");
      this.getData();
    },
    getData() {
      this.partnerData = this.$store.getters["partners/getById"](
        this.idPartener
      );
      this.partnerContactsData = this.$store.getters["partners/getAll"];
      this.isLoading = false;
    },

    partenerModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("CrmParteneriForm")
      );
      formModal.toggle();
    },
  },
  // watch: {
  //   $route(toRoute, fromRoute) {
  //     console.log(toRoute);
  //     console.log(fromRoute);
  //   },
  // },
};
</script>
