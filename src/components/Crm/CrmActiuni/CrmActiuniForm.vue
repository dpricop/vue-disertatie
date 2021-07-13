<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="CrmActiuneForm"
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
            {{
              "isLead" in dataSource && dataSource.isLead == "true"
                ? "lead"
                : ""
            }}
            {{
              "isOpportunity" in dataSource &&
              dataSource.isOpportunity == "true"
                ? "opportunity"
                : ""
            }}
            action
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
              <label class="col-form-label">Action description:</label>
              <textarea class="form-control" v-model="dataSource.Descriere" />
            </div>

            <div class="col-12 col-sm-6">
              <label for="ActionTypesDropDown" class="col-form-label"
                >Action type:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="ActionTypesDropDown"
                  v-model="dataSource.TipActiuneId"
                >
                  <option
                    v-for="item of ActionTypesDropDown.dataSource"
                    :key="item.IdTipActiune"
                    :value="item.IdTipActiune"
                    >{{ item.TipActiune }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="ActionTypesDropDown.isLoading == true"
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
            <div class="col-12 col-sm-6">
              <template v-if="isLead == true">
                <label for="LeadDropDown" class="col-form-label">Lead:</label>
                <div class="input-group">
                  <select
                    class="form-control"
                    id="LeadDropDown"
                    v-model="dataSource.LeadId"
                  >
                    <option
                      v-for="item of LeadDropDown.dataSource"
                      :key="item.IdLead"
                      :value="item.IdLead"
                      >{{ item.LeadNume }}</option
                    >
                  </select>
                  <div
                    class="input-group-prepend d-flex"
                    v-if="LeadDropDown.isLoading == true"
                  >
                    <span class="input-group-text">
                      <span
                        class="spinner-border spinner-border-sm spinner-default"
                        role="status"
                      ></span>
                    </span>
                  </div>
                </div>
              </template>

              <template v-if="isOpportunity == true">
                <label for="OpportunityDropDown" class="col-form-label"
                  >Opportunity:</label
                >
                <div class="input-group">
                  <select
                    class="form-control"
                    id="OpportunityDropDown"
                    v-model="dataSource.OpportunityId"
                  >
                    <option
                      v-for="item of OpportunityDropDown.dataSource"
                      :key="item.IdOpportunity"
                      :value="item.IdOpportunity"
                      >{{ item.OppDescriere }}</option
                    >
                  </select>
                  <div
                    class="input-group-prepend d-flex"
                    v-if="OpportunityDropDown.isLoading == true"
                  >
                    <span class="input-group-text">
                      <span
                        class="spinner-border spinner-border-sm spinner-default"
                        role="status"
                      ></span>
                    </span>
                  </div>
                </div>
              </template>
            </div>

            <div class="col-6">
              <label class="col-form-label">Date start:</label>
              <input
                type="datetime-local"
                class="form-control"
                v-model="dataSource.DataInceput"
              />
            </div>
            <div class="col-6">
              <label class="col-form-label">Date stop:</label>
              <input
                type="datetime-local"
                class="form-control"
                v-model="dataSource.DataSfarsit"
              />
            </div>
            <div class="col-12 mt-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="EFinalizataField"
                  :checked="dataSource.EFinalizata"
                  @click="EFinalizataToggle"
                />
                <label
                  class="form-check-label"
                  for="EFinalizataField"
                  @click.prevent="EFinalizataToggle"
                  >Is finished ?</label
                >
              </div>
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
  name: "CrmActiuniForm",
  props: {
    propsData: {
      isEditing: Boolean,
    },
  },
  data: function(e) {
    return {
      ActionTypesDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      LeadDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      OpportunityDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadActionTypesDropDown();
    this.loadLeadDropDown();
    this.loadOpportunityDropDown();
  },
  methods: {
    EFinalizataToggle() {
      this.dataSource.EFinalizata = !this.dataSource.EFinalizata;
    },

    async loadActionTypesDropDown() {
      await this.$store.dispatch("actionTypes/getDataSource");
      this.ActionTypesDropDown.dataSource = await this.$store.getters[
        "actionTypes/getAll"
      ];
      this.ActionTypesDropDown.isLoading = false;
    },

    async loadLeadDropDown() {
      await this.$store.dispatch("leads/getDataSource");
      this.LeadDropDown.dataSource = await this.$store.getters["leads/getAll"];
      this.LeadDropDown.isLoading = false;
    },

    async loadOpportunityDropDown() {
      await this.$store.dispatch("opportunities/getDataSource");
      this.OpportunityDropDown.dataSource = await this.$store.getters[
        "opportunities/getAll"
      ];
      this.OpportunityDropDown.isLoading = false;
    },

    editedItem() {
      this.$emit("editedItem", this.dataSource);
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
