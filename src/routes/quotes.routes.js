import express from "express";
import { pool } from "../db.js";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Quotes
 *   description: Gestion des citations
 */

/**
 * GET /api/quotes/random
 */
/**
 * @swagger
 * /api/quotes/random:
 *   get:
 *     summary: Récupérer une citation aléatoire
 *     tags: [Quotes]
 *     responses:
 *       200:
 *         description: Une citation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quote'
 */

router.get("/random", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1"
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
    console.error(err);
  }
});

/**
 * GET /api/quotes?category=tech
 */
/**
 * @swagger
 * /api/quotes:
 *   get:
 *     summary: Récupérer la liste des citations
 *     tags: [Quotes]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *     responses:
 *       200:
 *         description: Liste de citations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quote'
 */

router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const query = category
      ? {
          text: "SELECT * FROM quotes WHERE category=$1",
          values: [category],
        }
      : { text: "SELECT * FROM quotes" };

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/quotes
 */
/**
 * @swagger
 * /api/quotes:
 *   post:
 *     summary: Créer une nouvelle citation
 *     tags: [Quotes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuote'
 *     responses:
 *       201:
 *         description: Citation créée
 */

router.post("/", async (req, res) => {
  try {
    const { text, author, category } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const result = await pool.query(
      "INSERT INTO quotes (text, author, category) VALUES ($1,$2,$3) RETURNING *",
      [text, author, category]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
/** * PUT /api/quotes/:id
 */
/**
 * @swagger
 * /api/quotes/{id}:
 *   put:
 *     summary: Mettre à jour une citation existante
 *     tags: [Quotes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la citation à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuote'
 *     responses:
 *       200:
 *         description: Citation mise à jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quote'
 *       404:
 *         description: Citation non trouvée
 */ 
router.put("/:id", async(req, res) => {
    try {
        const QuoteId = req.params.id;
        const {text, author, category} = req.body;
        const result = await pool.query(
            "UPDATE quotes SET text=$1, author=$2, category=$3 WHERE id=$4 RETURNING *",
            [text, author, category, QuoteId]
        );
        if(result.rows.length === 0){
            return res.status(404).json({message : "Quote not found"})
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({message : "Server Error"})        
    }
})
export default router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Quote:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         text:
 *           type: string
 *         author:
 *           type: string
 *         category:
 *           type: string
 *         created_at:
 *           type: string
 *
 *     CreateQuote:
 *       type: object
 *       required:
 *         - text
 *       properties:
 *         text:
 *           type: string
 *         author:
 *           type: string
 *         category:
 *           type: string
 */
