let buildButtonContributeProtocolConfigStr = () => {
  `
window.UIControlProtocolConfig = {
    getSkinProtocolData: () => {
        return {
            protocolName: "meta3d-skin-button-protocol",
            protocolVersion: "^0.6.0",
        }
    },
    generateUIControlDataStr: (rect, skin) => {
        return "{rect: " + rect + ", skin: " + skin + "}"
    },
    getUIControlSupportedEventNames: () => ["click"],
    generateHandleUIControlEventStr: ([clickActionName]) => {
        if (clickActionName !== null && clickActionName !== undefined) {
            return "handle click event code..."
        }

        return ""
    }
}
`
}
