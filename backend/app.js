import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';


const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  if (orderData === null || orderData.items === null || orderData.items.length === 0) {
    return res
      .status(400)
      .json({ message: 'Missing data.' });
  }

  if (
    orderData.customer.email === null ||
    !orderData.customer.email.includes('@') ||
    orderData.customer.name === null ||
    orderData.customer.name.trim() === '' ||
    orderData.customer.street === null ||
    orderData.customer.street.trim() === '' ||
    orderData.customer['postal-code'] === null ||
    orderData.customer['postal-code'].trim() === '' ||
    orderData.customer.city === null ||
    orderData.customer.city.trim() === ''
  ) {
    return res.status(400).json({
      message:
        'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);


/**
 * 
 * the first thing to connect my project to github
 * 1. create a repo in github
 * 2. type in "git init"
 * 3. see if it is connected, if not, try "git remote add origin "https://github.com/TedGC/projectname.git""
 * 4. if there is no login has been done, do "git config user.name "TedGC "
 * 5. do the same for the password "git config user.email "rhkdktn2056@gmail.com"
 * 6. type in "git remote- v"
 * 7. check if it is connected, and do "git push -u origin main "
 * 8. if git is running crazy and configured in the wrong way, within the file selected for the project
 * 9. do "rm -rf git "
 * 
 * 
 * 
 * 
 */