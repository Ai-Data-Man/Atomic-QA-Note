// shims.d.ts是typescript的声明文件，用于声明一些模块，比如vue文件，让typescript识别它们
// 以下代码用于声明vue文件，让typescript识别它们
declare module '*.vue' {
  import { ComponentOptions, DefineComponent } from 'vue';
  // const componentOptions: ComponentOptions;
  // export default componentOptions;
  const defineComponent: DefineComponent;
  export default defineComponent;
}