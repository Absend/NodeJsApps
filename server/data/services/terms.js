/* globals require module Promise */
"use strict";

const async = require("async");

let Term = require("mongoose").model("Term");

module.exports = {
    getAllTerms() {
        return new Promise((resolve, reject) => {
            Term.find((err, terms) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(terms);
            });
        });
    },
    getTermsByTag(tag) {
        return new Promise((resolve, reject) => {
            Term.find({ tag: tag }).sort({ title: 1 }).exec((err, terms) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(terms);
            });
        });
    },
    getTermsByTitle(title) {
        return new Promise((resolve, reject) => {
            Term.find({ title: title }, (err, terms) => {
                if (err) {
                    return reject(err);
                }

                resolve(terms);
            });
        });
    },
    deleteTerm(termTitle, callback) {
        Term.update({ title: termTitle }, { $set: { tag: "deprecated" } }, callback);
    },
    createTerm(newTerm, callback) {
        Term.create(newTerm, callback);
    }
}
