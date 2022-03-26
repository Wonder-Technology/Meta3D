import { state as meta3dState } from "meta3d-type"
import { getWorkPluginContribute } from "./Main";
import { prepare as prepareMeta3D, registerExtension, getExtensionService, getExtensionState, setExtensionState } from "meta3d"
import { prepare as prepareEngine, init as initEngine, update as updateEngine, render as renderEngine } from "engine-facade/src/DirectorAPI"
import { addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, createGameObject } from "engine-facade/src/GameObjectAPI"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { getExtensionService as getWebGL1ExtensionService, createExtensionState as createWebGL1ExtensionState } from "meta3d-webgl1"
import { getExtensionService as getRegisterECSWorkerExtensionService, createExtensionState as createRegisterECSWorkerExtensionState } from "meta3d-register-ecs-worker"
// import { service as registerECSWorkerService } from "meta3d-register-ecs-worker-protocol/src/service/ServiceType"
import { createGeometry, setIndices, setVertices } from "engine-facade/src/GeometryAPI"
import { createPBRMaterial, setDiffuseColor } from "engine-facade/src/PBRMaterialAPI"
import { createTransform, setLocalPosition, lookAt } from "engine-facade/src/TransformAPI"
import { createBasicCameraView, active } from "engine-facade/src/BasicCameraViewAPI"
import { createPerspectiveCameraProjection, setAspect, setFar, setNear, setFovy } from "engine-facade/src/PerspectiveCameraProjectionAPI"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";


// function _registerWorkPlugins() {
// 	registerWorkPlugin(getData(), [
// 		{
// 			pipelineName: "init",
// 			insertElementName: "init_root_engine",
// 			insertAction: "after"
// 		},
// 		// {
// 		// 	pipelineName: "render",
// 		// 	insertElementName: "render_root_engine",
// 		// 	insertAction: "before"
// 		// }
// 	]);
// }

function _getEngineCoreExtensionName(): string {
	return "meta3d-engine-core"
}

function _getMeta3DBsMostExtensionName(): string {
	return "meta3d-bs-most"
}

function _getMeta3DWebGL1ExtensionName(): string {
	return "meta3d-webgl1"
}

function _getMeta3DRegisterECSWorkerExtensionName(): string {
	return "meta3d-register-ecs-worker"
}

function _registerWorkPlugins(engineCoreState: engineCoreState, isDebug: boolean, meta3dState: meta3dState) {
	let { registerWorkPlugin } = getExtensionService<engineCoreService>(meta3dState, _getEngineCoreExtensionName())
	let mostService: mostService = getExtensionService(meta3dState, _getMeta3DBsMostExtensionName())
	let meta3dWebGL1Service: webgl1Service = getExtensionService(meta3dState, _getMeta3DWebGL1ExtensionName())
	let engineCoreService: engineCoreService = getExtensionService(meta3dState, _getEngineCoreExtensionName())

	engineCoreState =
		registerWorkPlugin(
			engineCoreState,
			getWorkPluginContribute({ isDebug, mostService: mostService, webgl1Service: meta3dWebGL1Service, engineCoreService: engineCoreService }),
			[
				{
					pipelineName: "init",
					insertElementName: "init_root_meta3d",
					insertAction: "after"
				},
				// {
				// 	pipelineName: "render",
				// 	insertElementName: "render_root_meta3d",
				// 	insertAction: "before"
				// }
			]
		)

	return engineCoreState
}

// function _setPluginData({ canvas, isDebug }: { canvas: HTMLCanvasElement, isDebug: boolean }) {
// 	setCanvasDirector(canvas)

// 	setIsDebugDirector(isDebug)
// }

// function _createCubeGameObject() {
// 	let gameObject = createGameObject();
// 	let geometry = createGeometry();
// 	let vertices = new Float32Array([
// 		1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
// 		1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
// 		1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
// 		-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
// 		-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
// 		-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
// 	])

// 	let indices = new Uint32Array([
// 		0, 1, 2, 0, 2, 3,
// 		4, 5, 6, 4, 6, 7,
// 		8, 9, 10, 8, 10, 11,
// 		12, 13, 14, 12, 14, 15,
// 		16, 17, 18, 16, 18, 19,
// 		20, 21, 22, 20, 22, 23
// 	])
// 	setVertices(geometry, vertices);
// 	setIndices(geometry, indices);
// 	addGeometry(gameObject, geometry);

// 	let material = createPBRMaterial();
// 	setDiffuseColor(material, [1.0, 0.0, 0.0]);
// 	addPBRMaterial(gameObject, material);

// 	return gameObject;
// }

// let _createCameraGameObject = () => {
// 	let gameObject = createGameObject();

// 	let arcballCameraController = getSceneGraphRepoExn().arcballCameraControllerRepo.create();
// 	addArcballCameraController(gameObject, arcballCameraController);


// 	let cameraView = createBasicCameraView();
// 	active(cameraView);
// 	addBasicCameraView(gameObject, cameraView);

// 	let cameraProjection = createPerspectiveCameraProjection();
// 	setFovy(cameraProjection, 30);
// 	setAspect(cameraProjection, 1);
// 	setNear(cameraProjection, 1);
// 	setFar(cameraProjection, 100);
// 	addPerspectiveCameraProjection(gameObject, cameraProjection);

// 	let transform = getExn(getTransform(gameObject))

// 	setLocalPosition(transform, [10, 10, 10])
// 	lookAt(transform, [0, 1, 0])

// 	return gameObject;
// }

function _createCubeGameObject(engineCoreState: engineCoreState, engineCoreService: engineCoreService) {
	let data = createGameObject(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let gameObject = data[1]


	data = createTransform(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let transform = data[1]

	engineCoreState = addTransform(engineCoreState, engineCoreService, gameObject, transform)



	data = createGeometry(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let geometry = data[1]

	let vertices = new Float32Array([
		1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
		1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
		1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
		-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
		-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
		-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
	])

	let indices = new Uint32Array([
		0, 1, 2, 0, 2, 3,
		4, 5, 6, 4, 6, 7,
		8, 9, 10, 8, 10, 11,
		12, 13, 14, 12, 14, 15,
		16, 17, 18, 16, 18, 19,
		20, 21, 22, 20, 22, 23
	])
	engineCoreState = setVertices(engineCoreState, engineCoreService, geometry, vertices)
	engineCoreState = setIndices(engineCoreState, engineCoreService, geometry, indices)
	engineCoreState = addGeometry(engineCoreState, engineCoreService, gameObject, geometry)

	data = createPBRMaterial(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let material = data[1]
	engineCoreState = setDiffuseColor(engineCoreState, engineCoreService, material, [1.0, 0.0, 0.0])
	engineCoreState = addPBRMaterial(engineCoreState, engineCoreService, gameObject, material)

	return engineCoreState
}


let _createCameraGameObject = (engineCoreState: engineCoreState, engineCoreService: engineCoreService) => {
	let data = createGameObject(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let gameObject = data[1]


	data = createTransform(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let transform = data[1]

	engineCoreState = addTransform(engineCoreState, engineCoreService, gameObject, transform)

	data = createBasicCameraView(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let cameraView = data[1]

	engineCoreState = active(engineCoreState, engineCoreService, cameraView)
	engineCoreState = addBasicCameraView(engineCoreState, engineCoreService, gameObject, cameraView)

	data = createPerspectiveCameraProjection(engineCoreState, engineCoreService)
	engineCoreState = data[0]
	let cameraProjection = data[1]

	engineCoreState = setFovy(engineCoreState, engineCoreService, cameraProjection, 30)
	//     engineCoreState = setAspect(engineCoreState, engineCoreService, cameraProjection, canvas.width / canvas.height)
	engineCoreState = setAspect(engineCoreState, engineCoreService, cameraProjection, 1)
	engineCoreState = setNear(engineCoreState, engineCoreService, cameraProjection, 1)
	engineCoreState = setFar(engineCoreState, engineCoreService, cameraProjection, 100)
	engineCoreState = addPerspectiveCameraProjection(engineCoreState, engineCoreService, gameObject, cameraProjection)


	engineCoreState = setLocalPosition(engineCoreState, engineCoreService, transform, [10, 10, 10])
	engineCoreState = lookAt(engineCoreState, engineCoreService, transform, [0, 1, 0])

	return engineCoreState
}

function _createScene(engineCoreState: engineCoreState, engineCoreService: engineCoreService) {
	engineCoreState = _createCubeGameObject(engineCoreState, engineCoreService)
	engineCoreState = _createCameraGameObject(engineCoreState, engineCoreService)

	return engineCoreState
}

// prepare();
// setSceneGraphRepo(buildSceneGraphRepo())

// let { setCanvas, setIsDebug, setComponentCount, setGlobalTempData, createAndSetAllComponentPOs } = getSceneGraphRepoExn()

// let canvas = {
// 	style: {
// 		width: "800px",
// 		height: "800px"
// 	}
// } as any as HTMLCanvasElement;

// setCanvas(canvas as any);

// setIsDebug(true);

// setComponentCount({
// 	transformCount: 10,
// 	geometryCount: 10,
// 	geometryPointCount: 100,
// 	pbrMaterialCount: 10,
// 	directionLightCount: 1
// })

// setGlobalTempData({
// 	float9Array1: new Float32Array(), float32Array1: new Float32Array()
// })

// createAndSetAllComponentPOs()

// _setPluginData({
// 	canvas: canvas,
// 	isDebug: true
// })



function _init(meta3dState: meta3dState, isDebug: boolean) {
	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DWebGL1ExtensionName(),
			getWebGL1ExtensionService,
			null,
			createWebGL1ExtensionState()
		)

	meta3dState =
		registerExtension(
			meta3dState,
			_getMeta3DRegisterECSWorkerExtensionName(),
			getRegisterECSWorkerExtensionService,
			null,
			createRegisterECSWorkerExtensionState()
		)

	let engineCoreState = getExtensionState<engineCoreState>(meta3dState, _getEngineCoreExtensionName())

	engineCoreState = _registerWorkPlugins(engineCoreState, isDebug, meta3dState)

	engineCoreState = _createScene(engineCoreState, getExtensionService(meta3dState, _getEngineCoreExtensionName()))


	meta3dState = setExtensionState(meta3dState, _getEngineCoreExtensionName(), engineCoreState)

	return initEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
		console.log("finish init engine")

		return meta3dState
	})
}


// function _frame() {
// 	update().then(() => {
// 		render().then(() => { })
// 	})
// }

// _registerWorkPlugins();

// _createScene();

// init().then(() => {
// 	console.log("finish init on worker thread");
// })


function _loop(meta3dState: meta3dState) {
	updateEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
		renderEngine(meta3dState, _getEngineCoreExtensionName()).then((meta3dState) => {
			requestAnimationFrame(() => {
				_loop(meta3dState)
			})
		})
	})
}

// _init().then(_loop)

let isDebug = true

let meta3dState_ = prepareMeta3D()

meta3dState_ = prepareEngine(meta3dState_,
	_getEngineCoreExtensionName(),
	{
		isDebug: isDebug,
		float9Array1: new Float32Array(),
		float32Array1: new Float32Array(),
		transformCount: 10,
		geometryCount: 10,
		geometryPointCount: 100,
		pbrMaterialCount: 10
	})


let mostService: mostService = getExtensionService(meta3dState_, _getMeta3DBsMostExtensionName())

let tempMeta3DState: nullable<meta3dState> = null

_init(meta3dState_, isDebug).then((meta3dState) => {
	console.log("finish init on worker thread");

	tempMeta3DState = meta3dState
})

// mostService.fromEvent<MessageEvent, WorkerGlobalScope & typeof globalThis>("message", self, false).filter((event) => {
mostService.fromEvent<MessageEvent, Window & typeof globalThis>("message", self, false).filter((event) => {
	console.log(event);
	return event.data.operateType === "SEND_BEGIN_LOOP";
}).tap((_) => {
	return _loop(getExn(tempMeta3DState));
}).drain();