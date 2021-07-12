<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <div class="bg-light" :class="cssStyles">
      <table class="table table-bordered bg-white mb-0">
        <thead>
          <tr>
            <td colspan="8" class="text-end">
              <button
                class="btn btn-sm btn-success px-3"
                data-bs-toggle="modal"
                data-bs-target="#CrmActiuneForm"
              >
                <i class="cil-plus"></i><span>Add action</span>
              </button>
            </td>
          </tr>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Description</th>
            <th>Date Start</th>
            <th>Date Stop</th>
            <th>Finished</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of dataSource" :key="item.IdActiune">
            <td>{{ index + 1 }}</td>
            <td>{{ item.TipActiune }}</td>
            <td>{{ item.Descriere }}</td>
            <td>{{ $filters.dateTimeFormat(item.DataInceput) }}</td>
            <td>{{ $filters.dateTimeFormat(item.DataSfarsit) }}</td>
            <td class="text-center">
              <i
                v-if="item.EFinalizata"
                class="cil-check-circle text-success"
              ></i>
              <i v-else class="cil-x-circle text-danger"></i>
            </td>
            <td>
              <router-link
                v-if="item.LeadId != null"
                class="text-decoration-none"
                :to="{
                  name: 'lead',
                  params: { id: item.LeadId },
                }"
              >
                Show lead
              </router-link>
              <router-link
                v-if="item.OpportunityId != null"
                class="text-decoration-none"
                :to="{
                  name: 'opportunity',
                  params: { id: item.OpportunityId },
                }"
              >
                Show opportunity
              </router-link>
            </td>
            <td>
              <a
                class="text-decoration-none text-warning m-2"
                @click.prevent="editItemBtn(item)"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#CrmActiuneForm"
                @Click="addItemBtn"
              >
                <i class="cil-pencil"></i>
              </a>

              <a
                class="text-decoration-none text-success m-2"
                @click.prevent="toggleAction(item, index)"
                href="#"
              >
                <template v-if="item.EFinalizata">
                  <i class="cil-action-undo text-warning"></i>
                  <span class="text-warning"> Unfinish</span>
                </template>
                <template v-else>
                  <i class="cil-check-alt"></i>
                  Finish
                </template>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <crm-actiuni-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      :is-lead="true"
      :is-opportunity="false"
      @editedItem="editedItem"
    />
  </template>
</template>

<script>
import Loading from "./../../Loading.vue";
import CrmActiuniForm from "@/components/Crm/CrmActiuni/CrmActiuniForm";

export default {
  name: "CrmActiuniTable",
  components: {
    Loading,
    CrmActiuniForm,
  },
  props: {
    vuexGetter: String,
    vuexParam: String,
    cssStyles: String,
    isLead: Boolean,
    isOpportunity: Boolean,
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
      await this.$store.dispatch("actions/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["actions/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters["actions/" + this.vuexGetter];
        } else {
          this.dataSource = this.$store.getters["actions/" + this.vuexGetter](
            this.vuexParam
          );
        }
      }
      if (!Array.isArray(this.dataSource)) {
        this.dataSource = [this.dataSource];
      }

      this.isLoading = false;
    },

    toggleAction(action, index) {
      var action = this.dataSource[index];

      const data = new FormData();
      data.append("id", action.IdActiune);
      data.append(
        "values",
        JSON.stringify({ EFinalizata: !action.EFinalizata })
      );

      this.axios
        .put("http://localhost:8080/CrmActiuni/Edit/", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            action.EFinalizata = !action.EFinalizata;
          this.getData();
        })
        .catch((error) => console.log(error));
    },

    formModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("CrmActiuneForm")
      );
      formModal.toggle();
    },

    addItemBtn() {
      this.editItemData.isEditing = false;
      this.editItemData.isLead = this.isLead;
      this.editItemData.isOpportunity = this.isOpportunity;
      this.editItemData.IdActiune = undefined;
      this.editItemData.Descriere = undefined;
      this.editItemData.DataInceput = undefined;
      this.editItemData.DataSfarsit = undefined;
      this.editItemData.EFinalizata = false;
      this.editItemData.TipActiuneId = undefined;
      this.editItemData.LeadId = undefined;
      this.editItemData.OpportunityId = undefined;
    },

    editItemBtn(item) {
      this.editItemData.isEditing = true;
      this.editItemData.isLead = this.isLead;
      this.editItemData.isOpportunity = this.isOpportunity;
      this.editItemData.IdActiune = item.IdActiune;
      this.editItemData.Descriere = item.Descriere;
      this.editItemData.DataInceput = item.DataInceput;
      this.editItemData.DataSfarsit = item.DataSfarsit;
      this.editItemData.EFinalizata = false;
      this.editItemData.TipActiuneId = item.TipActiuneId;
      this.editItemData.LeadId = item.LeadId;
      this.editItemData.OpportunityId = item.OpportunityId;
    },

    editedItem(params) {
      params.isEditing == true ? this.editItem(params) : this.addItem(params);
    },

    addItem(params) {
      const data = new FormData();
      data.append("values", JSON.stringify(params));
      this.axios
        .post("http://localhost:8080/CrmActiuni/Create", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reloadStore();
            this.formModalToggle();
          }
        })
        .catch((error) => console.log(error));
    },

    editItem(params) {
      console.log("Edit");
      console.log(params);
      const data = new FormData();
      data.set("id", params.IdActiune);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/CrmActiuni/Edit", data)
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
        .delete("http://localhost:8080/CrmActiuni/Delete/" + item.IdActiune)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            this.dataSource.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
