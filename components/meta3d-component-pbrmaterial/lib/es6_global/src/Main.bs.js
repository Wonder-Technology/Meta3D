

import * as Index$Meta3dComponentPbrmaterialProtocol from "./../../../../../node_modules/meta3d-component-pbrmaterial-protocol/lib/es6_global/src/Index.bs.js";
import * as CreateStateUtils$Meta3dComponentPbrmaterial from "./create_state/CreateStateUtils.bs.js";
import * as AddPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/AddPBRMaterialUtils.bs.js";
import * as GetGameObjectsUtils$Meta3dComponentPbrmaterial from "./gameobject/GetGameObjectsUtils.bs.js";
import * as GetPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/GetPBRMaterialUtils.bs.js";
import * as HasPBRMaterialUtils$Meta3dComponentPbrmaterial from "./gameobject/HasPBRMaterialUtils.bs.js";
import * as CreatePBRMaterialUtils$Meta3dComponentPbrmaterial from "./operate_component/CreatePBRMaterialUtils.bs.js";
import * as GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial from "./operate_component/GetAllPBRMaterialsUtils.bs.js";
import * as GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "./operate_data/GetPBRMaterialDataUtils.bs.js";
import * as SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial from "./operate_data/SetPBRMaterialDataUtils.bs.js";

function getData(param) {
  return {
          componentName: Index$Meta3dComponentPbrmaterialProtocol.componentName,
          createStateFunc: (function (param) {
              return CreateStateUtils$Meta3dComponentPbrmaterial.createState(param.isDebug, param.pbrMaterialCount);
            }),
          getGameObjectsFunc: GetGameObjectsUtils$Meta3dComponentPbrmaterial.get,
          createComponentFunc: CreatePBRMaterialUtils$Meta3dComponentPbrmaterial.create,
          addComponentFunc: AddPBRMaterialUtils$Meta3dComponentPbrmaterial.add,
          hasComponentFunc: HasPBRMaterialUtils$Meta3dComponentPbrmaterial.has,
          getComponentFunc: GetPBRMaterialUtils$Meta3dComponentPbrmaterial.get,
          getComponentDataFunc: (function (state, component, dataName) {
              return GetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.getData(state, component, dataName);
            }),
          setComponentDataFunc: (function (state, component, dataName, dataValue) {
              return SetPBRMaterialDataUtils$Meta3dComponentPbrmaterial.setData(state, component, dataName, dataValue);
            }),
          deferDisposeComponentFunc: (function (state, component) {
              return state;
            }),
          batchDisposeComponentsFunc: (function (state, components) {
              return state;
            }),
          getAllComponentsFunc: GetAllPBRMaterialsUtils$Meta3dComponentPbrmaterial.getAll
        };
}

export {
  getData ,
  
}
/* No side effect */
