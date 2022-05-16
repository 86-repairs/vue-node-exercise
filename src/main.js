import Vue from 'vue';
import VueApollo from 'vue-apollo';
import ApolloClient from 'apollo-boost';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/'
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  apollo: {},
  apolloProvider,
  render: h => h(App)
}).$mount('#app');
