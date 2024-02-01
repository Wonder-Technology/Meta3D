import { Merge } from "meta3d-commonlib-ts/src/type"
import { state as meta3dState } from "meta3d-type"
import {
	addBasicCameraView, addGeometry, addPBRMaterial, addPerspectiveCameraProjection, addTransform, addArcballCameraController, cloneGameObject, createGameObject,
	disposeGameObjectArcballCameraControllerComponent,
	disposeGameObjectBasicCameraViewComponent, disposeGameObjectGeometryComponent, disposeGameObjectPBRMaterialComponent, disposeGameObjectPerspectiveCameraProjectionComponent, disposeGameObjects, disposeGameObjectTransformComponent, getAllGameObjects,
	getArcballCameraController,
	getBasicCameraView, getGeometry, getNeedDisposedGameObjects, getPBRMaterial, getPerspectiveCameraProjection, getTransform,
	hasArcballCameraController,
	hasBasicCameraView, hasGeometry, hasPBRMaterial, hasPerspectiveCameraProjection, hasTransform, addDirectionLight, disposeGameObjectDirectionLightComponent, getDirectionLight, hasDirectionLight, getGameObjectName, setGameObjectName, getGameObjectAndAllChildren, removeGameObjects, restoreRemovedGameObjects, addScript, disposeGameObjectScriptComponent, getScript, hasScript
} from "./ecs/GameObject"
import {
	createTransform, getGameObjects as getTransformGameObjects, getChildren, getLocalPosition, getParent, lookAt, setLocalPosition, setParent, getLocalToWorldMatrix, getLocalRotation, setLocalRotation, getLocalScale, setLocalScale,
	getName as getTransformName,
	setName as setTransformName,
	getLocalEulerAngles,
	setLocalEulerAngles,
} from "./ecs/Transform";
import {
	createPerspectiveCameraProjection,
	getName as getPerspectiveCameraProjectionName,
	setName as setPerspectiveCameraProjectionName,
	getAspect, getFar, getFovy, getNear, getPMatrix, setAspect, setFar, setFovy, setNear
} from "./ecs/PerspectiveCameraProjection";
import {
	createPBRMaterial,
	getName as getPBRMaterialName,
	setName as setPBRMaterialName,
	getDiffuseColor, setDiffuseColor,
	getSpecular,
	setSpecular,
	getSpecularColor,
	setSpecularColor,
	getRoughness,
	setRoughness,
	getMetalness,
	setMetalness,
	getTransmission,
	setTransmission,
	getIOR,
	setIOR,
	getDiffuseMap,
	setDiffuseMap,
	getRoughnessMap,
	setRoughnessMap,
	getMetalnessMap,
	setMetalnessMap,
	getNormalMap,
	setNormalMap,
	getGameObjects as getPBRMaterialGameObjects,
} from "./ecs/PBRMaterial";
import {
	createTexture,
	disposeTexture,
	addMaterial,
	getName as getTextureName,
	setName as setTextureName,
	getWrapS,
	setWrapS,
	getWrapT,
	setWrapT,
	getMagFilter,
	setMagFilter,
	getMinFilter,
	setMinFilter,
	getFormat,
	setFormat,
	getType,
	setType,
	getIsNeedUpdate,
	setIsNeedUpdate,
	getFlipY,
	setFlipY,
	getImage,
	setImage,
} from "./ecs/BasicSourceTexture";
import {
	createGeometry,
	getName as getGeometryName,
	setName as setGeometryName,
	getIndices, getVertices, setIndices, setVertices,
	getGameObjects as getGeometryGameObjects,
	getNormals,
	setNormals,
	getTexCoords,
	setTexCoords,
	getTangents,
	setTangents,
} from "./ecs/Geometry";
import {
	createBasicCameraView,
	getName as getBasicCameraViewName,
	setName as setBasicCameraViewName,
	getGameObjects as getBasicCameraViewGameObjects,
	active, notActive, getActiveCameraView, getViewWorldToCameraMatrix
} from "./ecs/BasicCameraView";
import {
	createArcballCameraController,
	getName as getArcballCameraControllerName, setName as setArcballCameraControllerName,
	// getAllDirtyArcballCameraControllers, clearDirtyList,
	getDistance, setDistance, getPhi, setPhi, getTheta, setTheta, getTarget, setTarget, getGameObjects as getArcballCameraControllerGameObjects, getWheelSpeed, setWheelSpeed
} from "./ecs/ArcballCameraController"
import {
	createDirectionLight,
	getName as getDirectionLightName,
	setName as setDirectionLightName,
	getColor,
	getDirection,
	getGameObjects as getDirectionLightGameObjects,
	getIntensity,
	setColor,
	setDirection,
	setIntensity
} from "./ecs/DirectionLight";
import {
	createScript,
	getName as getScriptName,
	setName as setScriptName,
	getAttribute, getEventFileStr, setAttribute, setEventFileStr
} from "./ecs/Script";

export type ecsConfig = {
	float9Array1: Float32Array,
	float32Array1: Float32Array,
	transformCount: number,
	geometryCount: number,
	geometryPointCount: number,
	pbrMaterialCount: number
}

export type scene = {
	gameObject: {
		addBasicCameraView: addBasicCameraView,
		addDirectionLight: addDirectionLight,
		addGeometry: addGeometry,
		addPBRMaterial: addPBRMaterial,
		addPerspectiveCameraProjection: addPerspectiveCameraProjection,
		addScript: addScript,
		addTransform: addTransform,
		addArcballCameraController: addArcballCameraController,
		cloneGameObject: cloneGameObject,
		createGameObject: createGameObject,
		// createUnUseGameObject: createUnUseGameObject,

		disposeGameObjectArcballCameraControllerComponent: disposeGameObjectArcballCameraControllerComponent,

		disposeGameObjectBasicCameraViewComponent: disposeGameObjectBasicCameraViewComponent,
		disposeGameObjectDirectionLightComponent: disposeGameObjectDirectionLightComponent,
		disposeGameObjectGeometryComponent: disposeGameObjectGeometryComponent,
		disposeGameObjectPBRMaterialComponent: disposeGameObjectPBRMaterialComponent,
		disposeGameObjectPerspectiveCameraProjectionComponent: disposeGameObjectPerspectiveCameraProjectionComponent,
		disposeGameObjectScriptComponent: disposeGameObjectScriptComponent,
		disposeGameObjects: disposeGameObjects,
		disposeGameObjectTransformComponent: disposeGameObjectTransformComponent,
		getAllGameObjects: getAllGameObjects,

		getArcballCameraController: getArcballCameraController,

		getBasicCameraView: getBasicCameraView,
		getDirectionLight: getDirectionLight,
		getGeometry: getGeometry,
		getNeedDisposedGameObjects: getNeedDisposedGameObjects,
		getPBRMaterial: getPBRMaterial,
		getPerspectiveCameraProjection: getPerspectiveCameraProjection,
		getScript: getScript,
		getTransform: getTransform,

		hasArcballCameraController: hasArcballCameraController,
		hasBasicCameraView: hasBasicCameraView,
		hasDirectionLight: hasDirectionLight,
		hasGeometry: hasGeometry,
		hasPBRMaterial: hasPBRMaterial,
		hasPerspectiveCameraProjection: hasPerspectiveCameraProjection,
		hasScript: hasScript,
		hasTransform: hasTransform,

		getGameObjectName: getGameObjectName,
		setGameObjectName: setGameObjectName,

		getGameObjectAndAllChildren: getGameObjectAndAllChildren,
		removeGameObjects: removeGameObjects,
		restoreRemovedGameObjects: restoreRemovedGameObjects
	},
	transform: {
		createTransform: createTransform,
		getGameObjects: getTransformGameObjects,
		getName: getTransformName,
		setName: setTransformName,
		getParent: getParent,
		setParent: setParent,
		getChildren: getChildren,
		getLocalPosition: getLocalPosition,
		setLocalPosition: setLocalPosition,
		getLocalEulerAngles: getLocalEulerAngles,
		setLocalEulerAngles: setLocalEulerAngles,
		getLocalRotation: getLocalRotation,
		setLocalRotation: setLocalRotation,
		getLocalScale: getLocalScale,
		setLocalScale: setLocalScale,
		getLocalToWorldMatrix: getLocalToWorldMatrix,
		lookAt: lookAt,
	},
	directionLight: {
		createDirectionLight: createDirectionLight,
		getName: getDirectionLightName,
		setName: setDirectionLightName,
		getGameObjects: getDirectionLightGameObjects,
		getColor: getColor,
		setColor: setColor,
		getIntensity: getIntensity,
		setIntensity: setIntensity,
		getDirection: getDirection,
		setDirection: setDirection,
	},
	perspectiveCameraProjection: {
		createPerspectiveCameraProjection: createPerspectiveCameraProjection,
		getName: getPerspectiveCameraProjectionName,
		setName: setPerspectiveCameraProjectionName,
		getPMatrix: getPMatrix,
		getFovy: getFovy,
		setFovy: setFovy,
		getNear: getNear,
		setNear: setNear,
		getFar: getFar,
		setFar: setFar,
		getAspect: getAspect,
		setAspect: setAspect
	},
	script: {
		createScript: createScript,
		getName: getScriptName,
		setName: setScriptName,
		getAttribute: getAttribute,
		setAttribute: setAttribute,
		getEventFileStr: getEventFileStr,
		setEventFileStr: setEventFileStr,
	},
	pbrMaterial: {
		createPBRMaterial: createPBRMaterial,
		getName: getPBRMaterialName,
		setName: setPBRMaterialName,
		getDiffuseColor: getDiffuseColor,
		setDiffuseColor: setDiffuseColor,
		getSpecular: getSpecular,
		setSpecular: setSpecular,
		getSpecularColor: getSpecularColor,
		setSpecularColor: setSpecularColor,
		getRoughness: getRoughness,
		setRoughness: setRoughness,
		getMetalness: getMetalness,
		setMetalness: setMetalness,
		getTransmission: getTransmission,
		setTransmission: setTransmission,
		getIOR: getIOR,
		setIOR: setIOR,
		getDiffuseMap: getDiffuseMap,
		setDiffuseMap: setDiffuseMap,
		getRoughnessMap: getRoughnessMap,
		setRoughnessMap: setRoughnessMap,
		getMetalnessMap: getMetalnessMap,
		setMetalnessMap: setMetalnessMap,
		getNormalMap: getNormalMap,
		setNormalMap: setNormalMap,
		// getAllPBRMaterials: getAllPBRMaterials,
		getGameObjects: getPBRMaterialGameObjects
	},
	basicSourceTexture: {
		createTexture: createTexture,
		disposeTexture: disposeTexture,
		addMaterial: addMaterial,
		getName: getTextureName,
		setName: setTextureName,
		getWrapS: getWrapS,
		setWrapS: setWrapS,
		getWrapT: getWrapT,
		setWrapT: setWrapT,
		getMagFilter: getMagFilter,
		setMagFilter: setMagFilter,
		getMinFilter: getMinFilter,
		setMinFilter: setMinFilter,
		getFormat: getFormat,
		setFormat: setFormat,
		getType: getType,
		setType: setType,
		getIsNeedUpdate: getIsNeedUpdate,
		setIsNeedUpdate: setIsNeedUpdate,
		getFlipY: getFlipY,
		setFlipY: setFlipY,
		getImage: getImage,
		setImage: setImage,
	},
	geometry: {
		createGeometry: createGeometry,
		getName: getGeometryName,
		setName: setGeometryName,
		getVertices: getVertices,
		setVertices: setVertices,
		getNormals: getNormals,
		setNormals: setNormals,
		getTexCoords: getTexCoords,
		setTexCoords: setTexCoords,
		getTangents: getTangents,
		setTangents: setTangents,
		getIndices: getIndices,
		setIndices: setIndices,
		getGameObjects: getGeometryGameObjects
	},
	basicCameraView: {
		createBasicCameraView: createBasicCameraView,
		getGameObjects: getBasicCameraViewGameObjects,
		getName: getBasicCameraViewName,
		setName: setBasicCameraViewName,
		getViewWorldToCameraMatrix: getViewWorldToCameraMatrix,
		getActiveCameraView: getActiveCameraView,
		active: active,
		notActive: notActive
	},
	arcballCameraController: {
		createArcballCameraController: createArcballCameraController,
		// getAllDirtyArcballCameraControllers: getAllDirtyArcballCameraControllers,
		// clearDirtyList: clearDirtyList,
		getName: getArcballCameraControllerName,
		setName: setArcballCameraControllerName,
		getDistance: getDistance,
		setDistance: setDistance,
		getWheelSpeed: getWheelSpeed,
		setWheelSpeed: setWheelSpeed,
		getPhi: getPhi,
		setPhi: setPhi,
		getTheta: getTheta,
		setTheta: setTheta,
		getTarget: getTarget,
		setTarget: setTarget,
		getGameObjects: getArcballCameraControllerGameObjects
	}
}

export type service = Merge<scene, {
	prepare: (meta3dState: meta3dState, isDebug: boolean, ecsConfig: ecsConfig) => meta3dState
}>;
