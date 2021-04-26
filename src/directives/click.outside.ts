

export const clickOutside = {
  bind (el: any, binding: any, vnode: any) {
    el.clickOutsideEvent = (event: any) => {
      // Checks if that click was outside the el and his children
      if (!(el == event.target || el.contains(event.target))) {
        // If it was, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    };
    document.body.addEventListener('mousedown', el.clickOutsideEvent)
  },
  unbind (el: any) {
    document.body.removeEventListener('mousedown', el.clickOutsideEvent)
  }
}