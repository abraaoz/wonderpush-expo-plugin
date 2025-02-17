"use strict";
/**
 * This file is not used
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONESIGNAL_GRADLE = void 0;
exports.ONESIGNAL_GRADLE = `buildscript {
    repositories {
        gradlePluginPortal()
    }
    dependencies {
        classpath 'gradle.plugin.com.onesignal:onesignal-gradle-plugin:[0.12.10, 0.99.99]'
    }
}

apply plugin: 'com.onesignal.androidsdk.onesignal-gradle-plugin'`;
