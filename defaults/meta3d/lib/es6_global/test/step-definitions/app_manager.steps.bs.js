

import * as Curry from "../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_promise from "../../../../../../node_modules/rescript/lib/es6/js_promise.js";
import * as Main$Meta3d from "../../src/Main.bs.js";
import * as JestCucumber from "jest-cucumber";
import * as FileTool$Meta3d from "../tool/FileTool.bs.js";
import * as AppManagerTool$Meta3d from "../tool/AppManagerTool.bs.js";
import * as Tuple2$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/tuple/Tuple2.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as NullableSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/NullableSt.bs.js";
import * as Expect$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Expect.bs.js";
import * as ExtensionManagerTool$Meta3d from "../tool/ExtensionManagerTool.bs.js";
import * as Operators$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/Operators.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";
import * as CucumberAsync$Meta3dBsJestCucumber from "../../../../../../node_modules/meta3d-bs-jest-cucumber/lib/es6_global/src/CucumberAsync.bs.js";

var feature = JestCucumber.loadFeature("./test/features/app_manager.feature");

JestCucumber.defineFeature(feature, (function (test) {
        var firstExtension = {
          contents: 1
        };
        var secondExtension = {
          contents: 1
        };
        var c1 = {
          contents: 1
        };
        var _prepare = function (given) {
          return Curry._2(given, "prepare", (function (param) {
                        FileTool$Meta3d.buildFakeTextDecoder(FileTool$Meta3d.convertUint8ArrayToBuffer);
                        return FileTool$Meta3d.buildFakeTextEncoder();
                      }));
        };
        test("version not match case1", (function (param) {
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var secondExtension = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var secondExtensionFileData = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate two extensions that version not match", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "second-extension", {
                                    protocolName: "second-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "1.0.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2));
                      }));
                Curry._2(param.and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        secondExtensionFileData.contents = Main$Meta3d.loadExtension(secondExtension.contents);
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                Curry._2(param.then, "error", (function (param) {
                        Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                  return Main$Meta3d.convertAllFileDataForApp([
                                              firstExtensionFileData.contents,
                                              secondExtensionFileData.contents
                                            ], [], [], []);
                                }), "version not match");
                      }));
              }));
        test("version not match case2", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var firstContributeFileData = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate one extension", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                      }));
                Curry._2(and, "generate one contribute that version not match", (function (param) {
                        firstContribute.contents = Main$Meta3d.generateContribute({
                              name: "first-contribute",
                              protocol: {
                                name: "first-contribute-protocol",
                                version: ">=0.1.0 < 0.5.0"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        firstContributeFileData.contents = Main$Meta3d.loadContribute(firstContribute.contents);
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                Curry._2(param.then, "error", (function (param) {
                        Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                  return Main$Meta3d.convertAllFileDataForApp([firstExtensionFileData.contents], [firstContributeFileData.contents], [], []);
                                }), "version not match");
                      }));
              }));
        test("version not match case3", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var firstPackageEntryExtensionProtocolData = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate one extension", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-package-entry-extension", {
                                    protocolName: "first-package-entry-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                      }));
                Curry._2(and, "generate one package entry extension protocol data that version not match", (function (param) {
                        firstPackageEntryExtensionProtocolData.contents = {
                          name: "first-package-entry-extension-protocol",
                          version: ">1.0.0"
                        };
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                Curry._2(param.then, "error", (function (param) {
                        Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                  return Main$Meta3d.convertAllFileDataForApp([firstExtensionFileData.contents], [], [firstPackageEntryExtensionProtocolData.contents], []);
                                }), "version not match");
                      }));
              }));
        test("version match case1", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var firstContributeFileData = {
                  contents: 1
                };
                var firstPackageEntryExtensionProtocolData = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate one extension", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-package-entry-extension", {
                                    protocolName: "first-package-entry-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.3.0"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                      }));
                Curry._2(and, "generate one contribute that version match", (function (param) {
                        firstContribute.contents = Main$Meta3d.generateContribute({
                              name: "first-contribute",
                              protocol: {
                                name: "first-contribute-protocol",
                                version: "^0.3.0"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                      }));
                Curry._2(and, "generate one package entry extension protocol data that version match", (function (param) {
                        firstPackageEntryExtensionProtocolData.contents = {
                          name: "first-package-entry-extension-protocol",
                          version: ">=0.4.1 < 1.0.0"
                        };
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        firstContributeFileData.contents = Main$Meta3d.loadContribute(firstContribute.contents);
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                Curry._2(param.then, "not error", (function (param) {
                        Expect$Meta3dBsJestCucumber.toNotThrow(expect(function (param) {
                                  return Main$Meta3d.convertAllFileDataForApp([firstExtensionFileData.contents], [firstContributeFileData.contents], [firstPackageEntryExtensionProtocolData.contents], []);
                                }));
                      }));
              }));
        test("convert allExtensionFileData and allContributeFileData and allPackageEntryExtensionProtocolData", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var secondExtension = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var firstExtensionFileData = {
                  contents: 1
                };
                var secondExtensionFileData = {
                  contents: 1
                };
                var firstContributeFileData = {
                  contents: 1
                };
                var firstPackageEntryExtensionProtocolData = {
                  contents: 1
                };
                var startExtensionNames = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "generate two extensions that the seond is started", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "second-extension", {
                                    protocolName: "second-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "0.5.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-package-entry-extension", {
                                    protocolName: "first-package-entry-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2));
                        startExtensionNames.contents = ["second-extension"];
                      }));
                Curry._2(and, "generate one contribute", (function (param) {
                        firstContribute.contents = Main$Meta3d.generateContribute({
                              name: "first-contribute",
                              protocol: {
                                name: "first-contribute-protocol",
                                version: "0.5.3"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                      }));
                Curry._2(and, "generate one package entry extension protocol data", (function (param) {
                        firstPackageEntryExtensionProtocolData.contents = {
                          name: "first-package-entry-extension-protocol",
                          version: ">=0.4.1 < 1.0.0"
                        };
                      }));
                Curry._2(and, "load them as l1", (function (param) {
                        firstExtensionFileData.contents = Main$Meta3d.loadExtension(firstExtension.contents);
                        secondExtensionFileData.contents = Main$Meta3d.loadExtension(secondExtension.contents);
                        firstContributeFileData.contents = Main$Meta3d.loadContribute(firstContribute.contents);
                      }));
                Curry._2(param.when, "convert l1", (function (param) {
                        
                      }));
                Curry._2(param.then, "converted package data is correct", (function (param) {
                        var match = Main$Meta3d.convertAllFileDataForApp([
                              firstExtensionFileData.contents,
                              secondExtensionFileData.contents
                            ], [firstContributeFileData.contents], [firstPackageEntryExtensionProtocolData.contents], startExtensionNames.contents);
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  ArraySt$Meta3dCommonlib.map(match[0], Tuple2$Meta3dCommonlib.getFirst),
                                  ArraySt$Meta3dCommonlib.map(match[1], Tuple2$Meta3dCommonlib.getFirst)
                                ]), [
                              [
                                {
                                  name: "first-extension",
                                  protocolName: "first-extension-protocol",
                                  type_: /* Default */0,
                                  dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "second-extension", "second-extension-protocol"),
                                  dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", "first-contribute-protocol")
                                },
                                {
                                  name: "second-extension",
                                  protocolName: "second-extension-protocol",
                                  type_: /* Start */1,
                                  dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-package-entry-extension", "first-package-entry-extension-protocol"),
                                  dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", "first-contribute-protocol")
                                }
                              ],
                              [{
                                  name: "first-contribute",
                                  protocolName: "first-contribute-protocol",
                                  dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                                  dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                                }]
                            ]);
                      }));
              }));
        test("load and start generated app", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var secondExtension = {
                  contents: 1
                };
                var firstContribute = {
                  contents: 1
                };
                var firstPackageEntryExtensionProtocolData = {
                  contents: 1
                };
                var p1 = {
                  contents: 1
                };
                var c1 = {
                  contents: 1
                };
                var startExtensionName = {
                  contents: 1
                };
                var configData = {
                  contents: 1
                };
                var configDataResult = {
                  contents: 1
                };
                var state = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "prepare flag", (function (param) {
                        return AppManagerTool$Meta3d.prepareStartFlag(undefined);
                      }));
                Curry._2(given, "generate two extensions", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "package-first-extension", {
                                        protocolName: "package-first-extension-protocol",
                                        protocolVersion: ">=0.4.1 < 1.0.0"
                                      }), "second-extension", {
                                    protocolName: "second-extension-protocol",
                                    protocolVersion: ">=0.4.1 < 1.0.0"
                                  }),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "0.5.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.set(ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined), "first-contribute", {
                                    protocolName: "first-contribute-protocol",
                                    protocolVersion: "^0.5.2"
                                  })
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2));
                      }));
                Curry._2(and, "generate one contribute", (function (param) {
                        firstContribute.contents = Main$Meta3d.generateContribute({
                              name: "first-contribute",
                              protocol: {
                                name: "first-contribute-protocol",
                                version: "0.5.3"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                      }));
                Curry._2(and, "generate one package as p1 with one extension and one contribute", (function (param) {
                        var extension = Main$Meta3d.generateExtension({
                              name: "package-first-extension",
                              protocol: {
                                name: "package-first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStr(undefined));
                        var contribute = Main$Meta3d.generateContribute({
                              name: "package-first-contribute",
                              protocol: {
                                name: "package-first-contribute-protocol",
                                version: "0.5.3"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyContributeFileStr(undefined));
                        var extensionFileData = Main$Meta3d.loadExtension(extension);
                        var contributeFileData = Main$Meta3d.loadContribute(contribute);
                        startExtensionName.contents = "second-extension";
                        p1.contents = Main$Meta3d.generatePackage(Main$Meta3d.convertAllFileDataForPackage([extensionFileData], [contributeFileData], ["package-first-extension"]), []);
                      }));
                Curry._2(and, "generate one package entry extension protocol data", (function (param) {
                        firstPackageEntryExtensionProtocolData.contents = {
                          name: "package-first-extension-protocol",
                          version: ">=0.4.1 < 1.0.0"
                        };
                      }));
                Curry._2(and, "start the second extension", (function (param) {
                        startExtensionName.contents = "second-extension";
                      }));
                Curry._2(and, "load them and convert as c1", (function (param) {
                        var firstExtensionFileData = Main$Meta3d.loadExtension(firstExtension.contents);
                        var secondExtensionFileData = Main$Meta3d.loadExtension(secondExtension.contents);
                        var firstContributeFileData = Main$Meta3d.loadContribute(firstContribute.contents);
                        c1.contents = Main$Meta3d.convertAllFileDataForApp([
                              firstExtensionFileData,
                              secondExtensionFileData
                            ], [firstContributeFileData], [firstPackageEntryExtensionProtocolData.contents], [startExtensionName.contents]);
                      }));
                Curry._2(and, "prepare config data", (function (param) {
                        configData.contents = [
                          {
                            width: 1,
                            height: 2
                          },
                          {
                            isDebug: true
                          }
                        ];
                      }));
                Curry._2(param.when, "generate app with c1, p1, config data and load it and start it", (function (param) {
                        var match = Main$Meta3d.loadApp(Main$Meta3d.generateApp(c1.contents, [p1.contents], NullableSt$Meta3dCommonlib.$$return(configData.contents)));
                        var s = match[0];
                        configDataResult.contents = match[2];
                        state.contents = s;
                        Main$Meta3d.startApp([
                              s,
                              match[1],
                              configDataResult.contents
                            ]);
                      }));
                Curry._2(param.then, "the three extensions should be registered", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "first-extension-protocol"),
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "second-extension-protocol"),
                                  ExtensionManagerTool$Meta3d.hasExtension(state.contents, "package-first-extension-protocol")
                                ]), [
                              true,
                              true,
                              true
                            ]);
                      }));
                Curry._2(and, "the two contributes should be registered", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect([
                                  ExtensionManagerTool$Meta3d.hasContribute(state.contents, "first-contribute-protocol"),
                                  ExtensionManagerTool$Meta3d.hasContribute(state.contents, "package-first-contribute-protocol")
                                ]), [
                              true,
                              true
                            ]);
                      }));
                Curry._2(and, "load result should has correct config data", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(configDataResult.contents), configData.contents);
                      }));
                Curry._2(and, "the second extension should be started", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(AppManagerTool$Meta3d.getStartFlag(undefined)), 4);
                      }));
              }));
        test("if two extension need start, error", (function (param) {
                var and = param.and;
                var given = param.given;
                var firstExtension = {
                  contents: 1
                };
                var secondExtension = {
                  contents: 1
                };
                var c1 = {
                  contents: 1
                };
                var startExtensionNames = {
                  contents: 1
                };
                var loadData = {
                  contents: 1
                };
                _prepare(given);
                Curry._2(given, "prepare flag", (function (param) {
                        return AppManagerTool$Meta3d.prepareStartFlag(undefined);
                      }));
                Curry._2(and, "generate two extensions", (function (param) {
                        firstExtension.contents = Main$Meta3d.generateExtension({
                              name: "first-extension",
                              protocol: {
                                name: "first-extension-protocol",
                                version: "0.4.1"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(1));
                        secondExtension.contents = Main$Meta3d.generateExtension({
                              name: "second-extension",
                              protocol: {
                                name: "second-extension-protocol",
                                version: "0.5.2"
                              },
                              dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                              dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                            }, AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnStart(2));
                      }));
                Curry._2(and, "start them", (function (param) {
                        startExtensionNames.contents = [
                          "first-extension",
                          "second-extension"
                        ];
                      }));
                Curry._2(and, "load them and convert as c1", (function (param) {
                        var firstExtensionFileData = Main$Meta3d.loadExtension(firstExtension.contents);
                        var secondExtensionFileData = Main$Meta3d.loadExtension(secondExtension.contents);
                        c1.contents = Main$Meta3d.convertAllFileDataForApp([
                              firstExtensionFileData,
                              secondExtensionFileData
                            ], [], [], startExtensionNames.contents);
                      }));
                Curry._2(param.when, "generate app with c1 and load it", (function (param) {
                        loadData.contents = Main$Meta3d.loadApp(Main$Meta3d.generateApp(c1.contents, [], null));
                      }));
                Curry._2(param.then, "start it should error", (function (param) {
                        Expect$Meta3dBsJestCucumber.toThrowMessage(expect(function (param) {
                                  Main$Meta3d.startApp(loadData.contents);
                                }), "should only has one type extension");
                      }));
              }));
        var _prepareForLoadAndHandleGeneratedApp = function (given, and, param) {
          var buildEmptyExtensionFileStrWithLifeHandle = param[1];
          var prepareFlag = param[0];
          Curry._2(given, "prepare flag", (function (param) {
                  Curry._1(prepareFlag, undefined);
                }));
          Curry._2(given, "generate two extensions", (function (param) {
                  firstExtension.contents = Main$Meta3d.generateExtension({
                        name: "first-extension",
                        protocol: {
                          name: "first-extension-protocol",
                          version: "0.4.1"
                        },
                        dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                        dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                      }, Curry._1(buildEmptyExtensionFileStrWithLifeHandle, 1));
                  secondExtension.contents = Main$Meta3d.generateExtension({
                        name: "second-extension",
                        protocol: {
                          name: "second-extension-protocol",
                          version: "0.5.2"
                        },
                        dependentExtensionNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
                        dependentContributeNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
                      }, Curry._1(buildEmptyExtensionFileStrWithLifeHandle, 2));
                }));
          return Curry._2(and, "load them and convert as c1", (function (param) {
                        var firstExtensionFileData = Main$Meta3d.loadExtension(firstExtension.contents);
                        var secondExtensionFileData = Main$Meta3d.loadExtension(secondExtension.contents);
                        c1.contents = Main$Meta3d.convertAllFileDataForApp([
                              firstExtensionFileData,
                              secondExtensionFileData
                            ], [], [], []);
                      }));
        };
        test("load and init generated app", (function (param) {
                var given = param.given;
                var state = {
                  contents: 1
                };
                _prepare(given);
                _prepareForLoadAndHandleGeneratedApp(given, param.and, [
                      AppManagerTool$Meta3d.prepareInitFlag,
                      AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnInit
                    ]);
                CucumberAsync$Meta3dBsJestCucumber.execStep(param.when, "generate app with c1 and load it and init the first extension", (function (param) {
                        var match = Main$Meta3d.loadApp(Main$Meta3d.generateApp(c1.contents, [], null));
                        var s = match[0];
                        state.contents = s;
                        var __x = Main$Meta3d.initExtension(s, "first-extension-protocol", 10);
                        return Js_promise.then_((function (s) {
                                      state.contents = s;
                                      return Promise.resolve(undefined);
                                    }), __x);
                      }));
                Curry._2(param.then, "the first extension should be inited", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(AppManagerTool$Meta3d.getInitFlag(undefined)), 11);
                      }));
              }));
        test("load and update generated app", (function (param) {
                var given = param.given;
                var state = {
                  contents: 1
                };
                _prepare(given);
                _prepareForLoadAndHandleGeneratedApp(given, param.and, [
                      AppManagerTool$Meta3d.prepareUpdateFlag,
                      AppManagerTool$Meta3d.buildEmptyExtensionFileStrWithOnUpdate
                    ]);
                CucumberAsync$Meta3dBsJestCucumber.execStep(param.when, "generate app with c1 and load it and update the second extension", (function (param) {
                        var match = Main$Meta3d.loadApp(Main$Meta3d.generateApp(c1.contents, [], null));
                        var s = match[0];
                        state.contents = s;
                        var __x = Main$Meta3d.updateExtension(s, "second-extension-protocol", 20);
                        return Js_promise.then_((function (s) {
                                      state.contents = s;
                                      return Promise.resolve(undefined);
                                    }), __x);
                      }));
                Curry._2(param.then, "the second extension should be updated", (function (param) {
                        Operators$Meta3dBsJestCucumber.$eq(expect(AppManagerTool$Meta3d.getUpdateFlag(undefined)), 22);
                      }));
              }));
      }));

export {
  feature ,
}
/* feature Not a pure module */