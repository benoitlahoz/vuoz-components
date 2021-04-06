export const toolbarItems = {
  border: true,
  rounded: true,
  buttons: [
    {
      icon: "swap_vert",
      label: "Sort",
      name: "vuoz:console:sort",
    },
    {
      icon: "functions",
      label: "Show / Hide caller",
      type: 'toggle',
      toggle: 'secondary',
      toggled: true,
      name: "vuoz:console:caller"
    },
    {
      role: "spacer",
    },
    {
      icon: "save",
      label: "Save",
      name: "vuoz:toolbar:save"
    },
  ]
};