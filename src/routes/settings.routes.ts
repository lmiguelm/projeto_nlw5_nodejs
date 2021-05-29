import { Router } from 'express';

import { SettingsController } from '../controllers/SettingsController';

export const settingsRoutes = Router();

const settings = new SettingsController();

settingsRoutes.post('/settings', settings.create);
settingsRoutes.put('/settings/:username', settings.update);
settingsRoutes.get('/settings/:username', settings.findByUsername);
