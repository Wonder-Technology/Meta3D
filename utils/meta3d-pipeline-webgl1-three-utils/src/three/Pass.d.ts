import type { Material, WebGLRenderer, WebGLRenderTarget } from 'three';

/*! add by meta3d
* 
*/
export function setThreeAPI(threeAPIObj: any): void


export class Pass {
    constructor();

    isPass: boolean;
    enabled: boolean;
    needsSwap: boolean;
    clear: boolean;
    renderToScreen: boolean;

    setSize(width: number, height: number): void;
    render(
        renderer: WebGLRenderer,
        writeBuffer: WebGLRenderTarget,
        readBuffer: WebGLRenderTarget,
        deltaTime: number,
        maskActive: boolean,
    ): void;

    dispose(): void;
}

export class FullScreenQuad {
    constructor(material?: Material);

    render(renderer: WebGLRenderer): void;
    dispose(): void;

    material: Material;
}