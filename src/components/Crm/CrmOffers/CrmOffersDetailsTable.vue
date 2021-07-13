<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <table class="table table-bordered bg-white mb-0">
      <thead>
        <tr>
          <th colspan="11" class="text-end">
            <button
              class="btn btn-sm btn-success px-3"
              data-bs-toggle="modal"
              data-bs-target="#CrmParteneriForm"
              @Click="addItemBtn"
            >
              <i class="cil-plus"></i>
              <span>Add article</span>
            </button>
          </th>
        </tr>
        <tr>
          <th>#</th>
          <th>Article</th>
          <th>Quantity</th>
          <th>Unit price</th>
          <th>Total amount</th>
          <th>Currency</th>
          <th>Unit of measure</th>
          <th>Article code</th>
          <th>Article code EAN</th>
          <th>Article group</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of dataSource" :key="item.IdOfertaDetalii">
          <td>{{ index + 1 }}</td>

          <td>{{ item.Articole.Denumire }}</td>
          <td>{{ item.Cantitate }}</td>
          <td>{{ item.PretUnitar }}</td>
          <td>{{ item.PretTotalNet }}</td>
          <td>{{ item.Articole.Moneda.Moneda }}</td>
          <td>{{ item.Articole.Um.Um }}</td>
          <td>{{ item.Articole.Cod }}</td>
          <td>{{ item.Articole.CodEan }}</td>
          <td>{{ item.Articole.Grupa.Grupa }}</td>
          <td>
            <a
              class="text-decoration-none text-warning m-2"
              @click.prevent="editItemBtn(item)"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#CrmParteneriForm"
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

    <!-- <crm-parteneri-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    /> -->
  </template>
</template>
<script>
import Loading from "@/components/Loading";
// import CrmParteneriForm from "./CrmParteneriForm";

export default {
  name: "CrmOffersDetailsTable",
  components: {
    // CrmParteneriForm,
    Loading,
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
      await this.$store.dispatch("offersDetails/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["offersDetails/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters[
            "offersDetails/" + this.vuexGetter
          ];
        } else {
          this.dataSource = this.$store.getters[
            "offersDetails/" + this.vuexGetter
          ](this.vuexParam);
        }
      }
      if (!Array.isArray(this.dataSource)) {
        this.dataSource = [this.dataSource];
      }
      this.isLoading = false;
    },

    addItemBtn() {
      this.editItemData.isEditing = false;
    },
    editItemBtn(item) {
      this.editItemData.isEditing = true;
    },
    formModalToggle() {
      // var formModal = window.bootstrap.Modal.getInstance(
      //   document.getElementById("CrmParteneriForm")
      // );
      // formModal.toggle();

      return true;
    },
    editedItem(params) {
      params.isEditing == true ? this.editItem(params) : this.addItem(params);
    },
    addItem(params) {
      const data = new FormData();
      data.append("values", JSON.stringify(params));
      this.axios
        .post("http://localhost:8080/CrmOferteAntent/Create", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reloadStore();
            this.formModalToggle();
          }
        })
        .catch((error) => console.log(error));
    },
    editItem(params) {
      const data = new FormData();
      data.set("id", params.IdOfertaAntent);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/CrmOferteAntent/Edit", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reloadStore();
            this.formModalToggle();
          }
        })
        .catch((error) => console.log(error));
    },
    deleteItem(item, index) {
      this.axios
        .delete(
          "http://localhost:8080/CrmOferteAntent/Delete/" + item.IdOfertaAntent
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
