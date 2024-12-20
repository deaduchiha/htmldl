import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
    },
    {
      file: "dist/index.d.ts",
      format: "es",
    },
  ],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: "dist/types",
      emitDeclarationOnly: true,
    }),
  ],
};
