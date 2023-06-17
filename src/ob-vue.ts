import { 
    //ItemView, 
    MarkdownPostProcessorContext, 
    //WorkspaceLeaf 
} from 'obsidian';
import { 
    createApp
} from 'vue';
// 如果是在js中，则以下import可以简写为import App from './App'，这个简写是ES6 import支持的一个特性;
import App from './App.vue';
// 导入vuetify相关资源。vuetify是一个vue的ui框架，它提供了一套vue的组件库，可以帮助我们快速构建ui界面。
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

//export const VIEW_TYPE = 'my-view';


// ItemView是obsidian的一个类，它是一个抽象类，它继承自View，从源码中我们可以看出，ItemView比View多了一个属性contentEl: HTMLElement，所以ItemView所代表的含义应该是一个以Html为内容的视图。
/*
export class MyView extends ItemView {
    vueapp: VueApp;
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }
    getViewType(): string {
        return VIEW_TYPE;
    }
    getDisplayText(): string {
        return "Vue Stater";
    }
    getIcon(): string {
        return "dice";
    }
    async onOpen() {
        // containerEl是一个div，它是一个容器，它的每个子元素是个div，这个div就容纳我们的vue。
        const container = this.containerEl.children[1];
        container.empty();
        container.createEl("div", {
            cls: "my-plugin-view"
        });
        // 创建一个vue app实例
        this.vueapp = createApp(App);
        // 把vue app实例挂载到容器中
        this.vueapp.mount('.my-plugin-view');
    }
    async onClose() {
        this.vueapp.unmount();
    }
}
*/

export function getMarkDownCodeBlockProcessor() {
    return (source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) => {
        // source是代码块的内容，el是代码块的dom元素，ctx是代码块的上下文
        // console.log(`qa_note processing: source ${source}, el ${el}, ctx ${ctx}`);
        // 创建一个vue实例。等同于const vueapp = new Vue(el : null, render: h => h(App)});
        // 一个vue实例本质上是一个中间件，它可以挂载到一个dom元素上（可以连接视图)，同时又可以和数据连接，
        // 它是一个观察者，可以监测数据或视图，当其中监听的一方变动时，同步更新另外一方。
        const vueapp = createApp(App);
        //console.log(`qa_note vueapp created, ${vueapp}`);
        // 使用vuetify
        vueapp.use(vuetify);
        // 使用RelationGraph 
         // 把vue实例挂载到el上
        vueapp.mount(el);
    };
}
