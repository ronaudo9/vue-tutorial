<script>
import axios from "axios";
// import type { products } from "../types/type";
import { useCookies } from "vue3-cookies";
// import type {carts} from "../types/type"

export default {
  props: {
    id: Number,
  },
  data() {
    return {
      products: "products",
      //  as unknown as products,
      carts: "carts",
      favorite: "favorite",
      // buttonState: false,
    };
  },
  // computed: {
  //   articles() {
  //     return this.$store.state.products; // storeから記事データを取得
  //   },
  // },
  created() {
    this.Products(), this.favorites();
  },
  methods: {
    Products: function () {
      const vm = this;
      if (vm.id) {
        axios.get("http://localhost:8001/items/" + vm.id).then((response) => {
          vm.products = response.data;
          const { cookies } = useCookies();
          let cookie = cookies.get("id");
          vm.userId = Number(cookie);
        });
      }
    },
    cart: function () {
      const vm = this;
      if (document.cookie == "") {
        alert("Please sign in");
        this.$router.push({ path: "/signin" });
      } else {
        vm.carts = {
          userId: this.userId,
          itemId: this.products.id,
          name: this.products.name,
          href: this.products.href,
          price: this.products.price,
          imageSrc: this.products.imageSrc,
          imageAlt: this.products.imageAlt,
          deleted: false,
          count: 1,
          subtotal: this.products.subtotal,
        };
        axios.post("http://localhost:8001/carts", vm.carts).then((response) => {
          vm.carts = response.data;
          this.$router.push({ path: "/cart" });
        });
      }
    },
    favorites() {
      let vm = this;
      const { cookies } = useCookies();
      let cookie = cookies.get("id");
      let userId = Number(cookie);
      console.log(userId);
      axios
        .get(
          "http://localhost:8001/favorite" +
            "?" +
            "itemId" +
            "=" +
            vm.id +
            "&" +
            "userId" +
            "=" +
            userId
        )
        .then((response) => {
          let u = response.data;
          if (u.length == 0) {
            return false;
          } else {
            vm.favorite = u;
            console.log(vm.favorite);
          }
        });
    },
    changeState() {
      // this.buttonState = !this.buttonState;
      const vm = this;
      //   if(!this.buttonState){
      //   vm.favorite = {
      //     userId: this.userId,
      //     itemId: this.products.id,
      //     name: this.products.name,
      //     href: this.products.href,
      //     price: this.products.price,
      //     imageSrc: this.products.imageSrc,
      //     imageAlt: this.products.imageAlt,
      //     deleted: false,
      //     count: 1,
      //     subtotal: this.products.subtotal,
      //   };
      //   axios.post("http://localhost:8001/favorite", vm.carts).then((response) => {
      //     vm.favorite = response.data;
      //     console.log(vm.favorite);
      //   });
      // }
      if (this.favorite.length == 1) {
        let vm = this;
        let id2 = Number(this.userId) + "." + Number(this.products.id);
        console.log(id2);
        let id = Number(id2);
        console.log(id);
        const { cookies } = useCookies();
        let cookie = cookies.get("id");
        let userId = Number(cookie);
        axios
          .delete("http://localhost:8001/favorite/" + id)
          .then((response) => {
            console.log(response.data);
            location.reload();
          });
      } else {
        let vm = this;
        let id2 = Number(this.userId) + "." + Number(this.products.id);
        console.log(id2);
        let id = Number(id2);
        console.log(id);
        vm.carts = {
          userId: this.userId,
          itemId: this.products.id,
          name: this.products.name,
          href: this.products.href,
          price: this.products.price,
          imageSrc: this.products.imageSrc,
          imageAlt: this.products.imageAlt,
          deleted: false,
          count: 1,
          subtotal: this.products.subtotal,
          id: id,
        };
        axios
          .post("http://localhost:8001/favorite", vm.carts)
          .then((response) => {
            console.log(response.data);
            location.reload();
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

<template>
  <section class="text-gray-600 body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="lg:w-4/5 mx-auto flex flex-wrap">
        <img
          alt="ecommerce"
          class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
          :src="products.imageSrc"
        />
        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
          <h2 class="text-sm title-font text-gray-500 tracking-widest">NAME</h2>
          <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
            {{ products.name }}
          </h1>

          <!-- <div class="flex mb-4">
            <span class="flex items-center">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-4 h-4 text-indigo-500"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                ></path>
              </svg>
              <span class="text-gray-600 ml-3">4 Reviews</span>
            </span>
            <span
              class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s"
            >
              <a class="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                  ></path>
                </svg>
              </a>
              <a class="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                  ></path>
                </svg>
              </a>
              <a class="text-gray-500">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                  ></path>
                </svg>
              </a>
            </span>
          </div> -->
          <p class="leading-relaxed">
            {{ products.imageAlt }}
          </p>
          <div
            class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5"
          >
            <!-- <div class="flex">
              <span class="mr-3">Color</span>
              <button
                class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
              ></button>
              <button
                class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"
              ></button>
              <button
                class="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"
              ></button>
            </div> -->
            <!-- <div class="flex ml-6 items-center">
              <span class="mr-3">Size</span>
              <div class="relative">
                <select
                  class="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10"
                >
                  <option>SM</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
                <span
                  class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    class="w-4 h-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </div>
            </div> -->
          </div>
          <div class="flex">
            <span class="title-font font-medium text-2xl text-gray-900">{{
              products.price
            }}</span>
            <button
              @click.prevent="cart"
              class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            >
              to cart
            </button>
            <button
              @click.prevent="changeState"
              class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
            >
              <div v-if="this.favorite.length == 1">
                <svg
                  fill="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  ></path>
                </svg>
              </div>
              <div v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="{1.5}"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
