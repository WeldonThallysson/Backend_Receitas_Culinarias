/**
 * @swagger
 *
 * tags:
 *   - name: Auth
 *     description: Rotas de autenticação
 *
 *
 * /auth/register:
 *
 *   post:
 *     summary: Realiza cadastro de usuário
 *
 *     tags:
 *       - Auth
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
 *
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
 *
 *       201:
 *         description: Cadastro realizado com sucesso
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
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
 *
 *                 message:
 *                   type: string
 *                   example: Login já está em uso
 *
 *
 * /auth/login:
 *
 *   post:
 *     summary: Realiza login
 *
 *     tags:
 *       - Auth
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
 *               - login
 *               - password
 *
 *             properties:
 *
 *               login:
 *                 type: string
 *                 example: admin@email.com ou 093.810.360-12
 *
 *               password:
 *                 type: string
 *                 example: 123456
 *
 *     responses:
 *
 *       200:
 *         description: Login realizado com sucesso
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 id:
 *                   type: integer
 *                   example: 1
 *
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *
 *                 message:
 *                   type: string
 *                   example: Bem vindo João
 *
 *       401:
 *         description: Usuário ou senha inválidos
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 message:
 *                   type: string
 *                   example: Usuário ou senha inválidos
 *
 *
 * /auth/recover-password:
 *
 *   post:
 *     summary: Solicita recuperação de senha
 *
 *     tags:
 *       - Auth
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
 *               - login
 *
 *             properties:
 *
 *               login:
 *                 type: string
 *                 example: admin@email.com ou 093.810.360-12
 *
 *     responses:
 *
 *       200:
 *         description: Recuperação de senha liberada
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 canResetPassword:
 *                   type: boolean
 *                   example: true
 *
 *                 resetToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *
 *                 message:
 *                   type: string
 *                   example: Recuperação de senha liberada
 *
 *       400:
 *         description: Login inválido
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 message:
 *                   type: string
 *                   example: Login deve ser email ou CPF válido
 *
 *       404:
 *         description: Login não encontrado
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 message:
 *                   type: string
 *                   example: Login informado não existe ou não está cadastrado
 *
 *
 * /auth/reset-password:
 *
 *   post:
 *     summary: Redefine senha do usuário
 *
 *     tags:
 *       - Auth
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
 *               - token
 *               - oldPassword
 *               - newPassword
 *
 *             properties:
 *
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *
 *               oldPassword:
 *                 type: string
 *                 example: 123456
 *
 *               newPassword:
 *                 type: string
 *                 example: 654321
 *
 *     responses:
 *
 *       200:
 *         description: Senha atualizada com sucesso
 *
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *
 *               properties:
 *
 *                 message:
 *                   type: string
 *                   example: Senha atualizada com sucesso
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
 *
 *                 message:
 *                   type: string
 *                   example: A nova senha deve ser diferente da senha atual
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
 *
 *                 message:
 *                   type: string
 *                   example: Login informado não existe ou não está cadastrado
 */