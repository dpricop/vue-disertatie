<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <div class="col-12 bg-light py-3">
      <table class="table table-bordered bg-white mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Description</th>
            <th>Date Start</th>
            <th>Date Stop</th>
            <th>Is finished</th>
            <th>Link</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) of dataSource" :key="item.IdActiune">
            <td>{{ index + 1 }}</td>
            <td>{{ item.TipActiune }}</td>
            <td>{{ item.Descriere }}</td>
            <td>{{ $filters.dateTimeFormat(item.DataInceput) }}</td>
            <td>{{ $filters.dateTimeFormat(item.DataSfarsit) }}</td>
            <td class="text-center">
              <i
                v-if="item.EFinalizata"
                class="cil-check-circle text-success"
              ></i>
              <i v-else class="cil-x-circle text-danger"></i>
            </td>
            <td>
              <router-link
                v-if="item.LeadId != null"
                class="text-decoration-none"
                :to="{
                  name: 'partner',
                  params: { id: item.LeadId },
                }"
              >
                Show lead
              </router-link>
              <router-link
                v-if="item.OpportunityId != null"
                class="text-decoration-none"
                :to="{
                  name: 'partner',
                  params: { id: item.OpportunityId },
                }"
              >
                Show opportunity
              </router-link>
            </td>
            <td>
              <a
                class="text-decoration-none text-success m-2"
                @click.prevent="toggleAction(item, index)"
                href="#"
              >
                <template v-if="item.EFinalizata">
                  <i class="cil-action-undo text-warning"></i>
                  <span class="text-warning"> Unfinished</span>
                </template>
                <template v-else>
                  <i class="cil-check-alt"></i>
                  Finished
                </template>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>

<script>
import Loading from "./../../Loading.vue";

export default {
  name: "CrmActiuniTable",
  components: {
    Loading,
  },
  props: {
    vuexGetter: String,
    vuexParam: Number,
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
    this.reloadStore();
  },
  computed: {},
  methods: {
    async reloadStore() {
      await this.$store.dispatch("actions/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["actions/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters["actions/" + this.vuexGetter];
        } else {
          this.dataSource = this.$store.getters["actions/" + this.vuexGetter](
            this.vuexParam
          );
        }
      }
      if (!Array.isArray(this.dataSource)) {
        this.dataSource = [this.dataSource];
      }

      this.isLoading = false;
    },

    toggleAction(action, index) {
      var action = this.dataSource[index];

      const data = new FormData();
      data.append("id", action.IdActiune);
      data.append(
        "values",
        JSON.stringify({ EFinalizata: !action.EFinalizata })
      );

      this.axios
        .put("http://localhost:8080/CrmActiuni/Edit/", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            action.EFinalizata = !action.EFinalizata;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
