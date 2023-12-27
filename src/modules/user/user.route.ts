import {FastifyInstance} from 'fastify';
import { $ref } from './user.schema';

import {createUser, getUsers, login, logout} from './user.controller';

export async function userRoutes(app: FastifyInstance) {
	app.get('/', {preHandler: [app.authenticate]}, getUsers);

	app.get('/all', {preHandler: [app.authenticate]}, getUsers);

	app.delete('/logout', {preHandler: [app.authenticate]}, logout)

	app.post('/register', {
		schema: {
			body: $ref('createUserSchema'),
			response: {
				201: $ref('createUserResponseSchema')
			}
		}
	}, createUser);

	app.post('/login', {
		schema: {
			body: $ref('loginSchema'),
			response: {
				201: $ref('loginResponseSchema')
			}
		}
	}, login);

	app.post('/logout', () => {});

	app.log.info('user routes registered');
}