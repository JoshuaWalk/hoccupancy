export default function(methodName) {
  return {
    methods: {
      onScroll() {
        if (this.lastPart) return;
        var offset =
          Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) + window.innerHeight;
        var scrollHeight = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        );
        if (offset == scrollHeight) this[methodName].call(this);
      }
    },
  };
}
