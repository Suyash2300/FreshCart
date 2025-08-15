import express from "express";
import {
  createContact,
  getContacts,
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/create", createContact);
router.get("/", getContacts);

export default router; // export as default
