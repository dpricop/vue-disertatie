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
      <div class="col-auto bg-light py-3">
        <table class="table table-bordered bg-white mb-0">
          <thead>
            <tr>
              <th colspan="12" class="text-end">
                <button
                  class="btn btn-sm btn-success px-3"
                  data-bs-toggle="modal"
                  data-bs-target="#CrmParteneriContacteForm"
                  @Click="addItemBtn"
                >
                  <i class="cil-plus"></i>
                  <span>Add</span>
                </button>
              </th>
            </tr>
            <tr>
              <th>#</th>
              <th>Partner name</th>
              <th>Contact first name</th>
              <th>Contact last name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Position</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) of dataSource"
              :key="item.IdPartenerContact"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.NumePartener }}</td>
              <td>{{ item.NumeContact }}</td>
              <td>{{ item.PrenumeContact }}</td>
              <td>{{ item.Telefon }}</td>
              <td>{{ item.Email }}</td>
              <td>{{ item.Functia }}</td>
              <td>{{ item.Note }}</td>
              <td>
                <a
                  class="text-decoration-none text-warning m-2"
                  @click.prevent="editItemBtn(item)"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#CrmParteneriContacteForm"
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
    <crm-parteneri-contacte-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    />
  </template>
</template>
<script>
import CrmParteneriContacteForm from "./CrmParteneriContacteForm";

export default {
  name: "CrmParteneriContacteTable",
  components: {
    CrmParteneriContacteForm,
  },
  props: {
    vuexGetter: String,
    vuexParam: Number,
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
      await this.$store.dispatch("partnercontacts/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["partnercontacts/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters[
            "partnercontacts/" + this.vuexGetter
          ];
        } else {
          this.dataSource = this.$store.getters[
            "partnercontacts/" + this.vuexGetter
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
      this.editItemData.IdPartenerContact = undefined;
      this.editItemData.PartenerId = undefined;
      this.editItemData.NumePartener = undefined;
      this.editItemData.NumeContact = undefined;
      this.editItemData.PrenumeContact = undefined;
      this.editItemData.Telefon = undefined;
      this.editItemData.Email = undefined;
      this.editItemData.Functia = undefined;
      this.editItemData.Note = undefined;
    },
    editItemBtn(item) {
      this.editItemData.isEditing = true;
      this.editItemData.IdPartenerContact = item.IdPartenerContact;
      this.editItemData.PartenerId = item.PartenerId;
      this.editItemData.NumePartener = item.NumeContact;
      this.editItemData.NumeContact = item.NumeContact;
      this.editItemData.PrenumeContact = item.PrenumeContact;
      this.editItemData.Telefon = item.Telefon;
      this.editItemData.Email = item.Email;
      this.editItemData.Functia = item.Functia;
      this.editItemData.Note = item.Note;
    },
    formModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("CrmParteneriContacteForm")
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
        .post("http://localhost:8080/CrmPartenerContacte/Create", data)
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
      data.set("id", params.IdPartenerContact);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/CrmPartenerContacte/Edit", data)
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
          "http://localhost:8080/CrmPartenerContacte/Delete/" +
            item.IdPartenerContact
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
