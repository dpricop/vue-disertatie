<template>
  <template v-if="isLoading == true">
    <div class="d-flex justify-content-center">
      <div class="spinner-border spinner-default" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="row">
      <div class="col-auto">
        <table class="table table-bordered bg-white mb-0">
          <thead>
            <tr>
              <th colspan="12" class="text-end">
                <button
                  class="btn btn-sm btn-success px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#CrmArticoleForm"
                  @Click="addItemBtn"
                >
                  <i class="cil-plus"></i>
                  <span>Add</span>
                </button>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Is Inactiv</th>
              <th>Description</th>
              <th>Code</th>
              <th>Net Income</th>
              <th>Listed price</th>
              <th>Retail price</th>
              <th>Group</th>
              <th>Currency</th>
              <th>UM</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of dataSource" :key="item.IdArticol">
              <td>{{ index + 1 }}</td>
              <td class="text-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  disabled
                  :checked="item.IsInactiva"
                />
              </td>
              <td>{{ item.Denumire }}</td>
              <td>{{ item.Cod }}</td>
              <td>{{ item.CodEan }}</td>
              <td>{{ item.Pretlista }}</td>
              <td>{{ item.Pretaman }}</td>

              <td>{{ item.Grupa.Grupa }}</td>
              <td>{{ item.Moneda.Moneda }}</td>
              <td>{{ item.Um.Um }}</td>
              <td>
                <a
                  class="text-decoration-none text-warning m-2"
                  @click.prevent="editItemBtn(item)"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#CrmArticoleForm"
                >
                  <i class="cil-pencil"></i>
                </a>
                <a
                  class="text-decoration-none text-danger m-2"
                  @click.prevent="deleteItem(item, index)"
                  href="#"
                >
                  <i class="cil-trash"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <crm-articole-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    />
  </template>
</template>
<script>
import CrmArticoleForm from "./CrmArticoleForm.vue";

export default {
  name: "CrmArticoleTable",
  components: {
    CrmArticoleForm,
  },
  data: function(e) {
    return {
      isLoading: true,
      newItem: "",
      editItemData: {},
      dataSource: [],
    };
  },
  mounted() {
    this.reload();
  },
  computed: {},
  methods: {
    loaded() {
      this.isLoading = false;
    },
    reload() {
      this.axios
        .get("http://localhost:8080/CrmArticole/get")
        .then((response) => {
          this.dataSource = response.data;
          this.loaded();
        })
        .catch((error) => console.log(error));
    },
    addItemBtn() {
      this.editItemData.isEditing = false;
      this.editItemData.IdArticol = undefined;
      this.editItemData.Denumire = undefined;
      this.editItemData.Cod = undefined;
      this.editItemData.CodEan = undefined;
      this.editItemData.IsInactiva = undefined;
      this.editItemData.Pretlista = undefined;
      this.editItemData.Pretaman = undefined;
      this.editItemData.GrupaId = undefined;
      this.editItemData.MonedaId = undefined;
      this.editItemData.UmId = undefined;
    },
    editItemBtn(item) {
      this.editItemData.isEditing = true;
      this.editItemData.IdArticol = item.IdArticol;
      this.editItemData.Denumire = item.Denumire;
      this.editItemData.Cod = item.Cod;
      this.editItemData.CodEan = item.CodEan;
      this.editItemData.IsInactiva = item.IsInactiva;
      this.editItemData.Pretlista = item.Pretlista;
      this.editItemData.Pretaman = item.Pretaman;
      this.editItemData.GrupaId = item.GrupaId;
      this.editItemData.MonedaId = item.MonedaId;
      this.editItemData.UmId = item.UmId;
    },
    formModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("CrmArticoleForm")
      );
      formModal.toggle();
    },
    editedItem(params) {
      params.isEditing == true ? this.editItem(params) : this.addItem(params);
    },
    addItem(params) {
      const data = new FormData();
      data.append("values", JSON.stringify(params));
      this.axios
        .post("http://localhost:8080/CrmArticole/Create", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reload();
            this.formModalToggle();
          }
        })
        .catch((error) => console.log(error));
    },
    editItem(params) {
      const data = new FormData();
      data.set("id", params.IdArticol);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/CrmArticole/Edit", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reload();
            this.formModalToggle();
          }
        })
        .catch((error) => console.log(error));
    },
    deleteItem(item, index) {
      this.axios
        .delete("http://localhost:8080/CrmArticole/Delete/" + item.IdArticol)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            this.dataSource.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
