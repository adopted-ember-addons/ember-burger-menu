export default function(open, width, right) {
  return {
    outlet: {
      transform: open ? right ? `translate3d(-${width}px, 0, 0)` : `translate3d(${width}px, 0, 0)` : ''
    }
  };
}
