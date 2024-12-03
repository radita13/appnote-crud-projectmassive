import { Router} from "express";
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from "../controller/notesController.js";

const router = Router();

router.post('/notes/create', createNote);
router.get('/notes', getAllNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/update/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;