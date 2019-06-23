export const dispatchEvent = (name, detail = {}) => {
  window.dispatchEvent(
    new CustomEvent(name, {
      detail,
    })
  );
};
