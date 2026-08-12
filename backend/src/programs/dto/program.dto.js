"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProgramDto = exports.FilterProgramsDto = exports.CreateProgramDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var client_1 = require("@prisma/client");
var swagger_1 = require("@nestjs/swagger");
var swagger_2 = require("@nestjs/swagger");
var CreateProgramDto = function () {
    var _a;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _degree_decorators;
    var _degree_initializers = [];
    var _degree_extraInitializers = [];
    var _duration_decorators;
    var _duration_initializers = [];
    var _duration_extraInitializers = [];
    var _tuition_decorators;
    var _tuition_initializers = [];
    var _tuition_extraInitializers = [];
    var _minimumGpa_decorators;
    var _minimumGpa_initializers = [];
    var _minimumGpa_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _universityId_decorators;
    var _universityId_initializers = [];
    var _universityId_extraInitializers = [];
    var _languages_decorators;
    var _languages_initializers = [];
    var _languages_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProgramDto() {
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.degree = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _degree_initializers, void 0));
                this.duration = (__runInitializers(this, _degree_extraInitializers), __runInitializers(this, _duration_initializers, void 0));
                this.tuition = (__runInitializers(this, _duration_extraInitializers), __runInitializers(this, _tuition_initializers, void 0));
                this.minimumGpa = (__runInitializers(this, _tuition_extraInitializers), __runInitializers(this, _minimumGpa_initializers, void 0));
                this.description = (__runInitializers(this, _minimumGpa_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.universityId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _universityId_initializers, void 0));
                // 👈 AJOUT ICI : 'languages' appartient aussi à CreateProgramDto
                this.languages = (__runInitializers(this, _universityId_extraInitializers), __runInitializers(this, _languages_initializers, void 0));
                __runInitializers(this, _languages_extraInitializers);
            }
            return CreateProgramDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, swagger_2.ApiProperty)({ example: 'Master en Informatique' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _degree_decorators = [(0, swagger_2.ApiProperty)({ enum: client_1.DegreeLevel, example: client_1.DegreeLevel.MASTER }), (0, class_validator_1.IsEnum)(client_1.DegreeLevel)];
            _duration_decorators = [(0, swagger_2.ApiProperty)({ example: 2, description: 'Durée en années ou semestres' }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _tuition_decorators = [(0, swagger_2.ApiProperty)({ example: 5000, description: 'Frais de scolarité' }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _minimumGpa_decorators = [(0, swagger_2.ApiPropertyOptional)({ example: 3.2, description: 'GPA / Moyenne minimale requise' }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, swagger_2.ApiPropertyOptional)({ example: 'Formation axée sur l’IA et le génie logiciel.' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _universityId_decorators = [(0, swagger_2.ApiProperty)({ example: 'cm3... ID de l’université' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _languages_decorators = [(0, swagger_2.ApiPropertyOptional)({ example: ['Français', 'Anglais'], description: 'Langues d’enseignement' }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _degree_decorators, { kind: "field", name: "degree", static: false, private: false, access: { has: function (obj) { return "degree" in obj; }, get: function (obj) { return obj.degree; }, set: function (obj, value) { obj.degree = value; } }, metadata: _metadata }, _degree_initializers, _degree_extraInitializers);
            __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: function (obj) { return "duration" in obj; }, get: function (obj) { return obj.duration; }, set: function (obj, value) { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _duration_extraInitializers);
            __esDecorate(null, null, _tuition_decorators, { kind: "field", name: "tuition", static: false, private: false, access: { has: function (obj) { return "tuition" in obj; }, get: function (obj) { return obj.tuition; }, set: function (obj, value) { obj.tuition = value; } }, metadata: _metadata }, _tuition_initializers, _tuition_extraInitializers);
            __esDecorate(null, null, _minimumGpa_decorators, { kind: "field", name: "minimumGpa", static: false, private: false, access: { has: function (obj) { return "minimumGpa" in obj; }, get: function (obj) { return obj.minimumGpa; }, set: function (obj, value) { obj.minimumGpa = value; } }, metadata: _metadata }, _minimumGpa_initializers, _minimumGpa_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _universityId_decorators, { kind: "field", name: "universityId", static: false, private: false, access: { has: function (obj) { return "universityId" in obj; }, get: function (obj) { return obj.universityId; }, set: function (obj, value) { obj.universityId = value; } }, metadata: _metadata }, _universityId_initializers, _universityId_extraInitializers);
            __esDecorate(null, null, _languages_decorators, { kind: "field", name: "languages", static: false, private: false, access: { has: function (obj) { return "languages" in obj; }, get: function (obj) { return obj.languages; }, set: function (obj, value) { obj.languages = value; } }, metadata: _metadata }, _languages_initializers, _languages_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProgramDto = CreateProgramDto;
// DTO pour capturer les paramètres de recherche (Query Params)
var FilterProgramsDto = function () {
    var _a;
    var _country_decorators;
    var _country_initializers = [];
    var _country_extraInitializers = [];
    var _degree_decorators;
    var _degree_initializers = [];
    var _degree_extraInitializers = [];
    var _maxTuition_decorators;
    var _maxTuition_initializers = [];
    var _maxTuition_extraInitializers = [];
    var _minGpa_decorators;
    var _minGpa_initializers = [];
    var _minGpa_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _language_decorators;
    var _language_initializers = [];
    var _language_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FilterProgramsDto() {
                this.country = __runInitializers(this, _country_initializers, void 0);
                this.degree = (__runInitializers(this, _country_extraInitializers), __runInitializers(this, _degree_initializers, void 0));
                this.maxTuition = (__runInitializers(this, _degree_extraInitializers), __runInitializers(this, _maxTuition_initializers, void 0));
                this.minGpa = (__runInitializers(this, _maxTuition_extraInitializers), __runInitializers(this, _minGpa_initializers, void 0));
                this.search = (__runInitializers(this, _minGpa_extraInitializers), __runInitializers(this, _search_initializers, void 0));
                this.language = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _language_initializers, void 0));
                __runInitializers(this, _language_extraInitializers);
            }
            return FilterProgramsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _country_decorators = [(0, swagger_2.ApiPropertyOptional)({ description: 'Filtrer par nom de pays' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _degree_decorators = [(0, swagger_2.ApiPropertyOptional)({ enum: client_1.DegreeLevel }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(client_1.DegreeLevel)];
            _maxTuition_decorators = [(0, swagger_2.ApiPropertyOptional)({ description: 'Frais de scolarité maximum' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)()];
            _minGpa_decorators = [(0, swagger_2.ApiPropertyOptional)({ description: 'GPA minimal' }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)()];
            _search_decorators = [(0, swagger_2.ApiPropertyOptional)({ description: 'Recherche par mot-clé dans le titre' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _language_decorators = [(0, swagger_2.ApiPropertyOptional)({ example: 'Français', description: 'Langue d’enseignement' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _country_decorators, { kind: "field", name: "country", static: false, private: false, access: { has: function (obj) { return "country" in obj; }, get: function (obj) { return obj.country; }, set: function (obj, value) { obj.country = value; } }, metadata: _metadata }, _country_initializers, _country_extraInitializers);
            __esDecorate(null, null, _degree_decorators, { kind: "field", name: "degree", static: false, private: false, access: { has: function (obj) { return "degree" in obj; }, get: function (obj) { return obj.degree; }, set: function (obj, value) { obj.degree = value; } }, metadata: _metadata }, _degree_initializers, _degree_extraInitializers);
            __esDecorate(null, null, _maxTuition_decorators, { kind: "field", name: "maxTuition", static: false, private: false, access: { has: function (obj) { return "maxTuition" in obj; }, get: function (obj) { return obj.maxTuition; }, set: function (obj, value) { obj.maxTuition = value; } }, metadata: _metadata }, _maxTuition_initializers, _maxTuition_extraInitializers);
            __esDecorate(null, null, _minGpa_decorators, { kind: "field", name: "minGpa", static: false, private: false, access: { has: function (obj) { return "minGpa" in obj; }, get: function (obj) { return obj.minGpa; }, set: function (obj, value) { obj.minGpa = value; } }, metadata: _metadata }, _minGpa_initializers, _minGpa_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _language_decorators, { kind: "field", name: "language", static: false, private: false, access: { has: function (obj) { return "language" in obj; }, get: function (obj) { return obj.language; }, set: function (obj, value) { obj.language = value; } }, metadata: _metadata }, _language_initializers, _language_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FilterProgramsDto = FilterProgramsDto;
// export class UpdateProgramDto
var UpdateProgramDto = /** @class */ (function (_super) {
    __extends(UpdateProgramDto, _super);
    function UpdateProgramDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateProgramDto;
}((0, swagger_1.PartialType)(CreateProgramDto)));
exports.UpdateProgramDto = UpdateProgramDto;
