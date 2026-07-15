/**
 * @openapi
 * components:
 *   schemas:
 *     UserReferenceNote:
 *       type: object
 *       description: Users are referenced by ID in ticket and comment operations. Use existing seeded user IDs such as user-alice-admin.
 *       properties:
 *         id:
 *           type: string
 *           example: user-alice-admin
 *         name:
 *           type: string
 *           example: Alice Admin
 *         email:
 *           type: string
 *           example: admin@example.com
 *         role:
 *           $ref: '#/components/schemas/UserRole'
 */

export {};
