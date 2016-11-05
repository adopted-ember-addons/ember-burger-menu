export default function(open, width /*, right*/) {
  return {
    outlet: {
      transform: open ? `translate3d(0, 0, -${width}px)` : ''
    }
  };
}
