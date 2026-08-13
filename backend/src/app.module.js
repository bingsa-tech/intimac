"use strict";
import { MatchingsModule } from './matchings/matchings.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ImmigrationModule } from './immigration/immigration.module';
import { ScholarshipModule } from './scholarship/scholarship.module';
import { NewsModule } from './news/news.module';
import { ContactMessageModule } from './contact-message/contact-message.module';
import { AssessmentModule } from './assessment/assessment.module';
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./auth/auth.module");
var prisma_module_1 = require("./prisma/prisma.module");
var users_module_1 = require("./users/users.module");
var profile_module_1 = require("./profile/profile.module");
var universite_module_1 = require("./universite/universite.module");
var programs_module_1 = require("./programs/programs.module");
var matching_module_1 = require("./matching/matching.module");
var immigration_module_1 = require("./steps/immigration/immigration.module");
var subscription_module_1 = require("./subscription/subscription.module");
var applications_module_1 = require("./applications/applications.module");
var documents_module_1 = require("./documents/documents.module");
var countries_module_1 = require("./countries/countries.module");
var notifications_module_1 = require("./notifications/notifications.module");
var messages_module_1 = require("./messages/messages.module");
var dashboard_module_1 = require("./dashboard/dashboard.module");
var admin_module_1 = require("./admin/admin.module");
var analytics_module_1 = require("./analytics/analytics.module");
var prisma_service_1 = require("./prisma/prisma.service");
var province_module_1 = require("./province/province.module");
var city_module_1 = require("./city/city.module");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [auth_module_1.AuthModule, prisma_module_1.PrismaModule, users_module_1.UsersModule, profile_module_1.ProfileModule, universite_module_1.UniversiteModule, programs_module_1.ProgramsModule, matching_module_1.MatchingModule, immigration_module_1.ImmigrationModule, subscription_module_1.SubscriptionModule, applications_module_1.ApplicationsModule, documents_module_1.DocumentsModule, countries_module_1.CountriesModule, notifications_module_1.NotificationsModule, messages_module_1.MessagesModule, dashboard_module_1.DashboardModule, admin_module_1.AdminModule, analytics_module_1.AnalyticsModule, province_module_1.ProvinceModule, city_module_1.CityModule],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService, prisma_service_1.PrismaService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
