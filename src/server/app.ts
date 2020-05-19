import Express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Counter from '../client/components/Counter';
import html from '../client/html';

dotenv.config();

const app = Express();

/* Configuration */
app.use(Express.json());
app.use(cors());
app.use(helmet());

//Serve static files
app.use('/static', Express.static('static'))

app.get('/', (req, res) => {
  const body = renderToString(React.createElement(Counter));
  res.send(
    html({
      body
    })
  );
});


module.exports = app;