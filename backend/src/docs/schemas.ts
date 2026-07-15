/**
 * @openapi
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       required:
 *         - success
 *         - statusCode
 *         - message
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         statusCode:
 *           type: integer
 *           example: 400
 *         message:
 *           type: string
 *           example: Validation failed
 *         code:
 *           type: string
 *           example: VALIDATION_ERROR
 *         details:
 *           description: Additional error context such as validation field errors
 *           oneOf:
 *             - type: array
 *               items:
 *                 $ref: '#/components/schemas/ValidationErrorDetail'
 *             - type: object
 *
 *     ValidationErrorDetail:
 *       type: object
 *       required:
 *         - field
 *         - message
 *       properties:
 *         field:
 *           type: string
 *           example: title
 *         message:
 *           type: string
 *           example: Title is required
 *
 *     UserRole:
 *       type: string
 *       enum: [ADMIN, DEVELOPER, SUPPORT, MANAGER, QA]
 *
 *     TicketStatus:
 *       type: string
 *       enum: [OPEN, IN_PROGRESS, RESOLVED, CLOSED, CANCELLED]
 *
 *     TicketPriority:
 *       type: string
 *       enum: [LOW, MEDIUM, HIGH, URGENT]
 *
 *     UserSummary:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           example: user-alice-admin
 *         name:
 *           type: string
 *           example: Alice Admin
 *         email:
 *           type: string
 *           format: email
 *           example: admin@example.com
 *         role:
 *           $ref: '#/components/schemas/UserRole'
 *
 *     User:
 *       allOf:
 *         - $ref: '#/components/schemas/UserSummary'
 *         - type: object
 *           required:
 *             - createdAt
 *             - updatedAt
 *           properties:
 *             createdAt:
 *               type: string
 *               format: date-time
 *             updatedAt:
 *               type: string
 *               format: date-time
 *       description: Full user entity as stored in the database (password is never returned by the API)
 *
 *     Ticket:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - status
 *         - priority
 *         - creatorId
 *         - creator
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           example: ticket-1001
 *         title:
 *           type: string
 *           example: Login page not loading
 *         description:
 *           type: string
 *           example: Users report a blank screen after submitting credentials.
 *         status:
 *           $ref: '#/components/schemas/TicketStatus'
 *         priority:
 *           $ref: '#/components/schemas/TicketPriority'
 *         creatorId:
 *           type: string
 *           example: user-alice-admin
 *         assigneeId:
 *           type: string
 *           nullable: true
 *           example: user-carol-support
 *         creator:
 *           $ref: '#/components/schemas/UserSummary'
 *         assignee:
 *           oneOf:
 *             - $ref: '#/components/schemas/UserSummary'
 *             - type: "null"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateTicketRequest:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - priority
 *         - assigneeId
 *         - creatorId
 *       properties:
 *         title:
 *           type: string
 *           example: Login page not loading
 *         description:
 *           type: string
 *           example: Users report a blank screen after submitting credentials.
 *         priority:
 *           $ref: '#/components/schemas/TicketPriority'
 *         assigneeId:
 *           type: string
 *           example: user-carol-support
 *         creatorId:
 *           type: string
 *           example: user-alice-admin
 *         status:
 *           $ref: '#/components/schemas/TicketStatus'
 *
 *     UpdateTicketRequest:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         title:
 *           type: string
 *           example: Updated ticket title
 *         description:
 *           type: string
 *           example: Updated ticket description
 *         priority:
 *           $ref: '#/components/schemas/TicketPriority'
 *         assigneeId:
 *           type: string
 *           nullable: true
 *           example: user-bob-developer
 *         status:
 *           $ref: '#/components/schemas/TicketStatus'
 *
 *     TicketStatusTransitionsResponse:
 *       type: object
 *       required:
 *         - currentStatus
 *         - allowedTransitions
 *         - isTerminal
 *       properties:
 *         currentStatus:
 *           $ref: '#/components/schemas/TicketStatus'
 *         allowedTransitions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TicketStatus'
 *         isTerminal:
 *           type: boolean
 *           example: false
 *
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - message
 *         - ticketId
 *         - authorId
 *         - author
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           example: clx123comment
 *         message:
 *           type: string
 *           example: Investigating the login issue now.
 *         ticketId:
 *           type: string
 *           example: ticket-1001
 *         authorId:
 *           type: string
 *           example: user-carol-support
 *         author:
 *           $ref: '#/components/schemas/UserSummary'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateCommentRequest:
 *       type: object
 *       required:
 *         - message
 *         - authorId
 *       properties:
 *         message:
 *           type: string
 *           example: Investigating the login issue now.
 *         authorId:
 *           type: string
 *           example: user-carol-support
 *
 *     DashboardStats:
 *       type: object
 *       required:
 *         - totalTickets
 *         - openTickets
 *         - inProgressTickets
 *         - resolvedTickets
 *         - closedTickets
 *         - cancelledTickets
 *       properties:
 *         totalTickets:
 *           type: integer
 *           example: 120
 *         openTickets:
 *           type: integer
 *           example: 20
 *         inProgressTickets:
 *           type: integer
 *           example: 35
 *         resolvedTickets:
 *           type: integer
 *           example: 45
 *         closedTickets:
 *           type: integer
 *           example: 18
 *         cancelledTickets:
 *           type: integer
 *           example: 2
 *
 *     PaginatedTicketsResponse:
 *       type: object
 *       required:
 *         - data
 *         - page
 *         - limit
 *         - total
 *         - totalPages
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ticket'
 *         page:
 *           type: integer
 *           example: 1
 *         limit:
 *           type: integer
 *           example: 10
 *         total:
 *           type: integer
 *           example: 50
 *         totalPages:
 *           type: integer
 *           example: 5
 *
 *     ApiInfoResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Support Ticket Management System API
 *         health:
 *           type: string
 *           example: /health
 *         tickets:
 *           type: string
 *           example: /tickets
 *         dashboard:
 *           type: string
 *           example: /api/dashboard/stats
 *
 *     HealthResponse:
 *       type: object
 *       required:
 *         - status
 *         - timestamp
 *       properties:
 *         status:
 *           type: string
 *           example: ok
 *         timestamp:
 *           type: string
 *           format: date-time
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: admin@example.com
 *         password:
 *           type: string
 *           format: password
 *           example: password123
 *
 *     LoginResponse:
 *       type: object
 *       required:
 *         - accessToken
 *         - user
 *       properties:
 *         accessToken:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         user:
 *           $ref: '#/components/schemas/UserSummary'
 *
 *   responses:
 *     BadRequestError:
 *       description: Invalid request or validation failure
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             success: false
 *             statusCode: 400
 *             message: Validation failed
 *             code: VALIDATION_ERROR
 *             details:
 *               - field: title
 *                 message: Title is required
 *
 *     NotFoundError:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             success: false
 *             statusCode: 404
 *             message: Ticket not found
 *
 *     ConflictError:
 *       description: Resource conflict
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             success: false
 *             statusCode: 409
 *             message: A record with the same unique value already exists
 *             code: P2002
 *
 *     InternalServerError:
 *       description: Unexpected server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ErrorResponse'
 *           example:
 *             success: false
 *             statusCode: 500
 *             message: Internal server error
 *             code: INTERNAL_SERVER_ERROR
 */

export {};
