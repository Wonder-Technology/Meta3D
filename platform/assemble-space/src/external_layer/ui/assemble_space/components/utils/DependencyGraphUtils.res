open FrontendUtils.AntdCharts
open FrontendUtils.AssembleSpaceType

type nodeType =
  | Extension
  | Contribute
  | PackageExtension
  | PackageContribute

type packageName = string

type protocolName = string

type id = protocolName

type nodeData = {
  nodeType: nodeType,
  isStart: bool,
  packageName: option<packageName>,
  protocol: Meta3d.ExtensionFileType.extensionProtocolData,
  protocolIconBase64: FrontendUtils.ApAssembleStoreType.protocolIconBase64,
  displayName: string,
  name: string,
  version: FrontendUtils.ApAssembleStoreType.version,
  dependentBlockProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    Meta3d.ExtensionFileType.blockProtocolName,
    Meta3d.ExtensionFileType.blockProtocolVersion,
  >,
}

type nodeInData = {
  id: id,
  nodeType: option<nodeType>,
  isEmpty: bool,
  packageName: option<packageName>,
  protocol: Meta3d.ExtensionFileType.extensionProtocolData,
  protocolIconBase64: option<FrontendUtils.ApAssembleStoreType.protocolIconBase64>,
  title: string,
  name: option<string>,
  version: option<FrontendUtils.ApAssembleStoreType.version>,
}

type edgeInData = {
  source: id,
  target: id,
}

module Method = {
  let _buildNodes = (
    service,
    selectedPackages: FrontendUtils.ApAssembleStoreType.selectedPackages,
    selectedExtensions: FrontendUtils.ApAssembleStoreType.selectedExtensions,
    selectedContributes: FrontendUtils.ApAssembleStoreType.selectedContributes,
  ): list<nodeData> => {
    let nodes = selectedPackages->Meta3dCommonlib.ListSt.reduce(list{}, (
      nodes,
      {name, protocol, binaryFile},
    ) => {
      let (
        allExtensionFileData,
        allContributeFileData,
      ) = service.meta3d.getAllExtensionAndContributeFileDataOfPackage(. binaryFile)

      let nodes =
        allExtensionFileData->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. nodes, (extensionPackageData, _)) => {
            nodes->Meta3dCommonlib.ListSt.push({
              nodeType: PackageExtension,
              isStart: false,
              packageName: name->Some,
              protocol: extensionPackageData.protocol,
              protocolIconBase64: protocol.iconBase64,
              displayName: extensionPackageData.displayName,
              name: extensionPackageData.name,
              version: extensionPackageData.version,
              dependentBlockProtocolNameMap: extensionPackageData.dependentBlockProtocolNameMap,
            })
          },
          nodes,
        )
      let nodes =
        allContributeFileData->Meta3dCommonlib.ArraySt.reduceOneParam(
          (. nodes, (contributePackageData, _)) => {
            nodes->Meta3dCommonlib.ListSt.push({
              nodeType: PackageContribute,
              isStart: false,
              packageName: name->Some,
              protocol: contributePackageData.protocol,
              protocolIconBase64: protocol.iconBase64,
              displayName: contributePackageData.displayName,
              name: contributePackageData.name,
              version: contributePackageData.version,
              dependentBlockProtocolNameMap: contributePackageData.dependentBlockProtocolNameMap,
            })
          },
          nodes,
        )

      nodes
    })

    let nodes = selectedExtensions->Meta3dCommonlib.ListSt.reduce(nodes, (nodes, extension) => {
      nodes->Meta3dCommonlib.ListSt.push({
        nodeType: Extension,
        isStart: extension.isStart,
        packageName: None,
        protocol: extension.data.extensionPackageData.protocol,
        protocolIconBase64: extension.protocolIconBase64,
        displayName: extension.data.extensionPackageData.displayName,
        name: extension.data.extensionPackageData.name,
        version: extension.data.extensionPackageData.version,
        dependentBlockProtocolNameMap: extension.data.extensionPackageData.dependentBlockProtocolNameMap,
      })
    })
    let nodes = selectedContributes->Meta3dCommonlib.ListSt.reduce(nodes, (nodes, contribute) => {
      nodes->Meta3dCommonlib.ListSt.push({
        nodeType: Contribute,
        isStart: false,
        packageName: None,
        protocol: contribute.data.contributePackageData.protocol,
        protocolIconBase64: contribute.protocolIconBase64,
        displayName: contribute.data.contributePackageData.displayName,
        name: contribute.data.contributePackageData.name,
        version: contribute.data.contributePackageData.version,
        dependentBlockProtocolNameMap: contribute.data.contributePackageData.dependentBlockProtocolNameMap,
      })
    })

    nodes
  }

  let _buildNodeErrorInfo = (node: nodeData) => {
    switch node.nodeType {
    | Extension => j`- 类型：扩展；`
    | Contribute => j`- 类型：贡献`
    | PackageExtension =>
      j`- 类型：扩展；所属包名：${node.packageName->Meta3dCommonlib.OptionSt.getExn}；`
    | PackageContribute =>
      j`- 类型：贡献；所属包名：${node.packageName->Meta3dCommonlib.OptionSt.getExn}；`
    } ++
    j`显示名：${node.displayName}；实现名：${node.name}；实现版本：${node.version}
    `
  }

  let _checkDuplicateNode = (nodes: list<nodeData>) => {
    open Meta3dCommonlib

    let arr = nodes->ListSt.toArray

    // let resultArr = []
    let map = MutableHashMap.createEmpty()
    for i in 0 to Js.Array.length(arr) - 1 {
      let item = Array.unsafe_get(arr, i)
      // let key = buildKeyFunc(item)
      let key = item.protocol.name
      switch MutableHashMap.get(map, key) {
      | None =>
        // Js.Array.push(item, resultArr)->ignore
        MutableHashMap.set(map, key, item)->ignore
      | Some(oldItem) =>
        let title =
          j`协议名：${key}有重复的实现，它们分别是：
    ` ++
          _buildNodeErrorInfo(item) ++
          _buildNodeErrorInfo(oldItem)

        Meta3dCommonlib.Exception.throwErr(
          Meta3dCommonlib.Exception.buildErr(
            Meta3dCommonlib.Log.buildErrorMessage(
              ~title,
              ~description={
                ""
              },
              ~reason="",
              ~solution=j``,
              ~params=j``,
            ),
          ),
        )
      }
    }
  }

  let _getEmptyNodeTitle = () => "无"

  let _isNeedUpdateNodeInData = (nodeInData: nodeInData, nodeProtocolVersion) => {
    Meta3d.Semver.gte(
      Meta3d.Semver.minVersion(nodeProtocolVersion),
      Meta3d.Semver.minVersion(nodeInData.protocol.version),
    )
  }

  let _getNodeId = (node: nodeData) => {
    node.protocol.name
  }

  let _updateNodeInData = (nodesData: array<nodeInData>, newNodeInData) => {
    nodesData->Meta3dCommonlib.ArraySt.map(({id} as oldNodeInData) => {
      id == newNodeInData.id ? newNodeInData : oldNodeInData
    })
  }

  let _updateNodesDataForNonEmptyNode = (nodesData: array<nodeInData>, node: nodeData) => {
    let nodeId = _getNodeId(node)

    switch nodesData->Meta3dCommonlib.ArraySt.find(({id}) => {
      id == nodeId
    }) {
    | Some(nodeInData) =>
      _isNeedUpdateNodeInData(nodeInData, node.protocol.version)
        ? _updateNodeInData(
            nodesData,
            {
              ...nodeInData,
              version: nodeInData.version->Meta3dCommonlib.OptionSt.map(_ => node.version),
              protocol: {
                ...nodeInData.protocol,
                version: node.protocol.version,
              },
            },
          )
        : nodesData
    | None =>
      nodesData->Meta3dCommonlib.ArraySt.push({
        id: nodeId,
        isEmpty: false,
        nodeType: node.nodeType->Some,
        packageName: node.packageName,
        protocol: node.protocol,
        protocolIconBase64: node.protocolIconBase64->Some,
        title: node.displayName,
        name: node.name->Some,
        version: node.version->Some,
      })
    }
  }

  let _updateNodesDataForEmptyNode = (
    nodesData: array<nodeInData>,
    nodeId,
    (blockProtocolName, blockProtocolVersion),
  ) => {
    let newNodeInData = {
      id: nodeId,
      isEmpty: true,
      nodeType: None,
      packageName: None,
      protocol: {
        name: blockProtocolName->Meta3dCommonlib.OptionSt.getExn,
        version: blockProtocolVersion->Meta3dCommonlib.OptionSt.getExn,
      },
      protocolIconBase64: None,
      title: _getEmptyNodeTitle(),
      name: None,
      version: None,
    }

    switch nodesData->Meta3dCommonlib.ArraySt.find(({id}) => {
      id == nodeId
    }) {
    | Some(nodeInData) =>
      _isNeedUpdateNodeInData(nodeInData, blockProtocolVersion->Meta3dCommonlib.OptionSt.getExn)
        ? {
            _updateNodeInData(nodesData, newNodeInData)
          }
        : // Meta3dCommonlib.Exception.throwErr(
          //     Meta3dCommonlib.Exception.buildErr(
          //       Meta3dCommonlib.Log.buildErrorMessage(
          //         ~title={j`should update node in data`},
          //         ~description={
          //           ""
          //         },
          //         ~reason="",
          //         ~solution=j``,
          //         ~params=j``,
          //       ),
          //     ),
          //   )
          nodesData
    | None => nodesData->Meta3dCommonlib.ArraySt.push(newNodeInData)
    }
  }

  let _updateEdgesData = (edgesData: array<edgeInData>, nodeId, parentNodeId) => {
    switch parentNodeId {
    | None => edgesData
    | Some(parentNodeId) =>
      edgesData
      ->Meta3dCommonlib.ArraySt.push({
        source: parentNodeId,
        target: nodeId,
      })
      ->Meta3dCommonlib.ArraySt.removeDuplicateItemsWithBuildKeyFunc((. {source, target}) => {
        j`${source}_${target}`
      })
    }
  }

  let rec _buildData = (
    (nodesData, edgesData),
    node: option<nodeData>,
    nodes: list<nodeData>,
    parentNodeId,
    (blockProtocolName, blockProtocolVersion),
  ) => {
    let data = Meta3dCommonlib.ImmutableHashMap.createEmpty()

    switch node {
    | None =>
      let nodeId = blockProtocolName->Meta3dCommonlib.OptionSt.getExn

      let nodesData = _updateNodesDataForEmptyNode(
        nodesData,
        nodeId,
        (blockProtocolName, blockProtocolVersion),
      )

      let edgesData = _updateEdgesData(edgesData, nodeId, parentNodeId)

      (nodesData, edgesData)
    | Some(node) =>
      let nodesData = _updateNodesDataForNonEmptyNode(nodesData, node)

      let nodeId = _getNodeId(node)

      let edgesData = _updateEdgesData(edgesData, nodeId, parentNodeId)

      node.dependentBlockProtocolNameMap
      ->Meta3dCommonlib.ImmutableHashMap.entries
      ->Meta3dCommonlib.ArraySt.reduceOneParam(
        (. (nodesData, edgesData), (blockProtocolName, blockProtocolVersion)) => {
          _buildData(
            (nodesData, edgesData),
            nodes->Meta3dCommonlib.ListSt.find(({protocol}) =>
              protocol.name == blockProtocolName &&
                Meta3d.Semver.gte(
                  Meta3d.Semver.minVersion(protocol.version),
                  Meta3d.Semver.minVersion(blockProtocolVersion),
                )
            ),
            nodes,
            nodeId->Some,
            (blockProtocolName->Some, blockProtocolVersion->Some),
          )
        },
        (nodesData, edgesData),
      )
    }
  }

  let _convertNodesData = (nodesData: array<nodeInData>) => {
    nodesData->Meta3dCommonlib.ArraySt.map(({
      isEmpty,
      nodeType,
      id,
      packageName,
      protocol,
      protocolIconBase64,
      title,
      name,
      version,
    }) => {
      let items = [
        {
          "text": "协议名",
          "value": protocol.name,
        },
        {
          "text": "协议版本",
          "value": protocol.version,
        },
      ]

      let items = switch protocolIconBase64 {
      | Some(protocolIconBase64) =>
        items->Meta3dCommonlib.ArraySt.push(
          {
            "text": "协议icon",
            "icon": protocolIconBase64,
          }->Obj.magic,
        )
      | None => items
      }

      let items = switch name {
      | Some(name) =>
        items->Meta3dCommonlib.ArraySt.push({
          "text": "实现名",
          "value": name,
        })
      | None => items
      }

      let items = switch version {
      | Some(version) =>
        items->Meta3dCommonlib.ArraySt.push({
          "text": "实现版本",
          "value": version,
        })
      | None => items
      }

      let items = switch packageName {
      | Some(packageName) =>
        items->Meta3dCommonlib.ArraySt.push({
          "text": "所属包名",
          "value": packageName,
        })
      | None => items
      }

      {
        "id": id,
        "value": {
          "title": title,
          "items": items,
        },
        "nodeType": nodeType,
        "isEmpty": isEmpty,
      }
    })
  }

  let _convertEdgesData = (edgesData: array<edgeInData>) => {
    edgesData->Meta3dCommonlib.ArraySt.map(({source, target}) => {
      {
        "source": source,
        "target": target,
      }
    })
  }

  let _hasEmptyNode = (nodesData: array<nodeInData>) => {
    !(nodesData->Meta3dCommonlib.ArraySt.includesByFunc(({isEmpty}) => isEmpty))
  }

  let useEffectOnce = (
    setData,
    service,
    markIsPassDependencyGraphCheck,
    (
      selectedPackages: FrontendUtils.ApAssembleStoreType.selectedPackages,
      selectedExtensions: FrontendUtils.ApAssembleStoreType.selectedExtensions,
      selectedContributes: FrontendUtils.ApAssembleStoreType.selectedContributes,
    ),
  ) => {
    switch selectedExtensions->Meta3dCommonlib.ListSt.find(({isStart}) => {
      isStart
    }) {
    | None =>
      setData(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())

      markIsPassDependencyGraphCheck(false)
    | Some(extension) =>
      let nodes = _buildNodes(service, selectedPackages, selectedExtensions, selectedContributes)

      _checkDuplicateNode(nodes)

      let (nodesData, edgesData) = _buildData(
        ([], []),
        nodes->Meta3dCommonlib.ListSt.find(({isStart}) => isStart),
        nodes,
        None,
        (None, None),
      )

      setData(_ =>
        {
          "nodes": nodesData->_convertNodesData,
          "edges": edgesData->_convertEdgesData,
        }->Obj.magic
      )

      markIsPassDependencyGraphCheck(_hasEmptyNode(nodesData))
    }
  }

  let useSelector = (
    {
      selectedPackages,
      selectedExtensions,
      selectedContributes,
    }: FrontendUtils.ApAssembleStoreType.state,
  ) => {
    (selectedPackages, selectedExtensions, selectedContributes)
  }
}

@react.component
let make = (
  ~service: service,
  ~markIsPassDependencyGraphCheck,
  ~selectedPackages,
  ~selectedExtensions,
  ~selectedContributes,
) => {
  let (data, setData) = service.react.useState(_ => Meta3dCommonlib.ImmutableHashMap.createEmpty())

  service.react.useEffect1(. () => {
    FrontendUtils.ErrorUtils.showCatchedErrorMessageWithFunc(
      () => {
        Method.useEffectOnce(
          setData,
          service,
          markIsPassDependencyGraphCheck,
          (selectedPackages, selectedExtensions, selectedContributes),
        )
      },
      () => {
        markIsPassDependencyGraphCheck(false)
      },
      5->Some,
    )

    None
  }, [selectedPackages, selectedExtensions->Obj.magic, selectedContributes->Obj.magic])

  {
    data == Meta3dCommonlib.ImmutableHashMap.createEmpty()
      ? {React.string(`请指定启动扩展`)}
      : <FlowAnalysisGraph
          data={data->Obj.magic}
          nodeCfg={
            autoWidth: true,
            items: {
              layout: #follow,
            },
            title: {
              containerStyle: node => {
                let node = node->Obj.magic

                node["isEmpty"]
                  ? {
                      fill: "red",
                    }
                  : {
                      fill: switch node["nodeType"] {
                      | Extension => "#1E90FF"
                      | Contribute => "#008000"
                      | PackageExtension => "#87CEFA"
                      | PackageContribute => "#00FF00"
                      },
                    }
              },
            },
          }
          edgeCfg={
            // type_: #polyline,
            endArrow: true,
            style: (edge, event) => {
              let {_cfg} =
                event.cfg.nodes
                ->Meta3dCommonlib.ArraySt.find(({_cfg}) => {
                  (_cfg.model->Obj.magic)["id"] == edge.target
                })
                ->Meta3dCommonlib.OptionSt.getExn

              (_cfg.model->Obj.magic)["isEmpty"]
                ? {
                    stroke: "#FF00FF",
                  }
                : {
                    stroke: "#696969",
                  }
            },
          }
          markerCfg={cfg => {
            {
              show: (data->Obj.magic)["edges"]
              ->Meta3dCommonlib.ArraySt.filter(item => {
                item["source"] === cfg.id
              })
              ->Meta3dCommonlib.ArraySt.length,
            }
          }}
          behaviors=["drag-canvas", "zoom-canvas", "drag-node"]
        />
  }
}