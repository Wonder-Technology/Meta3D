open FrontendUtils.Antd
%%raw("import 'antd/dist/antd.css'")
open FrontendUtils.AssembleSpaceType

module Method = {
  let _getVisualExtensionName = () => "meta3d-element-assemble-visual"

  let _getVisualExtensionProtocolName = () => "meta3d-element-assemble-visual-protocol"

  let getAndSetNewestVisualExtension = (service, dispatch, isDebug) => {
    ElementVisualUtils.getAndSetNewestVisualExtension(
      service,
      dispatch,
      extension => FrontendUtils.ElementAssembleStoreType.SetVisualExtension(extension),
      (_getVisualExtensionProtocolName(), _getVisualExtensionName()),
      isDebug,
    )
  }

  let _initApp = (meta3dState, service, initData) => {
    service.meta3d.initExtension(. meta3dState, _getVisualExtensionName(), initData)
  }

  let _updateApp = (meta3dState, service, updateData) => {
    service.meta3d.updateExtension(. meta3dState, _getVisualExtensionName(), updateData)
  }

  let _initAndUpdateApp = (meta3dState, service, initData) => {
    Meta3dBsMost.Most.fromPromise(
      _initApp(meta3dState, service, initData),
    )->Meta3dBsMost.Most.flatMap(meta3dState => {
      meta3dState->_updateApp(service, Obj.magic(1))->Meta3dBsMost.Most.fromPromise
    }, _)
  }

  let _buildApp = (
    service,
    (selectedExtensions, selectedContributes),
    (visualExtension, elementContribute),
  ) => {
    service.meta3d.loadApp(.
      ElementVisualUtils.generateApp(
        service,
        (selectedExtensions, selectedContributes),
        (visualExtension, elementContribute),
      ),
    )->Meta3dCommonlib.Tuple2.getFirst
  }

  let renderApp = (
    service,
    (selectedExtensions, selectedContributes),
    initData,
    (visualExtension, elementContribute),
  ) => {
    _buildApp(
      service,
      (
        selectedExtensions->Meta3dCommonlib.ListSt.toArray,
        selectedContributes->Meta3dCommonlib.ListSt.toArray,
      ),
      (visualExtension, elementContribute),
    )
    ->_initAndUpdateApp(service, initData)
    ->Meta3dBsMost.Most.drain
    ->Js.Promise.catch(e => {
      service.console.error(.
        e->Obj.magic->Js.Exn.message->Meta3dCommonlib.OptionSt.getExn->Obj.magic,
        None,
      )->Obj.magic
    }, _)
  }

  let getInitData = (service: FrontendUtils.AssembleSpaceType.service) => {
    {
      "isDebug": true,
      "canvas": service.dom.querySelector("#ui-visual-canvas")->Meta3dCommonlib.OptionSt.getExn,
    }->Obj.magic
  }

  let isLoaded = visualExtension => {
    visualExtension->Meta3dCommonlib.OptionSt.isSome
  }

  let _getElementContributeName = () => "meta3d-element-assemble-element"

  let _getElementContributeProtocolName = () => "meta3d-element-assemble-element-protocol"

  let _getElementContributeProtocolVersion = () => "0.5.1"

  let buildElementContributeFileStr = (
    service,
    selectedUIControls,
    selectedUIControlInspectorData,
    (elementStateFields, reducers),
  ) => {
    ElementMRUtils.buildElementMR(
      service,
      selectedUIControls->Meta3dCommonlib.ListSt.toArray,
      selectedUIControlInspectorData->Meta3dCommonlib.ListSt.toArray,
      (elementStateFields, reducers),
    )->ElementMRUtils.generateElementContributeFileStr(service, _)
  }

  let _buildContribute = (name, data): FrontendUtils.ApAssembleStoreType.contribute => {
    id: "",
    protocolIconBase64: "",
    protocolConfigStr: None,
    newName: name->Some,
    data: data,
  }

  let generateElementContribute = (service, fileStr) => {
    let protocolName = _getElementContributeProtocolName()
    let protocolVersion = _getElementContributeProtocolVersion()

    // let contributeBinaryFile = service.meta3d.generateContribute(.
    //   (
    //     {
    //       name: _getElementContributeName(),
    //       protocol: {
    //         name: protocolName,
    //         version: protocolVersion,
    //       },
    //       dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()
    //       ->Meta3dCommonlib.ImmutableHashMap.set(
    //         "meta3dUIExtensionName",
    //         (
    //           {
    //             protocolName: "meta3d-ui-protocol",
    //             protocolVersion: "^0.5.0",
    //           }: Meta3d.ExtensionFileType.dependentData
    //         ),
    //       )
    //       ->Meta3dCommonlib.ImmutableHashMap.set(
    //         "meta3dEventExtensionName",
    //         (
    //           {
    //             protocolName: "meta3d-event-protocol",
    //             protocolVersion: "^0.5.1",
    //           }: Meta3d.ExtensionFileType.dependentData
    //         ),
    //       ),
    //       dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    //     }: Meta3d.ExtensionFileType.contributePackageData
    //   ),
    //   fileStr,
    // )

    (
      (protocolName, protocolVersion, fileStr),
      ElementVisualUtils.generateElementContributeBinaryFile(
        service,
        _getElementContributeName(),
        protocolName,
        protocolVersion,
        fileStr,
      )
      ->service.meta3d.loadContribute(. _)
      ->_buildContribute(_getElementContributeName(), _),
    )
  }

  let updateElementContribute = (dispatch, elementContributeData) => {
    dispatch(FrontendUtils.ElementAssembleStoreType.SetElementContributeData(elementContributeData))
  }

  let useSelector = (
    {isDebug, apAssembleState, elementAssembleState}: FrontendUtils.AssembleSpaceStoreType.state,
  ) => {
    let {canvasData, selectedExtensions, selectedContributes} = apAssembleState
    let {
      selectedUIControls,
      selectedUIControlInspectorData,
      visualExtension,
      elementContributeData,
      elementInspectorData,
    } = elementAssembleState

    // let (_, elementContribute) = elementContributeData

    (
      isDebug,
      (canvasData, selectedExtensions, selectedContributes),
      (
        selectedUIControls,
        selectedUIControlInspectorData,
        visualExtension,
        // elementContribute,
        elementContributeData,
        elementInspectorData,
      ),
    )
  }
}

@react.component
let make = (~service: service) => {
  let dispatch = ReduxUtils.ElementAssemble.useDispatch(service.react.useDispatch)

  let (
    isDebug,
    (canvasData, selectedExtensions, selectedContributes),
    (
      selectedUIControls,
      selectedUIControlInspectorData,
      visualExtension,
      // elementContribute,
      elementContributeData,
      elementInspectorData,
    ),
  ) = service.react.useSelector(Method.useSelector)

  let {elementStateFields, reducers} = elementInspectorData

  service.react.useEffect1(. () => {
    switch visualExtension {
    | Some(_) => ()
    | None => Method.getAndSetNewestVisualExtension(service, dispatch, isDebug)->ignore
    }

    None
  }, [])

  service.react.useEffect1(. () => {
    selectedUIControlInspectorData->Meta3dCommonlib.ListSt.length > 0
      ? Method.generateElementContribute(
          service,
          Method.buildElementContributeFileStr(
            service,
            selectedUIControls,
            selectedUIControlInspectorData,
            (elementStateFields, reducers),
          ),
        )->Method.updateElementContribute(dispatch, _)
      : ()

    None
  }, [selectedUIControlInspectorData, elementInspectorData->Obj.magic])

  service.react.useEffect1(. () => {
    switch (visualExtension, elementContributeData) {
    | (Some(visualExtension), Some(elementContributeData)) =>
      let (_, elementContribute) = elementContributeData

      FrontendUtils.ErrorUtils.showCatchedErrorMessage(() => {
        Method.renderApp(
          service,
          (selectedExtensions, selectedContributes),
          Method.getInitData(service),
          (visualExtension, elementContribute),
        )->ignore
      }, 5->Some)
    | _ => ()
    }

    None
  }, [elementContributeData])

  !Method.isLoaded(visualExtension)
    ? <p> {React.string(`loading...`)} </p>
    : <canvas
        id="ui-visual-canvas"
        style={ReactDOM.Style.make(
          ~borderStyle="solid",
          ~borderColor="red",
          ~borderWidth="2px",
          ~width={j`${canvasData.width->Js.Int.toString}px`},
          ~height={j`${canvasData.height->Js.Int.toString}px`},
          (),
        )}
        width={j`${canvasData.width->Js.Int.toString}px`}
        height={j`${canvasData.height->Js.Int.toString}px`}
      />
}
