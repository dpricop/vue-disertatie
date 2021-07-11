<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <div class="row">
      <div class="col-auto col-md-6 col-lg-4">
        <table class="table table-bordered bg-white mb-0">
          <thead>
            <tr>
              <th colspan="2">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder="Add action type"
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
              <th>Action type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of dataSource" :key="item.IdTipActiune">
              <td>{{ index + 1 }}</td>
              <td>{{ item.TipActiune }}</td>
              <td>
                <a
                  class="text-decoration-none text-warning m-2"
                  @click.prevent="editItem(item)"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#crmTipActiuniForm"
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

    <crm-tip-actiuni-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    />
  </template>
</template>

<script>
import Loading from "./../../Loading.vue";
import CrmTipActiuniForm from "./CrmTipActiuniForm.vue";
export default {
  name: "CrmTipActiuniTable",
  components: {
    Loading,
    CrmTipActiuniForm,
  },
  props: {
    vuexGetter: String,
    vuexParam: Number,
    cssStyles: String,
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
    this.reloadStore();
  },
  computed: {},
  methods: {
    async reloadStore() {
      await this.$store.dispatch("actionTypes/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["actionTypes/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters[
            "actionTypes/" + this.vuexGetter
          ];
        } else {
          this.dataSource = this.$store.getters[
            "actionTypes/" + this.vuexGetter
          ](this.vuexParam);
        }
      }
      if (!Array.isArray(this.dataSource)) {
        this.dataSource = [this.dataSource];
      }

      this.isLoading = false;
    },

    addItem() {
      const data = new FormData();
      data.append("values", JSON.stringify({ TipActiune: this.newItem }));
      this.axios
        .post("http://localhost:8080/CrmTipActiuni/Create", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reloadStore();
            this.newItem = null;
          }
        })
        .catch((error) => console.log(error));
    },

    editItem(item) {
      this.editItemData.IdTipActiune = item.IdTipActiune;
      this.editItemData.TipActiune = item.TipActiune;
    },

    editedItem(params) {
      const data = new FormData();
      data.set("id", params.IdTipActiune);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/CrmTipActiuni/Edit", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reloadStore();
            var formModal = window.bootstrap.Modal.getInstance(
              document.getElementById("crmTipActiuniForm")
            );
            formModal.hide();
          }
        })
        .catch((error) => console.log(error));
    },

    deleteItem(item, index) {
      this.axios
        .delete(
          "http://localhost:8080/CrmTipActiuni/Delete/" + item.IdTipActiune
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
