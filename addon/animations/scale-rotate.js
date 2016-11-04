export default function(isOpen, width, right) {
  return {
    outlet: {
      transform: isOpen ? right ?  `translate3d(-100px, 0, -${width * 2}px) rotateY(20deg)` :  `translate3d(100px, 0, -${width * 2}px) rotateY(-20deg)` : ''
    }
  };
}
