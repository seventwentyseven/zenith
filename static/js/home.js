new Vue({
  el: "#dashboard",
  delimiters: ["<%", "%>"],
  data() {
      return {
          records: 0,
      }
  },
  created() {
      var vm = this;
      vm.GetRecords()
  },
  methods: {
      GetRecords() {
          var vm = this;
          vm.$axios.get(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/web_api/get_records`)
              .then(function (response) {
                  vm.records = response.data.records;
              });
      },
  },
  computed: {
  }
});
