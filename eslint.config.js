import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['node_modules/', 'dist/', 'worker-configuration.d.ts'] },
  ...tseslint.configs.recommended,
  prettierConfig
);
