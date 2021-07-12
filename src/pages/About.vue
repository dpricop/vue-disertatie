<template>
  <div class="col-8 offset-2 text-center my-5">
    <div class="d-flex justify-content-around">
      <img
        src="https://www.uvt.ro/wp-content/uploads/2020/07/Asset-7.png"
        width="334"
        height="70"
        alt="uvt logo"
        loading="lazy"
      />
      <img
        src="https://feaa.uvt.ro/images/theme/FEAA-logo.svg"
        height="100"
        alt="feaa logo"
        loading="lazy"
      />
    </div>
  </div>
  <div class="col-12 text-center my-5">
    <h1 class="text-uppercase">
      Lucrare de disertatie
    </h1>
    <h2>
      Sistem informatic pentru managementul relatiilor cu clientii
    </h2>
  </div>
  <div class="d-flex justify-content-around bg-light py-5">
    <div class="d-inline-block">
      <strong>COORDONATOR</strong> <br />
      <span>DR. Voicu Mirela Catrinel</span>
    </div>
    <div class="d-inline-block">
      <strong>ABSOLVENT</strong> <br />
      <span>Pricop Dumitru</span>
    </div>
  </div>

  <!-- <div>
    <div style="height:800px;"></div>
    <div class="col-12 bg-light p-5" id="fiseDiscipline">
      Universitatea: <strong> {{ universitatea }} </strong>
      <br />
      Facultatea: <strong> {{ facultatea }}</strong>
      <br />

      Specializarea: <strong> {{ specializarea }} </strong>
      <span class="badge bg-warning"> {{ lang }}</span>
      <div style="height:200px;"></div>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      universitatea: this.$route.params["universitatea"],
      facultatea: this.$route.params["facultatea"],
      specializarea: this.$route.query["specializarea"],
      lang: this.$route.query["lang"],
    };
  },
  computed: {},
  mounted() {},
  methods: {
    showRouter: function() {
      console.log(this.$router);
    },
  },
};
</script>
