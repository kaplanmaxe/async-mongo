import { MongoClient } from 'mongodb';

export default class {
  /**
   * Connects to database
   *
   * @param {string} url
   * @param {object} options
   * @param {string} collection
   */
  static connect(url, options, collection) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(url, options, (err, database) => {
        if (err) {
          reject(`Error connecting to db: ${err}`);
        } else {
          resolve(database.collection(collection));
        }
      });
    });
  }

  /**
  * Finds records from a mongo collection
  *
  * @param {object} db
  * @param {object} data
  * @return {Promise}
  */
  static find(db, data) {
    return new Promise((fulfill, reject) => {
      db.find(data).toArray((err, docs) => {
        if (!docs || err) {
          reject(err);
        } else {
          fulfill(docs);
        }
      });
    });
  }

  /**
   * Finds one record from mongo
   *
   * @param {object} db
   * @param {object} data
   * @return {Promise}
   */
  static findOne(db, data) {
    return new Promise((fulfill, reject) => {
      db.findOne(data, (err, docs) => {
        if (!docs || err) {
          reject('No records found.');
        } else {
          fulfill(docs);
        }
      });
    });
  }

  /**
   * Find and modify method for mongo
   *
   * @param {object} db
   * @param {object} find
   * @param {object} replace
   * @param {object} options
   * @param {array} sort
   * @return {Promise}
   */
  static findAndModify(db, find, replace, options = {}, sort = []) {
    return new Promise((fulfill, reject) => {
      db.findAndModify(find, sort, replace, options, (err, result) => {
        if (!result || err || result.value === null) {
          reject(err || new Error('No record found.'));
        } else {
          fulfill(result);
        }
      });
    });
  }

  /**
   * Inserts records into db
   *
   * @param {object} db
   * @param {object} data
   * @return {Promise}
   */
  static insert(db, data) {
    return new Promise((fulfill, reject) => {
      db.insert(data, (error, result) => {
        if (!result || error) {
          reject(error);
        } else {
          fulfill(result);
        }
      });
    });
  }

  /**
   * Removes a record from a collection
   *
   * @param {object} db
   * @param {object} data
   */
  static remove(db, data) {
    return new Promise((fulfill, reject) => {
      db.remove(data, (err, result) => {
        if (!result || err) {
          reject(err);
        } else {
          fulfill(result);
        }
      });
    });
  }

  /**
   * Counts how many records in collection
   *
   * @param {object} db
   */
  static count(db) {
    return new Promise((fulfill, reject) => {
      db.count((error, result) => {
        if (!result || error) {
          reject(error);
        } else {
          fulfill(result);
        }
      });
    });
  }
}
