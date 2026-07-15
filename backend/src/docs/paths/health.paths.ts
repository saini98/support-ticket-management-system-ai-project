/**
 * @openapi
 * /:
 *   get:
 *     tags:
 *       - Health
 *     summary: Get API metadata
 *     description: Returns links to primary API resources.
 *     responses:
 *       200:
 *         description: API metadata
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiInfoResponse'
 *
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Health check
 *     description: Returns service health status.
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthResponse'
 */

export {};
