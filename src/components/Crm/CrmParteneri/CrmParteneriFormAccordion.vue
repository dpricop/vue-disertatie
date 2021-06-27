<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Partner info
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <form class="row">
            <div class="col-8">
              <label class="col-form-label">Partner name:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.NumePartener"
              />
            </div>
            <div class="col-4">
              <label class="col-form-label">Registration code:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.CodFiscal"
              />
            </div>

            <div class="col-12 mb-3">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="PersoanaFizica"
                  :checked="dataSource.PersoanaFizica"
                  @click="PersoanaFizicaToggle"
                />
                <label
                  class="form-check-label"
                  for="PersoanaFizica"
                  @click.prevent="PersoanaFizicaToggle"
                  >is legal entity ?</label
                >
              </div>
            </div>

            <div class="col-4 mb-3">
              <label for="CountryDropDown" class="col-form-label"
                >Country:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="CountryDropDown"
                  v-model="dataSource.TaraId"
                >
                  <option
                    v-for="item of CountryDropDown.dataSource"
                    :key="item.IdTara"
                    :value="item.IdTara"
                    >{{ item.NumeTara }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="CountryDropDown.isLoading == true"
                >
                  <span class="input-group-text" id="indicator">
                    <span
                      class="spinner-border spinner-border-sm spinner-default"
                      role="status"
                    ></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-4 mb-3">
              <label for="CurrencyDropDown" class="col-form-label"
                >County:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="CurrencyDropDown"
                  v-model="dataSource.JudetId"
                >
                  <option
                    v-for="item of CountyDropDown.dataSource"
                    :key="item.IdJudet"
                    :value="item.IdJudet"
                    >{{ item.NumeJudet }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="CountyDropDown.isLoading == true"
                >
                  <span class="input-group-text" id="indicator">
                    <span
                      class="spinner-border spinner-border-sm spinner-default"
                      role="status"
                    ></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-4 mb-3">
              <label for="UmDropDown" class="col-form-label">City:</label>
              <div class="input-group">
                <select
                  class="form-control"
                  id="UmDropDown"
                  v-model="dataSource.LocalitateId"
                >
                  <option
                    v-for="item of CityDropDown.dataSource"
                    :key="item.IdLocalitate"
                    :value="item.IdLocalitate"
                    >{{ item.NumeLocalitate }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="CityDropDown.isLoading == true"
                >
                  <span class="input-group-text" id="indicator">
                    <span
                      class="spinner-border spinner-border-sm spinner-default"
                      role="status"
                    ></span>
                  </span>
                </div>
              </div>
            </div>

            <div class="col-9">
              <label class="col-form-label">Address:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Adresa"
              />
            </div>
            <div class="col-3">
              <label class="col-form-label">Zip code:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.CodPostal"
              />
            </div>

            <div class="col-6">
              <label class="col-form-label">Pin (CNP):</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Cnp"
              />
            </div>
            <div class="col-6">
              <label class="col-form-label">Identity serial number:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.SerieBi"
              />
            </div>

            <div class="col-12 col-sm-4">
              <label class="col-form-label">Web Page:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.PaginaWeb"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="col-form-label">Count of employ:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.NrAngajati"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="col-form-label">Turnover:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.CifraDeAfacere"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CrmParteneriForm",
  props: {
    propsData: {
      IdLocalitate: Number,
      NumeLocalitate: String,
      JudetId: Number,
      NumeJudet: String,
    },
  },
  data: function(e) {
    return {
      CountryDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      CountyDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      CityDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadCountryDropDown();
    this.loadCountyDropDown();
    this.loadCityDropDown();
  },
  methods: {
    PersoanaFizicaToggle() {
      this.dataSource.PersoanaFizica = !this.dataSource.PersoanaFizica;
    },
    loadCountryDropDown() {
      if (this.CountryDropDown.dataSource[0] == undefined) {
        this.CountryDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/ConfigTari/DropDown")
          .then((response) => {
            this.CountryDropDown.dataSource = response.data;
            this.CountryDropDown.isLoading = false;
          })
          .catch((error) => console.log(error));
      }
    },
    loadCountyDropDown() {
      if (this.CountyDropDown.dataSource[0] == undefined) {
        this.CountyDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/ConfigJudete/DropDown")
          .then((response) => {
            this.CountyDropDown.dataSource = response.data;
            this.CountyDropDown.isLoading = false;
          })
          .catch((error) => console.log(error));
      }
    },
    loadCityDropDown() {
      if (this.CityDropDown.dataSource[0] == undefined) {
        this.CityDropDown.isLoading = true;
        this.axios
          .get("http://localhost:8080/ConfigLocalitati/DropDown")
          .then((response) => {
            this.CityDropDown.dataSource = response.data;
            this.CityDropDown.isLoading = false;
          })
          .catch((error) => console.log(error));
      }
    },
    editedItem() {
      this.$emit("editedItem", this.dataSource);
    },
  },
};
</script>
