<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="ConfigLocalitatiForm"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            {{
              "isEditing" in dataSource && dataSource.isEditing == false
                ? "Create"
                : "Edit"
            }}
            city
          </h5>
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
              <label for="new-item" class="col-form-label">City name:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.NumeLocalitate"
              />
            </div>
            <div class="form-group">
              <label for="CountyDropDown">County:</label>
              <div class="input-group">
                <select
                  class="form-control"
                  id="CountyDropDown"
                  v-model="dataSource.JudetId"
                >
                  <option
                    :value="item.IdJudet"
                    v-for="item of judetDropDown.dataSource"
                    :key="item.IdJudet"
                    >{{ item.NumeJudet }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="judetDropDown.isLoading == true"
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
  name: "ConfigLocalitatiForm",
  props: {
    propsData: {
      isEditing: Boolean,
      IdLocalitate: Number,
      NumeLocalitate: String,
      JudetId: Number,
      NumeJudet: String,
    },
  },
  data: function(e) {
    return {
      judetDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadJudetDropDown();
  },
  methods: {
    loadJudetDropDown() {
      if (this.judetDropDown.dataSource[0] == undefined) {
        this.judetDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/ConfigJudete/DropDown")
          .then((response) => {
            this.judetDropDown.dataSource = response.data;
            this.judetDropDown.isLoading = false;
          })
          .catch((error) => console.log(error));
      }
    },
    editedItem() {
      this.$emit("editedItem", this.dataSource);
    },
  },
};
</script>
