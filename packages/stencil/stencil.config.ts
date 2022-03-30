import { Config } from '@stencil/core';
import { reactOutputTarget as react } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'MCA',
  outputTargets: [
    react({
      componentCorePackage: 'stencil',
      proxiesFile: '../ui/components/index.ts',
      includeDefineCustomElements: true,
      loaderDir: 'stencil/loader',
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
