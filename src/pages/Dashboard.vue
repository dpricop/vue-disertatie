<template>
  <template v-if="isLoading == true">
    <Loading />
  </template>
  <template v-else>
    <div class="container-fluid">
      <h1 class="bg-white my-0 p-3">
        Dashboard
        <button class="btn btn-sm border" @click="setup">
          <i class="cil-reload"></i>
          reload
        </button>
      </h1>

      <div class="row p-2 bg-light">
        <div class="col-12 col-sm-6 py-2">
          <canvas id="offers-chart" class="bg-white" />
        </div>
        <div class="col-12 col-sm-6 col-lg-3 py-2">
          <canvas id="opportunities-chart" class="bg-white" />
        </div>
        <div class="col-12 col-sm-6 col-lg-3 py-2">
          <canvas id="leads-chart" class="bg-white" />
        </div>
        <hr class="my-2" />
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 py-2">
          <canvas id="tasks-chart" class="bg-white" />
        </div>
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3 py-2">
          <canvas id="actions-chart" class="bg-white" />
        </div>
      </div>
    </div>

    <!-- <div>
      <div>
        TASKS
        {{ tasksInfo }}
      </div>
      <div>
        ACTIONS
        {{ actionsInfo }}
      </div>
      <div>
        LEADS
        {{ leadsInfo }}
      </div>
      <div>
        OPPORTUNITIES
        {{ opportunities }}
      </div>
      <div>
        OFFERS HEAD
        {{ offers }}
      </div>
    </div> -->
  </template>
</template>
<script>
import Loading from "@/components/Loading";
import {} from "vue3-chart-v2";

export default {
  name: "Dashboard",
  components: {
    Loading,
  },

  data: function(e) {
    return {
      isLoading: true,
      newTask: "",
      tasksInfo: {
        finished: 0,
        unfinished: 0,
      },
      actionsInfo: {
        unfinished: 0,
        finished: 0,
      },
      leadsInfo: {
        converted: 0,
        unconverted: 0,
      },
      opportunities: {},
      offers: {},
    };
  },
  mounted() {
    this.setup();
  },
  computed: {},
  methods: {
    async setup() {
      await this.reloadStore();
      this.renderCharts();
    },
    async reloadStore() {
      this.isLoading = true;
      await this.$store.dispatch("tasks/getDataSource");
      await this.$store.dispatch("actions/getDataSource");
      await this.$store.dispatch("leads/getDataSource");
      await this.$store.dispatch("opportunities/getDataSource");
      await this.$store.dispatch("offers/getDataSource");
      this.isLoading = false;
      this.setData();
    },
    setData() {
      this.actionsInfo.unfinished = this.$store.getters[
        "actions/getUnfinishedCount"
      ];
      this.actionsInfo.finished = this.$store.getters[
        "actions/getFinishedCount"
      ];

      this.tasksInfo.finished = this.$store.getters["tasks/getFinishedCount"];
      this.tasksInfo.unfinished = this.$store.getters[
        "tasks/getUnfinishedCount"
      ];

      this.leadsInfo.converted = this.$store.getters["leads/getConvertedCount"];
      this.leadsInfo.unconverted = this.$store.getters[
        "leads/getUnconvertedCount"
      ];

      this.opportunities.hot = this.$store.getters["opportunities/getHotCount"];
      this.opportunities.nothot = this.$store.getters[
        "opportunities/getNotHotCount"
      ];

      this.offers.accepted = this.$store.getters["offers/getAcceptedCount"];
      this.offers.denied = this.$store.getters["offers/getDeniedCount"];
      this.offers.inprogress = this.$store.getters["offers/getInProgressCount"];
    },

    renderCharts() {
      this.taskChart();
      this.actionChart();
      this.leadChart();
      this.opportunityChart();
      this.offerChart();

      var chartObj = {
        type: "pie",
        data: {
          labels: ["Finished", "Unfinished"],
          datasets: [
            {
              data: [this.tasksInfo.finished, this.tasksInfo.unfinished],
              backgroundColor: ["rgb(71, 186, 193)", "rgb(174, 105, 175)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Tasks",
            fontSize: 20,
          },
        },
      };
    },

    taskChart() {
      var tasksEl = document.getElementById("tasks-chart").getContext("2d");
      var chartObj = {
        type: "pie",
        data: {
          labels: ["Finished", "Unfinished"],
          datasets: [
            {
              data: [this.tasksInfo.finished, this.tasksInfo.unfinished],
              backgroundColor: ["rgb(71, 186, 193)", "rgb(174, 105, 175)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Tasks",
            fontSize: 20,
          },
        },
      };

      new Chart(tasksEl, chartObj);
    },

    actionChart() {
      var actionsEl = document.getElementById("actions-chart").getContext("2d");
      var chartObj = {
        type: "pie",
        data: {
          labels: ["Finished", "Unfinished"],
          datasets: [
            {
              data: [this.actionsInfo.finished, this.actionsInfo.unfinished],
              backgroundColor: ["rgb(71, 186, 193)", "rgb(174, 105, 175)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Actions",
            fontSize: 20,
          },
        },
      };
      new Chart(actionsEl, chartObj);
    },

    leadChart() {
      var leadsEl = document.getElementById("leads-chart").getContext("2d");
      var chartObj = {
        type: "pie",
        data: {
          labels: ["Converted", "Unconverted"],
          datasets: [
            {
              // data: [this.leadsInfo.converted, this.leadsInfo.unconverted],
              data: [8, 6],
              backgroundColor: ["rgb(71, 186, 193)", "rgb(174, 105, 175)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Leads",
            fontSize: 20,
          },
        },
      };
      new Chart(leadsEl, chartObj);
    },

    opportunityChart() {
      var opportunitiesEl = document
        .getElementById("opportunities-chart")
        .getContext("2d");
      var chartObj = {
        type: "pie",
        data: {
          labels: ["Hot", "Not hot"],
          datasets: [
            {
              //data: [this.opportunities.hot, this.opportunities.nothot],
              data: [10, 5],
              backgroundColor: ["rgb(71, 186, 193)", "rgb(174, 105, 175)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Opportunities",
            fontSize: 20,
          },
        },
      };
      new Chart(opportunitiesEl, chartObj);
    },

    offerChart() {
      var offersEl = document.getElementById("offers-chart").getContext("2d");
      var chartObj = {
        type: "doughnut",
        data: {
          // labels: [
          //   "In progress " + "(" + 5 + ")",
          //   "Accepted " + "(" + 5 + ")",
          //   "Denied " + "(" + 10 + ")",
          // ],
          labels: ["In progress ", "Accepted ", "Denied "],
          datasets: [
            {
              data: [
                5, //this.offers.inprogress,
                5, //this.offers.accepted,
                10, //this.offers.denied,
              ],
              backgroundColor: [
                "rgb(21, 164, 250)",
                "rgb(71, 186, 193)",
                "rgb(174, 105, 175)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: "Offers",
            fontSize: 20,
          },
        },
      };
      new Chart(offersEl, chartObj);
    },
  },
};
</script>

<style scoped>
.color {
  background-color: rgb(71, 186, 193);
  background-color: rgb(174, 105, 175);
  background-color: rgb(21, 164, 250);
  background-color: #2f3949;
  border-left: 5px solid #47bac1;
  background-color: #354052;
}
</style>
