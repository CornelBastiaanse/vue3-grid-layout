import { App } from 'vue';
import { default as GridLayout } from './Grid/GridLayout.vue';
import { default as GridItem } from './Grid/GridItem.vue';

export { GridItem, GridLayout };
declare const Vue3GridLayout: {
    install(App: App<any>): void;
};
export default Vue3GridLayout;
