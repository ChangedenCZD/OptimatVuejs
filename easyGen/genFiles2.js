const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
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
  console.log(projectPath, TextUtils.isEmpty(projectPath));
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
      modulePath = path.resolve(projectPath, 'src/module', modulePath.startsWith('/') ? (modulePath.substr(1)) : modulePath);
      shell.mkdir('-p', modulePath);
      let relativePath = `${path.relative(modulePath, `${projectPath}/src`)}/`.replace(/\\/g, '/');
      writeModuleFile('./src/template/module/module.js', modulePath, {
        '../../lib/BaseModule': `${relativePath}lib/BaseModule`
      }, 'js');
      writeModuleFile('./src/template/module/module.scss', modulePath, {
        '../../assets/scss/base': `${relativePath}assets/scss/base`
      }, 'scss');
      writeModuleFile('./src/template/module/module.vue', modulePath, {
        '<section>': `<section class="main-layout ${redirectUrl.split('/').filter(item => {
          return !!item;
        }).join('-')}-layout">`
      }, 'vue');
      writeModuleFile('./src/template/module/config.json', modulePath, {
        'redirectUrl': `${redirectUrl}`,
        'pageTitle': `${module['page-title']}`
      }, 'json');
    }
  });
}

function writeModuleFile(tempFile, targetPath, replaceRegexs, extName) {
  let content = fs.readFileSync(path.resolve(__dirname, '..', tempFile), 'utf8');
  Object.keys(replaceRegexs).forEach(key => {
    content = content.replace(key, replaceRegexs[key]);
  });
  writeFile(`${targetPath}/module`, content, extName);
}

function genComponents(projectPath) {
  (config.components || []).forEach(component => {
    let componentPath = component;
    if (componentPath) {
      componentPath = path.resolve(projectPath, 'src/components', componentPath.startsWith('/') ? (componentPath.substr(1)) : componentPath);
      shell.mkdir('-p', componentPath);
      let relativePath = `${path.relative(componentPath, `${projectPath}/src`)}/`.replace(/\\/g, '/');
      writeComponentFile('./src/template/component/component.js', componentPath, {
        '../../lib/BaseModule': `${relativePath}lib/BaseModule`
      }, 'js');
      writeComponentFile('./src/template/component/component.vue', componentPath, {
        '<section>': `<section class="component-layout ${component.split('/').filter(item => {
          return !!item;
        }).join('-')}-layout">`,
        '../../assets/scss/base': `${relativePath}assets/scss/base`
      }, 'vue');
      let content = fs.readFileSync(path.resolve(__dirname, '..', './src/template/component/index.js'), 'utf8');
      writeFile(`${componentPath}/index`, content, 'js');
    }
  });
}

function writeComponentFile(tempFile, targetPath, replaceRegexs, extName) {
  let content = fs.readFileSync(path.resolve(__dirname, '..', tempFile), 'utf8');
  Object.keys(replaceRegexs).forEach(key => {
    content = content.replace(key, replaceRegexs[key]);
  });
  writeFile(`${targetPath}/components`, content, extName);
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

function writeFile(pagePath, fileContent, extName) {
  fs.writeFileSync(path.resolve(__dirname, `${pagePath}.${extName}`), fileContent, 'utf8');
}

gen();
