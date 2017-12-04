
import { configureStore as prodConfigureStore } from './configureStore.prod';
import { configureStore as devConfigureStore } from './configureStore.dev';

export let configureStore = {};

if (process.env.NODE_ENV === 'production') {
    configureStore = prodConfigureStore;
} else {
    configureStore = devConfigureStore;
}
