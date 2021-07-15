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
              data-bs-target="#CrmOpportunitiesForm"
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
          <td>
            <router-link
              class="text-decoration-none"
              :to="{
                name: 'opportunity',
                params: { id: item.IdOpportunity },
              }"
            >
              {{ item.OppDescriere }}
            </router-link>
          </td>
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
            <router-link
              class="text-decoration-none text-success m-2"
              :to="{
                name: 'opportunity',
                params: { id: item.IdOpportunity },
              }"
            >
              <i class="cil-chevron-circle-right-alt"></i>
            </router-link>

            <a
              class="text-decoration-none text-warning m-2"
              @click.prevent="editItemBtn(item)"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#CrmOpportunitiesForm"
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
    <crm-opportunities-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    />
  </template>
</template>
<script>
import Loading from "@/components/Loading";
import CrmOpportunitiesForm from "./CrmOpportunitiesForm.vue";

export default {
  name: "CrmOpportunitiesTable",
  components: {
    CrmOpportunitiesForm,
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
      this.editItemData.IdOpportunity = undefined;
      this.editItemData.OppDescriere = undefined;
      this.editItemData.Competitori = undefined;
      this.editItemData.FazaId = undefined;
      this.editItemData.HotOrNot = undefined;
      this.editItemData.MotivId = undefined;
      this.editItemData.PartenerContactId = undefined;
      this.editItemData.PartenerId = undefined;
      this.editItemData.Probabilitatea = undefined;
      this.editItemData.StatusId = undefined;
      this.editItemData.Suma = undefined;
      this.editItemData.InDate = undefined;
      this.editItemData.InUserId = undefined;
      this.editItemData.ModDate = undefined;
      this.editItemData.ModUserId = undefined;
    },
    editItemBtn(item) {
      this.editItemData.isEditing = true;
      this.editItemData.IdOpportunity = item.IdOpportunity;
      this.editItemData.OppDescriere = item.OppDescriere;
      this.editItemData.Competitori = item.Competitori;
      this.editItemData.FazaId = item.FazaId;
      this.editItemData.HotOrNot = item.HotOrNot;
      this.editItemData.MotivId = item.MotivId;
      this.editItemData.PartenerContactId = item.PartenerContactId;
      this.editItemData.PartenerId = item.PartenerId;
      this.editItemData.Probabilitatea = item.Probabilitatea;
      this.editItemData.StatusId = item.StatusId;
      this.editItemData.Suma = item.Suma;
      this.editItemData.InDate = item.InDate;
      this.editItemData.InUserId = item.InUserId;
      this.editItemData.ModDate = item.ModDate;
      this.editItemData.ModUserId = item.ModUserId;
    },
    formModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("CrmOpportunitiesForm")
      );
      formModal.toggle();

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
