app.post('/save_reservation', (req, res) => {
    const { name, email, phone, date, time, tablesno, msg } = req.body;

    // Insert the booking details into the BookTable SQL table
    const sql = 'INSERT INTO BookTable (name, email, phone, date, time, tables_no, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, email, phone, date, time, tablesno, msg], (err, result) => {
        if (err) throw err;
        console.log('Table booked successfully!');
        res.redirect('/home'); // Redirect to the homepage or a confirmation page
    });
});