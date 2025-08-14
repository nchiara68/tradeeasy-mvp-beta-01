// .dependency-cruiser.cjs
module.exports = {
  options: {
    tsConfig: { fileName: 'tsconfig.json' },
    // ❌ remove moduleSystems entirely
    exclude: { /* …your excludes… */ },
    tsPreCompilationDeps: true,
    combinedDependencies: false,
    prefix: 'absolute',
  },
  forbidden: [ /* …rules… */ ],
};
