const { startKafkaConsumer } = require('./connectors/kafka');
const express = require('express');

const app = express();
const cors = require('cors');
//security dependencies
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(xss());
// If request doesn't match any of the above routes then return 404
app.use((req, res, next) => {
    return res.status(404).send();
  });
  
  // Create HTTP Server and Listen for Requests
  app.listen(5010, async (req, res) => {
    // Start Kafka consumer
    await startKafkaConsumer();
  });
  