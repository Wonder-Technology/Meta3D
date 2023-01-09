// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class webgl1Context { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class program { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class buffer { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type attributeLocation = number;

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class uniformLocation { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class shader { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:max-classes-per-file 
// tslint:disable-next-line:class-name
export abstract class extension { protected opaque!: any }; /* simulate opaque types */

// tslint:disable-next-line:interface-over-type-literal
export type contextConfigJsObj = {
  readonly alpha: boolean; 
  readonly depth: boolean; 
  readonly stencil: boolean; 
  readonly failIfMajorPerformanceCaveat: boolean; 
  readonly powerPreference: string; 
  readonly antialias: boolean; 
  readonly premultipliedAlpha: boolean; 
  readonly preserveDrawingBuffer: boolean
  readonly desynchronized: boolean
};

// tslint:disable-next-line:interface-over-type-literal
export type canvas = HTMLCanvasElement;

// tslint:disable-next-line:interface-over-type-literal
export type service = {
  readonly getContext: (_1:canvas, _2:contextConfigJsObj) => webgl1Context; 
  readonly createProgram: (_1:webgl1Context) => program; 
  readonly linkProgram: (_1:program, _2:webgl1Context) => void; 
  readonly useProgram: (_1:program, _2:webgl1Context) => void; 
  readonly uniformMatrix4fv: (_1:uniformLocation, _2:Float32Array, _3:webgl1Context) => void; 
  readonly uniform1i: (_1:uniformLocation, _2:number, _3:webgl1Context) => void; 
  readonly uniform1f: (_1:uniformLocation, _2:number, _3:webgl1Context) => void; 
  readonly uniform3f: (_1:uniformLocation, _2:number, _3:number, _4:number, _5:webgl1Context) => void; 
  readonly getAttribLocation: (_1:program, _2:string, _3:webgl1Context) => attributeLocation; 
  readonly getUniformLocation: (_1:program, _2:string, _3:webgl1Context) => uniformLocation; 
  readonly shaderSource: (_1:shader, _2:string, _3:webgl1Context) => void; 
  readonly compileShader: (_1:shader, _2:webgl1Context) => void; 
  readonly createShader: (_1:number, _2:webgl1Context) => shader; 
  readonly getParameter: (_1:number, _2:webgl1Context) => number; 
  readonly getLinkStatus: (_1:webgl1Context) => number; 
  readonly getShaderParameter: (_1:shader, _2:number, _3:webgl1Context) => boolean; 
  readonly getProgramParameter: (_1:program, _2:number, _3:webgl1Context) => boolean; 
  readonly getShaderInfoLog: (_1:shader, _2:webgl1Context) => string; 
  readonly getProgramInfoLog: (_1:program, _2:webgl1Context) => string; 
  readonly attachShader: (_1:program, _2:shader, _3:webgl1Context) => void; 
  readonly deleteShader: (_1:shader, _2:webgl1Context) => void; 
  readonly bindAttribLocation: (_1:program, _2:number, _3:string, _4:webgl1Context) => void; 
  readonly getCompileStatus: (_1:webgl1Context) => number; 
  readonly getVertexShader: (_1:webgl1Context) => number; 
  readonly getFragmentShader: (_1:webgl1Context) => number; 
  readonly createBuffer: (_1:webgl1Context) => buffer; 
  readonly bindBuffer: (_1:number, _2:buffer, _3:webgl1Context) => void; 
  readonly bufferFloat32Data: (_1:number, _2:Float32Array, _3:number, _4:webgl1Context) => void; 
  readonly bufferUint16Data: (_1:number, _2:Uint16Array, _3:number, _4:webgl1Context) => void; 
  readonly bufferUint32Data: (_1:number, _2:Uint32Array, _3:number, _4:webgl1Context) => void; 
  readonly getArrayBuffer: (_1:webgl1Context) => number; 
  readonly getElementArrayBuffer: (_1:webgl1Context) => number; 
  readonly getStaticDraw: (_1:webgl1Context) => number; 
  readonly getDynamicDraw: (_1:webgl1Context) => number; 
  readonly disableVertexAttribArray: (_1:number, _2:webgl1Context) => void; 
  readonly vertexAttribPointer: (_1:attributeLocation, _2:number, _3:number, _4:boolean, _5:number, _6:number, _7:webgl1Context) => void; 
  readonly enableVertexAttribArray: (_1:attributeLocation, _2:webgl1Context) => void; 
  readonly getExtension: (_1:string, _2:webgl1Context) => (null | undefined | extension); 
  readonly drawElements: (_1:number, _2:number, _3:number, _4:number, _5:webgl1Context) => void; 
  readonly clearColor: (_1:number, _2:number, _3:number, _4:number, _5:webgl1Context) => void; 
  readonly clear: (_1:number, _2:webgl1Context) => void; 
  readonly getColorBufferBit: (_1:webgl1Context) => number; 
  readonly getDepthBufferBit: (_1:webgl1Context) => number; 
  readonly getStencilBufferBit: (_1:webgl1Context) => number; 
  readonly enable: (_1:number, _2:webgl1Context) => void; 
  readonly disable: (_1:number, _2:webgl1Context) => void; 
  readonly getFloat: (_1:webgl1Context) => number; 
  readonly getDepthTest: (_1:webgl1Context) => number; 
  readonly getStencilTest: (_1:webgl1Context) => number; 
  readonly getBlend: (_1:webgl1Context) => number; 
  readonly getCullFace: (_1:webgl1Context) => number; 
  readonly getFrontAndBack: (_1:webgl1Context) => number; 
  readonly getBack: (_1:webgl1Context) => number; 
  readonly getFront: (_1:webgl1Context) => number; 
  readonly getCurrentProgram: (_1:webgl1Context) => number; 
  readonly getBindingElementArrayBuffer: (_1:webgl1Context) => number; 
  readonly getBindingArrayBuffer: (_1:webgl1Context) => number; 
  readonly getSrcAlpha: (_1:webgl1Context) => number; 
  readonly getOneMinusSrcAlpha: (_1:webgl1Context) => number; 
  readonly isEnabled: (_1:number, _2:webgl1Context) => boolean; 
  readonly bindVertexArrayOES: (_1:(null | undefined | buffer), _2:webgl1Context) => void; 
  readonly blendFunc: (_1:number, _2:number, _3:webgl1Context) => void; 
  readonly getTriangles: (_1:webgl1Context) => number; 
  readonly getTriangleFan: (_1:webgl1Context) => number; 
  readonly getUnsignedInt: (_1:webgl1Context) => number; 
  readonly getUnsignedShort: (_1:webgl1Context) => number
};
