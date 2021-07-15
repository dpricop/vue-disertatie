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
    async loginUser({ commit }, { login, password }) {
      commit("SET_LOADING", true);

      const data = new FormData();
      data.append("login", login);
      data.append("password", password);
      await axios
        .post("http://localhost:8080/AppUtilizatori/login", data)
        .then((response) => {
          commit("SET_DATASOURCE", response.data);
        })
        .catch((error) => {
          console.log(error);
          // console.log("action getDataSource axios CATCH");
          //TODO ! Best method for catch this error
        });
      commit("SET_LOADING", false);
    },
  },
  getters: {
    getUser: (state) => {
      return state.dataSource;
    },
  },
};
