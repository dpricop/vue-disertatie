<template>
  <template v-if="isLoading == true">
    <loading />
  </template>
  <template v-else>
    <div class="bg-white" :class="cssStyles">
      <div id="tasks_table" class="bg-light">
        <div class="tasks_table_head">
          <div class="input-group">
            <input
              type="text"
              class="form-control form-control-sm"
              placeholder="Create task"
              v-on:keyup.enter="createTask"
              v-model="newTask"
              :class="[
                v$.newTask.$dirty == true && v$.newTask.$invalid == true
                  ? 'is-invalid'
                  : '',
                v$.newTask.$dirty == true && v$.newTask.$invalid == false
                  ? 'is-valid'
                  : '',
              ]"
              @blur="v$.newTask.$touch()"
            />
            <button class="input-group-text btn-sm" @Click="getAll">
              <i class="cil-reload"></i>
            </button>
            <button class="input-group-text btn-sm" @Click="createTask">
              <i class="cil-plus"></i>
            </button>
          </div>
        </div>
        <div class="text-danger p-1" v-if="v$.newTask.$errors.length > 0">
          {{ v$.newTask.$errors[0].$message }}
        </div>

        <div class="tasks_table_body bg-white mt-2">
          <div
            class="d-flex justify-content-between align-items-center"
            v-for="(note, index) of dataSource"
            :key="note.IdNotita"
          >
            <div class="form-check form-switch m-2">
              <input
                class="form-check-input"
                type="checkbox"
                autocomplete="off"
                :id="'taskEl_' + note.IdNotita"
                :checked="note.EFinalizata"
                @click="toggleTask(note, index)"
              />
              <label
                class="form-check-label"
                v-bind:class="{
                  'text-decoration-line-through': note.EFinalizata,
                }"
                :for="'taskEl_' + note.IdNotita"
                @click.prevent="toggleTask(note, index)"
              >
                {{ note.NotitaDesc }}
              </label>
            </div>
            <a
              class="text-decoration-none text-danger m-2"
              @click.prevent="deleteTask(note, index)"
              href="#"
            >
              <i class="cil-trash"></i>
            </a>
          </div>
          <div class="d-flex bg-light justify-content-end">
            <a
              class="link mr-2 justify-content-end"
              href=""
              @click.prevent="hideFinished"
              >hide finished
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import Loading from "./../../Loading.vue";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  name: "ListaNotite",
  components: {
    Loading,
  },
  props: {
    vuexGetter: String,
    vuexParam: Number,
    cssStyles: String,
  },
  data: function(e) {
    return {
      isLoading: true,
      newTask: "",
      dataSource: [],
    };
  },
  mounted() {
    this.reloadStore();
  },
  computed: {},
  methods: {
    async reloadStore() {
      await this.$store.dispatch("tasks/getDataSource");
      this.getData();
    },
    getData() {
      if (this.vuexGetter == undefined) {
        this.dataSource = this.$store.getters["tasks/getAll"];
      } else {
        if (this.vuexParam == undefined) {
          this.dataSource = this.$store.getters["tasks/" + this.vuexGetter];
        } else {
          this.dataSource = this.$store.getters["tasks/" + this.vuexGetter](
            this.vuexParam
          );
        }
      }
      if (!Array.isArray(this.dataSource)) {
        this.dataSource = [this.dataSource];
      }
      this.isLoading = false;
    },
    async getAll() {
      this.v$.$reset();
      this.newTask = "";
      await this.$store.dispatch("tasks/getDataSource");
      this.dataSource = this.$store.getters["tasks/getAll"];
    },
    createTask() {
      this.v$.newTask.$touch();

      if (this.v$.$dirty == true && this.v$.$invalid == true) return true;

      const data = new FormData();
      data.append("values", JSON.stringify({ NotitaDesc: this.newTask }));
      this.axios
        .post("http://localhost:8080/CrmListaNotite/Create", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reloadStore();
            this.newTask = null;
            this.v$.$reset();
          }
        })
        .catch((error) => console.log(error));
    },
    deleteTask(task, index) {
      this.axios
        .delete("http://localhost:8080/CrmListaNotite/Delete/" + task.IdNotita)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            this.dataSource.splice(index, 1);
          this.v$.$reset();
        })
        .catch((error) => console.log(error));
    },
    toggleTask(task, index) {
      var task = this.dataSource[index];

      const data = new FormData();
      data.append("id", task.IdNotita);
      data.append("values", JSON.stringify({ EFinalizata: !task.EFinalizata }));

      this.axios
        .put("http://localhost:8080/CrmListaNotite/Edit/", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            task.EFinalizata = !task.EFinalizata;
        })
        .catch((error) => console.log(error));
    },
    hideFinished() {
      this.dataSource = this.$store.getters["tasks/getUnfinished"];
    },
  },

  validations() {
    return {
      newTask: {
        required: helpers.withMessage("REQUIRED", required),
      },
    };
  },
};
</script>

<style scoped>
.tasks_table_body > div {
  border: 1px solid #dee2e6;
  border-bottom: none;
}
.tasks_table_body > div:last-child {
  border: none;
  border-top: 1px solid #dee2e6;
}
.form-check-input:checked {
  background-color: #ae6aaf;
  border-color: #ae6aaf;
}
input:focus,
.form-check-input:checked,
.form-check-input:focus {
  outline: none;
  box-shadow: none;
}
</style>
