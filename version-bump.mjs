import { readFileSync, writeFileSync } from "fs";

const targetVersion = process.env.npm_package_version;

// 从manifest.json中读取minAppVersion并将版本号提升到目标版本
let manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const { minAppVersion } = manifest;
manifest.version = targetVersion;
writeFileSync("manifest.json", JSON.stringify(manifest, null, "\t"));

// 更新versions.json中的目标版本和manifest.json中的minAppVersion
let versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = minAppVersion;
writeFileSync("versions.json", JSON.stringify(versions, null, "\t"));
