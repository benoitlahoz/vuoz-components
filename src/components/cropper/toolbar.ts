




export const buildToolbar = (component: any) => {

  // Toolbar
  const rotateLeftButton = {
    icon: "rotate_left",
    label: "Rotate left",
    rounded: true,
    name: "vuoz:cropper:rotate:left",
    target: component,
    onDown(target: any) {
      (target as any).rotate(-90);
    },
  };

  const rotateRightButton = {
    icon: "rotate_right",
    label: "Rotate right",
    rounded: true,
    name: "vuoz:cropper:rotate:right",
    target: component,
    onDown(target: any) {
      (target as any).rotate(90);
    },
  };

  const flipHorizontalButton = {
    icon: "flip",
    label: "Flip horizontal",
    rounded: true,
    name: "vuoz:toolbar:flip:horizontal",
    target: component,
    onDown(target: any) {
      (target as any).flip(true, false);
    },
  };

  const flipVerticalButton = {
    icon: "<div style='transform: rotate(-90deg);'>flip</span>",
    label: "Flip vertical",
    rounded: true,
    name: "vuoz:toolbar:flip:vertical",
    target: component,
    onDown(target: any) {
      (target as any).flip(false, true);
    },
  };

  const resetButton = {
    icon: "refresh",
    label: "Reset",
    rounded: true,
    name: "vuoz:toolbar:reset",
    target: component,
    onDown(target: any) {
      (target as any).reset();
    },
  };

  return [
    rotateLeftButton,
    rotateRightButton,
    {
      role: "separator",
    },
    flipHorizontalButton,
    flipVerticalButton,
    {
      role: "spacer",
    },
    resetButton,
  ];

}