let execFunc: Meta3dEngineCoreSceneviewProtocol.StateType.execFunc = (meta3dState, {getStatesFunc}) => {
  let {mostService} = getStatesFunc(. meta3dState)->Obj.magic->Utils.getState

  mostService.callFunc(. () => {
    Js.log("update root job exec")

    meta3dState
  })
}
