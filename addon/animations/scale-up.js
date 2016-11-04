export default function(isOpen, width, right) {
  return {
    outlet: {
      transform: isOpen ? right ? `translate3d(-${width}px, 0, 0)` : `translate3d(${width}px, 0, 0)` : ''
    },

    menu: {
      transform: isOpen ? '' : `translate3d(0, 0, -${width}px)`
    }
  };
}
