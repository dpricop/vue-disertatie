<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="ConfigJudeteForm"
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
            county
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
              <label for="new-item" class="col-form-label">County name:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.NumeJudet"
              />
            </div>
            <div class="form-group">
              <label for="CountryDropDown">Country:</label>
              <div class="input-group">
                <select
                  class="form-control"
                  id="CountryDropDown"
                  v-model="dataSource.TaraId"
                >
                  <option
                    :value="item.IdTara"
                    v-for="item of taraDropDown.dataSource"
                    :key="item.IdTara"
                    >{{ item.NumeTara }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="taraDropDown.isLoading == true"
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
  name: "ConfigJudeteForm",
  props: {
    propsData: {
      isEditing: Boolean,
      IdJudet: Number,
      NumeJudet: String,
      TaraId: Number,
      NumeTara: String,
    },
  },
  data: function(e) {
    return {
      taraDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadTaraDropDown();
  },
  methods: {
    loadTaraDropDown() {
      if (this.taraDropDown.dataSource[0] == undefined) {
        this.taraDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/ConfigTari/DropDown")
          .then((response) => {
            this.taraDropDown.dataSource = response.data;
            this.taraDropDown.isLoading = false;
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
