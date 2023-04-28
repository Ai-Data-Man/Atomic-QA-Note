// 导入obsidian Api的各种类和接口、对象
import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';


// TODO 记得重命名这些类和接口！

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

// export关键字导出我们的插件类，以便Obsidian可以导入并使用它。
export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	// 以下函数将会在插件启动时被obsidian触发。
	async onload() {
		await this.loadSettings();

		// 以下语句将会在obsidian左侧功能区中创建一个图标。
		const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
			// 该回调函数中的下面语句将会在用户点击图标时被触发。
			new Notice('This is a notice!'); // 该语句将会在obsidian右上角屏幕显示一个通知。
		});
		// 为功能区添加CSS样式以控制功能区的显示和布局
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// 以下语句将会在obsidian底部状态栏中创建一个图标。
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');

		// 以下语句为插件添加一个简单的Obsidian命令，可以在任何地方触发
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				new SampleModal(this.app).open();
			}
		});
		// 以下语句将为当前的编辑器实例添加一个命令，可以在编辑器中触发
		this.addCommand({
			id: 'sample-editor-command',
			name: 'Sample editor command',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection('Sample Editor Command');
			}
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		// 以下语句将为当前的编辑器实例添加了一个能打开复杂示例模态框的命令
		this.addCommand({
			id: 'open-sample-modal-complex',
			name: 'Open sample modal (complex)',
			// 该回调函数会被Obsidian调用两次:第一次checking为true，用于检查命令是否可用; 第二次checking为false, 用于实际执行命令
			checkCallback: (checking: boolean) => {
				// 从当前obsidian中尝试获取一个view类型为MarkDown的已激活视图
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					if (!checking) {
						// 如果获取到了视图，就在第二次调用时打开模态框
						new SampleModal(this.app).open();
					}
					// 如果获取到了视图，就在第一次调用时返回true，表示命令可用
					return true;
				}
			}
		});

		// 以下语句将为插件添加一个设置选项卡，以便用户可以配置插件的各个方面
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// 以下语句为插件注册一个全局的DOM事件监听器，当用户点击页面时，该监听器会被触发，如果插件被禁用，该监听器会被自动删除
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

	
		// 以下语句为插件注册一个全局的定时器，当时点达到时，定时器会自动被触发，如果插件被禁用，该定时器会被自动删除
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	// 以下函数将会在插件被禁用时被obsidian触发
	onunload() {

	}

	// 以下函数将会在插件设置被加载时被obsidian触发
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

    // 以下函数将会在插件设置被保存时被obsidian触发
	async saveSettings() {
		await this.saveData(this.settings);
	}
}

// 以下是我们自定义的一个模态框的复杂示例
class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

// 以下是我们自定义的一个设置选项卡的示例
class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
