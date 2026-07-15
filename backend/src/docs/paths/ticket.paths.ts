/**
 * @openapi
 * /tickets:
 *   get:
 *     tags:
 *       - Ticket
 *     summary: List tickets
 *     security:
 *       - bearerAuth: []
 *     description: Returns tickets with optional search, status, priority, and assignedTo filters. Without pagination query params, returns a plain array (legacy format). When any pagination or sorting param is provided, returns a paginated response object.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search keyword matched against ticket ID, title, and description
 *         example: login
 *       - in: query
 *         name: status
 *         schema:
 *           $ref: '#/components/schemas/TicketStatus'
 *         description: Filter tickets by status
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [Low, Medium, High, Critical, LOW, MEDIUM, HIGH, URGENT]
 *         description: Filter tickets by priority. Accepts labels (Low, Medium, High, Critical) or enum values (LOW, MEDIUM, HIGH, URGENT).
 *         example: High
 *       - in: query
 *         name: assignedTo
 *         schema:
 *           type: string
 *         description: Filter tickets by assignee user ID
 *         example: user-bob-developer
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number (enables paginated response)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of tickets per page (enables paginated response)
 *         example: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, updatedAt, title, priority, status]
 *           default: createdAt
 *         description: Field used to sort tickets (enables paginated response)
 *         example: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort direction (enables paginated response)
 *         example: asc
 *     responses:
 *       200:
 *         description: Ticket list or paginated ticket list
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'
 *                 - $ref: '#/components/schemas/PaginatedTicketsResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         description: Authentication required or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Insufficient permissions for this action
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 403
 *               message: You do not have permission to perform this action
 *               code: FORBIDDEN
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   post:
 *     tags:
 *       - Ticket
 *     summary: Create a ticket
 *     description: Creates a new support ticket with a generated readable ticket ID.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTicketRequest'
 *     responses:
 *       201:
 *         description: Ticket created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       401:
 *         description: Authentication required or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Insufficient permissions for this action
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               statusCode: 403
 *               message: You do not have permission to perform this action
 *               code: FORBIDDEN
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /tickets/{id}:
 *   get:
 *     tags:
 *       - Ticket
 *     summary: Get ticket by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *         example: ticket-1001
 *     responses:
 *       200:
 *         description: Ticket details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   put:
 *     tags:
 *       - Ticket
 *     summary: Update a ticket
 *     description: Updates ticket fields and validates allowed status transitions.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *         example: ticket-1001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTicketRequest'
 *     responses:
 *       200:
 *         description: Updated ticket
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ticket'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 *   delete:
 *     tags:
 *       - Ticket
 *     summary: Delete a ticket
 *     description: Permanently deletes a ticket and its related comments.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *         example: ticket-1001
 *     responses:
 *       204:
 *         description: Ticket deleted
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *
 * /tickets/{id}/status-transitions:
 *   get:
 *     tags:
 *       - Ticket
 *     summary: Get allowed status transitions
 *     description: Returns the current ticket status and the list of statuses it can transition to.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Ticket ID
 *         example: ticket-1001
 *     responses:
 *       200:
 *         description: Allowed status transitions
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TicketStatusTransitionsResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequestError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

export {};
