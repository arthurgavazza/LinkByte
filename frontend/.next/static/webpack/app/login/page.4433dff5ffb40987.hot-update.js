"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/login/page",{

/***/ "(app-pages-browser)/./providers/auth-provider.tsx":
/*!*************************************!*\
  !*** ./providers/auth-provider.tsx ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/api/generated/auth/auth */ \"(app-pages-browser)/./lib/api/generated/auth/auth.ts\");\n/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sonner */ \"(app-pages-browser)/./node_modules/.pnpm/sonner@1.7.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/sonner/dist/index.mjs\");\n/* harmony import */ var _lib_api_custom_instance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/api/custom-instance */ \"(app-pages-browser)/./lib/api/custom-instance.ts\");\n/* __next_internal_client_entry_do_not_use__ AuthProvider,useAuth auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction AuthProvider(param) {\n    let { children } = param;\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const initialLoadAttempted = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();\n    const isAuthenticated = !!user;\n    // Login mutation\n    const loginMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLoginApiAuthLoginPost)();\n    // Logout mutation\n    const logoutMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLogoutApiAuthLogoutPost)();\n    // Register mutation\n    const registerMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useRegisterApiAuthRegisterPost)();\n    // Custom function to get current user\n    const getCurrentUser = async ()=>{\n        return (0,_lib_api_custom_instance__WEBPACK_IMPORTED_MODULE_5__.customInstanceFn)({\n            url: '/api/auth/me',\n            method: 'GET'\n        });\n    };\n    // Function to fetch the current user profile\n    const fetchUserProfile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)({\n        \"AuthProvider.useCallback[fetchUserProfile]\": async ()=>{\n            // Prevent multiple loading attempts for initial load\n            if (initialLoadAttempted.current && isLoading) {\n                console.log('Auth: Skipping duplicate fetch - already loading');\n                return;\n            }\n            // Don't set loading state to true if we're already loading\n            if (!isLoading) {\n                setIsLoading(true);\n                console.log('Auth: Started loading user profile');\n            }\n            // Mark that we've attempted the initial load\n            initialLoadAttempted.current = true;\n            try {\n                console.log('Auth: Attempting to fetch user profile');\n                const userData = await getCurrentUser();\n                console.log('Auth: Successfully fetched user profile', userData);\n                setUser(userData);\n            } catch (error) {\n                var _error_response;\n                console.error('Auth: Failed to fetch user profile', (error === null || error === void 0 ? void 0 : error.message) || error);\n                // If the error is a 401, it means the user is not authenticated\n                if ((error === null || error === void 0 ? void 0 : (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status) === 401) {\n                    console.log('Auth: User is not authenticated (401)');\n                }\n                setUser(null);\n            } finally{\n                console.log('Auth: Finished loading user profile');\n                setIsLoading(false);\n            }\n        }\n    }[\"AuthProvider.useCallback[fetchUserProfile]\"], []); // No dependencies to avoid loops\n    // Function to refresh the token\n    const refreshToken = async ()=>{\n        // Don't attempt refresh if we're not authenticated\n        if (!isAuthenticated && !isLoading) {\n            return false;\n        }\n        try {\n            await (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.refreshTokenApiAuthRefreshPost)();\n            return true;\n        } catch (error) {\n            console.error('Failed to refresh token', error);\n            setUser(null);\n            return false;\n        }\n    };\n    // Login function\n    const login = async (username, password)=>{\n        try {\n            console.log('Auth: Attempting login');\n            // First attempt the login API call\n            await loginMutation.mutateAsync({\n                data: {\n                    username,\n                    password\n                }\n            });\n            console.log('Auth: Login API call successful');\n            // After successful login, fetch the user profile\n            setIsLoading(true);\n            try {\n                const userData = await getCurrentUser();\n                console.log('Auth: User profile fetched after login', userData);\n                setUser(userData);\n                // Only redirect after we've confirmed the user is logged in\n                console.log('Auth: Redirecting to dashboard');\n                router.push('/dashboard');\n            } catch (profileError) {\n                console.error('Auth: Failed to fetch user profile after login', profileError);\n                throw profileError;\n            } finally{\n                setIsLoading(false);\n            }\n        } catch (error) {\n            console.error('Auth: Login failed', error);\n            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Login Failed', {\n                description: 'Invalid credentials. Please try again.'\n            });\n            throw error;\n        }\n    };\n    // Register function\n    const register = async (email, username, password)=>{\n        try {\n            await registerMutation.mutateAsync({\n                data: {\n                    email,\n                    username,\n                    password\n                }\n            });\n            // After successful registration, log the user in\n            await login(username, password);\n        } catch (error) {\n            console.error('Registration failed', error);\n            throw error;\n        }\n    };\n    // Logout function\n    const logout = async ()=>{\n        try {\n            await logoutMutation.mutateAsync();\n            setUser(null);\n            // Redirect to home page after logout\n            router.push('/');\n        } catch (error) {\n            console.error('Logout failed', error);\n            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Logout Failed', {\n                description: 'Failed to logout. Please try again.'\n            });\n            throw error;\n        }\n    };\n    // Check authentication status on initial load\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            // Initial auth check\n            fetchUserProfile();\n            // Only set up refresh token interval if we're authenticated\n            let refreshInterval = null;\n            if (isAuthenticated) {\n                refreshInterval = setInterval({\n                    \"AuthProvider.useEffect\": ()=>{\n                        refreshToken();\n                    }\n                }[\"AuthProvider.useEffect\"], 14 * 60 * 1000); // Refresh every 14 minutes (assuming 15 min token lifetime)\n            }\n            return ({\n                \"AuthProvider.useEffect\": ()=>{\n                    if (refreshInterval) clearInterval(refreshInterval);\n                }\n            })[\"AuthProvider.useEffect\"];\n        }\n    }[\"AuthProvider.useEffect\"], [\n        fetchUserProfile\n    ]); // Only run on mount with stable fetchUserProfile\n    // Authentication context value\n    const value = {\n        user,\n        isLoading,\n        isAuthenticated,\n        login,\n        logout,\n        refreshToken,\n        register\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/arthur/work/BetaAcid/LinkByte/frontend/providers/auth-provider.tsx\",\n        lineNumber: 214,\n        columnNumber: 10\n    }, this);\n}\n_s(AuthProvider, \"1ZupOXQhwov763KJXvVCQGALjXc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLoginApiAuthLoginPost,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLogoutApiAuthLogoutPost,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useRegisterApiAuthRegisterPost\n    ];\n});\n_c = AuthProvider;\n// Hook to use auth context\nconst useAuth = ()=>{\n    _s1();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (context === undefined) {\n        throw new Error('useAuth must be used within an AuthProvider');\n    }\n    return context;\n};\n_s1(useAuth, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3Byb3ZpZGVycy9hdXRoLXByb3ZpZGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUUyRztBQUNuRDtBQU1sQjtBQUVSO0FBQzhCO0FBWTVELE1BQU1jLDRCQUFjZCxvREFBYUEsQ0FBOEJlO0FBTXhELFNBQVNDLGFBQWEsS0FBK0I7UUFBL0IsRUFBRUMsUUFBUSxFQUFxQixHQUEvQjs7SUFDM0IsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdoQiwrQ0FBUUEsQ0FBc0I7SUFDdEQsTUFBTSxDQUFDaUIsV0FBV0MsYUFBYSxHQUFHbEIsK0NBQVFBLENBQVU7SUFDcEQsTUFBTW1CLHVCQUF1QmpCLDZDQUFNQSxDQUFDO0lBQ3BDLE1BQU1rQixTQUFTaEIsMERBQVNBO0lBQ3hCLE1BQU1pQixXQUFXbEIsNERBQVdBO0lBRTVCLE1BQU1tQixrQkFBa0IsQ0FBQyxDQUFDUDtJQUUxQixpQkFBaUI7SUFDakIsTUFBTVEsZ0JBQWdCakIsc0ZBQXdCQTtJQUU5QyxrQkFBa0I7SUFDbEIsTUFBTWtCLGlCQUFpQmpCLHdGQUEwQkE7SUFFakQsb0JBQW9CO0lBQ3BCLE1BQU1rQixtQkFBbUJqQiw0RkFBOEJBO0lBRXZELHNDQUFzQztJQUN0QyxNQUFNa0IsaUJBQWlCO1FBQ3JCLE9BQU9oQiwwRUFBZ0JBLENBQWU7WUFDcENpQixLQUFLO1lBQ0xDLFFBQVE7UUFDVjtJQUNGO0lBRUEsNkNBQTZDO0lBQzdDLE1BQU1DLG1CQUFtQjVCLGtEQUFXQTtzREFBQztZQUNuQyxxREFBcUQ7WUFDckQsSUFBSWtCLHFCQUFxQlcsT0FBTyxJQUFJYixXQUFXO2dCQUM3Q2MsUUFBUUMsR0FBRyxDQUFDO2dCQUNaO1lBQ0Y7WUFFQSwyREFBMkQ7WUFDM0QsSUFBSSxDQUFDZixXQUFXO2dCQUNkQyxhQUFhO2dCQUNiYSxRQUFRQyxHQUFHLENBQUM7WUFDZDtZQUVBLDZDQUE2QztZQUM3Q2IscUJBQXFCVyxPQUFPLEdBQUc7WUFFL0IsSUFB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QixrQkFBa0JDOzhDQUFZO3dCQUM1QmI7b0JBQ0Y7NkNBQUcsS0FBSyxLQUFLLE9BQU8sNERBQTREO1lBQ2xGO1lBRUE7MENBQU87b0JBQ0wsSUFBSVksaUJBQWlCRSxjQUFjRjtnQkFDckM7O1FBQ0Y7aUNBQUc7UUFBQ3JCO0tBQWlCLEdBQUcsaURBQWlEO0lBRXpFLCtCQUErQjtJQUMvQixNQUFNd0IsUUFBUTtRQUNadEM7UUFDQUU7UUFDQUs7UUFDQWlCO1FBQ0FVO1FBQ0FYO1FBQ0FTO0lBQ0Y7SUFFQSxxQkFBTyw4REFBQ3BDLFlBQVkyQyxRQUFRO1FBQUNELE9BQU9BO2tCQUFRdkM7Ozs7OztBQUM5QztHQXhMZ0JEOztRQUlDVCxzREFBU0E7UUFDUEQsd0RBQVdBO1FBS05HLGtGQUF3QkE7UUFHdkJDLG9GQUEwQkE7UUFHeEJDLHdGQUE4QkE7OztLQWhCekNLO0FBMExoQiwyQkFBMkI7QUFDcEIsTUFBTTBDLFVBQVU7O0lBQ3JCLE1BQU1DLFVBQVUxRCxpREFBVUEsQ0FBQ2E7SUFFM0IsSUFBSTZDLFlBQVk1QyxXQUFXO1FBQ3pCLE1BQU0sSUFBSTZDLE1BQU07SUFDbEI7SUFFQSxPQUFPRDtBQUNULEVBQUM7SUFSWUQiLCJzb3VyY2VzIjpbIi9Vc2Vycy9hcnRodXIvd29yay9CZXRhQWNpZC9MaW5rQnl0ZS9mcm9udGVuZC9wcm92aWRlcnMvYXV0aC1wcm92aWRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5cbmltcG9ydCB7IGNyZWF0ZUNvbnRleHQsIHVzZUNvbnRleHQsIHVzZUVmZmVjdCwgdXNlU3RhdGUsIHR5cGUgUmVhY3ROb2RlLCB1c2VDYWxsYmFjaywgdXNlUmVmIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB1c2VQYXRobmFtZSwgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJ1xuaW1wb3J0IHtcbiAgcmVmcmVzaFRva2VuQXBpQXV0aFJlZnJlc2hQb3N0LFxuICB1c2VMb2dpbkFwaUF1dGhMb2dpblBvc3QsXG4gIHVzZUxvZ291dEFwaUF1dGhMb2dvdXRQb3N0LFxuICB1c2VSZWdpc3RlckFwaUF1dGhSZWdpc3RlclBvc3QsXG59IGZyb20gJ0AvbGliL2FwaS9nZW5lcmF0ZWQvYXV0aC9hdXRoJ1xuaW1wb3J0IHR5cGUgeyBVc2VyUmVzcG9uc2UgfSBmcm9tICdAL2xpYi9hcGkvZ2VuZXJhdGVkL21vZGVscydcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAnc29ubmVyJ1xuaW1wb3J0IHsgY3VzdG9tSW5zdGFuY2VGbiB9IGZyb20gJ0AvbGliL2FwaS9jdXN0b20taW5zdGFuY2UnXG5cbmludGVyZmFjZSBBdXRoQ29udGV4dFR5cGUge1xuICB1c2VyOiBVc2VyUmVzcG9uc2UgfCBudWxsXG4gIGlzTG9hZGluZzogYm9vbGVhblxuICBpc0F1dGhlbnRpY2F0ZWQ6IGJvb2xlYW5cbiAgbG9naW46ICh1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+XG4gIGxvZ291dDogKCkgPT4gUHJvbWlzZTx2b2lkPlxuICByZWZyZXNoVG9rZW46ICgpID0+IFByb21pc2U8Ym9vbGVhbj5cbiAgcmVnaXN0ZXI6IChlbWFpbDogc3RyaW5nLCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+XG59XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoQ29udGV4dFR5cGUgfCB1bmRlZmluZWQ+KHVuZGVmaW5lZClcblxuaW50ZXJmYWNlIEF1dGhQcm92aWRlclByb3BzIHtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXV0aFByb3ZpZGVyKHsgY2hpbGRyZW4gfTogQXV0aFByb3ZpZGVyUHJvcHMpIHtcbiAgY29uc3QgW3VzZXIsIHNldFVzZXJdID0gdXNlU3RhdGU8VXNlclJlc3BvbnNlIHwgbnVsbD4obnVsbClcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpXG4gIGNvbnN0IGluaXRpYWxMb2FkQXR0ZW1wdGVkID0gdXNlUmVmKGZhbHNlKVxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuICBjb25zdCBwYXRobmFtZSA9IHVzZVBhdGhuYW1lKClcblxuICBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSAhIXVzZXJcblxuICAvLyBMb2dpbiBtdXRhdGlvblxuICBjb25zdCBsb2dpbk11dGF0aW9uID0gdXNlTG9naW5BcGlBdXRoTG9naW5Qb3N0KClcblxuICAvLyBMb2dvdXQgbXV0YXRpb25cbiAgY29uc3QgbG9nb3V0TXV0YXRpb24gPSB1c2VMb2dvdXRBcGlBdXRoTG9nb3V0UG9zdCgpXG5cbiAgLy8gUmVnaXN0ZXIgbXV0YXRpb25cbiAgY29uc3QgcmVnaXN0ZXJNdXRhdGlvbiA9IHVzZVJlZ2lzdGVyQXBpQXV0aFJlZ2lzdGVyUG9zdCgpXG5cbiAgLy8gQ3VzdG9tIGZ1bmN0aW9uIHRvIGdldCBjdXJyZW50IHVzZXJcbiAgY29uc3QgZ2V0Q3VycmVudFVzZXIgPSBhc3luYyAoKTogUHJvbWlzZTxVc2VyUmVzcG9uc2U+ID0+IHtcbiAgICByZXR1cm4gY3VzdG9tSW5zdGFuY2VGbjxVc2VyUmVzcG9uc2U+KHtcbiAgICAgIHVybDogJy9hcGkvYXV0aC9tZScsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgIH0pXG4gIH1cblxuICAvLyBGdW5jdGlvbiB0byBmZXRjaCB0aGUgY3VycmVudCB1c2VyIHByb2ZpbGVcbiAgY29uc3QgZmV0Y2hVc2VyUHJvZmlsZSA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICAvLyBQcmV2ZW50IG11bHRpcGxlIGxvYWRpbmcgYXR0ZW1wdHMgZm9yIGluaXRpYWwgbG9hZFxuICAgIGlmIChpbml0aWFsTG9hZEF0dGVtcHRlZC5jdXJyZW50ICYmIGlzTG9hZGluZykge1xuICAgICAgY29uc29sZS5sb2coJ0F1dGg6IFNraXBwaW5nIGR1cGxpY2F0ZSBmZXRjaCAtIGFscmVhZHkgbG9hZGluZycpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICAvLyBEb24ndCBzZXQgbG9hZGluZyBzdGF0ZSB0byB0cnVlIGlmIHdlJ3JlIGFscmVhZHkgbG9hZGluZ1xuICAgIGlmICghaXNMb2FkaW5nKSB7XG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBjb25zb2xlLmxvZygnQXV0aDogU3RhcnRlZCBsb2FkaW5nIHVzZXIgcHJvZmlsZScpO1xuICAgIH1cbiAgICBcbiAgICAvLyBNYXJrIHRoYXQgd2UndmUgYXR0ZW1wdGVkIHRoZSBpbml0aWFsIGxvYWRcbiAgICBpbml0aWFsTG9hZEF0dGVtcHRlZC5jdXJyZW50ID0gdHJ1ZTtcbiAgICBcbiAgICB0cnkge1xuICAgICAgY29uc29sZS5sb2coJ0F1dGg6IEF0dGVtcHRpbmcgdG8gZmV0Y2ggdXNlciBwcm9maWxlJyk7XG4gICAgICBjb25zdCB1c2VyRGF0YSA9IGF3YWl0IGdldEN1cnJlbnRVc2VyKCk7XG4gICAgICBjb25zb2xlLmxvZygnQXV0aDogU3VjY2Vzc2Z1bGx5IGZldGNoZWQgdXNlciBwcm9maWxlJywgdXNlckRhdGEpO1xuICAgICAgc2V0VXNlcih1c2VyRGF0YSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcignQXV0aDogRmFpbGVkIHRvIGZldGNoIHVzZXIgcHJvZmlsZScsIGVycm9yPy5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIC8vIElmIHRoZSBlcnJvciBpcyBhIDQwMSwgaXQgbWVhbnMgdGhlIHVzZXIgaXMgbm90IGF1dGhlbnRpY2F0ZWRcbiAgICAgIGlmIChlcnJvcj8ucmVzcG9uc2U/LnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBdXRoOiBVc2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkICg0MDEpJyk7XG4gICAgICB9XG4gICAgICBzZXRVc2VyKG51bGwpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBjb25zb2xlLmxvZygnQXV0aDogRmluaXNoZWQgbG9hZGluZyB1c2VyIHByb2ZpbGUnKTtcbiAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9LCBbXSk7IC8vIE5vIGRlcGVuZGVuY2llcyB0byBhdm9pZCBsb29wc1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHJlZnJlc2ggdGhlIHRva2VuXG4gIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGFzeW5jICgpID0+IHtcbiAgICAvLyBEb24ndCBhdHRlbXB0IHJlZnJlc2ggaWYgd2UncmUgbm90IGF1dGhlbnRpY2F0ZWRcbiAgICBpZiAoIWlzQXV0aGVudGljYXRlZCAmJiAhaXNMb2FkaW5nKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHJlZnJlc2hUb2tlbkFwaUF1dGhSZWZyZXNoUG9zdCgpXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gcmVmcmVzaCB0b2tlbicsIGVycm9yKVxuICAgICAgc2V0VXNlcihudWxsKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgLy8gTG9naW4gZnVuY3Rpb25cbiAgY29uc3QgbG9naW4gPSBhc3luYyAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zb2xlLmxvZygnQXV0aDogQXR0ZW1wdGluZyBsb2dpbicpO1xuICAgICAgXG4gICAgICAvLyBGaXJzdCBhdHRlbXB0IHRoZSBsb2dpbiBBUEkgY2FsbFxuICAgICAgYXdhaXQgbG9naW5NdXRhdGlvbi5tdXRhdGVBc3luYyh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc29sZS5sb2coJ0F1dGg6IExvZ2luIEFQSSBjYWxsIHN1Y2Nlc3NmdWwnKTtcblxuICAgICAgLy8gQWZ0ZXIgc3VjY2Vzc2Z1bCBsb2dpbiwgZmV0Y2ggdGhlIHVzZXIgcHJvZmlsZVxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpO1xuICAgICAgICBjb25zb2xlLmxvZygnQXV0aDogVXNlciBwcm9maWxlIGZldGNoZWQgYWZ0ZXIgbG9naW4nLCB1c2VyRGF0YSk7XG4gICAgICAgIHNldFVzZXIodXNlckRhdGEpO1xuICAgICAgICBcbiAgICAgICAgLy8gT25seSByZWRpcmVjdCBhZnRlciB3ZSd2ZSBjb25maXJtZWQgdGhlIHVzZXIgaXMgbG9nZ2VkIGluXG4gICAgICAgIGNvbnNvbGUubG9nKCdBdXRoOiBSZWRpcmVjdGluZyB0byBkYXNoYm9hcmQnKTtcbiAgICAgICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKTtcbiAgICAgIH0gY2F0Y2ggKHByb2ZpbGVFcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdBdXRoOiBGYWlsZWQgdG8gZmV0Y2ggdXNlciBwcm9maWxlIGFmdGVyIGxvZ2luJywgcHJvZmlsZUVycm9yKTtcbiAgICAgICAgdGhyb3cgcHJvZmlsZUVycm9yO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignQXV0aDogTG9naW4gZmFpbGVkJywgZXJyb3IpO1xuICAgICAgdG9hc3QuZXJyb3IoJ0xvZ2luIEZhaWxlZCcsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdJbnZhbGlkIGNyZWRlbnRpYWxzLiBQbGVhc2UgdHJ5IGFnYWluLicsXG4gICAgICB9KTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlZ2lzdGVyIGZ1bmN0aW9uXG4gIGNvbnN0IHJlZ2lzdGVyID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcsIHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcmVnaXN0ZXJNdXRhdGlvbi5tdXRhdGVBc3luYyh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG5cbiAgICAgIC8vIEFmdGVyIHN1Y2Nlc3NmdWwgcmVnaXN0cmF0aW9uLCBsb2cgdGhlIHVzZXIgaW5cbiAgICAgIGF3YWl0IGxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignUmVnaXN0cmF0aW9uIGZhaWxlZCcsIGVycm9yKVxuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cblxuICAvLyBMb2dvdXQgZnVuY3Rpb25cbiAgY29uc3QgbG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBsb2dvdXRNdXRhdGlvbi5tdXRhdGVBc3luYygpXG4gICAgICBzZXRVc2VyKG51bGwpXG5cbiAgICAgIC8vIFJlZGlyZWN0IHRvIGhvbWUgcGFnZSBhZnRlciBsb2dvdXRcbiAgICAgIHJvdXRlci5wdXNoKCcvJylcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignTG9nb3V0IGZhaWxlZCcsIGVycm9yKVxuICAgICAgdG9hc3QuZXJyb3IoJ0xvZ291dCBGYWlsZWQnLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnRmFpbGVkIHRvIGxvZ291dC4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSlcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgYXV0aGVudGljYXRpb24gc3RhdHVzIG9uIGluaXRpYWwgbG9hZFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIEluaXRpYWwgYXV0aCBjaGVja1xuICAgIGZldGNoVXNlclByb2ZpbGUoKTtcblxuICAgIC8vIE9ubHkgc2V0IHVwIHJlZnJlc2ggdG9rZW4gaW50ZXJ2YWwgaWYgd2UncmUgYXV0aGVudGljYXRlZFxuICAgIGxldCByZWZyZXNoSW50ZXJ2YWw6IE5vZGVKUy5UaW1lb3V0IHwgbnVsbCA9IG51bGw7XG4gICAgXG4gICAgaWYgKGlzQXV0aGVudGljYXRlZCkge1xuICAgICAgcmVmcmVzaEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICByZWZyZXNoVG9rZW4oKTtcbiAgICAgIH0sIDE0ICogNjAgKiAxMDAwKTsgLy8gUmVmcmVzaCBldmVyeSAxNCBtaW51dGVzIChhc3N1bWluZyAxNSBtaW4gdG9rZW4gbGlmZXRpbWUpXG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChyZWZyZXNoSW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwocmVmcmVzaEludGVydmFsKTtcbiAgICB9O1xuICB9LCBbZmV0Y2hVc2VyUHJvZmlsZV0pOyAvLyBPbmx5IHJ1biBvbiBtb3VudCB3aXRoIHN0YWJsZSBmZXRjaFVzZXJQcm9maWxlXG5cbiAgLy8gQXV0aGVudGljYXRpb24gY29udGV4dCB2YWx1ZVxuICBjb25zdCB2YWx1ZSA9IHtcbiAgICB1c2VyLFxuICAgIGlzTG9hZGluZyxcbiAgICBpc0F1dGhlbnRpY2F0ZWQsXG4gICAgbG9naW4sXG4gICAgbG9nb3V0LFxuICAgIHJlZnJlc2hUb2tlbixcbiAgICByZWdpc3RlcixcbiAgfVxuXG4gIHJldHVybiA8QXV0aENvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3ZhbHVlfT57Y2hpbGRyZW59PC9BdXRoQ29udGV4dC5Qcm92aWRlcj5cbn1cblxuLy8gSG9vayB0byB1c2UgYXV0aCBjb250ZXh0XG5leHBvcnQgY29uc3QgdXNlQXV0aCA9ICgpID0+IHtcbiAgY29uc3QgY29udGV4dCA9IHVzZUNvbnRleHQoQXV0aENvbnRleHQpXG5cbiAgaWYgKGNvbnRleHQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXNlQXV0aCBtdXN0IGJlIHVzZWQgd2l0aGluIGFuIEF1dGhQcm92aWRlcicpXG4gIH1cblxuICByZXR1cm4gY29udGV4dFxufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VDYWxsYmFjayIsInVzZVJlZiIsInVzZVBhdGhuYW1lIiwidXNlUm91dGVyIiwicmVmcmVzaFRva2VuQXBpQXV0aFJlZnJlc2hQb3N0IiwidXNlTG9naW5BcGlBdXRoTG9naW5Qb3N0IiwidXNlTG9nb3V0QXBpQXV0aExvZ291dFBvc3QiLCJ1c2VSZWdpc3RlckFwaUF1dGhSZWdpc3RlclBvc3QiLCJ0b2FzdCIsImN1c3RvbUluc3RhbmNlRm4iLCJBdXRoQ29udGV4dCIsInVuZGVmaW5lZCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJpc0xvYWRpbmciLCJzZXRJc0xvYWRpbmciLCJpbml0aWFsTG9hZEF0dGVtcHRlZCIsInJvdXRlciIsInBhdGhuYW1lIiwiaXNBdXRoZW50aWNhdGVkIiwibG9naW5NdXRhdGlvbiIsImxvZ291dE11dGF0aW9uIiwicmVnaXN0ZXJNdXRhdGlvbiIsImdldEN1cnJlbnRVc2VyIiwidXJsIiwibWV0aG9kIiwiZmV0Y2hVc2VyUHJvZmlsZSIsImN1cnJlbnQiLCJjb25zb2xlIiwibG9nIiwidXNlckRhdGEiLCJlcnJvciIsIm1lc3NhZ2UiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlZnJlc2hUb2tlbiIsImxvZ2luIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsIm11dGF0ZUFzeW5jIiwiZGF0YSIsInB1c2giLCJwcm9maWxlRXJyb3IiLCJkZXNjcmlwdGlvbiIsInJlZ2lzdGVyIiwiZW1haWwiLCJsb2dvdXQiLCJyZWZyZXNoSW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ2YWx1ZSIsIlByb3ZpZGVyIiwidXNlQXV0aCIsImNvbnRleHQiLCJFcnJvciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./providers/auth-provider.tsx\n"));

/***/ })

});