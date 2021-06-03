<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="CrmArticoleForm"
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
            article
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
            <div class="col-12 mb-3">
              <label class="col-form-label">Article description:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Denumire"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="col-form-label">Code:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Cod"
              />
            </div>
            <div class="col-6 mb-3">
              <label class="col-form-label">International code:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.CodEan"
              />
            </div>

            <div class="col-4 mb-3">
              <label for="GroupDropDown" class="col-form-label">Group:</label>
              <div class="input-group">
                <select
                  class="form-control"
                  id="GroupDropDown"
                  v-model="dataSource.GrupaId"
                >
                  <option
                    v-for="item of GroupDropDown.dataSource"
                    :key="item.IdGrupa"
                    :value="item.IdGrupa"
                    >{{ item.Grupa }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="GroupDropDown.isLoading == true"
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
            <div class="col-4 mb-3">
              <label for="CurrencyDropDown" class="col-form-label"
                >Currency:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="CurrencyDropDown"
                  v-model="dataSource.MonedaId"
                >
                  <option
                    v-for="item of CurrencyDropDown.dataSource"
                    :key="item.IdMoneda"
                    :value="item.IdMoneda"
                    >{{ item.Moneda }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="CurrencyDropDown.isLoading == true"
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
            <div class="col-4 mb-3">
              <label for="UmDropDown" class="col-form-label"
                >Unit of measure:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="UmDropDown"
                  v-model="dataSource.UmId"
                >
                  <option
                    v-for="item of UmDropDown.dataSource"
                    :key="item.IdUm"
                    :value="item.IdUm"
                    >{{ item.Um }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="UmDropDown.isLoading == true"
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
              <label for="new-item" class="col-form-label">Listed price:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Pretlista"
              />
            </div>
            <div class="col-6">
              <label for="new-item" class="col-form-label">Retail price:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Pretaman"
              />
            </div>

            <div class="col-12">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="reasonLeadField"
                  :checked="dataSource.IsInactiva"
                  @click="IsInactivaToggle"
                />
                <label
                  class="form-check-label"
                  for="reasonLeadField"
                  @click.prevent="IsInactivaToggle"
                  >Is inactive article</label
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
  name: "CrmArticoleForm",
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
      GroupDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      CurrencyDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      UmDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadGroupDropDown();
    this.loadCurrencyDropDown();
    this.loadUmDropDown();
  },
  methods: {
    IsInactivaToggle() {
      this.dataSource.IsInactiva = !this.dataSource.IsInactiva;
    },
    loadGroupDropDown() {
      if (this.GroupDropDown.dataSource[0] == undefined) {
        this.GroupDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/ConfigGrupe/DropDown")
          .then((response) => {
            this.GroupDropDown.dataSource = response.data;
            this.GroupDropDown.isLoading = false;
          })
          .catch((error) => console.log(error));
      }
    },
    loadCurrencyDropDown() {
      if (this.CurrencyDropDown.dataSource[0] == undefined) {
        this.CurrencyDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/ConfigMonede/DropDown")
          .then((response) => {
            this.CurrencyDropDown.dataSource = response.data;
            this.CurrencyDropDown.isLoading = false;
          })
          .catch((error) => console.log(error));
      }
    },
    loadUmDropDown() {
      if (this.UmDropDown.dataSource[0] == undefined) {
        this.UmDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/ConfigUm/DropDown")
          .then((response) => {
            this.UmDropDown.dataSource = response.data;
            this.UmDropDown.isLoading = false;
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
