<template>
  <ItemDetail />
</template>

<script>
import axios from "axios";
import ItemDetail from "../components/ItemDetail.vue";

export default {
  props: {
    id: Number,
  },
  data() {
    return {
      products: "products",
    };
  },
  // computed: {
  //   articles() {
  //     return this.$store.state.products; // storeから記事データを取得
  //   },
  // },
  created() {
    this.Products();
  },
  methods: {
    Products: function () {
      const vm = this;
      if (vm.id) {
        axios.get("http://localhost:8001/items/" + vm.id).then((response) => {
          vm.products = response.data;
          console.log(vm.id);
          console.log(vm.products);
        });
      }
    },
  },

  // computed: {
  //   ArticleData() {
  //     const dataId = parseInt(this.$route.params.id, 10);
  //     const data = this.$store.state.products.find((a) => a.id === dataId);
  //     return data;
  //   },
  // },
  // components: {
  //   ItemDetail,
  // },
};
</script>
