import { state as meta3dState, packageProtocolName, canvasData } from "meta3d-type"
import { ecsConfig, scene } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { service as uiService, texture } from "meta3d-ui-protocol/src/service/ServiceType"

type addToFuncs = (meta3dState: meta3dState, func: (meta3dState: meta3dState) => Promise<meta3dState>) => Promise<meta3dState>

type ui = uiService

type event = any

export type uiTexture = texture

export type configData = [canvasData, { isDebug: boolean, clearColor: [number, number, number, number], skinName: nullable<string> }]


export type initTarget = "visual" | "visualRun"

type initData = {
	target: initTarget,
	isDebug: boolean,
	canvas: HTMLCanvasElement
}

export type updateData = { clearColor: [number, number, number, number], time: number, skinName: nullable<string> }

export type service = {
	scene: (meta3dState: meta3dState) => scene,
	ui: (meta3dState: meta3dState) => ui,
	event: (meta3dState: meta3dState) => event,
	// initForVisual: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	// initForVisualRun: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	init: (meta3dState: meta3dState, initData: initData) => Promise<meta3dState>,
	update: (meta3dState: meta3dState, updateData: updateData) => Promise<meta3dState>,
	render: (meta3dState: meta3dState) => Promise<meta3dState>,
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig, gl: nullable<webgl1Context>, canvas: HTMLCanvasElement) => meta3dState,
	loadScene: (meta3dState: meta3dState, sceneGLB: ArrayBuffer) => Promise<meta3dState>,
	addToPrepareFuncs: (meta3dState: meta3dState, func: (meta3dState: meta3dState, isDebug: boolean, canvas: HTMLCanvasElement) => meta3dState) => meta3dState,
	addToInitFuncs: addToFuncs,
	addToUpdateFuncs: addToFuncs,
	addToRenderFuncs: addToFuncs,
	getPluggablePackageService: <service> (meta3dState: meta3dState, packageProtocolName: packageProtocolName) => nullable<service>,
	run: (meta3dState: meta3dState, [canvasData, configData]: configData) => void,
}