import type { Action } from 'svelte/action'

const clickOutside: Action<HTMLElement, () => any> = (node, callback) => {
  const handleClick = (event: MouseEvent) => {
    if (
      node &&
      !node.contains(event.target as Node) &&
      !event.defaultPrevented
    ) {
      callback()
    }
  }

  document.addEventListener('click', handleClick, true)

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true)
    },
  }
}

export default clickOutside
