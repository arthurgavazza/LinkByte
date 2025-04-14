"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./providers/auth-provider.tsx":
/*!*************************************!*\
  !*** ./providers/auth-provider.tsx ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/api/generated/auth/auth */ \"(app-pages-browser)/./lib/api/generated/auth/auth.ts\");\n/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sonner */ \"(app-pages-browser)/./node_modules/.pnpm/sonner@1.7.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/sonner/dist/index.mjs\");\n/* harmony import */ var _lib_api_custom_instance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/api/custom-instance */ \"(app-pages-browser)/./lib/api/custom-instance.ts\");\n/* __next_internal_client_entry_do_not_use__ AuthProvider,useAuth auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction AuthProvider(param) {\n    let { children } = param;\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();\n    const isAuthenticated = !!user;\n    // Login mutation\n    const loginMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLoginApiAuthLoginPost)();\n    // Logout mutation\n    const logoutMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLogoutApiAuthLogoutPost)();\n    // Register mutation\n    const registerMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useRegisterApiAuthRegisterPost)();\n    // Custom function to get current user\n    const getCurrentUser = async ()=>{\n        return (0,_lib_api_custom_instance__WEBPACK_IMPORTED_MODULE_5__.customInstanceFn)({\n            url: '/api/auth/me',\n            method: 'GET'\n        });\n    };\n    // Function to fetch the current user profile\n    const fetchUserProfile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)({\n        \"AuthProvider.useCallback[fetchUserProfile]\": async ()=>{\n            // Don't set loading state to true if we're already loading - prevents multiple concurrent requests\n            if (!isLoading) {\n                setIsLoading(true);\n                console.log('Auth: Started loading user profile');\n            }\n            try {\n                console.log('Auth: Attempting to fetch user profile');\n                const userData = await getCurrentUser();\n                console.log('Auth: Successfully fetched user profile', userData);\n                setUser(userData);\n            } catch (error) {\n                var _error_response;\n                console.error('Auth: Failed to fetch user profile', (error === null || error === void 0 ? void 0 : error.message) || error);\n                // If the error is a 401, it means the user is not authenticated\n                if ((error === null || error === void 0 ? void 0 : (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status) === 401) {\n                    console.log('Auth: User is not authenticated (401)');\n                }\n                setUser(null);\n            } finally{\n                console.log('Auth: Finished loading user profile');\n                setIsLoading(false);\n            }\n        }\n    }[\"AuthProvider.useCallback[fetchUserProfile]\"], [\n        isLoading\n    ]);\n    // Function to refresh the token\n    const refreshToken = async ()=>{\n        // Don't attempt refresh if we're not authenticated\n        if (!isAuthenticated && !isLoading) {\n            return false;\n        }\n        try {\n            await (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.refreshTokenApiAuthRefreshPost)();\n            return true;\n        } catch (error) {\n            console.error('Failed to refresh token', error);\n            setUser(null);\n            return false;\n        }\n    };\n    // Login function\n    const login = async (username, password)=>{\n        try {\n            await loginMutation.mutateAsync({\n                data: {\n                    username,\n                    password\n                }\n            });\n            // After successful login, fetch the user profile\n            await fetchUserProfile();\n            // Redirect to dashboard after successful login\n            router.push('/dashboard');\n        } catch (error) {\n            console.error('Login failed', error);\n            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Login Failed', {\n                description: 'Invalid credentials. Please try again.'\n            });\n            throw error;\n        }\n    };\n    // Register function\n    const register = async (email, username, password)=>{\n        try {\n            await registerMutation.mutateAsync({\n                data: {\n                    email,\n                    username,\n                    password\n                }\n            });\n            // After successful registration, log the user in\n            await login(username, password);\n        } catch (error) {\n            console.error('Registration failed', error);\n            throw error;\n        }\n    };\n    // Logout function\n    const logout = async ()=>{\n        try {\n            await logoutMutation.mutateAsync();\n            setUser(null);\n            // Redirect to home page after logout\n            router.push('/');\n        } catch (error) {\n            console.error('Logout failed', error);\n            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Logout Failed', {\n                description: 'Failed to logout. Please try again.'\n            });\n            throw error;\n        }\n    };\n    // Check authentication status on initial load\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            // Initial auth check\n            fetchUserProfile();\n            // Only set up refresh token interval if we're authenticated\n            let refreshInterval = null;\n            if (isAuthenticated) {\n                refreshInterval = setInterval({\n                    \"AuthProvider.useEffect\": ()=>{\n                        refreshToken();\n                    }\n                }[\"AuthProvider.useEffect\"], 14 * 60 * 1000); // Refresh every 14 minutes (assuming 15 min token lifetime)\n            }\n            return ({\n                \"AuthProvider.useEffect\": ()=>{\n                    if (refreshInterval) clearInterval(refreshInterval);\n                }\n            })[\"AuthProvider.useEffect\"];\n        }\n    }[\"AuthProvider.useEffect\"], [\n        isAuthenticated,\n        fetchUserProfile\n    ]); // Re-run when auth state changes\n    // Authentication context value\n    const value = {\n        user,\n        isLoading,\n        isAuthenticated,\n        login,\n        logout,\n        refreshToken,\n        register\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/arthur/work/BetaAcid/LinkByte/frontend/providers/auth-provider.tsx\",\n        lineNumber: 189,\n        columnNumber: 10\n    }, this);\n}\n_s(AuthProvider, \"ODAGbP2zMPobpP7frRQ05opRKcU=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLoginApiAuthLoginPost,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLogoutApiAuthLogoutPost,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useRegisterApiAuthRegisterPost\n    ];\n});\n_c = AuthProvider;\n// Hook to use auth context\nconst useAuth = ()=>{\n    _s1();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (context === undefined) {\n        throw new Error('useAuth must be used within an AuthProvider');\n    }\n    return context;\n};\n_s1(useAuth, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3Byb3ZpZGVycy9hdXRoLXByb3ZpZGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUVtRztBQUMzQztBQU1sQjtBQUVSO0FBQzhCO0FBWTVELE1BQU1hLDRCQUFjYixvREFBYUEsQ0FBOEJjO0FBTXhELFNBQVNDLGFBQWEsS0FBK0I7UUFBL0IsRUFBRUMsUUFBUSxFQUFxQixHQUEvQjs7SUFDM0IsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdmLCtDQUFRQSxDQUFzQjtJQUN0RCxNQUFNLENBQUNnQixXQUFXQyxhQUFhLEdBQUdqQiwrQ0FBUUEsQ0FBVTtJQUNwRCxNQUFNa0IsU0FBU2YsMERBQVNBO0lBQ3hCLE1BQU1nQixXQUFXakIsNERBQVdBO0lBRTVCLE1BQU1rQixrQkFBa0IsQ0FBQyxDQUFDTjtJQUUxQixpQkFBaUI7SUFDakIsTUFBTU8sZ0JBQWdCaEIsc0ZBQXdCQTtJQUU5QyxrQkFBa0I7SUFDbEIsTUFBTWlCLGlCQUFpQmhCLHdGQUEwQkE7SUFFakQsb0JBQW9CO0lBQ3BCLE1BQU1pQixtQkFBbUJoQiw0RkFBOEJBO0lBRXZELHNDQUFzQztJQUN0QyxNQUFNaUIsaUJBQWlCO1FBQ3JCLE9BQU9mLDBFQUFnQkEsQ0FBZTtZQUNwQ2dCLEtBQUs7WUFDTEMsUUFBUTtRQUNWO0lBQ0Y7SUFFQSw2Q0FBNkM7SUFDN0MsTUFBTUMsbUJBQW1CMUIsa0RBQVdBO3NEQUFDO1lBQ25DLG1HQUFtRztZQUNuRyxJQUFJLENBQUNlLFdBQVc7Z0JBQ2RDLGFBQWE7Z0JBQ2JXLFFBQVFDLEdBQUcsQ0FBQztZQUNkO1lBRUEsSUFBSTtnQkFDRkQsUUFBUUMsR0FBRyxDQUFDO2dCQUNaLE1BQU1DLFdBQVcsTUFBTU47Z0JBQ3ZCSSxRQUFRQyxHQUFHLENBQUMsMkNBQTJDQztnQkFDdkRmLFFBQVFlO1lBQ1YsRUFBRSxPQUFPQyxPQUFZO29CQUdmQTtnQkFGSkgsUUFBUUcsS0FBSyxDQUFDLHNDQUFzQ0EsQ0FBQUEs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QUFVdEQsaURBQVVBLENBQUNZO0lBRTNCLElBQUkwQyxZQUFZekMsV0FBVztRQUN6QixNQUFNLElBQUkwQyxNQUFNO0lBQ2xCO0lBRUEsT0FBT0Q7QUFDVCxFQUFDO0lBUllEIiwic291cmNlcyI6WyIvVXNlcnMvYXJ0aHVyL3dvcmsvQmV0YUFjaWQvTGlua0J5dGUvZnJvbnRlbmQvcHJvdmlkZXJzL2F1dGgtcHJvdmlkZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuXG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlLCB0eXBlIFJlYWN0Tm9kZSwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHVzZVBhdGhuYW1lLCB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L25hdmlnYXRpb24nXG5pbXBvcnQge1xuICByZWZyZXNoVG9rZW5BcGlBdXRoUmVmcmVzaFBvc3QsXG4gIHVzZUxvZ2luQXBpQXV0aExvZ2luUG9zdCxcbiAgdXNlTG9nb3V0QXBpQXV0aExvZ291dFBvc3QsXG4gIHVzZVJlZ2lzdGVyQXBpQXV0aFJlZ2lzdGVyUG9zdCxcbn0gZnJvbSAnQC9saWIvYXBpL2dlbmVyYXRlZC9hdXRoL2F1dGgnXG5pbXBvcnQgdHlwZSB7IFVzZXJSZXNwb25zZSB9IGZyb20gJ0AvbGliL2FwaS9nZW5lcmF0ZWQvbW9kZWxzJ1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICdzb25uZXInXG5pbXBvcnQgeyBjdXN0b21JbnN0YW5jZUZuIH0gZnJvbSAnQC9saWIvYXBpL2N1c3RvbS1pbnN0YW5jZSdcblxuaW50ZXJmYWNlIEF1dGhDb250ZXh0VHlwZSB7XG4gIHVzZXI6IFVzZXJSZXNwb25zZSB8IG51bGxcbiAgaXNMb2FkaW5nOiBib29sZWFuXG4gIGlzQXV0aGVudGljYXRlZDogYm9vbGVhblxuICBsb2dpbjogKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD5cbiAgbG9nb3V0OiAoKSA9PiBQcm9taXNlPHZvaWQ+XG4gIHJlZnJlc2hUb2tlbjogKCkgPT4gUHJvbWlzZTxib29sZWFuPlxuICByZWdpc3RlcjogKGVtYWlsOiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD5cbn1cblxuY29uc3QgQXV0aENvbnRleHQgPSBjcmVhdGVDb250ZXh0PEF1dGhDb250ZXh0VHlwZSB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKVxuXG5pbnRlcmZhY2UgQXV0aFByb3ZpZGVyUHJvcHMge1xuICBjaGlsZHJlbjogUmVhY3ROb2RlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBdXRoUHJvdmlkZXIoeyBjaGlsZHJlbiB9OiBBdXRoUHJvdmlkZXJQcm9wcykge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyUmVzcG9uc2UgfCBudWxsPihudWxsKVxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSlcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcbiAgY29uc3QgcGF0aG5hbWUgPSB1c2VQYXRobmFtZSgpXG5cbiAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gISF1c2VyXG5cbiAgLy8gTG9naW4gbXV0YXRpb25cbiAgY29uc3QgbG9naW5NdXRhdGlvbiA9IHVzZUxvZ2luQXBpQXV0aExvZ2luUG9zdCgpXG5cbiAgLy8gTG9nb3V0IG11dGF0aW9uXG4gIGNvbnN0IGxvZ291dE11dGF0aW9uID0gdXNlTG9nb3V0QXBpQXV0aExvZ291dFBvc3QoKVxuXG4gIC8vIFJlZ2lzdGVyIG11dGF0aW9uXG4gIGNvbnN0IHJlZ2lzdGVyTXV0YXRpb24gPSB1c2VSZWdpc3RlckFwaUF1dGhSZWdpc3RlclBvc3QoKVxuXG4gIC8vIEN1c3RvbSBmdW5jdGlvbiB0byBnZXQgY3VycmVudCB1c2VyXG4gIGNvbnN0IGdldEN1cnJlbnRVc2VyID0gYXN5bmMgKCk6IFByb21pc2U8VXNlclJlc3BvbnNlPiA9PiB7XG4gICAgcmV0dXJuIGN1c3RvbUluc3RhbmNlRm48VXNlclJlc3BvbnNlPih7XG4gICAgICB1cmw6ICcvYXBpL2F1dGgvbWUnLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KVxuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gZmV0Y2ggdGhlIGN1cnJlbnQgdXNlciBwcm9maWxlXG4gIGNvbnN0IGZldGNoVXNlclByb2ZpbGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgLy8gRG9uJ3Qgc2V0IGxvYWRpbmcgc3RhdGUgdG8gdHJ1ZSBpZiB3ZSdyZSBhbHJlYWR5IGxvYWRpbmcgLSBwcmV2ZW50cyBtdWx0aXBsZSBjb25jdXJyZW50IHJlcXVlc3RzXG4gICAgaWYgKCFpc0xvYWRpbmcpIHtcbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIGNvbnNvbGUubG9nKCdBdXRoOiBTdGFydGVkIGxvYWRpbmcgdXNlciBwcm9maWxlJyk7XG4gICAgfVxuICAgIFxuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZygnQXV0aDogQXR0ZW1wdGluZyB0byBmZXRjaCB1c2VyIHByb2ZpbGUnKTtcbiAgICAgIGNvbnN0IHVzZXJEYXRhID0gYXdhaXQgZ2V0Q3VycmVudFVzZXIoKTtcbiAgICAgIGNvbnNvbGUubG9nKCdBdXRoOiBTdWNjZXNzZnVsbHkgZmV0Y2hlZCB1c2VyIHByb2ZpbGUnLCB1c2VyRGF0YSk7XG4gICAgICBzZXRVc2VyKHVzZXJEYXRhKTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBdXRoOiBGYWlsZWQgdG8gZmV0Y2ggdXNlciBwcm9maWxlJywgZXJyb3I/Lm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgLy8gSWYgdGhlIGVycm9yIGlzIGEgNDAxLCBpdCBtZWFucyB0aGUgdXNlciBpcyBub3QgYXV0aGVudGljYXRlZFxuICAgICAgaWYgKGVycm9yPy5yZXNwb25zZT8uc3RhdHVzID09PSA0MDEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0F1dGg6IFVzZXIgaXMgbm90IGF1dGhlbnRpY2F0ZWQgKDQwMSknKTtcbiAgICAgIH1cbiAgICAgIHNldFVzZXIobnVsbCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNvbnNvbGUubG9nKCdBdXRoOiBGaW5pc2hlZCBsb2FkaW5nIHVzZXIgcHJvZmlsZScpO1xuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH0sIFtpc0xvYWRpbmddKTtcblxuICAvLyBGdW5jdGlvbiB0byByZWZyZXNoIHRoZSB0b2tlblxuICBjb25zdCByZWZyZXNoVG9rZW4gPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gRG9uJ3QgYXR0ZW1wdCByZWZyZXNoIGlmIHdlJ3JlIG5vdCBhdXRoZW50aWNhdGVkXG4gICAgaWYgKCFpc0F1dGhlbnRpY2F0ZWQgJiYgIWlzTG9hZGluZykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIFxuICAgIHRyeSB7XG4gICAgICBhd2FpdCByZWZyZXNoVG9rZW5BcGlBdXRoUmVmcmVzaFBvc3QoKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlZnJlc2ggdG9rZW4nLCBlcnJvcilcbiAgICAgIHNldFVzZXIobnVsbClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIC8vIExvZ2luIGZ1bmN0aW9uXG4gIGNvbnN0IGxvZ2luID0gYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgbG9naW5NdXRhdGlvbi5tdXRhdGVBc3luYyh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG5cbiAgICAgIC8vIEFmdGVyIHN1Y2Nlc3NmdWwgbG9naW4sIGZldGNoIHRoZSB1c2VyIHByb2ZpbGVcbiAgICAgIGF3YWl0IGZldGNoVXNlclByb2ZpbGUoKVxuXG4gICAgICAvLyBSZWRpcmVjdCB0byBkYXNoYm9hcmQgYWZ0ZXIgc3VjY2Vzc2Z1bCBsb2dpblxuICAgICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMb2dpbiBmYWlsZWQnLCBlcnJvcilcbiAgICAgIHRvYXN0LmVycm9yKCdMb2dpbiBGYWlsZWQnLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSW52YWxpZCBjcmVkZW50aWFscy4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSlcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9XG5cbiAgLy8gUmVnaXN0ZXIgZnVuY3Rpb25cbiAgY29uc3QgcmVnaXN0ZXIgPSBhc3luYyAoZW1haWw6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCByZWdpc3Rlck11dGF0aW9uLm11dGF0ZUFzeW5jKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICB9LFxuICAgICAgfSlcblxuICAgICAgLy8gQWZ0ZXIgc3VjY2Vzc2Z1bCByZWdpc3RyYXRpb24sIGxvZyB0aGUgdXNlciBpblxuICAgICAgYXdhaXQgbG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdSZWdpc3RyYXRpb24gZmFpbGVkJywgZXJyb3IpXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfVxuXG4gIC8vIExvZ291dCBmdW5jdGlvblxuICBjb25zdCBsb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGxvZ291dE11dGF0aW9uLm11dGF0ZUFzeW5jKClcbiAgICAgIHNldFVzZXIobnVsbClcblxuICAgICAgLy8gUmVkaXJlY3QgdG8gaG9tZSBwYWdlIGFmdGVyIGxvZ291dFxuICAgICAgcm91dGVyLnB1c2goJy8nKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMb2dvdXQgZmFpbGVkJywgZXJyb3IpXG4gICAgICB0b2FzdC5lcnJvcignTG9nb3V0IEZhaWxlZCcsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdGYWlsZWQgdG8gbG9nb3V0LiBQbGVhc2UgdHJ5IGFnYWluLicsXG4gICAgICB9KVxuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBhdXRoZW50aWNhdGlvbiBzdGF0dXMgb24gaW5pdGlhbCBsb2FkXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gSW5pdGlhbCBhdXRoIGNoZWNrXG4gICAgZmV0Y2hVc2VyUHJvZmlsZSgpO1xuXG4gICAgLy8gT25seSBzZXQgdXAgcmVmcmVzaCB0b2tlbiBpbnRlcnZhbCBpZiB3ZSdyZSBhdXRoZW50aWNhdGVkXG4gICAgbGV0IHJlZnJlc2hJbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCBudWxsID0gbnVsbDtcbiAgICBcbiAgICBpZiAoaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICByZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHJlZnJlc2hUb2tlbigpO1xuICAgICAgfSwgMTQgKiA2MCAqIDEwMDApOyAvLyBSZWZyZXNoIGV2ZXJ5IDE0IG1pbnV0ZXMgKGFzc3VtaW5nIDE1IG1pbiB0b2tlbiBsaWZldGltZSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHJlZnJlc2hJbnRlcnZhbCkgY2xlYXJJbnRlcnZhbChyZWZyZXNoSW50ZXJ2YWwpO1xuICAgIH07XG4gIH0sIFtpc0F1dGhlbnRpY2F0ZWQsIGZldGNoVXNlclByb2ZpbGVdKTsgLy8gUmUtcnVuIHdoZW4gYXV0aCBzdGF0ZSBjaGFuZ2VzXG5cbiAgLy8gQXV0aGVudGljYXRpb24gY29udGV4dCB2YWx1ZVxuICBjb25zdCB2YWx1ZSA9IHtcbiAgICB1c2VyLFxuICAgIGlzTG9hZGluZyxcbiAgICBpc0F1dGhlbnRpY2F0ZWQsXG4gICAgbG9naW4sXG4gICAgbG9nb3V0LFxuICAgIHJlZnJlc2hUb2tlbixcbiAgICByZWdpc3RlcixcbiAgfVxuXG4gIHJldHVybiA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cbn1cblxuLy8gSG9vayB0byB1c2UgYXV0aCBjb250ZXh0XG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQXV0aENvbnRleHQpXG5cbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlQXV0aCBtdXN0IGJlIHVzZWQgd2l0aGluIGFuIEF1dGhQcm92aWRlcicpXG4gIH1cblxuICByZXR1cm4gY29udGV4dFxufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsInVzZVBhdGhuYW1lIiwidXNlUm91dGVyIiwicmVmcmVzaFRva2VuQXBpQXV0aFJlZnJlc2hQb3N0IiwidXNlTG9naW5BcGlBdXRoTG9naW5Qb3N0IiwidXNlTG9nb3V0QXBpQXV0aExvZ291dFBvc3QiLCJ1c2VSZWdpc3RlckFwaUF1dGhSZWdpc3RlclBvc3QiLCJ0b2FzdCIsImN1c3RvbUluc3RhbmNlRm4iLCJBdXRoQ29udGV4dCIsInVuZGVmaW5lZCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJyb3V0ZXIiLCJwYXRobmFtZSIsImlzQXV0aGVudGljYXRlZCIsImxvZ2luTXV0YXRpb24iLCJsb2dvdXRNdXRhdGlvbiIsInJlZ2lzdGVyTXV0YXRpb24iLCJnZXRDdXJyZW50VXNlciIsInVybCIsIm1ldGhvZCIsImZldGNoVXNlclByb2ZpbGUiLCJjb25zb2xlIiwibG9nIiwidXNlckRhdGEiLCJlcnJvciIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlZnJlc2hUb2tlbiIsImxvZ2luIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm11dGF0ZUFzeW5jIiwiZGF0YSIsInB1c2giLCJkZXNjcmlwdGlvbiIsInJlZ2lzdGVyIiwiZW1haWwiLCJsb2dvdXQiLCJyZWZyZXNoSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ2YWx1ZSIsIlByb3ZpZGVyIiwidXNlQXV0aCIsImNvbnRleHQiLCJFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./providers/auth-provider.tsx\n"));

/***/ })

});