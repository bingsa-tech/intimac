"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcrypt");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var hashedPassword, canada, quebec, ontario, montreal, sherbrooke, toronto, france, ileDeFrance, paris, udem, uofs, utoronto, sorbonne, programs, _i, programs_1, prog, languages, progData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🌱 Démarrage du Seeding pour le Sprint 2...');
                    // 1. Nettoyage de la base de données
                    return [4 /*yield*/, prisma.programLanguage.deleteMany()];
                case 1:
                    // 1. Nettoyage de la base de données
                    _a.sent();
                    return [4 /*yield*/, prisma.program.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.university.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.city.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.province.deleteMany()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.country.deleteMany()];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prisma.user.deleteMany()];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, bcrypt.hash('AdminPass123!', 10)];
                case 8:
                    hashedPassword = _a.sent();
                    return [4 /*yield*/, prisma.user.create({
                            data: {
                                email: 'admin@test.com',
                                password: hashedPassword,
                                role: client_1.Role.ADMIN,
                            },
                        })];
                case 9:
                    _a.sent();
                    console.log('👤 Admin créé : admin@test.com / AdminPass123!');
                    return [4 /*yield*/, prisma.country.create({
                            data: {
                                name: 'Canada',
                                code: 'CA',
                            },
                        })];
                case 10:
                    canada = _a.sent();
                    return [4 /*yield*/, prisma.province.create({
                            data: { name: 'Québec', countryId: canada.id },
                        })];
                case 11:
                    quebec = _a.sent();
                    return [4 /*yield*/, prisma.province.create({
                            data: { name: 'Ontario', countryId: canada.id },
                        })];
                case 12:
                    ontario = _a.sent();
                    return [4 /*yield*/, prisma.city.create({
                            data: { name: 'Montréal', provinceId: quebec.id },
                        })];
                case 13:
                    montreal = _a.sent();
                    return [4 /*yield*/, prisma.city.create({
                            data: { name: 'Sherbrooke', provinceId: quebec.id },
                        })];
                case 14:
                    sherbrooke = _a.sent();
                    return [4 /*yield*/, prisma.city.create({
                            data: { name: 'Toronto', provinceId: ontario.id },
                        })];
                case 15:
                    toronto = _a.sent();
                    return [4 /*yield*/, prisma.country.create({
                            data: {
                                name: 'France',
                                code: 'FR',
                            },
                        })];
                case 16:
                    france = _a.sent();
                    return [4 /*yield*/, prisma.province.create({
                            data: { name: 'Île-de-France', countryId: france.id },
                        })];
                case 17:
                    ileDeFrance = _a.sent();
                    return [4 /*yield*/, prisma.city.create({
                            data: { name: 'Paris', provinceId: ileDeFrance.id },
                        })];
                case 18:
                    paris = _a.sent();
                    return [4 /*yield*/, prisma.university.create({
                            data: {
                                name: 'Université de Montréal',
                                countryId: canada.id,
                                provinceId: quebec.id,
                                cityId: montreal.id,
                            },
                        })];
                case 19:
                    udem = _a.sent();
                    return [4 /*yield*/, prisma.university.create({
                            data: {
                                name: 'Université de Sherbrooke',
                                countryId: canada.id,
                                provinceId: quebec.id,
                                cityId: sherbrooke.id,
                            },
                        })];
                case 20:
                    uofs = _a.sent();
                    return [4 /*yield*/, prisma.university.create({
                            data: {
                                name: 'University of Toronto',
                                countryId: canada.id,
                                provinceId: ontario.id,
                                cityId: toronto.id,
                            },
                        })];
                case 21:
                    utoronto = _a.sent();
                    return [4 /*yield*/, prisma.university.create({
                            data: {
                                name: 'Sorbonne Université',
                                countryId: france.id,
                                provinceId: ileDeFrance.id,
                                cityId: paris.id,
                            },
                        })];
                case 22:
                    sorbonne = _a.sent();
                    programs = [
                        {
                            title: 'Bacalauréat en Génie Logiciel',
                            degree: client_1.DegreeLevel.BACHELOR,
                            duration: 4,
                            tuition: 4500,
                            minimumGpa: 3.0,
                            description: 'Formation complète en développement logiciel et architecture.',
                            universityId: uofs.id,
                            languages: ['Français'],
                        },
                        {
                            title: 'Maîtrise en Intelligence Artificielle',
                            degree: client_1.DegreeLevel.MASTER,
                            duration: 2,
                            tuition: 12000,
                            minimumGpa: 3.5,
                            description: 'Spécialisation avancée en Deep Learning et Computer Vision.',
                            universityId: udem.id,
                            languages: ['Français', 'Anglais'],
                        },
                        {
                            title: 'Bachelor of Computer Science',
                            degree: client_1.DegreeLevel.BACHELOR,
                            duration: 3,
                            tuition: 28000,
                            minimumGpa: 3.8,
                            description: 'Comprehensive computer science and algorithms program.',
                            universityId: utoronto.id,
                            languages: ['Anglais'],
                        },
                        {
                            title: 'Master en Science des Données',
                            degree: client_1.DegreeLevel.MASTER,
                            duration: 2,
                            tuition: 800,
                            minimumGpa: 3.2,
                            description: 'Formation en analyse de données et statistiques appliquées.',
                            universityId: sorbonne.id,
                            languages: ['Français'],
                        },
                    ];
                    _i = 0, programs_1 = programs;
                    _a.label = 23;
                case 23:
                    if (!(_i < programs_1.length)) return [3 /*break*/, 26];
                    prog = programs_1[_i];
                    languages = prog.languages, progData = __rest(prog, ["languages"]);
                    return [4 /*yield*/, prisma.program.create({
                            data: __assign(__assign({}, progData), { languages: {
                                    create: languages.map(function (lang) { return ({ language: lang }); }),
                                } }),
                        })];
                case 24:
                    _a.sent();
                    _a.label = 25;
                case 25:
                    _i++;
                    return [3 /*break*/, 23];
                case 26:
                    console.log('✅ Base de données initialisée avec succès !');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
