// Hirameku is a cloud-native, vendor-agnostic, serverless application for
// studying flashcards with support for localization and accessibility.
// Copyright (C) 2023 Jon Nicholson
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const conn = new Mongo();
const db = conn.getDB("identityDB");

// authenticationEvents
db.createCollection("authenticationEvents");
db.authenticationEvents.createIndex({ "hash": 1 });
db.authenticationEvents.createIndex({ "user_id": 1 });

// users
db.createCollection("users");
db.users.createIndex({ "emailAddress": 1 }, { unique: true });
db.users.createIndex({ "persistentTokens.client_id": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });

// verifications
db.createCollection("verifications");
db.verifications.createIndex({ "emailAddress": 1 });
db.verifications.createIndex({ "user_id": 1 });
