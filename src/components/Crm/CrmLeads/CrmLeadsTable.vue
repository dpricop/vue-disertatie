<template>
  <template v-if="isLoading == true">
    <Loading />
  </template>
  <template v-else>
    <div class="bg-light py-3">
      <table class="table table-bordered bg-white mb-0">
        <thead>
          <tr>
            <th colspan="14" class="text-end">
              <button
                class="btn btn-sm btn-success px-3"
                data-bs-toggle="modal"
                data-bs-target="#CrmLeadsForm"
                @Click="addItemBtn"
              >
                <i class="cil-plus"></i>
                <span>Add</span>
              </button>
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>Lead name</th>
            <th>Lead description</th>
            <th>Legal entity</th>
            <th>Hot or not</th>

            <th>Vat Code</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Is qualified</th>
            <th>Is converted</th>
            <th>Is inactiv</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of dataSource" :key="item.IdLead">
            <td>{{ index + 1 }}</td>
            <td>
              <router-link
                class="text-decoration-none"
                :to="{
                  name: 'lead',
                  params: { id: item.IdLead },
                }"
              >
                {{ item.LeadNume }}
              </router-link>
            </td>
            <td>{{ item.LeadDescriere }}</td>
            <td class="text-center">
              <input
                class="form-check-input"
                type="checkbox"
                disabled
                :checked="item.PersoanaFizica"
              />
            </td>
            <td class="text-center">
              <input
                class="form-check-input"
                type="checkbox"
                disabled
                :checked="item.HotOrNot"
              />
            </td>
            <td>{{ item.CodFiscal }}</td>
            <td>{{ item.ContactNume }}</td>
            <td>{{ item.ContactPrenume }}</td>
            <td>{{ item.Telefon }}</td>
            <td>{{ item.Email }}</td>

            <td class="text-center">
              <input
                class="form-check-input"
                type="checkbox"
                disabled
                :checked="item.ECalificat"
              />
            </td>
            <td class="text-center">
              <input
                class="form-check-input"
                type="checkbox"
                disabled
                :checked="item.EInactiv"
              />
            </td>
            <td class="text-center">
              <input
                class="form-check-input"
                type="checkbox"
                disabled
                :checked="item.EConvertit"
              />
            </td>

            <td>
              <router-link
                class="text-decoration-none text-success m-2"
                :to="{
                  name: 'lead',
                  params: { id: item.IdLead },
                }"
              >
                <i class="cil-chevron-circle-right-alt"></i>
              </router-link>
              <a
                class="text-decoration-none text-warning m-2"
                @click.prevent="editItemBtn(item)"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#CrmLeadsForm"
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
    <crm-leads-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    />
  </template>
</template>
<script>
import Loading from "@/components/Loading";
import CrmLeadsForm from "./CrmLeadsForm.vue";

export default {
  name: "CrmLeadsTable",
  components: {
    CrmLeadsForm,
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
      await this.$store.dispatch("leads/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["leads/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters["leads/" + this.vuexGetter];
        } else {
          this.dataSource = this.$store.getters["leads/" + this.vuexGetter](
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

      this.editItemData.IdLead = undefined;
      this.editItemData.LeadNume = undefined;
      this.editItemData.LeadDescriere = undefined;
      this.editItemData.PersoanaFizica = undefined;
      this.editItemData.CodFiscal = undefined;
      this.editItemData.Email = undefined;
      this.editItemData.Telefon = undefined;
      this.editItemData.HotOrNot = undefined;
      this.editItemData.NoteSursa = undefined;
      this.editItemData.ContactNume = undefined;
      this.editItemData.ContactPrenume = undefined;
      this.editItemData.LeadStatusId = undefined;
      this.editItemData.PartenerId = undefined;
      this.editItemData.ECalificat = false;
      this.editItemData.EInactiv = false;
      this.editItemData.EConvertit = undefined;
      this.editItemData.MotivId = undefined;
    },

    editItemBtn(item) {
      this.editItemData.isEditing = true;
      this.editItemData.IdLead = item.IdLead;
      this.editItemData.LeadNume = item.LeadNume;
      this.editItemData.LeadDescriere = item.LeadDescriere;
      this.editItemData.PersoanaFizica = item.PersoanaFizica;
      this.editItemData.CodFiscal = item.CodFiscal;
      this.editItemData.Email = item.Email;
      this.editItemData.Telefon = item.Telefon;
      this.editItemData.HotOrNot = item.HotOrNot;
      this.editItemData.NoteSursa = item.NoteSursa;
      this.editItemData.ContactNume = item.ContactNume;
      this.editItemData.ContactPrenume = item.ContactPrenume;
      this.editItemData.LeadStatusId = item.LeadStatusId;
      this.editItemData.PartenerId = item.PartenerId;
      this.editItemData.ECalificat = item.ECalificat;
      this.editItemData.EInactiv = item.EInactiv;
      this.editItemData.EConvertit = item.EConvertit;
      this.editItemData.MotivId = item.MotivId;
    },

    formModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("CrmLeadsForm")
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
        .post("http://localhost:8080/CrmLead/Create", data)
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
      data.set("id", params.IdLead);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/CrmLead/Edit", data)
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
        .delete("http://localhost:8080/CrmLead/Delete/" + item.IdLead)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            this.dataSource.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
