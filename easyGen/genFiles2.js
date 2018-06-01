const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const decamelize = require('decamelize');
const TextUtils = require('../src/utils/TextUtils');
const config = require('./config');

function gen() {
  const projectPath = createProject();
  genModules(projectPath);
  genComponents(projectPath);
  resetConfigFile(projectPath);
}

function createProject() {
  const project = config.project || {};
  const projectPath = project.path;
  if (!TextUtils.isEmpty(projectPath)) {
    const projectAbsPath = path.resolve(__dirname, '../..', projectPath);
    const COPY_FILES = glob.sync(`${path.resolve(__dirname, '..')}/**/*.*`).concat(glob.sync(`${path.resolve(__dirname, '..')}/**/.*`)).filter(item => {
      return !(/(package-lock|node_modules|\.idea|\.git|\.svn|PagesInfo.json|dist)/g.test(item)) || /(\.gitignore)/g.test(item);
    });
    COPY_FILES.forEach(filePath => {
      const relativePath = path.relative(path.resolve(__dirname, '..'), filePath);
      const targetPath = path.resolve(projectAbsPath, relativePath);
      shell.mkdir('-p', path.dirname(targetPath));
      fs.copyFileSync(filePath, targetPath);
    });
    return projectAbsPath;
  } else {
    return path.resolve(__dirname, '..');
  }
}

function genModules(projectPath) {
  (config.modules || []).forEach(module => {
    let redirectUrl;
    let modulePath = redirectUrl = module['url-path'];
    if (modulePath) {
      const MODULE_TEMPLATE_BASE_PATH = './src/template/module/';
      modulePath = path.resolve(projectPath, 'src/module', modulePath.startsWith('/') ? (modulePath.substr(1)) : modulePath);
      shell.mkdir('-p', modulePath);
      let relativePath = `${path.relative(modulePath, `${projectPath}/src`)}/`.replace(/\\/g, '/');
      writeModuleFile(`${MODULE_TEMPLATE_BASE_PATH}module.js`, modulePath, {
        '../../lib/BaseModule': `${relativePath}lib/BaseModule`
      }, 'js');
      writeModuleFile(`${MODULE_TEMPLATE_BASE_PATH}module.scss`, modulePath, {
        '../../assets/scss/base': `${relativePath}assets/scss/base`
      }, 'scss');
      writeModuleFile(`${MODULE_TEMPLATE_BASE_PATH}module.vue`, modulePath, {
        '<section>': `<section class="main-layout ${genFileClass(redirectUrl)}">`
      }, 'vue');
      writeFileForTemplate(`${MODULE_TEMPLATE_BASE_PATH}config.json`, modulePath, {
        'redirectUrl': `${redirectUrl.startsWith('/') ? redirectUrl : `/${redirectUrl}`}`,
        'pageTitle': `${module['page-title']}`
      }, 'config', 'json');
    }
  });
}

function writeModuleFile(tempFile, targetPath, replaceRegexs, extName) {
  writeFileForTemplate(tempFile, targetPath, replaceRegexs, 'module', extName);
}

function genComponents(projectPath) {
  (config.components || []).forEach(component => {
    let componentPath = component;
    if (componentPath) {
      const COMPONENT_TEMPLATE_BASE_PATH = './src/template/component/';
      componentPath = path.resolve(projectPath, 'src/components', componentPath.startsWith('/') ? (componentPath.substr(1)) : componentPath);
      shell.mkdir('-p', componentPath);
      let relativePath = `${path.relative(componentPath, `${projectPath}/src`)}/`.replace(/\\/g, '/');
      writeComponentFile(`${COMPONENT_TEMPLATE_BASE_PATH}component.js`, componentPath, {
        '../../lib/BaseModule': `${relativePath}lib/BaseModule`
      }, 'js');
      writeComponentFile(`${COMPONENT_TEMPLATE_BASE_PATH}component.vue`, componentPath, {
        '<section>': `<section class="component-layout ${genFileClass(component)}">`,
        '../../assets/scss/base': `${relativePath}assets/scss/base`
      }, 'vue');
      let content = fs.readFileSync(path.resolve(__dirname, '..', `${COMPONENT_TEMPLATE_BASE_PATH}index.js`), 'utf8');
      writeFile(`${componentPath}/index`, content, 'js');
    }
  });
}

function writeComponentFile(tempFile, targetPath, replaceRegexs, extName) {
  writeFileForTemplate(tempFile, targetPath, replaceRegexs, 'component', extName);
}

function writeFileForTemplate(tempFile, targetPath, replaceRegexs, targetFileName, extName) {
  let content = fs.readFileSync(path.resolve(__dirname, '..', tempFile), 'utf8');
  writeFile(`${targetPath}/${targetFileName}`, replaceContent(content, replaceRegexs), extName);
}

function resetConfigFile(projectPath) {
  writeFile(`${projectPath}/easyGen/config`, `{
  "modules": [
    {
      "page-title": "",
      "url-path": ""
    }
  ],
  "components": [""],
  "project": {
    "path": "",
    "name": ""
  }
}`, 'json');
}

function replaceContent(content, replaceRegexs) {
  Object.keys(replaceRegexs).forEach(key => {
    content = content.replace(key, replaceRegexs[key]);
  });
  return content;
}

function writeFile(pagePath, fileContent, extName) {
  fs.writeFileSync(path.resolve(__dirname, `${pagePath}.${extName}`), fileContent, 'utf8');
}

function genFileClass(filePath) {
  let splitPath = [];
  filePath.split('/').filter(item => {
    return !!item;
  }).forEach(item => {
    splitPath.push(decamelize(item, '-'));
  });
  let result = splitPath.join('-');
  const key = '-layout';
  return `${result}${result.endsWith(key) ? '' : key}`;
}

gen();
