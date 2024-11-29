export class AttachedPlacementHelper {
  static getPlacement(
    attachedTo: HTMLElement,
    attachmentHeight: number,
    offsetByHeight = true,
  ): Placement {
    let { x, y, height } = attachedTo.getBoundingClientRect();
    let heightOffset = offsetByHeight ? height : 0;
    let viewportHeight = window.innerHeight;
    let canFitBelow = viewportHeight - y > attachmentHeight;

    return {
      top: canFitBelow ? y + heightOffset : null,
      left: x,
      bottom: canFitBelow ? null : viewportHeight - y,
      position: canFitBelow ? PositionEnum.Below : PositionEnum.Above,
    };
  }
}

export enum PositionEnum {
  Above,
  Below,
}

export interface Placement {
  top: number;
  left: number;
  bottom: number;
  position: PositionEnum;
}
