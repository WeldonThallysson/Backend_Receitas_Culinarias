/**
 * @swagger
 *
 * tags:
 *   - name: Users
 *     description: Rotas de usuários
 *
 * /users:
 *   get:
 *     summary: Lista usuários
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtrar por nome
 *         example: João
 *
 *       - in: query
 *         name: login
 *         required: false
 *         schema:
 *           type: string
 *         description: Filtrar por login
 *         example: joao@email.com
 *
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *         description: Página atual
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *         description: Quantidade por página
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: Lista de usuários
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 items:
 *                   type: array
 *
 *                   items:
 *                     type: object
 *
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *
 *                       nome:
 *                         type: string
 *                         example: João Silva
 *
 *                       login:
 *                         type: string
 *                         example: joao@email.com
 *
 *                 total:
 *                   type: integer
 *                   example: 1
 *
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - name
 *               - login
 *               - password
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *
 *               login:
 *                 type: string
 *                 example: joao@email.com ou 093.810.360-12
 *
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Cadastro realizado com sucesso
 *
 *       400:
 *         description: Dados inválidos
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login já está em uso
 *
 * /users/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *
 *         schema:
 *           type: integer
 *
 *         description: ID do usuário
 *         example: 1
 *
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *
 *                 nome:
 *                   type: string
 *                   example: João Silva
 *
 *                 login:
 *                   type: string
 *                   example: joao@email.com
 *
 *       404:
 *         description: Usuário não encontrado
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário não encontrado
 *
 *   put:
 *     summary: Atualiza usuário
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *
 *         schema:
 *           type: integer
 *
 *         description: ID do usuário
 *         example: 1
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - name
 *               - login
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *
 *               login:
 *                 type: string
 *                 example: joao@email.com ou 093.810.360-12
 *
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Atualização realizada com sucesso
 *
 *       404:
 *         description: Usuário não encontrado
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário não encontrado
 *
 *   delete:
 *     summary: Remove usuário
 *     tags:
 *       - Users
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *
 *         schema:
 *           type: integer
 *
 *         description: ID do usuário
 *         example: 1
 *
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Deletado com sucesso
 *
 *       404:
 *         description: Usuário não encontrado
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuário não encontrado
 */