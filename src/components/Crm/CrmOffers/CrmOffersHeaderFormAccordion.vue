<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Offer info
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <form class="row">
            <div class="col-12">
              <label for="PartnerDropDown" class="col-form-label"
                >Partner:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="PartnerDropDown"
                  v-model="dataSource.PartenerId"
                >
                  <option
                    v-for="item of PartnerDropDown.dataSource"
                    :key="item.IdPartener"
                    :value="item.IdPartener"
                    >{{ item.NumePartener }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="PartnerDropDown.isLoading == true"
                >
                  <span class="input-group-text" id="indicator">
                    <span
                      class="spinner-border spinner-border-sm spinner-default"
                      role="status"
                    ></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-6">
              <label class="col-form-label">Date of issue:</label>
              <input
                type="datetime-local"
                class="form-control"
                v-model="dataSource.DataEmiterii"
              />
            </div>
            <div class="col-6">
              <label class="col-form-label">Expiration date:</label>
              <input
                type="datetime-local"
                class="form-control"
                v-model="dataSource.DataExpirarii"
              />
            </div>

            <div class="col-12 col-md-4 mt-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="OfertaAcceptata"
                  :checked="dataSource.OfertaAcceptata"
                  @click="OfertaAcceptataToggle"
                />
                <label
                  class="form-check-label"
                  for="OfertaAcceptata"
                  @click.prevent="OfertaAcceptataToggle"
                  >Is accepted ?</label
                >
              </div>
            </div>
            <div class="col-12 col-md-4 mt-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="OfertaRespinsa"
                  :checked="dataSource.OfertaRespinsa"
                  @click="OfertaRespinsaToggle"
                />
                <label
                  class="form-check-label"
                  for="OfertaRespinsa"
                  @click.prevent="OfertaRespinsaToggle"
                  >Is rejected ?</label
                >
              </div>
            </div>

            <div class="col-12 col-md-8">
              <label class="col-form-label" for="OpportunitiesDropDown"
                >Opportunity:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="OpportunitiesDropDown"
                  v-model="dataSource.OpportunityId"
                >
                  <option
                    v-for="item of OpportunitiesDropDown.dataSource"
                    :key="item.IdOpportunity"
                    :value="item.IdOpportunity"
                    >{{ item.OppDescriere }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="PartnerDropDown.isLoading == true"
                >
                  <span class="input-group-text" id="indicator">
                    <span
                      class="spinner-border spinner-border-sm spinner-default"
                      role="status"
                    ></span>
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CrmOffersHeaderFormAccordion",
  props: {
    propsData: {},
  },
  data: function(e) {
    return {
      PartnerDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      OpportunitiesDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadPartnerDropDown();
    this.loadOpportunitiesDropDown();
  },
  methods: {
    OfertaAcceptataToggle() {
      this.dataSource.OfertaAcceptata = !this.dataSource.OfertaAcceptata;
    },

    OfertaRespinsaToggle() {
      this.dataSource.OfertaRespinsa = !this.dataSource.OfertaRespinsa;
    },

    async loadPartnerDropDown() {
      await this.$store.dispatch("partners/getDataSource");
      this.PartnerDropDown.dataSource = await this.$store.getters[
        "partners/getAll"
      ];
      this.PartnerDropDown.isLoading = false;
    },

    async loadOpportunitiesDropDown() {
      await this.$store.dispatch("opportunities/getDataSource");
      this.OpportunitiesDropDown.dataSource = await this.$store.getters[
        "opportunities/getAll"
      ];
      this.OpportunitiesDropDown.isLoading = false;
    },
  },
};
</script>
