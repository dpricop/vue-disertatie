<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="ConfigMotiveForm"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit reason</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="new-item" class="col-form-label">Reason:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Motiv"
              />
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="reasonLeadField"
                :checked="dataSource.EMotivLead"
                @click="EMotivLeadToggle"
              />
              <label
                class="form-check-label"
                for="reasonLeadField"
                @click.prevent="EMotivLeadToggle"
                >Use status for leads</label
              >
            </div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                id="reasonOpportunitiesField"
                :checked="dataSource.EMotivOpportunity"
                @click="EMotivOpportunityToggle"
              />
              <label
                class="form-check-label"
                for="reasonOpportunitiesField"
                @click.prevent="EMotivOpportunityToggle"
                >Use status for opportunities</label
              >
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
  name: "ConfigMotiveForm",
  props: {
    propsData: {
      IdMotiv: Number,
      Motiv: String,
      EMotivLead: Boolean,
      EMotivOpportunity: Boolean,
    },
  },
  data: function(e) {
    return {
      dataSource: this.propsData,
    };
  },
  methods: {
    EMotivOpportunityToggle() {
      this.dataSource.EMotivOpportunity = !this.dataSource.EMotivOpportunity;
    },
    EMotivLeadToggle() {
      this.dataSource.EMotivLead = !this.dataSource.EMotivLead;
    },

    editedItem() {
      this.$emit("editedItem", this.dataSource);
    },
  },
};
</script>
