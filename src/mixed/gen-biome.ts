import { styleText } from "node:util"
import { writeFile } from "node:fs/promises"
import path from "node:path"
import { existsSync } from "node:fs"

async function run(): Promise<void> {
  const pkjJsonPath = path.join(process.cwd(), "package.json")

  try {
    if (existsSync("biome.json")) return

    // TODO: fix this
    // @ts-expect-error:
    const pkjJson = await import(pkjJsonPath, { with: { type: "json" } })

    if (pkjJson) {
      const shouldWrite = {
        format: !("format" in pkjJson.default.scripts),
        lint: !("lint" in pkjJson.default.scripts),
        "lint:unsafe": !("lint:unsafe" in pkjJson.default.scripts),
      }

      if (!pkjJson.default.scripts) {
        Object.assign(pkjJson.default, { scripts: {} })
      }

      if (shouldWrite.format) {
        Object.assign(pkjJson.default.scripts, { format: "biome format --write ." })
      }

      if (shouldWrite.lint) {
        Object.assign(pkjJson.default.scripts, { lint: "biome lint --write ." })
      }

      if (shouldWrite["lint:unsafe"]) {
        Object.assign(pkjJson.default.scripts, { "lint:unsafe": "biome lint --write --unsafe ." })
      }

      if (Object.values(shouldWrite).some(Boolean)) {
        writeFile(pkjJsonPath, JSON.stringify(pkjJson.default, null, 2))
      }
    }

    writeFile("biome.json", getBiomeFileContent(), { mode: 0o644 })
  } catch (error) {
    if (error instanceof Error) {
      console.log(styleText(["red", "bold"], error.message))
    }
  }
}

export default { run, title: "Gen Biome" }

function getBiomeFileContent() {
  const biome = {
    $schema: "https://biomejs.dev/schemas/1.8.1/schema.json",
    organizeImports: { enabled: true },
    javascript: {
      formatter: {
        semicolons: "asNeeded",
        trailingCommas: "es5",
        arrowParentheses: "always",
      },
      parser: {
        unsafeParameterDecoratorsEnabled: true,
      },
    },
    formatter: {
      lineWidth: 120,
      indentStyle: "space",
      indentWidth: 2,
      ignore: ["dist", "build", "node_modules", "bin"],
      attributePosition: "multiline",
    },
    linter: {
      ignore: ["dist", "build", "node_modules", "bin"],
      enabled: true,
      rules: {
        recommended: true,
        style: {
          noVar: "error",
          useWhile: "error",
          useForOf: "warn",
          useTemplate: "error",
          noArguments: "warn",
          useImportType: "off",
          noUselessElse: "error",
          useExportType: "error",
          noNegationElse: "warn",
          noCommaOperator: "error",
          noDefaultExport: "off",
          noShoutyConstants: "warn",
          noImplicitBoolean: "error",
          noInferrableTypes: "warn",
          noParameterAssign: "error",
          useFragmentSyntax: "error",
          noNonNullAssertion: "info",
          useBlockStatements: "off",
          useCollapsedElseIf: "warn",
          useShorthandAssign: "info",
          useNumericLiterals: "error",
          useNumberNamespace: "error",
          noRestrictedGlobals: "warn",
          useAsConstAssertion: "warn",
          useNodeAssertStrict: "error",
          useEnumInitializers: "error",
          useNamingConvention: "off",
          useShorthandArrayType: "error",
          useLiteralEnumMembers: "error",
          useSelfClosingElements: "info",
          useSingleVarDeclarator: "error",
          useSingleCaseStatement: "error",
          useConsistentArrayType: "error",
          noUnusedTemplateLiteral: "warn",
          useFilenamingConvention: "info",
          useDefaultParameterLast: "error",
          useNodejsImportProtocol: "error",
          useShorthandFunctionType: "error",
          useExponentiationOperator: "error",
        },
        complexity: {
          noVoid: "off",
          noWith: "error",
          noForEach: "off",
          useFlatMap: "error",
          noBannedTypes: "error",
          useLiteralKeys: "error",
          noThisInStatic: "error",
          noUselessCatch: "error",
          noUselessLabel: "error",
          noUselessRename: "error",
          noUselessTernary: "error",
          useArrowFunction: "error",
          useOptionalChain: "error",
          useRegexLiterals: "error",
          noStaticOnlyClass: "error",
          noUselessThisAlias: "error",
          noExtraBooleanCast: "error",
          noUselessFragments: "error",
          useSimpleNumberKeys: "error",
          noUselessSwitchCase: "error",
          noUselessConstructor: "error",
          noUselessEmptyExport: "error",
          noEmptyTypeParameters: "error",
          noUselessTypeConstraint: "error",
          noExcessiveNestedTestSuites: "error",
          noUselessLoneBlockStatements: "error",
          useSimplifiedLogicExpression: "error",
          noMultipleSpacesInRegularExpressionLiterals: "error",
          noExcessiveCognitiveComplexity: {
            level: "warn",
            options: { maxAllowedComplexity: 20 },
          },
        },
        suspicious: {
          useAwait: "off",
          useIsArray: "error",
          noDebugger: "warn",
          noRedeclare: "error",
          noConstEnum: "warn",
          noConsoleLog: "off",
          noGlobalIsNan: "error",
          noSelfCompare: "error",
          noSparseArray: "error",
          noExplicitAny: "off",
          noCatchAssign: "error",
          noClassAssign: "error",
          noCommentText: "error",
          noGlobalAssign: "error",
          noImportAssign: "error",
          noThenProperty: "error",
          useValidTypeof: "error",
          noDoubleEquals: "error",
          useGetterReturn: "error",
          noExportsInTest: "error",
          noArrayIndexKey: "error",
          noDuplicateCase: "error",
          noFunctionAssign: "error",
          noUnsafeNegation: "error",
          noImplicitAnyLet: "error",
          noEmptyInterface: "off",
          noCompareNegZero: "error",
          noConfusingLabels: "error",
          noPrototypeBuiltins: "error",
          useNamespaceKeyword: "error",
          noConfusingVoidType: "error",
          noDuplicateJsxProps: "error",
          noRedundantUseStrict: "error",
          noDuplicateParameters: "error",
          noDuplicateObjectKeys: "error",
          noAssignInExpressions: "error",
          noEmptyBlockStatements: "error",
          noAsyncPromiseExecutor: "error",
          noShadowRestrictedNames: "error",
          noExtraNonNullAssertion: "error",
          noDuplicateClassMembers: "error",
          noMisleadingInstantiator: "error",
          noFallthroughSwitchClause: "error",
          noSuspiciousSemicolonInJsx: "error",
          noUnsafeDeclarationMerging: "error",
          useDefaultSwitchClauseLast: "error",
          noMisrefactoredShorthandAssign: "error",
          noApproximativeNumericConstant: "error",
        },
        correctness: {
          useIsNan: "error",
          useYield: "error",
          noNewSymbol: "error",
          noSelfAssign: "error",
          noConstAssign: "error",
          noUnreachable: "warn",
          noChildrenProp: "error",
          noSetterReturn: "error",
          noEmptyPattern: "error",
          noUnusedLabels: "error",
          noPrecisionLoss: "error",
          noUnsafeFinally: "error",
          noUnusedImports: "error",
          useArrayLiterals: "error",
          noVoidTypeReturn: "error",
          useHookAtTopLevel: "error",
          noUnusedVariables: "off",
          noFlatMapIdentity: "error",
          noUnreachableSuper: "error",
          useJsxKeyInIterable: "warn",
          noConstantCondition: "error",
          noConstructorReturn: "error",
          noGlobalObjectCalls: "error",
          noInnerDeclarations: "error",
          noRenderReturnValue: "error",
          noInvalidNewBuiltin: "error",
          useValidForDirection: "warn",
          noStringCaseMismatch: "error",
          noSwitchDeclarations: "error",
          noUnnecessaryContinue: "error",
          noNonoctalDecimalEscape: "error",
          noUnsafeOptionalChaining: "error",
          useExhaustiveDependencies: "warn",
          noInvalidConstructorSuper: "error",
          noConstantMathMinMaxClamp: "error",
          noVoidElementsWithChildren: "error",
          noUnusedPrivateClassMembers: "error",
          noEmptyCharacterClassInRegex: "error",
          noInvalidUseBeforeDeclaration: "warn",
        },
        security: {
          noGlobalEval: "error",
        },
        nursery: {
          useThrowNewError: "error",
          useThrowOnlyError: "error",
        },
        performance: {
          noAccumulatingSpread: "error",
          noBarrelFile: "error",
          noDelete: "error",
          noReExportAll: "error",
        },
      },
    },
  }

  return JSON.stringify(biome, null, 2)
}
