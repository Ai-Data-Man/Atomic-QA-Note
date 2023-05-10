// 导入obsidian Api的各种类和接口、对象
import {
    //App,
    //
    //Modal,
    //Notice,
    Plugin,
    //PluginSettingTab,
    //Setting
} from 'obsidian';

// 使用ob.vue模块中的类、接口、函数来将vue组件引入到我们的插件中
import {
    //MyView, 
    //VIEW_TYPE, 
    getMarkDownCodeBlockProcessor
} from './ob-vue'

// TODO 记得重命名这些类和接口！

interface AtomicQaNotePluginSettings {
    pluginSetting: string;
}

const DEFAULT_SETTINGS: AtomicQaNotePluginSettings = {
    pluginSetting: 'default'
}

// export关键字导出我们的插件类，以便Obsidian可以导入并使用它。
export default class AtomicQaNotePlugin extends Plugin {
    settings: AtomicQaNotePluginSettings;

    // 以下函数将会在插件启动时被obsidian触发。该函数是重写自obsidian的Plugin类(是个抽象类)的同签名可选函数。
    async onload() {
        //console.log("qa plugin load");
        // 等待配置加载完毕
        await this.loadSettings();
        // View即视图，在obsidian api中是个最基本的类，视图将决定如何展现内容，文件管理器、知识图谱或者markdown编辑器都是视图的一种。
        // registerView()是obsidian的Plugin类的一个方法，它用于注册一个新的视图类型。
        // 第一个参数是视图类型的唯一标识符。通过该标识符，借助getLeavesOfType()方法，我们可以获取到该视图的实例。
        // 第二个参数是一个函数，起到视图工厂的作用，该函数将会在obsidian需要创建一个新的视图时被触发。
        // ! 不要在插件中管理视图的引用。Obsidian 可能会多次调用视图工厂函数。为避免在视图中产生副作用，在需要访问视图实例时请使用getLeavesOfType()。
        // 以下语句将会注册我们自己开发的vue视图
        /**
        this.registerView(
            VIEW_TYPE,
            // leaf是obsidian的WorkspaceLeaf类的一个实例。WorkSpace是个类，代表工作区，它是obsidian的核心概念之一，指的就是我们在obsidian中看到的整个界面。
            // 工作区的整个数据结构是用树来表示的，而WorkSpaceLeaf就是树的叶子节点，代表一个不可分的界面窗口。
            // 以下视图工厂函数，会用leaf作为参数，创建一个新的视图实例。这样，就绑定了窗口和视图。
            (leaf) => new MyView(leaf)
        )        
        */
        // 以下语句注册一个markdown代码块后置处理器。注册的处理器识别语言标记为qa_note的代码块，将其渲染为一个vue应用实例。
        console.log("qa plugin register processor");
        this.registerMarkdownCodeBlockProcessor("qa-note",getMarkDownCodeBlockProcessor());
        // 以下语句将会在obsidian的右侧面板中添加一个按钮，点击该按钮，就会触发回调里的activateView()函数，从而打开我们自己开发的vue视图。
        /**
        this.addRibbonIcon('dice', 'Open my view', (evt) => {
            this.activateView()
        })
        */

    }

    onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE)
    }

    // 以下函数不是重写自obsidian的Plugin类，是在我们自己插件类定义的。
    async loadSettings() {
        // loadData()是obsidian的Plugin类的一个方法，它会从本地存储中读取数据。以下语句将会合并默认设置和本地存储中的设置。
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    /**
    async activateView() {
        if (this.app.workspace.getLeavesOfType(VIEW_TYPE).length === 0) {
            await this.app.workspace.getRightLeaf(false).setViewState({
                type: VIEW_TYPE,
                active: true,
            })
        }

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType(VIEW_TYPE)[0]
        )
    }
    */
}


