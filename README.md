# async-mongo

Asynchronous wrapper for mongodb.

Note: this is package is WIP.

### Usage

```javascript
import Mongo from 'async-mongo';

Mongo.connect('mongodb://localhost:27017/test', {}, (err, database) => {
  return db.find({ testing: true});
})
.then(res => {
  return db.insert({ testing: true})
}, err => {
  console.log('Docs not found');
})
.then(res => {
  console.log('Docs inserted');
});
```
