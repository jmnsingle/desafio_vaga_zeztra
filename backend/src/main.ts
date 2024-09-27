import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { routes } from './routes/routes';
import { MongoConnection } from './database/connection';
import { loadDependencies } from './dependecy-injection';
import { worker } from './workers/transaction-worker';

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
new MongoConnection();
loadDependencies();
app.use(express.json());
app.use('/api', routes);
worker.on('completed', (job) => {
  console.log(`Job completed with result ${job.returnvalue}`);
});

worker.on('failed', (job, err) => {
  console.error(`Job failed with error ${err.message}`);
});

app.listen(port, () => console.log('Server running on PORT', port));
