/**
 * @swagger
 *
 * tags:
 *   - name: Recipes
 *     description: Rotas de receitas
 *
 * paths:
 *
 *   /recipes:
 *
 *     get:
 *       summary: Lista receitas
 *       tags:
 *         - Recipes
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
 *           description: Filtrar por nome da receita
 *           example: Lasanha
 *
 *
 *         - in: query
 *           name: category_id
 *           required: false
 *
 *           schema:
 *             type: integer
 *
 *           description: Filtrar por categoria
 *           example: 1
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
 *           description: Lista de receitas
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
 *                           example: Lasanha de Frango
 *
 *                         ingredients:
 *                           type: string
 *                           example: Frango, queijo, molho e massa
 *
 *                         preparation_method:
 *                           type: string
 *                           example: Misture os ingredientes e asse por 40 minutos
 *
 *                         preparation_time_minutes:
 *                           type: integer
 *                           example: 40
 *
 *                         servings:
 *                           type: integer
 *                           example: 5
 *
 *                         category_id:
 *                           type: integer
 *                           example: 1
 *
 *                   total:
 *                     type: integer
 *                     example: 1
 *
 *
 *     post:
 *       summary: Cria uma nova receita
 *       tags:
 *         - Recipes
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
 *                 - preparation_method
 *                 - ingredients
 *                 - category_id
 *                 - preparation_time_minutes
 *                 - servings
 *
 *               properties:
 *
 *                 name:
 *                   type: string
 *                   example: Lasanha de Frango
 *
 *                 preparation_method:
 *                   type: string
 *                   example: Misture os ingredientes e asse por 40 minutos
 *
 *                 ingredients:
 *                   type: string
 *                   example: Frango, queijo, molho e massa
 *
 *                 category_id:
 *                   type: integer
 *                   example: 1
 *
 *                 preparation_time_minutes:
 *                   type: integer
 *                   example: 40
 *
 *                 servings:
 *                   type: integer
 *                   example: 5
 *
 *       responses:
 *
 *         201:
 *           description: Receita cadastrada com sucesso
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
 *                     example: Categoria é obrigatória
 *
 *
 *   /recipes/{id}:
 *
 *     get:
 *       summary: Busca receita por ID
 *       tags:
 *         - Recipes
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
 *           description: ID da receita
 *           example: 1
 *
 *       responses:
 *
 *         200:
 *           description: Receita encontrada
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
 *                     example: Lasanha de Frango
 *
 *                   ingredients:
 *                     type: string
 *                     example: Frango, queijo, molho e massa
 *
 *                   preparation_method:
 *                     type: string
 *                     example: Misture os ingredientes e asse por 40 minutos
 *
 *                   category_id:
 *                     type: integer
 *                     example: 1
 *
 *                   preparation_time_minutes:
 *                     type: integer
 *                     example: 40
 *
 *                   servings:
 *                     type: integer
 *                     example: 5
 *
 *         404:
 *           description: Receita não encontrada
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
 *                     example: Receita não encontrada
 *
 *
 *     put:
 *       summary: Atualiza uma receita
 *       tags:
 *         - Recipes
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
 *           description: ID da receita
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
 *                 - preparation_method
 *                 - ingredients
 *                 - category_id
 *                 - preparation_time_minutes
 *                 - servings
 *
 *               properties:
 *
 *                 name:
 *                   type: string
 *                   example: Lasanha de Frango
 *
 *                 preparation_method:
 *                   type: string
 *                   example: Misture os ingredientes e asse por 40 minutos
 *
 *                 ingredients:
 *                   type: string
 *                   example: Frango, queijo, molho e massa
 *
 *                 category_id:
 *                   type: integer
 *                   example: 1
 *
 *                 preparation_time_minutes:
 *                   type: integer
 *                   example: 40
 *
 *                 servings:
 *                   type: integer
 *                   example: 5
 *
 *       responses:
 *
 *         200:
 *           description: Receita atualizada com sucesso
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
 *           description: Receita não encontrada
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
 *                     example: Receita não encontrada
 *
 *
 *     delete:
 *       summary: Remove uma receita
 *       tags:
 *         - Recipes
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
 *           description: ID da receita
 *           example: 1
 *
 *       responses:
 *
 *         200:
 *           description: Receita removida com sucesso
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
 *           description: Receita não encontrada
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
 *                     example: Receita não encontrada
 */