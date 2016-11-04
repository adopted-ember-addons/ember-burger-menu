export default function(isOpen, width /*, right*/) {
  return {
    outlet: {
      transform: isOpen ? `translate3d(0, 0, -${width}px)` : ''
    }
  };
}
