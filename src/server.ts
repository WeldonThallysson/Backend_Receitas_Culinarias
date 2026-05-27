import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`
========================================
Application started successfully
========================================

Environment : ${process.env.NODE_ENV}
Port        : ${PORT}
URL         : ${process.env.BASE_URL}:${PORT}

========================================
`);
});