import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Consulta Experto',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    iosScheme: 'ionic'
  }
};

export default config;
