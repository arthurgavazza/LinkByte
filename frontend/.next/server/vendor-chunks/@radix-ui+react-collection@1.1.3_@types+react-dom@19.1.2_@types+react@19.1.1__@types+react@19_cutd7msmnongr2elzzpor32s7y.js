"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@radix-ui+react-collection@1.1.3_@types+react-dom@19.1.2_@types+react@19.1.1__@types+react@19_cutd7msmnongr2elzzpor32s7y";
exports.ids = ["vendor-chunks/@radix-ui+react-collection@1.1.3_@types+react-dom@19.1.2_@types+react@19.1.1__@types+react@19_cutd7msmnongr2elzzpor32s7y"];
exports.modules = {

/***/ "(ssr)/./node_modules/.pnpm/@radix-ui+react-collection@1.1.3_@types+react-dom@19.1.2_@types+react@19.1.1__@types+react@19_cutd7msmnongr2elzzpor32s7y/node_modules/@radix-ui/react-collection/dist/index.mjs":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@radix-ui+react-collection@1.1.3_@types+react-dom@19.1.2_@types+react@19.1.1__@types+react@19_cutd7msmnongr2elzzpor32s7y/node_modules/@radix-ui/react-collection/dist/index.mjs ***!
  \************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCollection: () => (/* binding */ createCollection)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @radix-ui/react-context */ \"(ssr)/./node_modules/.pnpm/@radix-ui+react-context@1.1.2_@types+react@19.1.1_react@19.1.0/node_modules/@radix-ui/react-context/dist/index.mjs\");\n/* harmony import */ var _radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @radix-ui/react-compose-refs */ \"(ssr)/./node_modules/.pnpm/@radix-ui+react-compose-refs@1.1.2_@types+react@19.1.1_react@19.1.0/node_modules/@radix-ui/react-compose-refs/dist/index.mjs\");\n/* harmony import */ var _radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @radix-ui/react-slot */ \"(ssr)/./node_modules/.pnpm/@radix-ui+react-slot@1.2.0_@types+react@19.1.1_react@19.1.0/node_modules/@radix-ui/react-slot/dist/index.mjs\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"(ssr)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js\");\n/* __next_internal_client_entry_do_not_use__ createCollection auto */ // packages/react/collection/src/collection.tsx\n\n\n\n\n\nfunction createCollection(name) {\n    const PROVIDER_NAME = name + \"CollectionProvider\";\n    const [createCollectionContext, createCollectionScope] = (0,_radix_ui_react_context__WEBPACK_IMPORTED_MODULE_2__.createContextScope)(PROVIDER_NAME);\n    const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(PROVIDER_NAME, {\n        collectionRef: {\n            current: null\n        },\n        itemMap: /* @__PURE__ */ new Map()\n    });\n    const CollectionProvider = (props)=>{\n        const { scope, children } = props;\n        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);\n        const itemMap = react__WEBPACK_IMPORTED_MODULE_0__.useRef(/* @__PURE__ */ new Map()).current;\n        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionProviderImpl, {\n            scope,\n            itemMap,\n            collectionRef: ref,\n            children\n        });\n    };\n    CollectionProvider.displayName = PROVIDER_NAME;\n    const COLLECTION_SLOT_NAME = name + \"CollectionSlot\";\n    const CollectionSlotImpl = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__.createSlot)(COLLECTION_SLOT_NAME);\n    const CollectionSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{\n        const { scope, children } = props;\n        const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);\n        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__.useComposedRefs)(forwardedRef, context.collectionRef);\n        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionSlotImpl, {\n            ref: composedRefs,\n            children\n        });\n    });\n    CollectionSlot.displayName = COLLECTION_SLOT_NAME;\n    const ITEM_SLOT_NAME = name + \"CollectionItemSlot\";\n    const ITEM_DATA_ATTR = \"data-radix-collection-item\";\n    const CollectionItemSlotImpl = (0,_radix_ui_react_slot__WEBPACK_IMPORTED_MODULE_3__.createSlot)(ITEM_SLOT_NAME);\n    const CollectionItemSlot = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, forwardedRef)=>{\n        const { scope, children, ...itemData } = props;\n        const ref = react__WEBPACK_IMPORTED_MODULE_0__.useRef(null);\n        const composedRefs = (0,_radix_ui_react_compose_refs__WEBPACK_IMPORTED_MODULE_4__.useComposedRefs)(forwardedRef, ref);\n        const context = useCollectionContext(ITEM_SLOT_NAME, scope);\n        react__WEBPACK_IMPORTED_MODULE_0__.useEffect({\n            \"createCollection.CollectionItemSlot.useEffect\": ()=>{\n                context.itemMap.set(ref, {\n                    ref,\n                    ...itemData\n                });\n                return ({\n                    \"createCollection.CollectionItemSlot.useEffect\": ()=>void context.itemMap.delete(ref)\n                })[\"createCollection.CollectionItemSlot.useEffect\"];\n            }\n        }[\"createCollection.CollectionItemSlot.useEffect\"]);\n        return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(CollectionItemSlotImpl, {\n            ...{\n                [ITEM_DATA_ATTR]: \"\"\n            },\n            ref: composedRefs,\n            children\n        });\n    });\n    CollectionItemSlot.displayName = ITEM_SLOT_NAME;\n    function useCollection(scope) {\n        const context = useCollectionContext(name + \"CollectionConsumer\", scope);\n        const getItems = react__WEBPACK_IMPORTED_MODULE_0__.useCallback({\n            \"createCollection.useCollection.useCallback[getItems]\": ()=>{\n                const collectionNode = context.collectionRef.current;\n                if (!collectionNode) return [];\n                const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));\n                const items = Array.from(context.itemMap.values());\n                const orderedItems = items.sort({\n                    \"createCollection.useCollection.useCallback[getItems].orderedItems\": (a, b)=>orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)\n                }[\"createCollection.useCollection.useCallback[getItems].orderedItems\"]);\n                return orderedItems;\n            }\n        }[\"createCollection.useCollection.useCallback[getItems]\"], [\n            context.collectionRef,\n            context.itemMap\n        ]);\n        return getItems;\n    }\n    return [\n        {\n            Provider: CollectionProvider,\n            Slot: CollectionSlot,\n            ItemSlot: CollectionItemSlot\n        },\n        useCollection,\n        createCollectionScope\n    ];\n}\n //# sourceMappingURL=index.mjs.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvLnBucG0vQHJhZGl4LXVpK3JlYWN0LWNvbGxlY3Rpb25AMS4xLjNfQHR5cGVzK3JlYWN0LWRvbUAxOS4xLjJfQHR5cGVzK3JlYWN0QDE5LjEuMV9fQHR5cGVzK3JlYWN0QDE5X2N1dGQ3bXNtbm9uZ3IyZWx6enBvcjMyczd5L25vZGVfbW9kdWxlcy9AcmFkaXgtdWkvcmVhY3QtY29sbGVjdGlvbi9kaXN0L2luZGV4Lm1qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWtCO0FBQ2lCO0FBQ0g7QUFDTTtBQXVDaEM7QUExQk4sU0FBUyxpQkFBaUUsTUFBYztJQUt0RixNQUFNLGdCQUFnQixPQUFPO0lBQzdCLE1BQU0sQ0FBQyx5QkFBeUIscUJBQXFCLElBQUksMkVBQWtCLENBQUMsYUFBYTtJQVV6RixNQUFNLENBQUMsd0JBQXdCLG9CQUFvQixJQUFJLHdCQUNyRCxlQUNBO1FBQUUsZUFBZTtZQUFFLFNBQVM7UUFBSztRQUFHLFNBQVMsb0JBQUksSUFBSTtJQUFFO0lBR3pELE1BQU0scUJBQTJFLENBQUM7UUFDaEYsTUFBTSxFQUFFLE9BQU8sU0FBUyxJQUFJO1FBQzVCLE1BQU0sTUFBTSx5Q0FBTSxDQUEwQixJQUFJO1FBQ2hELE1BQU0sVUFBVSx5Q0FBTSxDQUFnQyxvQkFBSSxJQUFJLENBQUMsRUFBRTtRQUNqRSxPQUNFLHVFQUFDO1lBQXVCO1lBQWM7WUFBa0IsZUFBZTtZQUNwRTtRQUFBLENBQ0g7SUFFSjtJQUVBLG1CQUFtQixjQUFjO0lBTWpDLE1BQU0sdUJBQXVCLE9BQU87SUFFcEMsTUFBTSxxQkFBcUIsZ0VBQVUsQ0FBQyxvQkFBb0I7SUFDMUQsTUFBTSwrQkFBaUIsNkNBQU0sQ0FDM0IsQ0FBQyxPQUFPO1FBQ04sTUFBTSxFQUFFLE9BQU8sU0FBUyxJQUFJO1FBQzVCLE1BQU0sVUFBVSxxQkFBcUIsc0JBQXNCLEtBQUs7UUFDaEUsTUFBTSxlQUFlLDZFQUFlLENBQUMsY0FBYyxRQUFRLGFBQWE7UUFDeEUsT0FBTyx1RUFBQztZQUFtQixLQUFLO1lBQWU7UUFBQSxDQUFTO0lBQzFEO0lBR0YsZUFBZSxjQUFjO0lBTTdCLE1BQU0saUJBQWlCLE9BQU87SUFDOUIsTUFBTSxpQkFBaUI7SUFPdkIsTUFBTSx5QkFBeUIsZ0VBQVUsQ0FBQyxjQUFjO0lBQ3hELE1BQU0sbUNBQXFCLDZDQUFNLENBQy9CLENBQUMsT0FBTztRQUNOLE1BQU0sRUFBRSxPQUFPLFVBQVUsR0FBRyxTQUFTLElBQUk7UUFDekMsTUFBTSxNQUFNLHlDQUFNLENBQW9CLElBQUk7UUFDMUMsTUFBTSxlQUFlLDZFQUFlLENBQUMsY0FBYyxHQUFHO1FBQ3RELE1BQU0sVUFBVSxxQkFBcUIsZ0JBQWdCLEtBQUs7UUFFMUQsNENBQU07NkRBQVU7Z0JBQ2QsUUFBUSxRQUFRLElBQUksS0FBSztvQkFBRTtvQkFBSyxHQUFJO2dCQUFpQyxDQUFDO2dCQUN0RTtxRUFBTyxJQUFNLEtBQUssUUFBUSxRQUFRLE9BQU8sR0FBRzs7WUFDOUMsQ0FBQzs7UUFFRCxPQUNFLHVFQUFDO1lBQXdCLEdBQUc7Z0JBQUUsQ0FBQyxjQUFjLEdBQUc7WUFBRztZQUFHLEtBQUs7WUFDeEQ7UUFBQSxDQUNIO0lBRUo7SUFHRixtQkFBbUIsY0FBYztJQU1qQyxTQUFTLGNBQWMsT0FBWTtRQUNqQyxNQUFNLFVBQVUscUJBQXFCLE9BQU8sc0JBQXNCLEtBQUs7UUFFdkUsTUFBTSxXQUFXLDhDQUFNO29FQUFZO2dCQUNqQyxNQUFNLGlCQUFpQixRQUFRLGNBQWM7Z0JBQzdDLElBQUksQ0FBQyxlQUFnQixRQUFPLENBQUM7Z0JBQzdCLE1BQU0sZUFBZSxNQUFNLEtBQUssZUFBZSxpQkFBaUIsSUFBSSxjQUFjLEdBQUcsQ0FBQztnQkFDdEYsTUFBTSxRQUFRLE1BQU0sS0FBSyxRQUFRLFFBQVEsT0FBTyxDQUFDO2dCQUNqRCxNQUFNLGVBQWUsTUFBTTt5RkFDekIsQ0FBQyxHQUFHLElBQU0sYUFBYSxRQUFRLEVBQUUsSUFBSSxPQUFRLElBQUksYUFBYSxRQUFRLEVBQUUsSUFBSSxPQUFROztnQkFFdEYsT0FBTztZQUNUO21FQUFHO1lBQUMsUUFBUTtZQUFlLFFBQVEsT0FBTztTQUFDO1FBRTNDLE9BQU87SUFDVDtJQUVBLE9BQU87UUFDTDtZQUFFLFVBQVU7WUFBb0IsTUFBTTtZQUFnQixVQUFVO1FBQW1CO1FBQ25GO1FBQ0E7S0FDRjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvYXJ0aHVyL3dvcmsvQmV0YUFjaWQvTGlua0J5dGUvc3JjL2NvbGxlY3Rpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0U2NvcGUgfSBmcm9tICdAcmFkaXgtdWkvcmVhY3QtY29udGV4dCc7XG5pbXBvcnQgeyB1c2VDb21wb3NlZFJlZnMgfSBmcm9tICdAcmFkaXgtdWkvcmVhY3QtY29tcG9zZS1yZWZzJztcbmltcG9ydCB7IGNyZWF0ZVNsb3QsIHR5cGUgU2xvdCB9IGZyb20gJ0ByYWRpeC11aS9yZWFjdC1zbG90JztcblxudHlwZSBTbG90UHJvcHMgPSBSZWFjdC5Db21wb25lbnRQcm9wc1dpdGhvdXRSZWY8dHlwZW9mIFNsb3Q+O1xudHlwZSBDb2xsZWN0aW9uRWxlbWVudCA9IEhUTUxFbGVtZW50O1xuaW50ZXJmYWNlIENvbGxlY3Rpb25Qcm9wcyBleHRlbmRzIFNsb3RQcm9wcyB7XG4gIHNjb3BlOiBhbnk7XG59XG5cbi8vIFdlIGhhdmUgcmVzb3J0ZWQgdG8gcmV0dXJuaW5nIHNsb3RzIGRpcmVjdGx5IHJhdGhlciB0aGFuIGV4cG9zaW5nIHByaW1pdGl2ZXMgdGhhdCBjYW4gdGhlblxuLy8gYmUgc2xvdHRlZCBsaWtlIGA8Q29sbGVjdGlvbkl0ZW0gYXM9e1Nsb3R9PuKApjwvQ29sbGVjdGlvbkl0ZW0+YC5cbi8vIFRoaXMgaXMgYmVjYXVzZSB3ZSBlbmNvdW50ZXJlZCBpc3N1ZXMgd2l0aCBnZW5lcmljIHR5cGVzIHRoYXQgY2Fubm90IGJlIHN0YXRpY2FsbHkgYW5hbHlzZWRcbi8vIGR1ZSB0byBjcmVhdGluZyB0aGVtIGR5bmFtaWNhbGx5IHZpYSBjcmVhdGVDb2xsZWN0aW9uLlxuXG5mdW5jdGlvbiBjcmVhdGVDb2xsZWN0aW9uPEl0ZW1FbGVtZW50IGV4dGVuZHMgSFRNTEVsZW1lbnQsIEl0ZW1EYXRhID0ge30+KG5hbWU6IHN0cmluZykge1xuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiBDb2xsZWN0aW9uUHJvdmlkZXJcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICBjb25zdCBQUk9WSURFUl9OQU1FID0gbmFtZSArICdDb2xsZWN0aW9uUHJvdmlkZXInO1xuICBjb25zdCBbY3JlYXRlQ29sbGVjdGlvbkNvbnRleHQsIGNyZWF0ZUNvbGxlY3Rpb25TY29wZV0gPSBjcmVhdGVDb250ZXh0U2NvcGUoUFJPVklERVJfTkFNRSk7XG5cbiAgdHlwZSBDb250ZXh0VmFsdWUgPSB7XG4gICAgY29sbGVjdGlvblJlZjogUmVhY3QuUmVmT2JqZWN0PENvbGxlY3Rpb25FbGVtZW50IHwgbnVsbD47XG4gICAgaXRlbU1hcDogTWFwPFxuICAgICAgUmVhY3QuUmVmT2JqZWN0PEl0ZW1FbGVtZW50IHwgbnVsbD4sXG4gICAgICB7IHJlZjogUmVhY3QuUmVmT2JqZWN0PEl0ZW1FbGVtZW50IHwgbnVsbD4gfSAmIEl0ZW1EYXRhXG4gICAgPjtcbiAgfTtcblxuICBjb25zdCBbQ29sbGVjdGlvblByb3ZpZGVySW1wbCwgdXNlQ29sbGVjdGlvbkNvbnRleHRdID0gY3JlYXRlQ29sbGVjdGlvbkNvbnRleHQ8Q29udGV4dFZhbHVlPihcbiAgICBQUk9WSURFUl9OQU1FLFxuICAgIHsgY29sbGVjdGlvblJlZjogeyBjdXJyZW50OiBudWxsIH0sIGl0ZW1NYXA6IG5ldyBNYXAoKSB9XG4gICk7XG5cbiAgY29uc3QgQ29sbGVjdGlvblByb3ZpZGVyOiBSZWFjdC5GQzx7IGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlOyBzY29wZTogYW55IH0+ID0gKHByb3BzKSA9PiB7XG4gICAgY29uc3QgeyBzY29wZSwgY2hpbGRyZW4gfSA9IHByb3BzO1xuICAgIGNvbnN0IHJlZiA9IFJlYWN0LnVzZVJlZjxDb2xsZWN0aW9uRWxlbWVudD4obnVsbCk7XG4gICAgY29uc3QgaXRlbU1hcCA9IFJlYWN0LnVzZVJlZjxDb250ZXh0VmFsdWVbJ2l0ZW1NYXAnXT4obmV3IE1hcCgpKS5jdXJyZW50O1xuICAgIHJldHVybiAoXG4gICAgICA8Q29sbGVjdGlvblByb3ZpZGVySW1wbCBzY29wZT17c2NvcGV9IGl0ZW1NYXA9e2l0ZW1NYXB9IGNvbGxlY3Rpb25SZWY9e3JlZn0+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvQ29sbGVjdGlvblByb3ZpZGVySW1wbD5cbiAgICApO1xuICB9O1xuXG4gIENvbGxlY3Rpb25Qcm92aWRlci5kaXNwbGF5TmFtZSA9IFBST1ZJREVSX05BTUU7XG5cbiAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogQ29sbGVjdGlvblNsb3RcbiAgICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICBjb25zdCBDT0xMRUNUSU9OX1NMT1RfTkFNRSA9IG5hbWUgKyAnQ29sbGVjdGlvblNsb3QnO1xuXG4gIGNvbnN0IENvbGxlY3Rpb25TbG90SW1wbCA9IGNyZWF0ZVNsb3QoQ09MTEVDVElPTl9TTE9UX05BTUUpO1xuICBjb25zdCBDb2xsZWN0aW9uU2xvdCA9IFJlYWN0LmZvcndhcmRSZWY8Q29sbGVjdGlvbkVsZW1lbnQsIENvbGxlY3Rpb25Qcm9wcz4oXG4gICAgKHByb3BzLCBmb3J3YXJkZWRSZWYpID0+IHtcbiAgICAgIGNvbnN0IHsgc2NvcGUsIGNoaWxkcmVuIH0gPSBwcm9wcztcbiAgICAgIGNvbnN0IGNvbnRleHQgPSB1c2VDb2xsZWN0aW9uQ29udGV4dChDT0xMRUNUSU9OX1NMT1RfTkFNRSwgc2NvcGUpO1xuICAgICAgY29uc3QgY29tcG9zZWRSZWZzID0gdXNlQ29tcG9zZWRSZWZzKGZvcndhcmRlZFJlZiwgY29udGV4dC5jb2xsZWN0aW9uUmVmKTtcbiAgICAgIHJldHVybiA8Q29sbGVjdGlvblNsb3RJbXBsIHJlZj17Y29tcG9zZWRSZWZzfT57Y2hpbGRyZW59PC9Db2xsZWN0aW9uU2xvdEltcGw+O1xuICAgIH1cbiAgKTtcblxuICBDb2xsZWN0aW9uU2xvdC5kaXNwbGF5TmFtZSA9IENPTExFQ1RJT05fU0xPVF9OQU1FO1xuXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqIENvbGxlY3Rpb25JdGVtXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgY29uc3QgSVRFTV9TTE9UX05BTUUgPSBuYW1lICsgJ0NvbGxlY3Rpb25JdGVtU2xvdCc7XG4gIGNvbnN0IElURU1fREFUQV9BVFRSID0gJ2RhdGEtcmFkaXgtY29sbGVjdGlvbi1pdGVtJztcblxuICB0eXBlIENvbGxlY3Rpb25JdGVtU2xvdFByb3BzID0gSXRlbURhdGEgJiB7XG4gICAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgICBzY29wZTogYW55O1xuICB9O1xuXG4gIGNvbnN0IENvbGxlY3Rpb25JdGVtU2xvdEltcGwgPSBjcmVhdGVTbG90KElURU1fU0xPVF9OQU1FKTtcbiAgY29uc3QgQ29sbGVjdGlvbkl0ZW1TbG90ID0gUmVhY3QuZm9yd2FyZFJlZjxJdGVtRWxlbWVudCwgQ29sbGVjdGlvbkl0ZW1TbG90UHJvcHM+KFxuICAgIChwcm9wcywgZm9yd2FyZGVkUmVmKSA9PiB7XG4gICAgICBjb25zdCB7IHNjb3BlLCBjaGlsZHJlbiwgLi4uaXRlbURhdGEgfSA9IHByb3BzO1xuICAgICAgY29uc3QgcmVmID0gUmVhY3QudXNlUmVmPEl0ZW1FbGVtZW50PihudWxsKTtcbiAgICAgIGNvbnN0IGNvbXBvc2VkUmVmcyA9IHVzZUNvbXBvc2VkUmVmcyhmb3J3YXJkZWRSZWYsIHJlZik7XG4gICAgICBjb25zdCBjb250ZXh0ID0gdXNlQ29sbGVjdGlvbkNvbnRleHQoSVRFTV9TTE9UX05BTUUsIHNjb3BlKTtcblxuICAgICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29udGV4dC5pdGVtTWFwLnNldChyZWYsIHsgcmVmLCAuLi4oaXRlbURhdGEgYXMgdW5rbm93biBhcyBJdGVtRGF0YSkgfSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB2b2lkIGNvbnRleHQuaXRlbU1hcC5kZWxldGUocmVmKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q29sbGVjdGlvbkl0ZW1TbG90SW1wbCB7Li4ueyBbSVRFTV9EQVRBX0FUVFJdOiAnJyB9fSByZWY9e2NvbXBvc2VkUmVmc30+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L0NvbGxlY3Rpb25JdGVtU2xvdEltcGw+XG4gICAgICApO1xuICAgIH1cbiAgKTtcblxuICBDb2xsZWN0aW9uSXRlbVNsb3QuZGlzcGxheU5hbWUgPSBJVEVNX1NMT1RfTkFNRTtcblxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiB1c2VDb2xsZWN0aW9uXG4gICAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgZnVuY3Rpb24gdXNlQ29sbGVjdGlvbihzY29wZTogYW55KSB7XG4gICAgY29uc3QgY29udGV4dCA9IHVzZUNvbGxlY3Rpb25Db250ZXh0KG5hbWUgKyAnQ29sbGVjdGlvbkNvbnN1bWVyJywgc2NvcGUpO1xuXG4gICAgY29uc3QgZ2V0SXRlbXMgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgICBjb25zdCBjb2xsZWN0aW9uTm9kZSA9IGNvbnRleHQuY29sbGVjdGlvblJlZi5jdXJyZW50O1xuICAgICAgaWYgKCFjb2xsZWN0aW9uTm9kZSkgcmV0dXJuIFtdO1xuICAgICAgY29uc3Qgb3JkZXJlZE5vZGVzID0gQXJyYXkuZnJvbShjb2xsZWN0aW9uTm9kZS5xdWVyeVNlbGVjdG9yQWxsKGBbJHtJVEVNX0RBVEFfQVRUUn1dYCkpO1xuICAgICAgY29uc3QgaXRlbXMgPSBBcnJheS5mcm9tKGNvbnRleHQuaXRlbU1hcC52YWx1ZXMoKSk7XG4gICAgICBjb25zdCBvcmRlcmVkSXRlbXMgPSBpdGVtcy5zb3J0KFxuICAgICAgICAoYSwgYikgPT4gb3JkZXJlZE5vZGVzLmluZGV4T2YoYS5yZWYuY3VycmVudCEpIC0gb3JkZXJlZE5vZGVzLmluZGV4T2YoYi5yZWYuY3VycmVudCEpXG4gICAgICApO1xuICAgICAgcmV0dXJuIG9yZGVyZWRJdGVtcztcbiAgICB9LCBbY29udGV4dC5jb2xsZWN0aW9uUmVmLCBjb250ZXh0Lml0ZW1NYXBdKTtcblxuICAgIHJldHVybiBnZXRJdGVtcztcbiAgfVxuXG4gIHJldHVybiBbXG4gICAgeyBQcm92aWRlcjogQ29sbGVjdGlvblByb3ZpZGVyLCBTbG90OiBDb2xsZWN0aW9uU2xvdCwgSXRlbVNsb3Q6IENvbGxlY3Rpb25JdGVtU2xvdCB9LFxuICAgIHVzZUNvbGxlY3Rpb24sXG4gICAgY3JlYXRlQ29sbGVjdGlvblNjb3BlLFxuICBdIGFzIGNvbnN0O1xufVxuXG5leHBvcnQgeyBjcmVhdGVDb2xsZWN0aW9uIH07XG5leHBvcnQgdHlwZSB7IENvbGxlY3Rpb25Qcm9wcyB9O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/.pnpm/@radix-ui+react-collection@1.1.3_@types+react-dom@19.1.2_@types+react@19.1.1__@types+react@19_cutd7msmnongr2elzzpor32s7y/node_modules/@radix-ui/react-collection/dist/index.mjs\n");

/***/ })

};
;