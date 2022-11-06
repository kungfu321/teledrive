"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TGSessionAuth = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const teledrive_client_1 = require("teledrive-client");
const Logger_1 = require("teledrive-client/extensions/Logger");
const sessions_1 = require("teledrive-client/sessions");
const Constant_1 = require("../../utils/Constant");
function TGSessionAuth(req, _, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const authkey = (_a = (req.headers.authorization || req.cookies.authorization)) === null || _a === void 0 ? void 0 : _a.replace(/^Bearer\ /gi, '');
        if (!authkey) {
            throw { status: 401, body: { error: 'Auth key is required' } };
        }
        let data;
        try {
            data = (0, jsonwebtoken_1.verify)(authkey, Constant_1.API_JWT_SECRET);
        }
        catch (error) {
            throw { status: 401, body: { error: 'Access token is invalid' } };
        }
        try {
            const session = new sessions_1.StringSession(data.session);
            req.tg = new teledrive_client_1.TelegramClient(session, Constant_1.TG_CREDS.apiId, Constant_1.TG_CREDS.apiHash, Object.assign({ connectionRetries: Constant_1.CONNECTION_RETRIES, useWSS: false }, process.env.ENV === 'production' ? { baseLogger: new teledrive_client_1.Logger(Logger_1.LogLevel.NONE) } : {}));
        }
        catch (error) {
            throw { status: 401, body: { error: 'Invalid key' } };
        }
        return next();
    });
}
exports.TGSessionAuth = TGSessionAuth;
//# sourceMappingURL=TGSessionAuth.js.map