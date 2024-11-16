import dotenv from 'dotenv';
import {createConfig} from 'fuels';

dotenv.config();

export default createConfig({
  workspace: './src',
  forcBuildFlags: ['--release'],
  autoStartFuelCore: false,
  output: '../app/src/artifacts',
  privateKey: process.env.PRIVATE_KEY,
  providerUrl: process.env.PROVIDER_URL,
});
