




export interface CropperOptions {
  stencil?: {
    aspectRatio?: number;
    minAspectRatio?: number;
    maxAspectRatio?: number;
    resizable?: boolean;
    movable?: boolean;
    scalable?: boolean;
    handlers?: {
      eastNorth?: boolean;
      north?: boolean;
      westNorth: boolean;
      west: boolean;
      westSouth: boolean;
      south: boolean;
      eastSouth: boolean;
      east: boolean;
    };
    class?: string;
  };
  cropper?: {
    autoZoom?: boolean;
    canvas?: boolean;
    stencilSize?: { width: number; height: number };
    checkOrientation?: boolean;
    imageRestriction?: "fill-area" | "fit-area" | "stencil" | "none";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    priority?: "coordinates" | "visible-area";
    resizeImage?: boolean | {
      touch?: boolean;
      wheel?: {
        ratio?: number;
      },
      adjustStencil?: boolean;
    };
    defaultPosition?: { left: number; top: number };
    defaultSize?: { width: number; height: number };
    defaultBoundaries?: "fit" | "fill";
    defaultVisibleArea?: {
      left: number;
      top: number;
      width: number;
      height: number;
    };
  };
};