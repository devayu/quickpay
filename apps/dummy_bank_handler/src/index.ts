import express from "express";

const app = express();

app.use(express.json());

app.listen(3004);

// frontend -> post a with a token to bank -> bank to use that token to create an on ramp transaction
