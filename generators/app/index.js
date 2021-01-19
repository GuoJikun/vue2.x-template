'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the solid ${chalk.red('generator-vue-2-tempalte')} generator!`)
    );

    const prompts = [
      {
          type: 'input',
          name: 'name',
          message: 'Your project name',
          default: this.appname
      },
      {
          type: 'input',
          name: 'description',
          message: 'description',
      },
      {
          type: 'input',
          name: 'author',
          message: 'author',
          default: this.user.git.name()
      },
      {
          type: 'input',
          name: 'email',
          message: 'email',
          default: this.user.git.email()
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  configuring(){
    //保存配置相关信息且生成配置文件（名称多为'.'开头的配置文件,例如.editorconfig）
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        name: this.props.name
      }
    );
  }

  writing() {
    this.fs.copy(
      this.templatePath('public/'),
      this.destinationPath('public/')
    );
    this.fs.copy(
      this.templatePath('src/'),
      this.destinationPath('src/')
    );
    this.fs.copy(
      this.templatePath('.browserslistrc'),
      this.destinationPath('.browserslistrc')
    );
    this.fs.copy(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('.eslintrc.js')
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
    this.fs.copy(
      this.templatePath('babel.config.js'),
      this.destinationPath('babel.config.js')
    );
  }

  install() {
    this.npmInstall();
  }
};
