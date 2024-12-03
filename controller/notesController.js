import db from '../models/db.js';

// Tambah note baru (create)
export const createNote = (req, res) => {
    const { title, datetime, note } = req.body;

    if (!title || !datetime || !note) {
        const errorMessage = 'Title, datetime, and note are required cannot be null.';
        console.log(({
            success: false,
            message: errorMessage
        }));
        
        return res.status(500).send({
            success: false,
            message: 'Title, datetime, and note are required cannot be null.'
        });
    }

    const formattedDatetime = datetime.length === 10
        ? `${datetime} ${new Date().toTimeString().slice(0, 8)}`
        : datetime;

    const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
    db.query(sql, [title, formattedDatetime, note], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        const successMessage = 'Note created successfully';
        console.log(({
            success: true,
            message: successMessage,
            data: {
                id: result.insertId,
                title: title,
                datetime: formattedDatetime,
                note: note
            }
        }));

        res.status(201).send({
            success: true,
            message: 'Note created successfully',
            data: { id: result.insertId, title, datetime: formattedDatetime, note }
        });
    });
};

// Tampilkan semua notes (read all)
export const getAllNotes = (req, res) => {
    const sql = 'SELECT * FROM notes';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);

        const formattedResults = results.map(note => {
            const formattedDatetime = new Date(note.datetime).toLocaleString('en-CA', {
                timeZone: 'Asia/Jakarta',
                hour12: false
            });

            return { ...note, datetime: formattedDatetime };
        });

        res.send({
            success: true,
            message: 'Notes get successfully',
            data: formattedResults
        });
    });
};

// Tampilkan salah satu note (read one)
export const getNoteById = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM notes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.length === 0) return res.status(404).send({
            success: false,
            message: 'Note get not found'
        });

        const formattedDatetime = new Date(result[0].datetime).toLocaleString('en-CA', {
            timeZone: 'Asia/Jakarta',
            hour12: false
        });

        result[0].datetime = formattedDatetime;

        res.send({
            success: true,
            message: 'Note get successfully',
            data: result[0]
        });
    });
};

// Ubah note (update by id)
export const updateNote = (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;

    const formattedDatetime = datetime.length === 10
        ? `${datetime} ${new Date().toTimeString().slice(0, 8)}`
        : datetime;

    const sql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    db.query(sql, [title, formattedDatetime, note, id], (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(500).send({
                success: false,
                message: 'Note update failed due to invalid ID',
                data: err
            });
        }

        res.send({
            success: true,
            message: 'Note updated successfully',
            data: { id, title, datetime: formattedDatetime, note }
        });
    });
};


// Hapus note (delete by id)
export const deleteNote = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM notes WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (result.affectedRows === 0) {
            return res.status(500).send({
                success: false,
                message: 'Note update failed due to invalid ID',
                data: err
            });
        }

        res.send({
            success: true,
            message: 'Note deleted successfully',
            data: result
        });
    });
};