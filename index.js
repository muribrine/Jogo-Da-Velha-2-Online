import { Bismark } from './backend.js';

try {
  
  const backend = new Bismark(process.env.PORT || 3001);
  
  console.log('[Core] Biskmark in motion...');

} catch (error) {
  
  console.error(error);

}

