<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="CrmOpportunityFazaForm"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Edit opportunity phase</h5>
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
              <label for="new-item" class="col-form-label">Phase:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.FazaNume"
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
  name: "CrmOpportunityFazaForm",
  props: {
    propsData: {
      IdOpportunityFaza: Number,
      FazaNume: String,
    },
  },
  data: function(e) {
    return {
      dataSource: this.propsData,
    };
  },
  methods: {
    editedItem() {
      this.$emit("editedItem", this.dataSource);
    },
  },
};
</script>
