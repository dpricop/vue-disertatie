<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    id="CrmOffersDetailsArticles"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Articles
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form class="row">
            <div class="col-12 col-lg-10">
              <label for="ArticleDropDown" class="col-form-label"
                >Article</label
              >
              <div class="input-group">
                <select
                  class="form-control"
                  id="ArticleDropDown"
                  v-model="dataSource.ArticolId"
                  @change="setReadonlyInputsData"
                >
                  <option
                    v-for="item of ArticleDropDown.dataSource"
                    :key="item.IdArticol"
                    :value="item.IdArticol"
                    >{{ item.Denumire }}</option
                  >
                </select>
                <div
                  class="input-group-prepend d-flex"
                  v-if="ArticleDropDown.isLoading == true"
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
            <div class="col-4">
              <label class="col-form-label">Quantity</label>
              <input
                type="number"
                class="form-control"
                v-model="dataSource.Cantitate"
                @change="calcPretTotalNet"
              />
            </div>
            <div class="col-4">
              <label class="col-form-label">Unit price</label>
              <input
                type="number"
                class="form-control"
                v-model="dataSource.PretUnitar"
                @change="calcPretTotalNet"
              />
            </div>
            <div class="col-4">
              <label class="col-form-label">Total amount</label>
              <input
                type="number"
                class="form-control"
                v-model="dataSource.PretTotalNet"
                readonly="true"
              />
            </div>

            <div class="col-3 col-md-2">
              <label class="col-form-label">Um</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Um"
                readonly="true"
              />
            </div>
            <div class="col-3 col-lg-2">
              <label class="col-form-label">Currency</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Moneda"
                readonly="true"
              />
            </div>
            <div class="col-4 col-lg-2">
              <label class="col-form-label">Code</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Cod"
                readonly="true"
              />
            </div>
            <div class="col-5 col-lg-3">
              <label class="col-form-label">Code EAN</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.CodEan"
                readonly="true"
              />
            </div>
            <div class="col-4 col-lg-3">
              <label class="col-form-label">Group</label>
              <input
                type="text"
                class="form-control"
                v-model="dataSource.Grupa"
                readonly="true"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-danger"
            data-bs-dismiss="modal"
          >
            <i class="cil-x-circle"></i>
            <span class="mx-2">Cancel</span>
          </button>
          <button type="button" class="btn btn-success" @click="editedItem">
            <i class="cil-save"></i>
            <span class="mx-2">
              Save
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CrmOffersDetailsArticles",
  props: {
    propsData: {
      isEditing: Boolean,
    },
  },
  data: function(e) {
    return {
      ArticleDropDown: {
        isLoading: false,
        dataSource: Array,
      },
      dataSource: this.propsData,
    };
  },
  mounted() {
    this.loadArticleDropDown();
  },
  methods: {
    async loadArticleDropDown() {
      await this.$store.dispatch("articles/getDataSource");
      this.ArticleDropDown.dataSource = await this.$store.getters[
        "articles/getActivAll"
      ];
      this.ArticleDropDown.isLoading = false;
    },

    setReadonlyInputsData() {
      var articol = this.$store.getters["articles/getById"](
        this.dataSource.ArticolId
      );

      this.dataSource.Um = articol.Um.Um;
      this.dataSource.Moneda = articol.Moneda.Moneda;
      this.dataSource.Cod = articol.Cod;
      this.dataSource.CodEan = articol.CodEan;
      this.dataSource.Grupa = articol.Grupa.Grupa;
      this.dataSource.PretUnitar =
        this.dataSource.PretUnitar == undefined
          ? articol.Pretlista
          : this.dataSource.PretUnitar;
      this.dataSource.Cantitate =
        this.dataSource.Cantitate == undefined ? 1 : this.dataSource.Cantitate;
      this.dataSource.Cantitate = 1;
      this.calcPretTotalNet();
    },

    calcPretTotalNet() {
      this.dataSource.PretTotalNet =
        this.dataSource.Cantitate * this.dataSource.PretUnitar;
    },

    editedItem() {
      this.$emit("editedItem", this.dataSource);
    },
  },
};
</script>
