// createing middleware in node js task interviwe Question in app,js
      
// Create a middleware in /login post request
// Send email and password in this request
// In middleware check if email value is equal to test@gmail.com and password is equal to 123456
// If validation is passed in middleware send Authentication successful! otherwise send failed
app.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if (email === 'test@gmail.com' && password === '123456') {
        next();
    } else {
        res.status(401).send('Authentication failed');
    }
}, (req, res) => {
    res.send('Authentication successful!');
});