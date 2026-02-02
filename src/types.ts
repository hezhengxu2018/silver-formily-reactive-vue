export interface IObserverOptions {
  forwardRef?: boolean
  scheduler?: (updater: () => void) => void
  name?: string
}
