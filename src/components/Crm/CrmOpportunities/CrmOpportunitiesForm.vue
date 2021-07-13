<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="CrmOpportunitiesForm"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{
              "isEditing" in dataSource && dataSource.isEditing == false
                ? "Create"
                : "Edit"
            }}
            opportunity
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row">
            <div class="col-12">
              <label class="col-form-label">Opportunity desc:</label>
              <textarea
                type="text"
                class="form-control"
                v-model="dataSource.OppDescriere"
              />
            </div>

            <div class="col-6">
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
              <label for="PartnerContactDropDown" class="col-form-label"
                >Partner contact:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="PartnerContactDropDown"
                  v-model="dataSource.PartenerContactId"
                >
                  <option
                    v-for="item of PartnerContactDropDown.dataSource"
                    :key="item.IdPartenerContact"
                    :value="item.IdPartenerContact"
                    >{{ item.NumeContact }} {{ item.PrenumeContact }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="PartnerContactDropDown.isLoading == true"
                >
                  <span class="input-group-text">
                    <span
                      class="spinner-border spinner-border-sm spinner-default"
                      role="status"
                    ></span>
                  </span>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <label for="StatusDropDown" class="col-form-label">Status:</label>
              <div class="input-group">
                <select
                  class="form-control"
                  id="StatusDropDown"
                  v-model="dataSource.StatusId"
                >
                  <option
                    v-for="item of StatusDropDown.dataSource"
                    :key="item.IdOpportunityStatus"
                    :value="item.IdOpportunityStatus"
                    >{{ item.StatusNume }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="StatusDropDown.isLoading == true"
                >
                  <span class="input-group-text">
                    <span
                      class="spinner-border spinner-border-sm spinner-default"
                      role="status"
                    ></span>
                  </span>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <label for="PhaseDropDown" class="col-form-label">Phase:</label>
              <div class="input-group">
                <select
                  class="form-control"
                  id="PhaseDropDown"
                  v-model="dataSource.FazaId"
                >
                  <option
                    v-for="item of PhaseDropDown.dataSource"
                    :key="item.IdOpportunityFaza"
                    :value="item.IdOpportunityFaza"
                    >{{ item.FazaNume }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="PhaseDropDown.isLoading == true"
                >
                  <span class="input-group-text">
                    <span
                      class="spinner-border spinner-border-sm spinner-default"
                      role="status"
                    ></span>
                  </span>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-4">
              <label for="CurrencyDropDown" class="col-form-label"
                >Reason:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="CurrencyDropDown"
                  v-model="dataSource.MotivId"
                >
                  <option
                    v-for="item of MotiveDropDown.dataSource"
                    :key="item.IdMotiv"
                    :value="item.IdMotiv"
                    >{{ item.Motiv }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="MotiveDropDown.isLoading == true"
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

            <div class="col-12 col-md-4">
              <label for="new-item" class="col-form-label">Probability:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">%</span>
                </div>
                <input
                  type="number"
                  class="form-control"
                  v-model="dataSource.Probabilitatea"
                />
              </div>
            </div>

            <div class="col-12 col-md-4">
              <label for="new-item" class="col-form-label">Sum:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Suma"
              />
            </div>

            <div class="col-12 col-md-4 d-flex align-items-end pb-1">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="HotOrNot"
                  :checked="dataSource.HotOrNot"
                  @click="HotOrNotToggle"
                />
                <label
                  class="form-check-label"
                  for="HotOrNot"
                  @click.prevent="HotOrNotToggle"
                  >is hot opportunity ?</label
                >
              </div>
            </div>

            <div class="col-12">
              <label for="new-item" class="col-form-label">Concurrency:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Competitori"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-danger"
            data-bs-dismiss="modal"
          >
            <i class="cil-x-circle"></i>
            <span class="mx-2">Cancel</span>
          </button>
          <button type="button" class="btn btn-success" @click="editedItem">
            <i class="cil-save"></i>
            <span class="mx-2">Save</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CrmOpportunitiesForm",
  props: {
    propsData: {
      isEditing: Boolean,
      IdOpportunity: Number,
      OppDescriere: String,
      Probabilitatea: Number,
      Suma: Number,
      HotOrNot: Boolean,
      Competitori: String,
      PartenerId: Number,
      PartenerContactId: Number,
      StatusId: Number,
      FazaId: Number,
      MotivId: Number,
    },
  },
  data: function(e) {
    return {
      PartnerDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      PartnerContactDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      StatusDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      PhaseDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      MotiveDropDown: {
        isLoading: false,
        dataSource: Array,
      },

      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadPartnerDropDown();
    this.loadMotiveDropDown();
    this.loadPartnerContactDropDown();
    this.loadStatusDropDown();
    this.loadPhaseDropDown();
  },
  methods: {
    HotOrNotToggle() {
      this.dataSource.HotOrNot = !this.dataSource.HotOrNot;
    },

    async loadPartnerDropDown() {
      await this.$store.dispatch("partners/getDataSource");
      this.PartnerDropDown.dataSource = await this.$store.getters[
        "partners/getAll"
      ];
      this.PartnerDropDown.isLoading = false;
    },

    async loadPartnerContactDropDown() {
      await this.$store.dispatch("partnercontacts/getDataSource");
      this.PartnerContactDropDown.dataSource = await this.$store.getters[
        "partnercontacts/getAll"
      ];
      this.PartnerContactDropDown.isLoading = false;
    },

    async loadStatusDropDown() {
      await this.$store.dispatch("opportunityStatus/getDataSource");
      this.StatusDropDown.dataSource = await this.$store.getters[
        "opportunityStatus/getAll"
      ];
      this.StatusDropDown.isLoading = false;
    },
    async loadPhaseDropDown() {
      await this.$store.dispatch("opportunityPhase/getDataSource");
      this.PhaseDropDown.dataSource = await this.$store.getters[
        "opportunityPhase/getAll"
      ];
      this.PhaseDropDown.isLoading = false;
    },

    async loadMotiveDropDown() {
      await this.$store.dispatch("reason/getDataSource");
      this.MotiveDropDown.dataSource = await this.$store.getters[
        "reason/getOpportunities"
      ];
      this.MotiveDropDown.isLoading = false;
    },

    editedItem() {
      this.$emit("editedItem", this.dataSource);
    },
  },
};
</script>
