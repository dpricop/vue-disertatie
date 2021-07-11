<template>
  <h1 class="bg-light py-2 py-md-3 px-5 my-0">Tasks</h1>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            v-model="name"
            :class="[
              v$.name.$dirty == true && v$.name.$errors.length > 0
                ? 'is-invalid'
                : '',
              v$.name.$dirty == true && v$.name.$errors.length == 0
                ? 'is-valid'
                : '',
            ]"
            @blur="v$.name.$touch()"
          />
          <label>Name</label>
          <div
            :class="[
              v$.name.$dirty == true && v$.name.$errors.length > 0
                ? 'invalid-feedback'
                : 'valid-feedback',
            ]"
            v-if="v$.name.$errors.length > 0"
          >
            {{ v$.name.$errors[0].$message }}
          </div>
        </div>

        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            placeholder="Email"
            v-model="email"
            :class="[
              v$.email.$dirty == true && v$.email.$errors.length > 0
                ? 'is-invalid'
                : '',
              v$.email.$dirty == true && v$.email.$errors.length == 0
                ? 'is-valid'
                : '',
            ]"
            @blur="v$.email.$touch()"
          />
          <label for="floatingPassword">Email</label>
          <div
            :class="[
              v$.email.$dirty == true && v$.email.$errors.length > 0
                ? 'invalid-feedback'
                : 'valid-feedback',
            ]"
            v-if="v$.email.$errors.length > 0"
          >
            {{ v$.email.$errors[0].$message }}
          </div>
        </div>

        <!-- <input
          v-model="newTask"
          class="form-control"
          :class="[
            v$.newTask.$dirty == true && v$.newTask.$errors.length > 0
              ? 'is-invalid'
              : '',
            v$.newTask.$dirty == true && v$.newTask.$errors.length == 0
              ? 'is-valid'
              : '',
          ]"
          @blur="v$.newTask.$touch()"
        />
        <div
          :class="[
            v$.newTask.$dirty == true && v$.newTask.$errors.length > 0
              ? 'invalid-feedback'
              : 'valid-feedback',
          ]"
          v-if="v$.newTask.$errors.length > 0"
        >
          {{ v$.newTask.$errors[0].$message }}
        </div> -->
        <div class="row">
          <div class="col-3">
            <pre>
            {{ v$ }}
          </pre
            >
          </div>
          <div class="col-3">
            <pre>
            {{ v$.name }}
          </pre
            >
          </div>
          <div class="col-3">
            <pre>
            {{ v$.email }}
          </pre
            >
          </div>
        </div>
      </div>

      <div class="col-auto col-sm-10 col-md-8 col-xl-6 bg-white">
        <div id="tasks_table">
          <div class="tasks_table_head pt-3">
            <div class="input-group">
              <input
                type="text"
                class="form-control form-control-sm"
                placeholder="Create task"
                v-on:keyup.enter="createTask"
                v-model="newTask"
              />
              <button class="input-group-text btn-sm" @Click="reload">
                <i class="cil-reload"></i>
              </button>
              <button class="input-group-text btn-sm" @Click="createTask">
                <i class="cil-plus"></i>
              </button>
            </div>
          </div>

          <div class="tasks_table_body my-2">
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
            <div class="d-flex justify-content-between mb-3">
              <div class="spinner-grow spinner-grow-sm" role="status"></div>
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
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  email,
  minLength,
  maxLength,
  helpers,
} from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data: function(e) {
    return {
      newTask: "",
      name: "",
      email: "",
      dataSource: [],
    };
  },
  mounted() {
    this.reload();
  },
  methods: {
    createTask() {
      const data = new FormData();
      data.append("values", JSON.stringify({ NotitaDesc: this.newTask }));
      this.axios
        .post("http://localhost:8080/CrmListaNotite/Create", data)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1) {
            this.reload();
            this.newTask = null;
          }
        })
        .catch((error) => console.log(error));
    },
    reload() {
      this.axios
        .get("http://localhost:8080/CrmListaNotite/get")
        .then((response) => (this.dataSource = response.data))
        .catch((error) => console.log(error));
    },
    deleteTask(task, index) {
      this.axios
        .delete("http://localhost:8080/CrmListaNotite/Delete/" + task.IdNotita)
        .then((response) => {
          if (response.data.status == 1 && response.data.count == 1)
            this.dataSource.splice(index, 1);
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
      var unfinishedTasks = this.dataSource.filter(
        (item) => item.EFinalizata == false
      );
      this.dataSource = unfinishedTasks;
    },
  },

  validations() {
    return {
      // newTask: {
      //   // required: helpers.withMessage("REQUIRED", required),
      //   // email: helpers.withMessage("EMAIL", email),
      //   // minLength: helpers.withMessage("minLength", minLength(15)),
      //   // maxLength: helpers.withMessage("maxLength", maxLength(55)),
      //   // required,
      //   // email,
      //   // minLength: minLength(2),
      //   // maxLength: maxLength(10),
      // }, // Matches this.firstName

      name: {
        // required: helpers.withMessage("REQUIRED", required),
        // email: helpers.withMessage("EMAIL", email),
        // minLength: helpers.withMessage("minLength", minLength(15)),
        // maxLength: helpers.withMessage("maxLength", maxLength(55)),
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
      },

      email: {
        // required: helpers.withMessage("REQUIRED", required),
        // email: helpers.withMessage("EMAIL", email),
        // minLength: helpers.withMessage("minLength", minLength(15)),
        // maxLength: helpers.withMessage("maxLength", maxLength(55)),
        minLength: minLength(5),
        required,
        email,
        maxLength: maxLength(55),
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
