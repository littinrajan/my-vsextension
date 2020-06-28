// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import 'vscode'
// import 'vscode'


// @ts-ignore
var request = require('request');

const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "moonlightfantasia" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('moonlightfantasia.helloWorld', function () {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from moonlightfantasia!');
	// });
	let disposable = vscode.commands.registerCommand('moonlightfantasia.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from moonlightfantasia!');
	});

	let disposable1 = vscode.commands.registerCommand('moonlightfantasia.wishme', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Wishes from moonlightfantasia.. All the best for your Future :)');
	});

	let disposable2 = vscode.commands.registerCommand('moonlightfantasia.weather', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Wishes from moonlightfantasia!');
		// @ts-ignore
		vscode.window.showInputBox("Please enter your ZipCode").then(zip => {
			Weather(zip)  
		})
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposable1);
	context.subscriptions.push(disposable2)
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}


function Weather(zipcode){
	request(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},in&units=Imperial&appid=7125577b261daca18578ea4670e1ba0d`, function (error, response, body) {
		if (!error && response.statusCode == 200) {
            
            var  parsed = JSON.parse(body);
            if (parsed.cod != '200')
            {
                vscode.window.showErrorMessage(parsed.message);
                
            }
            else{
            var temp = parsed.main.temp
            var cover =parsed.weather[0].main

            console.log(temp)
   
            if (!this._statusBarItem) { 
                this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left); 
            if(temp < 55){
                 this._statusBarItem.text = `$(thumbsdown) ${cover} and ${temp}`;
            }
            else if(temp>=85){
                this._statusBarItem.text = `$(flame) ${cover} and ${temp}`;
            }
            else{
                this._statusBarItem.text = `$(thumbsup) ${cover} and ${temp}`;
            }
            this._statusBarItem.show();

            }  

            }
        }
            else if(error){
            vscode.window.showErrorMessage(error);
            this._statusBarItem.Hide();
            }
            else{this._statusBarItem.Hide()}
            
        })
		
}

module.exports = {
	activate,
	Weather,
	deactivate
}