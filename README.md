# Atomic-QA-Note

Atomic-QA-Note是一款Obsidian插件，它的名字“Atomic-QA-Note”的含义是“原子化的问答笔记”。它是一款以 **问答卡** 为最小 笔记/思维 单元的、启发式的、AI辅助的 笔记/思维 工具。

用户可以在任何 markdown 笔记中调用插件提供的应用界面开始问答，每一次问答都是一个**问答卡**，**问答卡**可选择 AI 进行回答, 并可以采纳AI的答案或者自己的答案。一旦确定了一个**问答卡**的答案，就可以由AI通过某种**启发模式**进一步启发出更多后续的“问答卡”，然后继续问答->启发->问答，如此延伸。当这种延伸结束，用户可以将问答卡生成笔记，保存到用户的 Obsidian Vault 中。因为问答本身就是原子化的，所以生成的笔记也是原子化的，这样用户可以将这些原子化的笔记组合成更大的笔记/思维单元。

此外，用户还可以基于上下文开始问答，比如选中的一段文本，或者库内与主题相关的笔记。

该该插件初始提供了 [KG 笔记法](https://forum-zh.obsidian.md/t/topic/2059) 的启发模式。

## 特性列表

### v1.0.0（开发中）

* 在任何 markdown 笔记中调出插件的“问答卡”，提出问题
* 可选 openGPT，支持 openAI 可用的所有模型进行回答或启发
* 支持用户增加自己的答案或者修改 AI 的答案，并采纳一个答案
* 线性的聊天式的启发模式
* 以对话文本方式保存所有问答卡
* 完善上述功能, v1.0.1~?

### v1.1.0（计划开发）

* 增加 [KG 笔记法](https://forum-zh.obsidian.md/t/topic/2059) 启发模式
* 在全部问答结束后，按照用户要求将采纳的内容保存到用户的 Obsidian Vault 中


### v1.2.0（计划开发）
* 启发模式的自定义
* 增加对  [KG 笔记法](https://forum-zh.obsidian.md/t/topic/2059) 中 **关系问答卡** 的 Canvas 可视化展示


## 教程
### 在笔记中开始问答
在你的markdown笔记中任意位置，写下一个代码块，代码块的语言为 `qa-note`：
![Alt text](doc/assets/QACodeBlock.png)
代码块渲染后，就可以看到插件提供的问答界面了，并进行操作，如下图所示（样图，具体界面及功能仍开发中）:
![Alt text](doc/assets/QAUi.png)
