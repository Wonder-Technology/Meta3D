'use strict';

var ArraySt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/ArraySt.bs.js");
var NullableSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/NullableSt.bs.js");
var DisposeUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeUtils.bs.js");
var DisposeComponentUtils$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/scene_graph/DisposeComponentUtils.bs.js");
var ConfigUtils$Meta3dGameobjectDataoriented = require("./config/ConfigUtils.bs.js");
var GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented = require("./GetNeedDisposedGameObjectsUtils.bs.js");

function deferDisposeGameObject(param) {
  var gameObjectState = param[0];
  var needDisposedGameObjectArray = gameObjectState.needDisposedGameObjectArray;
  var transformState = param[1];
  return function (param, gameObject) {
    var deferDisposeTransformFunc = param[1];
    var transformState$1 = NullableSt$Meta3dCommonlib.getWithDefault(NullableSt$Meta3dCommonlib.bind(param[0](transformState, gameObject), (function (transform) {
                return deferDisposeTransformFunc(transformState, transform);
              })), transformState);
    var gameObjectState$1 = {
      config: gameObjectState.config,
      maxUID: gameObjectState.maxUID,
      needDisposedGameObjectArray: ArraySt$Meta3dCommonlib.push(needDisposedGameObjectArray, gameObject)
    };
    return [
            gameObjectState$1,
            transformState$1
          ];
  };
}

function _isNotNeedDispose(component, needDisposedIndexArray) {
  return !needDisposedIndexArray.includes(component);
}

function disposeGameObjects(param) {
  var gameObjectState = param[0];
  var transformState = param[1];
  return function (param, gameObjects) {
    var isDebug = ConfigUtils$Meta3dGameobjectDataoriented.getIsDebug(gameObjectState);
    var needDisposedGameObjectArray = GetNeedDisposedGameObjectsUtils$Meta3dGameobjectDataoriented.get(gameObjectState);
    DisposeUtils$Meta3dCommonlib.checkShouldNeedDisposed(isDebug, "gameObject", gameObjects, needDisposedGameObjectArray);
    gameObjectState.needDisposedGameObjectArray = DisposeComponentUtils$Meta3dCommonlib.batchRemoveFromArray(needDisposedGameObjectArray, gameObjects);
    var transformState$1 = param[1](transformState, param[0](transformState, gameObjects));
    return [
            gameObjectState,
            transformState$1
          ];
  };
}

exports.deferDisposeGameObject = deferDisposeGameObject;
exports._isNotNeedDispose = _isNotNeedDispose;
exports.disposeGameObjects = disposeGameObjects;
/* No side effect */