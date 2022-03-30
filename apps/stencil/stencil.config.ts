import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'MCA',
  outputTargets: [
    react({
      componentCorePackage: 'ui',
      proxiesFile: '../../packages/ui/components/index.ts',
      includeDefineCustomElements: false,
      loaderDir: '../loader',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
  ],
};
