const generators = require('yeoman-generator');
const path = require('path')
const fs = require('fs')

module.exports = class extends generators {
	// cli用户自定义配置
    prompting(){
        return this.prompt([{
            type: 'input',
            name: 'name',
            message : 'Your project name',
            default : this.appname
        }]).then(answers => {
            this.answers = answers;
        });
    }

	// 生成文件
    writing() {
         // 模板路径
        const tempDir = path.join(__dirname, 'templates');
         // 输出路径
        const destDir = process.cwd();
        // 模板上下文数据
        const ejsData = {
            title: this.answers['name'],
            success: true
        };
        // 模板文件写入
        fs.readdir(tempDir, (err, files) =>{
            if(err) throw err;
            files.forEach(temp => {
                const input = path.join(tempDir, temp);
                const output = path.join(destDir, temp);
                this.fs.copyTpl(input, output, ejsData);
            })
        });
    }
}