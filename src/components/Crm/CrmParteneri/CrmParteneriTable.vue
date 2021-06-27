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
              <th>Parnert name</th>
              <th>Legal entity</th>
              <th>Address</th>
              <th>Zip code</th>
              <th>City</th>
              <th>County</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) of dataSource" :key="item.IdPartener">
              <td>{{ index + 1 }}</td>
              <td>
                <router-link
                  class="text-decoration-none"
                  :to="{
                    name: 'partner',
                    params: { id: item.IdPartener },
                  }"
                >
                  {{ item.NumePartener }}
                </router-link>
              </td>
              <td class="text-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  disabled
                  :checked="item.PersoanaFizica"
                />
              </td>
              <td>{{ item.Adresa }}</td>
              <td>{{ item.CodPostal }}</td>
              <td>{{ item.NumeLocalitate }}</td>
              <td>{{ item.NumeJudet }}</td>
              <td>{{ item.NumeTara }}</td>
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
      </div>
    </div>
    <crm-parteneri-form
      v-bind:propsData="editItemData"
      :key="editItemData"
      @editedItem="editedItem"
    />
  </template>
</template>
<script>
import CrmParteneriForm from "./CrmParteneriForm";

export default {
  name: "CrmParteneriTable",
  components: {
    CrmParteneriForm,
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
        .get("http://localhost:8080/CrmParteneri/get")
        .then((response) => {
          this.dataSource = response.data;
          this.loaded();
        })
        .catch((error) => console.log(error));
    },
    addItemBtn() {
      this.editItemData.isEditing = false;
      this.editItemData.IdPartener = undefined;
      this.editItemData.NumePartener = undefined;
      this.editItemData.PersoanaFizica = undefined;
      this.editItemData.CodFiscal = undefined;
      this.editItemData.Cnp = undefined;
      this.editItemData.SerieBi = undefined;
      this.editItemData.PaginaWeb = undefined;
      this.editItemData.NrAngajati = undefined;
      this.editItemData.CifraDeAfacere = undefined;
      this.editItemData.TaraId = undefined;
      this.editItemData.NumeTara = undefined;
      this.editItemData.JudetId = undefined;
      this.editItemData.NumeJudet = undefined;
      this.editItemData.LocalitateId = undefined;
      this.editItemData.NumeLocalitate = undefined;
      this.editItemData.Adresa = undefined;
      this.editItemData.CodPostal = undefined;
      this.editItemData.Platitortva = undefined;
      this.editItemData.Dataplatitortva = undefined;
      this.editItemData.Dataverif = undefined;
      this.editItemData.TvaIncasare = undefined;
      this.editItemData.DataTvaincasare = undefined;
      this.editItemData.DataverifTvainc = undefined;
      this.editItemData.ValidatVs = undefined;
      this.editItemData.DataVerifVs = undefined;
      this.editItemData.InUserId = undefined;
      this.editItemData.InDate = undefined;
      this.editItemData.ModUserId = undefined;
      this.editItemData.ModDate = undefined;
    },
    editItemBtn(item) {
      this.editItemData.isEditing = true;
      this.editItemData.IdPartener = item.IdPartener;
      this.editItemData.NumePartener = item.NumePartener;
      this.editItemData.PersoanaFizica = item.PersoanaFizica;
      this.editItemData.CodFiscal = item.CodFiscal;
      this.editItemData.Cnp = item.Cnp;
      this.editItemData.SerieBi = item.SerieBi;
      this.editItemData.PaginaWeb = item.PaginaWeb;
      this.editItemData.NrAngajati = item.NrAngajati;
      this.editItemData.CifraDeAfacere = item.CifraDeAfacere;
      this.editItemData.TaraId = item.TaraId;
      this.editItemData.NumeTara = item.NumeTara;
      this.editItemData.JudetId = item.JudetId;
      this.editItemData.NumeJudet = item.NumeJudet;
      this.editItemData.LocalitateId = item.LocalitateId;
      this.editItemData.NumeLocalitate = item.NumeLocalitate;
      this.editItemData.Adresa = item.Adresa;
      this.editItemData.CodPostal = item.CodPostal;
      this.editItemData.Platitortva = item.Platitortva;
      this.editItemData.Dataplatitortva = item.Dataplatitortva;
      this.editItemData.Dataverif = item.Dataverif;
      this.editItemData.TvaIncasare = item.TvaIncasare;
      this.editItemData.DataTvaincasare = item.DataTvaincasare;
      this.editItemData.DataverifTvainc = item.DataverifTvainc;
      this.editItemData.ValidatVs = item.ValidatVs;
      this.editItemData.DataVerifVs = item.DataVerifVs;
      this.editItemData.InUserId = item.InUserId;
      this.editItemData.InDate = item.InDate;
      this.editItemData.ModUserId = item.ModUserId;
      this.editItemData.ModDate = item.ModDate;
    },
    formModalToggle() {
      var formModal = window.bootstrap.Modal.getInstance(
        document.getElementById("CrmParteneriForm")
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
        .post("http://localhost:8080/CrmParteneri/Create", data)
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
      data.set("id", params.IdPartener);
      data.set("values", JSON.stringify(params));
      this.axios
        .put("http://localhost:8080/CrmParteneri/Edit", data)
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
        .delete("http://localhost:8080/CrmParteneri/Delete/" + item.IdPartener)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            this.dataSource.splice(index, 1);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
