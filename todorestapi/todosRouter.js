// todosRouter.js
import express from 'express';
import { xml2js, js2xml } from 'xml-js';
import ApiResponseModel from './ApiResponseModel.js';
const router = express.Router();

let todos = [
  { id: 1, task: "Buy groceries", completed: false },
  { id: 2, task: "Walk the dog", completed: true },
  // Add more todos here
];

// Middleware to parse XML body
router.use((req, res, next) => {
  if (req.is('xml')) {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', chunk => { data += chunk });
    req.on('end', () => {
      req.body = xml2js(data, { compact: true, ignoreComment: true, alwaysChildren: true });
      next();
    });
  } else {
    next();
  }
});

// Helper function to send response based on Accept header
const sendResponse = (req, res, data) => {
  const accept = req.headers.accept || '';
  if (accept.includes('xml')) {
    const xml = js2xml(data, { compact: true, ignoreComment: true, spaces: 4 });
    res.type('application/xml').send(xml);
  } else {
    res.json(data);
  }
};

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: The todos managing API
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Returns the list of all the todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: The list of the todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get("/", (req, res) => {
  try {
    ApiResponseModel.message = 'Todos fetched successfully';
    ApiResponseModel.result = 'success';
    ApiResponseModel.data = todos;

    sendResponse(req, res, ApiResponseModel);
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    ApiResponseModel.message = 'Failed to fetch todos';
    ApiResponseModel.result = 'error';
    ApiResponseModel.data = null;

    res.status(500).json(ApiResponseModel);
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get the todo by id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 */
router.get("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      ApiResponseModel.message = 'Todo not found';
      ApiResponseModel.result = 'error';
      ApiResponseModel.data = null;
      return res.status(404).json(ApiResponseModel);
    }

    ApiResponseModel.message = 'Todo fetched successfully';
    ApiResponseModel.result = 'success';
    ApiResponseModel.data = todo;

    sendResponse(req, res, ApiResponseModel);
  } catch (error) {
    console.error('Failed to fetch todo:', error);
    ApiResponseModel.message = 'Failed to fetch todo';
    ApiResponseModel.result = 'error';
    ApiResponseModel.data = null;

    res.status(500).json(ApiResponseModel);
  }
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: The todo was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Some server error
 */
router.post('/', (req, res) => {
  try {
    let newTodo = req.body;

    // Check if the body is JSON
    if (req.is('json')) {
      // Parse JSON body
      newTodo = JSON.parse(JSON.stringify(newTodo));
    } else if (req.is('xml')) {
      // Handle XML body parsing (if needed)
      newTodo = {
        task: newTodo.todo.task._text,
        completed: newTodo.todo.completed._text === 'true'
      };
    } else {
      // Handle unsupported content types
      ApiResponseModel.message = 'Unsupported Content-Type';
      ApiResponseModel.result = 'error';
      ApiResponseModel.data = null;
      return res.status(415).json(ApiResponseModel);
    }

    // Rest of your code to create a new todo
    newTodo.id = todos.length + 1;
    todos.push(newTodo);

    ApiResponseModel.message = 'Todo created successfully';
    ApiResponseModel.result = 'success';
    ApiResponseModel.data = newTodo;

    res.status(201);
    sendResponse(req, res, ApiResponseModel);
  } catch (error) {
    console.error('Failed to create todo:', error);
    ApiResponseModel.message = 'Failed to create todo';
    ApiResponseModel.result = 'error';
    ApiResponseModel.data = null;

    res.status(500).json(ApiResponseModel);
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update the todo by the id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The todo id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: The todo was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 *       500:
 *         description: Some error happened
 */
router.put("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedTodo = req.body;
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      ApiResponseModel.message = 'Todo not found';
      ApiResponseModel.result = 'error';
      ApiResponseModel.data = null;
      return res.status(404).json(ApiResponseModel);
    }

    todos[todoIndex] = updatedTodo;

    ApiResponseModel.message = 'Todo updated successfully';
    ApiResponseModel.result = 'success';
    ApiResponseModel.data = updatedTodo;

    sendResponse(req, res, ApiResponseModel);
  } catch (error) {
    console.error('Failed to update todo:', error);
    ApiResponseModel.message = 'Failed to update todo';
    ApiResponseModel.result = 'error';
    ApiResponseModel.data = null;

    res.status(500).json(ApiResponseModel);
  }
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Remove the todo by id
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The todo id
 *     responses:
 *       200:
 *         description: The todo was deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: The todo was not found
 */
router.delete("/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex((t) => t.id === id);
    if (todoIndex === -1) {
      ApiResponseModel.message = 'Todo not found';
      ApiResponseModel.result = 'error';
      ApiResponseModel.data = null;
      return res.status(404).json(ApiResponseModel);
    }

    const deletedTodo = todos.splice(todoIndex, 1)[0];

    ApiResponseModel.message = 'Todo deleted successfully';
    ApiResponseModel.result = 'success';
    ApiResponseModel.data = deletedTodo;

    sendResponse(req, res, ApiResponseModel);
  } catch (error) {
    console.error('Failed to delete todo:', error);
    ApiResponseModel.message = 'Failed to delete todo';
    ApiResponseModel.result = 'error';
    ApiResponseModel.data = null;

    res.status(500).json(ApiResponseModel);
  }
});

export default router;