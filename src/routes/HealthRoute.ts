import { Router } from 'express';

import { HealthController } from '../controllers';

export const healthRoute: Router = Router();

healthRoute.get('/health', HealthController.getHealth);
