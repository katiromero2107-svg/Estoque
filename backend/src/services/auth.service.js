const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

class AuthService {
  static async register(name, email, password) {
    try {
      // Verificar se usuário já existe
      const userExists = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (userExists.rows.length > 0) {
        throw new Error('Email já registrado');
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar usuário
      const result = await pool.query(
        'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email',
        [name, email, hashedPassword, 'user']
      );

      const user = result.rows[0];

      // Gerar token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'sua_chave_secreta',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      return { user, token };
    } catch (error) {
      throw error;
    }
  }

  static async login(email, password) {
    try {
      // Buscar usuário
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      if (result.rows.length === 0) {
        throw new Error('Email ou senha inválidos');
      }

      const user = result.rows[0];

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Email ou senha inválidos');
      }

      // Gerar token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'sua_chave_secreta',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      };
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const result = await pool.query(
        'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
        [userId]
      );

      if (result.rows.length === 0) {
        throw new Error('Usuário não encontrado');
      }

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
