/**
 * @swagger
 *
 * tags:
 *   - name: Categories
 *     description: Rotas de categorias
 *
 * paths:
 *
 *   /categories:
 *
 *     get:
 *       summary: Lista categorias
 *       tags:
 *         - Categories
 *
 *       security:
 *         - bearerAuth: []
 *
 *       parameters:
 *
 *         - in: query
 *           name: name
 *           required: false
 *
 *           schema:
 *             type: string
 *
 *           description: Filtrar por nome da categoria
 *           example: Massas
 *
 *
 *         - in: query
 *           name: page
 *           required: false
 *
 *           schema:
 *             type: integer
 *
 *           description: Página atual
 *           example: 1
 *
 *
 *         - in: query
 *           name: limit
 *           required: false
 *
 *           schema:
 *             type: integer
 *
 *           description: Quantidade por página
 *           example: 10
 *
 *       responses:
 *
 *         200:
 *           description: Lista de categorias
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   items:
 *                     type: array
 *
 *                     items:
 *                       type: object
 *
 *                       properties:
 *
 *                         id:
 *                           type: integer
 *                           example: 1
 *
 *                         name:
 *                           type: string
 *                           example: Massas
 *
 *                   total:
 *                     type: integer
 *                     example: 1
 *
 *
 *     post:
 *       summary: Cria uma nova categoria
 *       tags:
 *         - Categories
 *
 *       security:
 *         - bearerAuth: []
 *
 *       requestBody:
 *         required: true
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               required:
 *                 - name
 *
 *               properties:
 *
 *                 name:
 *                   type: string
 *                   example: Massas
 *
 *       responses:
 *
 *         201:
 *           description: Categoria cadastrada com sucesso
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   message:
 *                     type: string
 *                     example: Cadastro realizado com sucesso
 *
 *         400:
 *           description: Dados inválidos
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   message:
 *                     type: string
 *                     example: Categoria já existe
 *
 *
 *   /categories/{id}:
 *
 *     get:
 *       summary: Busca categoria por ID
 *       tags:
 *         - Categories
 *
 *       security:
 *         - bearerAuth: []
 *
 *       parameters:
 *
 *         - in: path
 *           name: id
 *           required: true
 *
 *           schema:
 *             type: integer
 *
 *           description: ID da categoria
 *           example: 1
 *
 *       responses:
 *
 *         200:
 *           description: Categoria encontrada
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   id:
 *                     type: integer
 *                     example: 1
 *
 *                   name:
 *                     type: string
 *                     example: Massas
 *
 *         404:
 *           description: Categoria não encontrada
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   message:
 *                     type: string
 *                     example: Categoria não encontrada
 *
 *
 *     put:
 *       summary: Atualiza categoria
 *       tags:
 *         - Categories
 *
 *       security:
 *         - bearerAuth: []
 *
 *       parameters:
 *
 *         - in: path
 *           name: id
 *           required: true
 *
 *           schema:
 *             type: integer
 *
 *           description: ID da categoria
 *           example: 1
 *
 *       requestBody:
 *         required: true
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               required:
 *                 - name
 *
 *               properties:
 *
 *                 name:
 *                   type: string
 *                   example: Massas
 *
 *       responses:
 *
 *         200:
 *           description: Categoria atualizada com sucesso
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   message:
 *                     type: string
 *                     example: Atualização realizada com sucesso
 *
 *         404:
 *           description: Categoria não encontrada
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   message:
 *                     type: string
 *                     example: Categoria não encontrada
 *
 *
 *     delete:
 *       summary: Remove categoria
 *       tags:
 *         - Categories
 *
 *       security:
 *         - bearerAuth: []
 *
 *       parameters:
 *
 *         - in: path
 *           name: id
 *           required: true
 *
 *           schema:
 *             type: integer
 *
 *           description: ID da categoria
 *           example: 1
 *
 *       responses:
 *
 *         200:
 *           description: Categoria removida com sucesso
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   message:
 *                     type: string
 *                     example: Deletado com sucesso
 *
 *         404:
 *           description: Categoria não encontrada
 *
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *
 *                 properties:
 *
 *                   message:
 *                     type: string
 *                     example: Categoria não encontrada
 */