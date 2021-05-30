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
      <div class="col-auto col-md-6">
        <table class="table table-bordered bg-white">
          <thead>
            <tr>
              <th colspan="4">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Add reason"
                  v-model="newItem"
                />
              </th>
              <th>
                <button
                  class="btn btn-sm d-block btn-success px-3"
                  @Click="addItem"
                >
                  <i class="cil-plus"></i>
                  <span>Add</span>
                </button>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Reason</th>
              <th>Lead</th>
              <th>Opportunity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of dataSource" :key="item.IdMotiv">
              <td>{{ index + 1 }}</td>
              <td>{{ item.Motiv }}</td>
              <td class="text-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  disabled
                  :checked="item.EMotivLead"
                />
              </td>
              <td class="text-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  disabled
                  :checked="item.EMotivOpportunity"
                />
              </td>
              <td>
                <a
                  class="text-decoration-none text-warning m-2"
                  @click.prevent="editItem(item)"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#ConfigMotiveForm"
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
      <div class="col-auto col-md-6 col-lg-4">
        <config-motive-form
          v-bind:propsData="editItemData"
          :key="editItemData"
          @editedItem="editedItem"
        />
      </div>
    </div>
  </template>
</template>
<script>
import ConfigMotiveForm from "@/components/Config/ConfigMotive/ConfigMotiveForm";

export default {
  name: "ConfigMotiveTable",
  components: {
    ConfigMotiveForm,
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
        .get("http://localhost:8080/configMotive/get")
        .then((response) => {
          this.dataSource = response.data;
          this.loaded();
        })
        .catch((error) => console.log(error));
    },
    addItem() {
      const data = new FormData();
      data.append(
        "values",
        JSON.stringify({
          Motiv: this.newItem,
          EMotivLead: true,
          EMotivOpportunity: true,
        })
      );
      this.axios
        .post("http://localhost:8080/configMotive/Create", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reload();
            this.newItem = null;
          }
        })
        .catch((error) => console.log(error));
    },
    editItem(item) {
      this.editItemData.IdMotiv = item.IdMotiv;
      this.editItemData.Motiv = item.Motiv;
      this.editItemData.EMotivLead = item.EMotivLead;
      this.editItemData.EMotivOpportunity = item.EMotivOpportunity;
    },
    editedItem(params) {
      const data = new FormData();
      data.set("id", params.IdMotiv);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/configMotive/Edit", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reload();
            var formModal = window.bootstrap.Modal.getInstance(
              document.getElementById("ConfigMotiveForm")
            );
            formModal.hide();
          }
        })
        .catch((error) => console.log(error));
    },
    deleteItem(item, index) {
      this.axios
        .delete("http://localhost:8080/configMotive/Delete/" + item.IdMotiv)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            this.dataSource.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
