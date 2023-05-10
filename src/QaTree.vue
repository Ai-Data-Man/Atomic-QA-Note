<!--template是vue视图侧的标签，在这里定义视图模版-->
<template>
    <div class="container">
      <!-- 这里使用vue组件的标签，完成组件嵌套。 :dataset这样的属性，就是vue组件的形式入参props。可以看出，这里vue组件的形式入参props的值是父实例传入的 -->
      <vue-tree style="width: 1000px; height: 600px; border: 1px solid gray;" :dataset="richMediaData" :config="treeConfig">
        <!-- slot插槽是做什么的？插槽可以理解为组件的非属性入参，比如组件B定义了一个slot名为b <template><slot name="实际参数"></template>，那么上层组件A在引入B时，
        可以通过<B>形式入参<B>，向组件B传递值。slot插槽和属性props的最大差别就是这个形式入参原封不动的挪到子组件B的模版视图中接着B再渲染
        -->
        <!--以下使用vslot在向子组件vue-tree的node插槽传递以下模版元素。其中node，collapsed是node插槽所定义的属性参数。可以在vue-tree组件中看到该插槽的定义：
        <slot name="node" v-bind:node="node.data" v-bind:collapsed="node.data._collapsed">
        在vslot中声明一下，表示接下来的传参要引用子组件slot插槽的这两个属性参数
        -->
        <template v-slot:node="{ node, collapsed }">
            <qa-card :node="node" :collapsed="collapsed"></qa-card>
        </template>
      </vue-tree>
    </div>
  </template>
  
  <!--在script这里定义逻辑(数据、事件)。lang="js"指定脚本的语言为javascript，lang还支持typescript等-->
  <script setup lang="js">
  // 如果我们自己封装一个js库的话，可以在js库中新建index.js，并export关键字导出相关符号，这样其他地方使用js库时就可以import我们定义的符号。
  import VueTree from "@ssthouse/vue3-tree-chart";
  import "@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css";
  import QaCard from "./QaCard.vue";
  
  // .vue中export关键字就可以定义并且导出vue组件，此时vue组件的名字就是.vue文件的名字。本质上
  // 一个vue组件其实就是一个可以复用的vue实例，所以它也有data、methods、computed、components等属性，可以在其他vue实例或组件中嵌套来达成复用，
  // 嵌套步骤：第一在一个vue实例中import组件，然后指定为其他vue实例的components属性；第二，在该vue实例的<template>标签中引入组件名标签(通过第一步，相当于引入了一个组件名的自定义标签);
  // 如果不是在.vue文件中定义组件，而是在js文件中定义组件，那么就需要使用Vue.component('组件名', 组件定义)来定义组件，然后在其他vue实例中使用组件名标签来引入组件。
  export default {
    components: { VueTree, QaCard},
    data() {
      return {
        richMediaData: {
          name: 'James',
          value: 800,
          avatar:
            'https://gravatar.com/avatar/db51fdaf64d942180b5200ca37d155a4?s=400&d=robohash&r=x',
          children: [
            {
              name: 'Bob',
              value: 400,
              avatar:
                'https://gravatar.com/avatar/16b3b886b837257757c5961513396a06?s=400&d=robohash&r=x',
              children: [
                {
                  name: 'C1',
                  value: 100,
                  avatar:
                    'https://gravatar.com/avatar/4ee8775f23f12755db978cccdc1356d9?s=400&d=robohash&r=x'
                },
                {
                  name: 'C2',
                  value: 300,
                  avatar:
                    'https://gravatar.com/avatar/d3efa8fa639bdada96a7d0b4372e0a96?s=400&d=robohash&r=x'
                },
                {
                  name: 'C3',
                  value: 200,
                  avatar:
                    'https://gravatar.com/avatar/4905bc3e5dc51a61e3b490ccf1891107?s=400&d=robohash&r=x'
                }
              ]
            },
            {
              name: 'Smith',
              value: 200,
              avatar:
                'https://gravatar.com/avatar/d05d081dbbb513180025300b715d5656?s=400&d=robohash&r=x',
              children: [
                {
                  name: 'S1',
                  value: 230,
                  avatar:
                    'https://gravatar.com/avatar/60c1e69e690d943c5dc06568148debc4?s=400&d=robohash&r=x'
                }
              ]
            },
            {
              name: 'Jackson',
              value: 300,
              avatar:
                'https://gravatar.com/avatar/581f7a711c815d9671c35ebd815ec1e4?s=400&d=robohash&r=x'
            }
          ]
        },
        treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
      }
    }
  };
  
  // let sampleData =  {
  //   value: "1",
  //   children: [
  //     { value: "2", children: [{ value: "4" }, { value: "5" }] },
  //     { value: "3" },
  //   ],
  // };
  // let treeConfig = { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 };
  </script>
  
  
  <style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .rich-media-node {
    width: 80px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: white;
    background-color: #f7c616;
    border-radius: 4px;
  }
  </style>
  