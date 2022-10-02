let buildContributePackageData = (
  ~name="p1",
  ~protocol={
    name: "p1",
    version: "0.0.1",
  }: Meta3d.ExtensionFileType.contributeProtocolData,
  ~dependentExtensionNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  (),
): Meta3d.ExtensionFileType.contributePackageData => {
  {
    name: name,
    protocol: protocol,
    dependentExtensionNameMap: dependentExtensionNameMap,
    dependentContributeNameMap: dependentContributeNameMap,
  }
}

let buildContributeData = (
  ~contributePackageData,
  ~contributeFuncData=Js.Typed_array.Uint8Array.make([]),
  (),
): Meta3d.ExtensionFileType.contributeFileData => {
  {
    contributePackageData: contributePackageData,
    contributeFuncData: contributeFuncData,
  }
}

let buildSelectedContribute = (
  ~protocolName,
  ~protocolVersion,
  ~contributeFuncData=Js.Typed_array.Uint8Array.make([]),
  ~id="e1",
  ~version="0.0.1",
  ~username="u1",
  (),
): FrontendUtils.AssembleSpaceCommonType.contribute => {
  {
    id: id,
    data: buildContributeData(
      ~contributePackageData=buildContributePackageData(
        ~protocol={
          name: protocolName,
          version: protocolVersion,
        },
        (),
      ),
      ~contributeFuncData,
      (),
    ),
    version: version,
    username: username,
  }
}

let generateContribute = (
  ~name,
  ~protocolName="",
  ~protocolVersion="",
  ~dependentExtensionNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~dependentContributeNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  ~fileStr=UIVisualTool.buildEmptyContributeFileStr(),
  (),
) => {
  Meta3d.Main.generateContribute(
    (
      {
        name: name,
        protocol: {
          name: protocolName,
          version: protocolVersion,
        },
        dependentExtensionNameMap: dependentExtensionNameMap,
        dependentContributeNameMap: dependentContributeNameMap,
      }: Meta3d.ExtensionFileType.contributePackageData
    ),
    fileStr,
  )
}
