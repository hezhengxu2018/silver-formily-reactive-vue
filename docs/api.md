# API

## observer

### 描述
在 Vue 中，将组件渲染方法变成 Reaction，每次视图重新渲染就会收集依赖，依赖更新会自动重渲染。

### 签名
```ts
interface IObserverOptions {
  scheduler?: (updater: () => void) => void // 调度器，可以手动控制更新时机
  name?: string // 包装后的组件的name
}

interface observer<T extends VueComponent> {
  (component: T, options?: IObserverOptions): T
}
```

### 用例

:::demo
observer
:::

## useObserver <ElTag>推荐</ElTag>

observer的内部实现，目前更推荐使用这种方式，可以减少不必要的组件包裹。

### 签名
```ts
// 与observer一致
interface IObserverOptions {
  scheduler?: (updater: () => void) => void
  name?: string // 包装后的组件的name
}

interface useObserver {
  (options?: IObserverOptions): viod
}
```

### 用例

:::demo
useObserver
:::

## formilyComputed <ElTag>New</ElTag>

将一个 `@formily/reactive`的响应式转为 Vue3 的响应式（ComputedRef）。在Vue3中可以完全替代 `observable.computed`

### 签名

```ts
import type { IReactionOptions } from '@formily/reactive'
import type { ComputedRef } from 'vue'

// options 默认值为 { fireImmediately: true }
interface formilyComputed {
  (tracker: () => T, options?: IReactionOptions): ComputedRef<T>
}
```

### 用例

:::demo
formilyComputed
:::
