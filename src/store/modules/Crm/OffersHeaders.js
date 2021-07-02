import axios from "axios";

export default {
  namespaced: true,
  state: {
    isLoading: true,
    dataSource: [],
  },
  mutations: {
    SET_LOADING(state, loading) {
      state.isLoading = loading;
    },
    SET_DATASOURCE(state, ds) {
      state.dataSource = ds;
    },
  },
  actions: {
    async getDataSource(context) {
      context.commit("SET_LOADING", true);
      await axios
        .get("http://localhost:8080/CrmOferteAntent/Get")
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
  },
  getters: {
    getAll: (state) => {
      return state.dataSource;
    },

    getById: (state) => (idParam) => {
      return state.dataSource.find((item) => item.IdOfertaAntent == idParam);
    },

    getByPartnerId: (state) => (idParam) => {
      return state.dataSource.filter((item) => item.PartenerId == idParam);
    },

    getOffersCount: (state) => {
      return state.dataSource.length;
    },

    getAcceptedCount: (state) => {
      return state.dataSource.filter((item) => item.OfertaAcceptata == true)
        .length;
    },

    getDeniedCount: (state) => {
      return state.dataSource.filter((item) => item.OfertaRespinsa == true)
        .length;
    },

    getInProgressCount: (state) => {
      return state.dataSource.filter(
        (item) => item.OfertaRespinsa == null && item.OfertaAcceptata == null
      ).length;
    },
  },
};
