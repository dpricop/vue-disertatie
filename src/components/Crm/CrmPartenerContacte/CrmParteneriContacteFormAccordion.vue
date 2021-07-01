<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="CrmParteneriContacteForm"
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
            partner contact
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
            <div class="col-7">
              <label for="UmDropDown" class="col-form-label">Partner:</label>
              <div class="input-group">
                <select
                  class="form-control"
                  id="UmDropDown"
                  v-model="dataSource.PartenerId"
                >
                  <option
                    v-for="item of PartnersDropDown.dataSource"
                    :key="item.IdPartener"
                    :value="item.IdPartener"
                    >{{ item.NumePartener }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="PartnersDropDown.isLoading == true"
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
            <div class="col-5">
              <label class="col-form-label">First name:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.NumeContact"
              />
            </div>
            <div class="col-5">
              <label class="col-form-label">Last name:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.PrenumeContact"
              />
            </div>
            <div class="col-7">
              <label class="col-form-label">Position:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Functia"
              />
            </div>

            <div class="col-12 col-sm-6">
              <label class="col-form-label">Phone:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Telefon"
              />
            </div>
            <div class="col-12 col-sm-6">
              <label class="col-form-label">Email:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Email"
              />
            </div>

            <div class="col-12">
              <label class="col-form-label">Notes:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Note"
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
  name: "CrmParteneriContacteForm",
  props: {
    propsData: {
      isEditing: Boolean,
      IdPartenerContact: Number,
      PartenerId: Number,
      NumeContact: String,
      PrenumeContact: String,
      Telefon: Number,
      Email: String,
      Functia: String,
      Note: String,
    },
  },
  data: function(e) {
    return {
      PartnersDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadPartnersDropDown();
  },
  methods: {
    loadPartnersDropDown() {
      if (this.PartnersDropDown.dataSource[0] == undefined) {
        this.PartnersDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/CrmParteneri/DropDown")
          .then((response) => {
            this.PartnersDropDown.dataSource = response.data;
            this.PartnersDropDown.isLoading = false;
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
