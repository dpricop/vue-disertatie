<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <table class="table table-bordered bg-white mb-0">
      <thead>
        <tr>
          <th colspan="12" class="text-end">
            <button
              class="btn btn-sm btn-success px-3"
              data-bs-toggle="modal"
              data-bs-target="#CrmParteneriForm"
              @Click="addItemBtn"
            >
              <i class="cil-plus"></i>
              <span>Add</span>
            </button>
          </th>
        </tr>
        <tr>
          <th>#</th>
          <th>
            Opportunity description
          </th>
          <th>Hot or not</th>
          <th>Partner</th>
          <th>Partner Contact</th>
          <th>Status</th>
          <th>Phase</th>
          <th>Reason</th>
          <th>Concurrency</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of dataSource" :key="item.IdOpportunity">
          <td>{{ index + 1 }}</td>
          <td>{{ item.OppDescriere }}</td>
          <td class="text-center">
            <input
              class="form-check-input"
              type="checkbox"
              disabled
              :checked="item.HotOrNot"
            />
          </td>
          <td>
            <router-link
              class="text-decoration-none"
              :to="{
                name: 'partner',
                params: { id: item.PartenerId },
              }"
              target="_blank"
            >
              {{ item.NumePartener }}
            </router-link>
          </td>
          <td>
            {{ item.PartenerContact }}
          </td>
          <td>{{ item.StatusNume }}</td>
          <td>{{ item.FazaNume }}</td>
          <td>{{ item.Motiv }}</td>
          <td>{{ item.Competitori }}</td>
          <td>
            <a
              class="text-decoration-none text-success m-2"
              href="#"
              @click.prevent=""
            >
              <i class="cil-chevron-circle-right-alt"></i>
            </a>
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
  name: "CrmOpportunitiesTable",
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
      await this.$store.dispatch("opportunities/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["opportunities/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters[
            "opportunities/" + this.vuexGetter
          ];
        } else {
          this.dataSource = this.$store.getters[
            "opportunities/" + this.vuexGetter
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
        .post("http://localhost:8080/CrmOpportunity/Create", data)
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
      data.set("id", params.IdOpportunity);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/CrmOpportunity/Edit", data)
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
          "http://localhost:8080/CrmOpportunity/Delete/" + item.IdOpportunity
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
