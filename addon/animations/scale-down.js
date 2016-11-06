export default {
  outlet(open, width) {
    return {
      transform: open ? `translate3d(0, 0, -${width}px)` : ''
    };
  }
};
