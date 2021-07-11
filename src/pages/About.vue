<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 bg-light p-5">
        <!-- <h1>About record {{ id }}</h1> -->
        <!-- <router-link
          :to="{ name: 'AboutView', params: { id: id } }"
          class="mx-2"
          >{{ id }}</router-link
        >
        <router-link
          :to="{ name: 'AboutView', params: { id: next } }"
          class="mx-2"
          >{{ next }}</router-link
        > -->
        Universitatea: <strong> {{ universitatea.toUpperCase() }} </strong>
        <br />
        Facultatea: <strong> {{ facultatea.toUpperCase() }}</strong>
        <br />

        Specializarea: <strong> {{ specializarea }} </strong>
        <span class="badge bg-warning"> {{ lang }}</span>

        <hr />

        <router-link
          class="btn btn-sm btn-success text-light"
          tag="button"
          :to="{ name: 'home' }"
        >
          Home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // id: this.$router.currentRoute.value.params["id"],
      // next: ++this.$router.currentRoute.value.params["id"],

      universitatea: this.$route.params["universitatea"],
      facultatea: this.$route.params["facultatea"],
      specializarea: this.$route.query["specializarea"],
      lang: this.$route.query["lang"],
    };
  },
  computed: {},
  mounted() {
    this.showRouter();
  },
  methods: {
    showRouter: function() {
      console.log(this.$router);
      // console.log(this.$route);
    },

    showDetails: function() {
      console.log(this.$router.currentRoute);
      alert("click");
    },
  },
  watch: {
    $route(toRoute, fromRoute) {
      // console.log(this.$router.currentRoute);
      // console.log(toRoute);
      // console.log(fromRoute);
      // this.id = toRoute.params["id"];
      // this.next = ++toRoute.params["id"];
    },
  },
};
</script>
