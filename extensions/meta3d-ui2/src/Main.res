let getExtensionService: Meta3dType.Index.getExtensionService<
  Meta3dUi2Protocol.DependentMapType.dependentExtensionNameMap,
  Meta3dUi2Protocol.DependentMapType.dependentContributeNameMap,
  Meta3dUi2Protocol.ServiceType.service,
> = (api, (dependentExtensionNameMap, _)) => {
  let {meta3dImguiRendererExtensionName} = dependentExtensionNameMap

  {
    registerElement: UIManager.registerElement->Obj.magic,
    registerSkin: UIManager.registerSkin,
    registerUIControl: UIManager.registerUIControl,
    getSkin: UIManager.getSkinExn->Obj.magic,
    getUIControl: UIManager.getUIControlExn->Obj.magic,
    hide: UIManager.hide,
    show: UIManager.show,
    isStateChange: UIManager.isStateChange,
    getElementState: UIManager.getElementState->Obj.magic,
    beginWindow: (meta3dState, label) => {
      UIManager.beginWindow(meta3dState, (api, meta3dImguiRendererExtensionName), label)
    },
    endWindow: meta3dState => {
      UIManager.endWindow(meta3dState, (api, meta3dImguiRendererExtensionName))
    },
    // getIOData: UIManager.getIOData,
    dispatch: UIManager.dispatch,
    init: UIManager.init,
    clear: UIManager.clear,
    render: UIManager.render(api),
  }
}

let createExtensionState: Meta3dType.Index.createExtensionState<
  Meta3dUi2Protocol.StateType.state,
> = () => {
  {
    elementFuncMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    elementStateMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    elementExecOrderMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isShowMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    isStateChangeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    skinContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    uiControlContributeMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    // ioData: None,
    reducers: [],
    // imguiData: ManageIMGUIService.createData()
    // ioData: {
    //   pointUp: false,
    //   pointDown: false,
    //   pointTap: false,
    //   pointPosition: (0, 0),
    //   pointMovementDelta: (0, 0),
    // },
  }
}

let getExtensionLife: Meta3dType.Index.getExtensionLife<Meta3dUi2Protocol.ServiceType.service> = (
  _,
  _,
) => {
  {
    onRegister: Js.Nullable.null,
    onStart: Js.Nullable.null,
    onInit: Js.Nullable.null,
    onUpdate: Js.Nullable.null,
  }
}
