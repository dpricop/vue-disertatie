import axios from "axios";

export default {
  namespaced: true,
  state: {
    isLoading: true,
    dataSource: [],
    dropDownDS: [],
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.isLoading = loading;
    },
    SET_DATASOURCE(state, ds) {
      state.dataSource = ds;
    },
    SET_DROPDOWN_DS(state, ds) {
      state.dropDownDS = ds;
    },
  },
  actions: {
    async getDataSource(context) {
      context.commit("SET_LOADING", true);
      await axios
        .get("http://localhost:8080/CrmLeadStatus/get")
        .then((response) => {
          context.commit("SET_DATASOURCE", response.data);
        })
        .catch((error) => {
          console.log(error);
          // console.log("action getDataSource axios CATCH");
          //TODO ! Best method for catch this error
        });
      context.commit("SET_LOADING", false);
    },

    async getDropDownDS(context) {
      context.commit("SET_LOADING", true);
      await axios
        .get("http://localhost:8080/CrmLeadStatus/dropdown")
        .then((response) => {
          context.commit("SET_DROPDOWN_DS", response.data);
        })
        .catch((error) => {
          console.log(error);
          // console.log("action getDataSource axios CATCH");
          //TODO ! Best method for catch this error
        });
      context.commit("SET_LOADING", false);
    },
  },
  getters: {
    getAll: (state) => {
      return state.dataSource;
    },

    getById: (state) => (idParam) => {
      return state.dataSource.find((item) => item.IdMotiv == idParam);
    },

    getDropDowns: (state) => {
      return state.dropDownDS;
    },
  },
};
