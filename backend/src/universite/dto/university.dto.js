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
exports.UpdateUniversityDto = exports.CreateUniversityDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var CreateUniversityDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    var _website_decorators;
    var _website_initializers = [];
    var _website_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _countryId_decorators;
    var _countryId_initializers = [];
    var _countryId_extraInitializers = [];
    var _provinceId_decorators;
    var _provinceId_initializers = [];
    var _provinceId_extraInitializers = [];
    var _cityId_decorators;
    var _cityId_initializers = [];
    var _cityId_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateUniversityDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.code = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _code_initializers, void 0));
                this.website = (__runInitializers(this, _code_extraInitializers), __runInitializers(this, _website_initializers, void 0));
                this.description = (__runInitializers(this, _website_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.countryId = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _countryId_initializers, void 0));
                this.provinceId = (__runInitializers(this, _countryId_extraInitializers), __runInitializers(this, _provinceId_initializers, void 0));
                this.cityId = (__runInitializers(this, _provinceId_extraInitializers), __runInitializers(this, _cityId_initializers, void 0));
                __runInitializers(this, _cityId_extraInitializers);
            }
            return CreateUniversityDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiProperty)({ example: 'Université de Sherbrooke' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _code_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'UdeS' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _website_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'https://www.usherbrooke.ca' }), (0, class_validator_1.IsUrl)(), (0, class_validator_1.IsOptional)()];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({ example: 'Description de l’université...' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _countryId_decorators = [(0, swagger_1.ApiProperty)({ example: 'cms22qv1v0000l7sv80876251' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _provinceId_decorators = [(0, swagger_1.ApiProperty)({ example: 'cms4jpx3j0001l75gj6knoqyz' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _cityId_decorators = [(0, swagger_1.ApiProperty)({ example: 'cms4ruj3z001dl75gbpkr7g89' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            __esDecorate(null, null, _website_decorators, { kind: "field", name: "website", static: false, private: false, access: { has: function (obj) { return "website" in obj; }, get: function (obj) { return obj.website; }, set: function (obj, value) { obj.website = value; } }, metadata: _metadata }, _website_initializers, _website_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _countryId_decorators, { kind: "field", name: "countryId", static: false, private: false, access: { has: function (obj) { return "countryId" in obj; }, get: function (obj) { return obj.countryId; }, set: function (obj, value) { obj.countryId = value; } }, metadata: _metadata }, _countryId_initializers, _countryId_extraInitializers);
            __esDecorate(null, null, _provinceId_decorators, { kind: "field", name: "provinceId", static: false, private: false, access: { has: function (obj) { return "provinceId" in obj; }, get: function (obj) { return obj.provinceId; }, set: function (obj, value) { obj.provinceId = value; } }, metadata: _metadata }, _provinceId_initializers, _provinceId_extraInitializers);
            __esDecorate(null, null, _cityId_decorators, { kind: "field", name: "cityId", static: false, private: false, access: { has: function (obj) { return "cityId" in obj; }, get: function (obj) { return obj.cityId; }, set: function (obj, value) { obj.cityId = value; } }, metadata: _metadata }, _cityId_initializers, _cityId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateUniversityDto = CreateUniversityDto;
// 👈 Ajoute cette classe en bas du fichier :
var UpdateUniversityDto = /** @class */ (function (_super) {
    __extends(UpdateUniversityDto, _super);
    function UpdateUniversityDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateUniversityDto;
}((0, swagger_1.PartialType)(CreateUniversityDto)));
exports.UpdateUniversityDto = UpdateUniversityDto;
