module.exports = {
  linkbyte: {
    output: {
      mode: 'tags-split',
      target: './lib/api/generated',
      schemas: './lib/api/generated/models',
      client: 'react-query',
      mock: false,
      override: {
        mutator: {
          path: './lib/api/custom-instance.ts',
          name: 'customInstanceFn',
        },
        operations: {
          // Customize specific operations if needed
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useMutation: true,
          usePrefetch: true,
          options: {
            staleTime: 10000, // 10 seconds
            retry: 3,
          },
        },
      },
    },
    input: {
      target: './public/openapi.json', // Use local OpenAPI schema file
    },
  },
}
