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
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
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
exports.ProgramsService = void 0;
var common_1 = require("@nestjs/common");
var ProgramsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProgramsService = _classThis = /** @class */ (function () {
        function ProgramsService_1(prisma) {
            this.prisma = prisma;
        }
        ProgramsService_1.prototype.create = function (createProgramDto) {
            return __awaiter(this, void 0, void 0, function () {
                var languages, programData;
                return __generator(this, function (_a) {
                    languages = createProgramDto.languages, programData = __rest(createProgramDto, ["languages"]);
                    return [2 /*return*/, this.prisma.program.create({
                            data: __assign(__assign({}, programData), { 
                                // 👈 2. Mapper la relation Prisma pour les langues
                                languages: languages
                                    ? {
                                        create: languages.map(function (lang) { return ({ language: lang }); }),
                                    }
                                    : undefined }),
                            include: {
                                languages: true,
                                university: true,
                            },
                        })];
                });
            });
        };
        ProgramsService_1.prototype.findAll = function (filters) {
            return __awaiter(this, void 0, void 0, function () {
                var country, degree, maxTuition, minGpa, search, language, where;
                return __generator(this, function (_a) {
                    country = filters.country, degree = filters.degree, maxTuition = filters.maxTuition, minGpa = filters.minGpa, search = filters.search, language = filters.language;
                    where = {};
                    if (search) {
                        where.OR = [
                            { title: { contains: search, mode: 'insensitive' } },
                            { description: { contains: search, mode: 'insensitive' } },
                        ];
                    }
                    if (degree)
                        where.degree = degree;
                    if (maxTuition !== undefined)
                        where.tuition = { lte: maxTuition };
                    if (minGpa !== undefined)
                        where.minimumGpa = { gte: minGpa };
                    if (country) {
                        where.university = {
                            country: {
                                name: { contains: country, mode: 'insensitive' },
                            },
                        };
                    }
                    if (language) {
                        where.languages = {
                            some: {
                                language: { equals: language, mode: 'insensitive' },
                            },
                        };
                    }
                    return [2 /*return*/, this.prisma.program.findMany({
                            where: where,
                            include: {
                                university: {
                                    include: { country: true, province: true, city: true },
                                },
                                languages: true,
                            },
                        })];
                });
            });
        };
        ProgramsService_1.prototype.findOne = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var program;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.program.findUnique({
                                where: { id: id },
                                include: {
                                    university: {
                                        include: { country: true, province: true, city: true },
                                    },
                                    languages: true,
                                },
                            })];
                        case 1:
                            program = _a.sent();
                            if (!program) {
                                throw new common_1.NotFoundException("Le programme avec l'ID ".concat(id, " n'existe pas."));
                            }
                            return [2 /*return*/, program];
                    }
                });
            });
        };
        ProgramsService_1.prototype.update = function (id, updateProgramDto) {
            return __awaiter(this, void 0, void 0, function () {
                var languages, programData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            _a.sent();
                            languages = updateProgramDto.languages, programData = __rest(updateProgramDto, ["languages"]);
                            return [2 /*return*/, this.prisma.program.update({
                                    where: { id: id },
                                    data: __assign(__assign({}, programData), (languages && {
                                        languages: {
                                            deleteMany: {},
                                            create: languages.map(function (lang) { return ({ language: lang }); }),
                                        },
                                    })),
                                    include: {
                                        university: true,
                                        languages: true,
                                    },
                                })];
                    }
                });
            });
        };
        ProgramsService_1.prototype.remove = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findOne(id)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.program.delete({
                                    where: { id: id },
                                })];
                    }
                });
            });
        };
        return ProgramsService_1;
    }());
    __setFunctionName(_classThis, "ProgramsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProgramsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProgramsService = _classThis;
}();
exports.ProgramsService = ProgramsService;
