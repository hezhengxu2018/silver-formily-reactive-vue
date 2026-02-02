import type { ComponentInternalInstance } from 'vue'
import type { IObserverOptions } from '../types'
import { Tracker } from '@formily/reactive'
import { getCurrentInstance, onBeforeUnmount } from 'vue'

type UpdateJob = NonNullable<ComponentInternalInstance['update']>

const OBSERVER_DISPOSE_MAP = new WeakMap<ComponentInternalInstance, () => void>()
const DEFAULT_SCHEDULER = (job: () => void) => job()

export function useObserver(options?: IObserverOptions) {
  const vm = getCurrentInstance()
  if (!vm) {
    throw new Error('useObserver must be called within a setup function.')
  }

  if (OBSERVER_DISPOSE_MAP.has(vm)) {
    return
  }

  const runScheduler
    = typeof options?.scheduler === 'function' ? options.scheduler : DEFAULT_SCHEDULER

  const originalUpdate: UpdateJob = vm.update

  const tracker = new Tracker(() => {
    runScheduler(() => {
      vm.update()
    })
  })

  const trackedUpdate: UpdateJob = () => {
    tracker.track(() => {
      originalUpdate()
    })
  }

  vm.update = trackedUpdate

  const dispose = () => {
    if (OBSERVER_DISPOSE_MAP.get(vm) !== dispose) {
      return
    }
    tracker.dispose()
    vm.update = originalUpdate
    OBSERVER_DISPOSE_MAP.delete(vm)
  }

  OBSERVER_DISPOSE_MAP.set(vm, dispose)
  onBeforeUnmount(dispose)
}
