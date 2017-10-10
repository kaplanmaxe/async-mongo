'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require('mongodb');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: 'connect',

    /**
     * Connects to database
     *
     * @param {string} url
     * @param {object} options
     * @param {string} collection
     */
    value: function connect(url, options, collection) {
      return new Promise(function (resolve, reject) {
        _mongodb.MongoClient.connect(url, options, function (err, database) {
          if (err) {
            reject('Error connecting to db: ' + err);
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

  }, {
    key: 'find',
    value: function find(db, data) {
      return new Promise(function (fulfill, reject) {
        db.find(data).toArray(function (err, docs) {
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

  }, {
    key: 'findOne',
    value: function findOne(db, data) {
      return new Promise(function (fulfill, reject) {
        db.findOne(data, function (err, docs) {
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

  }, {
    key: 'findAndModify',
    value: function findAndModify(db, find, replace) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var sort = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

      return new Promise(function (fulfill, reject) {
        db.findAndModify(find, sort, replace, options, function (err, result) {
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

  }, {
    key: 'insert',
    value: function insert(db, data) {
      return new Promise(function (fulfill, reject) {
        db.insert(data, function (error, result) {
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

  }, {
    key: 'remove',
    value: function remove(db, data) {
      return new Promise(function (fulfill, reject) {
        db.remove(data, function (err, result) {
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

  }, {
    key: 'count',
    value: function count(db) {
      return new Promise(function (fulfill, reject) {
        db.count(function (error, result) {
          if (!result || error) {
            reject(error);
          } else {
            fulfill(result);
          }
        });
      });
    }
  }]);

  return _class;
}();

exports.default = _class;