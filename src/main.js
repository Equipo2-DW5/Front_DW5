import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import BalmUI from 'balm-ui';
import 'balm-ui/dist/balm-ui.css';
import store from './store'
import {  ApolloClient,createHttpLink,InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import { setContext } from 'apollo-link-context';


// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://apigateway-dw5.herokuapp.com/',
})

const authLink = setContext((request, {headers})=>{
    return {
      headers: {
        ...headers,
        'Authorization': store.state.token || ''
      }
    }

})

// Cache implementation
const cache = new InMemoryCache()


const defaultOptions = {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }
// Create the apollo client
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache,
  defaultOptions: defaultOptions
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})


createApp(App).use(BalmUI).use(store).use(router).use(apolloProvider).mount('#app')
