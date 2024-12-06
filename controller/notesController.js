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
        if (err) {
            console.error('Error fetching notes:', err);
            return res.status(500).send({
                success: false,
                message: 'Failed to fetch notes',
                error: err.message
            });
        };

        const formattedResults = results.map(note => {
            const formattedDatetime = new Date(note.datetime).toLocaleString('en-CA', {
                timeZone: 'Asia/Jakarta',
                hour12: false
            });

            return { ...note, datetime: formattedDatetime };
        });

        console.log({
            success: true,
            message: 'Notes fetched successfully',
            data: formattedResults
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
        if (err) {
            console.error('Error fetching note:', err);
            return res.status(500).send({
                success: false,
                message: 'Failed to fetch note',
                error: err.message
            });
        }

        if (result.length === 0) {
            console.error({
                success: false,
                message: 'Note not found',
                data: { "ID not found": id }
            });
            return res.status(404).send({
                success: false,
                message: 'Note not found',
                data: { "ID not found": id }
            });
        }

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

    // Validasi datetime harus dalam format lengkap YYYY-MM-DD
    const datetimeRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!datetimeRegex.test(datetime)) {
        console.error({
            success: false,
            message: 'Invalid datetime format. Please provide the full date in the format YYYY-MM-DD.',
            data: { datetime }
        });
        return res.status(400).send({
            success: false,
            message: 'Invalid datetime format. Please provide the full date in the format YYYY-MM-DD.',
            data: { datetime }
        });
    }

    const formattedDatetime = `${datetime} ${new Date().toTimeString().slice(0, 8)}`;

    // Query untuk mendapatkan note sebelumnya
    const selectSql = 'SELECT note FROM notes WHERE id = ?';
    db.query(selectSql, [id], (selectErr, selectResult) => {
        if (selectErr) {
            console.error({
                success: false,
                message: 'Failed to fetch existing note',
                error: selectErr
            });
            return res.status(500).send({
                success: false,
                message: 'Failed to fetch existing note',
                error: selectErr
            });
        }

        if (selectResult.length === 0) {
            console.error({
                success: false,
                message: 'Note not found',
                data: { "ID not found": id }
            });
            return res.status(404).send({
                success: false,
                message: 'Note not found',
                data: { "ID not found": id }
            });
        }

        const existingNote = selectResult[0].note;
        const updatedNote = note || existingNote;

        // Query untuk mengupdate note
        const updateSql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
        db.query(updateSql, [title, formattedDatetime, updatedNote, id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error({
                    success: false,
                    message: 'Note update failed',
                    error: updateErr
                });
                return res.status(500).send({
                    success: false,
                    message: 'Note update failed',
                    error: updateErr
                });
            }

            if (updateResult.affectedRows === 0) {
                console.error({
                    success: false,
                    message: 'Note update failed due to invalid ID',
                    data: { id }
                });
                return res.status(404).send({
                    success: false,
                    message: 'Note update failed due to invalid ID',
                    data: { id }
                });
            }

            console.log({
                success: true,
                message: 'Note updated successfully',
                data: { id, title, datetime: formattedDatetime, note: updatedNote }
            });

            res.send({
                success: true,
                message: 'Note updated successfully',
                data: { id, title, datetime: formattedDatetime, note: updatedNote }
            });
        });
    });
};

// Hapus note (delete by id)
export const deleteNote = (req, res) => {
    const { id } = req.params;

    // Query untuk mendapatkan note sebelumnya
    const selectSql = 'SELECT note FROM notes WHERE id = ?';
    db.query(selectSql, [id], (selectErr, selectResult) => {
        if (selectErr) {
            console.error({
                success: false,
                message: 'Failed to delete existing note',
                error: selectErr
            });
            return res.status(500).send({
                success: false,
                message: 'Failed to delete existing note',
                error: selectErr
            });
        }

        if (selectResult.length === 0) {
            console.error({
                success: false,
                message: 'Note not found',
                data: { "ID not found": id }
            });
            return res.status(404).send({
                success: false,
                message: 'Note not found',
                data: { "ID not found": id }
            });
        }
    });

    // Query untuk menghapus note
    const deleteSql = 'DELETE FROM notes WHERE id = ?';
    db.query(deleteSql, [id], (deleteErr, deleteResult) => {
        if (deleteErr) {
            console.error({
                success: false,
                message: 'Failed to delete the note',
                error: deleteErr
            });
            return res.status(500).send({
                success: false,
                message: 'Failed to delete the note',
                error: deleteErr
            });
        }

        console.log({
            success: true,
            message: 'Note deleted successfully',
            data: deleteResult
        });

        res.send({
            success: true,
            message: 'Note deleted successfully',
            data: deleteResult
        });
    });
};