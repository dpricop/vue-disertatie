<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Lead info
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <form class="row">
            <div class="col-8">
              <label class="col-form-label">Lead name:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.LeadNume"
              />
            </div>
            <div class="col-4">
              <label class="col-form-label">Source notes:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.NoteSursa"
              />
            </div>

            <div class="col-6">
              <label class="col-form-label">VAT Code:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.CodFiscal"
              />
            </div>
            <div class="col-6 d-flex align-items-end">
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
            <div class="col-12">
              <label class="col-form-label">Lead description:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.LeadDescriere"
              />
            </div>

            <div class="col-12 col-sm-4">
              <label class="col-form-label">Contact first name:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.ContactNume"
              />
            </div>
            <div class="col-12 col-sm-4">
              <label class="col-form-label">Contact last name:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.ContactPrenume"
              />
            </div>

            <div class="col-auto d-flex align-items-end">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="HotOrNot"
                  :checked="dataSource.HotOrNot"
                  @click="HotOrNotToggle"
                />
                <label
                  class="form-check-label"
                  for="HotOrNot"
                  @click.prevent="HotOrNotToggle"
                  >is hot entity ?</label
                >
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <label class="col-form-label">Email:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Email"
              />
            </div>
            <div class="col-12 col-sm-6">
              <label class="col-form-label">Phone:</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Telefon"
              />
            </div>

            <div class="col-4 mb-3">
              <label for="PartnerDropDown" class="col-form-label"
                >Partner:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="PartnerDropDown"
                  v-model="dataSource.PartenerId"
                >
                  <option
                    v-for="item of PartnerDropDown.dataSource"
                    :key="item.IdPartener"
                    :value="item.IdPartener"
                    >{{ item.NumePartener }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="PartnerDropDown.isLoading == true"
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
                >Reason:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="CurrencyDropDown"
                  v-model="dataSource.MotivId"
                >
                  <option
                    v-for="item of MotiveDropDown.dataSource"
                    :key="item.IdMotiv"
                    :value="item.IdMotiv"
                    >{{ item.Motiv }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="MotiveDropDown.isLoading == true"
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
              <label for="LeadStatusInput" class="col-form-label"
                >Lead Status:</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="LeadStatusInput"
                  v-model="dataSource.LeadStatusId"
                >
                  <option
                    v-for="item of LeadStatusDropDown.dataSource"
                    :key="item.IdLeadStatus"
                    :value="item.IdLeadStatus"
                    >{{ item.StatusNume }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="LeadStatusDropDown.isLoading == true"
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

            <div class="col-4 d-flex align-items-end">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="ECalificat"
                  :checked="dataSource.ECalificat"
                  @click="ECalificatToggle"
                />
                <label
                  class="form-check-label"
                  for="ECalificat"
                  @click.prevent="ECalificatToggle"
                  >is qualified ?</label
                >
              </div>
            </div>
            <div class="col-4 d-flex align-items-end">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="EConvertit"
                  :checked="dataSource.EConvertit"
                  @click="EConvertitToggle"
                />
                <label
                  class="form-check-label"
                  for="EConvertit"
                  @click.prevent="EConvertitToggle"
                  >Is converted ?</label
                >
              </div>
            </div>
            <div class="col-4 d-flex align-items-end">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="EInactiv"
                  :checked="dataSource.EInactiv"
                  @click="EInactivToggle"
                />
                <label
                  class="form-check-label"
                  for="EInactiv"
                  @click.prevent="EInactivToggle"
                  >Is inactive ?</label
                >
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CrmLeadsFormAccordion",
  props: {
    propsData: {
      isEditing: Boolean,
      IdLead: Number,
      LeadNume: String,
      LeadDescriere: String,
      PersoanaFizica: Boolean,
      CodFiscal: String,
      Email: String,
      Telefon: String,
      HotOrNot: Boolean,
      NoteSursa: String,
      ContactNume: String,
      ContactPrenume: String,
      LeadStatusId: Number,
      PartenerId: Number,
      MotivId: Number,
      ECalificat: Boolean,
      EInactiv: Boolean,
      EConvertit: Boolean,
    },
  },
  data: function(e) {
    return {
      PartnerDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      MotiveDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      LeadStatusDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadPartnerDropDown();
    this.loadMotiveDropDown();
    this.loadLeadStatusDropDown();
  },
  methods: {
    async loadPartnerDropDown() {
      await this.$store.dispatch("partners/getDataSource");
      this.PartnerDropDown.dataSource = await this.$store.getters[
        "partners/getAll"
      ];
      this.PartnerDropDown.isLoading = false;
    },

    async loadMotiveDropDown() {
      await this.$store.dispatch("reason/getDataSource");
      this.MotiveDropDown.dataSource = await this.$store.getters[
        "reason/getForLeads"
      ];
      this.MotiveDropDown.isLoading = false;
    },

    async loadLeadStatusDropDown() {
      await this.$store.dispatch("leadStatus/getDropDownDS");
      this.LeadStatusDropDown.dataSource = await this.$store.getters[
        "leadStatus/getDropDowns"
      ];
      this.LeadStatusDropDown.isLoading = false;
    },
  },
};
</script>
