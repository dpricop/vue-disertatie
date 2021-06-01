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
      <div class="col-auto col-md-6 col-lg-4">
        <table class="table table-bordered bg-white mb-0">
          <thead>
            <tr>
              <th colspan="4" class="text-end">
                <button
                  class="btn btn-sm btn-success px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#ConfigLocalitatiForm"
                  @Click="addItemBtn"
                >
                  <i class="cil-plus"></i>
                  <span>Add</span>
                </button>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>City</th>
              <th>County</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of dataSource" :key="item.IdLocalitate">
              <td>{{ index + 1 }}</td>
              <td>{{ item.NumeLocalitate }}</td>
              <td>{{ item.NumeJudet }}</td>
              <td>
                <a
                  class="text-decoration-none text-warning m-2"
                  @click.prevent="editItemBtn(item)"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#ConfigLocalitatiForm"
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
    <config-localitati-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    />
  </template>
</template>
<script>
import ConfigLocalitatiForm from "./ConfigLocalitatiForm.vue";

export default {
  name: "ConfigLocalitatiTable",
  components: {
    ConfigLocalitatiForm,
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
        .get("http://localhost:8080/ConfigLocalitati/get")
        .then((response) => {
          this.dataSource = response.data;
          this.loaded();
        })
        .catch((error) => console.log(error));
    },
    addItemBtn() {
      this.editItemData.isEditing = false;
      this.editItemData.IdLocalitate = undefined;
      this.editItemData.NumeLocalitate = undefined;
      this.editItemData.JudetId = undefined;
      this.editItemData.NumeJudet = undefined;
    },
    editItemBtn(item) {
      this.editItemData.isEditing = true;
      this.editItemData.IdLocalitate = item.IdLocalitate;
      this.editItemData.NumeLocalitate = item.NumeLocalitate;
      this.editItemData.JudetId = item.JudetId;
      this.editItemData.NumeJudet = item.NumeJudet;
    },
    formModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("ConfigLocalitatiForm")
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
        .post("http://localhost:8080/ConfigLocalitati/Create", data)
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
      data.set("id", params.IdLocalitate);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/ConfigLocalitati/Edit", data)
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
        .delete(
          "http://localhost:8080/ConfigLocalitati/Delete/" + item.IdLocalitate
        )
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            this.dataSource.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
