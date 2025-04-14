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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: () => (/* binding */ AuthProvider),\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/.pnpm/next@15.2.4_@babel+core@7.26.10_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/api/generated/auth/auth */ \"(app-pages-browser)/./lib/api/generated/auth/auth.ts\");\n/* harmony import */ var sonner__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sonner */ \"(app-pages-browser)/./node_modules/.pnpm/sonner@1.7.4_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/sonner/dist/index.mjs\");\n/* harmony import */ var _lib_api_custom_instance__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/api/custom-instance */ \"(app-pages-browser)/./lib/api/custom-instance.ts\");\n/* __next_internal_client_entry_do_not_use__ AuthProvider,useAuth auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);\nfunction AuthProvider(param) {\n    let { children } = param;\n    _s();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    const initialLoadAttempted = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();\n    const isAuthenticated = !!user;\n    // Login mutation\n    const loginMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLoginApiAuthLoginPost)();\n    // Logout mutation\n    const logoutMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLogoutApiAuthLogoutPost)();\n    // Register mutation\n    const registerMutation = (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useRegisterApiAuthRegisterPost)();\n    // Custom function to get current user\n    const getCurrentUser = async ()=>{\n        return (0,_lib_api_custom_instance__WEBPACK_IMPORTED_MODULE_5__.customInstanceFn)({\n            url: '/api/auth/me',\n            method: 'GET'\n        });\n    };\n    // Function to fetch the current user profile\n    const fetchUserProfile = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)({\n        \"AuthProvider.useCallback[fetchUserProfile]\": async ()=>{\n            // Prevent multiple loading attempts for initial load\n            if (initialLoadAttempted.current && isLoading) {\n                console.log('Auth: Skipping duplicate fetch - already loading');\n                return;\n            }\n            // Don't set loading state to true if we're already loading\n            if (!isLoading) {\n                setIsLoading(true);\n                console.log('Auth: Started loading user profile');\n            }\n            // Mark that we've attempted the initial load\n            initialLoadAttempted.current = true;\n            try {\n                console.log('Auth: Attempting to fetch user profile');\n                const userData = await getCurrentUser();\n                console.log('Auth: Successfully fetched user profile', userData);\n                setUser(userData);\n            } catch (error) {\n                var _error_response;\n                console.error('Auth: Failed to fetch user profile', (error === null || error === void 0 ? void 0 : error.message) || error);\n                // If the error is a 401, it means the user is not authenticated\n                if ((error === null || error === void 0 ? void 0 : (_error_response = error.response) === null || _error_response === void 0 ? void 0 : _error_response.status) === 401) {\n                    console.log('Auth: User is not authenticated (401)');\n                }\n                setUser(null);\n            } finally{\n                console.log('Auth: Finished loading user profile');\n                setIsLoading(false);\n            }\n        }\n    }[\"AuthProvider.useCallback[fetchUserProfile]\"], []); // No dependencies to avoid loops\n    // Function to refresh the token\n    const refreshToken = async ()=>{\n        // Don't attempt refresh if we're not authenticated\n        if (!isAuthenticated && !isLoading) {\n            return false;\n        }\n        try {\n            await (0,_lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.refreshTokenApiAuthRefreshPost)();\n            return true;\n        } catch (error) {\n            console.error('Failed to refresh token', error);\n            setUser(null);\n            return false;\n        }\n    };\n    // Login function\n    const login = async (username, password)=>{\n        try {\n            await loginMutation.mutateAsync({\n                data: {\n                    username,\n                    password\n                }\n            });\n            // After successful login, fetch the user profile\n            await fetchUserProfile();\n            // Redirect to dashboard after successful login\n            router.push('/dashboard');\n        } catch (error) {\n            console.error('Login failed', error);\n            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Login Failed', {\n                description: 'Invalid credentials. Please try again.'\n            });\n            throw error;\n        }\n    };\n    // Register function\n    const register = async (email, username, password)=>{\n        try {\n            await registerMutation.mutateAsync({\n                data: {\n                    email,\n                    username,\n                    password\n                }\n            });\n            // After successful registration, log the user in\n            await login(username, password);\n        } catch (error) {\n            console.error('Registration failed', error);\n            throw error;\n        }\n    };\n    // Logout function\n    const logout = async ()=>{\n        try {\n            await logoutMutation.mutateAsync();\n            setUser(null);\n            // Redirect to home page after logout\n            router.push('/');\n        } catch (error) {\n            console.error('Logout failed', error);\n            sonner__WEBPACK_IMPORTED_MODULE_4__.toast.error('Logout Failed', {\n                description: 'Failed to logout. Please try again.'\n            });\n            throw error;\n        }\n    };\n    // Check authentication status on initial load\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"AuthProvider.useEffect\": ()=>{\n            // Initial auth check\n            fetchUserProfile();\n            // Only set up refresh token interval if we're authenticated\n            let refreshInterval = null;\n            if (isAuthenticated) {\n                refreshInterval = setInterval({\n                    \"AuthProvider.useEffect\": ()=>{\n                        refreshToken();\n                    }\n                }[\"AuthProvider.useEffect\"], 14 * 60 * 1000); // Refresh every 14 minutes (assuming 15 min token lifetime)\n            }\n            return ({\n                \"AuthProvider.useEffect\": ()=>{\n                    if (refreshInterval) clearInterval(refreshInterval);\n                }\n            })[\"AuthProvider.useEffect\"];\n        }\n    }[\"AuthProvider.useEffect\"], [\n        fetchUserProfile\n    ]); // Only run on mount with stable fetchUserProfile\n    // Authentication context value\n    const value = {\n        user,\n        isLoading,\n        isAuthenticated,\n        login,\n        logout,\n        refreshToken,\n        register\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/arthur/work/BetaAcid/LinkByte/frontend/providers/auth-provider.tsx\",\n        lineNumber: 199,\n        columnNumber: 10\n    }, this);\n}\n_s(AuthProvider, \"1ZupOXQhwov763KJXvVCQGALjXc=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLoginApiAuthLoginPost,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useLogoutApiAuthLogoutPost,\n        _lib_api_generated_auth_auth__WEBPACK_IMPORTED_MODULE_3__.useRegisterApiAuthRegisterPost\n    ];\n});\n_c = AuthProvider;\n// Hook to use auth context\nconst useAuth = ()=>{\n    _s1();\n    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n    if (context === undefined) {\n        throw new Error('useAuth must be used within an AuthProvider');\n    }\n    return context;\n};\n_s1(useAuth, \"b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=\");\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3Byb3ZpZGVycy9hdXRoLXByb3ZpZGVyLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUUyRztBQUNuRDtBQU1sQjtBQUVSO0FBQzhCO0FBWTVELE1BQU1jLDRCQUFjZCxvREFBYUEsQ0FBOEJlO0FBTXhELFNBQVNDLGFBQWEsS0FBK0I7UUFBL0IsRUFBRUMsUUFBUSxFQUFxQixHQUEvQjs7SUFDM0IsTUFBTSxDQUFDQyxNQUFNQyxRQUFRLEdBQUdoQiwrQ0FBUUEsQ0FBc0I7SUFDdEQsTUFBTSxDQUFDaUIsV0FBV0MsYUFBYSxHQUFHbEIsK0NBQVFBLENBQVU7SUFDcEQsTUFBTW1CLHVCQUF1QmpCLDZDQUFNQSxDQUFDO0lBQ3BDLE1BQU1rQixTQUFTaEIsMERBQVNBO0lBQ3hCLE1BQU1pQixXQUFXbEIsNERBQVdBO0lBRTVCLE1BQU1tQixrQkFBa0IsQ0FBQyxDQUFDUDtJQUUxQixpQkFBaUI7SUFDakIsTUFBTVEsZ0JBQWdCakIsc0ZBQXdCQTtJQUU5QyxrQkFBa0I7SUFDbEIsTUFBTWtCLGlCQUFpQmpCLHdGQUEwQkE7SUFFakQsb0JBQW9CO0lBQ3BCLE1BQU1rQixtQkFBbUJqQiw0RkFBOEJBO0lBRXZELHNDQUFzQztJQUN0QyxNQUFNa0IsaUJBQWlCO1FBQ3JCLE9BQU9oQiwwRUFBZ0JBLENBQWU7WUFDcENpQixLQUFLO1lBQ0xDLFFBQVE7UUFDVjtJQUNGO0lBRUEsNkNBQTZDO0lBQzdDLE1BQU1DLG1CQUFtQjVCLGtEQUFXQTtzREFBQztZQUNuQyxxREFBcUQ7WUFDckQsSUFBSWtCLHFCQUFxQlcsT0FBTyxJQUFJYixXQUFXO2dCQUM3Q2MsUUFBUUMsR0FBRyxDQUFDO2dCQUNaO1lBQ0Y7WUFFQSwyREFBMkQ7WUFDM0QsSUFBSSxDQUFDZixXQUFXO2dCQUNkQyxhQUFhO2dCQUNiYSxRQUFRQyxHQUFHLENBQUM7WUFDZDtZQUVBLDZDQUE2QztZQUM3Q2IscUJBQXFCVyxPQUFPLEdBQUc7WUFFL0IsSUFB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QUFDRCxPQUFPQTtrQkFBUXRDOzs7Ozs7QUFDOUM7R0F6S2dCRDs7UUFJQ1Qsc0RBQVNBO1FBQ1BELHdEQUFXQTtRQUtORyxrRkFBd0JBO1FBR3ZCQyxvRkFBMEJBO1FBR3hCQyx3RkFBOEJBOzs7S0FoQnpDSztBQTJLaEIsMkJBQTJCO0FBQ3BCLE1BQU15QyxVQUFVOztJQUNyQixNQUFNQyxVQUFVekQsaURBQVVBLENBQUNhO0lBRTNCLElBQUk0QyxZQUFZM0MsV0FBVztRQUN6QixNQUFNLElBQUk0QyxNQUFNO0lBQ2xCO0lBRUEsT0FBT0Q7QUFDVCxFQUFDO0lBUllEIiwic291cmNlcyI6WyIvVXNlcnMvYXJ0aHVyL3dvcmsvQmV0YUFjaWQvTGlua0J5dGUvZnJvbnRlbmQvcHJvdmlkZXJzL2F1dGgtcHJvdmlkZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuXG5pbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlLCB0eXBlIFJlYWN0Tm9kZSwgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgdXNlUGF0aG5hbWUsIHVzZVJvdXRlciB9IGZyb20gJ25leHQvbmF2aWdhdGlvbidcbmltcG9ydCB7XG4gIHJlZnJlc2hUb2tlbkFwaUF1dGhSZWZyZXNoUG9zdCxcbiAgdXNlTG9naW5BcGlBdXRoTG9naW5Qb3N0LFxuICB1c2VMb2dvdXRBcGlBdXRoTG9nb3V0UG9zdCxcbiAgdXNlUmVnaXN0ZXJBcGlBdXRoUmVnaXN0ZXJQb3N0LFxufSBmcm9tICdAL2xpYi9hcGkvZ2VuZXJhdGVkL2F1dGgvYXV0aCdcbmltcG9ydCB0eXBlIHsgVXNlclJlc3BvbnNlIH0gZnJvbSAnQC9saWIvYXBpL2dlbmVyYXRlZC9tb2RlbHMnXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJ3Nvbm5lcidcbmltcG9ydCB7IGN1c3RvbUluc3RhbmNlRm4gfSBmcm9tICdAL2xpYi9hcGkvY3VzdG9tLWluc3RhbmNlJ1xuXG5pbnRlcmZhY2UgQXV0aENvbnRleHRUeXBlIHtcbiAgdXNlcjogVXNlclJlc3BvbnNlIHwgbnVsbFxuICBpc0xvYWRpbmc6IGJvb2xlYW5cbiAgaXNBdXRoZW50aWNhdGVkOiBib29sZWFuXG4gIGxvZ2luOiAodXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPlxuICBsb2dvdXQ6ICgpID0+IFByb21pc2U8dm9pZD5cbiAgcmVmcmVzaFRva2VuOiAoKSA9PiBQcm9taXNlPGJvb2xlYW4+XG4gIHJlZ2lzdGVyOiAoZW1haWw6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPlxufVxuXG5jb25zdCBBdXRoQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8QXV0aENvbnRleHRUeXBlIHwgdW5kZWZpbmVkPih1bmRlZmluZWQpXG5cbmludGVyZmFjZSBBdXRoUHJvdmlkZXJQcm9wcyB7XG4gIGNoaWxkcmVuOiBSZWFjdE5vZGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhQcm92aWRlcih7IGNoaWxkcmVuIH06IEF1dGhQcm92aWRlclByb3BzKSB7XG4gIGNvbnN0IFt1c2VyLCBzZXRVc2VyXSA9IHVzZVN0YXRlPFVzZXJSZXNwb25zZSB8IG51bGw+KG51bGwpXG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKVxuICBjb25zdCBpbml0aWFsTG9hZEF0dGVtcHRlZCA9IHVzZVJlZihmYWxzZSlcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcbiAgY29uc3QgcGF0aG5hbWUgPSB1c2VQYXRobmFtZSgpXG5cbiAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gISF1c2VyXG5cbiAgLy8gTG9naW4gbXV0YXRpb25cbiAgY29uc3QgbG9naW5NdXRhdGlvbiA9IHVzZUxvZ2luQXBpQXV0aExvZ2luUG9zdCgpXG5cbiAgLy8gTG9nb3V0IG11dGF0aW9uXG4gIGNvbnN0IGxvZ291dE11dGF0aW9uID0gdXNlTG9nb3V0QXBpQXV0aExvZ291dFBvc3QoKVxuXG4gIC8vIFJlZ2lzdGVyIG11dGF0aW9uXG4gIGNvbnN0IHJlZ2lzdGVyTXV0YXRpb24gPSB1c2VSZWdpc3RlckFwaUF1dGhSZWdpc3RlclBvc3QoKVxuXG4gIC8vIEN1c3RvbSBmdW5jdGlvbiB0byBnZXQgY3VycmVudCB1c2VyXG4gIGNvbnN0IGdldEN1cnJlbnRVc2VyID0gYXN5bmMgKCk6IFByb21pc2U8VXNlclJlc3BvbnNlPiA9PiB7XG4gICAgcmV0dXJuIGN1c3RvbUluc3RhbmNlRm48VXNlclJlc3BvbnNlPih7XG4gICAgICB1cmw6ICcvYXBpL2F1dGgvbWUnLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICB9KVxuICB9XG5cbiAgLy8gRnVuY3Rpb24gdG8gZmV0Y2ggdGhlIGN1cnJlbnQgdXNlciBwcm9maWxlXG4gIGNvbnN0IGZldGNoVXNlclByb2ZpbGUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgLy8gUHJldmVudCBtdWx0aXBsZSBsb2FkaW5nIGF0dGVtcHRzIGZvciBpbml0aWFsIGxvYWRcbiAgICBpZiAoaW5pdGlhbExvYWRBdHRlbXB0ZWQuY3VycmVudCAmJiBpc0xvYWRpbmcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdBdXRoOiBTa2lwcGluZyBkdXBsaWNhdGUgZmV0Y2ggLSBhbHJlYWR5IGxvYWRpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgLy8gRG9uJ3Qgc2V0IGxvYWRpbmcgc3RhdGUgdG8gdHJ1ZSBpZiB3ZSdyZSBhbHJlYWR5IGxvYWRpbmdcbiAgICBpZiAoIWlzTG9hZGluZykge1xuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgICAgY29uc29sZS5sb2coJ0F1dGg6IFN0YXJ0ZWQgbG9hZGluZyB1c2VyIHByb2ZpbGUnKTtcbiAgICB9XG4gICAgXG4gICAgLy8gTWFyayB0aGF0IHdlJ3ZlIGF0dGVtcHRlZCB0aGUgaW5pdGlhbCBsb2FkXG4gICAgaW5pdGlhbExvYWRBdHRlbXB0ZWQuY3VycmVudCA9IHRydWU7XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIGNvbnNvbGUubG9nKCdBdXRoOiBBdHRlbXB0aW5nIHRvIGZldGNoIHVzZXIgcHJvZmlsZScpO1xuICAgICAgY29uc3QgdXNlckRhdGEgPSBhd2FpdCBnZXRDdXJyZW50VXNlcigpO1xuICAgICAgY29uc29sZS5sb2coJ0F1dGg6IFN1Y2Nlc3NmdWxseSBmZXRjaGVkIHVzZXIgcHJvZmlsZScsIHVzZXJEYXRhKTtcbiAgICAgIHNldFVzZXIodXNlckRhdGEpO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0F1dGg6IEZhaWxlZCB0byBmZXRjaCB1c2VyIHByb2ZpbGUnLCBlcnJvcj8ubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAvLyBJZiB0aGUgZXJyb3IgaXMgYSA0MDEsIGl0IG1lYW5zIHRoZSB1c2VyIGlzIG5vdCBhdXRoZW50aWNhdGVkXG4gICAgICBpZiAoZXJyb3I/LnJlc3BvbnNlPy5zdGF0dXMgPT09IDQwMSkge1xuICAgICAgICBjb25zb2xlLmxvZygnQXV0aDogVXNlciBpcyBub3QgYXV0aGVudGljYXRlZCAoNDAxKScpO1xuICAgICAgfVxuICAgICAgc2V0VXNlcihudWxsKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgY29uc29sZS5sb2coJ0F1dGg6IEZpbmlzaGVkIGxvYWRpbmcgdXNlciBwcm9maWxlJyk7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfSwgW10pOyAvLyBObyBkZXBlbmRlbmNpZXMgdG8gYXZvaWQgbG9vcHNcblxuICAvLyBGdW5jdGlvbiB0byByZWZyZXNoIHRoZSB0b2tlblxuICBjb25zdCByZWZyZXNoVG9rZW4gPSBhc3luYyAoKSA9PiB7XG4gICAgLy8gRG9uJ3QgYXR0ZW1wdCByZWZyZXNoIGlmIHdlJ3JlIG5vdCBhdXRoZW50aWNhdGVkXG4gICAgaWYgKCFpc0F1dGhlbnRpY2F0ZWQgJiYgIWlzTG9hZGluZykge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIFxuICAgIHRyeSB7XG4gICAgICBhd2FpdCByZWZyZXNoVG9rZW5BcGlBdXRoUmVmcmVzaFBvc3QoKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIHJlZnJlc2ggdG9rZW4nLCBlcnJvcilcbiAgICAgIHNldFVzZXIobnVsbClcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIC8vIExvZ2luIGZ1bmN0aW9uXG4gIGNvbnN0IGxvZ2luID0gYXN5bmMgKHVzZXJuYW1lOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgbG9naW5NdXRhdGlvbi5tdXRhdGVBc3luYyh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG5cbiAgICAgIC8vIEFmdGVyIHN1Y2Nlc3NmdWwgbG9naW4sIGZldGNoIHRoZSB1c2VyIHByb2ZpbGVcbiAgICAgIGF3YWl0IGZldGNoVXNlclByb2ZpbGUoKVxuXG4gICAgICAvLyBSZWRpcmVjdCB0byBkYXNoYm9hcmQgYWZ0ZXIgc3VjY2Vzc2Z1bCBsb2dpblxuICAgICAgcm91dGVyLnB1c2goJy9kYXNoYm9hcmQnKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMb2dpbiBmYWlsZWQnLCBlcnJvcilcbiAgICAgIHRvYXN0LmVycm9yKCdMb2dpbiBGYWlsZWQnLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnSW52YWxpZCBjcmVkZW50aWFscy4gUGxlYXNlIHRyeSBhZ2Fpbi4nLFxuICAgICAgfSlcbiAgICAgIHRocm93IGVycm9yXG4gICAgfVxuICB9XG5cbiAgLy8gUmVnaXN0ZXIgZnVuY3Rpb25cbiAgY29uc3QgcmVnaXN0ZXIgPSBhc3luYyAoZW1haWw6IHN0cmluZywgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCByZWdpc3Rlck11dGF0aW9uLm11dGF0ZUFzeW5jKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGVtYWlsLFxuICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICB9LFxuICAgICAgfSlcblxuICAgICAgLy8gQWZ0ZXIgc3VjY2Vzc2Z1bCByZWdpc3RyYXRpb24sIGxvZyB0aGUgdXNlciBpblxuICAgICAgYXdhaXQgbG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdSZWdpc3RyYXRpb24gZmFpbGVkJywgZXJyb3IpXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cbiAgfVxuXG4gIC8vIExvZ291dCBmdW5jdGlvblxuICBjb25zdCBsb2dvdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGxvZ291dE11dGF0aW9uLm11dGF0ZUFzeW5jKClcbiAgICAgIHNldFVzZXIobnVsbClcblxuICAgICAgLy8gUmVkaXJlY3QgdG8gaG9tZSBwYWdlIGFmdGVyIGxvZ291dFxuICAgICAgcm91dGVyLnB1c2goJy8nKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdMb2dvdXQgZmFpbGVkJywgZXJyb3IpXG4gICAgICB0b2FzdC5lcnJvcignTG9nb3V0IEZhaWxlZCcsIHtcbiAgICAgICAgZGVzY3JpcHRpb246ICdGYWlsZWQgdG8gbG9nb3V0LiBQbGVhc2UgdHJ5IGFnYWluLicsXG4gICAgICB9KVxuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBhdXRoZW50aWNhdGlvbiBzdGF0dXMgb24gaW5pdGlhbCBsb2FkXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gSW5pdGlhbCBhdXRoIGNoZWNrXG4gICAgZmV0Y2hVc2VyUHJvZmlsZSgpO1xuXG4gICAgLy8gT25seSBzZXQgdXAgcmVmcmVzaCB0b2tlbiBpbnRlcnZhbCBpZiB3ZSdyZSBhdXRoZW50aWNhdGVkXG4gICAgbGV0IHJlZnJlc2hJbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCBudWxsID0gbnVsbDtcbiAgICBcbiAgICBpZiAoaXNBdXRoZW50aWNhdGVkKSB7XG4gICAgICByZWZyZXNoSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHJlZnJlc2hUb2tlbigpO1xuICAgICAgfSwgMTQgKiA2MCAqIDEwMDApOyAvLyBSZWZyZXNoIGV2ZXJ5IDE0IG1pbnV0ZXMgKGFzc3VtaW5nIDE1IG1pbiB0b2tlbiBsaWZldGltZSlcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHJlZnJlc2hJbnRlcnZhbCkgY2xlYXJJbnRlcnZhbChyZWZyZXNoSW50ZXJ2YWwpO1xuICAgIH07XG4gIH0sIFtmZXRjaFVzZXJQcm9maWxlXSk7IC8vIE9ubHkgcnVuIG9uIG1vdW50IHdpdGggc3RhYmxlIGZldGNoVXNlclByb2ZpbGVcblxuICAvLyBBdXRoZW50aWNhdGlvbiBjb250ZXh0IHZhbHVlXG4gIGNvbnN0IHZhbHVlID0ge1xuICAgIHVzZXIsXG4gICAgaXNMb2FkaW5nLFxuICAgIGlzQXV0aGVudGljYXRlZCxcbiAgICBsb2dpbixcbiAgICBsb2dvdXQsXG4gICAgcmVmcmVzaFRva2VuLFxuICAgIHJlZ2lzdGVyLFxuICB9XG5cbiAgcmV0dXJuIDxBdXRoQ29udGV4dC5Qcm92aWRlciB2YWx1ZT17dmFsdWV9PntjaGlsZHJlbn08L0F1dGhDb250ZXh0LlByb3ZpZGVyPlxufVxuXG4vLyBIb29rIHRvIHVzZSBhdXRoIGNvbnRleHRcbmV4cG9ydCBjb25zdCB1c2VBdXRoID0gKCkgPT4ge1xuICBjb25zdCBjb250ZXh0ID0gdXNlQ29udGV4dChBdXRoQ29udGV4dClcblxuICBpZiAoY29udGV4dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1c2VBdXRoIG11c3QgYmUgdXNlZCB3aXRoaW4gYW4gQXV0aFByb3ZpZGVyJylcbiAgfVxuXG4gIHJldHVybiBjb250ZXh0XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ29udGV4dCIsInVzZUNvbnRleHQiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZUNhbGxiYWNrIiwidXNlUmVmIiwidXNlUGF0aG5hbWUiLCJ1c2VSb3V0ZXIiLCJyZWZyZXNoVG9rZW5BcGlBdXRoUmVmcmVzaFBvc3QiLCJ1c2VMb2dpbkFwaUF1dGhMb2dpblBvc3QiLCJ1c2VMb2dvdXRBcGlBdXRoTG9nb3V0UG9zdCIsInVzZVJlZ2lzdGVyQXBpQXV0aFJlZ2lzdGVyUG9zdCIsInRvYXN0IiwiY3VzdG9tSW5zdGFuY2VGbiIsIkF1dGhDb250ZXh0IiwidW5kZWZpbmVkIiwiQXV0aFByb3ZpZGVyIiwiY2hpbGRyZW4iLCJ1c2VyIiwic2V0VXNlciIsImlzTG9hZGluZyIsInNldElzTG9hZGluZyIsImluaXRpYWxMb2FkQXR0ZW1wdGVkIiwicm91dGVyIiwicGF0aG5hbWUiLCJpc0F1dGhlbnRpY2F0ZWQiLCJsb2dpbk11dGF0aW9uIiwibG9nb3V0TXV0YXRpb24iLCJyZWdpc3Rlck11dGF0aW9uIiwiZ2V0Q3VycmVudFVzZXIiLCJ1cmwiLCJtZXRob2QiLCJmZXRjaFVzZXJQcm9maWxlIiwiY3VycmVudCIsImNvbnNvbGUiLCJsb2ciLCJ1c2VyRGF0YSIsImVycm9yIiwibWVzc2FnZSIsInJlc3BvbnNlIiwic3RhdHVzIiwicmVmcmVzaFRva2VuIiwibG9naW4iLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwibXV0YXRlQXN5bmMiLCJkYXRhIiwicHVzaCIsImRlc2NyaXB0aW9uIiwicmVnaXN0ZXIiLCJlbWFpbCIsImxvZ291dCIsInJlZnJlc2hJbnRlcnZhbCIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInZhbHVlIiwiUHJvdmlkZXIiLCJ1c2VBdXRoIiwiY29udGV4dCIsIkVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./providers/auth-provider.tsx\n"));

/***/ })

});