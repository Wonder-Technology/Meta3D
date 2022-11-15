type account = string

// TODO refactor: move type out
type protocol = {
  name: string,
  version: string,
  account: account,
  iconBase64: string,
}

type protocols = array<protocol>

type init = unit => Meta3dBsMostProtocol.StreamType.stream<unit>

type handleLogin = account => Meta3dBsMostProtocol.StreamType.stream<unit>

type registerUser = (string, string) => Meta3dBsMostProtocol.StreamType.stream<unit>

type getAllPublishExtensionProtocols = unit => Meta3dBsMostProtocol.StreamType.stream<protocols>

type getAllPublishContributeProtocols = getAllPublishExtensionProtocols

// type protocolConfig = {
//   name: string,
//   version: string,
//   account: string,
//   configStr: string,
// }

type protocolConfigs = array<CommonType.protocolConfig>

type getAllPublishContributeProtocolConfigs = unit => Meta3dBsMostProtocol.StreamType.stream<
  protocolConfigs,
>

type getAllPublishExtensionProtocolConfigs = unit => Meta3dBsMostProtocol.StreamType.stream<
  protocolConfigs,
>

type implementInfo = {
  id: string,
  name: string,
  version: string,
  account: account,
}

type implementInfos = array<implementInfo>

type onUploadProgressFunc = int => unit

type getAllPublishExtensionInfos = (
  . string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<implementInfos>

type getAllPublishContributeInfos = (
  . string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<implementInfos>

type onDownloadProgressFunc = int => unit

type findPublishExtension = (
  . onDownloadProgressFunc,
  string,
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>>

type findPublishContribute = (
  . onDownloadProgressFunc,
  string,
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>>

type publishAppInfo = {
  account: account,
  appName: string,
}

type publishApp = (
  . onUploadProgressFunc,
  Js.Typed_array.ArrayBuffer.t,
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<unit>

type findPublishApp = (
  . onDownloadProgressFunc,
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>>

type findAllPublishApps = (
  . string,
) => Meta3dBsMostProtocol.StreamType.stream<array<publishAppInfo>>

type publishElementContribute = (
  . onUploadProgressFunc,
  string,
  (string, string, string, string),
  Js.Typed_array.ArrayBuffer.t,
) => Meta3dBsMostProtocol.StreamType.stream<unit>

type uiControl = {
  name: string,
  rect: ElementAssembleStoreType.rect,
  isDraw: ElementAssembleStoreType.isDraw,
  skin: ElementAssembleStoreType.skin,
  event: ElementAssembleStoreType.event,
  specific: ElementAssembleStoreType.specific,
}

type inspectorData = {
  element: ElementAssembleStoreType.elementInspectorData,
  uiControls: array<uiControl>,
}

type publishElementAssembleData = (
  . string,
  string,
  string,
  inspectorData,
) => Meta3dBsMostProtocol.StreamType.stream<unit>

type implement = {
  id: string,
  file: Js.Typed_array.ArrayBuffer.t,
  version: string,
  account: account,
}

type implements = array<implement>

type getAllPublishNewestExtensions = (
  . string,
) => Meta3dBsMostProtocol.StreamType.stream<implements>

type elementName = string

type elementVersion = string

type elementAssembleData = {
  elementName: elementName,
  elementVersion: elementVersion,
  inspectorData: inspectorData,
}

type getElementAssembleData = (
  . account,
  elementName,
  elementVersion,
) => Meta3dBsMostProtocol.StreamType.stream<elementAssembleData>
