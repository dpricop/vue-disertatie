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
              data-bs-target="#CrmOffersHeaderForm"
              @Click="addItemBtn"
            >
              <i class="cil-plus"></i>
              <span>Add</span>
            </button>
          </th>
        </tr>
        <tr>
          <th>#</th>
          <th>Partner</th>
          <th>Date of issue</th>
          <th>Expiration date</th>
          <th>Is accepted</th>
          <th>Is rejected</th>
          <th>Has opportunity</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of dataSource" :key="item.IdOfertaAntent">
          <td>{{ index + 1 }}</td>
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
          <td>{{ $filters.dateTimeFormat(item.DataEmiterii) }}</td>
          <td>{{ $filters.dateTimeFormat(item.DataExpirarii) }}</td>

          <td class="text-center">
            <i
              class="cil-check-circle text-success"
              v-if="item.OfertaAcceptata == true"
            ></i>
            <i
              class="cil-x-circle text-danger"
              v-if="item.OfertaAcceptata == false"
            ></i>
          </td>
          <td class="text-center">
            <i
              class="cil-check-circle text-success"
              v-if="item.OfertaRespinsa == true"
            ></i>
            <i
              class="cil-x-circle text-danger"
              v-if="item.OfertaRespinsa == false"
            ></i>
          </td>
          <td class="text-center">
            <i
              class="cil-check-circle text-success"
              v-if="item.OpportunityId != null"
            ></i>
            <i v-else class="cil-x-circle text-danger"></i>
          </td>
          <td>
            <router-link
              class="text-decoration-none text-success m-2"
              :to="{
                name: 'offer',
                params: { id: item.IdOfertaAntent },
              }"
            >
              <i class="cil-chevron-circle-right-alt"></i>
            </router-link>
            <a
              class="text-decoration-none text-warning m-2"
              @click.prevent="editItemBtn(item)"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#CrmOffersHeaderForm"
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
    <crm-offers-header-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    />
  </template>
</template>
<script>
import Loading from "@/components/Loading";
import CrmOffersHeaderForm from "./CrmOffersHeaderForm.vue";

export default {
  name: "CrmOffersHeaderTable",
  components: {
    Loading,
    CrmOffersHeaderForm,
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
      await this.$store.dispatch("offers/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["offers/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters["offers/" + this.vuexGetter];
        } else {
          this.dataSource = this.$store.getters["offers/" + this.vuexGetter](
            this.vuexParam
          );
        }
      }
      if (!Array.isArray(this.dataSource)) {
        this.dataSource = [this.dataSource];
      }
      this.isLoading = false;
    },
    addItemBtn() {
      this.editItemData.isEditing = false;
      this.editItemData.IdOfertaAntent = undefined;
      this.editItemData.PartenerId = undefined;
      this.editItemData.OpportunityId = undefined;
      this.editItemData.OfertaAcceptata = undefined;
      this.editItemData.DataEmiterii = undefined;
      this.editItemData.DataExpirarii = undefined;
    },
    editItemBtn(item) {
      this.editItemData.isEditing = true;
      this.editItemData.IdOfertaAntent = item.IdOfertaAntent;
      this.editItemData.PartenerId = item.PartenerId;
      this.editItemData.OpportunityId = item.OpportunityId;
      this.editItemData.OfertaAcceptata = item.OfertaAcceptata;
      this.editItemData.DataEmiterii = item.DataEmiterii;
      this.editItemData.DataExpirarii = item.DataExpirarii;
    },
    formModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("CrmOffersHeaderForm")
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
        .post("http://localhost:8080/CrmOferteAntent/Create", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reloadStore();
            this.formModalToggle();

            this.$router.push({
              name: "offer",
              params: { id: response.data.model.IdOfertaAntent },
            });
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
